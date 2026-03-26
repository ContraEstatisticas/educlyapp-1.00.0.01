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

export const LOVABLE_MODULE_5_STEPS_PT = [
  textStep(
    "Escrevendo Conteudo para Sites e Apps no Lovable",
    "Bem-vindo de volta! Nesta licao, voce vai aprender como escrever o conteudo certo para cada parte do seu site ou aplicativo criado no Lovable, com textos que convertem, orientam, engajam e constroem confianca desde o primeiro segundo."
  ),
  textStep(
    "Por que o Conteudo e Tao Importante quanto o Design",
    "Muita gente foca apenas no visual e esquece que sao as palavras que ajudam o usuario a entender, confiar e agir. Um design bonito com conteudo vago perde para uma experiencia simples com mensagem clara. As palavras criam clareza, confianca e urgencia."
  ),
  textStep(
    "O Titulo Principal",
    "O titulo principal tem poucos segundos para comunicar valor. Ele precisa responder rapido o que voce oferece, para quem aquilo serve e qual e o beneficio principal, sem jargoes e sem obrigar o visitante a pensar demais."
  ),
  fillStep(
    "Preencha a lacuna - Escreva seu titulo!",
    "Monte a formula de um titulo forte com exemplos prontos.",
    "\"Formula do titulo poderoso: ___ + ___ + ___. Exemplos: '___ para ___ sem ___' / 'O ___ que ___ em ___' / '___ seu ___ com ___'.\"",
    [
      "o que faz",
      "para quem",
      "qual beneficio",
      "Agendamentos online",
      "profissionais autonomos",
      "planilha ou WhatsApp",
      "sistema",
      "organiza sua agenda",
      "minutos",
      "Automatize",
      "negocio",
      "inteligencia artificial"
    ],
    [
      "o que faz",
      "para quem",
      "qual beneficio",
      "Agendamentos online",
      "profissionais autonomos",
      "planilha ou WhatsApp",
      "sistema",
      "organiza sua agenda",
      "minutos",
      "Automatize",
      "negocio",
      "inteligencia artificial",
      "site bonito",
      "clique aqui"
    ],
    "Titulos fortes deixam claro o valor logo no inicio e evitam frases bonitas que nao dizem nada."
  ),
  textStep(
    "O Subtitulo",
    "O subtitulo aparece logo abaixo do titulo e expande a promessa principal. O titulo chama atencao e o subtitulo mostra como aquilo funciona, por que o usuario deve acreditar e o que torna o produto diferente."
  ),
  fillStep(
    "Preencha a lacuna - Escreva seu subtitulo!",
    "Monte a logica do subtitulo e complete o exemplo do AgendaPro.",
    "\"Se o titulo diz ___, o subtitulo deve responder: ___, ___ ou ___. Exemplo: Titulo: 'Gerencie sua agenda sem ___' / Subtitulo: 'O Agenda Pro permite que ___ cadastrem clientes, criem ___ e acompanhem ___, tudo em uma plataforma ___ e acessivel de qualquer ___.'\"",
    [
      "o que o produto faz",
      "como funciona",
      "por que acreditar",
      "o que torna unico",
      "caos",
      "profissionais autonomos",
      "agendamentos",
      "pagamentos",
      "simples",
      "dispositivo"
    ],
    [
      "o que o produto faz",
      "como funciona",
      "por que acreditar",
      "o que torna unico",
      "caos",
      "profissionais autonomos",
      "agendamentos",
      "pagamentos",
      "simples",
      "dispositivo",
      "promessa vaga",
      "efeito visual"
    ],
    "Um bom subtitulo detalha a promessa do titulo e ajuda o visitante a entender por que vale a pena continuar."
  ),
  textStep(
    "Escrevendo o CTA",
    "O CTA e o botao ou link que pede uma acao. CTAs genericos como 'Clique aqui' ou 'Saiba mais' tendem a perder para CTAs especificos, que dizem o que acontece depois do clique e diminuem a hesitacao."
  ),
  quizStep(
    "O que faz um CTA converter melhor?",
    "O que torna um CTA significativamente mais eficaz do que outro?",
    [
      "Usar cores mais vibrantes no botao para atrair o olhar.",
      "Deixar o botao maior do que todos os outros elementos da pagina.",
      "Especificar o que acontece apos o clique e remover o risco percebido.",
      "CTAs com mais de 5 palavras sempre convertem melhor."
    ],
    2,
    "O CTA mais forte comunica com clareza o proximo passo e reduz a incerteza do usuario sobre o que vai acontecer."
  ),
  textStep(
    "Secao de Beneficios",
    "A secao de beneficios e onde voce traduz funcionalidades em valor real. O usuario nao compra um sistema de agendamento; ele compra menos estresse, mais organizacao e mais tempo livre."
  ),
  fillStep(
    "Preencha a lacuna - Transforme funcionalidades em beneficios!",
    "Converta funcionalidades frias em beneficios claros para o usuario.",
    "\"Funcionalidade: 'Sistema de agendamento online' -> Beneficio: '___' / Funcionalidade: 'Cadastro de clientes' -> Beneficio: '___' / Funcionalidade: 'Notificacoes automaticas' -> Beneficio: '___' / Funcionalidade: 'Relatorios de receita' -> Beneficio: '___'.\"",
    [
      "Seus clientes agendam sozinhos 24h por dia sem voce precisar responder mensagens",
      "Todas as informacoes dos seus clientes em um so lugar, sempre acessiveis",
      "Chega de cliente que esquece o horario, lembretes automaticos reduzem faltas em ate 40%",
      "Saiba exatamente quanto voce ganhou no mes sem precisar calcular nada"
    ],
    [
      "Seus clientes agendam sozinhos 24h por dia sem voce precisar responder mensagens",
      "Todas as informacoes dos seus clientes em um so lugar, sempre acessiveis",
      "Chega de cliente que esquece o horario, lembretes automaticos reduzem faltas em ate 40%",
      "Saiba exatamente quanto voce ganhou no mes sem precisar calcular nada",
      "Tela moderna com bons icones",
      "Sistema com varias opcoes"
    ],
    "Beneficios fortes mostram o impacto real da funcionalidade na vida e na rotina de quem usa o produto."
  ),
  textStep(
    "Escrevendo Microcopy",
    "Microcopy sao pequenos textos como placeholders, mensagens de erro, confirmacoes e labels. Eles aparecem justamente nos momentos mais sensiveis da experiencia e, por isso, influenciam muito a sensacao de clareza e confianca."
  ),
  fillStep(
    "Preencha a lacuna - Escreva microcopy de qualidade!",
    "Melhore placeholders, erros e confirmacoes usando linguagem mais clara.",
    "\"Placeholder fraco: '___' -> Placeholder forte: '___' / Mensagem de erro fraca: '___' -> Mensagem de erro forte: '___' / Confirmacao fraca: '___' -> Confirmacao forte: '___'.\"",
    [
      "Nome",
      "Como prefere ser chamado?",
      "Campo invalido",
      "Por favor insira um telefone com DDD, por exemplo (11) 99999-9999",
      "Salvo",
      "Agendamento confirmado! Seu cliente recebera uma notificacao."
    ],
    [
      "Nome",
      "Como prefere ser chamado?",
      "Campo invalido",
      "Por favor insira um telefone com DDD, por exemplo (11) 99999-9999",
      "Salvo",
      "Agendamento confirmado! Seu cliente recebera uma notificacao.",
      "Erro",
      "OK"
    ],
    "Microcopy boa explica o que o usuario deve fazer, o que aconteceu e o que vem a seguir."
  ),
  textStep(
    "Textos para Cadastro e Login",
    "Cadastro e login sao momentos em que o usuario decide se confia ou nao no produto. Textos que reforcam beneficio e reduzem risco percebido fazem muita diferenca na conversao."
  ),
  fillStep(
    "Preencha a lacuna - Escreva para conversao!",
    "Monte uma tela de cadastro com foco em valor e confianca.",
    "\"Na pagina de cadastro, o titulo deve focar no ___ e nao na acao. Em vez de ___ use ___. Abaixo do formulario adicione elementos de ___ como ___ e ___. O botao de envio deve dizer ___ em vez de ___.\"",
    [
      "beneficio",
      "Criar conta",
      "Comece a organizar sua agenda hoje",
      "confianca",
      "sem cartao de credito",
      "cancele quando quiser",
      "Criar minha conta gratis",
      "Enviar"
    ],
    [
      "beneficio",
      "Criar conta",
      "Comece a organizar sua agenda hoje",
      "confianca",
      "sem cartao de credito",
      "cancele quando quiser",
      "Criar minha conta gratis",
      "Enviar",
      "cadastro",
      "botao azul"
    ],
    "Quando o texto destaca ganho e reduz risco, o cadastro parece um proximo passo natural em vez de um compromisso pesado."
  ),
  textStep(
    "Escrevendo para o Onboarding",
    "Onboarding e a jornada entre o cadastro e o primeiro valor real entregue pelo produto. As primeiras palavras precisam orientar o usuario com clareza e leva-lo rapidamente ate a primeira conquista."
  ),
  fillStep(
    "Preencha a lacuna - Escreva o onboarding!",
    "Monte uma mensagem de boas-vindas e um primeiro estado vazio orientado a acao.",
    "\"Mensagem de boas-vindas: '___, ___! Sua agenda profissional esta pronta. Vamos comecar com ___ simples: ___ seu primeiro cliente.' / Texto do primeiro passo vazio: 'Voce ainda nao tem ___. ___ agora e comece a ___ seus agendamentos em menos de ___ minutos.'\"",
    [
      "Seja bem-vindo",
      "[nome do usuario]",
      "1 passo",
      "cadastre",
      "nenhum cliente cadastrado",
      "Adicione seu primeiro cliente",
      "organizar",
      "2"
    ],
    [
      "Seja bem-vindo",
      "[nome do usuario]",
      "1 passo",
      "cadastre",
      "nenhum cliente cadastrado",
      "Adicione seu primeiro cliente",
      "organizar",
      "2",
      "depois",
      "talvez"
    ],
    "O melhor onboarding reduz a inercia inicial com orientacao simples, acolhedora e focada em uma primeira acao concreta."
  ),
  textStep(
    "Estados Vazios",
    "Estados vazios sao telas sem dados. Em vez de parecerem um beco sem saida, eles devem orientar o usuario sobre o proximo passo e mostrar claramente o que ele ganha ao agir."
  ),
  fillStep(
    "Preencha a lacuna - Transforme estados vazios em oportunidades!",
    "Transforme uma tela vazia em um convite claro para a acao.",
    "\"Estado vazio fraco: '___' / Estado vazio forte: '___' / '___' / '___'.\"",
    [
      "Nenhum agendamento encontrado",
      "Sua agenda esta livre por enquanto",
      "Adicione seu primeiro agendamento e comece a organizar seu dia",
      "+ Novo Agendamento"
    ],
    [
      "Nenhum agendamento encontrado",
      "Sua agenda esta livre por enquanto",
      "Adicione seu primeiro agendamento e comece a organizar seu dia",
      "+ Novo Agendamento",
      "Tela vazia",
      "Sem dados"
    ],
    "Um estado vazio forte orienta, motiva e mostra qual e a proxima acao mais importante."
  ),
  textStep(
    "E-mails Automaticos",
    "Quando o aplicativo envia e-mails automaticos, o texto precisa ser claro e util. Um bom email confirma o que importa, reduz duvidas e facilita a acao seguinte, como reagendar ou se preparar para o atendimento."
  ),
  fillStep(
    "Preencha a lacuna - Escreva e-mails automaticos!",
    "Monte um e-mail automatico de confirmacao de agendamento.",
    "\"E-mail de confirmacao de agendamento: Assunto: '___' / Abertura: '___' / Confirmacao: '___' / Proximo passo: '___' / Fechamento: '___'.\"",
    [
      "Seu agendamento esta confirmado",
      "Ola, [nome]! Tudo certo com seu horario.",
      "Data: [data] as [horario] com [profissional]",
      "Se precisar reagendar clique aqui",
      "Ate la!"
    ],
    [
      "Seu agendamento esta confirmado",
      "Ola, [nome]! Tudo certo com seu horario.",
      "Data: [data] as [horario] com [profissional]",
      "Se precisar reagendar clique aqui",
      "Ate la!",
      "Mensagem automatica",
      "Sem resposta"
    ],
    "E-mails automaticos funcionam melhor quando informam o essencial e deixam claro o que o usuario pode fazer em seguida."
  ),
  textStep(
    "Tom de Voz",
    "O tom de voz precisa ser consistente em todo o produto e fazer sentido para o publico que vai usar a ferramenta. Essa consistencia ajuda o app a parecer intencional, confiavel e memoravel."
  ),
  quizStep(
    "Consistencia de tom de voz",
    "Por que manter consistencia de tom de voz em todo o aplicativo e estrategico?",
    [
      "Para facilitar a escrita seguindo um unico padrao.",
      "Porque usuarios reclamam sempre que o tom muda entre telas.",
      "Porque a consistencia cria uma personalidade reconhecivel para o produto e fortalece o vinculo com o usuario.",
      "Tom de voz so importa em produtos de consumo."
    ],
    2,
    "Quando o produto fala de forma coerente em todos os pontos de contato, ele parece mais confiavel, mais humano e mais alinhado ao publico certo."
  ),
  textStep(
    "Conclusao",
    "Escrever bem para sites e aplicativos no Lovable e o que transforma um produto funcional em um produto que converte, retem e encanta. Titulos claros, CTAs especificos, beneficios relevantes, microcopy util, onboarding objetivo, estados vazios acionaveis e e-mails bem escritos trabalham juntos para guiar o usuario em cada etapa.\n\nLicao concluida."
  ),
] as const;

export const LOVABLE_MODULE_5_STEPS_EN = [
  textStep(
    "Writing Content for Sites and Apps in Lovable",
    "Welcome back! In this lesson, you will learn how to write the right content for every part of your site or app built in Lovable, with copy that converts, guides, engages, and builds trust from the first second."
  ),
  textStep(
    "Why Content Matters as Much as Design",
    "Many people focus only on visuals and forget that words are what help users understand, trust, and act. A beautiful design with vague copy loses to a simple experience with a clear message. Words create clarity, trust, and urgency."
  ),
  textStep(
    "The Main Headline",
    "The main headline has only a few seconds to communicate value. It should quickly answer what you offer, who it is for, and what the main benefit is, without jargon or unnecessary thinking."
  ),
  fillStep(
    "Fill in the blanks - Write your headline!",
    "Build the formula of a strong headline with ready-made examples.",
    "\"Powerful headline formula: ___ + ___ + ___. Examples: '___ for ___ without ___' / 'The ___ that ___ in ___' / '___ your ___ with ___'.\"",
    [
      "what it does",
      "for whom",
      "what benefit",
      "Online scheduling",
      "self-employed professionals",
      "spreadsheet or WhatsApp",
      "system",
      "organizes your schedule",
      "minutes",
      "Automate",
      "business",
      "artificial intelligence"
    ],
    [
      "what it does",
      "for whom",
      "what benefit",
      "Online scheduling",
      "self-employed professionals",
      "spreadsheet or WhatsApp",
      "system",
      "organizes your schedule",
      "minutes",
      "Automate",
      "business",
      "artificial intelligence",
      "pretty website",
      "click here"
    ],
    "Strong headlines make the value clear right away and avoid pretty phrases that say very little."
  ),
  textStep(
    "The Subtitle",
    "The subtitle sits below the headline and expands the main promise. The headline grabs attention, and the subtitle explains how it works, why the user should believe it, and what makes the product different."
  ),
  fillStep(
    "Fill in the blanks - Write your subtitle!",
    "Build the subtitle logic and complete the AgendaPro example.",
    "\"If the headline says ___, the subtitle should answer: ___, ___, or ___. Example: Headline: 'Manage your schedule without ___' / Subtitle: 'Agenda Pro lets ___ register clients, create ___, and track ___, all in a ___ platform accessible from any ___.'\"",
    [
      "what the product does",
      "how it works",
      "why believe it",
      "what makes it unique",
      "chaos",
      "self-employed professionals",
      "appointments",
      "payments",
      "simple",
      "device"
    ],
    [
      "what the product does",
      "how it works",
      "why believe it",
      "what makes it unique",
      "chaos",
      "self-employed professionals",
      "appointments",
      "payments",
      "simple",
      "device",
      "vague promise",
      "visual effect"
    ],
    "A good subtitle adds detail to the headline and helps the visitor understand why it is worth continuing."
  ),
  textStep(
    "Writing the CTA",
    "The CTA is the button or link asking the user to act. Generic CTAs like 'Click here' or 'Learn more' usually lose to specific CTAs that explain what happens next and reduce hesitation."
  ),
  quizStep(
    "What makes a CTA convert better?",
    "What makes one CTA significantly more effective than another?",
    [
      "Using brighter colors on the button to attract attention.",
      "Making the button larger than every other page element.",
      "Specifying what happens after the click and removing perceived risk.",
      "CTAs with more than 5 words always convert better."
    ],
    2,
    "The strongest CTA clearly communicates the next step and reduces uncertainty about what the user will get."
  ),
  textStep(
    "Benefit Section",
    "The benefits section is where you turn features into real value. The user is not buying a scheduling system; they are buying less stress, more organization, and more free time."
  ),
  fillStep(
    "Fill in the blanks - Turn features into benefits!",
    "Convert cold features into clear benefits for the user.",
    "\"Feature: 'Online scheduling system' -> Benefit: '___' / Feature: 'Client database' -> Benefit: '___' / Feature: 'Automatic notifications' -> Benefit: '___' / Feature: 'Revenue reports' -> Benefit: '___'.\"",
    [
      "Your clients book by themselves 24/7 without you having to answer messages",
      "All your client information in one place, always accessible",
      "No more clients forgetting their time slot, automatic reminders can reduce no-shows by up to 40%",
      "Know exactly how much you earned in the month without calculating anything"
    ],
    [
      "Your clients book by themselves 24/7 without you having to answer messages",
      "All your client information in one place, always accessible",
      "No more clients forgetting their time slot, automatic reminders can reduce no-shows by up to 40%",
      "Know exactly how much you earned in the month without calculating anything",
      "Modern screen with good icons",
      "System with several options"
    ],
    "Strong benefits show the real impact of the feature on the user's life and routine."
  ),
  textStep(
    "Writing Microcopy",
    "Microcopy includes small texts such as placeholders, error messages, confirmations, and labels. These appear at the most sensitive points of the experience and have a big effect on clarity and trust."
  ),
  fillStep(
    "Fill in the blanks - Write quality microcopy!",
    "Improve placeholders, errors, and confirmations with clearer wording.",
    "\"Weak placeholder: '___' -> Strong placeholder: '___' / Weak error message: '___' -> Strong error message: '___' / Weak confirmation: '___' -> Strong confirmation: '___'.\"",
    [
      "Name",
      "How would you like to be addressed?",
      "Invalid field",
      "Please enter a phone number with area code, for example (11) 99999-9999",
      "Saved",
      "Appointment confirmed! Your client will receive a notification."
    ],
    [
      "Name",
      "How would you like to be addressed?",
      "Invalid field",
      "Please enter a phone number with area code, for example (11) 99999-9999",
      "Saved",
      "Appointment confirmed! Your client will receive a notification.",
      "Error",
      "OK"
    ],
    "Good microcopy tells the user what to do, what happened, and what comes next."
  ),
  textStep(
    "Copy for Signup and Login",
    "Signup and login are moments when the user decides whether they trust the product. Copy that reinforces benefit and lowers perceived risk has a major impact on conversion."
  ),
  fillStep(
    "Fill in the blanks - Write for conversion!",
    "Build a signup screen focused on value and trust.",
    "\"On the signup page, the title should focus on the ___ and not the action. Instead of ___ use ___. Below the form, add trust elements such as ___ and ___. The submit button should say ___ instead of ___.\"",
    [
      "benefit",
      "Create account",
      "Start organizing your schedule today",
      "no credit card required",
      "cancel anytime",
      "Create my free account",
      "Submit"
    ],
    [
      "benefit",
      "Create account",
      "Start organizing your schedule today",
      "no credit card required",
      "cancel anytime",
      "Create my free account",
      "Submit",
      "signup",
      "blue button"
    ],
    "When the copy highlights the gain and lowers the risk, signing up feels like a natural next step rather than a heavy commitment."
  ),
  textStep(
    "Writing for Onboarding",
    "Onboarding is the journey between signup and the first real value the product delivers. The first words should guide the user clearly and take them quickly to their first win."
  ),
  fillStep(
    "Fill in the blanks - Write the onboarding!",
    "Build a welcome message and a first empty state focused on action.",
    "\"Welcome message: '___, ___! Your professional schedule is ready. Let's start with ___ simple step: ___ your first client.' / First empty-step text: 'You still have ___. ___ now and start ___ your appointments in less than ___ minutes.'\"",
    [
      "Welcome",
      "[user name]",
      "1",
      "register",
      "no clients registered",
      "Add your first client",
      "organizing",
      "2"
    ],
    [
      "Welcome",
      "[user name]",
      "1",
      "register",
      "no clients registered",
      "Add your first client",
      "organizing",
      "2",
      "later",
      "maybe"
    ],
    "The best onboarding reduces initial friction with simple, friendly guidance focused on one concrete first action."
  ),
  textStep(
    "Empty States",
    "Empty states are screens without data. Instead of feeling like dead ends, they should guide the user toward the next step and show what they gain by taking action."
  ),
  fillStep(
    "Fill in the blanks - Turn empty states into opportunities!",
    "Turn an empty screen into a clear invitation to act.",
    "\"Weak empty state: '___' / Strong empty state: '___' / '___' / '___'.\"",
    [
      "No appointments found",
      "Your schedule is free for now",
      "Add your first appointment and start organizing your day",
      "+ New Appointment"
    ],
    [
      "No appointments found",
      "Your schedule is free for now",
      "Add your first appointment and start organizing your day",
      "+ New Appointment",
      "Empty screen",
      "No data"
    ],
    "A strong empty state guides, motivates, and points to the most important next action."
  ),
  textStep(
    "Automatic Emails",
    "When the app sends automatic emails, the copy should be clear and useful. A good email confirms what matters, reduces doubts, and makes the next action easy, such as rescheduling or getting ready."
  ),
  fillStep(
    "Fill in the blanks - Write automatic emails!",
    "Build an automatic appointment confirmation email.",
    "\"Appointment confirmation email: Subject: '___' / Opening: '___' / Confirmation: '___' / Next step: '___' / Closing: '___'.\"",
    [
      "Your appointment is confirmed",
      "Hi, [name]! Everything is set for your time.",
      "Date: [date] at [time] with [professional]",
      "If you need to reschedule click here",
      "See you then!"
    ],
    [
      "Your appointment is confirmed",
      "Hi, [name]! Everything is set for your time.",
      "Date: [date] at [time] with [professional]",
      "If you need to reschedule click here",
      "See you then!",
      "Automatic message",
      "No reply"
    ],
    "Automatic emails work best when they highlight the essentials and make the next action obvious."
  ),
  textStep(
    "Tone of Voice",
    "The tone of voice should stay consistent across the whole product and fit the audience using the tool. That consistency helps the app feel intentional, trustworthy, and memorable."
  ),
  quizStep(
    "Consistency of tone of voice",
    "Why is it strategic to keep tone of voice consistent across the whole app?",
    [
      "To make writing easier by following one pattern.",
      "Because users always complain when the tone changes between screens.",
      "Because consistency creates a recognizable product personality and strengthens the bond with the user.",
      "Tone of voice only matters in consumer products."
    ],
    2,
    "When the product speaks in a coherent way at every touchpoint, it feels more trustworthy, more human, and more aligned with the right audience."
  ),
  textStep(
    "Conclusion",
    "Writing well for sites and apps in Lovable is what turns a functional product into one that converts, retains, and delights. Clear headlines, specific CTAs, relevant benefits, useful microcopy, focused onboarding, actionable empty states, and well-written emails work together to guide the user through every step.\n\nLesson completed."
  ),
] as const;

export const LOVABLE_MODULE_5_STEPS_ES = [
  textStep(
    "Escribiendo Contenido para Sitios y Apps en Lovable",
    "Bienvenido de nuevo. En esta leccion vas a aprender como escribir el contenido correcto para cada parte de tu sitio o aplicacion creada en Lovable, con textos que convierten, orientan, involucran y construyen confianza desde el primer segundo."
  ),
  textStep(
    "Por que el Contenido Importa Tanto como el Diseno",
    "Mucha gente se enfoca solo en lo visual y olvida que son las palabras las que ayudan al usuario a entender, confiar y actuar. Un diseno bonito con contenido vago pierde frente a una experiencia simple con un mensaje claro. Las palabras crean claridad, confianza y urgencia."
  ),
  textStep(
    "El Titulo Principal",
    "El titulo principal tiene pocos segundos para comunicar valor. Debe responder rapido que ofreces, para quien es y cual es el beneficio principal, sin jerga y sin hacer pensar de mas al visitante."
  ),
  fillStep(
    "Completa los espacios - Escribe tu titulo!",
    "Construye la formula de un titulo fuerte con ejemplos listos.",
    "\"Formula del titulo poderoso: ___ + ___ + ___. Ejemplos: '___ para ___ sin ___' / 'El ___ que ___ en ___' / '___ tu ___ con ___'.\"",
    [
      "que hace",
      "para quien",
      "que beneficio",
      "Agendamientos online",
      "profesionales independientes",
      "planilla o WhatsApp",
      "sistema",
      "organiza tu agenda",
      "minutos",
      "Automatiza",
      "negocio",
      "inteligencia artificial"
    ],
    [
      "que hace",
      "para quien",
      "que beneficio",
      "Agendamientos online",
      "profesionales independientes",
      "planilla o WhatsApp",
      "sistema",
      "organiza tu agenda",
      "minutos",
      "Automatiza",
      "negocio",
      "inteligencia artificial",
      "sitio bonito",
      "haz clic aqui"
    ],
    "Los titulos fuertes dejan claro el valor desde el inicio y evitan frases bonitas que no explican nada."
  ),
  textStep(
    "El Subtitulo",
    "El subtitulo aparece debajo del titulo y expande la promesa principal. El titulo llama la atencion y el subtitulo muestra como funciona, por que creer y que hace diferente al producto."
  ),
  fillStep(
    "Completa los espacios - Escribe tu subtitulo!",
    "Construye la logica del subtitulo y completa el ejemplo de AgendaPro.",
    "\"Si el titulo dice ___, el subtitulo debe responder: ___, ___ o ___. Ejemplo: Titulo: 'Gestiona tu agenda sin ___' / Subtitulo: 'Agenda Pro permite que ___ registren clientes, creen ___ y acompanen ___, todo en una plataforma ___ y accesible desde cualquier ___.\"",
    [
      "lo que hace el producto",
      "como funciona",
      "por que creer",
      "que lo hace unico",
      "caos",
      "profesionales independientes",
      "agendamientos",
      "pagos",
      "simple",
      "dispositivo"
    ],
    [
      "lo que hace el producto",
      "como funciona",
      "por que creer",
      "que lo hace unico",
      "caos",
      "profesionales independientes",
      "agendamientos",
      "pagos",
      "simple",
      "dispositivo",
      "promesa vaga",
      "efecto visual"
    ],
    "Un buen subtitulo agrega detalle al titulo y ayuda al visitante a entender por que vale la pena seguir leyendo."
  ),
  textStep(
    "Escribiendo el CTA",
    "El CTA es el boton o enlace que pide una accion. CTAs genericos como 'Haz clic aqui' o 'Saber mas' suelen perder frente a CTAs especificos que explican que pasa despues del clic y reducen la duda."
  ),
  quizStep(
    "Que hace que un CTA convierta mejor?",
    "Que hace que un CTA sea significativamente mas eficaz que otro?",
    [
      "Usar colores mas llamativos en el boton para atraer la vista.",
      "Hacer el boton mas grande que todos los otros elementos.",
      "Especificar que ocurre despues del clic y reducir el riesgo percibido.",
      "Los CTAs con mas de 5 palabras siempre convierten mejor."
    ],
    2,
    "El CTA mas fuerte comunica con claridad el siguiente paso y reduce la incertidumbre sobre lo que el usuario va a obtener."
  ),
  textStep(
    "Seccion de Beneficios",
    "La seccion de beneficios es donde conviertes funcionalidades en valor real. El usuario no compra un sistema de agendamiento; compra menos estres, mas organizacion y mas tiempo libre."
  ),
  fillStep(
    "Completa los espacios - Convierte funcionalidades en beneficios!",
    "Convierte funcionalidades frias en beneficios claros para el usuario.",
    "\"Funcionalidad: 'Sistema de agendamiento online' -> Beneficio: '___' / Funcionalidad: 'Registro de clientes' -> Beneficio: '___' / Funcionalidad: 'Notificaciones automaticas' -> Beneficio: '___' / Funcionalidad: 'Reportes de ingresos' -> Beneficio: '___'.\"",
    [
      "Tus clientes reservan solos las 24 horas sin que tengas que responder mensajes",
      "Toda la informacion de tus clientes en un solo lugar, siempre accesible",
      "Se acabaron los clientes que olvidan el horario, los recordatorios automaticos pueden reducir ausencias hasta en 40%",
      "Sabe exactamente cuanto ganaste en el mes sin calcular nada"
    ],
    [
      "Tus clientes reservan solos las 24 horas sin que tengas que responder mensajes",
      "Toda la informacion de tus clientes en un solo lugar, siempre accesible",
      "Se acabaron los clientes que olvidan el horario, los recordatorios automaticos pueden reducir ausencias hasta en 40%",
      "Sabe exactamente cuanto ganaste en el mes sin calcular nada",
      "Pantalla moderna con buenos iconos",
      "Sistema con varias opciones"
    ],
    "Los beneficios fuertes muestran el impacto real de la funcionalidad en la vida y la rutina del usuario."
  ),
  textStep(
    "Escribiendo Microcopy",
    "El microcopy incluye pequenos textos como placeholders, mensajes de error, confirmaciones y labels. Aparecen en los puntos mas sensibles de la experiencia y tienen mucho impacto en la claridad y la confianza."
  ),
  fillStep(
    "Completa los espacios - Escribe microcopy de calidad!",
    "Mejora placeholders, errores y confirmaciones con un lenguaje mas claro.",
    "\"Placeholder debil: '___' -> Placeholder fuerte: '___' / Error debil: '___' -> Error fuerte: '___' / Confirmacion debil: '___' -> Confirmacion fuerte: '___'.\"",
    [
      "Nombre",
      "Como prefieres que te llamen?",
      "Campo invalido",
      "Por favor ingresa un telefono con prefijo, por ejemplo (11) 99999-9999",
      "Guardado",
      "Agendamiento confirmado! Tu cliente recibira una notificacion."
    ],
    [
      "Nombre",
      "Como prefieres que te llamen?",
      "Campo invalido",
      "Por favor ingresa un telefono con prefijo, por ejemplo (11) 99999-9999",
      "Guardado",
      "Agendamiento confirmado! Tu cliente recibira una notificacion.",
      "Error",
      "OK"
    ],
    "Un buen microcopy le dice al usuario que hacer, que paso y que viene despues."
  ),
  textStep(
    "Textos para Registro y Login",
    "Registro y login son momentos en que el usuario decide si confia o no en el producto. Los textos que refuerzan el beneficio y reducen el riesgo percibido mejoran mucho la conversion."
  ),
  fillStep(
    "Completa los espacios - Escribe para convertir!",
    "Construye una pantalla de registro enfocada en valor y confianza.",
    "\"En la pagina de registro, el titulo debe enfocarse en el ___ y no en la accion. En vez de ___ usa ___. Debajo del formulario agrega elementos de ___ como ___ y ___. El boton de envio debe decir ___ en vez de ___.\"",
    [
      "beneficio",
      "Crear cuenta",
      "Empieza a organizar tu agenda hoy",
      "confianza",
      "sin tarjeta de credito",
      "cancela cuando quieras",
      "Crear mi cuenta gratis",
      "Enviar"
    ],
    [
      "beneficio",
      "Crear cuenta",
      "Empieza a organizar tu agenda hoy",
      "confianza",
      "sin tarjeta de credito",
      "cancela cuando quieras",
      "Crear mi cuenta gratis",
      "Enviar",
      "registro",
      "boton azul"
    ],
    "Cuando el texto destaca la ganancia y reduce el riesgo, registrarse se siente como un siguiente paso natural."
  ),
  textStep(
    "Escribiendo para el Onboarding",
    "El onboarding es el recorrido entre el registro y el primer valor real que entrega el producto. Las primeras palabras deben guiar al usuario con claridad y llevarlo rapido a su primera victoria."
  ),
  fillStep(
    "Completa los espacios - Escribe el onboarding!",
    "Construye un mensaje de bienvenida y un primer estado vacio orientado a la accion.",
    "\"Mensaje de bienvenida: '___, ___! Tu agenda profesional esta lista. Empecemos con ___ paso simple: ___ tu primer cliente.' / Texto del primer paso vacio: 'Aun no tienes ___. ___ ahora y empieza a ___ tus agendamientos en menos de ___ minutos.'\"",
    [
      "Bienvenido",
      "[nombre del usuario]",
      "1",
      "registra",
      "ningun cliente registrado",
      "Agrega tu primer cliente",
      "organizar",
      "2"
    ],
    [
      "Bienvenido",
      "[nombre del usuario]",
      "1",
      "registra",
      "ningun cliente registrado",
      "Agrega tu primer cliente",
      "organizar",
      "2",
      "despues",
      "tal vez"
    ],
    "El mejor onboarding reduce la friccion inicial con una orientacion simple, amable y enfocada en una accion concreta."
  ),
  textStep(
    "Estados Vacios",
    "Los estados vacios son pantallas sin datos. En vez de parecer callejones sin salida, deben orientar al usuario sobre el siguiente paso y mostrar que gana si actua."
  ),
  fillStep(
    "Completa los espacios - Convierte estados vacios en oportunidades!",
    "Convierte una pantalla vacia en una invitacion clara a actuar.",
    "\"Estado vacio debil: '___' / Estado vacio fuerte: '___' / '___' / '___'.\"",
    [
      "Ningun agendamiento encontrado",
      "Tu agenda esta libre por ahora",
      "Agrega tu primer agendamiento y empieza a organizar tu dia",
      "+ Nuevo Agendamiento"
    ],
    [
      "Ningun agendamiento encontrado",
      "Tu agenda esta libre por ahora",
      "Agrega tu primer agendamiento y empieza a organizar tu dia",
      "+ Nuevo Agendamiento",
      "Pantalla vacia",
      "Sin datos"
    ],
    "Un estado vacio fuerte orienta, motiva y muestra cual es la siguiente accion mas importante."
  ),
  textStep(
    "E-mails Automaticos",
    "Cuando la app envia e-mails automaticos, el texto debe ser claro y util. Un buen correo confirma lo importante, reduce dudas y facilita la siguiente accion, como reprogramar o prepararse."
  ),
  fillStep(
    "Completa los espacios - Escribe e-mails automaticos!",
    "Construye un e-mail automatico de confirmacion de agendamiento.",
    "\"E-mail de confirmacion de agendamiento: Asunto: '___' / Apertura: '___' / Confirmacion: '___' / Siguiente paso: '___' / Cierre: '___'.\"",
    [
      "Tu agendamiento esta confirmado",
      "Hola, [nombre]! Todo listo con tu horario.",
      "Fecha: [fecha] a las [horario] con [profesional]",
      "Si necesitas reprogramar haz clic aqui",
      "Hasta entonces!"
    ],
    [
      "Tu agendamiento esta confirmado",
      "Hola, [nombre]! Todo listo con tu horario.",
      "Fecha: [fecha] a las [horario] con [profesional]",
      "Si necesitas reprogramar haz clic aqui",
      "Hasta entonces!",
      "Mensaje automatico",
      "Sin respuesta"
    ],
    "Los e-mails automaticos funcionan mejor cuando destacan lo esencial y dejan clara la siguiente accion."
  ),
  textStep(
    "Tono de Voz",
    "El tono de voz debe mantenerse consistente en todo el producto y alineado con el publico que va a usar la herramienta. Esa consistencia ayuda a que la app se sienta intencional, confiable y memorable."
  ),
  quizStep(
    "Consistencia del tono de voz",
    "Por que es estrategico mantener consistencia de tono de voz en toda la aplicacion?",
    [
      "Para facilitar la escritura siguiendo un unico patron.",
      "Porque los usuarios siempre se quejan cuando el tono cambia entre pantallas.",
      "Porque la consistencia crea una personalidad reconocible para el producto y fortalece el vinculo con el usuario.",
      "El tono de voz solo importa en productos de consumo."
    ],
    2,
    "Cuando el producto habla de forma coherente en todos los puntos de contacto, parece mas confiable, mas humano y mas alineado con el publico correcto."
  ),
  textStep(
    "Conclusion",
    "Escribir bien para sitios y apps en Lovable es lo que transforma un producto funcional en uno que convierte, retiene y encanta. Titulos claros, CTAs especificos, beneficios relevantes, microcopy util, onboarding enfocado, estados vacios accionables y e-mails bien escritos trabajan juntos para guiar al usuario en cada paso.\n\nLeccion concluida."
  ),
] as const;

export const LOVABLE_MODULE_5_STEPS_FR = [
  textStep(
    "Ecrire du Contenu pour Sites et Apps dans Lovable",
    "Bon retour. Dans cette lecon, vous allez apprendre a rediger le bon contenu pour chaque partie de votre site ou application creee dans Lovable, avec des textes qui convertissent, orientent, engagent et construisent la confiance des la premiere seconde."
  ),
  textStep(
    "Pourquoi le Contenu Compte Autant que le Design",
    "Beaucoup de personnes se concentrent sur le visuel et oublient que ce sont les mots qui aident l'utilisateur a comprendre, faire confiance et agir. Un beau design avec un contenu flou perd face a une experience simple avec un message clair. Les mots creent clarte, confiance et urgence."
  ),
  textStep(
    "Le Titre Principal",
    "Le titre principal n'a que quelques secondes pour communiquer la valeur. Il doit repondre rapidement a ce que vous proposez, pour qui c'est fait et quel est le benefice principal, sans jargon et sans faire trop reflechir le visiteur."
  ),
  fillStep(
    "Completez les blancs - Ecrivez votre titre !",
    "Construisez la formule d'un titre fort avec des exemples prets a l'emploi.",
    "\"Formule du titre puissant : ___ + ___ + ___. Exemples : '___ pour ___ sans ___' / 'Le ___ qui ___ en ___' / '___ votre ___ avec ___'.\"",
    [
      "ce que cela fait",
      "pour qui",
      "quel benefice",
      "Prise de rendez-vous en ligne",
      "professionnels independants",
      "tableur ou WhatsApp",
      "systeme",
      "organise votre agenda",
      "minutes",
      "Automatisez",
      "activite",
      "intelligence artificielle"
    ],
    [
      "ce que cela fait",
      "pour qui",
      "quel benefice",
      "Prise de rendez-vous en ligne",
      "professionnels independants",
      "tableur ou WhatsApp",
      "systeme",
      "organise votre agenda",
      "minutes",
      "Automatisez",
      "activite",
      "intelligence artificielle",
      "joli site",
      "cliquez ici"
    ],
    "Les titres forts rendent la valeur evidente des le debut et evitent les phrases jolies mais creuses."
  ),
  textStep(
    "Le Sous-titre",
    "Le sous-titre apparait juste sous le titre et developpe la promesse principale. Le titre attire l'attention, et le sous-titre montre comment cela fonctionne, pourquoi il faut y croire et ce qui rend le produit different."
  ),
  fillStep(
    "Completez les blancs - Ecrivez votre sous-titre !",
    "Construisez la logique du sous-titre et completez l'exemple AgendaPro.",
    "\"Si le titre dit ___, le sous-titre doit repondre : ___, ___ ou ___. Exemple : Titre : 'Gerez votre agenda sans ___' / Sous-titre : 'Agenda Pro permet aux ___ d'enregistrer des clients, de creer des ___ et de suivre les ___, le tout dans une plateforme ___ et accessible depuis n'importe quel ___.'\"",
    [
      "ce que le produit fait",
      "comment cela fonctionne",
      "pourquoi y croire",
      "ce qui le rend unique",
      "chaos",
      "professionnels independants",
      "rendez-vous",
      "paiements",
      "simple",
      "appareil"
    ],
    [
      "ce que le produit fait",
      "comment cela fonctionne",
      "pourquoi y croire",
      "ce qui le rend unique",
      "chaos",
      "professionnels independants",
      "rendez-vous",
      "paiements",
      "simple",
      "appareil",
      "promesse floue",
      "effet visuel"
    ],
    "Un bon sous-titre ajoute du detail au titre et aide le visiteur a comprendre pourquoi cela vaut la peine de continuer."
  ),
  textStep(
    "Ecrire le CTA",
    "Le CTA est le bouton ou le lien qui demande une action. Les CTA generiques comme 'Cliquez ici' ou 'En savoir plus' perdent souvent face a des CTA plus precis qui expliquent ce qui se passe apres le clic et reduisent l'hesitation."
  ),
  quizStep(
    "Qu'est-ce qui rend un CTA plus efficace ?",
    "Qu'est-ce qui rend un CTA significativement plus efficace qu'un autre ?",
    [
      "Utiliser des couleurs plus vives sur le bouton pour attirer le regard.",
      "Rendre le bouton plus grand que tous les autres elements de la page.",
      "Preciser ce qui se passe apres le clic et reduire le risque percu.",
      "Les CTA de plus de 5 mots convertissent toujours mieux."
    ],
    2,
    "Le CTA le plus fort communique clairement l'etape suivante et reduit l'incertitude sur ce que l'utilisateur va obtenir."
  ),
  textStep(
    "Section des Benefices",
    "La section des benefices est l'endroit ou vous transformez les fonctionnalites en valeur reelle. L'utilisateur n'achete pas un systeme de rendez-vous ; il achete moins de stress, plus d'organisation et plus de temps libre."
  ),
  fillStep(
    "Completez les blancs - Transformez les fonctionnalites en benefices !",
    "Transformez des fonctionnalites froides en benefices clairs pour l'utilisateur.",
    "\"Fonctionnalite : 'Systeme de prise de rendez-vous en ligne' -> Benefice : '___' / Fonctionnalite : 'Base clients' -> Benefice : '___' / Fonctionnalite : 'Notifications automatiques' -> Benefice : '___' / Fonctionnalite : 'Rapports de revenus' -> Benefice : '___'.\"",
    [
      "Vos clients reservent seuls 24h sur 24 sans que vous ayez a repondre aux messages",
      "Toutes les informations de vos clients au meme endroit, toujours accessibles",
      "Fini les clients qui oublient leur horaire, les rappels automatiques peuvent reduire les absences jusqu'a 40%",
      "Sachez exactement combien vous avez gagne dans le mois sans rien calculer"
    ],
    [
      "Vos clients reservent seuls 24h sur 24 sans que vous ayez a repondre aux messages",
      "Toutes les informations de vos clients au meme endroit, toujours accessibles",
      "Fini les clients qui oublient leur horaire, les rappels automatiques peuvent reduire les absences jusqu'a 40%",
      "Sachez exactement combien vous avez gagne dans le mois sans rien calculer",
      "Ecran moderne avec de bonnes icones",
      "Systeme avec plusieurs options"
    ],
    "Les benefices forts montrent l'impact reel de la fonctionnalite sur la vie et la routine de l'utilisateur."
  ),
  textStep(
    "Ecrire le Microcopy",
    "Le microcopy comprend de petits textes comme les placeholders, messages d'erreur, confirmations et labels. Ils apparaissent dans les moments les plus sensibles de l'experience et influencent fortement la clarte et la confiance."
  ),
  fillStep(
    "Completez les blancs - Ecrivez un microcopy de qualite !",
    "Ameliorez placeholders, erreurs et confirmations avec un langage plus clair.",
    "\"Placeholder faible : '___' -> Placeholder fort : '___' / Erreur faible : '___' -> Erreur forte : '___' / Confirmation faible : '___' -> Confirmation forte : '___'.\"",
    [
      "Nom",
      "Comment preferez-vous etre appele ?",
      "Champ invalide",
      "Veuillez saisir un telephone avec indicatif, par exemple (11) 99999-9999",
      "Enregistre",
      "Rendez-vous confirme ! Votre client recevra une notification."
    ],
    [
      "Nom",
      "Comment preferez-vous etre appele ?",
      "Champ invalide",
      "Veuillez saisir un telephone avec indicatif, par exemple (11) 99999-9999",
      "Enregistre",
      "Rendez-vous confirme ! Votre client recevra une notification.",
      "Erreur",
      "OK"
    ],
    "Un bon microcopy dit a l'utilisateur quoi faire, ce qui s'est passe et ce qui vient ensuite."
  ),
  textStep(
    "Textes pour Inscription et Connexion",
    "L'inscription et la connexion sont des moments ou l'utilisateur decide s'il fait confiance au produit. Des textes qui renforcent le benefice et reduisent le risque percu ont un grand impact sur la conversion."
  ),
  fillStep(
    "Completez les blancs - Ecrivez pour convertir !",
    "Construisez un ecran d'inscription centre sur la valeur et la confiance.",
    "\"Sur la page d'inscription, le titre doit mettre l'accent sur le ___ et non sur l'action. Au lieu de ___ utilisez ___. Sous le formulaire, ajoutez des elements de ___ comme ___ et ___. Le bouton d'envoi doit dire ___ au lieu de ___.\"",
    [
      "benefice",
      "Creer un compte",
      "Commencez a organiser votre agenda aujourd'hui",
      "confiance",
      "sans carte bancaire",
      "resiliez quand vous voulez",
      "Creer mon compte gratuit",
      "Envoyer"
    ],
    [
      "benefice",
      "Creer un compte",
      "Commencez a organiser votre agenda aujourd'hui",
      "confiance",
      "sans carte bancaire",
      "resiliez quand vous voulez",
      "Creer mon compte gratuit",
      "Envoyer",
      "inscription",
      "bouton bleu"
    ],
    "Quand le texte met en avant le gain et reduit le risque, l'inscription semble etre une suite logique plutot qu'un engagement lourd."
  ),
  textStep(
    "Ecrire pour l'Onboarding",
    "L'onboarding est le parcours entre l'inscription et la premiere vraie valeur livree par le produit. Les premiers mots doivent guider clairement l'utilisateur et l'amener vite a sa premiere victoire."
  ),
  fillStep(
    "Completez les blancs - Ecrivez l'onboarding !",
    "Construisez un message de bienvenue et un premier etat vide oriente action.",
    "\"Message de bienvenue : '___, ___ ! Votre agenda professionnel est pret. Commencons par ___ etape simple : ___ votre premier client.' / Texte du premier etat vide : 'Vous n'avez encore ___. ___ maintenant et commencez a ___ vos rendez-vous en moins de ___ minutes.'\"",
    [
      "Bienvenue",
      "[nom de l'utilisateur]",
      "1",
      "enregistrer",
      "aucun client enregistre",
      "Ajoutez votre premier client",
      "organiser",
      "2"
    ],
    [
      "Bienvenue",
      "[nom de l'utilisateur]",
      "1",
      "enregistrer",
      "aucun client enregistre",
      "Ajoutez votre premier client",
      "organiser",
      "2",
      "plus tard",
      "peut-etre"
    ],
    "Le meilleur onboarding reduit la friction initiale avec une orientation simple, chaleureuse et concentree sur une premiere action concrete."
  ),
  textStep(
    "Etats Vides",
    "Les etats vides sont des ecrans sans donnees. Au lieu de ressembler a des impasses, ils doivent guider l'utilisateur vers l'etape suivante et montrer ce qu'il gagne en agissant."
  ),
  fillStep(
    "Completez les blancs - Transformez les etats vides en opportunites !",
    "Transformez un ecran vide en invitation claire a agir.",
    "\"Etat vide faible : '___' / Etat vide fort : '___' / '___' / '___'.\"",
    [
      "Aucun rendez-vous trouve",
      "Votre agenda est libre pour le moment",
      "Ajoutez votre premier rendez-vous et commencez a organiser votre journee",
      "+ Nouveau rendez-vous"
    ],
    [
      "Aucun rendez-vous trouve",
      "Votre agenda est libre pour le moment",
      "Ajoutez votre premier rendez-vous et commencez a organiser votre journee",
      "+ Nouveau rendez-vous",
      "Ecran vide",
      "Pas de donnees"
    ],
    "Un etat vide fort guide, motive et montre quelle est l'action suivante la plus importante."
  ),
  textStep(
    "Emails Automatiques",
    "Quand l'application envoie des emails automatiques, le texte doit etre clair et utile. Un bon email confirme l'essentiel, reduit les doutes et facilite l'action suivante, comme reprogrammer ou se preparer."
  ),
  fillStep(
    "Completez les blancs - Ecrivez des emails automatiques !",
    "Construisez un email automatique de confirmation de rendez-vous.",
    "\"Email de confirmation de rendez-vous : Objet : '___' / Ouverture : '___' / Confirmation : '___' / Etape suivante : '___' / Cloture : '___'.\"",
    [
      "Votre rendez-vous est confirme",
      "Bonjour, [nom] ! Tout est en ordre pour votre horaire.",
      "Date : [date] a [horaire] avec [professionnel]",
      "Si vous devez reprogrammer cliquez ici",
      "A bientot !"
    ],
    [
      "Votre rendez-vous est confirme",
      "Bonjour, [nom] ! Tout est en ordre pour votre horaire.",
      "Date : [date] a [horaire] avec [professionnel]",
      "Si vous devez reprogrammer cliquez ici",
      "A bientot !",
      "Message automatique",
      "Sans reponse"
    ],
    "Les emails automatiques fonctionnent mieux lorsqu'ils mettent en avant l'essentiel et rendent l'etape suivante evidente."
  ),
  textStep(
    "Ton de Voix",
    "Le ton de voix doit rester coherent dans tout le produit et etre aligne avec le public qui utilisera l'outil. Cette coherence aide l'application a sembler intentionnelle, fiable et memorisable."
  ),
  quizStep(
    "Coherence du ton de voix",
    "Pourquoi est-il strategique de garder un ton de voix coherent dans toute l'application ?",
    [
      "Pour faciliter l'ecriture en suivant un seul modele.",
      "Parce que les utilisateurs se plaignent toujours quand le ton change entre les ecrans.",
      "Parce que la coherence cree une personnalite reconnaissable pour le produit et renforce le lien avec l'utilisateur.",
      "Le ton de voix n'a d'importance que dans les produits grand public."
    ],
    2,
    "Quand le produit parle de maniere coherente a chaque point de contact, il parait plus fiable, plus humain et mieux aligne avec le bon public."
  ),
  textStep(
    "Conclusion",
    "Bien ecrire pour les sites et applications dans Lovable, c'est ce qui transforme un produit fonctionnel en produit qui convertit, retient et enchante. Titres clairs, CTA precis, benefices pertinents, microcopy utile, onboarding cible, etats vides actionnables et emails bien rediges travaillent ensemble pour guider l'utilisateur a chaque etape.\n\nLecon terminee."
  ),
] as const;
