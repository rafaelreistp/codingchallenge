-- MySQL Script generated by MySQL Workbench
-- Sat May 12 18:15:56 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema questionariodb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema questionariodb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `questionariodb` DEFAULT CHARACTER SET utf8 ;
USE `questionariodb` ;

-- -----------------------------------------------------
-- Table `questionariodb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `questionariodb`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(30) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `permissao` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `questionariodb`.`questionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `questionariodb`.`questionario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qr_code` VARCHAR(250) NOT NULL,
  `nome` VARCHAR(30) NOT NULL,
  `categoria` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `qr_code_UNIQUE` (`qr_code` ASC),
  INDEX `fk_questionario_usuario_idx` (`id_usuario` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_questionario_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `questionariodb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `questionariodb`.`pergunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `questionariodb`.`pergunta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` INT NOT NULL,
  `pergunta` VARCHAR(256) NULL,
  `id_questionario` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_pergunta_questionario1_idx` (`id_questionario` ASC),
  CONSTRAINT `fk_pergunta_questionario1`
    FOREIGN KEY (`id_questionario`)
    REFERENCES `questionariodb`.`questionario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `questionariodb`.`resposta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `questionariodb`.`resposta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `resposta` VARCHAR(256) NOT NULL,
  `id_pergunta` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_resposta_pergunta1_idx` (`id_pergunta` ASC),
  INDEX `fk_resposta_usuario1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_resposta_pergunta1`
    FOREIGN KEY (`id_pergunta`)
    REFERENCES `questionariodb`.`pergunta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resposta_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `questionariodb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
