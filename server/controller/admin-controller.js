import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";

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
