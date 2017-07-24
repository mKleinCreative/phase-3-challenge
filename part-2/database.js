const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@localhost:5432/grocery_store`
const db = pgp( connectionString )

exports.queries = {
  allItems: () => db.many('SELECT * from grocery_items', [name]),

  findById: ( id ) => db.one('SELECT * from usertable WHERE id = $1', [id]),

  create: ( name, password ) => 
    db.one('INSERT INTO usertable (name, password) VALUES ($1, $2) RETURNING *', [name, password])
}