DROP DATABASE IF EXISTS grocery_store;
CREATE DATABASE grocery_store;

\c grocery_store;

DROP TABLE IF EXISTS orders CASCADE ;
CREATE TABLE orders (
id  SERIAL ,
shopper_id INTEGER ,
time_placed TIMESTAMP ,
price_total DOUBLE PRECISION ,
PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS shoppers CASCADE ;
CREATE TABLE shoppers (
id  SERIAL ,
name VARCHAR ,
PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS grocery_items CASCADE ;
CREATE TABLE grocery_items (
id  SERIAL ,
name VARCHAR ,
price DOUBLE PRECISION ,
section VARCHAR ,
PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS order_items CASCADE ;
CREATE TABLE order_items (
item_id INTEGER ,
order_id INTEGER,
);

ALTER TABLE orders ADD FOREIGN KEY ("shopper_id") REFERENCES "shoppers" ("id") ON DELETE CASCADE;
ALTER TABLE order_items ADD FOREIGN KEY ("item_id") REFERENCES "grocery_items" ("id") ON DELETE CASCADE;
ALTER TABLE order_items ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE;