import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const passMatch = env.match(/SUPABASE_DB_PASSWORD=(.*)/);
const password = passMatch ? passMatch[1].trim().replace(/^["']|["']$/g, '') : '';

console.log('Testing Supabase direct connection...');

async function migrate() {
  const hosts = [
    { host: 'db.bpyfhmxqwvbgkzrlpizj.supabase.co', port: 5432, user: 'postgres' },
    { host: 'aws-0-sa-east-1.pooler.supabase.com', port: 6543, user: 'postgres.bpyfhmxqwvbgkzrlpizj' },
    { host: 'aws-0-sa-east-1.pooler.supabase.com', port: 5432, user: 'postgres.bpyfhmxqwvbgkzrlpizj' },
    { host: 'aws-0-us-east-1.pooler.supabase.com', port: 6543, user: 'postgres.bpyfhmxqwvbgkzrlpizj' },
  ];

  let client = null;
  for (const cfg of hosts) {
    try {
      console.log(`Connecting to ${cfg.host}:${cfg.port} as ${cfg.user}...`);
      const c = new Client({
        host: cfg.host,
        port: cfg.port,
        user: cfg.user,
        password,
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      });
      await c.connect();
      console.log(`✅ Conectado com sucesso em ${cfg.host}:${cfg.port}!`);
      client = c;
      break;
    } catch (err) {
      console.log(`❌ Falha em ${cfg.host}:${cfg.port}:`, err.message);
    }
  }

  if (!client) {
    console.error('Não foi possível conectar ao PostgreSQL diretamente.');
    process.exit(1);
  }

  console.log('Executando migrações na tabela public.produtos...');
  const sql = `
    ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS detailed_description TEXT;
    ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS yield_info TEXT;
    ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb;
  `;
  await client.query(sql);
  console.log('✅ Migração concluída com sucesso!');

  const check = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'produtos' 
      AND column_name IN ('detailed_description', 'yield_info', 'faq');
  `);
  console.log('Colunas verificadas:', check.rows);

  await client.end();
}

migrate().catch(console.error);

