CREATE DATABASE IF NOT EXISTS semana8_db; 

USE semana8_db; 

CREATE TABLE IF NOT EXISTS estados(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL, 
)

CREATE TABLE IF NOT EXISTS municipios (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL, 
    estado_id INT NOT NULL, 
    FOREIGN KEY (estado_id) REFERENCES estado(id) ON DELETE CASCADE, 
    INDEX idx_estado_id (estado_id)
)

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL, 
    municipio_id INT NOT NULL, 
    FOREIGN KEY (municipio_id) REFERENCES municipios(id) ON DELETE CASCADE, 
    INDEX idx_municipio_id (municipio_id)
)