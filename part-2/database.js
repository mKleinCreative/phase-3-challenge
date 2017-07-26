const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@localhost:5432/grocery_store`
const db = pgp( connectionString )

exports.queries = {
  allItems: () => db.many('SELECT * from grocery_items'),

  itemsInSection: ( section ) => 
  db.many(
    `SELECT
      id, name
     FROM
      grocery_items
     WHERE
      section = $1`
    ),

  cheapItems: () => 
    db.many(
      `SELECT
        id, name, price
      FROM
        grocery_items
      WHERE
        price < 10
      ORDER BY
        price
      ASC`
    ),

  countItemsInSection: ( section ) =>
    db.one( 'SELECT count(*) FROM grocery_items WHERE section = $1' ),

  mostRecentOrders: () =>
    db.many( 'SELECT ')
}