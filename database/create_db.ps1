# Cria a database corerh e a tabela usuarios no PostgreSQL local.
# Ajuste o usuário, senha e porta se necessário.

$pgUser = 'postgres'
$pgPassword = 'root'
$pgPort = 5433
$databaseName = 'corerh'

$env:PGPASSWORD = $pgPassword

Write-Host "Criando database '$databaseName'..."
psql -U $pgUser -p $pgPort -d postgres -c "CREATE DATABASE \"$databaseName\";" 2>$null

Write-Host "Executando script de schema..."
psql -U $pgUser -p $pgPort -d $databaseName -f "$(Join-Path $PSScriptRoot 'init.sql')"

Write-Host "Banco de dados '$databaseName' criado e tabela 'usuarios' inicializada."
