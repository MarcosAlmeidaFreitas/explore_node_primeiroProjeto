
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();
  
  //O OnDelete faz com que se uma nota seja deletada faz com que todas as Tags daquela nota sejam deletadas tambem.
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("tags");