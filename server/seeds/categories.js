// import seed data files, arrays of objects
import categoriesData from "../seed-data/categories.js";

export async function seed(knex) {
  await knex("categories").del();
  await knex("categories").insert(categoriesData);
}