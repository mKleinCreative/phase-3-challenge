
\COPY grocery_items(name,price,section) FROM './grocery.csv' DELIMITER ',' CSV HEADER;

INSERT INTO shoppers (name)
  VALUES ('Jorge'),
  ('Michael'),
  ('jRob'),
  ('sushi');
