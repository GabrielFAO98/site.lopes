# Vitrine Virtual Lopes e Lopes — Documento de Planejamento e Arquitetura Técnica

> **Status do Projeto:** Fase 1, 2 e 3 Concluídas com Sucesso (Vitrine, Catálogo, PDP e Fluxos WhatsApp Ativos)  
> **Última Atualização:** 05/10/2026  
> **Localização:** Franca - SP  
> **Foco:** Catálogo Online Indexável (SEO Local) & Conversão via WhatsApp  

---

## 1. Visão Geral do Negócio

- **Empresa:** Lopes e Lopes Materiais para Construção
- **Segmento:** Materiais de construção, hidráulica, elétrica, tintas, ferramentas e ferragens.
- **Localização e Praça de Atuação:** Franca - SP (atendimento focado no consumidor e profissionais de Franca e região).
- **Canais Oficiais:**
  - **Telefone:** (16) 3725-2097
  - **WhatsApp:** (16) 99914-2727
  - **E-mail:** financeiro.lopes@hotmail.com
  - **Endereço:** Av. Brasil, 3640 — Jardim Paulistano, Franca - SP (CEP: 14402-440)
  - **Horários:** Segunda a Sexta: 07:30 às 18:00 | Sábado: 07:30 às 12:30
- **Identidade Visual:**
  - Cores extraídas do logotipo oficial: **Azul Real (`#0A5C9C`)**, **Laranja Obra (`#F37321`)**, **Verde WhatsApp (`#25D366`)** e **Cinza Ardósia**.

---

## 2. Objetivo do Sistema & Escopo

### 2.1 Objetivo Central
Desenvolver uma **vitrine virtual de altíssima performance**, com excelente indexação nos motores de busca (SEO Local para Franca-SP), mobile-first, leve e focada na geração de orçamentos e conversão direta via WhatsApp.

### 2.2 Matriz de Escopo

| No Escopo (Implementado / Prioritário) | Fora de Escopo (Explicitamente Não Implementar) |
| :--- | :--- |
| ✅ Catálogo navegável e categorizado por departamentos | ❌ Checkout online |
| ✅ Busca rápida com auto-sugestão e filtros | ❌ Gateway de pagamento (Cartão, Boleto, PIX integrado) |
| ✅ Página de Detalhe de Produto (PDP) com especificações | ❌ Cálculo dinâmico de frete integrado a transportadoras |
| ✅ Botão de conversão WhatsApp com mensagem pré-formatada | ❌ Carrinho com transação bancária/monetária |
| ✅ "Lista de Orçamento" (cotação multi-itens para WhatsApp) | ❌ Sistema de cadastro, autenticação ou login de usuários |
| ✅ SEO Local estruturado (Schema.org `HardwareStore`, `Product`) | ❌ Painel financeiro ou conciliação bancária |
| ✅ Próxima Etapa: API para sincronização com ERP OrgSystem | ❌ Gestão de vendas complexa dentro da vitrine |

---

## 3. Stack Tecnológica Implementada

- **Frontend & Framework:** **Next.js 14 (App Router)** com **TypeScript**
- **Estilização & UI:** **Tailwind CSS** com paleta oficial da Lopes e Lopes + **Lucide React**
- **Estado da Lista de Cotação:** **React Context + LocalStorage** (persistência garantida entre sessões)
- **Camada de Dados & Catálogo:** Arquitetura desacoplada via `src/lib/db.ts` lendo dados tipados de `data/products.json` (pronto para migração para PostgreSQL/Supabase ou API OrgSystem sem alterar componentes)
- **Indexação & SEO:** Next.js Metadata API, OpenGraph dinâmico, Schema.org JSON-LD, `sitemap.xml` e `robots.txt`

---

## 4. Estrutura de Departamentos

1. **Construção Básica:** Cimentos, argamassas, impermeabilizantes, tijolos, areia e ferro.
2. **Hidráulica:** Tubos de esgoto e soldáveis, conexões, caixas d'água, registros e colas Tigre.
3. **Elétrica:** Cabos Sil, disjuntores Lorenzetti, conduítes, quadros e iluminação.
4. **Tintas e Acessórios:** Tintas Coral, rolos Atlas, massas, vernizes e solventes.
5. **Ferramentas & EPIs:** Ferramentas manuais Castor, elétricas e equipamentos de proteção.
6. **Ferragens & Fixação:** Fechaduras Stam, dobradiças, parafusos, buchas e cadeados.
7. **Acabamentos & Metais:** Torneiras Lorenzetti, louças, ralos e acessórios sanitários.

---

## 5. Roadmap de Implementação & Checklist

### Fase 1: Setup do Projeto & Governança Multi-Ambiente
- [x] Instalação do Node.js LTS (v24.19.0) e npm (v11.17.0)
- [x] Configuração do Next.js 14, TypeScript, Tailwind CSS e PostCSS
- [x] Criação de `.node-version` para paridade de versões entre casa e trabalho
- [x] Criação de `.vscode/settings.json` e `.vscode/extensions.json`
- [x] Criação de `.env.example` e `.env.local` com os dados oficiais de Franca-SP
- [x] Organização do logotipo oficial em `public/images/logo.png`

### Fase 2: Modelagem de Dados & Catálogo de Produtos
- [x] Definição dos tipos TypeScript (`Product`, `Department`, `QuoteItem`, `StoreInfo`)
- [x] Base de dados de teste rica cobrindo os 7 departamentos (`data/products.json`)
- [x] Camada de repositório e busca (`src/lib/db.ts`)
- [x] Página inicial com Hero, Departamentos, Vitrine e Destaque Local (`src/app/page.tsx`)
- [x] Página de Catálogo com busca e filtros laterais por departamento e marca (`src/app/produtos/page.tsx`)

### Fase 3: Detalhes do Produto (PDP) & Fluxos de WhatsApp
- [x] Página individual com SSG (`/produto/[slug]`)
- [x] Utilitário de mensagens pré-formatadas para WhatsApp (`src/lib/whatsapp.ts`)
- [x] Seletor de quantidade e conversão direta na PDP
- [x] Módulo da "Lista de Orçamento" (Drawer deslizante com multi-itens e envio único)
- [x] Botão flutuante de WhatsApp para suporte imediato em todas as páginas

### Fase 4: SEO Local & Performance
- [x] Metadados dinâmicos e OpenGraph para cards ricos no WhatsApp
- [x] Injeção de Schema.org JSON-LD (`HardwareStore` com endereço de Franca e `Product`)
- [x] Geração automática de `sitemap.xml` e `robots.txt`
- [x] Validação de build estático de produção (19 páginas geradas com 100% de sucesso)

### Fase 5: Integração com ERP OrgSystem (Próxima Etapa)
- [ ] Criação do endpoint seguro de sincronização (`POST /api/sync/produtos`)
- [ ] Validação de token Bearer para proteção da rota
- [ ] Desenho do script local Sync Bridge (Node.js/Python) para rodar no servidor da loja em Franca
