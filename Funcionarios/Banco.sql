CREATE TABLE IF NOT EXISTS `Funcionarios` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `idade` INT NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_cpf` (`cpf`),
    UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4