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
