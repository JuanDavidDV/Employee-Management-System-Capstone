import initKnex from "knex";
import configuration from "../knexfile.js";
import jwt from "jsonwebtoken";

const knex = initKnex(configuration);

export const adminLogin = async (req, res) => {
  const { email, password } = req.body; //Obtains email and password from the body

  if (!email || !password) {
    return res.status(401).json( { message: "Please provide email and password" });
  }

  try {
    const data = await knex("admin").where( {email} ).first();  //Query the database to match the email provided as an admin

    if (!data) {  //Error handler when admin email does not match
      return res.status(401).json( { message: "The email or password provided are invalid" });
    }


    // Creates token properties when authentication is successful
    const payload = {
      role: "admin",
      email: data
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = {expiresIn: "1h"};

    const token = jwt.sign(payload, secretKey, options)
    console.log(data)
  }
  catch(error) {

  }
};