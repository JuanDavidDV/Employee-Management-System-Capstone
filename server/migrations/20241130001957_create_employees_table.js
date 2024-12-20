/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("employees", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("image").notNullable();
        table.text("password").notNullable();
        table.string("email").notNullable();
        table
            .integer("category_id")
            .unsigned()
            .references("categories.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.integer("salary").notNullable();
        table.string("address").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTableIfExists("employees");
  }

