CREATE DATABASE IF NOT EXISTS `Empresa`;
USE `Empresa`;

CREATE TABLE IF NOT EXISTS `Contas` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `idade` INT NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_cpf` (`cpf`),
    UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Cargos` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `cargo` VARCHAR(255) NOT NULL,
    `perms` LONGTEXT DEFAULT '{}',
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_cargo` (`cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Produtos` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `quantidade` INT DEFAULT 0,
    `descricao` LONGTEXT DEFAULT '',
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Funcionarios` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `idade` INT NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `cargo_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_cpf` (`cpf`),
    UNIQUE KEY `unique_email` (`email`),
    CONSTRAINT `fk_funcionario_cargo` 
        FOREIGN KEY (`cargo_id`) REFERENCES `Cargos`(`id`) 
        ON UPDATE CASCADE 
        ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Cupom` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `valor` DECIMAL(10,2) DEFAULT 0.00,
    `tipo` TINYINT(1) DEFAULT 0 COMMENT '0 = valor fixo, 1 = percentual',
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `Clientes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `rua` VARCHAR(255) NOT NULL,
    `numeroCasa` INT NOT NULL,
    `idade` INT NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_cpf` (`cpf`),
    UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
