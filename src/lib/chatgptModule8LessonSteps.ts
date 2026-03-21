import {
  AiTrailFillBlanksLessonStep,
  AiTrailQuizLessonStep,
  AiTrailTextLessonStep,
} from "./aiTrailContent";

const textStep = (
  title: string,
  content: string,
  promptBox?: string,
): AiTrailTextLessonStep => ({
  type: "text",
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
): AiTrailQuizLessonStep => ({
  type: "quiz",
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
): AiTrailFillBlanksLessonStep => ({
  type: "fill_blanks",
  title,
  instruction,
  sentence,
  answers,
  options,
  explanation,
});

export const CHATGPT_MODULE_8_STEPS_PT = [
  textStep(
    "Seu Professor Particular",
    "Bem-vindo de volta! Nesta lição, você descobrirá como usar o ChatGPT para aprender qualquer assunto — do zero ao avançado — de forma 100% personalizada, no seu ritmo e do seu jeito."
  ),
  textStep(
    "Disponibilidade Absoluta",
    "Ter acesso a um mestre que domina todos os assuntos, que nunca se cansa de repetir ou adaptar explicações, revoluciona a forma de reter dados técnicos ou teóricos. O ChatGPT assume esse papel perfeitamente, exigindo apenas excelentes instruções passadas a ele."
  ),
  quizStep(
    "O Poder da Ferramenta de Estudo",
    "Por que o ChatGPT difere formidavelmente dos antigos guias estáticos de aprendizado ao tentar dominar um assunto complexo acadêmico ou corporativo?",
    [
      "Substitui completamente a necessidade das fontes originais dos livros.",
      "Garante que você vai memorizar o conteúdo de forma automática sem nenhum esforço intelectual ativo subsequente seu.",
      "Adapta ativamente a clareza teórica e a velocidade das explicações ao seu nível atual, moldando-se ao seu exato conhecimento prévio dinâmico.",
      "Costuma funcionar cada vez de forma mais eficiente quanto menos informação você fornece para testar sua inteligência base."
    ],
    2,
    "A maleabilidade do modelo destrói o conceito impiedoso de uma 'classe' genérica nivelando o nível do material na sua exata frequência e tempo de abstração pessoal sem julgamentos ansiosos."
  ),
  textStep(
    "Aprendendo um Assunto do Zero",
    "O primeiro passo para mergulhar numa área dura e intocada é clamar inicialmente por uma rampa gradual. Nada de jargões pesados: exija alicerces limpos e analogias da rua diária."
  ),
  fillStep(
    "Formule Seu Raio de Ensino Base!",
    "Preencha estritamente as amarras semânticas forçando um mergulho assistido impecável ao conceito nulo.",
    '"Você é mestre de ___. Quero dominar ___ do absoluto zero. Inicie pelo ___ mais fundamental lógico, utilize ___ do dia a dia e determine pré-requisitos antes do avanço."',
    ["física", "como a eletricidade funciona", "conceito", "analogias"],
    ["física", "como a eletricidade funciona", "conceito", "analogias", "filosofia", "livros gigantescos acadêmicos", "prova oral"],
    "Isolar sua posição de iniciante frente a um doutor figurado constrói a fundação ideal."
  ),
  quizStep(
    "Eficácia do Prompt Inicial",
    "Por qual exato mecanismo técnico esse aviso prévio excede ridiculamente o mero disparo de 'o que é física' na janela do chatbot cega?",
    [
      "O uso compulsivo de um teto rígido longo em caracteres destrava limites internos das chaves bloqueadas da API mestre superior VIP paga.",
      "Ele define com brutal assertividade o papel do modelo, seu próprio nível vulnerável perante a matéria, e impõe a obrigação mecânica de fornecer vínculos práticos ilustrativos familiares.",
      "Pois disparar títulos como 'Professor' religa por instinto o roteador a usar estritamente bases de dados do MEC oficialmente fechadas de segurança.",
      "Ambos os rumos geram exatamente o mesmíssimo emaranhado teórico padrão indiferenciado longo exato global formal seco cansativo."
    ],
    1,
    "Você amarra quem a máquina será, onde você está e o formato exato da transmissão mental (analogias). Isso arranca do sistema sua tendência fria à Wikipédia global acadêmica."
  ),
  textStep(
    "Forjando um Circuito Letivo e Didático",
    "Perambular de modo avulso é a via principal de abandono acadêmico e derrota mental. A entidade neural tem o condão cirúrgico de esquematizar um mapa cartográfico focado de estudos alinhado ferozmente sob o relógio de sua escassa disponibilidade diária."
  ),
  fillStep(
    "Molde Seu Trilho de Ouro Diário!",
    "Aperte as engrenagens da sua grade letiva e obrigue a elaboração paramétrica severa infalível e milimétrica.",
    '"Desenhe um plano imbatível para eu absorver o ___ em ___. Possuo rasos ___ diários. O meu estágio de início é o nível ___. Fragmente a escala de evolução firme contada por ___. Integre as vias cruciais objetivas ensinando a plenamente ___ em cada fragmento novo. [Assunto]"',
    ["inglês para negócios", "3 meses", "30 minutos", "iniciante", "semanas", "praticar"],
    ["inglês para negócios", "3 meses", "30 minutos", "iniciante", "semanas", "praticar", "apenas relaxar assistindo de fora longes horas vagas passivas", "francês culinário puro avançado", "dez anos"],
    "Delimitar o relógio e a escada modular semanal expurga o excesso gerando pautas curtas tangíveis de sucesso diário contínuo real de ação."
  ),
  quizStep(
    "A Lente das Analogias Transversais Fáceis",
    "Frente à densidade de barreiras técnicas (cripto, inflações macro, bolsa de valores lógicas teóricas duras cruéis frias), qual pedido dissolve prontamente tais granitos intelectuais formidáveis em pluma mansa acessível total imediata pura?",
    [
      '"Vomite-me a definição institucional formal acadêmica técnica engessada do conceito agora."',
      '"Ensine perfeitamente esse assunto para iniciantes rasteiros de plantão rápido veloz logo sem paradas."',
      '"Desenhe e transmita mentalmente o conceito em pauta fingindo severamente que dirijo 15 singelos anos de idade e uso um objeto prosaico corriqueiro matutino clássico ordinário que cada passante citadino identifique cegamente como ponte real de enlace na visualização do que isto significa na física teórica exata de rua."',
      '"Resume breve o conceito geral de forma neutra global." '
    ],
    2,
    "Rebaixar drasticamente a faixa etária técnica percebida empurra a IA para metáforas ricas cruamente descritivas que ancoram ideias difusas impalpáveis às rotinas da sala civil humana cotidiana banal real do dia a dia comum de imediato sem fricções."
  ),
  textStep(
    "Simuladores de Fogo de Retenção Cruel",
    "Consumir linhas não certifica maestria retida na memória. O bot se transforma no seu carrasco examinador, montando crivos de múltipla escolha ferozes baseados milimetricamente no escopo da sua digestão final exata do material."
  ),
  fillStep(
    "O Construtor Pericial de Provas Cegas Reais",
    "Funde com vigor tático e incisivo a matriz interrogativa testadora da sua sapiência absorvida de imediato na arena de choque prático agora.",
    '"Terminei minhas revisões sobre ___. Projete e construa agressivamente ___ perguntas formatadas sob múltiplas faces de abordagem cobrando-me impiedosamente o conteúdo integral de forma mista pura isolada em faixas nítidas por ___ (calmas, tensas, brutais). No remate da prova final global isolada no limite temporal limite, descerre as exatas e irrefutáveis ___ detalhando as naturezas de escolha isolada por questão falha de entendimento. [Tópico]"',
    ["fotossíntese", "9", "3 níveis", "respostas corretas"],
    ["fotossíntese", "9", "3 níveis", "respostas corretas", "temas paralelos fugazes aleatórios soltos no vento e espaço longínquo vago inalcançável puro", "2 de pura sorte livre simples"],
    "Forçar oscilações bruscas (fácil e brutal) escaneia a falha real de memorização forçando a rede neural a destapar sua verdadeira debilidade dissimulada por certezas aparentes voláteis mentirosas frágeis da simples leitura cega isolada visual não testada."
  ),
  quizStep(
    "Manobra no Campo do Erro Acadêmico Liminar Formal Puro Acerto Final:",
    "Após colidir de frente num crivo avaliativo (Quiz do bot) assinalando a alternativa brutal e categoricamente equívoca falsa torta por um raciocínio torto errado... qual deve ser o golpe mestre formador seguinte e infalível tático perfeito exato e rápido no mesmo canal com o mestre bot sintético no ato de remate sem medo?",
    [
      "Cruzar impassivelmente sob um mutismo de pedra fria neutro à questão subsequente próxima seguinte do rol testado fingindo normalidade e domínio do erro passivo escondido enterrado velado esquecido omitido no ar vago sem resolver o nó.",
      "Clamar exasperadamente para que a Inteligencia Artificiel jogue na tela de pronto e refaça submissamente a prova testadora global magna cheia redondamente do começo puramente do marco zero originário reiniciando a máquina num clique sem freio logo sem avaliar de dentro para fora.",
      "Ordená - lo de prontidão exata cirurgicamente a interromper fluxos secundários parar a via natural para dissecarmos aquela vala da ignorância específica dissimulada exigindo que o motor re-injetasse outra analogia ilustrada por vias paralelas novas que não a original até o conceito fundir inseparavelmente na sinapse do juízo meu puro.",
      "Abandonar tristemente a lida técnica frente à tela e procurar no Google a busca randômica esparsa caótica pura avulsa vã oca solta fora."
    ],
    2,
    "Eis onde a tutoria mecânica esmaga um manual impresso tradicional: detém e rebobina a lógica do que frouxou ajustando a lupa nela num estalo pontual singular vivo ativo responsivo orgânico reativo sem sair."
  ),
  textStep(
    "Inquisição da Razão via Arquitetura Socrática",
    "Das mais refinadas matrizes construtoras intelectuais ressurge o Método de Sócrates — no lugar de engolir pílulas doutrinárias servidas, você atua provocado inquisitivamente. Uma fornalha reflexiva onde a máquina lhe extorque a vereda ao invés de asfaltá-la fácil à sua revelia cômoda preguiçosa inútil formiga rasa do mar de informação passiva estática vã frágil esquecida logo ao virar a noite.",
    "Basta exigir que assuma a doutrina do inquérito gradual progressivo incisivo contínuo, cobrando explicações de volta vindas unicamente suas forjando mentes peritas afiadas ativas em debates plenos vivos fortíssimos fortes intensos reais puros focados únicos puros sublimes grandes sem fim e sem preguiça vazia ou desculpas de tempo fácil vazio e nulo de mente estéril doentio e vazio falho e raso do raso comum."
  ),
  fillStep(
    "Chave De Ignição Analítica Absoluta De Investigação Ativa Viva Socrática de Ouro Real Limpar Pura Bruta!",
    "Force as engrenagens ao limite forjando a máquina num torturador dialético construtivista positivo construtivo formador que lhe empurra sem dar trégua na construção racional exata.",
    '"Tenciono dissecar inteiriçamente o eixo basilar contundente regendo puramente a ___. Em drástico revés ao fornecimento linear passivo brando das resoluções prontas macias gratuitas servidas no prato plano seu comum de praxe, aplique implacavelmente e inexoravelmente sob mim com mão de ferro pesada o famoso ___: alavanque interrogações graduais desafiadoras que forcem minha rede intelectiva natural e orgânica bruta a arduamente ___ os limiares das explicações de moto próprio suado conquistado passo a passo lutando puro sozinho sem a base de graça. E ao incorrer no equívoco fatal de via errada no raciocínio meu lógico torto humano frágil meu, ___, vetando sumariamente e proibindo brutalmente a dádiva imerecida de respostas cabais cuspidas diretas para meu consolo fácil de tolo acomodado preguiçoso fraco do século novo mole moderno sem lutas duras no intelecto puro superior sem brilho apagado feio mudo!"',
    ["lógica matemática", "método socrático", "descobrir", "me dê uma dica temporária enigmática guia justa formativa formadora do jeito"],
    ["lógica matemática", "método socrático", "descobrir", "me dê uma dica temporária enigmática guia justa formativa formadora do jeito", "receita de culinária simples passiva básica pura crua de microondas", "resolva tudo de vez para mim e logo com isso e pare de falar nisto", "simulado de vestibular velho sem cabarito nulo solto aleatório mal feito da rede livre aberta livre"],
    "Você barra radicalmente o algoritmo formatista enciclopédico chato burocrático, acionando a maestria milenar interpelante do modelo de guia filosófico, elevando seu preparo lógico neural cognitivo mental verdadeiro ao zênite total formativo real útil vivo perene absoluto eterno gigante superior dominante exato firme de guerra sem medo algum imbatível de retenção magna poderosa absoluta forte mestre sublime!"
  ),
  textStep(
    "Ponto Final: Esforço Próprio. O Princípio de Esparta",
    "A IA alavanca vetores espaciais temporais de captação macia de dados outrora inalcançáveis velozmente no século morto anterior nosso escuro lento burro. Contudo, seu lombo, a resiliência no revés dialético no bate pronto contínuo iterativo longo e exaustivo formativo repetitivo contínuo intenso do dia, permanece e clama por obra única estrita exclusiva solitária intransferível perfeitamente sua sua inteira sua de cada indivíduo suando. O esforço neural real é de tráfego seu intransponível e inalienável ao robô ou ferramenta fria.\n\nLição Concluída ✓"
  )
];

export const CHATGPT_MODULE_8_STEPS_EN = [
  textStep(
    "Your Personal 24/7 Teacher",
    "Welcome back! In this lesson, you will discover how to deploy ChatGPT to master literally any subject — from absolute zero to sheer advanced professional territory — fully personalized to your exact intellectual bandwidth and rhythm."
  ),
  textStep(
    "Absolute Availability",
    "Imagine possessing an elite tutor who corners the market on global technical data, never once complains about exhaustion, modifies the structural difficulty based on your gaze, and sits on call dynamically round the clock. ChatGPT executes this role cleanly assuming your input commands are crafted correctly without slacking."
  ),
  quizStep(
    "The True Dominance in Studying",
    "Why does utilizing ChatGPT for learning effortlessly obliterate traditional static sources when plunging into heavy modern subjects?",
    [
      "It mathematically promises to etch data into your brain cells without any functional effort from you aside from reading text lightly.",
      "It totally suppresses the core necessity to actually absorb true academic books.",
      "It dynamically adapts the depth, pace, and vocabulary to precisely match your exact isolated point of comprehension instantaneously without judgment.",
      "It magically speeds up performance the fewer context clues you dump into the prompt box."
    ],
    2,
    "The sheer adaptability destroys the outdated 'one-size-fits-all' curriculum. You force the machine to scale to your exact moment of ignorance and walk you up the staircase."
  ),
  textStep(
    "Ground Zero Mastery Strategies",
    "The primary move when battling a complex untouched discipline is to command a gentle access ramp. No towering academic jargon: demand clean foundations layered upon everyday raw street-level analogies and comparisons."
  ),
  fillStep(
    "Forge Your Teaching Core Request!",
    "Fill securely the structural conditions constraining the AI to play the correct pedagogical role for an absolute fresh beginner.",
    '"Operating as a master educator in ___, I desire to absorb the depths of ___ starting absolutely blank from null. Initiate forcefully with the most fundamental logical ___, deploying ruthlessly simple everyday basic ___ for traction, and dictating exactly the required prerequisites mapping my way before shifting gears higher up the chain. Proceed carefully."',
    ["physics", "how electricity works", "concept", "analogies"],
    ["physics", "how electricity works", "concept", "analogies", "theology alone in history dark slow texts old", "massively heavy graduate final exam papers"],
    "Framing your profound beginner status to an expert persona locks the engine into an empathetic and logical bedrock level preventing academic overkill."
  ),
  textStep(
    "Socratic Warfare",
    "Swallowing ready-made pills of doctrine creates fragile memories. The ultimate technique revives the brutal Socratic Method: forcing the AI to grill you through deep inquiry, cornering your reasoning until you carve the true answer organically by sheer cognitive effort alone, refusing weak easy shortcuts delivered passively to your eyes."
  ),
  quizStep(
    "The Razor's Edge of Learning",
    "Why does forcing the machine into Socratic questioning yield dramatically superior cognitive retention versus a typical summary readout command?",
    [
      "It forces the system to spend less server energy and prints responses dramatically faster.",
      "It strictly prohibits the machine from utilizing English language shortcuts making it formal.",
      "It weaponizes the neural network to drag you into active real-time struggling problem-solving making the data physically stick to your brain pathways forever.",
      "It is an old myth, it does not actually have any tangible psychological benefit during tech sessions."
    ],
    2,
    "The struggle is the glue. Dodging immediate answers to fight through guided logic builds unbreakable permanent comprehension compared to passive scrolling."
  ),
  textStep(
    "Module Finalized: The Ultimate Rule",
    "ChatGPT is a supersonic jetpack for knowledge ingestion, but you remain the sole pilot battling the G-force. It feeds the framework; your raw neural strain to practice, review, and iterate dictates the altitude of mastery. Do not mistake an easy prompt for an easy mind.\n\nLesson complete ✓"
  )
];

export const CHATGPT_MODULE_8_STEPS_ES = [
  textStep(
    "Tu Mentor de Élite Ininterrumpido",
    "¡Estamos de regreso! Descubrirás la potencia cruda de acoplar a ChatGPT en tu mente como el preceptor particular definitivo para dominar el vacío — saltando de un principiante nulo a un titán avanzado — adaptando la bestia de silicio a tu ritmo orgánico e individual exigencia neuronal real viva."
  ),
  textStep(
    "Disponibilidad Absoluta 24/7",
    "Piensa en someter un especialista omnisciente que enreda en sus datos el espectro académico total, sin jamás quejarse por volver al mismo punto, amoldándose sin fricción a tu déficit de atención preciso del día y tu estado vivo matutino o de penumbra. ChatGPT lo personifica majestuosamente, sujeto siempre a que asestas los parámetros exigidos sin tibiezas al inicio del mandato directivo férreo duro puro firme."
  ),
  quizStep(
    "El Filo Trascendente del Aprendizaje por Prompts Estrictos Dirigidos Certeros",
    "Frente al desafío tortuoso de triturar una disciplina arcana, ¿Por qué ChatGPT destroza metódicamente a la arcaica pedagogía formal de masas regulares viejas polvorientas largas tediosas teóricas pesadas lentas aburridas tradicionales de antes?",
    [
      "Puesto que inocula de por sí y automáticamente todo el saber directo al neocórtex humano prescindiendo en su plenitud del más ligero escrutinio o rastro procesal activo mental del usuario lector pasivo espectador vago adormecido relajado quieto ausente de labor de esfuerzo intelectual o desgaste de repetición o falla en práctica de ejercicio mental vivo calurso.",
      "Extingue para toda la eternidad laboral la necesidad pura genuina válida firme y viva de la lectura base oficial certificada tradicional formadora de criterio profundo denso macizo total.",
      "Adapta milimétricamente el grosor semántico, el veloz paso, y el escarpado terreno al preciso umbral cognoscitivo suyo del momento presente vivo en la sala, amoldando su cerebro ciego artificial al paso mental vivo real del alumno en trinchera.",
      "Por norma de desarrollo de red lógica abstracta del programa general matriz original principal, opera fabulosamente mejorando sus retornos y la contundencia abstracta pura mientras menor información real y variables directrices concisas precisas puras inyectemos al motor vacío blanco ciego neutro gris nulo inicial al abrir el chat."
    ],
    2,
    "Su versatilidad liquida el modelo educativo masivo. Tú impones al servidor descender hasta tu propio peldaño de ignorancia puntual y obligar que moldee el escalón y te suba de la mano a paso seguro."
  ),
  textStep(
    "Trazando Vías Tácticas de Formación Secuenciada Blindada Dirigida",
    "Acudir a la batalla sin plano de suministro es el prefacio al abandono prematuro sombrío del alumno solo en la red vasta salvaje sin ley. La colosal plataforma asume el poder de estructurar y acotar un rígido andamio calendarizado de asimilación intelectual de carga formativa real táctica que se mide al milímetro con tus flacos ínfimos minutos restantes de vida de jornada activa libre fuera del horario extenuante de oficina tuya de labores."
  ),
  fillStep(
    "¡Gestar Tu Estructura y Plan Arquitectónico Formativo Radical de Horas Activo Puro Veloz Vivo y Constante Seguro Fuerte Firme Duro Cierto Real Diario Práctico!",
    "Configura sin fallo los casilleros de tu régimen forzando al ente para que dibuje y arme meticulosamente paso a paso ciego exacto el trazado y la ruta perenne segura formativa y triunfal clara real y concreta de este reto gigante inmenso por meses.",
    '"Forja inmediatamente en plano un rígido programa logístico cronometrado inquebrantable sistemático estructurado progresivo ordenado y limpio para que mi mente logre absorber netamente el dialecto ___ de forma contundente en el transcurrir acotado de ___. Cuento de forma exclusiva tajante estricta y dolorosa solo con ínfimos ___ exiguos diarios libres de tiempo a mi favor valioso poco corto escaso de lucha. Mi trinchera actual se define nivel ___. Fracciona la odisea de asalto temático y progreso rudo encadenando las fases de la guerra puramente medidas por plazos de ___ vivos continuos dinámicos progresivos formales. Inserta forzosamente en las filas mecanismos o pautas obligatorias de cómo y por qué vía empírica exacta aterrizar el logro táctico y  ___ duramente vivo a fondo cada palmo avanzado nuevo de la etapa. [Puntos ciegos]"',
    ["inglés para negocios", "3 meses", "30 minutos", "principiante", "semanas", "practicar"],
    ["inglés para negocios", "3 meses", "30 minutos", "principiante", "semanas", "practicar", "ver televisión relajado y solo tranquilo quieto asimilando vagamente las ondas por años", "chino avanzado milenario clásico poético ciego y largo eterno perenne infinito"],
    "Circundar el tiempo límite y los bloques fraccionados semanales sepulta de inmediato la indecisión al vacío, esculpiendo un micro éxito tangible ineludible cada día sobre el frente de la contienda de estudios de tu objetivo al fin logrado certero firme fijo exacto útil bueno veloz y real puro."
  ),
  textStep(
    "Doma Táctica Neural Profunda vía Socrática de Abordaje Dialéctico Severo y Brutal",
    "En vez de mascar mansa y mansamente el pasto pre-dirigido y digerido servido en mesa fácil por la inteligencia, debes abrazar y soportar el castigo interrogante formador duro el Método Socrático: asediar el núcleo de la comprensión demandando ser hostigado arrinconado contra interrogado con fiereza abstracta cognitiva de maestro estricto sin escrúpulos ni dar treguas directas dadas sin mérito o sudor para elevar la capacidad del cerebro real humano de deducción pura dura forjada fuego y prueba viva al filo extremo del conocimiento genuino asimilado."
  ),
  textStep(
    "Conclusión de Batalla: La Ley inmutable del Sudor Tuyo Privado",
    "ChatGPT es propulsión cósmica a velocidades luz teórica analítica formidable, pero es a tu cráneo ciego, tu dolor asimilador iterado largo repetido pesado vivo crudo agrio al que le concierne tragar de lleno el contenido de los g-force abismales en contra del ignorante sin práctica revisión o aplicación. Develar las mecánicas del bot te sirve la palestra, pero la grandeza la peleas desde hoy y por tu lomo humano terrenal solo para el resto del viaje de estudios y asimilación técnica puramente al margen del ente robótico de consulta pasiva fría textual del monitor plano. Tu cabeza piensa vive procesa guarda crea reacciona forma moldea asimila gana vence trasciende crea evoluciona.\n\nLección Superada ✓"
  )
];

export const CHATGPT_MODULE_8_STEPS_FR = [
  textStep(
    "Le Maître Imposé Sans Relâche de Tous les Instants Critiques de la Conquête de l'Esprit",
    "Salut les vainqueurs. Aujourd'hui nous armons l'outil pour supplanter magnifiquement votre précepteur de haut vol lourd et cher arrogant et distant inabordable, et muer l'algorithme brut en une lumière formatrice pure de savoir universel total de base et de haut plan tactique."
  ),
  quizStep(
    "La Mue Formative Absolue Puissante Vraie de la Singularité Éducative Actuelle Technologique Face au Mur Fixe et Long de l'Ouvrage Matériel Ancestral de Lecture Classique",
    "Quel paradigme détache si furieusement l'alliance d'apprentissage soutenu appuyée ardemment activement vigoureusement puissamment vivement techniquement de l'Intelligence Informatique par devant des formats lourds séculaires d'érudition stricte en bibliothèque d'antan des gloires nobles passées dures à vaincre?",
    [
      "S'évanouit alors formellement le dur fardeau réel obligatoire et sévère long pesant de la mise en œuvre pratique rigoureuse mentale profonde en aval suite des lignes ingérées sans action formelle derrière.",
      "Le procédé remplace physiquement toute la somme de diplômes académiques et éradique les professionnels enseignants humains de valeur d'expertise formelle mondiale des établissements complets d'une seule commande magique exécutive directe de la touche pure clavier vif.",
      "La flexibilité farouche paramétrique de synchroniser mathématiquement de manière automatique exacte pointilleuse précise sans concession ou flou absolu le calibrage cognitif brut à la circonférence précise singulière étroite et exclusive de vos capacités prééminentes natives de connaissances du jour pur vrai fixe clair limité strict exact.",
      "Toutes les commandes sans exception se transmutent en même réponse uniforme stable répétable parfaite plate sans nuance formelle exacte claire égale pour tous les lecteurs indifféremment sur terre de tous les niveaux confondus réels unis plats de profil identique nul ou puissant égal par tous."
    ],
    2,
    "Briser les carcans formatés d'études d'âge passés. Votre ordre dicte au processeur de s'écraser précisément à hauteur d'yeux ignorant absolus et de bâtir marche après marche stricte en synergie avec la rapidité intime de vos connexions cérébrales seules pures et sans moquerie ou accélération d'un groupe en classe bruyante de pairs d'âge égal ou supérieur avançant plus fort brutalement vite et sans pitié sur l'orgueil de l'apprenant."
  ),
  fillStep(
    "L'Attaque Frontale Cognitive Socratique Inquisitrice et Oppressante Pure Brute Efficace Merveilleuse Parfaite Unique Redoutable Sans Égale Magistrale Solide Extrême Formatrice !",
    "Façonnez ce couteau verbal forçant l'engin textuel algorithmique froid mort à se faire fouetteur intellectuel dur implacable pour faire saillir la vérité organique humaine de l'intérieur profond par soi même au lieu d'une perfusion facile.",
    '"Je postule la prétention formelle audacieuse forte folle immense de décortiquer vivement intimement activement ___. Interdis-toi formellement cruellement fermement sans pardon l\'action pitoyable molle de m\'abreuver passivement de données plates et prêtes. Soumets mon cerveau activement lourdement puissamment sous la loi violente du ___ : déclenche fermement la rafale d\'énigmes exigeantes complexes pour me manipuler frontalement à ___ par l\'action seule crue ardente pure vraie et difficile l\'étincelle réponse sans aide des autres. Si le ravin du mauvais concept me prend par l\'erreur bête de pensée tordue mienne ignorante gauche obscure lointaine fausse et folle, recadre moi de biais pur rude et donne d\'urgence de ce fait un coup d\'essai vif en ___ pour me garder la tension et non l\'abandon passif nul sans valeur faible fade mort vide plat. Agis."' ,
    ["logique mathématique", "méthode socratique", "découvrir", "piste ou indice temporaire d'énigme rebond d'indice sec ferme net pur fort formateur clair juste bienveillant dur actif pur simple formateur en force de but concret vrai fort précis de fond profond sain bon"],
    ["logique mathématique", "méthode socratique", "découvrir", "piste ou indice temporaire d'énigme rebond d'indice sec ferme net pur fort formateur clair juste bienveillant dur actif pur simple formateur en force de but concret vrai fort précis de fond profond sain bon", "chimie molle facile passive nule ennuyeuse obscure absurde de collège primaire long", "clic fin tout finissant et lâche la chose", "pari de dés aléatoires vagues flous", "formule complète crue totale servie sur lit de glace fondue sans chaleur morte vaine nulle passée vide"],
    "La douleur synthétique dialectique engendre les fibres mémorielles d'adamantium ; l'accès pré-mâché, la vase de l'amnésie. L'inquisition structure la conquête perenne."
  ),
  textStep(
    "Dépôt du Glaive et Fin de Bataille Apprentie Longue : Loi Suprême",
    "Nul IA au sein de l'architecture d'entreprise au monde ou du firmament technologique d'univers digital global massif pur entier de force ne viendra à la fois formuler l'idée complexe magique exempte de douleur et en implanter viscéralement au fondement l'usage en vous et à votre place activement pour exister vaincre vivre produire créer penser innover combattre dans le vide sans effort, votre chair, votre concentration, le passage au feu, constituent la seule forge inaliénable réelle formelle pour graver le fond. Le code propose le canevas, le poing de l'humain cogne la forge du monde.\n\nFini ✓"
  )
];
