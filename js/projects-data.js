/* ══════════════════════════════════════════════════════════════
   PROJECTS — banco de dados do site
   ──────────────────────────────────────────────────────────────
   Cada projeto é uma "cápsula". Pra adicionar / editar um projeto
   você mexe SÓ neste arquivo. A página projeto.html monta tudo.

   ESTRUTURA DE UM PROJETO
   ───────────────────────
   'id-do-projeto': {
     title:    'Nome',            // título grande
     subtitle: 'Subtítulo',       // linha de baixo (campanha, peça…)
     client:   'Cliente',
     category: 'Publicidade',     // Publicidade | Real Time | Conteúdo | Institucional
     year:     '2024',
     cover:    'caminho.jpg',     // imagem de capa (fundo/topo)
     summary:  ['parágrafo 1', 'parágrafo 2'],   // o que foi feito
     credits:  [['Função','Nome'], …],            // ficha técnica
     hero:     { vimeo: '123' },  // filme principal no topo
     blocks:   [ … ],             // blocos de entrega (ver abaixo)
     next:     'proximo-id'       // navegação "próximo projeto"
   }

   TIPOS DE BLOCO (block.type)
   ───────────────────────────
   'film'   → vídeo grande 16:9 (filme oficial)
   'cuts'   → grade de vídeos 16:9 (cortes / versões)
   'social' → fileira de verticais 9:16 (reels / stories)
   'photos' → galeria de fotos (abre em tela cheia)

   Cada item de vídeo:  { vimeo:'123', title:'30"', sub:'opcional' }
   Cada item de foto:   { src:'caminho.jpg', alt:'descrição' }

   Sem vimeo/foto ainda? Deixe vimeo:'' ou src:'' — aparece um
   placeholder elegante até o conteúdo chegar.
══════════════════════════════════════════════════════════════ */

window.PROJECTS = {

  /* ════════════════ MODELO COMPLETO 01 ════════════════ */
  'centauro-natal': {
    title:    'Centauro',
    subtitle: 'Natal',
    client:   'Centauro',
    category: 'Publicidade',
    year:     '2024',
    cover:    'assets/images/thumbnails/centauro-natal.jpg',
    summary: [
      'Campanha de Natal da Centauro: do roteiro à entrega final, conduzimos a produção do filme oficial e de todos os desdobramentos para redes sociais.',
      'Um pacote completo pensado para o varejo esportivo no período mais competitivo do ano — com um filme principal de marca e uma série de peças curtas para sustentar a campanha nos canais digitais.'
    ],
    credits: [
      ['Cliente',    'Centauro'],
      ['Agência',    'Labof'],
      ['Produção',   'Labof Films'],
      ['Direção',    'Beatriz Garbin'],
      ['Direção de Fotografia', 'Guilherme Fernandez'],
      ['Steadicam',  'Daniel Santi'],
      ['Edição',     'Iago Théo'],
      ['Color',      'Lucas Pires'],
      ['Ano',        '2024'],
    ],
    hero: { vimeo: '1168498394' },
    blocks: [
      {
        type: 'film',
        label: 'Filme Oficial',
        items: [
          { vimeo: '1168498394', title: 'Filme de Natal', sub: 'com Felipão' }
        ]
      },
    ],
    next: 'avatim-ivete'
  },

  /* ════════════════ MODELO COMPLETO 02 ════════════════ */
  'havaianas': {
    title:    'Havaianas',
    subtitle: 'Cabeça, ombro, joelho e pé',
    client:   'Havaianas',
    category: 'Publicidade',
    year:     '2024',
    cover:    'assets/images/thumbnails/havaianas.jpg',
    summary: [
      '“Cabeça, ombro, joelho e pé” foi o ponto de partida da campanha de Havaianas que mostrou que o portfólio da marca vai muito além dos pés. Um filme cheio de ritmo, cor e movimento, que tivemos o prazer de criar e produzir do início ao fim.',
      'Na nossa produtora, desafio é combustível. Seja qual for a marca ou o briefing, buscamos sempre um olhar NONTRADITIONAL para criar conteúdos que impactam de verdade. Na campanha de Havaianas, a missão era apresentar produtos pouco conhecidos — e, sem recorrer a celebridades, mostramos que diversidade, autenticidade e criatividade podem ser protagonistas.',
      'Porque todo desafio é uma chance de transformar ideias em histórias que fazem diferença.'
    ],
    credits: [
      ['Cliente',    'Havaianas'],
      ['Direção',    '—'],
      ['Produção',   'Labof Films'],
      ['Direção de Fotografia', '—'],
      ['Ano',        '2024'],
    ],
    hero: { vimeo: '549407968' },
    blocks: [
      {
        type: 'film',
        label: 'Filme Oficial',
        items: [ { vimeo: '549407968', title: 'Filme Havaianas' } ]
      },
    ],
    next: 'outback'
  },

  /* ════════════════ DEMAIS PROJETOS ════════════════
     Estrutura pronta — preencha vimeo/fotos quando tiver. */

  'outback': {
    title: 'Outback', subtitle: 'Com que roupa eu vou?',
    client: 'Outback', category: 'Publicidade', year: '2024',
    cover: 'assets/images/thumbnails/outback.jpg',
    summary: [
      'Alguns projetos vão além do roteiro. Eles despertam memórias, evocam sensações e criam conexões. Foi a partir dessa ideia que desenvolvemos esta campanha para o Outback Brasil.',
      'Da concepção à produção, transformamos sabores e experiências em uma narrativa visual capaz de traduzir a essência da marca e aproximá-la do público. Um projeto que une criatividade, storytelling e emoção.'
    ],
    credits: [['Cliente','Outback'],['Produção','Labof Films'],['Ano','2024']],
    hero: { vimeo: '1202701373' },
    blocks: [
      { type:'film', label:'Filme Oficial', items:[{ vimeo:'1202701373', title:'Filme' }] },
    ],
    next: 'ford-mustang'
  },

  'ford-mustang': {
    title: 'Ford', subtitle: 'Mustang Mach-E',
    client: 'Ford', category: 'Publicidade', year: '2024',
    cover: 'assets/images/thumbnails/ford-mustang.jpg',
    summary: [
      'Acompanhar o Mustang Mach-E de perto durante um evento em tempo real foi vivenciar intensidade do começo ao fim. Um carro que entrega potência, agilidade e uma performance impressionante, indo de 0 a 100 km/h em apenas 3.6 segundos.',
      'Nem a chuva diminuiu a energia da experiência. Pelo contrário: trouxe ainda mais força para um cenário onde cada detalhe acontecia no limite entre velocidade, precisão e timing.',
      'Em produções assim, tudo acontece ao vivo, rápido e em constante movimento. E é exatamente nessa dinâmica que a Labof Films encontra sua essência: transformar velocidade, atmosfera e emoção em conteúdos que fazem a experiência ser sentida em cada frame.'
    ],
    credits: [['Cliente','Ford'],['Produção','Labof Films'],['Ano','2024']],
    hero: { vimeo: '896895463' },
    blocks: [
      { type:'film', label:'Filme Oficial', items:[{ vimeo:'896895463', title:'Mustang Mach-E' }] },
    ],
    next: 'centauro-natal'
  },

  'avatim-ivete': {
    title: 'Avatim', subtitle: 'Ivete',
    client: 'Avatim', category: 'Publicidade', year: '2024',
    cover: 'assets/images/thumbnails/avatim-ivete.jpg',
    summary: ['Conteúdo de marca para a Avatim com Ivete Sangalo.'],
    credits: [['Cliente','Avatim'],['Produção','Labof Films'],['Ano','2024']],
    hero: { vimeo: '1202701374' },
    blocks: [
      { type:'film', label:'Filme Oficial', items:[{ vimeo:'1202701374', title:'Filme' }] },
    ],
    next: 'centauro-copa'
  },

  'ford-wec': {
    title: 'WEC', subtitle: 'Ford — Real Time',
    client: 'Ford', category: 'Real Time', year: '2024',
    cover: 'assets/images/thumbnails/ford-wec.jpg',
    summary: [
      'Entregar um conteúdo em real time é como estar em um box de corrida: a velocidade com que tudo acontece e a precisão que temos em cada movimento, em cada take, em cada corte, cada direcionamento tem um propósito. Precisamos estar atentos, decididos e preparados para tudo que possa acontecer.',
      'Essa entrega em real time exala a mesma energia que temos em acompanhar a Ford Performance. Nesse evento da FIA, na casa do automobilismo, foi um dia histórico para a marca e para nós.'
    ],
    credits: [['Cliente','Ford'],['Produção','Labof Films'],['Formato','Real Time'],['Ano','2024']],
    hero: { vimeo: '1103595061' },
    blocks: [
      { type:'film', label:'Destaque', items:[{ vimeo:'1103595061', title:'WEC' }] },
    ],
    next: 'ford-darkhorse'
  },

  'ford-darkhorse': {
    title: 'Dark Horse', subtitle: 'Ford — Real Time',
    client: 'Ford', category: 'Real Time', year: '2024',
    cover: 'assets/images/thumbnails/ford-darkhorse.jpg',
    summary: ['Cobertura Real Time Ford — Dark Horse.'],
    credits: [['Cliente','Ford'],['Produção','Labof Films'],['Formato','Real Time'],['Ano','2024']],
    hero: { vimeo: '1202701389' },
    blocks: [
      { type:'film', label:'Destaque', items:[{ vimeo:'1202701389', title:'Dark Horse' }] },
    ],
    next: 'avatim-snd'
  },

  'avatim-snd': {
    title: 'Avatim', subtitle: 'Sob Nova Direção',
    client: 'Avatim', category: 'Conteúdo', year: '2024',
    cover: 'assets/images/thumbnails/avatim-snd.jpg',
    summary: [
      'Com Ingrid Guimarães e Heloísa Périssé, esta campanha transforma uma memória afetiva presente no imaginário de muitos brasileiros em uma narrativa leve e bem-humorada. Um projeto construído para despertar identificação, nostalgia e conexão com o público.'
    ],
    credits: [['Cliente','Avatim'],['Produção','Labof Films'],['Ano','2024']],
    hero: { vimeo: '1034055050' },
    blocks: [
      { type:'film', label:'Episódio', items:[{ vimeo:'1034055050', title:'Sob Nova Direção' }] },
    ],
    next: 'ford-fernando-sorocaba'
  },

  'ford-fernando-sorocaba': {
    title: 'Ford', subtitle: 'Fernando & Sorocaba',
    client: 'Ford', category: 'Conteúdo', year: '2025',
    cover: 'assets/images/thumbnails/ford-fernando-sorocaba.jpg',
    summary: ['Abertura do show do Fernando & Sorocaba com a Ford Brasil.'],
    credits: [
      ['Cliente',   'Ford Brasil'],
      ['Produção',  'Labof Films'],
      ['Direção',   'Beatriz Garbin e Vitor Faria'],
      ['Direção de Fotografia', 'Guilherme Fernandez'],
      ['Edição',    'Ana Vedovato'],
    ],
    hero: { vimeo: '1194520209' },
    blocks: [
      { type:'film', label:'Filme', items:[{ vimeo:'1194520209', title:'Abertura do Show' }] },
    ],
    next: 'avon-rebranding'
  },

  'ford-employees': {
    title: 'Ford', subtitle: 'Employees',
    client: 'Ford', category: 'Institucional', year: '2024',
    cover: 'assets/images/thumbnails/ford-employees.jpg',
    summary: [
      'Quando recebemos o pedido de um filme institucional para a Ford, tínhamos a certeza de que não seria apenas mais um conteúdo. A ideia era trazer a essência do que é trabalhar em uma das maiores montadoras do mundo. Percorremos São Paulo, Camaçari, Tatuí e a Argentina para retratar a realidade desses espaços e dessas pessoas tão incríveis que trabalham há tantos anos para uma das marcas em que mais acreditamos.'
    ],
    credits: [['Cliente','Ford'],['Produção','Labof Films'],['Ano','2024']],
    hero: { vimeo: '1056047226' },
    blocks: [
      { type:'film', label:'Filme Institucional', items:[{ vimeo:'1056047226', title:'Employees' }] },
    ],
    next: 'centauro-pais'
  },

  'centauro-pais': {
    title: 'Centauro', subtitle: 'Dia dos Pais',
    client: 'Centauro', category: 'Institucional', year: '2024',
    cover: 'assets/images/thumbnails/centauro-pais.jpg',
    summary: [
      'Celebrar o Dia dos Pais é falar sobre presença, conexão e histórias que se constroem no dia a dia. É sobre aquele passe certeiro, a corrida lado a lado, o incentivo que transforma esforço em conquista.',
      'O esporte tem essa força única: ele une, aproxima e cria memórias que resistem ao tempo.',
      'Foi com essa essência que registramos cenas que mostram que o verdadeiro legado do esporte está nos vínculos que ele constrói.'
    ],
    credits: [
      ['Cliente',   'Centauro'],
      ['Produção',  'Labof Films'],
      ['Direção',   'Beatriz Garbin'],
      ['Direção de Fotografia', 'Caio Humb'],
      ['Edição',    'Ana Vedovato'],
      ['Color',     'Lucas Pires'],
      ['Ano',       '2024'],
    ],
    hero: { vimeo: '1104136580' },
    blocks: [
      { type:'film', label:'Filme Oficial', items:[{ vimeo:'1104136580', title:'Dia dos Pais' }] },
    ],
    next: 'havaianas'
  },

  /* ════════════════ NOVOS — vídeo pendente (aguardando link Vimeo) ════════════════ */

  'centauro-copa': {
    title: 'Centauro', subtitle: 'Copa',
    client: 'Centauro', category: 'Publicidade', year: '2022',
    cover: 'assets/images/thumbnails/centauro-copa.jpg',
    summary: [
      'Existem poucos momentos capazes de unir um país inteiro da mesma forma que uma Copa do Mundo.',
      'Foi essa emoção que buscamos capturar ao lado da Centauro. Em um filme repleto de energia, a bola percorre um time formado por Denílson, Negrete, Sgarbi, Milene Domingues, Frajola, Tulinho e Gandula, conectando diferentes personalidades por uma paixão que faz parte da identidade do Brasil.',
      'Com a presença vibrante do Movimento Verde e Amarelo em cena, registramos muito mais do que uma campanha. Registramos um sentimento coletivo que, a cada Copa, nos lembra por que o futebol ocupa um lugar tão especial na memória e no coração dos brasileiros.'
    ],
    credits: [
      ['Cliente',   'Centauro'],
      ['Produção',  'Labof Films'],
      ['Direção',   'Beatriz Garbin'],
      ['Direção de Fotografia', 'Guilherme Fernandes e Felipe Correia'],
      ['Edição',    'Natália Farias'],
    ],
    hero: { vimeo: '1202701375' },
    blocks: [
      { type:'film', label:'Filme Oficial', items:[{ vimeo:'1202701375', title:'Filme Copa' }] },
    ],
    next: 'ford-wec'
  },

  'avon-rebranding': {
    title: 'Avon', subtitle: 'Rebranding',
    client: 'Avon', category: 'Conteúdo', year: '2024',
    cover: 'assets/images/thumbnails/avon-rebranding.jpg',
    summary: [
      'Acompanhar de perto um rebranding é acompanhar também uma nova fase de propósito e conexão com o público. A Labof Films foi convidada a captar o evento que marcou o reposicionamento da Avon como uma marca ainda mais atual, jovem e presente na vida das pessoas.',
      'Entre talks e encontros inspiradores, mulheres de trajetórias marcantes como Maria da Penha Maia Fernandes, Raquel, Fabiana Justus e Laísa Lima ajudaram a construir uma noite potente e cheia de significado.',
      'Um momento importante para a marca e especial para nós fazermos parte desse registro.'
    ],
    credits: [
      ['Cliente',  'Avon'],
      ['Produção', 'Labof Films'],
    ],
    hero: { vimeo: '' },   // ← aguardando link do Vimeo
    blocks: [
      { type:'film', label:'Filme', items:[{ vimeo:'', title:'Evento Avon' }] },
    ],
    next: 'ford-minhas-experiencias'
  },

  'ford-minhas-experiencias': {
    title: 'Ford', subtitle: 'Minhas Experiências',
    client: 'Ford', category: 'Conteúdo', year: '2024',
    cover: 'assets/images/thumbnails/ford-minhas-experiencias.jpg',
    summary: [],
    credits: [
      ['Cliente',  'Ford'],
      ['Produção', 'Labof Films'],
    ],
    hero: { vimeo: '1202701583' },
    blocks: [
      { type:'film', label:'Filme', items:[{ vimeo:'1202701583', title:'Minhas Experiências' }] },
    ],
    next: 'xp-expert-trader'
  },

  'xp-expert-trader': {
    title: 'XP', subtitle: 'Expert Trader',
    client: 'XP Investimentos', category: 'Conteúdo', year: '2024',
    cover: 'assets/images/thumbnails/xp.jpg',
    summary: [],
    credits: [
      ['Cliente',  'XP Investimentos'],
      ['Produção', 'Labof Films'],
    ],
    hero: { vimeo: '1202701372' },
    blocks: [
      {
        type: 'social',
        label: 'Expert Trader',
        items: [
          { vimeo: '1202701372', title: 'Expert Trader 01' },
          { vimeo: '1202701671', title: 'Expert Trader 02' },
          { vimeo: '1202701697', title: 'Expert Trader 03' },
          { vimeo: '1202701739', title: 'Expert Trader 04' },
          { vimeo: '1202701789', title: 'Expert Trader 05' },
        ]
      },
    ],
    next: 'ford-employees'
  },

};
