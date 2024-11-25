import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const adminLogin = async (req, res) => {
  try {
    console.log(req.body);
  }
  catch(error) {

  }
};

export {
  index
}