create database if not exists prueba;
use prueba;

CREATE TABLE producto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL
);

CREATE TABLE plazo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    semanas INT NOT NULL,
    tasa_normal DECIMAL(10,4) NOT NULL,
    tasa_puntual DECIMAL(10,4) NOT NULL
);

INSERT INTO producto (sku, nombre, precio) VALUES
('SKU001', 'Televisor LED 40 pulgadas', 4500.00),
('SKU002', 'Laptop Gaming', 15000.00),
('SKU003', 'Smartphone', 8000.00),
('SKU004', 'Cámara DSLR', 12000.00),
('SKU005', 'Tablet', 3000.00);

INSERT INTO plazo (semanas, tasa_normal, tasa_puntual) VALUES
(12, 1.0366, 0.8963),
(24, 1.0466, 0.9063),
(36, 1.0566, 0.9163),
(48, 1.0666, 0.9263);

