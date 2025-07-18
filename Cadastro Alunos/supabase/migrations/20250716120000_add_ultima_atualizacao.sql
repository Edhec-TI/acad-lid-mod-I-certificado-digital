ALTER TABLE "Cadastro_Alunos"
ADD COLUMN ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW();

CREATE OR REPLACE FUNCTION update_ultima_atualizacao_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ultima_atualizacao = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ultima_atualizacao
BEFORE UPDATE ON "Cadastro_Alunos"
FOR EACH ROW
EXECUTE FUNCTION update_ultima_atualizacao_timestamp();