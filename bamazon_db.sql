-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "people" within animals_db --
CREATE TABLE products (
 -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "department name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- Makes a integer column called "price" --
  price INTEGER(4) NOT NULL,
  -- Makes an numeric column called "stock" --
  stock_quantity INTEGER,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Awesomo Socks", "Clothing", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Terrifying Sword", "Weapons", 100, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Headphones X","Electronics",50,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dynomito Watch Gucci", "Clothing",300,12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Firesticks", "Weapons", 68, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water Jugs", "Food", 1, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crusty Chips","Food","2",50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Listening Device Y", "Electronics",25,33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Clean Underwear","Clothing",3,55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Queso Deluxo", "Food",3,33);
