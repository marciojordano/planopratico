/*
  # Criar tabela de leads da Imersão Plano Prático

  1. Nova Tabela
    - `leads`
      - `id` (uuid, chave primária)
      - `name` (text, obrigatório) - Nome completo do lead
      - `phone` (text, obrigatório) - Telefone de contato
      - `email` (text, obrigatório) - E-mail do lead
      - `created_at` (timestamptz) - Data de criação do registro
  
  2. Segurança
    - Ativar RLS na tabela `leads`
    - Permitir inserção pública (para captura de leads na LP)
    - Apenas usuários autenticados podem visualizar os leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir que qualquer pessoa insira leads (formulário público)
CREATE POLICY "Qualquer pessoa pode inserir leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir que usuários autenticados visualizem todos os leads
CREATE POLICY "Usuários autenticados podem visualizar leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);