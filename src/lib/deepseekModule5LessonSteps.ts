import { textStep, quizStep, fillStep } from "./deepseekModule1LessonSteps";

export const DEEPSEEK_MODULE_5_STEPS_PT = [
  textStep(
    "Os Erros Mais Comuns ao Usar o DeepSeek",
    "Bem-vindo de volta! Nesta lição, você vai aprender a identificar e evitar os erros mais comuns que fazem usuários do DeepSeek obterem resultados medíocres — mesmo com uma ferramenta poderosa nas mãos. Conhecer os erros é o primeiro passo para superá-los."
  ),
  textStep(
    "Por que Conhecer os Erros é Tão Importante",
    "Muitos usuários culpam a ferramenta quando os resultados são ruins. Na maioria das vezes, o problema não está no DeepSeek — está na forma como ele está sendo usado. Identificar os erros mais comuns transforma um usuário mediano em um usuário estratégico."
  ),
  quizStep(
    "Importância do Estudo de Erros",
    "Por que estudar os erros comuns melhora o uso do DeepSeek?",
    [
      "Porque a maioria dos resultados ruins não vem da limitação da ferramenta — mas de prompts mal construídos, expectativas erradas e usos inadequados que podem ser corrigidos",
      "Porque o DeepSeek comete erros aleatórios que precisam ser memorizados",
      "Para saber quando abandonar o DeepSeek e usar outra ferramenta",
      "Erros do DeepSeek são imprevisíveis e não podem ser evitados"
    ],
    0,
    "Entender as falhas comuns de uso permite que você ajuste sua abordagem e extraia o máximo da IA."
  ),
  textStep(
    "Erro 1 — Prompts Vagos e Sem Contexto",
    "O erro mais comum e mais impactante. Usuários fazem perguntas genéricas e ficam frustrados com respostas genéricas — sem perceber que a vagueza do prompt é a causa direta do resultado ruim."
  ),
  fillStep(
    "Identifique o prompt problemático!",
    "Preencha a lacuna para transformar um prompt vago em um prompt poderoso.",
    'Prompt com erro: "Me ajude com meu negócio." Prompt correto: "Sou dono de uma [______] com [______] funcionários e faturamento de [______] por mês. Meu maior desafio atual é [______]. Me ajude a criar um plano de ação com [______] etapas concretas para resolver esse problema nos próximos [______] dias."',
    ["loja de roupas femininas", "3", "R$25k", "converter mais visitantes em compradores", "5", "30"],
    ["loja de roupas femininas", "3", "R$25k", "converter mais visitantes em compradores", "5", "30", "empresa", "vendas", "meses"],
    "Contexto é a matéria-prima que a IA usa para ser precisa."
  ),
  quizStep(
    "Impacto da Vagueza",
    "Por que um prompt vago gera uma resposta insatisfatória no DeepSeek?",
    [
      "Porque o DeepSeek penaliza perguntas curtas com respostas ruins",
      "Porque sem contexto o modelo preenche as lacunas com suposições genéricas — entregando uma resposta que pode ser válida para qualquer situação mas não serve especificamente para você",
      "Para forçar o usuário a pagar por uma versão mais avançada",
      "Prompts curtos funcionam tão bem quanto prompts detalhados no DeepSeek"
    ],
    1,
    "A IA não adivinha o que você quer; ela processa o que você fornece."
  ),
  textStep(
    "Erro 2 — Aceitar o Primeiro Resultado sem Refinar",
    "O segundo erro mais comum é tratar a primeira resposta como a resposta final. O DeepSeek foi construído para iteração — cada refinamento melhora significativamente a qualidade do resultado."
  ),
  fillStep(
    "Refine em vez de aceitar!",
    "Preencha a lacuna para pedir um refinamento estratégico.",
    '"A resposta anterior está no caminho certo, mas preciso de ajustes: [______] a segunda parte com mais [______], mude o tom para mais [______], adicione [______] práticos e elimine os trechos que estão [______] demais para o meu contexto."',
    ["aprofundando", "dados e evidências", "direto e assertivo", "exemplos", "genéricos"],
    ["aprofundando", "dados e evidências", "direto e assertivo", "exemplos", "genéricos", "resumindo", "longos", "vagos"],
    "A iteração transforma um rascunho em uma obra-prima."
  ),
  quizStep(
    "Mentalidade de Refinamento",
    "Qual é a mentalidade correta ao receber a primeira resposta do DeepSeek?",
    [
      "Aceitar como está — o DeepSeek sempre acerta na primeira tentativa",
      "Descartar completamente e começar uma nova conversa do zero",
      "Tratar como um rascunho inteligente — identificar o que está bom, o que precisa melhorar e pedir refinamentos específicos até chegar no resultado ideal",
      "Pedir ao DeepSeek para refazer completamente sem direcionamento"
    ],
    2,
    "A colaboração com a IA é um processo de diálogo contínuo."
  ),
  textStep(
    "Erro 3 — Compartilhar Dados Sensíveis e Confidenciais",
    "Um erro crítico que muitos cometem sem perceber. Por ser um modelo de origem chinesa, o DeepSeek está sujeito às leis de dados da China — o que torna o compartilhamento de informações sensíveis um risco real."
  ),
  fillStep(
    "Identifique o que NÃO compartilhar!",
    "Preencha a lacuna para garantir a segurança dos seus dados.",
    '"Antes de usar o DeepSeek para qualquer tarefa, verifique se o conteúdo contém: [______] de clientes, [______] financeiras confidenciais, [______] intelectual estratégica ou [______] comerciais. Se sim, [______] ou [______] antes de compartilhar."',
    ["dados pessoais", "informações", "propriedade", "segredos", "anonimize os dados", "use outro assistente"],
    ["dados pessoais", "informações", "propriedade", "segredos", "anonimize os dados", "use outro assistente", "nomes", "valores"],
    "Privacidade e segurança devem vir antes da produtividade."
  ),
  quizStep(
    "Prática Segura de Dados",
    "Qual é a prática mais segura ao usar o DeepSeek com dados corporativos?",
    [
      "Compartilhar tudo — as políticas de privacidade protegem qualquer dado",
      "Usar apenas para perguntas pessoais e nunca para trabalho",
      "Anonimizar ou generalizar informações sensíveis antes de compartilhar — substituindo dados identificáveis por versões genéricas que preservam o contexto",
      "Dados corporativos nunca podem ser usados em nenhum assistente de IA"
    ],
    2,
    "Sempre presuma que o que você digita pode ser usado para treinamento ou ser acessível conforme as leis locais do provedor."
  ),
  textStep(
    "Erro 4 — Usar o Modelo Errado para a Tarefa",
    "O DeepSeek tem versões diferentes para diferentes tipos de tarefa. Usar o modelo genérico para uma tarefa que exige raciocínio profundo — ou o contrário — resulta em respostas abaixo do potencial."
  ),
  fillStep(
    "Escolha o modelo certo!",
    "Preencha a lacuna para associar a tarefa ao modelo ideal.",
    '"Para [______] e problemas que exigem raciocínio lógico profundo, use o [______]. Para tarefas de [______] e uso geral do dia a dia, use o [______]. Para [______] e desenvolvimento de software, use o [______]."',
    ["análises complexas", "DeepSeek R1", "escrita, resumo e brainstorming", "DeepSeek V3", "programação", "DeepSeek Coder"],
    ["análises complexas", "DeepSeek R1", "escrita, resumo e brainstorming", "DeepSeek V3", "programação", "DeepSeek Coder", "chat", "imagens"],
    "Cada modelo é uma ferramenta especializada para um fim diferente."
  ),
  quizStep(
    "Modelo V3 vs R1",
    "O que acontece quando você usa o DeepSeek V3 para uma tarefa que exige raciocínio matemático profundo?",
    [
      "O V3 é melhor que o R1 para qualquer tipo de tarefa",
      "A resposta pode ser superficial ou imprecisa — o R1 foi treinado especificamente para raciocínio estruturado e entrega resultados muito superiores nesse tipo de tarefa",
      "O resultado é idêntico independentemente do modelo escolhido",
      "O DeepSeek V3 não aceita perguntas matemáticas"
    ],
    1,
    "O R1 ativa o modo de pensamento (Chain of Thought) que é vital para lógica e matemática."
  ),
  textStep(
    "Erro 5 — Não Verificar as Informações Geradas",
    "O DeepSeek pode gerar informações incorretas com aparência de precisão — especialmente em dados factuais, datas, estatísticas e citações. Aceitar tudo sem verificação é um erro perigoso."
  ),
  fillStep(
    "Adote a verificação como hábito!",
    "Preencha a lacuna para estruturar um processo de revisão.",
    '"Sempre que o DeepSeek apresentar [______], [______] ou [______] específicas, trate como um [______] e verifique nas [______] originais antes de usar em [______], [______] ou qualquer documento importante."',
    ["dados numéricos", "datas", "citações", "ponto de partida", "fontes", "apresentações", "relatórios"],
    ["dados numéricos", "datas", "citações", "ponto de partida", "fontes", "apresentações", "relatórios", "site", "blog"],
    "Confie mas verifique. A IA é um copiloto, não o comandante final."
  ),
  quizStep(
    "Comportamento Seguro com Dados",
    "Qual é o comportamento mais seguro ao receber dados e estatísticas do DeepSeek?",
    [
      "Aceitar como verdade — o DeepSeek tem acesso a dados em tempo real",
      "Tratar os dados como referência inicial, verificar nas fontes primárias e pedir que o modelo indique a origem da informação",
      "Nunca usar o DeepSeek para tarefas que envolvam dados",
      "Dados do DeepSeek são sempre precisos desde que o prompt seja bem feito"
    ],
    1,
    "Alucinações (fatos inventados) ainda são comuns em todos os modelos de linguagem."
  ),
  textStep(
    "Erro 6 — Conversas Sem Contexto Acumulado",
    "Muitos usuários começam uma nova conversa para cada pergunta relacionada ao mesmo tema — perdendo o contexto acumulado que tornaria as respostas cada vez mais precisas."
  ),
  fillStep(
    "Mantenha o contexto na conversa!",
    "Preencha a lacuna para dar continuidade a um projeto.",
    '"Continuando nossa conversa sobre [______]: com base em tudo que já [______] até aqui, especialmente [______], agora preciso aprofundar o ponto sobre [______]. Considere tudo que já foi [______] antes de responder."',
    ["estratégia de lançamento", "discutimos", "as decisões anteriores", "o canal de aquisição", "definido"],
    ["estratégia de lançamento", "discutimos", "as decisões anteriores", "o canal de aquisição", "definido", "novo", "ideia", "tema"],
    "O histórico da conversa é a 'personalidade' e o 'conhecimento' que você constrói com a IA."
  ),
  quizStep(
    "Vantagem do Contexto",
    "Por que manter a conversa no mesmo fio é mais eficaz do que começar novas conversas?",
    [
      "Porque o DeepSeek cobra menos por conversas longas",
      "Porque o contexto acumulado permite respostas cada vez mais precisas e personalizadas sem precisar repetir informações",
      "Para economizar tempo ao não precisar digitar novos prompts",
      "Conversas longas sobrecarregam o DeepSeek e pioram as respostas"
    ],
    1,
    "Quanto mais o modelo 'sabe' sobre o projeto atual, melhor ele consegue ajudar."
  ),
  textStep(
    "Erro 7 — Pedir Tudo de Uma Vez em um Único Prompt",
    "Colocar múltiplas tarefas complexas em um único prompt gigante resulta em respostas superficiais. A IA tenta cobrir tudo rápido sem a profundidade necessária."
  ),
  fillStep(
    "Divida para conquistar!",
    "Preencha a lacuna para estruturar um trabalho em etapas.",
    '"Vamos trabalhar em [______] etapas separadas. Começando pela mais [______]: crie uma [______] detalhada para meu negócio de [______] considerando que meu orçamento é [______] e meu público é [______]."',
    ["4", "urgente e estratégica", "análise de concorrência", "consultoria", "limitado", "profissionais em transição"],
    ["4", "urgente e estratégica", "análise de concorrência", "consultoria", "limitado", "profissionais em transição", "2", "grande", "jovens"],
    "Passo a passo gera qualidade. Tudo de uma vez gera mediocridade."
  ),
  quizStep(
    "Impacto de Tarefas Múltiplas",
    "O que acontece quando você coloca muitas tarefas complexas em um único prompt?",
    [
      "O DeepSeek entrega resultados melhores quando tem mais trabalho para fazer",
      "Prompts longos com múltiplas tarefas são sempre mais eficientes",
      "O modelo divide sua atenção entre todas as tarefas e entrega cada uma de forma superficial — perdendo profundidade",
      "Não faz diferença dividir ou concentrar as tarefas"
    ],
    2,
    "Foque em uma entrega de qualidade por vez para obter o melhor de cada componente do seu projeto."
  ),
  textStep(
    "Erro 8 — Ignorar o Raciocínio Visível do R1",
    "O raciocínio passo a passo (Chain of Thought) do R1 revela como o modelo chegou à conclusão. Ignorar isso é perder a chance de validar a lógica por trás da resposta."
  ),
  fillStep(
    "Use o raciocínio a seu favor!",
    "Preencha a lacuna para pedir transparência lógica.",
    '"Antes de apresentar a conclusão, [______] todo o seu raciocínio [______]. Quero ver as [______] consideradas, as [______] descartadas e o motivo de cada [______] tomada."',
    ["mostre", "passo a passo", "variáveis", "hipóteses", "decisão"],
    ["mostre", "passo a passo", "variáveis", "hipóteses", "decisão", "oculte", "final", "erro"],
    "O 'como' a IA pensa é muitas vezes mais valioso do que o 'o que' ela responde."
  ),
  quizStep(
    "Valor do Raciocínio Visível",
    "Por que ignorar o raciocínio visível do DeepSeek R1 é um desperdício?",
    [
      "Porque o raciocínio revela as premissas e decisões do modelo — permitindo identificar onde questionar e ajustar conforme o seu contexto",
      "O raciocínio visível é apenas um recurso técnico sem valor prático",
      "Porque o raciocínio torna a resposta mais longa sem adicionar informação",
      "O raciocínio visível só é útil para programadores"
    ],
    0,
    "Ver a lógica permite que você atue como um supervisor crítico em vez de um seguidor cego."
  ),
  textStep(
    "Erro 9 — Usar o DeepSeek como Oráculo de Decisões Finais",
    "O DeepSeek mapeia opções e riscos, mas a decisão deve ser sempre sua. Delegar decisões críticas inteiramente à IA sem filtro humano é perigoso."
  ),
  fillStep(
    "Use como apoio, não como árbitro!",
    "Preencha a lacuna para manter o controle da decisão.",
    '"Preciso tomar uma decisão sobre [______]. Use o DeepSeek para [______] os dados, [______] os prós e contras e [______] os fatores relevantes. A [______] final será minha."',
    ["expandir meu negócio", "analisar", "mapear", "destacar", "decisão"],
    ["expandir meu negócio", "analisar", "mapear", "destacar", "decisão", "ignorar", "votar", "final"],
    "A IA sugere caminhos; você escolhe o destino."
  ),
  quizStep(
    "Papel Decisório",
    "Qual é o papel correto do DeepSeek no processo de tomada de decisão?",
    [
      "Tomar a decisão final com base nos dados disponíveis",
      "Organizar informações, identificar variáveis e apresentar perspectivas que enriquecem o julgamento humano — sem substituí-lo",
      "Confirmar a decisão que você já quer tomar",
      "O DeepSeek não deve ser usado para nenhum tipo de decisão profissional"
    ],
    1,
    "Use a IA para expandir sua visão, não para fechar seus olhos."
  ),
  textStep(
    "Erro 10 — Não Testar o Mesmo Prompt em Modelos Diferentes",
    "Modelos diferentes (Claude, Gemini, GPT) têm 'personalidades' e forças diferentes. Ficar preso a um só é limitar sua visão."
  ),
  fillStep(
    "Compare e escolha o melhor!",
    "Preencha a lacuna para diversificar suas ferramentas.",
    '"Para tarefas de [______] e lógica, teste no [______]. Para [______] com integração ao Google, teste no [______]. Para [______] profunda e análise de documentos longos, teste no [______]. use o [______] mais útil para a tarefa."',
    ["matemática", "DeepSeek R1", "pesquisas", "Gemini", "escrita", "Claude", "modelo"],
    ["matemática", "DeepSeek R1", "pesquisas", "Gemini", "escrita", "Claude", "modelo", "GPT", "bot"],
    "O melhor prompt engineer é aquele que sabe qual IA chamar para cada desafio."
  ),
  quizStep(
    "Prática de Comparação",
    "Por que testar o mesmo prompt em diferentes assistentes de IA é uma boa prática?",
    [
      "Porque cada modelo tem pontos fortes diferentes — e comparar revela qual ferramenta performa melhor para aquela tarefa específica",
      "Para aumentar o custo e o tempo gasto em cada tarefa",
      "Porque nenhum assistente é confiável sozinho",
      "Todos os assistentes de IA geram resultados idênticos para o mesmo prompt"
    ],
    0,
    "A diversidade de 'opiniões' das IAs ajuda a criar um resultado final muito mais robusto."
  ),
  textStep(
    "Sumário dos Erros",
    "Superar esses 10 erros é o que separa o amador do profissional na era da IA generativa."
  ),
  fillStep(
    "Consolide o aprendizado!",
    "Preencha a lacuna com o resumo das boas práticas.",
    '"Os erros comuns são: prompts [______], aceitar o [______] resultado, compartilhar dados [______], usar o modelo [______], não [______] os fatos, começar [______] conversas sem contexto, pedir tudo de [______] vez, ignorar o [______], usar como [______] de decisões e não [______] modelos."',
    ["vagos", "primeiro", "sensíveis", "errado", "verificar", "novas", "uma", "raciocínio", "árbitro", "testar"],
    ["vagos", "primeiro", "sensíveis", "errado", "verificar", "novas", "uma", "raciocínio", "árbitro", "testar", "curtos", "finais"],
    "Dominar o que não fazer é tão importante quanto saber o que fazer."
  ),
  textStep(
    "Conclusão",
    "O DeepSeek é poderoso, mas o poder só se manifesta quando você sabe exatamente como não desperdiçá-lo. Prompts com contexto, refinamento iterativo, proteção de dados e escolha do modelo certo são a chave.\n\nEvite os erros. Domine a ferramenta. Colha os resultados.\n\nLição concluída ✓"
  ),
];

export const DEEPSEEK_MODULE_5_STEPS_EN = [
  textStep(
    "Common Mistakes When Using DeepSeek",
    "Welcome back! In this lesson, you will learn to identify and avoid the most common mistakes that cause DeepSeek users to get mediocre results — even with a powerful tool in their hands. Knowing the mistakes is the first step to overcoming them."
  ),
  textStep(
    "Why Knowing Mistakes Is Critical",
    "Many users blame the tool when results are poor. Most of the time, the problem isn't DeepSeek — it's how it's being used. Identifying common mistakes turns an average user into a strategic one."
  ),
  quizStep(
    "Studying Mistakes",
    "Why does studying common mistakes improve DeepSeek usage?",
    [
      "Because most poor results come from poorly constructed prompts, wrong expectations, and misuse that can be corrected",
      "Because DeepSeek makes random mistakes that need to be memorized",
      "To know when to abandon DeepSeek and use another tool",
      "DeepSeek's mistakes are unpredictable and cannot be avoided"
    ],
    0,
    "Understanding usage failures allows you to adjust your approach and get the most out of AI."
  ),
  textStep(
    "Mistake 1 — Vague Prompts and No Context",
    "The most common and impactful mistake. Users ask generic questions and get frustrated with generic answers — without realizing that prompt vagueness is the direct cause of the poor result."
  ),
  fillStep(
    "Identify the problematic prompt!",
    "Fill in the gap to turn a vague prompt into a powerful one.",
    'Error prompt: "Help me with my business." Correct prompt: "I own a [______] with [______] employees and monthly revenue of [______]. My biggest current challenge is [______]. Help me create an action plan with [______] concrete steps to solve this in the next [______] days."',
    ["women's clothing store", "3", "$25k", "converting visitors into buyers", "5", "30"],
    ["women's clothing store", "3", "$25k", "converting visitors into buyers", "5", "30", "company", "sales", "months"],
    "Context is the raw material AI uses to be precise."
  ),
  quizStep(
    "Impact of Vagueness",
    "Why does a vague prompt generate an unsatisfactory response in DeepSeek?",
    [
      "Because DeepSeek penalizes short questions with poor answers",
      "Because without context the model fills gaps with generic assumptions — delivering an answer that might be valid for any situation but doesn't serve you specifically",
      "To force users to pay for an advanced version",
      "Short prompts work as well as detailed prompts in DeepSeek"
    ],
    1,
    "AI doesn't guess what you want; it processes what you provide."
  ),
  textStep(
    "Mistake 2 — Accepting the First Result Without Refining",
    "The second most common mistake is treating the first response as final. DeepSeek was built for iteration — each refinement significantly improves the quality of the result."
  ),
  fillStep(
    "Refine instead of accepting!",
    "Fill in the gap to request a strategic refinement.",
    '"The previous response is on the right track, but I need adjustments: [______] the second part with more [______], change the tone to more [______], add practical [______], and eliminate the [______] parts for my context."',
    ["elaborate on", "data and evidence", "direct and assertive", "examples", "generic"],
    ["elaborate on", "data and evidence", "direct and assertive", "examples", "generic", "summarize", "long", "vague"],
    "Iteration turns a draft into a masterpiece."
  ),
  quizStep(
    "Refining Mindset",
    "What is the correct mindset when receiving the first response from DeepSeek?",
    [
      "Accept it as is — DeepSeek always gets it right the first time",
      "Discard completely and start a new conversation from scratch",
      "Treat it as a smart draft — identify what's good, what needs improvement, and request specific refinements until you reach the ideal result",
      "Ask DeepSeek to completely redo it without direction"
    ],
    2,
    "Collaboration with AI is a continuous dialogue process."
  ),
  textStep(
    "Mistake 3 — Sharing Sensitive and Confidential Data",
    "A critical mistake many make without realizing it. Being a Chinese model, DeepSeek is subject to China's data laws — making sensitive data sharing a real risk."
  ),
  fillStep(
    "Identify what NOT to share!",
    "Fill in the gap to ensure your data security.",
    '"Before using DeepSeek for any task, check if the content contains: [______] of clients, confidential [______], strategic [______] property, or commercial [______]. If so, [______] or [______] before sharing."',
    ["personal data", "financial information", "intellectual", "secrets", "anonymize the data", "use another assistant"],
    ["personal data", "financial information", "intellectual", "secrets", "anonymize the data", "use another assistant", "names", "values"],
    "Privacy and security must come before productivity."
  ),
  quizStep(
    "Safe Data Practice",
    "What is the safest practice when using DeepSeek with corporate data?",
    [
      "Share everything — privacy policies protect any data",
      "Use only for personal questions and never for work",
      "Anonymize or generalize sensitive information before sharing — replacing identifiers with generic versions that preserve context",
      "Corporate data can never be used in any AI assistant"
    ],
    2,
    "Always assume that what you type may be used for training or accessible under provider laws."
  ),
  textStep(
    "Mistake 4 — Using the Wrong Model for the Task",
    "DeepSeek has different versions for different tasks. Using the generic model for deep reasoning — or vice versa — results in sub-par answers."
  ),
  fillStep(
    "Choose the right model!",
    "Fill in the gap to associate the task with the ideal model.",
    '"For [______] and problems requiring deep logic, use [______]. For [______] and everyday general use, use [______]. For [______] and software development, use [______]."',
    ["complex analysis", "DeepSeek R1", "writing and brainstorming", "DeepSeek V3", "programming", "DeepSeek Coder"],
    ["complex analysis", "DeepSeek R1", "writing and brainstorming", "DeepSeek V3", "programming", "DeepSeek Coder", "chat", "images"],
    "Each model is a specialized tool for a different purpose."
  ),
  quizStep(
    "Model V3 vs R1",
    "What happens when you use DeepSeek V3 for a task requiring deep mathematical reasoning?",
    [
      "V3 is better than R1 for any type of task",
      "The response may be superficial or imprecise — R1 was specifically trained for structured reasoning and delivers superior results for this",
      "The result is identical regardless of the chosen model",
      "DeepSeek V3 does not accept math questions"
    ],
    1,
    "R1 activates thinking mode (Chain of Thought), which is vital for logic and math."
  ),
  textStep(
    "Mistake 5 — Not Verifying Generated Information",
    "DeepSeek can generate incorrect information with an appearance of accuracy — especially in facts, dates, stats, and citations. Accepting without verification is a dangerous mistake."
  ),
  fillStep(
    "Make verification a habit!",
    "Fill in the gap to structure a review process.",
    '"Whenever DeepSeek presents specific [______], [______], or [______], treat it as a [______] and check [______] before using in [______], [______], or any important document."',
    ["numerical data", "dates", "citations", "starting point", "original sources", "presentations", "reports"],
    ["numerical data", "dates", "citations", "starting point", "original sources", "presentations", "reports", "site", "blog"],
    "Trust but verify. AI is a co-pilot, not the final commander."
  ),
  quizStep(
    "Safe Data Behavior",
    "What is the safest behavior when receiving data and stats from DeepSeek?",
    [
      "Accept as truth — DeepSeek has real-time data access",
      "Treat data as an initial reference, verify primary sources, and ask the model to indicate the source of information",
      "Never use DeepSeek for data-heavy tasks",
      "DeepSeek's data is always accurate if the prompt is well-made"
    ],
    1,
    "Hallucinations (invented facts) are still common across all language models."
  ),
  textStep(
    "Mistake 6 — Conversations Without Accumulated Context",
    "Many users start a new conversation for every question related to the same topic — losing accumulated context that makes responses more accurate."
  ),
  fillStep(
    "Keep context in the conversation!",
    "Fill in the gap to continue a project.",
    '"Continuing our conversation about the [______]: based on what we already [______], especially [______], now I need to dive into [______]. Consider everything [______] before responding."',
    ["launch strategy", "discussed", "previous decisions", "acquisition channels", "defined"],
    ["launch strategy", "discussed", "previous decisions", "acquisition channels", "defined", "new", "idea", "topic"],
    "Conversation history is the 'personality' and 'knowledge' you build with AI."
  ),
  quizStep(
    "Context Advantage",
    "Why is keeping the conversation in the same thread more effective than starting new ones?",
    [
      "Because DeepSeek charges less for long conversations",
      "Because accumulated context allows for increasingly accurate and personalized responses without repeating info",
      "To save time by not having to type new prompts",
      "Long conversations overload DeepSeek and worsen responses"
    ],
    1,
    "The more the model 'knows' about the current project, the better it can help."
  ),
  textStep(
    "Mistake 7 — Asking for Everything at Once in a Single Prompt",
    "Putting multiple complex tasks in one giant prompt results in superficial responses. AI tries to cover everything fast without needed depth."
  ),
  fillStep(
    "Divide and conquer!",
    "Fill in the gap to structure work in stages.",
    '"Let\'s work in [______] separate stages. Starting with the most [______]: create a detailed [______] for my [______] business considering my budget is [______] and my audience is [______]."',
    ["4", "urgent and strategic", "competitor analysis", "consulting", "limited", "career transition professionals"],
    ["4", "urgent and strategic", "competitor analysis", "consulting", "limited", "career transition professionals", "2", "large", "youth"],
    "Step-by-step generates quality. All at once generates mediocrity."
  ),
  quizStep(
    "Multiple Task Impact",
    "What happens when you put many complex tasks in a single prompt?",
    [
      "DeepSeek delivers better results when it has more work to do",
      "Long prompts with multiple tasks are always more efficient",
      "The model divides its attention between all tasks and delivers each superficially — losing depth",
      "It makes no difference whether you divide or concentrate tasks"
    ],
    2,
    "Focus on one quality delivery at a time to get the best from each project component."
  ),
  textStep(
    "Mistake 8 — Ignoring the Visible Reasoning of R1",
    "R1's step-by-step reasoning (Chain of Thought) reveals how the model reached the conclusion. Ignoring this is missing a chance to validate the logic."
  ),
  fillStep(
    "Use reasoning to your advantage!",
    "Fill in the gap to request logical transparency.",
    '"Before presenting the conclusion, [______] your entire [______] reasoning. I want to see the [______] considered, the [______] discarded, and the reason for each [______] made."',
    ["show", "step-by-step", "variables", "hypotheses", "decision"],
    ["show", "step-by-step", "variables", "hypotheses", "decision", "hide", "final", "error"],
    "The 'how' AI thinks is often more valuable than 'what' it answers."
  ),
  quizStep(
    "Visible Reasoning Value",
    "Why is ignoring DeepSeek R1's visible reasoning a waste?",
    [
      "Because reasoning reveals the model's premises and decisions — allowing you to identify where to question and adjust",
      "Visible reasoning is just a technical feature without practical value",
      "Because reasoning makes the answer longer without adding information",
      "Visible reasoning is only useful for programmers"
    ],
    0,
    "Seeing logic allows you to act as a critical supervisor rather than a blind follower."
  ),
  textStep(
    "Mistake 9 — Using DeepSeek as a Final Decision Oracle",
    "DeepSeek maps options and risks, but the decision must always be yours. Delegating critical decisions entirely to AI is dangerous."
  ),
  fillStep(
    "Use as support, not judge!",
    "Fill in the gap to keep control of the decision.",
    '"I need to make a decision about [______]. Use DeepSeek to [______] the data, [______] the pros and cons, and [______] relevant factors. The final [______] will be mine."',
    ["expanding my business", "analyze", "map", "highlight", "decision"],
    ["expanding my business", "analyze", "map", "highlight", "decision", "ignore", "vote", "final"],
    "AI suggests paths; you choose the destination."
  ),
  quizStep(
    "Decision Role",
    "What is DeepSeek's correct role in the decision-making process?",
    [
      "Take the final decision based on available data",
      "Organize information, identify variables, and present perspectives that enrich human judgment — without replacing it",
      "Confirm the decision you already want to make",
      "DeepSeek should not be used for any type of professional decision"
    ],
    1,
    "Use AI to expand your vision, not to close your eyes."
  ),
  textStep(
    "Mistake 10 — Not Testing the Same Prompt in Different Models",
    "Different models (Claude, Gemini, GPT) have different 'personalities' and strengths. Getting stuck with one limits your vision."
  ),
  fillStep(
    "Compare and choose the best!",
    "Fill in the gap to diversify your tools.",
    '"For [______] and logic, test in [______]. For [______] with Google integration, test in [______]. For deep [______] and long document analysis, test in [______]. use the most [______] model for the task."',
    ["math", "DeepSeek R1", "searches", "Gemini", "writing", "Claude", "useful"],
    ["math", "DeepSeek R1", "searches", "Gemini", "writing", "Claude", "useful", "GPT", "bot"],
    "The best prompt engineer knows which AI to call for each challenge."
  ),
  quizStep(
    "Comparison Practice",
    "Why is testing the same prompt in different AI assistants a good practice?",
    [
      "Because each model has different strengths — and comparing reveals which tool performs better for that specific task",
      "To increase cost and time spent on each task",
      "Because no assistant is reliable alone",
      "All AI assistants generate identical results for the same prompt"
    ],
    0,
    "A diversity of AI 'opinions' helps create a much more robust result."
  ),
  textStep(
    "Summary of Mistakes",
    "Overcoming these 10 mistakes separates the amateur from the professional in the generative AI era."
  ),
  fillStep(
    "Consolidate your learning!",
    "Fill in the gap with a summary of good practices.",
    '"Common mistakes: [______] prompts, accepting the [______] result, sharing [______] data, using the [______] model, not [______] facts, starting [______] context-less chats, asking everything at [______], ignoring [______], using as a decision [______], and not [______] models."',
    ["vague", "first", "sensitive", "wrong", "verifying", "new", "once", "reasoning", "judge", "testing"],
    ["vague", "first", "sensitive", "wrong", "verifying", "new", "once", "reasoning", "judge", "testing", "short", "final"],
    "Mastering what not to do is as important as knowing what to do."
  ),
  textStep(
    "Conclusion",
    "DeepSeek is powerful, but power only manifests when you know exactly how not to waste it. Prompts with context, iterative refinement, data protection, and choosing the right model are key.\n\nAvoid the mistakes. Master the tool. Reap the results.\n\nLesson completed ✓"
  ),
];

export const DEEPSEEK_MODULE_5_STEPS_ES = [
  textStep(
    "Errores Más Comunes al Usar DeepSeek",
    "¡Bienvenido de nuevo! En esta lección, aprenderás a identificar y evitar los errores más comunes que hacen que los usuarios de DeepSeek obtengan resultados mediocres, incluso con una herramienta poderosa en sus manos. Conocer los errores es el primer paso para superarlos."
  ),
  textStep(
    "Por qué Conocer los Errores es Crítico",
    "Muchos usuarios culpan a la herramienta cuando los resultados son malos. La mayoría de las veces, el problema no es DeepSeek, sino cómo se está utilizando. Identificar los errores comunes convierte a un usuario promedio en uno estratégico."
  ),
  quizStep(
    "Estudiar los Errores",
    "¿Por qué estudiar los errores comunes mejora el uso de DeepSeek?",
    [
      "Porque la mayoría de los malos resultados provienen de prompts mal construidos, expectativas incorrectas y usos inadecuados que pueden corregirse",
      "Porque DeepSeek comete errores aleatorios que deben memorizarse",
      "Para saber cuándo abandonar DeepSeek y usar otra herramienta",
      "Los errores de DeepSeek son impredecibles y no se pueden evitar"
    ],
    0,
    "Comprender las fallas de uso te permite ajustar tu enfoque y sacar el máximo provecho de la IA."
  ),
  textStep(
    "Error 1 — Prompts Vagos y Sin Contexto",
    "El error más común e impactante. Los usuarios hacen preguntas genéricas y se frustran con respuestas genéricas, sin darse cuenta de que la vaguedad del prompt es la causa directa del mal resultado."
  ),
  fillStep(
    "¡Identifica el prompt problemático!",
    "Rellena el espacio para convertir un prompt vago en uno poderoso.",
    'Prompt con error: "Ayúdame con mi negocio." Prompt correcto: "Soy dueño de una [______] con [______] empleados y una facturación mensual de [______]. Mi mayor desafío actual es [______]. Ayúdame a crear un plan de acción con [______] pasos concretos para resolver esto en los próximos [______] días."',
    ["tienda de ropa femenina", "3", "$25k", "convertir visitantes en compradores", "5", "30"],
    ["tienda de ropa femenina", "3", "$25k", "convertir visitantes en compradores", "5", "30", "empresa", "ventas", "meses"],
    "El contexto es la materia prima que la IA usa para ser precisa."
  ),
  quizStep(
    "Impacto de la Vaguedad",
    "¿Por qué un prompt vago genera una respuesta insatisfactoria en DeepSeek?",
    [
      "Porque DeepSeek penaliza las preguntas cortas con malas respuestas",
      "Porque sin contexto el modelo llena los huecos con suposiciones genéricas, entregando una respuesta que puede ser válida para cualquier situación pero no te sirve específicamente a ti",
      "Para obligar a los usuarios a pagar por una versión avanzada",
      "Los prompts cortos funcionan tan bien como los detallados en DeepSeek"
    ],
    1,
    "La IA no adivina lo que quieres; procesa lo que le proporcionas."
  ),
  textStep(
    "Error 2 — Aceptar el Primer Resultado sin Refinar",
    "El segundo error más común es tratar la primera respuesta como final. DeepSeek fue construido para la iteración: cada refinamiento mejora significativamente la calidad del resultado."
  ),
  fillStep(
    "¡Refina en lugar de aceptar!",
    "Rellena el espacio para solicitar un refinamiento estratégico.",
    '"La respuesta anterior va por buen camino, pero necesito ajustes: [______] la segunda parte con más [______], cambia el tono a uno más [______], añade [______] prácticos y elimina las partes que sean demasiado [______] para mi contexto."',
    ["profundiza en", "datos y evidencias", "directo y asertivo", "ejemplos", "genéricas"],
    ["profundiza en", "datos y evidencias", "directo y asertivo", "ejemplos", "genéricas", "resume", "largas", "vagas"],
    "La iteración convierte un borrador en una obra maestra."
  ),
  quizStep(
    "Mentalidad de Refinamiento",
    "¿Cuál es la mentalidad correcta al recibir la primera respuesta de DeepSeek?",
    [
      "Aceptarlo tal cual: DeepSeek siempre acierta a la primera",
      "Descartar completamente y comenzar una nueva conversación desde cero",
      "Tratarlo como un borrador inteligente: identificar qué está bien, qué necesita mejorar y pedir refinamientos específicos hasta llegar al resultado ideal",
      "Pedir a DeepSeek que lo rehaga completamente sin dirección"
    ],
    2,
    "La colaboración con la IA es un proceso de diálogo continuo."
  ),
  textStep(
    "Error 3 — Compartir Datos Sensibles y Confidenciales",
    "Un error crítico que muchos cometen sin darse cuenta. Al ser un modelo chino, DeepSeek está sujeto a las leyes de datos de China, lo que hace que compartir datos sensibles sea un riesgo real."
  ),
  fillStep(
    "¡Identifica qué NO compartir!",
    "Rellena el espacio para garantizar la seguridad de tus datos.",
    '"Antes de usar DeepSeek para cualquier tarea, verifica si el contenido contiene: [______] de clientes, [______] financiera confidencial, [______] intelectual estratégica o [______] comerciales. Si es así, [______] o [______] antes de compartir."',
    ["datos personales", "información", "propiedad", "secretos", "anonimiza los datos", "usa otro asistente"],
    ["datos personales", "información", "propiedad", "secretos", "anonimiza los datos", "usa otro asistente", "nombres", "valores"],
    "La privacidad y la seguridad deben ir antes que la productividad."
  ),
  quizStep(
    "Práctica de Datos Segura",
    "¿Cuál es la práctica más segura al usar DeepSeek con datos corporativos?",
    [
      "Compartir todo: las políticas de privacidad protegen cualquier dato",
      "Usar solo para preguntas personales y nunca para el trabajo",
      "Anonimizar o generalizar información sensible antes de compartir, reemplazando identificadores por versiones genéricas que preserven el contexto",
      "Los datos corporativos nunca deben usarse en ningún asistente de IA"
    ],
    2,
    "Asume siempre que lo que escribes puede usarse para entrenamiento o ser accesible según las leyes del proveedor."
  ),
  textStep(
    "Error 4 — Usar el Modelo Equivocado para la Tarea",
    "DeepSeek tiene diferentes versiones para diferentes tareas. Usar el modelo genérico para razonamiento profundo, o viceversa, resulta en respuestas deficientes."
  ),
  fillStep(
    "¡Elige el modelo correcto!",
    "Rellena el espacio para asociar la tarea con el modelo ideal.",
    '"Para [______] y problemas que requieren lógica profunda, usa [______]. Para [______] y uso general diario, usa [______]. Para [______] y desarrollo de software, usa [______]."',
    ["análisis complejos", "DeepSeek R1", "escritura y lluvia de ideas", "DeepSeek V3", "programación", "DeepSeek Coder"],
    ["análisis complejos", "DeepSeek R1", "escritura y lluvia de ideas", "DeepSeek V3", "programación", "DeepSeek Coder", "chat", "imágenes"],
    "Cada modelo es una herramienta especializada para un propósito diferente."
  ),
  quizStep(
    "Modelo V3 vs R1",
    "¿Qué sucede cuando usas DeepSeek V3 para una tarea que requiere razonamiento matemático profundo?",
    [
      "V3 es mejor que R1 para cualquier tipo de tarea",
      "La respuesta puede ser superficial o imprecisa: R1 fue entrenado específicamente para razonamiento estructurado y ofrece resultados superiores para esto",
      "El resultado es idéntico independientemente del modelo elegido",
      "DeepSeek V3 no acepta preguntas de matemáticas"
    ],
    1,
    "R1 activa el modo de pensamiento (Chain of Thought), que es vital para la lógica y las matemáticas."
  ),
  textStep(
    "Error 5 — No Verificar la Información Generada",
    "DeepSeek puede generar información incorrecta con apariencia de precisión, especialmente en hechos, fechas, estadísticas y citas. Aceptar sin verificar es un error peligroso."
  ),
  fillStep(
    "¡Haz de la verificación un hábito!",
    "Rellena el espacio para estructurar un proceso de revisión.",
    '"Siempre que DeepSeek presente [______], [______] o [______] específicos, trátalo como un [______] y verifica en las [______] originales antes de usarlo en [______], [______] o cualquier documento importante."',
    ["datos numéricos", "fechas", "citas", "punto de partida", "fuentes", "presentaciones", "informes"],
    ["datos numéricos", "fechas", "citas", "punto de partida", "fuentes", "presentaciones", "informes", "sitio web", "blog"],
    "Confía pero verifica. La IA es un copiloto, no el comandante final."
  ),
  quizStep(
    "Comportamiento de Datos Seguro",
    "¿Cuál es el comportamiento más seguro al recibir datos y estadísticas de DeepSeek?",
    [
      "Aceptar como verdad: DeepSeek tiene acceso a datos en tiempo real",
      "Tratar los datos como referencia inicial, verificar fuentes primarias y pedir al modelo que indique el origen de la información",
      "Nunca usar DeepSeek para tareas pesadas de datos",
      "Los datos de DeepSeek siempre son precisos si el prompt está bien hecho"
    ],
    1,
    "Las alucinaciones (hechos inventados) siguen siendo comunes en todos los modelos de lenguaje."
  ),
  textStep(
    "Error 6 — Conversaciones Sin Contexto Acumulado",
    "Muchos usuarios comienzan una nueva conversación para cada pregunta relacionada con el mismo tema, perdiendo el contexto acumulado que hace que las respuestas sean más precisas."
  ),
  fillStep(
    "¡Mantén el contexto en la conversación!",
    "Rellena el espacio para continuar un proyecto.",
    '"Continuando nuestra conversación sobre la [______]: basándonos en lo que ya [______], especialmente [______], ahora necesito profundizar en [______]. Ten en cuenta todo lo [______] antes de responder."',
    ["estrategia de lanzamiento", "discutimos", "decisiones anteriores", "canales de adquisición", "definido"],
    ["estrategia de lanzamiento", "discutimos", "decisiones anteriores", "canales de adquisición", "definido", "nueva", "idea", "tema"],
    "El historial de conversación es la 'personalidad' y el 'conocimiento' que construyes con la IA."
  ),
  quizStep(
    "Ventaja del Contexto",
    "¿Por qué mantener la conversación en el mismo hilo es más efectivo que comenzar nuevas?",
    [
      "Porque DeepSeek cobra menos por conversaciones largas",
      "Porque el contexto acumulado permite respuestas cada vez más precisas y personalizadas sin repetir información",
      "Para ahorrar tiempo al no tener que escribir nuevos prompts",
      "Las conversaciones largas sobrecargan a DeepSeek y empeoran las respuestas"
    ],
    1,
    "Cuanto más 'sabe' el modelo sobre el proyecto actual, mejor puede ayudar."
  ),
  textStep(
    "Error 7 — Pedir Todo a la Vez en un Solo Prompt",
    "Poner múltiples tareas complejas en un solo prompt gigante resulta en respuestas superficiales. La IA intenta cubrirlo todo rápido sin la profundidad necesaria."
  ),
  fillStep(
    "¡Divide y vencerás!",
    "Rellena el espacio para estructurar el trabajo en etapas.",
    '"Vamos a trabajar en [______] etapas separadas. Comenzando por la más [______]: crea un [______] detallado para mi negocio de [______] considerando que mi presupuesto es [______] y mi audiencia es [______]."',
    ["4", "urgente y estratégica", "análisis de competencia", "consultoría", "limitado", "profesionales en transición de carrera"],
    ["4", "urgente y estratégica", "análisis de competencia", "consultoría", "limitado", "profesionales en transición de carrera", "2", "grande", "jóvenes"],
    "El paso a paso genera calidad. Todo a la vez genera mediocridad."
  ),
  quizStep(
    "Impacto de Múltiples Tareas",
    "¿Qué sucede cuando pones muchas tareas complejas en un solo prompt?",
    [
      "DeepSeek ofrece mejores resultados cuando tiene más trabajo por hacer",
      "Los prompts largos con múltiples tareas siempre son más eficientes",
      "El modelo divide su atención entre todas las tareas y entrega cada una superficialmente, perdiendo profundidad",
      "No hay diferencia entre dividir o concentrar las tareas"
    ],
    2,
    "Concéntrate en una entrega de calidad a la vez para obtener lo mejor de cada componente del proyecto."
  ),
  textStep(
    "Error 8 — Ignorar el Razonamiento Visible de R1",
    "El razonamiento paso a paso (Chain of Thought) de R1 revela cómo el modelo llegó a la conclusión. Ignorar esto es perder una oportunidad de validar la lógica."
  ),
  fillStep(
    "¡Usa el razonamiento a tu favor!",
    "Rellena el espacio para solicitar transparencia lógica.",
    '"Antes de presentar la conclusión, [______] todo tu razonamiento [______]. Quiero ver las [______] consideradas, las [______] descartadas y el motivo de cada [______] tomada."',
    ["muestra", "paso a paso", "variables", "hipótesis", "decisión"],
    ["muestra", "paso a paso", "variables", "hipótesis", "decisión", "oculta", "final", "error"],
    "El 'cómo' piensa la IA es a menudo más valioso que 'qué' responde."
  ),
  quizStep(
    "Valor del Razonamiento Visible",
    "¿Por qué ignorar el razonamiento visible de DeepSeek R1 es un desperdicio?",
    [
      "Porque el razonamiento revela las premisas y decisiones del modelo, permitiéndote identificar dónde cuestionar y ajustar",
      "El razonamiento visible es solo una característica técnica sin valor práctico",
      "Porque el razonamiento alarga la respuesta sin añadir información",
      "El razonamiento visible solo es útil para programadores"
    ],
    0,
    "Ver la lógica te permite actuar como un supervisor crítico en lugar de un seguidor ciego."
  ),
  textStep(
    "Error 9 — Usar DeepSeek como Oráculo de Decisiones Finales",
    "DeepSeek mapea opciones y riesgos, pero la decisión debe ser siempre tuya. Delegar decisiones críticas enteramente a la IA es peligroso."
  ),
  fillStep(
    "¡Úsalo como apoyo, no como juez!",
    "Rellena el espacio para mantener el control de la decisión.",
    '"Necesito tomar una decisión sobre [______]. Usa DeepSeek para [______] los datos, [______] los pros y contras y [______] los factores relevantes. La [______] final será mía."',
    ["expandir mi negocio", "analizar", "mapear", "destacar", "decisión"],
    ["expandir mi negocio", "analizar", "mapear", "destacar", "decisión", "ignorar", "votar", "final"],
    "La IA sugiere caminos; tú eliges el destino."
  ),
  quizStep(
    "Papel Decisorio",
    "¿Cuál es el papel correcto de DeepSeek en el proceso de toma de decisiones?",
    [
      "Tomar la decisión final basándose en los datos disponibles",
      "Organizar información, identificar variables y presentar perspectivas que enriquezcan el juicio humano, sin reemplazarlo",
      "Confirmar la decisión que ya quieres tomar",
      "DeepSeek no debe usarse para ningún tipo de decisión profesional"
    ],
    1,
    "Usa la IA para ampliar tu visión, no para cerrar tus ojos."
  ),
  textStep(
    "Error 10 — No Probar el Mismo Prompt en Diferentes Modelos",
    "Diferentes modelos (Claude, Gemini, GPT) tienen diferentes 'personalidades' y fortalezas. Quedarse estancado con uno limita tu visión."
  ),
  fillStep(
    "¡Compara y elige el mejor!",
    "Rellena el espacio para diversificar tus herramientas.",
    '"Para tareas de [______] y lógica, prueba en [______]. Para [______] con integración de Google, prueba en [______]. Para [______] profunda y análisis de documentos largos, prueba en [______]. usa el modelo más [______] para la tarea."',
    ["matemáticas", "DeepSeek R1", "búsquedas", "Gemini", "escritura", "Claude", "útil"],
    ["matemáticas", "DeepSeek R1", "búsquedas", "Gemini", "escritura", "Claude", "útil", "GPT", "bot"],
    "El mejor prompt engineer sabe a qué IA llamar para cada desafío."
  ),
  quizStep(
    "Práctica de Comparación",
    "¿Por qué probar el mismo prompt en diferentes asistentes de IA es una buena práctica?",
    [
      "Porque cada modelo tiene fortalezas diferentes y comparar revela qué herramienta funciona mejor para esa tarea específica",
      "Para aumentar el costo y el tiempo dedicado a cada tarea",
      "Porque ningún asistente es confiable por sí solo",
      "Todos los asistentes de IA generan resultados idénticos para el mismo prompt"
    ],
    0,
    "La diversidad de 'opiniones' de las IA ayuda a crear un resultado mucho más robusto."
  ),
  textStep(
    "Resumen de Errores",
    "Superar estos 10 errores separa al aficionado del profesional en la era de la IA generativa."
  ),
  fillStep(
    "¡Consolida tu aprendizaje!",
    "Rellena el espacio con un resumen de buenas prácticas.",
    '"Errores comunes: prompts [______], aceptar el [______] resultado, compartir datos [______], usar el modelo [______], no [______] los hechos, iniciar chats sin [______], pedir todo a la [______], ignorar el [______], usar como [______] de decisiones y no [______] modelos."',
    ["vagos", "primer", "sensibles", "equivocado", "verificar", "contexto", "vez", "razonamiento", "juez", "probar"],
    ["vagos", "primer", "sensibles", "equivocado", "verificar", "contexto", "vez", "razonamiento", "juez", "probar", "cortos", "finales"],
    "Dominar lo que no se debe hacer es tan importante como saber qué hacer."
  ),
  textStep(
    "Conclusión",
    "DeepSeek es poderoso, pero el poder solo se manifiesta cuando sabes exactamente cómo no desperdiciarlo. Los prompts con contexto, el refinamiento iterativo, la protección de datos y la elección del modelo correcto son clave.\n\nEvita los errores. Domina la herramienta. Cosecha los resultados.\n\nLección completada ✓"
  ),
];

export const DEEPSEEK_MODULE_5_STEPS_FR = [
  textStep(
    "Erreurs les Plus Courantes lors de l'Utilisation de DeepSeek",
    "Bienvenue à nouveau ! Dans cette leçon, vous apprendrez à identifier et à éviter les erreurs les plus courantes qui font que les utilisateurs de DeepSeek obtiennent des résultats médiocres — même avec un outil puissant entre les mains. Connaître les erreurs est la première étape pour les surmonter."
  ),
  textStep(
    "Pourquoi Connaître les Erreurs est Crucial",
    "Beaucoup d'utilisateurs blâment l'outil lorsque les résultats sont mauvais. La plupart du temps, le problème ne vient pas de DeepSeek — il vient de la façon dont il est utilisé. Identifier les erreurs courantes transforme un utilisateur moyen en un utilisateur stratégique."
  ),
  quizStep(
    "Étudier les Erreurs",
    "Pourquoi l'étude des erreurs courantes améliore-t-elle l'utilisation de DeepSeek ?",
    [
      "Parce que la plupart des mauvais résultats proviennent de prompts mal construits, d'attentes erronées et d'utilisations inappropriées qui peuvent être corrigées",
      "Parce que DeepSeek commet des erreurs aléatoires qui doivent être mémorisées",
      "Pour savoir quand abandonner DeepSeek et utiliser un autre outil",
      "Les erreurs de DeepSeek sont imprévisibles et ne peuvent pas être évitées"
    ],
    0,
    "Comprendre les échecs d'utilisation vous permet d'ajuster votre approche et de tirer le meilleur parti de l'IA."
  ),
  textStep(
    "Erreur 1 — Prompts Vagues et Sans Contexte",
    "L'erreur la plus courante et la plus impactante. Les utilisateurs posent des questions génériques et sont frustrés par des réponses génériques — sans se rendre compte que le flou du prompt est la cause directe du mauvais résultat."
  ),
  fillStep(
    "Identifiez le prompt problématique !",
    "Remplissez l'espace pour transformer un prompt vague en un prompt puissant.",
    'Prompt avec erreur : "Aidez-moi avec mon business." Prompt correct : "Je suis propriétaire d\'une [______] avec [______] employés et un chiffre d\'affaires mensuel de [______]. Mon plus grand défi actuel est [______]. Aidez-moi à créer un plan d\'action avec [______] étapes concrètes pour résoudre cela dans les [______] prochains jours."',
    ["boutique de vêtements", "3", "25k€", "convertir les visiteurs en acheteurs", "5", "30"],
    ["boutique de vêtements", "3", "25k€", "convertir les visiteurs en acheteurs", "5", "30", "entreprise", "ventes", "mois"],
    "Le contexte est la matière première que l'IA utilise pour être précise."
  ),
  quizStep(
    "Impact du Flou",
    "Pourquoi un prompt vague génère-t-il une réponse insatisfaisante dans DeepSeek ?",
    [
      "Parce que DeepSeek pénalise les questions courtes par de mauvaises réponses",
      "Parce que sans contexte, le modèle comble les lacunes par des suppositions génériques — livrant une réponse qui peut être valable pour n'importe quelle situation mais ne vous sert pas spécifiquement",
      "Pour forcer les utilisateurs à payer pour une version avancée",
      "Les prompts courts fonctionnent aussi bien que les prompts détaillés dans DeepSeek"
    ],
    1,
    "L'IA ne devine pas ce que vous voulez ; elle traite ce que vous fournissez."
  ),
  textStep(
    "Erreur 2 — Accepter le Premier Résultat sans Affiner",
    "La deuxième erreur la plus courante consiste à traiter la première réponse comme la réponse finale. DeepSeek a été conçu pour l'itération — chaque affinement améliore considérablement la qualité du résultat."
  ),
  fillStep(
    "Affinez au lieu d'accepter !",
    "Remplissez l'espace pour demander un affinement stratégique.",
    '"La réponse précédente est sur la bonne voie, mais j\'ai besoin d\'ajustements : [______] la deuxième partie avec plus de [______], changez le ton pour quelque chose de plus [______], ajoutez des [______] pratiques et éliminez les passages trop [______] pour mon contexte."',
    ["approfondissez", "données et preuves", "direct et assertif", "exemples", "génériques"],
    ["approfondissez", "données et preuves", "direct et assertif", "exemples", "génériques", "résumez", "longs", "vagues"],
    "L'itération transforme un brouillon en un chef-d'œuvre."
  ),
  quizStep(
    "Mentalité d'Affinement",
    "Quelle est la bonne mentalité à adopter lors de la réception de la première réponse de DeepSeek ?",
    [
      "Accepter tel quel — DeepSeek réussit toujours du premier coup",
      "Tout jeter et recommencer une nouvelle conversation de zéro",
      "Traiter comme un brouillon intelligent — identifier ce qui est bon, ce qui doit être amélioré et demander des affinements spécifiques jusqu'à obtention du résultat idéal",
      "Demander à DeepSeek de tout refaire sans directive"
    ],
    2,
    "La collaboration avec l'IA est un processus de dialogue continu."
  ),
  textStep(
    "Erreur 3 — Partager des Données Sensibles e Confidentielles",
    "Une erreur critique que beaucoup commettent sans s'en rendre compte. En tant que modèle d'origine chinoise, DeepSeek est soumis aux lois chinoises sur les données — ce qui fait du partage d'informations sensibles un risque réel."
  ),
  fillStep(
    "Identifiez ce qu'il ne faut PAS partager !",
    "Remplissez l'espace pour garantir la sécurité de vos données.",
    '"Avant d\'utiliser DeepSeek pour toute tâche, vérifiez si le contenu contient : des [______] clients, des [______] financières confidentielles, de la [______] intellectuelle stratégique ou des [______] commerciaux. Si oui, [______] ou [______] avant de partager."',
    ["données personnelles", "informations", "propriété", "secrets", "anonymisez les données", "utilisez un outro assistant"],
    ["données personnelles", "informations", "propriété", "secrets", "anonymisez les données", "utilisez un outro assistant", "noms", "valeurs"],
    "La confidentialité et la sécurité doivent passer avant la productivité."
  ),
  quizStep(
    "Pratique des Données Sûre",
    "Quelle est la pratique la plus sûre lors de l'utilisation de DeepSeek avec des données d'entreprise ?",
    [
      "Tout partager — les politiques de confidentialité protègent toutes les données",
      "Utiliser uniquement pour des questions personnelles et jamais pour le travail",
      "Anonymiser ou généraliser les informations sensibles avant de les partager — en remplaçant les données identifiables par des versions génériques qui préservent le contexte",
      "Les données d'entreprise ne doivent jamais être utilisées dans un assistant IA"
    ],
    2,
    "Partez toujours du principe que ce que vous tapez peut être utilisé pour l'entraînement ou être accessible conformément aux lois locales du fournisseur."
  ),
  textStep(
    "Erreur 4 — Utiliser le Mauvais Modèle pour la Tâche",
    "DeepSeek propose différentes versions pour différents types de tâches. Utiliser le modèle générique pour une tâche exigeant un raisonnement profond — ou l'inverse — entraîne des réponses en deçà du potentiel."
  ),
  fillStep(
    "Choisissez le bon modèle !",
    "Remplissez l'espace pour associer la tâche au modèle idéal.",
    '"Pour les [______] et les problèmes exigeant une logique profonde, utilisez [______]. Pour les tâches de [______] et l\'usage quotidien général, utilisez [______]. Pour la [______] et le développement logiciel, utilisez [______]."',
    ["analyses complexes", "DeepSeek R1", "rédaction et brainstorming", "DeepSeek V3", "programmation", "DeepSeek Coder"],
    ["analyses complexes", "DeepSeek R1", "rédaction et brainstorming", "DeepSeek V3", "programmation", "DeepSeek Coder", "chat", "images"],
    "Chaque modèle est un outil spécialisé pour un but différent."
  ),
  quizStep(
    "Modèle V3 vs R1",
    "Que se passe-t-il lorsque vous utilisez DeepSeek V3 for une tâche exigeant un raisonnement mathématique profond ?",
    [
      "V3 est meilleur que R1 pour tout type de tâche",
      "La réponse peut être superficielle ou imprécise — R1 a été spécifiquement entraîné pour le raisonnement structuré et livre des résultats bien supérieurs pour ce type de tâche",
      "Le résultat est identique quel que soit le modèle choisi",
      "DeepSeek V3 n'accepte pas les questions mathématiques"
    ],
    1,
    "Le R1 active le mode de réflexion (Chain of Thought) qui est vital for la logique et les mathématiques."
  ),
  textStep(
    "Erreur 5 — Ne pas Vérifier les Informations Générées",
    "DeepSeek peut générer des informations incorrectes avec une apparence de précision — surtout sur des faits, des dates, des statistiques et des citations. Tout accepter sans vérification est une erreur dangereuse."
  ),
  fillStep(
    "Adoptez la vérification comme une habitude !",
    "Remplissez l'espace pour structurer un processus de révision.",
    '"Chaque fois que DeepSeek présente des [______], des [______] ou des [______] spécifiques, traitez cela comme un [______] et vérifiez dans les [______] originales avant de l\'utiliser dans des [______], des [______] ou tout document important."',
    ["données numériques", "dates", "citations", "point de départ", "sources", "présentations", "rapports"],
    ["données numériques", "dates", "citations", "point de départ", "sources", "présentations", "rapports", "site", "blog"],
    "Faites confiance mais vérifiez. L'IA est un copilote, pas le commandant final."
  ),
  quizStep(
    "Comportement Sûr avec les Données",
    "Quel est le comportement le plus sûr lors de la réception de données et de statistiques de DeepSeek ?",
    [
      "Accepter comme vrai — DeepSeek a accès à des données en temps réel",
      "Traiter les données comme une référence initiale, vérifier dans les sources primaires et demander au modèle d'indiquer l'origine de l'information",
      "Ne jamais utiliser DeepSeek pour des tâches lourdes en données",
      "Les données de DeepSeek sont toujours précises si le prompt est bien fait"
    ],
    1,
    "Les hallucinations (faits inventés) sont encore courantes dans tous les modèles de langage."
  ),
  textStep(
    "Erreur 6 — Conversations sans Contexte Accumulé",
    "Beaucoup d'utilisateurs commencent une nouvelle conversation pour chaque question liée au même thème — perdant ainsi le contexte accumulé qui rendrait les réponses plus précises."
  ),
  fillStep(
    "Gardez le contexte dans la conversation !",
    "Remplissez l'espace pour donner de la continuité à un projet.",
    '"Pour poursuivre notre conversation sur la [______] : en me basant sur ce que nous avons déjà [______], en particulier les [______], j\'ai maintenant besoin d\'approfondir le point sur [______]. Tenez compte de tout ce qui a été [______] avant de répondre."',
    ["stratégie de lançamento", "discuté", "décisions précédentes", "le canal d'acquisition", "défini"],
    ["stratégie de lançamento", "discuté", "décisions précédentes", "le canal d'acquisition", "défini", "nouvelle", "idée", "sujet"],
    "L'historique de la conversation est la 'personnalité' et la 'connaissance' que vous construisez avec l'IA."
  ),
  quizStep(
    "Avantage du Contexte",
    "Pourquoi garder la conversation dans le même fil est-il plus efficace que d'en commencer de nouvelles ?",
    [
      "Parce que DeepSeek facture moins pour les conversations longues",
      "Parce que le contexte accumulé permet des réponses de plus en plus précises et personnalisées sans avoir à répéter les informations",
      "Pour gagner du temps en n'ayant pas à taper de nouveaux prompts",
      "Les conversations longues surchargent DeepSeek et dégradent les réponses"
    ],
    1,
    "Plus le modèle 'en sait' sur le projet actuel, mieux il pourra vous aider."
  ),
  textStep(
    "Erreur 7 — Tout Demander d'un Coup dans un Seul Prompt",
    "Placer plusieurs tâches complexes dans un seul prompt géant entraîne des réponses superficielles. L'IA essaie de tout couvrir rapidement sans la profondeur nécessaire."
  ),
  fillStep(
    "Diviser pour régner !",
    "Remplissez l'espace pour structurer un travail par étapes.",
    '"Travaillons en [______] étapes distinctes. En commençant par la plus [______] : créez une [______] détaillée pour mon activité de [______] sachant que mon budget est [______] et mon public est [______]."',
    ["4", "urgente e stratégique", "analyse de concurrence", "conseil", "limité", "professionnels en transition"],
    ["4", "urgente e stratégique", "analyse de concurrence", "conseil", "limité", "professionnels en transition", "2", "grand", "jeunes"],
    "Le etapa par etapa génère de la qualité. Tout d'un coup génère de la médiocrité."
  ),
  quizStep(
    "Impact des Tâches Multiples",
    "Que se passe-t-il lorsque vous placez de nombreuses tâches complexes dans un seul prompt ?",
    [
      "DeepSeek livre de meilleurs résultats lorsqu'il a plus de travail à faire",
      "Les prompts longs avec des tâches multiples sont toujours plus efficaces",
      "Le modèle divise son attention entre toutes les tâches et livre chacune de manière superficielle — perdant en profondeur",
      "Cela ne fait aucune différence de diviser ou de concentrer les tâches"
    ],
    2,
    "Concentrez-vous sur un livrable de qualité à la fois pour obtenir le meilleur de chaque composante de votre projet."
  ),
  textStep(
    "Erreur 8 — Ignorer le Raisonnement Visible du R1",
    "Le raisonnement étape par étape (Chain of Thought) du R1 révèle comment le modèle est arrivé à la conclusion. Ignorer cela, c'est perdre une chance de valider la logique."
  ),
  fillStep(
    "Utilisez le raisonnement à votre avantage !",
    "Remplissez l'espace pour demander de la transparence logique.",
    '"Avant de présenter la conclusion, [______] tout votre raisonnement [______]. Je veux voir les [______] considérées, les [______] écartées et le motif de chaque [______] prise."',
    ["montrez", "étape par étape", "variables", "hypothèses", "décision"],
    ["montrez", "étape par étape", "variables", "hypothèses", "décision", "cachez", "final", "erreur"],
    "Le 'comment' l'IA pense est souvent plus précieux que le 'ce qu'elle' répond."
  ),
  quizStep(
    "Valeur du Raisonnement Visible",
    "Pourquoi ignorer le raisonnement visible du DeepSeek R1 est-il un gaspillage ?",
    [
      "Parce que le raisonnement révèle les prémisses et les décisions du modèle — vous permettant d'identifier où questionner et ajuster selon votre contexte",
      "Le raisonnement visible n'est qu'une fonction technique sans valeur pratique",
      "Parce que le raisonnement rallonge la réponse sans ajouter d'information",
      "Le raisonnement visible n'est utile qu'aux programmeurs"
    ],
    0,
    "Voir la logique vous permet d'agir en tant que superviseur critique plutôt qu'en suiveur aveugle."
  ),
  textStep(
    "Erreur 9 — Utiliser DeepSeek comme Oracle de Décisions Finales",
    "DeepSeek cartographie les options et les risques, mais la décision doit toujours être la vôtre. Deleguer des décisions critiques entièrement à l'IA est dangereux."
  ),
  fillStep(
    "Utilisez-le comme soutien, pas comme arbitre !",
    "Remplissez l'espace pour garder le contrôle de la décision.",
    '"Je dois prendre une décision concernant le fait d\'[______]. Utilisez DeepSeek pour [______] les données, [______] les pour et les contre et [______] les facteurs pertinents. La [______] finale sera la mienne."',
    ["étendre mon activité", "analyser", "cartographier", "mettre en évidence", "décision"],
    ["étendre mon activité", "analyser", "cartographier", "mettre en évidence", "décision", "ignorer", "voter", "final"],
    "L'IA suggère des chemins ; vous choisissez la destination."
  ),
  quizStep(
    "Rôle Décisionnel",
    "Quel est le rôle correct de DeepSeek dans le processus de prise de décision ?",
    [
      "Prendre la décision finale sur la base des données disponibles",
      "Organiser les informations, identifier les variables et présenter des perspectives qui enrichissent le jugement humain — sans le remplacer",
      "Confirmer la décision que vous voulez déjà prendre",
      "DeepSeek ne doit être utilisé pour aucun type de décision professionnelle"
    ],
    1,
    "Utilisez l'IA pour élargir votre vision, pas pour fermer les yeux."
  ),
  textStep(
    "Erreur 10 — Ne pas Tester le Même Prompt sur Différents Modèles",
    "Différents modèles (Claude, Gemini, GPT) ont des 'personnalités' et des forces différentes. Rester bloqué sur un seul, c'est limiter votre vision."
  ),
  fillStep(
    "Comparez et choisissez le meilleur !",
    "Remplissez l'espace pour diversifier vos outils.",
    '"Pour les tâches de [______] et de logique, testez sur [______]. Pour les [______] avec intégration Google, testez sur [______]. Pour une [______] profonde et l\'analyse de documents longs, testez sur [______]. utilisez le [______] le plus utile pour la tâche."',
    ["mathématiques", "DeepSeek R1", "recherches", "Gemini", "rédaction", "Claude", "modèle"],
    ["mathématiques", "DeepSeek R1", "recherches", "Gemini", "rédaction", "Claude", "modèle", "GPT", "bot"],
    "Le meilleur prompt engineer sait quelle IA appeler pour chaque défi."
  ),
  quizStep(
    "Pratique de Comparaison",
    "Pourquoi tester le même prompt sur différents assistants IA est-il une bonne pratique ?",
    [
      "Parce que chaque modèle a des forces différentes — et comparer révèle quel outil est le plus performant for cette tâche spécifique",
      "Pour augmenter le coût et le temps passé sur chaque tâche",
      "Parce qu'aucun assistant n'est fiable seul",
      "Tous les assistants IA génèrent des résultats identiques for le même prompt"
    ],
    0,
    "La diversité des 'avis' des IA aide à créer un résultat final bien plus robuste."
  ),
  textStep(
    "Résumé des Erreurs",
    "Surmonter ces 10 erreurs sépare l'amateur du professionnel à l'ère de l'IA générative."
  ),
  fillStep(
    "Consolidez l'apprentissage !",
    "Remplissez l'espace avec le résumé des bonnes pratiques.",
    '"Les erreurs courantes sont : les prompts [______], accepter le [______] résultat, partager des données [______], utiliser le [______] modèle, ne pas [______] les faits, commencer de [______] conversations sans contexte, tout demander d\'un [______], ignorer le [______], utiliser comme [______] de décisions et ne pas [______] les modèles."',
    ["vagues", "premier", "sensibles", "mauvais", "vérifier", "nouvelles", "coup", "raisonnement", "arbitre", "tester"],
    ["vagues", "premier", "sensibles", "mauvais", "vérifier", "nouvelles", "coup", "raisonnement", "arbitre", "tester", "courts", "finaux"],
    "Maîtriser ce qu'il ne faut pas faire est aussi important que de savoir quoi faire."
  ),
  textStep(
    "Conclusion",
    "DeepSeek est puissant, mais cette puissance ne se manifeste que lorsque vous savez exactement comment ne pas la gaspiller. Les prompts avec contexte, l'affinement itératif, la protection des données et le choix du bon modèle sont les clés.\n\nÉvitez les erreurs. Maîtrisez l'outil. Récoltez les résultats.\n\nLeçon terminée ✓"
  ),
];



