exports.up = function (knex) {
  return knex.schema.table("orders", function (table) {
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("orders", function (table) {
    table.dropColumn("user_id");
  });
};
