import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const knex = initKnex(configuration);

// Login Section
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;   //Obtains email and password from the body

  if (!email || !password) {
    return res.status(401).json({ message: "Please provide email and password" });
  }

  try {
    const data = await knex("admin").where({ email }).first(); //Query the database to match the email provided as an admin

    if (!data) {  //Error handler when admin email does not match
      return res.status(401).json({ message: "The email or password provided are invalid" });
    }

    const passwordMatch = password === data.password;  // Compare password

    if (!passwordMatch) {
      return res.status(401).json({ message: "The email or password provided are invalid" });
    }

    // Create the JWT token if the email and password are correct
    const payload = {
      role: "admin",
      email: data.email,
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Set the token in the cookie
    res.cookie("token", token, {
      secure: false,  // Set to true in production
      maxAge: 3600000,  // Token expiration (1 hour)
      sameSite: 'strict',
    });

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error encountered during admin authentication", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const adminLogout = async (req, res) => {
  try {
    // Clear the 'token' cookie to log the admin out
    res.clearCookie("token", {
      secure: false, 
      sameSite: 'strict',
    });

    return res.status(200).json({ message: "Logout successful" });
  }
  catch (error) {
    console.error("Error encountered during admin logout", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const adminProfile = async(req, res) => {
  try {
    const admin = await knex("admin").select("email")
    return res.status(200).json(admin[0]);
  }
  catch(error) {

  }
};

// Categories Section
export const getCategories = async (req, res) => {
  try {
    const categories = await knex("categories").select("name", "id");
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error retrieving the categories", error);
    res.status(400).json({
      message: "Could not get categories"
    })
  };
};

export const newCategory = async (req, res) => {
  if (!req.body.newCategory) {
    return res.status(400).json({
      message: "Please provide a category"
    })
  };

  const { newCategory } = req.body;

  try {
    // Check if a category with the same name already exists
    const existingCategory = await knex("categories")
      .where('name', newCategory)
      .first();

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    const [categoryId] = await knex("categories").insert({ name: newCategory });

    return res.status(201).json({
      message: "Category created successfully",
      category: { id: categoryId, name: newCategory }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating category"
    });
  }
};

// Employee Section
export const newEmployee = async (req, res) => {
  try {
    // Check if the image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Destructure employee details from the request body
    const { name, email, category, salary, address, password } = req.body;
    const image = req.file ? `/images/${req.file.filename.replace(/\\/g, '/')}` : null;  // Replace backslashes with forward slashes  // Image file path from multer

    // Check if all required fields are present
    if (!name || !email || !category || !salary || !address || !password || !image) {
      return res.status(400).json({ message: "All fields are required including image" });
    }

    // Check if employee with the same email already exists
    const existingEmployee = await knex("employees").where({ email }).first();
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new employee data into the database
    const [employeeId] = await knex("employees").insert({
      name,
      email,
      category_id: category, 
      salary,
      address,
      password: hashedPassword,
      image,  // Image file path from multer
    });

    return res.status(201).json({
      message: "Employee created successfully",
      employee: { id: employeeId, name, email, category, salary, address, image },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating employee" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await knex("employees").select("id", "name", "email", "address", "salary", "image");
    return res.status(200).json(employees);
  }
  catch (error) {
    console.error("Error retrieving the employees", error);
    res.status(400).json({
      message: "Could not get employees"
    })
  }
};

export const getSingleEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await knex("employees").select("id", "name", "email", "category_id", "salary", "address").where({ id: id });
    return res.status(200).json(employee[0]);
  }
  catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Could not get employee"
    })
  }
};

export const editSingleEmployee = async (req, res) => {
  const { id } = req.params;
  
  try {
    const rowsUpdated = await knex("employees").where({ id: id }).update(req.body)
    
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Employee with ID ${id} not found`
      });
    }

    const updateEmployee = await knex("employees").where({ id: id });

    res.status(200).json(updateEmployee[0]);
  }
  catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Could not update employee"
    })
  }
};

export const deleteSingleEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await knex("employees").where({ id: id }).delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found`})
    }

    res.sendStatus(204);
  }
  catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Could not delete employee"
    })
  }
}

// Dashboard Section
export const getAdminCount = async (req, res) => {
  try {
    const adminCount = await knex("admin").count("* as count").first();
    return res.status(200).json(adminCount.count);
  }
  catch (error) {
    console.error(error)
    return res.status(400) 
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await knex("admin").select("id", "email");
    return res.status(200).json(admin);
  }
  catch(error) {
    console.error(error)
    return res.status(400)
  }
}

export const getEmployeeCount = async (req, res) => {
  try {
    const employeeCount = await knex("employees").count("* as count").first();
    return res.status(200).json(employeeCount.count);
  }
  catch (error) {
    console.error(error)
    return res.status(400)
  }
};

export const getTotalSalary = async (req, res) => {
  try {
    const totalSalary = await knex("employees").sum("salary as total_salary").first();
    return res.status(200).json(totalSalary.total_salary)
  }
  catch(error) {
    console.error(error)
    return res.status(400)
  }
};
