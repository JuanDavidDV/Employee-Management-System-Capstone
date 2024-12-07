import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const knex = initKnex(configuration);

// Login Section
export const employeeLogin = async (req, res) => {
  const { email, password } = req.body;   //Obtains email and password from the body

  if (!email || !password) {
    return res.status(401).json({ message: "Please provide email and password" });
  }

  try {
    const data = await knex("employees").where({ email }).first(); //Query the database to match the email provided as an employee

    if (!data) {  //Error handler when employee email does not match
      return res.status(401).json({ message: "The email or password provided are invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, data.password);  // Compare password

    if (!passwordMatch) {
      return res.status(401).json({ message: "The email or password provided are invalid" });
    }

    // Create the JWT token if the email and password are correct
    const payload = {
      role: "employee",
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
      id: data.id
    });
  } catch (error) {
    console.error("Error encountered during employee authentication", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
