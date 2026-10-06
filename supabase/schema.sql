-- ==============================================================================
-- SCHEMA DO BANCO DE DADOS - VITRINE VIRTUAL LOPES E LOPES
-- Execute este script no SQL Editor do Supabase (Menu lateral esquerdo > SQL Editor)
-- ==============================================================================

-- 1. Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS public.produtos (
    id TEXT PRIMARY KEY,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(10, 2),
    unit TEXT NOT NULL DEFAULT 'UN',
    department_id TEXT NOT NULL,
    department_name TEXT NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    stock_badge TEXT DEFAULT 'Pronta Entrega',
    featured BOOLEAN DEFAULT false,
    images JSONB DEFAULT '[]'::jsonb,
    technical_specs JSONB DEFAULT '{}'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    warranty TEXT,
    related_skus JSONB DEFAULT '[]'::jsonb,
    variation_type TEXT,
    variations JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Índices de alta performance para busca e filtros no site
CREATE INDEX IF NOT EXISTS idx_produtos_sku ON public.produtos(sku);
CREATE INDEX IF NOT EXISTS idx_produtos_slug ON public.produtos(slug);
CREATE INDEX IF NOT EXISTS idx_produtos_department ON public.produtos(department_id);
CREATE INDEX IF NOT EXISTS idx_produtos_brand ON public.produtos(brand);
CREATE INDEX IF NOT EXISTS idx_produtos_featured ON public.produtos(featured);

-- 3. Configuração de Segurança (Row Level Security)
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- Permite que qualquer visitante veja os produtos ativos no catálogo
DROP POLICY IF EXISTS "Leitura pública de produtos" ON public.produtos;
CREATE POLICY "Leitura pública de produtos" 
ON public.produtos FOR SELECT 
USING (true);

-- Permite inserção, edição e exclusão (para o painel e carga de dados)
DROP POLICY IF EXISTS "Modificação de produtos" ON public.produtos;
CREATE POLICY "Modificação de produtos" 
ON public.produtos FOR ALL 
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- MIGRAÇÕES SQL (Execute no SQL Editor do Supabase se sua tabela já existe)
-- ==============================================================================
-- 1. Adicionar suporte a atributos e variações de produtos (cores, voltagens, mm, etc.):
-- ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS variation_type TEXT;
-- ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS variations JSONB DEFAULT '[]'::jsonb;

-- 2. Remover colunas obsoletas:
-- ALTER TABLE public.produtos DROP COLUMN IF EXISTS wholesale_notice;
-- ALTER TABLE public.produtos DROP COLUMN IF EXISTS video_url;

