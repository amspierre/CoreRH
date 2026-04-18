# CoreRH

## Banco de dados

Esta aplicação usa PostgreSQL.

1. Configure o PostgreSQL para rodar em `localhost:5433` com usuário `postgres` e senha `root`.
2. Crie a database e a tabela executando o script PowerShell:

```powershell
cd .\database
.\create_db.ps1
```

3. O arquivo de schema está em `database/init.sql`.

> Se o banco já existir, execute apenas `init.sql` na database `corerh`.
