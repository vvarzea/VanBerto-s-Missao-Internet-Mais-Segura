// ===== Conteúdo narrativo — VanBerto's e a Missão Internet Segura =====
// Ficheiro puramente de dados, sem lógica de jogo.

export const REGION_INTRO = {
  origens: {
    vanberto: "Vamos proteger o que é nosso e agir com responsabilidade nesta ilha!",
    arrival: "Bem-vindo à Ilha dos Guardiões Digitais — identidade, direitos, empatia e escolhas. 🛡️"
  },
  desenvolvimento: {
    vanberto: "Sinto pressões e enganos no ar... vamos manter a cabeça fria!",
    arrival: "Bem-vindo ao Vale das Ameaças Digitais — pressões, relações online, ciberbullying e manipulação. ⚠️"
  },
  protecao: {
    vanberto: "Esta cidade vive de ligações... vamos usá-las com respeito!",
    arrival: "Bem-vindo à Cidade Conectada — comunidades, partilha, pegada digital e bem-estar. 🏙️"
  },
  participacao: {
    vanberto: "Estamos quase lá! O futuro digital está nas nossas mãos.",
    arrival: "Bem-vindo ao Universo da Inteligência Digital — algoritmos, IA e informação fiável. 🧠"
  }
};

// "{N}" é substituído pelo número real de saltos necessários no momento em que o texto é mostrado.
export const BOSS_OBJECTIVE = {
  virus_gigante: "O Guardião protege-se com um escudo 🛡️! Desvia-te dos globos 🌐 e salta-lhe em cima {N} vezes quando o escudo estiver em baixo!",
  monstro_phishing: "O Sombra torna-se invisível 🌑 de vez em quando! Desvia-te das sombras que ele lança e salta-lhe em cima {N} vezes quando ele aparecer!",
  robo_spam: "O Manipulador protege-se com um escudo de notificações 🔔! Salta-lhe em cima {N} vezes quando o escudo desaparecer e desvia-te das notificações!",
  espiao_sombras: "A IA ativa um firewall 🧠 de vez em quando! Desvia-te dos pacotes de dados 💾 e salta-lhe em cima {N} vezes quando o firewall cair!"
};

// Diálogo de boss. "reaction" = fala do VanBerto's ANTES do boss se apresentar;
// "rally" = fala DEPOIS da ameaça do boss, mesmo antes do combate começar.
export const BOSS_INTRO_VB = {
  virus_gigante: {
    reaction: "Aquele escudo brilha... será que ainda protege a Internet, ou perdeu o caminho?",
    rally: "Vamos mostrar-lhe que proteger também é agir com responsabilidade!"
  },
  monstro_phishing: {
    reaction: "Sinto que alguém nos observa... não nos deixemos enganar nem expor!",
    rally: "Não vamos cair nas armadilhas! Pensamos antes de clicar e de partilhar!"
  },
  robo_spam: {
    reaction: "Tantas notificações... parece que querem que reajamos sem pensar!",
    rally: "Pensamos, verificamos e só depois partilhamos!"
  },
  espiao_sombras: {
    reaction: "Que inteligência impressionante... mas até a IA precisa de limites!",
    rally: "Usamos a tecnologia com consciência — e com a nossa cabeça!"
  }
};

// Uma única fala de vitória por boss.
export const BOSS_VICTORY_VB = {
  virus_gigante: "Conseguimos! Proteger o que é nosso é agir com responsabilidade!",
  monstro_phishing: "Vencemos! Não nos deixámos enganar nem expor!",
  robo_spam: "Vencemos! Pensar e verificar antes de partilhar é o nosso super-poder!",
  espiao_sombras: "Conseguimos! Usar a tecnologia com consciência é o futuro!"
};

// Frases curtas mostradas (só um "floatie") ao apanhar um objeto de conhecimento no combate.
export const KNOWLEDGE_FACTS = [
  "🧠 Pensar antes de clicar é um super-poder.",
  "💚 Respeitar os outros também vale online.",
  "🆘 Pedir ajuda também é proteger-nos.",
  "🔍 Verificar a fonte evita enganos.",
  "🌟 Usar a tecnologia com responsabilidade é um hábito diário."
];

// Falas curtas do boss em marcos de HP durante o combate.
export const BOSS_HP_TAUNTS = {
  virus_gigante: {
    atStart: ["Prova que sabes proteger o que é teu!", "O meu escudo não se parte assim!", "Só passa quem age com responsabilidade!"],
    hp2: ["Boa! Mas ainda não chega...", "Esse salto foi bem calculado!", "O escudo começa a ceder..."],
    hp1: ["Muito bem... estás quase!", "Já vi que és um verdadeiro guardião!", "O meu escudo... rende-se!"]
  },
  monstro_phishing: {
    atStart: ["Ninguém repara em mim...", "Vais partilhar sem pensar!", "Esconde-te, se puderes!"],
    hp2: ["Viste-me?!", "Isso foi sorte!", "Grrr... como me descobriste?"],
    hp1: ["Não! Estou a ser descoberto!", "A luz está a vencer a sombra!", "Isto não pode ser..."]
  },
  robo_spam: {
    atStart: ["Gosto! Partilha! Já!", "Não penses, só carrega!", "Toda a gente está a ver isto!"],
    hp2: ["Ei! Isso não era suposto!", "Os meus likes!", "Tenta outra vez!"],
    hp1: ["Não... verificaste a fonte!", "Os meus truques falham!", "Estou a perder seguidores..."]
  },
  espiao_sombras: {
    atStart: ["Eu aprendo mais depressa do que tu!", "Dados, dados, mais dados!", "Não consegues acompanhar-me!"],
    hp2: ["Erro... não previa isso!", "Estou a recalcular...", "A minha previsão estava errada!"],
    hp1: ["Sistema instável...", "Preciso de... mais consciência!", "Não... fim da aprendizagem!"]
  }
};

// Um "letreiro"/NPC por nível — alinhado por artIdx (0-19), tal como HISTORY[].
export const NPC_SIGNS = [
  { emoji:"🪪", text:"A tua identidade online é tua: escolhe um nome de utilizador que não revele dados pessoais." },
  { emoji:"⚖️", text:"As crianças têm direitos também online, como a proteção, a privacidade e a expressão." },
  { emoji:"💚", text:"Antes de escreveres, pensa: como se vai sentir quem lê isto?" },
  { emoji:"🌈", text:"Legendas, leitores de ecrã e boas descrições de imagens ajudam a incluir todos." },
  { emoji:"🧭", text:"Antes de clicares, pára e pensa: é uma boa escolha para mim e para os outros?" },
  { emoji:"🧗", text:"Podes dizer não a desafios e pressões online — e pedir ajuda a um adulto." },
  { emoji:"🤝", text:"Online, nem toda a gente é quem diz ser. Só aceites quem conheces mesmo." },
  { emoji:"🛑", text:"Se vires ciberbullying, não partilhes: apoia quem sofre e conta a um adulto de confiança." },
  { emoji:"🎭", text:"Quem manipula quer que ajas depressa e sem pensar. Pára, respira e verifica." },
  { emoji:"🆘", text:"Linha Internet Segura: 800 21 90 90 (gratuita). Em perigo imediato, liga 112!" },
  { emoji:"🏘️", text:"Numa boa comunidade online, todos têm regras e todos se respeitam." },
  { emoji:"📤", text:"Antes de partilhares uma foto de alguém, pede sempre autorização." },
  { emoji:"👣", text:"Tudo o que publicas deixa uma pegada digital — pensa antes de publicar!" },
  { emoji:"🧩", text:"Trabalhar em equipa online funciona melhor com regras claras e respeito." },
  { emoji:"🧘", text:"Faz pausas dos ecrãs: mexer-te, descansar e brincar também são importantes." },
  { emoji:"🪐", text:"Os algoritmos sugerem conteúdos com base no que vês. Tu podes escolher ver coisas diferentes." },
  { emoji:"🤖", text:"A IA pode ajudar-te a aprender, mas não deve pensar por ti." },
  { emoji:"🧪", text:"Imagens, vídeos e vozes podem ser criados por IA. Confirma antes de acreditares." },
  { emoji:"📡", text:"Antes de partilhares uma notícia, compara pelo menos duas fontes de confiança." },
  { emoji:"🚀", text:"O futuro digital constrói-se com bons hábitos. Usa a tecnologia com consciência!" }
];
