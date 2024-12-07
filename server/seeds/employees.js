// import seed data files, arrays of objects
import employeesData from "../seed-data/employees.js";

export async function seed(knex) {
  await knex("employees").del();
  await knex("employees").insert(employeesData);
}
