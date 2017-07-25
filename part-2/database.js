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
    db.many( 'SELECT id, time_placed FROM orders ORDER BY time_placed DESC'),
    
  lastShopperName: () =>
    db.one( 
      `SELECT
        name
       FROM 
        shoppers
       RIGHT JOIN 
        orders
       ON 
        orders.shopper_id=shoppers.id
       ORDER BY 
        time_placed 
       DESC
       LIMIT 1`
    ),
    
  orderTotal: (id) =>
    db.one( `
      SELECT 
        SUM(price)
      FROM 
        grocery_items
      RIGHT JOIN 
        order_items
      ON 
        grocery_items.id=order_items.item_id
      RIGHT JOIN 
        orders 
      ON 
        order_items.order_id=orders.id
      WHERE 
        orders.id = $1`
    ) function(error, id) {
      if (error) {
        throw error
      }
    })
}