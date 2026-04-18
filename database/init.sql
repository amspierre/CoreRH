-- Script para inicializar o banco de dados CoreRH
-- Execute este arquivo em um banco PostgreSQL onde a database "corerh" já exista.

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  senha TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
