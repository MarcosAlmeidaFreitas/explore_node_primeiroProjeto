
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable();
  
  //O OnDelete faz com que se uma nota seja deletada faz com que todas as Tags daquela nota sejam deletadas tambem.
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("links");