CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(50),
    preco DECIMAL(10,2),
    categoria_id INT,
    FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
);
INSERT INTO categorias (nome)
VALUES
('Mouse'),
('Teclado'),
('Mousepad'),
('Headset'),
('Monitor'),
('Microfone'),
('Webcam'),
('Controle'),
('Cadeira Gamer'),
('Notebook');
INSERT INTO produtos (nome, marca, preco, categoria_id)
VALUES
('Dragonfly R1', 'Attack Shark', 149.90, 1),
('M900 Pro', 'Delux', 179.90, 1),
('G203', 'Logitech', 129.90, 1),
('Kumara K552', 'Redragon', 189.90, 2),
('K617 Fizz', 'Redragon', 219.90, 2),
('PK Control 1', 'PK', 89.90, 3),
('G240', 'Logitech', 79.90, 3),
('Cloud Stinger', 'HyperX', 199.90, 4),
('C920', 'Logitech', 299.90, 7),
('DualShock 4', 'Sony', 249.90, 8);