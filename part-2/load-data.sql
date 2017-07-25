
\COPY grocery_items(name,price,section) FROM './grocery.csv' DELIMITER ',' CSV HEADER;

INSERT INTO shoppers (name)
  VALUES ('Jorge'),
  ('Michael'),
  ('jRob'),
  ('sushi');
  
INSERT INTO orders (shopper_id)
  VALUES ('1'),
  ('4'),
  ('4'),
  ('2');

INSERT INTO order_items (order_id, item_id)
  VALUES ('1', '4'),
  ('4', '12'),
  ('4', '15'),
  ('2', '6');