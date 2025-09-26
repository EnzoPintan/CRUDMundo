CREATE DATABASE bd_mundo;
USE bd_mundo;

CREATE TABLE paises (
    id_pais INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    continente VARCHAR(50),
    populacao BIGINT,
    idioma VARCHAR(50)
);

CREATE TABLE cidades (
    id_cidade INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    populacao BIGINT,
    id_pais INT,
    FOREIGN KEY (id_pais) REFERENCES paises(id_pais)
        ON DELETE CASCADE
);

INSERT INTO paises (nome, continente, populacao, idioma) VALUES
('Brasil', 'América do Sul', 214300000, 'Português'),
('China', 'Ásia', 1412000000, 'Mandarim'),
('Índia', 'Ásia', 1408000000, 'Hindi'),
('Rússia', 'Europa/Ásia', 143000000, 'Russo'),
('Japão', 'Ásia', 125700000, 'Japonês');

INSERT INTO cidades (nome, populacao, id_pais) VALUES
('São Paulo', 12330000, 1),
('Rio de Janeiro', 6748000, 1),
('Brasília', 3055000, 1),
('Salvador', 2887000, 1),
('Fortaleza', 2687000, 1);

INSERT INTO cidades (nome, populacao, id_pais) VALUES
('Pequim', 21890000, 2),
('Xangai', 24870000, 2),
('Cantão (Guangzhou)', 15000000, 2),
('Shenzhen', 17600000, 2),
('Chongqing', 32000000, 2);

INSERT INTO cidades (nome, populacao, id_pais) VALUES
('Mumbai', 20400000, 3),
('Nova Délhi', 16750000, 3),
('Bangalore', 12500000, 3),
('Hyderabad', 10300000, 3),
('Chennai', 11000000, 3);

INSERT INTO cidades (nome, populacao, id_pais) VALUES
('Moscou', 12600000, 4),
('São Petersburgo', 5400000, 4),
('Novosibirsk', 1600000, 4),
('Ecaterimburgo', 1500000, 4),
('Kazan', 1250000, 4);

INSERT INTO cidades (nome, populacao, id_pais) VALUES
('Tóquio', 13960000, 5),
('Osaka', 2700000, 5),
('Quioto', 1475000, 5),
('Hiroshima', 1190000, 5),
('Yokohama', 3750000, 5);
