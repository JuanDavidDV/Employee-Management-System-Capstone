import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const knex = initKnex(configuration);

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
      httpOnly: true,
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

// Categories Section
export const getCategories = async (req, res) => {
  try {
    const categories = await knex("categories").select("name", "id");
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error retrieving the categories", error);
    restart.status(400).json({
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
  const { name, image, password, email, category, salary, address } = req.body.newEmployeeDetails;

  // Check if all required fields are provided
  if (!name || !image || !password || !email || !category || !salary || !address) {
    return res.status(400).json({
      message: "Please provide all the required employee details"
    });
  }

  try {
    // Check if the category exists
    const categoryExists = await knex("categories").where({ id: category }).first();

    if (!categoryExists) {
      return res.status(400).json({
        message: "The selected category does not exist"
      });
    }

    // Check if the email already exists
    const existingEmployee = await knex("employees")
      .where({ name, email })
      .first();

    if (existingEmployee) {
      return res.status(400).json({
        message: "An employee with this name and email already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Insert the new employee into the "employees" table
    const [newEmployeeId] = await knex("employees").insert({
      name,
      image,
      password: hashPassword,  
      email,
      category_id: category,  // Set the foreign key relationship
      salary,
      address
    });

    return res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: newEmployeeId,
        name,
        email,
        category_id: category,
        salary,
        address
      }
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      message: "Error creating the employee"
    });
  }
}
