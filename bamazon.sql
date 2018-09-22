DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (150) NULL,
  department_name VARCHAR (150) NULL,
  price DECIMAL (10, 2) NULL,
  stock_qty INT (45) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("item name 1", "department 1", 1.00, 25), 
("item name 2", "department 2", 2.48, 35), 
("item name 3", "department 3", 3.95, 45),
("item name 4", "department 4", 7.56, 55),
("item name 5", "department 5", 10.56, 65),
("item name 6", "department 6", 3.95, 75),
("item name 7", "department 7", 67.75, 85),
("item name 8", "department 8", 56.78, 95),
("item name 9", "department 9", 68.57, 105),
("item name 10", "department 10", 56.07, 110);

