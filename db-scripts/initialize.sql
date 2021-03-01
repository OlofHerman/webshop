CREATE DATABASE IF NOT EXISTS webshop;

USE webshop;

CREATE TABLE IF NOT EXISTS product (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL);

CREATE TABLE IF NOT EXISTS product_category (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
category_name VARCHAR(30) NOT NULL,
product_id INT(6) UNSIGNED NOT NULL,
FOREIGN KEY (product_id) REFERENCES product(id));

CREATE TABLE IF NOT EXISTS product_level (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
level INT(6) NOT NULL,
product_id INT(6) UNSIGNED NOT NULL,
FOREIGN KEY (product_id) REFERENCES product(id));

CREATE TABLE IF NOT EXISTS customer (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL);

CREATE TABLE IF NOT EXISTS customer_order (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
customer_id INT(6) UNSIGNED NOT NULL,
order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (customer_id) REFERENCES customer(id));

CREATE TABLE IF NOT EXISTS order_products (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
order_id INT(6) UNSIGNED NOT NULL,
product_id INT(6) UNSIGNED NOT NULL,
quantity INT(6) UNSIGNED NOT NULL,
FOREIGN KEY (order_id) REFERENCES customer_order(id),
FOREIGN KEY (product_id) REFERENCES product(id));

INSERT INTO product (name) VALUES
('träbord'),('plastbord'),('trästol'),('plaststol'),('träljusstake'),('plastljusstake');

INSERT INTO product_category (category_name,product_id) VALUES
('trä',1),('trä',3),('trä',5),('plast',2),('plast',4),('plast',6);

INSERT INTO product_level (level,product_id) VALUES
(1,1),(1,2),(2,3),(2,4),(3,5),(3,6);

INSERT INTO customer (name) VALUES ('Test Testsson');

INSERT INTO customer_order (customer_id) VALUES (1);

INSERT INTO order_products (order_id,product_id,quantity) VALUES
(1,1,1),(1,3,3),(1,5,2);