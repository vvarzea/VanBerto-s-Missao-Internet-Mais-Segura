// ===== Sistemas de progressão: mapa, artefactos, conquistas — MISSÃO CIBERSEGURANÇA =====
// MAP_REGIONS, ARTEFACTS, ARTEFACT_SETS, SET_REACTIONS, ACHIEVEMENTS_DEFS

// Mantém os 20 níveis e a sua dificuldade intactos (só o TEMA de cada
// nível mudou, ver data-levels.js). Os 4 mundos e as posições dos bosses
// mantêm-se exatamente iguais à estrutura original.
export const MAP_REGIONS = [
  { id:"origens",        icon:"🛡️", name:"Ilha dos Guardiões Digitais",      sub:"Identidade, direitos, empatia e o Guardião da Internet", levels:[0,1,2,3,4],
    mapBg:"map-mundo1.webp",
    nodePos:[{x:22.7,y:85.0},{x:37.1,y:76.5},{x:52.6,y:68.0},{x:68.8,y:51.0},{x:85.5,y:20.2}] },
  { id:"desenvolvimento",icon:"⚠️", name:"Vale das Ameaças Digitais",        sub:"Pressões, relações online e o Sombra das Redes",        levels:[5,6,7,8,9],
    mapBg:"map-mundo2.webp",
    nodePos:[{x:18.0,y:58.0},{x:30.0,y:60.5},{x:43.0,y:60.5},{x:55.0,y:57.0},{x:73.0,y:48.0}] },
  { id:"protecao",       icon:"🏙️", name:"Cidade Conectada",                 sub:"Comunidades, partilha e o Manipulador Digital",          levels:[10,11,12,13,14],
    mapBg:"map-mundo3.webp",
    nodePos:[{x:12.0,y:84.0},{x:30.0,y:79.0},{x:50.0,y:72.5},{x:69.0,y:78.0},{x:85.0,y:67.0}] },
  { id:"participacao",   icon:"🧠", name:"Universo da Inteligência Digital", sub:"Algoritmos, IA e a Inteligência Artificial",             levels:[15,16,17,18,19],
    mapBg:"map-mundo4.webp",
    nodePos:[{x:5.0,y:78.0},{x:18.0,y:89.0},{x:35.0,y:82.0},{x:30.0,y:59.0},{x:50.0,y:53.0}] },
  { id:"base",           icon:"🏠", name:"Base do VanBerto's",            sub:"O teu ponto de partida",                           levels:[] },
];

export const ARTEFACTS = [
  { emoji:"🪪", name:"Crachá da Identidade", short:"O Portal da Identidade", color:"#40d0ff", glow:"rgba(64,208,255,0.6)", vanberto:"A tua identidade digital é só tua — cuida dela!", set:0 },
  { emoji:"⚖️", name:"Balança dos Direitos", short:"A Fortaleza dos Direitos", color:"#ffd700", glow:"rgba(255,215,0,0.6)", vanberto:"Online também tens direitos e deveres!", set:0 },
  { emoji:"💚", name:"Coração da Empatia", short:"A Floresta da Empatia", color:"#ff9060", glow:"rgba(255,144,96,0.6)", vanberto:"Antes de escrever, pensa como o outro se vai sentir.", set:0 },
  { emoji:"🌈", name:"Flor da Inclusão", short:"O Jardim da Inclusão", color:"#80ffb0", glow:"rgba(128,255,176,0.6)", vanberto:"Todos merecem ser incluídos, online e offline.", set:0 },
  { emoji:"🧭", name:"Bússola das Escolhas", short:"O Farol das Escolhas", color:"#e0409a", glow:"rgba(224,64,154,0.6)", vanberto:"Antes de clicar, pensa: é uma boa escolha?", set:0 },
  { emoji:"🧗", name:"Capacete da Coragem", short:"O Desfiladeiro das Pressões", color:"#c0a0ff", glow:"rgba(192,160,255,0.6)", vanberto:"Podes dizer não, mesmo quando todos dizem sim.", set:1 },
  { emoji:"🤝", name:"Lanterna da Confiança", short:"A Caverna das Relações Online", color:"#60e060", glow:"rgba(96,224,96,0.6)", vanberto:"Nem toda a gente online é quem diz ser.", set:1 },
  { emoji:"🛑", name:"Escudo Anti-Bullying", short:"O Pântano do Ciberbullying", color:"#ffa040", glow:"rgba(255,160,64,0.6)", vanberto:"Se vires bullying, não partilhes: apoia e pede ajuda.", set:1 },
  { emoji:"🎭", name:"Máscara Desmascarada", short:"A Ponte da Manipulação", color:"#8a5cff", glow:"rgba(138,92,255,0.6)", vanberto:"Quem manipula quer que ajas sem pensar. Pára e verifica!", set:1 },
  { emoji:"🆘", name:"Farol do Apoio", short:"A Fortaleza do Apoio", color:"#ffe060", glow:"rgba(255,224,96,0.6)", vanberto:"Há sempre alguém de confiança para te ajudar.", set:1 },
  { emoji:"🏘️", name:"Bandeira da Comunidade", short:"A Praça das Comunidades", color:"#60ffff", glow:"rgba(96,255,255,0.6)", vanberto:"Numa boa comunidade, todos se respeitam.", set:2 },
  { emoji:"📤", name:"Caixa da Partilha", short:"O Bairro da Partilha Responsável", color:"#ffc060", glow:"rgba(255,192,96,0.6)", vanberto:"Antes de partilhares, pensa em quem pode ser afetado.", set:2 },
  { emoji:"👣", name:"Pegada Dourada", short:"A Avenida da Pegada Digital", color:"#80c8ff", glow:"rgba(128,200,255,0.6)", vanberto:"Tudo o que publicas deixa rasto — pensa antes!", set:2 },
  { emoji:"🧩", name:"Peça da Colaboração", short:"A Torre da Colaboração", color:"#ff6060", glow:"rgba(255,96,96,0.6)", vanberto:"Trabalhar em equipa online exige respeito e regras claras.", set:2 },
  { emoji:"🧘", name:"Relógio do Bem-Estar", short:"O Centro do Bem-Estar Digital", color:"#ffd080", glow:"rgba(255,208,128,0.6)", vanberto:"Equilibra o tempo de ecrã com descanso e brincadeira.", set:2 },
  { emoji:"🪐", name:"Satélite dos Algoritmos", short:"O Planeta dos Algoritmos", color:"#c080ff", glow:"rgba(192,128,255,0.6)", vanberto:"Os algoritmos sugerem conteúdos — tu decides o que vês.", set:3 },
  { emoji:"🤖", name:"Chip da IA Responsável", short:"O Laboratório da Inteligência Artificial", color:"#ff80a0", glow:"rgba(255,128,160,0.6)", vanberto:"A IA ajuda, mas não substitui o teu pensamento.", set:3 },
  { emoji:"🧪", name:"Lupa dos Deepfakes", short:"O Mundo dos Conteúdos Sintéticos", color:"#60d0ff", glow:"rgba(96,208,255,0.6)", vanberto:"Imagens e vozes podem ser criadas por IA — confirma antes de acreditares.", set:3 },
  { emoji:"📡", name:"Antena da Informação Fiável", short:"A Estação da Informação Fiável", color:"#80ff80", glow:"rgba(128,255,128,0.6)", vanberto:"Compara várias fontes antes de acreditar e de partilhar.", set:3 },
  { emoji:"🚀", name:"Coroa do Futuro Digital", short:"O Núcleo do Futuro Digital", color:"#ff6b35", glow:"rgba(255,107,53,0.6)", vanberto:"Usa a tecnologia com consciência — o futuro constrói-se com bons hábitos.", set:3 },
];

export const ARTEFACT_SETS = [
  { name:"Guardiões Digitais",     icon:"🛡️", bonus:150 },
  { name:"Ameaças Digitais",       icon:"⚠️", bonus:150 },
  { name:"Cidade Conectada",       icon:"🏙️", bonus:150 },
  { name:"Inteligência Digital",   icon:"🧠", bonus:200 },
];

export const SET_REACTIONS = [
  "🎉 Conjunto FUNDAMENTOS completo! És um verdadeiro pioneiro da internet!",
  "📡 Conjunto COMUNICAÇÃO completo! Ninguém te engana com fake news ou phishing!",
  "🛡️ Conjunto PROTEÇÃO completo! Os teus dispositivos estão sempre seguros!",
  "🔒 Conjunto COMPLETO! GUARDIÃO SUPREMO da Internet Segura!",
];

export const ACHIEVEMENTS_DEFS = [
  { id:"primeiros_passos", tier:"🥉", name:"Primeiros Passos",        desc:"Completa o primeiro nível." },
  { id:"curioso",          tier:"🥉", name:"Curioso",                  desc:"Lê 10 curiosidades." },
  { id:"explorador",       tier:"🥈", name:"Explorador",               desc:"Encontra todos os segredos de um nível." },
  { id:"sabio",            tier:"🥈", name:"Sábio",                    desc:"Acerta 20 perguntas." },
  { id:"caca_tesouros",    tier:"🏆", name:"Caçador de Tesouros",      desc:"Encontra todas as salas secretas do jogo." },
  { id:"guardiao",         tier:"🥇", name:"Guardião da Internet Segura",desc:"Completa o jogo." },
  { id:"mestre",           tier:"🥇", name:"Mestre VanBerto's",        desc:"Acerta todas as perguntas à primeira tentativa." },
  { id:"lenda",            tier:"🏆", name:"Lenda Digital",            desc:"100% de conclusão — todos os níveis e todas as estrelas." },
];
