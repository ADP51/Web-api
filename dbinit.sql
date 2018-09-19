DROP DATABASE my_store;

CREATE DATABASE my_store;

USE my_store;

CREATE TABLE stores (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE products(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(250),
    price DOUBLE,
    store_id INTEGER NOT NULL,
    FOREIGN KEY(store_id) REFERENCES stores(id)
);

CREATE TABLE orders(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    time TIMESTAMP DEFAULT NOW(),
    total_price DOUBLE,
    store_id INTEGER NOT NULL,
    FOREIGN KEY(store_id) REFERENCES stores(id)
);

CREATE TABLE lineitems(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    quantity INTEGER,
    linetotal DOUBLE,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(order_id) REFERENCES orders(id),
    KEY (order_id, product_id),
    KEY (product_id, order_id)
);