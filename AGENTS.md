# Padrão Operacional Lopes e Lopes - Pipeline de Cadastro e Enriquecimento de Produtos

Este documento é a diretriz mandatória de trabalho para agentes e desenvolvedores no repositório **site.lopes**, garantindo consistência, alto padrão estético, precisão técnica e SEO de excelência em todas as máquinas e sessões.

---

## 1. Diretriz Central da Pipeline de Produtos

Todo produto adicionado ou atualizado no catálogo da Lopes e Lopes deve seguir rigorosamente as 4 etapas da pipeline:

### Etapa 1: Pesquisa Técnica Fidedigna
- Consultar fontes confiáveis e oficiais dos fabricantes (ex.: Votoran, Quartzolit, Vedacit, Gerdau, Amanco, Blukit, Sil, Lorenzetti, Tekbond, Amazonas, Maza, Cozimax, Deca, Ceral, Stam, Tramontina, Norton, Irwin, Margirius, Durin, Fischer) ou revendedores técnicos estruturados (Leroy Merlin, Obramax, Telhanorte).
- Extrair especificações técnicas reais (normas ABNT quando aplicável, dimensões, rendimento, tempo de cura/secagem, restrições e modo de aplicação).
- Nunca inventar propriedades químicas, capacidades de carga ou especificações elétricas.

### Etapa 2: Coleta e Tratamento de Imagens Fiéis
- Buscar imagens oficiais e fiéis ao produto real vendido na loja (embalagem atualizada, proporção correta).
- Processar todas as imagens com a biblioteca `sharp`:
  - Fundo limpo/transparente ou fundo branco puro recortado sem cortes bruscos ou artefatos.
  - Formato padronizado: `.webp` otimizado (800x800 ou proporção padronizada quadrada centralizada com respiro).
  - Salvar no diretório `public/images/produtos/` seguindo o padrão de nomenclatura pelo slug do produto (ex.: `nome-do-produto.webp`, `nome-do-produto-2.webp`).
- Para cards de departamento na Home:
  - Usar foto real do produto de maior representatividade do departamento, com imagem tratada e sem partes brancas soltas, integrada harmoniosamente ao card.

### Etapa 3: Preenchimento Completo dos Campos do Produto
Todos os produtos devem conter:
- `id`: Identificador único (slug ou numérico consistente).
- `sku`: Código SKU real no ERP/OrgSystem ou gerado de forma padronizada.
- `name`: Nome comercial completo, claro e objetivo com marca e tamanho/peso.
- `slug`: URL amigável (kebab-case).
- `description`: Resumo comercial direto para o card e meta description.
- `price`: Valor numérico ou `null` (quando for sob consulta no WhatsApp).
- `unit`: Unidade de medida comercial ('UN', 'Saco 50kg', 'Metro', 'M²', 'Lata 18L', 'Galão 3.6L', 'Barra 12m', 'Rolo 100m').
- `departmentId` e `departmentName`: Departamento correto da taxonomia oficial da loja.
- `category`: Subcategoria clara e escalável.
- `brand`: Marca fabricante.
- `inStock`: Booleano (padrão `true`).
- `stockBadge`: 'Pronta Entrega', 'Últimas Unidades' ou 'Sob Encomenda'.
- `featured`: Booleano para exibição na Home.
- `images`: Array de caminhos locais (`/images/produtos/slug.webp`).
- `technicalSpecs`: Objeto chave-valor com características técnicas detalhadas.
- `applications`: Array com listas de onde e como aplicar.
- `warranty`: Informação de garantia do fabricante.
- `relatedSkus`: Produtos complementares ('compre junto').
- `variationType` e `variations`: Quando houver tamanhos, cores ou embalagens (ex: 'Cor', 'Medida', 'Volume').
- `detailedDescription`: Texto rico em parágrafos (`\n\n`) com descrição técnica detalhada, orientações práticas de obra, preparação da superfície, diluição/mistura e normas.
- `faq`: Mínimo de 3 a 5 perguntas e respostas práticas com dúvidas reais de clientes e mestres de obra.

### Etapa 4: Sincronização Dupla e Validação Estrita
- Atualizar o arquivo local `data/products.json`.
- Atualizar a tabela `produtos` no Supabase com sincronização via script automatizado.
- Garantir que o componente `ProductFaq` gere microdados `FAQPage` Schema.org (JSON-LD) para indexação no Google.
- Rodar `npm run build` para garantir que todas as rotas estáticas (`/produto/[slug]`) compilem com 0 erros.
- Commitar com mensagens semânticas e enviar para o repositório remoto (`origin/main`).

---

## 2. Árvore Oficial de Departamentos da Loja

1. **Construção Básica** (`construcao-basica`): Cimentos, cal, areias, britas, tijolos, blocos, ferro CA-50, treliças, arames, telhas e calços/celotes.
2. **Pisos e Revestimentos** (`pisos-e-revestimentos`): Pisos cerâmicos, porcelanatos, argamassas colantes (AC-I, AC-II, AC-III), rejuntes e niveladores de piso.
3. **Impermeabilizantes e Químicos** (`quimicos-e-adesivos`): Vedacit, Bianco, selantes PU 40, adesivos MS Fixa Tudo, silicones, espumas expansivas e massas plásticas.
4. **Pintura e Acessórios** (`pintura`): Tintas látex e acrílicas, tintas spray, solventes e thinners, fitas crepe automotivas e de proteção, trinchas e pincéis, corantes.
5. **Tubos e Conexões** (`hidraulica`): Conexões soldáveis de água e esgoto, tubos, ralos, grelhas de alumínio, sifões, engates flexíveis e caixas Sabesp.
6. **Elétrica e Iluminação** (`eletrica`): Cabos flexíveis, módulos de tomada e interruptores, disjuntores, conduítes e lâmpadas LED.
7. **Banheiro e Cozinha** (`banheiro-e-cozinha`): Bacias sanitárias, assentos sanitários soft, pias de granito, gabinetes de aço para pia, torneiras de pia e bancada, válvulas inox e chuveiros elétricos.
8. **Ferramentas e Equipamentos** (`ferramentas`): Pás de bico, carriolas/carrinhos de mão, trenas métricas, chaves combinadas, discos de corte, espátulas, aplicadores de silicone e blocos de espuma.
9. **Ferragens e Segurança** (`ferragens`): Fechaduras de banheiro e externas, pregos com cabeça, mãos francesas/cantoneiras, parafusos, buchas e dobradiças.
10. **Jardim e Área Externa** (`jardim-e-utilidades`): Mangueiras de jardim, engates rápidos, esguichos, desengripantes e lubrificantes multiuso.

