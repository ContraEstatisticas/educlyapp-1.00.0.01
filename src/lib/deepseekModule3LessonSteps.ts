const textStep = (title: string, content: string, promptBox?: string) => ({
  type: "text" as const,
  title,
  content,
  ...(promptBox ? { promptBox } : {}),
});

const quizStep = (
  title: string,
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
) => ({
  type: "quiz" as const,
  title,
  question,
  options,
  correctIndex,
  explanation,
});

const fillStep = (
  title: string,
  instruction: string,
  sentence: string,
  answers: string[],
  options: string[],
  explanation: string,
) => ({
  type: "fill_blanks" as const,
  title,
  instruction,
  sentence,
  answers,
  options,
  explanation,
});

export const DEEPSEEK_MODULE_3_STEPS_PT = [
  textStep(
    "O Jeito Certo de Aprender Coisas Novas com o DeepSeek",
    "Bem-vindo de volta! Nesta lição, você vai descobrir como usar o DeepSeek como seu professor particular mais poderoso — aproveitando sua capacidade de raciocínio profundo para aprender qualquer assunto de forma estruturada, progressiva e verdadeiramente eficaz."
  ),
  textStep(
    "Por que o DeepSeek é Diferente como Ferramenta de Aprendizado",
    "A maioria dos assistentes de IA explica. O DeepSeek raciocina. Essa diferença é enorme quando o assunto é aprendizado. Ele não apenas entrega informações — ele decompõe conceitos, mostra o raciocínio por trás de cada ideia e constrói o conhecimento de forma lógica e progressiva."
  ),
  quizStep(
    "O Diferencial no Aprendizado",
    "O que torna o DeepSeek especialmente eficaz para aprendizado?",
    [
      "Sua capacidade de raciocinar passo a passo — mostrando não apenas o que é correto, mas por que é correto e como chegou àquela conclusão",
      "Ele memoriza seu progresso automaticamente entre sessões",
      "É o único assistente capaz de explicar conceitos complexos",
      "Funciona melhor para aprendizado de programação apenas"
    ],
    0,
    "Ver o 'porquê' e o 'como' é o que transforma informação em conhecimento real."
  ),
  textStep(
    "Começando do Zero com Estrutura",
    "O erro mais comum de quem quer aprender algo novo com IA é fazer perguntas soltas sem uma base estruturada. Com o DeepSeek, o ponto de partida certo é estabelecer o mapa completo do que você vai aprender antes de mergulhar nos detalhes."
  ),
  fillStep(
    "Mapeie o aprendizado!",
    "Preencha a lacuna para criar uma base sólida para o seu estudo.",
    '"Quero aprender ___ do zero. Antes de começar, crie um ___ completo do que preciso aprender, organizado do ___ ao ___, com os ___ de cada etapa e o que devo ser capaz de ___ ao final de cada fase."',
    ["filosofia estoica", "mapa de aprendizado", "mais fundamental", "mais avançado", "tópicos principais", "fazer ou entender"],
    ["filosofia estoica", "mapa de aprendizado", "mais fundamental", "mais avançado", "tópicos principais", "fazer ou entender", "texto simples", "rápidas", "ideias"],
    "Entender a estrutura completa evita o sentimento de aprender pedaços soltos sem conexão."
  ),
  quizStep(
    "Vantagem do Mapa de Aprendizado",
    "Por que criar um mapa de aprendizado antes de começar é mais eficaz do que ir fazendo perguntas aleatórias?",
    [
      "Porque o DeepSeek só responde bem quando tem um plano definido",
      "Para impressionar com organização sem benefício real",
      "Porque você entende a estrutura completa do assunto antes de mergulhar nos detalhes — evitando lacunas, saltos e a sensação de aprender pedaços soltos sem conexão",
      "Mapas de aprendizado só funcionam para assuntos técnicos"
    ],
    2,
    "Ter a visão do todo dá contexto para cada detalhe que você aprender depois."
  ),
  textStep(
    "Aprendendo com Raciocínio Visível",
    "A grande vantagem do DeepSeek R1 no aprendizado é poder ver o raciocínio por trás de cada explicação. Em vez de receber uma resposta pronta, você acompanha o processo de pensamento — o que acelera a compreensão real do conceito."
  ),
  fillStep(
    "Ative o raciocínio no aprendizado!",
    "Preencha a lacuna para ver a lógica por trás da explicação.",
    '"Explique o conceito de ___ mostrando seu ___ passo a passo. Não chegue direto à definição — ___ o problema que esse conceito resolve, mostre como alguém ___ chegaria a essa ideia e só então apresente a ___ formal com exemplos."',
    ["juros compostos", "raciocínio", "comece com", "naturalmente", "definição"],
    ["juros compostos", "raciocínio", "comece com", "naturalmente", "definição", "texto", "vago", "conclusão"],
    "Acompanhar o processo de pensamento acelera a compreensão profunda de qualquer conceito."
  ),
  quizStep(
    "Poder do Raciocínio Visível",
    "Por que aprender com raciocínio visível é mais eficaz do que receber definições prontas?",
    [
      "Porque definições prontas são sempre incorretas",
      "Para deixar a explicação mais longa",
      "Porque quando você entende o processo que levou ao conceito, a compreensão é mais profunda e duradoura — você não apenas memoriza, você entende o porquê",
      "Raciocínio visível só funciona para aprendizado de matemática"
    ],
    2,
    "Entender a lógica de construção de uma ideia torna o aprendizado muito mais resiliente ao esquecimento."
  ),
  textStep(
    "Criando seu Plano de Estudos com o DeepSeek",
    "Um plano de estudos bem estruturado é a diferença entre aprender de verdade e apenas sentir que está aprendendo. O DeepSeek cria planos detalhados e realistas baseados no seu objetivo, tempo e nível atual."
  ),
  fillStep(
    "Monte seu plano!",
    "Preencha a lacuna para criar seu cronograma personalizado.",
    '"Crie um plano de estudos para eu aprender ___ em ___. Tenho ___ por dia disponíveis. Meu nível atual é ___. O plano deve: ser ___ em semanas, incluir ___ para cada tópico, indicar como ___ o aprendizado de cada etapa e prever ___ para fixação."',
    ["análise de dados com Python", "3 meses", "1 hora", "iniciante absoluto", "dividido", "exercícios práticos", "verificar", "momentos de revisão"],
    ["análise de dados com Python", "3 meses", "1 hora", "iniciante absoluto", "dividido", "exercícios práticos", "verificar", "momentos de revisão", "rápido", "lento"],
    "Um plano com marcos claros e revisões mantém você focado e garante a evolução constante."
  ),
  quizStep(
    "Plano de Estudos Eficaz",
    "O que deve estar presente em um bom plano de estudos gerado pelo DeepSeek?",
    [
      "Apenas uma lista de tópicos para estudar",
      "O máximo de conteúdo possível para aproveitar o tempo",
      "Progressão lógica do básico ao avançado, exercícios práticos por etapa, momentos de revisão e formas de verificar o aprendizado antes de avançar",
      "Planos de estudo só funcionam para quem já tem conhecimento prévio na área"
    ],
    2,
    "Um plano equilibrado entre teoria, prática e revisão é a chave para a maestria."
  ),
  textStep(
    "Aprendendo com Analogias Personalizadas",
    "Conceitos difíceis ficam simples quando conectados a algo que você já conhece. O DeepSeek é especialmente bom em criar analogias sob medida — desde que você informe seu universo de referência."
  ),
  fillStep(
    "Peça analogias personalizadas!",
    "Preencha a lacuna para transformar o complexo em algo familiar.",
    '"Explique o conceito de ___ usando uma analogia com ___. Eu tenho experiência em ___ mas nunca estudei ___. Faça a analogia tão ___ que eu consiga visualizar o conceito sem precisar de nenhum conhecimento técnico prévio."',
    ["algoritmos de machine learning", "culinária e receitas", "gastronomia", "tecnologia", "clara e precisa"],
    ["algoritmos de machine learning", "culinária e receitas", "gastronomia", "tecnologia", "clara e precisa", "vaga", "complicada"],
    "Analogias usam caminhos neurais que você já tem para ancorar novos conhecimentos."
  ),
  quizStep(
    "Conector de Conhecimento",
    "Por que fornecer seu universo de referência ao pedir analogias melhora a explicação?",
    [
      "Porque o DeepSeek muda seu banco de dados com base na referência",
      "Para deixar a explicação mais criativa e divertida",
      "Porque o modelo usa conexões que já existem na sua mente para construir pontes com o conceito novo — tornando a compreensão imediata e muito mais duradoura",
      "Analogias personalizadas não funcionam para conceitos muito técnicos"
    ],
    2,
    "Referenciar o que você já domina é o atalho mais rápido para entender o novo."
  ),
  textStep(
    "Testando o que Você Aprendeu",
    "Aprender é uma coisa. Confirmar que realmente aprendeu é outra. O DeepSeek cria testes personalizados que vão além de múltipla escolha — avaliando se você entendeu o raciocínio por trás do conceito, não apenas a definição."
  ),
  fillStep(
    "Crie seu teste personalizado!",
    "Preencha a lacuna para validar sua compreensão real.",
    '"Acabei de estudar ___ com você. Agora crie um teste com ___ questões que avaliem se eu entendi o ___ por trás do conceito — não apenas a definição. Inclua questões de ___ diferentes: conceitual, ___ e ___. Após eu responder, analise meu raciocínio e aponte onde ___."',
    ["termodinâmica", "9", "raciocínio", "3 tipos", "aplicação prática", "análise crítica", "preciso melhorar"],
    ["termodinâmica", "9", "raciocínio", "3 tipos", "aplicação prática", "análise crítica", "preciso melhorar", "estou certo", "acertei"],
    "Testes de aplicação e raciocínio revelam lacunas que a simples memorização esconde."
  ),
  quizStep(
    "Avaliação de Qualidade",
    "O que diferencia um bom teste de aprendizado de uma simples lista de perguntas?",
    [
      "O número de questões — quanto mais, melhor",
      "Questões com respostas de verdadeiro ou falso apenas",
      "Questões que avaliam o raciocínio e a aplicação do conhecimento — não apenas a memorização de definições — revelando se o aprendizado foi superficial ou profundo",
      "Testes de aprendizado não são necessários quando se usa IA para estudar"
    ],
    2,
    "O teste deve forçar você a usar a informação em contextos novos, provando o domínio real."
  ),
  textStep(
    "Aprendendo pelo Método de Feynman com o DeepSeek",
    "O Método de Feynman é uma das técnicas de aprendizado mais eficazes do mundo — você aprende um conceito e depois tenta explicá-lo com palavras simples. Se consegue, aprendeu. Se trava, identificou exatamente onde está a lacuna. O DeepSeek é o parceiro perfeito para esse método."
  ),
  fillStep(
    "Aplique o Método Feynman!",
    "Preencha a lacuna para testar sua capacidade de simplificação.",
    '"Vou tentar explicar o conceito de ___ com minhas próprias palavras: [sua explicação]. Analise minha explicação e me diga: o que eu entendi ___, onde meu raciocínio está ___ ou ___ e quais ___ precisam ser revisitados. Não corrija diretamente — faça ___ que me levem a descobrir o erro sozinho."',
    ["relatividade especial", "corretamente", "incorreto", "incompleto", "conceitos", "perguntas"],
    ["relatividade especial", "corretamente", "incorreto", "incompleto", "conceitos", "perguntas", "respostas", "frases"],
    "Simplificar a explicação é a prova final de que você realmente entende o assunto."
  ),
  quizStep(
    "A Lógica de Feynman",
    "Por que o Método de Feynman combinado com o DeepSeek é tão poderoso?",
    [
      "Porque o DeepSeek sempre concorda com a explicação do aluno",
      "Para deixar o processo de aprendizado mais lento e detalhado",
      "Porque tentar explicar em voz alta revela exatamente onde o conhecimento é sólido e onde é superficial — e o DeepSeek usa perguntas para guiar a correção sem entregar a resposta pronta",
      "O Método de Feynman só funciona para ciências exatas"
    ],
    2,
    "As lacunas na sua explicação são os pontos onde seu aprendizado ainda precisa de atenção."
  ),
  textStep(
    "Aprofundando Conceitos Progressivamente",
    "O aprendizado real acontece em camadas. O DeepSeek permite ir do básico ao avançado de forma progressiva — cada resposta construindo sobre a anterior, sem saltos que criam lacunas."
  ),
  fillStep(
    "Aprenda em camadas!",
    "Preencha a lacuna para construir uma base sólida antes da complexidade.",
    '"Explique ___ em ___ níveis de profundidade crescente. Nível 1: explicação para quem nunca ouviu falar. Nível 2: aprofundamento com ___ e nuances. Nível 3: visão de ___ com conexões a outros conceitos. Pause entre cada nível e me pergunte se estou ___ antes de avançar."',
    ["economia comportamental", "3", "mecanismos", "especialista", "pronto para continuar"],
    ["economia comportamental", "3", "mecanismos", "especialista", "pronto para continuar", "feliz", "cansado"],
    "Controlar o aumento da complexidade evita a sobrecarga cognitiva e garante a base firme."
  ),
  quizStep(
    "Aprendizado em Camadas",
    "Por que aprender em níveis progressivos é mais eficaz do que pedir uma explicação completa de uma vez?",
    [
      "Porque o DeepSeek tem limite de informação por resposta",
      "Para dividir o conteúdo em partes menores sem benefício real",
      "Porque cada nível consolida a base antes de adicionar complexidade — evitando a sobrecarga cognitiva que acontece quando conceitos avançados são introduzidos antes da fundação estar sólida",
      "Níveis progressivos só funcionam para iniciantes absolutos"
    ],
    2,
    "Complexidade adicionada sobre uma base frágil resulta em confusão e esquecimento rápido."
  ),
  textStep(
    "Aprendendo com Casos Reais e Aplicações Práticas",
    "Teoria sem prática não vira conhecimento. O DeepSeek conecta qualquer conceito a casos reais e aplicações concretas — tornando o aprendizado muito mais relevante e memorável."
  ),
  fillStep(
    "Conecte teoria à prática!",
    "Preencha a lacuna para dar vida aos conceitos abstratos.",
    '"Acabei de entender o conceito de ___ em teoria. Agora me mostre ___ casos reais onde esse conceito foi aplicado com ___, ___ onde foi ignorado com consequências negativas e como eu poderia ___ esse conhecimento na minha realidade de ___."',
    ["viés de confirmação", "3", "sucesso", "situações", "aplicar", "tomada de decisão profissional"],
    ["viés de confirmação", "3", "sucesso", "situações", "aplicar", "tomada de decisão profissional", "estudo", "lazer"],
    "Ver o conceito 'em ação' revela as nuances que a teoria pura não consegue transmitir."
  ),
  quizStep(
    "Teoria vs Prática",
    "Por que conectar conceitos a casos reais acelera o aprendizado?",
    [
      "Porque casos reais são mais fáceis de memorizar do que conceitos",
      "Para deixar o conteúdo mais interessante sem benefício cognitivo",
      "Porque o cérebro retém informações conectadas a contextos concretos muito melhor do que conceitos abstratos — e ver o conceito em ação revela nuances que a teoria pura não mostra",
      "Casos reais só funcionam para aprendizado de negócios e gestão"
    ],
    2,
    "O cérebro é otimizado para lembrar de histórias e situações concretas, não de abstrações soltas."
  ),
  textStep(
    "Revisando e Consolidando com o DeepSeek",
    "A revisão espaçada é uma das técnicas de memorização mais comprovadas pela ciência. O DeepSeek cria sessões de revisão inteligentes que reforçam exatamente o que precisa ser fixado."
  ),
  fillStep(
    "Crie sua revisão!",
    "Preencha a lacuna para fixar o conhecimento de longo prazo.",
    '"Estudei os seguintes tópicos na última semana: [liste os tópicos]. Crie uma sessão de ___ que: comece pelos conceitos que mais ___ geram confusão, use perguntas que ___ o raciocínio em vez de memorização, identifique as ___ ainda presentes e sugira o que devo ___ antes de avançar para o próximo módulo."',
    ["revisão", "costumam", "testem", "lacunas", "revisar"],
    ["revisão", "costumam", "testem", "lacunas", "revisar", "texto", "vago", "conclusão"],
    "Sessões de revisão direcionadas economizam tempo e focam onde seu conhecimento está mais frágil."
  ),
  quizStep(
    "Revisão Inteligente",
    "Qual é a forma mais eficaz de usar o DeepSeek para revisão?",
    [
      "Reler todas as explicações anteriores do início ao fim",
      "Pedir um resumo geral de tudo que foi estudado",
      "Pedir questões que testem o raciocínio sobre os pontos mais difíceis — e usar as respostas erradas para identificar exatamente onde o conhecimento ainda está frágil",
      "Revisão com o DeepSeek só é útil antes de provas e avaliações"
    ],
    2,
    "Identificar e corrigir fraquezas é o que verdadeiramente consolida o conhecimento."
  ),
  textStep(
    "Aprendendo Idiomas com o DeepSeek",
    "Para aprendizado de idiomas, o DeepSeek funciona como professor de gramática, parceiro de conversação e analisador de erros — com a profundidade de raciocínio que o diferencia de outros assistentes."
  ),
  fillStep(
    "Aprenda idiomas com profundidade!",
    "Preencha a lacuna para dominar a estrutura de um novo idioma.",
    '"Quero praticar ___. Responda ___ durante toda a conversa. Quando eu cometer erros, não apenas ___ — explique o ___ gramatical por trás do erro, mostre ___ corretas e me faça ___ a estrutura correta em uma frase nova antes de continuar."',
    ["alemão intermediário", "apenas em alemão", "corrija", "raciocínio", "as formas", "praticar"],
    ["alemão intermediário", "apenas em alemão", "corrija", "raciocínio", "as formas", "praticar", "texto", "falar"],
    "Entender a 'lógica' do idioma é muito mais poderoso do que apenas decorar frases prontas."
  ),
  quizStep(
    "DeepSeek para Idiomas",
    "O que diferencia o aprendizado de idiomas com o DeepSeek do uso de aplicativos comuns?",
    [
      "O DeepSeek é mais rápido para responder do que outros aplicativos",
      "Aplicativos de idiomas não funcionam para níveis avançados",
      "O DeepSeek explica o raciocínio gramatical por trás de cada correção — construindo compreensão profunda da estrutura do idioma em vez de apenas treinar frases isoladas por repetição",
      "Não há diferença significativa entre o DeepSeek e aplicativos de idiomas"
    ],
    2,
    "Com o DeepSeek, você entende o sistema do idioma, não apenas as palavras."
  ),
  textStep(
    "A Regra de Ouro do Aprendizado com o DeepSeek",
    "O DeepSeek potencializa seu aprendizado — mas o esforço ainda é seu. Ele entrega o raciocínio, a estrutura, o teste e a revisão. A prática deliberada, a aplicação real e a consistência dependem de você."
  ),
  quizStep(
    "Responsabilidade e Consistência",
    "Qual é a afirmação correta sobre o aprendizado com o DeepSeek?",
    [
      "Quanto mais você usa o DeepSeek, menos precisa se esforçar para aprender",
      "O DeepSeek aprende junto com você e evolui conforme suas sessões avançam",
      "O DeepSeek acelera e aprofunda o caminho do aprendizado — mas a consistência, a prática deliberada e a aplicação real do conhecimento ainda dependem inteiramente do aluno",
      "Basta conversar com o DeepSeek antes de uma prova para garantir um bom resultado"
    ],
    2,
    "A IA é uma ferramenta de aceleração; o motor do aprendizado é o seu esforço consciente."
  ),
  textStep(
    "Conclusão",
    "O DeepSeek não é apenas um assistente que explica — é um parceiro de aprendizado que raciocina junto com você, mostra o processo por trás de cada conceito, cria planos estruturados, testa seu entendimento real e identifica lacunas com precisão cirúrgica.\n\nQuem aprende com o DeepSeek da forma certa não apenas absorve informações — desenvolve raciocínio. E raciocínio bem desenvolvido é o que transforma conhecimento em resultado real.\n\nAprenda com profundidade. Pense com clareza. Evolua com intenção.\n\nLição concluída ✓"
  ),
];

export const DEEPSEEK_MODULE_3_STEPS_EN = [
  textStep(
    "The Right Way to Learn New Things with DeepSeek",
    "Welcome back! In this lesson, you will discover how to use DeepSeek as your most powerful private tutor — leveraging its deep reasoning capacity to learn any subject in a structured, progressive, and truly effective way."
  ),
  textStep(
    "Why DeepSeek is Different as a Learning Tool",
    "Most AI assistants explain. DeepSeek reasons. This difference is huge when it comes to learning. It doesn't just deliver information — it decomposes concepts, shows the reasoning behind each idea, and builds knowledge in a logical and progressive way."
  ),
  quizStep(
    "The Learning Edge",
    "What makes DeepSeek especially effective for learning?",
    [
      "Its capacity to reason step-by-step — showing not just what is correct, but why it is correct and how it reached that conclusion",
      "It memorizes your progress automatically between sessions",
      "It is the only assistant capable of explaining complex concepts",
      "It works better for programming learning only"
    ],
    0,
    "Seeing the 'why' and the 'how' is what transforms information into real knowledge."
  ),
  textStep(
    "Starting from Scratch with Structure",
    "The most common mistake for those who want to learn something new with AI is asking loose questions without a structured basis. With DeepSeek, the right starting point is to establish the complete map of what you will learn before diving into details."
  ),
  fillStep(
    "Map the learning!",
    "Fill in the gap to create a solid foundation for your study.",
    '"I want to learn ___ from scratch. Before starting, create a complete ___ of what I need to learn, organized from ___ to ___, with the ___ of each stage and what I should be able to ___ at the end of each phase."',
    ["stoic philosophy", "learning map", "most fundamental", "most advanced", "main topics", "do or understand"],
    ["stoic philosophy", "learning map", "most fundamental", "most advanced", "main topics", "do or understand", "simple text", "fast", "ideas"],
    "Understanding the complete structure avoids the feeling of learning loose pieces without connection."
  ),
  quizStep(
    "Advantage of the Learning Map",
    "Why is creating a learning map before starting more effective than asking random questions?",
    [
      "Because DeepSeek only responds well when it has a defined plan",
      "To impress with organization without real benefit",
      "Because you understand the complete structure of the subject before diving into details — avoiding gaps, jumps, and the feeling of learning loose pieces without connection",
      "Learning maps only work for technical subjects"
    ],
    2,
    "Having the big picture gives context for every detail you learn later."
  ),
  textStep(
    "Learning with Visible Reasoning",
    "The great advantage of DeepSeek R1 in learning is being able to see the reasoning behind each explanation. Instead of receiving a ready-made answer, you follow the thought process — which accelerates real comprehension of the concept."
  ),
  fillStep(
    "Activate reasoning in learning!",
    "Fill in the gap to see the logic behind the explanation.",
    '"Explain the concept of ___ showing your ___ step-by-step. Don\'t go straight to the definition — ___ the problem that this concept solves, show how someone would ___ reach this idea, and only then present the formal ___ with examples."',
    ["compound interest", "reasoning", "start with", "naturally", "definition"],
    ["compound interest", "reasoning", "start with", "naturally", "definition", "text", "vague", "conclusion"],
    "Following the thought process accelerates the deep understanding of any concept."
  ),
  quizStep(
    "Power of Visible Reasoning",
    "Why is learning with visible reasoning more effective than receiving ready-made definitions?",
    [
      "Because ready-made definitions are always incorrect",
      "To make the explanation longer",
      "Because when you understand the process that led to the concept, the understanding is deeper and longer-lasting — you don't just memorize, you understand why",
      "Visible reasoning only works for mathematics learning"
    ],
    2,
    "Understanding the logic of building an idea makes learning much more resilient to forgetting."
  ),
  textStep(
    "Creating your Study Plan with DeepSeek",
    "A well-structured study plan is the difference between truly learning and just feeling like you are learning. DeepSeek creates detailed and realistic plans based on your goal, time, and current level."
  ),
  fillStep(
    "Build your plan!",
    "Fill in the gap to create your personalized schedule.",
    '"Create a study plan for me to learn ___ in ___. I have ___ per day available. My current level is ___. The plan should: be ___ in weeks, include ___ for each topic, indicate how to ___ the learning of each stage, and provide for ___ for consolidation."',
    ["data analysis with Python", "3 months", "1 hour", "absolute beginner", "divided", "practical exercises", "verify", "review moments"],
    ["data analysis with Python", "3 months", "1 hour", "absolute beginner", "divided", "practical exercises", "verify", "review moments", "fast", "slow"],
    "A plan with clear milestones and reviews keeps you focused and guarantees constant evolution."
  ),
  quizStep(
    "Effective Study Plan",
    "What should be present in a good study plan generated by DeepSeek?",
    [
      "Just a list of topics to study",
      "The maximum content possible to make use of time",
      "Logical progression from basic to advanced, practical exercises per stage, review moments, and ways to verify learning before advancing",
      "Study plans only work for those who already have previous knowledge in the area"
    ],
    2,
    "A plan balanced between theory, practice, and review is the key to mastery."
  ),
  textStep(
    "Learning with Personalized Analogies",
    "Difficult concepts become simple when connected to something you already know. DeepSeek is especially good at creating tailor-made analogies — as long as you provide your reference universe."
  ),
  fillStep(
    "Ask for personalized analogies!",
    "Fill in the gap to transform the complex into something familiar.",
    '"Explain the concept of ___ using an analogy with ___. I have experience in ___ but have never studied ___. Make the analogy so ___ that I can visualize the concept without needing any previous technical knowledge."',
    ["machine learning algorithms", "cooking and recipes", "gastronomy", "technology", "clear and precise"],
    ["machine learning algorithms", "cooking and recipes", "gastronomy", "technology", "clear and precise", "vague", "complicated"],
    "Analogies use neural paths you already have to anchor new knowledge."
  ),
  quizStep(
    "Knowledge Connector",
    "Why does providing your reference universe when asking for analogies improve the explanation?",
    [
      "Because DeepSeek changes its database based on the reference",
      "To make the explanation more creative and fun",
      "Because the model uses connections that already exist in your mind to build bridges with the new concept — making understanding immediate and much more long-lasting",
      "Personalized analogies don't work for very technical concepts"
    ],
    2,
    "Referencing what you already master is the fastest shortcut to understanding the new."
  ),
  textStep(
    "Testing what You Learned",
    "Learning is one thing. Confirming that you actually learned is another. DeepSeek creates personalized tests that go beyond multiple choice — evaluating if you understood the reasoning behind the concept, not just the definition."
  ),
  fillStep(
    "Create your personalized test!",
    "Fill in the gap to validate your real understanding.",
    '"I just studied ___ with you. Now create a test with ___ questions that evaluate if I understood the ___ behind the concept — not just the definition. Include questions of ___ different types: conceptual, ___ and ___. After I answer, analyze my reasoning and point out where ___."',
    ["thermodynamics", "9", "reasoning", "3", "practical application", "critical analysis", "I need to improve"],
    ["thermodynamics", "9", "reasoning", "3", "practical application", "critical analysis", "I need to improve", "I am right", "I got it right"],
    "Application and reasoning tests reveal gaps that simple memorization hides."
  ),
  quizStep(
    "Quality Evaluation",
    "What differentiates a good learning test from a simple list of questions?",
    [
      "The number of questions — the more, the better",
      "Questions with true or false answers only",
      "Questions that evaluate reasoning and the application of knowledge — not just the memorization of definitions — revealing if the learning was superficial or deep",
      "Learning tests are not necessary when using IA to study"
    ],
    2,
    "The test should force you to use information in new contexts, proving real mastery."
  ),
  textStep(
    "Learning through the Feynman Method with DeepSeek",
    "The Feynman Method is one of the most effective learning techniques in the world — you learn a concept and then try to explain it in simple words. If you can, you learned. If you fail, you identified exactly where the gap is. DeepSeek is the perfect partner for this method."
  ),
  fillStep(
    "Apply the Feynman Method!",
    "Fill in the gap to test your simplification capacity.",
    '"I will try to explain the concept of ___ with my own words: [your explanation]. Analyze my explanation and tell me: what I understood ___, where my reasoning is ___ or ___ and which ___ need to be revisited. Don\'t correct directly — ask ___ that lead me to discover the error myself."',
    ["special relativity", "correctly", "incorrect", "incomplete", "concepts", "questions"],
    ["special relativity", "correctly", "incorrect", "incomplete", "concepts", "questions", "answers", "sentences"],
    "Simplifying the explanation is the final proof that you truly understand the subject."
  ),
  quizStep(
    "Feynman Logic",
    "Why is the Feynman Method combined with DeepSeek so powerful?",
    [
      "Because DeepSeek always agrees with the student's explanation",
      "To make the learning process slower and more detailed",
      "Because trying to explain out loud reveals exactly where knowledge is solid and where it is superficial — and DeepSeek uses questions to guide the correction without handing over the ready-made answer",
      "The Feynman Method only works for exact sciences"
    ],
    2,
    "The gaps in your explanation are the points where your learning still needs attention."
  ),
  textStep(
    "Deepening Concepts Progressively",
    "Real learning happens in layers. DeepSeek allows going from basic to advanced progressively — each answer building on the previous one, without jumps that create gaps."
  ),
  fillStep(
    "Learn in layers!",
    "Fill in the gap to build a solid foundation before complexity.",
    '"Explain ___ in ___ levels of increasing depth. Level 1: explanation for someone who has never heard of it. Level 2: deepening with ___ and nuances. Level 3: ___ vision with connections to other concepts. Pause between each level and ask me if I am ___ before advancing."',
    ["behavioral economics", "3", "mechanisms", "specialist", "ready to continue"],
    ["behavioral economics", "3", "mechanisms", "specialist", "ready to continue", "happy", "tired"],
    "Controlling the increase in complexity avoids cognitive overload and guarantees a firm foundation."
  ),
  quizStep(
    "Learning in Layers",
    "Why is learning in progressive levels more effective than asking for a full explanation at once?",
    [
      "Because DeepSeek has an information limit per response",
      "To divide the content into smaller parts without real benefit",
      "Because each level consolidates the base before adding complexity — avoiding the cognitive overload that happens when advanced concepts are introduced before the foundation is solid",
      "Progressive levels only work for absolute beginners"
    ],
    2,
    "Complexity added over a fragile foundation results in confusion and quick forgetting."
  ),
  textStep(
    "Learning with Real Cases and Practical Applications",
    "Theory without practice doesn't become knowledge. DeepSeek connects any concept to real cases and concrete applications — making learning much more relevant and memorable."
  ),
  fillStep(
    "Connect theory to practice!",
    "Fill in the gap to give life to abstract concepts.",
    '"I just understood the concept of ___ in theory. Now show me ___ real cases where this concept was applied with ___, ___ where it was ignored with negative consequences, and how I could ___ this knowledge in my reality of ___."',
    ["confirmation bias", "3", "success", "situations", "apply", "professional decision making"],
    ["confirmation bias", "3", "success", "situations", "apply", "professional decision making", "study", "leisure"],
    "Seeing the concept 'in action' reveals nuances that pure theory cannot transmit."
  ),
  quizStep(
    "Theory vs Practice",
    "Why does connecting concepts to real cases accelerate learning?",
    [
      "Because real cases are easier to memorize than concepts",
      "To make the content more interesting without cognitive benefit",
      "Because the brain retains information connected to concrete contexts much better than abstract concepts — and seeing the concept in action reveals nuances that pure theory doesn't show",
      "Real cases only work for business and management learning"
    ],
    2,
    "The brain is optimized to remember stories and concrete situations, not loose abstractions."
  ),
  textStep(
    "Reviewing and Consolidating with DeepSeek",
    "Spaced repetition is one of the most scientifically proven memory techniques. DeepSeek creates intelligent review sessions that reinforce exactly what needs to be fixed."
  ),
  fillStep(
    "Create your review!",
    "Fill in the gap to fix long-term knowledge.",
    '"I studied the following topics in the last week: [list topics]. Create a ___ session that: starts with the concepts that ___ generate confusion, uses questions that ___ reasoning instead of memorization, identifies the ___ still present, and suggests what I should ___ before moving to the next module."',
    ["review", "usually", "test", "gaps", "revisit"],
    ["review", "usually", "test", "gaps", "revising", "text", "vague", "conclusion"],
    "Targeted review sessions save time and focus where your knowledge is most fragile."
  ),
  quizStep(
    "Intelligent Review",
    "What is the most effective way to use DeepSeek for review?",
    [
      "Reread all previous explanations from beginning to end",
      "Ask for a general summary of everything studied",
      "Ask questions that test reasoning on the most difficult points — and use wrong answers to identify exactly where knowledge is still fragile",
      "Review with DeepSeek is only useful before tests and evaluations"
    ],
    2,
    "Identifying and correcting weaknesses is what truly consolidates knowledge."
  ),
  textStep(
    "Learning Languages with DeepSeek",
    "For language learning, DeepSeek works as a grammar teacher, conversation partner, and error analyzer — with the reasoning depth that sets it apart from other assistants."
  ),
  fillStep(
    "Learn languages in depth!",
    "Fill in the gap to master the structure of a new language.",
    '"I want to practice ___. Answer ___ during the whole conversation. When I make mistakes, don\'t just ___ — explain the grammatical ___ behind the error, show the correct ___ and make me ___ the correct structure in a new sentence before continuing."',
    ["intermediate German", "only in German", "correct", "reasoning", "forms", "practice"],
    ["intermediate German", "only in German", "correct", "reasoning", "forms", "practice", "text", "speak"],
    "Understanding the 'logic' of the language is much more powerful than just memorizing ready-made phrases."
  ),
  quizStep(
    "DeepSeek for Languages",
    "What differentiates learning languages with DeepSeek from using common language apps?",
    [
      "DeepSeek is faster to respond than other apps",
      "Language apps don't work for advanced levels",
      "DeepSeek explains the grammatical reasoning behind each correction — building deep understanding of the language structure instead of just training isolated phrases by repetition",
      "There is no significant difference between DeepSeek and language apps"
    ],
    2,
    "With DeepSeek, you understand the language system, not just the words."
  ),
  textStep(
    "The Golden Rule of Learning with DeepSeek",
    "DeepSeek enhances your learning — but the effort is still yours. It delivers the reasoning, the structure, the test, and the review. Deliberate practice, real application, and consistency depend on you."
  ),
  quizStep(
    "Responsibility and Consistency",
    "What is the correct statement about learning with DeepSeek?",
    [
      "The more you use DeepSeek, the less you need to strive to learn",
      "DeepSeek learns with you and evolves as your sessions progress",
      "DeepSeek accelerates and deepens the learning path — but consistency, deliberate practice, and real application of knowledge still entirely depend on the student",
      "Just chatting with DeepSeek before a test is enough to guarantee a good result"
    ],
    2,
    "The AI is an acceleration tool; the learning engine is your conscious effort."
  ),
  textStep(
    "Conclusion",
    "DeepSeek is not just an assistant that explains — it is a learning partner that reasons with you, shows the process behind each concept, creates structured plans, tests your real understanding and identifies gaps with surgical precision.\n\nThose who learn with DeepSeek the right way don't just absorb information — they develop reasoning. And well-developed reasoning is what transforms knowledge into real results.\n\nLearn in depth. Think clearly. Evolve with intention.\n\nLesson completed ✓"
  ),
];

export const DEEPSEEK_MODULE_3_STEPS_ES = [
  textStep(
    "La Forma Correcta de Aprender Cosas Nuevas con DeepSeek",
    "¡Bienvenido de nuevo! En esta lección, descubrirás cómo usar DeepSeek como tu profesor particular más poderoso — aprovechando su capacidad de razonamiento profundo para aprender cualquier tema de forma estructurada, progresiva y verdaderamente eficaz."
  ),
  textStep(
    "Por qué DeepSeek es Diferente como Herramienta de Aprendizaje",
    "La mayoría de los asistentes de IA explican. DeepSeek razona. Esta diferencia es enorme cuando se trata de aprender. No solo entrega información — descompone conceptos, muestra el razonamiento detrás de cada idea y construye el conocimiento de forma lógica y progresiva."
  ),
  quizStep(
    "El Diferencial en el Aprendizaje",
    "¿Qué hace que DeepSeek sea especialmente eficaz para el aprendizaje?",
    [
      "Su capacidad de razonar paso a paso — mostrando no solo qué es lo correcto, sino por qué es correcto y cómo llegó a esa conclusión",
      "Memoriza tu progreso automáticamente entre sesiones",
      "Es el único asistente capaz de explicar conceptos complejos",
      "Funciona mejor solo para el aprendizaje de programación"
    ],
    0,
    "Ver el 'por qué' y el 'cómo' es lo que transforma la información en conocimiento real."
  ),
  textStep(
    "Empezando desde Cero con Estructura",
    "El error más común de quien quiere aprender algo nuevo con IA es hacer preguntas sueltas sin una base estructurada. Con DeepSeek, el punto de partida correcto es establecer el mapa completo de lo que vas a aprender antes de sumergirte en los detalles."
  ),
  fillStep(
    "¡Mapea el aprendizaje!",
    "Completa el espacio para crear una base sólida para tu estudio.",
    '"Quiero aprender ___ desde cero. Antes de empezar, crea un ___ completo de lo que necesito aprender, organizado desde lo ___ a lo ___, con los ___ de cada etapa y lo que debo ser capaz de ___ al final de cada fase."',
    ["filosofía estoica", "mapa de aprendizaje", "más fundamental", "más avanzado", "temas principales", "hacer o entender"],
    ["filosofía estoica", "mapa de aprendizaje", "más fundamental", "más avanzado", "temas principales", "hacer o entender", "texto simple", "rápidas", "ideas"],
    "Entender la estructura completa evita la sensación de aprender piezas sueltas sin conexión."
  ),
  quizStep(
    "Ventaja del Mapa de Aprendizaje",
    "¿Por qué crear un mapa de aprendizaje antes de empezar es más eficaz que ir haciendo preguntas aleatorias?",
    [
      "Porque DeepSeek solo responde bien cuando tiene un plan definido",
      "Para impresionar con una organización sin beneficio real",
      "Porque entiendes la estructura completa del tema antes de sumergirte en los detalles — evitando lagunas, saltos y la sensación de aprender piezas sueltas sin conexión",
      "Los mapas de aprendizaje solo funcionan para temas técnicos"
    ],
    2,
    "Tener la visión del todo da contexto a cada detalle que aprendas después."
  ),
  textStep(
    "Aprendiendo con Razonamiento Visible",
    "La gran ventaja de DeepSeek R1 en el aprendizaje es poder ver el razonamiento detrás de cada explicación. En lugar de recibir una respuesta lista, acompañas el proceso de pensamiento — lo que acelera la comprensión real del concepto."
  ),
  fillStep(
    "¡Activa el razonamiento en el aprendizaje!",
    "Completa el espacio para ver la lógica detrás de la explicación.",
    '"Explica el concepto de ___ mostrando tu ___ paso a paso. No vayas directo a la definición — ___ el problema que este concepto resuelve, muestra cómo alguien ___ llegaría a esta idea y solo entonces presenta la ___ formal con ejemplos."',
    ["interés compuesto", "razonamiento", "comienza con", "naturalmente", "definición"],
    ["interés compuesto", "razonamiento", "comienza con", "naturalmente", "definición", "texto", "vago", "conclusión"],
    "Acompañar el proceso de pensamiento acelera la comprensión profunda de cualquier concepto."
  ),
  quizStep(
    "Poder del Razonamiento Visible",
    "¿Por qué aprender con razonamiento visible es más eficaz que recibir definiciones listas?",
    [
      "Porque las definiciones listas siempre son incorrectas",
      "Para hacer la explicación más larga",
      "Porque cuando entiendes el proceso que llevó al concepto, la comprensión es más profunda y duradera — no solo memorizas, entiendes el porqué",
      "El razonamiento visible solo funciona para el aprendizaje de matemáticas"
    ],
    2,
    "Entender la lógica de construcción de una idea hace que el aprendizaje sea mucho más resistente al olvido."
  ),
  textStep(
    "Creando tu Plan de Estudios con DeepSeek",
    "Un plan de estudios bien estructurado es la diferencia entre aprender de verdad y solo sentir que estás aprendiendo. DeepSeek crea planes detallados y realistas basados en tu objetivo, tiempo y nivel actual."
  ),
  fillStep(
    "¡Monta tu plan!",
    "Completa el espacio para crear tu cronograma personalizado.",
    '"Crea un plan de estudios para que aprenda ___ en ___. Tengo ___ por día disponible. Mi nivel actual es ___. El plan debe: estar ___ en semanas, incluir ___ para cada tema, indicar cómo ___ el aprendizaje de cada etapa y prever ___ para la fijación."',
    ["análisis de datos con Python", "3 meses", "1 hora", "principiante absoluto", "dividido", "ejercicios prácticos", "verificar", "momentos de revisión"],
    ["análisis de datos con Python", "3 meses", "1 hora", "principiante absoluto", "dividido", "ejercicios prácticos", "verificar", "momentos de revisión", "rápido", "lento"],
    "Un plan con metas claras y revisiones te mantiene enfocado y garantiza la evolución constante."
  ),
  quizStep(
    "Plan de Estudios Eficaz",
    "¿Qué debe estar presente en un buen plan de estudios generado por DeepSeek?",
    [
      "Solo una lista de temas para estudiar",
      "El máximo contenido posible para aprovechar el tiempo",
      "Progresión lógica de lo básico a lo avanzado, ejercicios prácticos por etapa, momentos de revisión y formas de verificar el aprendizaje antes de avanzar",
      "Los planes de estudio solo funcionan para quienes ya tienen conocimiento previo en el área"
    ],
    2,
    "Un plan equilibrado entre teoría, práctica y revisión es la clave para la maestría."
  ),
  textStep(
    "Aprendiendo con Analogías Personalizadas",
    "Los conceptos difíciles se vuelven simples cuando se conectan con algo que ya conoces. DeepSeek es especialmente bueno creando analogías a medida — siempre que informes tu universo de referencia."
  ),
  fillStep(
    "¡Pide analogías personalizadas!",
    "Completa el espacio para transformar lo complejo en algo familiar.",
    '"Explica el concepto de ___ usando una analogía con ___. Tengo experiencia en ___ pero nunca estudié ___. Haz la analogia tan ___ que pueda visualizar el concepto sin necesidad de ningún conocimiento técnico previo."',
    ["algoritmos de machine learning", "cocina y recetas", "gastronomía", "tecnología", "clara y precisa"],
    ["algoritmos de machine learning", "cocina y recetas", "gastronomía", "tecnología", "clara y precisa", "vaga", "complicada"],
    "Las analogías usan caminos neuronales que ya tienes para anclar nuevos conocimientos."
  ),
  quizStep(
    "Conector de Conocimiento",
    "¿Por qué proporcionar tu universo de referencia al pedir analogías mejora la explicación?",
    [
      "Porque DeepSeek cambia su base de datos según la referencia",
      "Para hacer la explicación más creativa y divertida",
      "Porque el modelo usa conexiones que ya existen en tu mente para construir puentes con el concepto nuevo — haciendo la comprensión inmediata y mucho más duradera",
      "Las analogías personalizadas no funcionan para conceptos muy técnicos"
    ],
    2,
    "Referenciar lo que ya dominas es el atajo más rápido para entender lo nuevo."
  ),
  textStep(
    "Probando lo que Has Aprendido",
    "Aprender es una cosa. Confirmar que realmente has aprendido es otra. DeepSeek crea pruebas personalizadas que van más allá de la opción múltiple — evaluando si entendiste el razonamiento detrás del concepto, no solo la definición."
  ),
  fillStep(
    "¡Crea tu prueba personalizada!",
    "Completa el espacio para validar tu comprensión real.",
    '"Acabo de estudiar ___ contigo. Ahora crea una prueba con ___ preguntas que evalúen si entendí el ___ detrás del concepto — no solo la definición. Incluye preguntas de ___ diferentes: conceptual, ___ y ___. Después de que responda, analiza mi razonamiento y señala dónde ___."',
    ["termodinámica", "9", "razonamiento", "3 tipos", "aplicación práctica", "análisis crítico", "necesito mejorar"],
    ["termodinámica", "9", "razonamiento", "3 tipos", "aplicación práctica", "análisis crítico", "necesito mejorar", "estoy en lo cierto", "acerté"],
    "Las pruebas de aplicación y razonamiento revelan lagunas que la simple memorización oculta."
  ),
  quizStep(
    "Evaluación de Calidad",
    "¿Qué diferencia a una buena prueba de aprendizaje de una simple lista de preguntas?",
    [
      "El número de preguntas — cuantas más, mejor",
      "Preguntas con respuestas de verdadero o falso solamente",
      "Preguntas que evalúan el razonamiento y la aplicación del conocimiento — no solo la memorización de definiciones — revelando si el aprendizaje fue superficial o profundo",
      "Las pruebas de aprendizaje no son necesarias cuando se usa IA para estudiar"
    ],
    2,
    "La prueba debe obligarte a usar la información en contextos nuevos, demostrando el dominio real."
  ),
  textStep(
    "Aprendiendo por el Método de Feynman con DeepSeek",
    "El Método de Feynman es una de las técnicas de aprendizaje más eficaces del mundo — aprendes un concepto y luego intentas explicarlo con palabras sencillas. Si lo logras, has aprendido. Si te trabas, identificaste exactamente dónde está la laguna. DeepSeek es el compañero perfecto para este método."
  ),
  fillStep(
    "¡Aplica el Método Feynman!",
    "Completa el espacio para probar tu capacidad de simplificación.",
    '"Voy a intentar explicar el concepto de ___ con mis propias palabras: [tu explicación]. Analiza mi explicación y dime: qué entendí ___, dónde mi razonamiento es ___ o ___ y qué ___ necesitan ser revisitados. No corrijas directamente — haz ___ que me lleven a descubrir el error por mí mismo."',
    ["relatividad especial", "correctamente", "incorrecto", "incompleto", "conceptos", "preguntas"],
    ["relatividad especial", "correctamente", "incorrecto", "incompleto", "conceptos", "preguntas", "respuestas", "frases"],
    "Simplificar la explicación es la prueba final de que realmente entiendes el tema."
  ),
  quizStep(
    "La Lógica de Feynman",
    "¿Por qué el Método de Feynman combinado con DeepSeek es tan poderoso?",
    [
      "Porque DeepSeek siempre está de acuerdo con la explicación del alumno",
      "Para hacer el proceso de aprendizaje más lento y detallado",
      "Porque intentar explicar en voz alta revela exactamente dónde el conocimiento es sólido y dónde es superficial — y DeepSeek usa preguntas para guiar la corrección sin entregar la respuesta lista",
      "El Método de Feynman solo funciona para ciencias exactas"
    ],
    2,
    "Las lagunas en tu explicación son los puntos donde tu aprendizaje aún necesita atención."
  ),
  textStep(
    "Profundizando Conceptos Progresivamente",
    "El aprendizaje real ocurre en capas. DeepSeek permite ir de lo básico a lo avanzado de forma progresiva — cada respuesta construyéndose sobre la anterior, sin saltos que creen lagunas."
  ),
  fillStep(
    "¡Aprende en capas!",
    "Completa el espacio para construir una base sólida antes de la complejidad.",
    '"Explica ___ en ___ niveles de profundidad creciente. Nivel 1: explicación para quien nunca ha oído hablar de ello. Nivel 2: profundización con ___ y matices. Nivel 3: visión de ___ con conexiones a otros conceptos. Haz una pausa entre cada nivel y pregúntame si estoy ___ antes de avanzar."',
    ["economía del comportamiento", "3", "mecanismos", "experto", "listo para continuar"],
    ["economía del comportamiento", "3", "mecanismos", "experto", "listo para continuar", "feliz", "cansado"],
    "Controlar el aumento de la complejidad evita la sobrecarga cognitiva y garantiza una base firme."
  ),
  quizStep(
    "Aprendizaje en Capas",
    "¿Por qué aprender en niveles progresivos es más eficaz que pedir una explicación completa de una vez?",
    [
      "Porque DeepSeek tiene un límite de información por respuesta",
      "Para dividir el contenido en partes más pequeñas sin beneficio real",
      "Porque cada nivel consolida la base antes de añadir complejidad — evitando la sobrecarga cognitiva que ocurre cuando los conceptos avanzados se introducen antes de que la base sea sólida",
      "Los niveles progresivos solo funcionan para principiantes absolutos"
    ],
    2,
    "La complejidad añadida sobre una base frágil resulta en confusión y olvido rápido."
  ),
  textStep(
    "Aprendiendo con Casos Reales y Aplicaciones Prácticas",
    "La teoría sin práctica no se convierte en conocimiento. DeepSeek conecta cualquier concepto con casos reales y aplicaciones concretas — haciendo que el aprendizaje sea mucho más relevante y memorable."
  ),
  fillStep(
    "¡Conecta la teoría con la práctica!",
    "Completa el espacio para dar vida a los conceptos abstractos.",
    '"Acabo de entender el concepto de ___ en teoría. Ahora muéstrame ___ casos reales donde este concepto se aplicó con ___, ___ donde fue ignorado con consecuencias negativas y cómo podría ___ este conocimiento en mi realidad de ___."',
    ["sesgo de confirmación", "3", "éxito", "situaciones", "aplicar", "toma de decisiones profesional"],
    ["sesgo de confirmación", "3", "éxito", "situaciones", "aplicar", "toma de decisiones profesional", "estudio", "ocio"],
    "Ver el concepto 'en acción' revela los matices que la teoría pura no puede transmitir."
  ),
  quizStep(
    "Teoría vs Práctica",
    "¿Por qué conectar conceptos con casos reales acelera el aprendizaje?",
    [
      "Porque los casos reales son más fáciles de memorizar que los conceptos",
      "Para hacer el contenido más interesante sin beneficio cognitivo",
      "Porque el cerebro retiene información conectada a contextos concretos mucho mejor que conceptos abstractos — y ver el concepto en acción revela matices que la teoría pura no muestra",
      "Los casos reales solo funcionan para el aprendizaje de negocios y gestión"
    ],
    2,
    "El cerebro está optimizado para recordar historias y situaciones concretas, no abstracciones sueltas."
  ),
  textStep(
    "Revisando y Consolidando con DeepSeek",
    "La revisión espaciada es una de las técnicas de memorización más probadas por la ciencia. DeepSeek crea sesiones de revisión inteligentes que refuerzan exactamente lo que necesita ser fijado."
  ),
  fillStep(
    "¡Crea tu revisión!",
    "Completa el espacio para fijar el conocimiento a largo plazo.",
    '"Estudié los siguientes temas en la última semana: [lista los temas]. Crea una sesión de ___ que: comience por los conceptos que más ___ generan confusión, use preguntas que ___ el razonamiento en lugar de la memorización, identifique las ___ aún presentes y sugiera qué debo ___ antes de avanzar al siguiente módulo."',
    ["revisión", "suelen", "pongan a prueba", "lagunas", "revisar"],
    ["revisión", "suelen", "pongan a prueba", "lagunas", "revisar", "texto", "vago", "conclusión"],
    "Las sesiones de revisión dirigidas ahorran tiempo y se enfocan donde tu conocimiento es más frágil."
  ),
  quizStep(
    "Revisión Inteligente",
    "¿Cuál es la forma más eficaz de usar DeepSeek para la revisión?",
    [
      "Releer todas las explicaciones anteriores de principio a fin",
      "Pedir un resumen general de todo lo estudiado",
      "Pedir preguntas que pongan a prueba el razonamiento sobre los puntos más difíciles — y usar las respuestas incorrectas para identificar exactamente dónde el conocimiento aún es frágil",
      "La revisión con DeepSeek solo es útil antes de exámenes y evaluaciones"
    ],
    2,
    "Identificar y corregir las debilidades es lo que verdaderamente consolida el conocimiento."
  ),
  textStep(
    "Aprendiendo Idiomas con DeepSeek",
    "Para el aprendizaje de idiomas, DeepSeek funciona como profesor de gramática, compañero de conversación y analizador de errores — con la profundidad de razonamiento que lo diferencia de otros asistentes."
  ),
  fillStep(
    "¡Aprende idiomas con profundidad!",
    "Completa el espacio para dominar la estructura de un nuevo idioma.",
    '"Quiero practicar ___. Responde ___ durante toda la conversación. Cuando cometa errores, no solo ___ — explica el ___ gramatical detrás del error, muestra las ___ correctas y hazme ___ la estructura correcta en una oración nueva antes de continuar."',
    ["alemán intermedio", "solo en alemán", "corrige", "razonamiento", "formas", "practicar"],
    ["alemán intermedio", "solo en alemán", "corrige", "razonamiento", "formas", "practicar", "texto", "hablar"],
    "Entender la 'lógica' del idioma es mucho más poderoso que solo memorizar frases listas."
  ),
  quizStep(
    "DeepSeek para Idiomas",
    "¿Qué diferencia el aprendizaje de idiomas con DeepSeek del uso de aplicaciones de idiomas comunes?",
    [
      "DeepSeek es más rápido para responder que otras aplicaciones",
      "Las aplicaciones de idiomas no funcionan para niveles avanzados",
      "DeepSeek explica el razonamiento gramatical detrás de cada corrección — construyendo una comprensión profunda de la estructura del idioma en lugar de solo entrenar frases aisladas por repetición",
      "No hay una diferencia significativa entre DeepSeek y las aplicaciones de idiomas"
    ],
    2,
    "Con DeepSeek, entiendes el sistema del idioma, no solo las palabras."
  ),
  textStep(
    "La Regla de Oro del Aprendizaje con DeepSeek",
    "DeepSeek potencia tu aprendizaje — pero el esfuerzo sigue siendo tuyo. Él entrega el razonamiento, la estructura, la prueba y la revisión. La práctica deliberada, la aplicación real y la consistencia dependen de ti."
  ),
  quizStep(
    "Responsabilidad y Consistencia",
    "¿Cuál es la afirmación correcta sobre el aprendizaje con DeepSeek?",
    [
      "Cuanto más usas DeepSeek, menos necesitas esforzarte para aprender",
      "DeepSeek aprende junto contigo y evoluciona según tus sesiones",
      "DeepSeek acelera y profundiza el camino del aprendizaje — pero la consistencia, la práctica deliberada y la aplicación real del conocimiento aún dependen enteramente del alumno",
      "Basta con hablar con DeepSeek antes de un examen para garantizar un buen resultado"
    ],
    2,
    "La IA es una herramienta de aceleración; el motor del aprendizaje es tu esfuerzo consciente."
  ),
  textStep(
    "Conclusión",
    "DeepSeek no es solo un asistente que explica — es un compañero de aprendizaje que razona junto contigo, muestra el proceso detrás de cada concepto, crea planes estructurados, pone a prueba tu entendimiento real e identifica lagunas con precisión quirúrgica.\n\nQuien aprende con DeepSeek de la forma correcta no solo absorbe información — desarrolla razonamiento. Y un razonamiento bien desarrollado es lo que transforma el conocimiento en un resultado real.\n\nAprende con profundidad. Piensa con claridad. Evoluciona con intención.\n\nLección completada ✓"
  ),
];

export const DEEPSEEK_MODULE_3_STEPS_FR = [
  textStep(
    "La Bonne Façon d'Apprendre de Nouvelles Choses avec DeepSeek",
    "Bienvenue de retour ! Dans cette leçon, vous découvrirez comment utiliser DeepSeek comme votre tuteur privé le plus puissant — en tirant parti de sa capacité de raisonnement profond pour apprendre n'importe quel sujet de manière structurée, progressive et véritablement efficace."
  ),
  textStep(
    "Pourquoi DeepSeek est Différent en tant qu'Outil d'Apprentissage",
    "La plupart des assistants IA expliquent. DeepSeek raisonne. Cette différence est énorme lorsqu'il s'agit d'apprendre. Il ne se contente pas de livrer des informations — il décompose les concepts, montre le raisonnement derrière chaque idée et construit le savoir de manière logique et progressive."
  ),
  quizStep(
    "Le Différentiel d'Apprentissage",
    "Qu'est-ce qui rend DeepSeek particulièrement efficace pour l'apprentissage ?",
    [
      "Sa capacité à raisonner étape par étape — en montrant non seulement ce qui est correct, mais pourquoi c'est correct et comment il est arrivé à cette conclusion",
      "Il mémorise automatiquement votre progression entre les sessions",
      "C'est le seul assistant capable d'expliquer des concepts complexes",
      "Il fonctionne mieux uniquement pour l'apprentissage de la programmation"
    ],
    0,
    "Voir le 'pourquoi' et le 'comment' est ce qui transforme l'information en véritable savoir."
  ),
  textStep(
    "Commencer de Zéro avec Structure",
    "L'erreur la plus courante pour those qui veulent apprendre quelque chose de nouveau avec l'IA est de poser des questions isolées sans base structurée. Avec DeepSeek, le bon point de départ est d'établir la carte complète de ce que vous allez apprendre avant de plonger dans les détails."
  ),
  fillStep(
    "Cartographiez l'apprentissage !",
    "Complétez le vide pour créer une base solide pour votre étude.",
    '"Je veux apprendre ___ en partant de zéro. Avant de commencer, crée une ___ complète de ce que je dois apprendre, organisée du ___ au ___, avec les ___ de chaque étape et ce que je dois être capable de ___ à la fin de chaque phase."',
    ["philosophie stoïcienne", "carte d'apprentissage", "plus fondamental", "plus avancé", "sujets principaux", "faire ou comprendre"],
    ["philosophie stoïcienne", "carte d'apprentissage", "plus fondamental", "plus avancé", "sujets principaux", "faire ou comprendre", "texte simple", "rapides", "idées"],
    "Comprendre la structure complète évite le sentiment d'apprendre des morceaux isolés sans connexion."
  ),
  quizStep(
    "Avantage de la Carte d'Apprentissage",
    "Pourquoi créer une carte d'apprentissage avant de commencer est-il plus efficace que de poser des questions au hasard ?",
    [
      "Parce que DeepSeek ne répond bien que lorsqu'il a un plan défini",
      "Pour impressionner par l'organisation sans réel bénéfice",
      "Parce que vous comprenez la structure complète du sujet avant de plonger dans les détails — évitant les lacunes, les sauts et la sensation d'apprendre des morceaux isolés sans connexion",
      "Les cartes d'apprentissage ne fonctionnent que pour les sujets techniques"
    ],
    2,
    "Avoir la vision d'ensemble donne du contexte à chaque détail que vous apprendrez plus tard."
  ),
  textStep(
    "Apprendre avec un Raisonnement Visible",
    "Le grand avantage de DeepSeek R1 dans l'apprentissage est de pouvoir voir le raisonnement derrière chaque explication. Au lieu de recevoir une réponse toute faite, vous suivez le processus de réflexion — ce qui accélère la compréhension réelle du concept."
  ),
  fillStep(
    "Activez le raisonnement dans l'apprentissage !",
    "Complétez le vide pour voir la logique derrière l'explication.",
    '"Explique le concept de ___ en montrant ton ___ étape par étape. Ne va pas directement à la définition — ___ le problème que ce concept résout, montre comment quelqu\'un y arriverait ___ et présente alors seulement la ___ formelle avec des exemples."',
    ["intérêts composés", "raisonnement", "commence par", "naturellement", "définition"],
    ["intérêts composés", "raisonnement", "commence par", "naturellement", "définition", "texte", "vague", "conclusion"],
    "Suivre le processus de réflexion accélère la compréhension profonde de n'importe quel concept."
  ),
  quizStep(
    "Pouvoir du Raisonnement Visible",
    "Pourquoi apprendre avec un raisonnement visible est-il plus efficace que de recevoir des définitions toutes faites ?",
    [
      "Parce que les définitions toutes faites sont toujours incorrectes",
      "Pour rendre l'explication plus longue",
      "Parce que quand on comprend le processus qui a mené au concept, la compréhension est plus profonde et durable — on ne fait pas que mémoriser, on comprend pourquoi",
      "Le raisonnement visible ne fonctionne que pour l'apprentissage des mathématiques"
    ],
    2,
    "Comprendre la logique de construction d'une idée rend l'apprentissage beaucoup plus résistant à l'oubli."
  ),
  textStep(
    "Créer votre Plan d'Études avec DeepSeek",
    "Un plan d'études bien structuré est la différence entre apprendre vraiment et avoir seulement l'impression d'apprendre. DeepSeek crée des plans détaillés et réalistes basés sur votre objectif, votre temps et votre niveau actuel."
  ),
  fillStep(
    "Montez votre plan !",
    "Complétez le vide pour créer votre calendrier personnalisé.",
    '"Crée un plan d\'études pour que j\'apprenne ___ en ___. J\'ai ___ par jour de disponible. Mon niveau actuel est ___. Le plan doit : être ___ en semaines, inclure des ___ pour chaque sujet, indiquer comment ___ l\'apprentissage de chaque étape et prévoir des ___ pour la consolidation."',
    ["l'analyse de données avec Python", "3 mois", "1 heure", "débutant absolu", "divisé", "exercices pratiques", "vérifier", "moments de révision"],
    ["l'analyse de données avec Python", "3 mois", "1 heure", "débutant absolu", "divisé", "exercices pratiques", "vérifier", "moments de révision", "rapide", "lent"],
    "Un plan avec des jalons clairs et des révisions vous garde concentré et garantit une évolution constante."
  ),
  quizStep(
    "Plan d'Études Efficace",
    "Qu'est-ce qui doit être présent dans un bon plan d'études généré par DeepSeek ?",
    [
      "Seulement une liste de sujets à étudier",
      "Le maximum de contenu possible pour profiter du temps",
      "Une progression logique du basique à l'avancé, des exercices pratiques par étape, des moments de révision et des moyens de vérifier l'apprentissage avant d'avancer",
      "Les plans d'études ne fonctionnent que pour ceux qui ont déjà des connaissances préalables dans le domaine"
    ],
    2,
    "Un plan équilibré entre théorie, pratique et révision est la clé de la maîtrise."
  ),
  textStep(
    "Apprendre avec des Analogies Personnalisées",
    "Les concepts difficiles deviennent simples lorsqu'ils sont connectés à quelque chose que vous connaissez déjà. DeepSeek est particulièrement doué pour créer des analogies sur mesure — à condition que vous indiquiez votre univers de référence."
  ),
  fillStep(
    "Demandez des analogies personnalisées !",
    "Complétez le vide pour transformer le complexe en quelque chose de familier.",
    '"Explique le concept de ___ en utilisant une analogie avec ___. J\'ai de l\'expérience en ___ mais je n\'ai jamais étudié ___. Fais l\'analogie de manière si ___ que je puisse visualiser le concept sans avoir besoin de connaissances techniques préalables."',
    ["algorithmes de machine learning", "cuisine et recettes", "gastronomie", "technologie", "claire et précise"],
    ["algorithmes de machine learning", "cuisine et recettes", "gastronomie", "technologie", "claire et précise", "vague", "compliquée"],
    "Les analogies utilisent des chemins neuronaux que vous avez déjà pour ancrer de nouvelles connaissances."
  ),
  quizStep(
    "Connecteur de Savoir",
    "Pourquoi fournir votre univers de référence en demandant des analogies améliore-t-il l'explication ?",
    [
      "Parce que DeepSeek change sa base de données en fonction de la référence",
      "Pour rendre l'explication plus créative et amusante",
      "Parce que le modèle utilise des connexions qui existent déjà dans votre esprit pour construire des ponts avec le nouveau concept — rendant la compréhension immédiate et beaucoup plus durable",
      "Les analogies personnalisées ne fonctionnent pas pour les concepts très techniques"
    ],
    2,
    "Référencer ce que vous maîtrisez déjà est le raccourci le plus rapide pour comprendre le nouveau."
  ),
  textStep(
    "Tester ce que Vous Avez Appris",
    "Apprendre est une chose. Confirmer qu'on a vraiment appris en est une autre. DeepSeek crée des tests personnalisés qui vont au-delà du choix multiple — en évaluant si vous avez compris le raisonnement derrière le concept, et pas seulement la définition."
  ),
  fillStep(
    "Créez votre test personnalisé !",
    "Complétez le vide pour valider votre compréhension réelle.",
    '"Je viens d\'étudier ___ avec toi. Maintenant, crée un test avec ___ questions qui évaluent si j\'ai compris le ___ derrière le concept — pas seulement la définition. Inclus des questions de ___ différents : conceptuel, ___ et ___. Après mes réponses, analyse mon raisonnement et indique où ___."',
    ["thermodynamique", "9", "raisonnement", "3 types", "application pratique", "analyse critique", "je dois m'améliorer"],
    ["thermodynamique", "9", "raisonnement", "3 types", "application pratique", "analyse critique", "je dois m'améliorer", "j'ai raison", "j'ai réussi"],
    "Les tests d'application et de raisonnement révèlent des lacunes que la simple mémorisation cache."
  ),
  quizStep(
    "Évaluation de Qualité",
    "Qu'est-ce qui différencie un bon test d'apprentissage d'une simple liste de questions ?",
    [
      "Le nombre de questions — plus il y en a, mieux c'est",
      "Des questions avec des réponses par vrai ou faux seulement",
      "Des questions qui évaluent le raisonnement et l'application des connaissances — pas seulement la mémorisation des définitions — révélant si l'apprentissage a été superficiel ou profond",
      "Les tests d'apprentissage ne sont pas nécessaires lorsqu'on utilise l'IA pour étudier"
    ],
    2,
    "Le test doit vous forcer à utiliser l'information dans de nouveaux contextes, prouvant la maîtrise réelle."
  ),
  textStep(
    "Apprendre par la Méthode Feynman avec DeepSeek",
    "La Méthode Feynman est l'une des techniques d'apprentissage les plus efficaces au monde — vous apprenez un concept, puis vous essayez de l'expliquer avec des mots simples. Si vous y arrivez, vous avez appris. Si vous bloquez, vous avez identifié exactement où se trouve la lacune. DeepSeek est le partenaire idéal pour cette méthode."
  ),
  fillStep(
    "Appliquez la Méthode Feynman !",
    "Complétez le vide pour tester votre capacité de simplification.",
    '"Je vais essayer d\'expliquer le concept de ___ avec mes propres mots : [votre explication]. Analyse mon explication et dis-moi : ce que j\'ai compris ___, où mon raisonnement est ___ ou ___ et quels ___ doivent être revisités. Ne corrige pas directement — pose des ___ qui m\'amènent à découvrir l\'erreur par moi-même."',
    ["relativité restreinte", "correctement", "incorrect", "incomplet", "concepts", "questions"],
    ["relativité restreinte", "correctement", "incorrect", "incomplet", "concepts", "questions", "réponses", "phrases"],
    "Simplifier l'explication est la preuve finale que vous comprenez vraiment le sujet."
  ),
  quizStep(
    "La Logique de Feynman",
    "Pourquoi la Méthode Feynman combinée avec DeepSeek est-elle si puissante ?",
    [
      "Parce que DeepSeek est toujours d'accord avec l'explication de l'élève",
      "Pour rendre le processus d'apprentissage plus lent et plus détaillé",
      "Parce qu'essayer d'expliquer à haute voix révèle exactement où le savoir est solide et où il est superficiel — et DeepSeek utilise des questions pour guider la correction sans donner la réponse toute faite",
      "La Méthode Feynman ne fonctionne que pour les sciences exactes"
    ],
    2,
    "Les lacunes dans votre explication sont les points où votre apprentissage a encore besoin d'attention."
  ),
  textStep(
    "Approfondir les Concepts Progressivement",
    "L'apprentissage réel se fait par étapes. DeepSeek permet d'aller du basique à l'avancé de manière progressive — chaque réponse s'appuyant sur la précédente, sans sauts qui créent des lacunes."
  ),
  fillStep(
    "Apprenez par étapes !",
    "Complétez le vide pour construire une base solide avant la complexité.",
    '"Explique ___ en ___ niveaux de profondeur croissante. Niveau 1 : explication pour quelqu\'un qui n\'en a jamais entendu parler. Niveau 2 : approfondissement avec des ___ et des nuances. Niveau 3 : vision d\'___ avec des connexions à d\'autres concepts. Fais une pause entre chaque niveau et demande-moi si je suis ___ avant d\'avancer."',
    ["l'économie comportementale", "3", "mécanismes", "expert", "prêt à continuer"],
    ["l'économie comportementale", "3", "mécanismes", "expert", "prêt à continuer", "heureux", "fatigué"],
    "Contrôler l'augmentation de la complexité évite la surcharge cognitive et garantit une base solide."
  ),
  quizStep(
    "Apprentissage par Étapes",
    "Pourquoi apprendre par niveaux progressifs est-il plus efficace que de demander une explication complète d'un coup ?",
    [
      "Parce que DeepSeek a une limite d'informations par réponse",
      "Pour diviser le contenu en plus petites parties sans réel bénéfice",
      "Parce que chaque niveau consolide la base avant d'ajouter de la complexité — évitant la surcharge cognitive qui arrive quand des concepts avancés sont introduits avant que les fondations ne soient solides",
      "Les niveaux progressifs ne fonctionnent que pour les débutants absolus"
    ],
    2,
    "Une complexité ajoutée sur une base fragile entraîne confusion et oubli rapide."
  ),
  textStep(
    "Apprendre avec des Cas Réels et des Applications Pratiques",
    "La théorie sans la pratique ne devient pas un savoir. DeepSeek connecte n'importe quel concept à des cas réels et des applications concrètes — rendant l'apprentissage beaucoup plus pertinent et mémorable."
  ),
  fillStep(
    "Connectez la théorie à la pratique !",
    "Complétez le vide pour donner vie aux concepts abstraits.",
    '"Je viens de comprendre le concept de ___ en théorie. Maintenant, montre-moi ___ cas réels où ce concept a été appliqué avec ___, des ___ où il a été ignoré avec des conséquences négatives et comment je pourrais ___ ce savoir dans ma réalité de ___."',
    ["biais de confirmation", "3", "succès", "situations", "appliquer", "prise de décision professionnelle"],
    ["biais de confirmation", "3", "succès", "situations", "appliquer", "prise de décision professionnelle", "étude", "loisir"],
    "Voir le concept 'en action' révèle des nuances que la pure théorie ne peut pas transmettre."
  ),
  quizStep(
    "Théorie vs Pratique",
    "Pourquoi connecter les concepts à des cas réels accélère-t-il l'apprentissage ?",
    [
      "Parce que les cas réels sont plus faciles à mémoriser que les concepts",
      "Pour rendre le contenu plus intéressant sans bénéfice cognitif",
      "Parce que le cerveau retient les informations connectées à des contextes concrets bien mieux qu'à des concepts abstraits — et voir le concept en action révèle des nuances que la théorie pure ne montre pas",
      "Les cas réels ne fonctionnent que pour l'apprentissage du business et de la gestion"
    ],
    2,
    "Le cerveau est optimisé pour se souvenir d'histoires et de situations concrètes, pas d'abstractions isolées."
  ),
  textStep(
    "Réviser et Consolider avec DeepSeek",
    "La révision espacée est l'une des techniques de mémorisation les plus prouvées par la science. DeepSeek crée des sessions de révision intelligentes qui renforcent exactement ce qui doit être fixé."
  ),
  fillStep(
    "Créez votre révision !",
    "Complétez le vide pour fixer le savoir à long terme.",
    '"J\'ai étudié les sujets suivants la semaine dernière : [liste les sujets]. Crée une session de ___ qui : commence par les concepts qui ___ de la confusion, utilise des questions qui ___ le raisonnement plutôt que la mémorisation, identifie les ___ encore présentes et suggère ce que je dois ___ avant de passer au module suivant."',
    ["révision", "génèrent souvent", "testent", "lacunes", "revoir"],
    ["révision", "génèrent souvent", "testent", "lacunes", "revoir", "texte", "vague", "conclusion"],
    "Les sessions de révision ciblées font gagner du temps et se concentrent là où votre savoir est le plus fragile."
  ),
  quizStep(
    "Révision Intelligente",
    "Quelle est la manière la plus efficace d'utiliser DeepSeek pour la révision ?",
    [
      "Relire toutes les explications précédentes du début à la fin",
      "Demander un résumé général de tout ce qui a été étudié",
      "Poser des questions qui testent le raisonnement sur les points les plus difficiles — et utiliser les mauvaises réponses pour identifier exactement où le savoir est encore fragile",
      "La révision avec DeepSeek n'est utile qu'avant les examens et évaluations"
    ],
    2,
    "Identifier et corriger les faiblesses est ce qui consolide véritablement le savoir."
  ),
  textStep(
    "Apprendre des Langues with DeepSeek",
    "Pour l'apprentissage des langues, DeepSeek fonctionne comme un professeur de grammaire, un partenaire de conversation et un analyseur d'erreurs — avec la profondeur de raisonnement qui le différencie des autres assistants."
  ),
  fillStep(
    "Apprenez des langues en profondeur !",
    "Complétez le vide pour maîtriser la structure d'une nouvelle langue.",
    '"Je veux pratique ___. Réponds ___ pendant toute la conversation. Quand je fais des erreurs, ne te contente pas de ___ — explique le ___ grammatical derrière l\'erreur, montre les ___ correctes et fais-moi ___ la structure correcte dans une nouvelle phrase avant de continuer."',
    ["l'allemand intermédiaire", "uniquement en allemand", "corriger", "raisonnement", "formes", "pratiquer"],
    ["l'allemand intermédiaire", "uniquement en allemand", "corriger", "raisonnement", "formes", "pratiquer", "texte", "parler"],
    "Comprendre la 'logique' de la langue est bien plus puissant que de simplement mémoriser des phrases toutes faites."
  ),
  quizStep(
    "DeepSeek pour les Langues",
    "Qu'est-ce qui différencie l'apprentissage des langues avec DeepSeek de l'utilisation d'applications de langues courantes ?",
    [
      "DeepSeek est plus rapide pour répondre que les autres applications",
      "Les applications de langues ne fonctionnent pas pour les niveaux avancés",
      "DeepSeek explique le raisonnement grammatical derrière chaque correction — construisant une compréhension profonde de la structure de la langue au lieu de simplement entraîner des phrases isolées par répétition",
      "Il n'y a pas de différence significative entre DeepSeek et les applications de langues"
    ],
    2,
    "Avec DeepSeek, vous comprenez le système de la langue, pas seulement les mots."
  ),
  textStep(
    "La Règle d'Or de l'Apprentissage avec DeepSeek",
    "DeepSeek décuple votre apprentissage — mais l'effort reste le vôtre. Il livre le raisonnement, la structure, le test et la révision. La pratique délibérée, l'application réelle et la régularité dépendent de vous."
  ),
  quizStep(
    "Responsabilité et Régularité",
    "Quelle est l'affirmation correcte concernant l'apprentissage avec DeepSeek ?",
    [
      "Plus vous utilisez DeepSeek, moins vous avez besoin de faire d'efforts pour apprendre",
      "DeepSeek apprend avec vous et évolue au fil de vos sessions",
      "DeepSeek accélère et approfondit le chemin de l'apprentissage — mais la régularité, la pratique délibérée et l'application réelle du savoir dépendent encore entièrement de l'élève",
      "Il suffit de discuter avec DeepSeek avant un examen pour garantir un bon résultat"
    ],
    2,
    "L'IA est un outil d'accélération ; le moteur de l'apprentissage est votre effort conscient."
  ),
  textStep(
    "Conclusion",
    "DeepSeek n'est pas seulement un assistant qui explique — c'est un partenaire d'apprentissage qui raisonne avec vous, montre le processus derrière chaque concept, crée des plans structurés, teste votre compréhension réelle et identifie les lacunes avec une précision chirurgicale.\n\nCeux qui apprennent avec DeepSeek de la bonne manière ne font pas qu'absorber des informations — ils développent un raisonnement. Et un raisonnement bien développé est ce qui transforme le savoir en résultat réel.\n\nApprenez en profondeur. Pensez avec clarté. Évoluez avec intention.\n\nLeçon terminée ✓"
  ),
];





