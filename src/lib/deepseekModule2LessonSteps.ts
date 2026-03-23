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

export const DEEPSEEK_MODULE_2_STEPS_PT = [
  textStep(
    "Técnicas Avançadas de Prompt para o DeepSeek",
    "Bem-vindo de volta! Nesta lição, você vai dominar as técnicas avançadas de prompt específicas para extrair o máximo do DeepSeek — explorando seu raciocínio profundo, capacidade analítica e precisão lógica de forma estratégica e profissional."
  ),
  textStep(
    "Por que o DeepSeek Responde Diferente aos Prompts",
    "O DeepSeek — especialmente o R1 — foi treinado com foco em raciocínio estruturado e precisão lógica. Isso significa que ele responde de forma diferente a prompts bem construídos. Quanto mais você estrutura o pensamento no prompt, mais poderoso e preciso será o resultado."
  ),
  quizStep(
    "Ativando o Potencial",
    "Por que técnicas avançadas de prompt funcionam melhor no DeepSeek do que perguntas simples?",
    [
      "Porque o DeepSeek foi treinado para raciocinar em profundidade — e prompts bem estruturados ativam esse potencial de forma muito mais eficaz do que perguntas vagas",
      "Porque o DeepSeek ignora prompts curtos automaticamente",
      "Técnicas avançadas só funcionam para usuários com conhecimento técnico em IA",
      "Não faz diferença a forma como você estrutura o prompt no DeepSeek"
    ],
    0,
    "A estrutura do prompt funciona como um mapa que guia o motor de raciocínio profundo do DeepSeek para os melhores resultados."
  ),
  textStep(
    "Técnica 1 — Raciocínio em Cadeia (Chain of Thought)",
    "O DeepSeek R1 foi desenvolvido especificamente para raciocinar passo a passo. Pedir explicitamente que ele mostre cada etapa do pensamento antes de concluir aumenta drasticamente a precisão — especialmente em tarefas complexas."
  ),
  fillStep(
    "Ative o Chain of Thought!",
    "Preencha a lacuna para ativar o raciocínio passo a passo de forma profissional.",
    '"Antes de responder, ___ seu raciocínio ___. Identifique as ___ envolvidas, considere as possíveis ___, avalie o ___ de cada uma e só então apresente a ___ final com justificativa clara."',
    ["mostre", "passo a passo", "variáveis principais", "abordagens", "impacto e viabilidade", "conclusão"],
    ["mostre", "passo a passo", "variáveis principais", "abordagens", "impacto e viabilidade", "conclusão", "esconda", "curto", "ideias"],
    "Pedir que o modelo mostre o processo de pensamento expõe a lógica e permite uma validação muito superior."
  ),
  quizStep(
    "Vantagem do Chain of Thought",
    "Qual é a principal vantagem de ativar o Chain of Thought no DeepSeek R1?",
    [
      "Para deixar a resposta mais longa e detalhada",
      "Porque o DeepSeek só funciona com raciocínio visível",
      "Porque você acompanha cada etapa do pensamento do modelo — podendo identificar onde questionar, onde ajustar e onde aprofundar antes de aceitar a conclusão final",
      "O Chain of Thought só funciona para problemas matemáticos"
    ],
    2,
    "O Chain of Thought transforma a IA de uma caixa preta em um colaborador transparente."
  ),
  textStep(
    "Técnica 2 — Self-Consistency Prompting",
    "Essa técnica consiste em pedir ao DeepSeek para resolver o mesmo problema de múltiplas formas independentes e depois identificar qual solução aparece de forma mais consistente. É especialmente poderosa para decisões importantes onde você quer minimizar erros."
  ),
  fillStep(
    "Use Self-Consistency!",
    "Preencha a lacuna para implementar a técnica de consistência própria.",
    '"Resolva o problema abaixo de ___ formas completamente ___, sem usar o raciocínio de uma para influenciar a outra. Depois ___ os resultados, identifique onde as soluções ___ e qual abordagem aparece como mais ___ e confiável."',
    ["3", "independentes", "compare", "convergem", "consistente"],
    ["3", "independentes", "compare", "convergem", "consistente", "iguais", "rápidas", "confusas"],
    "A consistência entre múltiplos caminhos de raciocínio é um forte indicador de uma resposta correta e confiável."
  ),
  quizStep(
    "Uso do Self-Consistency",
    "Em quais situações o Self-Consistency Prompting é mais valioso?",
    [
      "Para tarefas criativas onde não existe uma resposta certa",
      "Quando você precisa de uma resposta rápida sem profundidade",
      "Em decisões importantes, análises complexas e problemas lógicos onde um único caminho de raciocínio pode conter vieses ou erros não percebidos",
      "O Self-Consistency só funciona para problemas matemáticos"
    ],
    2,
    "Para decisões de alto impacto, validar a consistência através de múltiplos caminhos de pensamento é uma prática de elite."
  ),
  textStep(
    "Técnica 3 — Role Prompting Especializado",
    "Assim como em outros modelos, atribuir um papel ao DeepSeek melhora a qualidade das respostas. Mas no DeepSeek, o papel deve ser altamente específico — incluindo metodologia de trabalho, nível de rigor e forma de apresentar conclusões."
  ),
  fillStep(
    "Crie um papel especializado!",
    "Preencha a lacuna para criar uma persona profissional e rigorosa.",
    '"Você é um ___ com ___ anos de experiência em ___. Você trabalha com ___ baseada em dados, é ___ nas suas conclusões e sempre apresenta ___ para cada afirmação que faz. Quando não tiver certeza de algo, ___ claramente em vez de especular."',
    ["analista estratégico sênior", "20", "fusões e aquisições de empresas de tecnologia", "metodologia", "rigoroso e preciso", "evidências e fontes", "diga"],
    ["analista estratégico sênior", "20", "fusões e aquisições de empresas de tecnologia", "metodologia", "rigoroso e preciso", "evidências e fontes", "diga", "júnior", "1", "oculte"],
    "Definir o rigor e a metodologia do papel força o modelo a adotar um padrão de qualidade superior."
  ),
  quizStep(
    "Especialização do Role Prompt",
    "O que diferencia um Role Prompt especializado de um genérico no DeepSeek?",
    [
      "O tamanho da descrição do papel",
      "Usar termos técnicos específicos da área",
      "Incluir a metodologia de trabalho, o nível de rigor esperado e como o modelo deve lidar com incertezas — transformando o papel em uma persona completa e consistente",
      "Role Prompts genéricos e especializados geram resultados iguais no DeepSeek"
    ],
    2,
    "Quanto mais específico o comportamento esperado, mais o DeepSeek se alinha a essa expectativa profissional."
  ),
  textStep(
    "Técnica 4 — Decomposição de Problemas",
    "Para tarefas muito complexas, em vez de fazer uma pergunta enorme, você decompõe o problema em subproblemas menores e resolve cada um sequencialmente. O DeepSeek é especialmente bom nessa abordagem por sua capacidade de raciocínio estruturado."
  ),
  fillStep(
    "Decomponha o problema!",
    "Preencha a lacuna para dominar a técnica de decomposição.",
    '"O problema principal é: ___. Antes de resolver, ___ esse problema em ___ subproblemas menores e mais gerenciáveis. Resolva cada ___ separadamente com raciocínio completo e depois ___ as soluções em uma resposta final coerente."',
    ["como escalar meu negócio de R$50k para R$500k em 18 meses", "decomponha", "5", "subproblema", "integre"],
    ["como escalar meu negócio de R$50k para R$500k em 18 meses", "decomponha", "5", "subproblema", "integre", "resolva", "rapidamente", "ignore"],
    "Tratar um grande problema como uma sequência de pequenos desafios aumenta drasticamente a qualidade de cada etapa."
  ),
  quizStep(
    "Vantagem da Decomposição",
    "Por que decompor um problema complexo em partes menores melhora a resposta do DeepSeek?",
    [
      "Porque o DeepSeek tem limite de caracteres por resposta",
      "Para deixar a conversa mais longa e detalhada",
      "Porque cada subproblema recebe atenção e raciocínio dedicado — eliminando a tendência de respostas superficiais que acontece quando tudo é perguntado de uma vez",
      "Decomposição de problemas só funciona para questões técnicas"
    ],
    2,
    "A decomposição previne a fadiga do modelo e garante profundidade em cada aspect do problema."
  ),
  textStep(
    "Técnica 5 — Prompting com Restrições Deliberadas",
    "Restrições bem colocadas forçam o DeepSeek a ser mais criativo e preciso dentro de limites definidos. Em vez de respostas abertas e genéricas, você recebe soluções específicas e acionáveis."
  ),
  fillStep(
    "Adicione restrições estratégicas!",
    "Preencha a lacuna para calibrar o output com restrições profissionais.",
    '"Responda a pergunta abaixo com as seguintes restrições: máximo de ___ palavras, use apenas ___ como base para as recomendações, ___ jargões técnicos, apresente exatamente ___ opções e ordene por ___ de implementação. Pergunta: [sua pergunta]"',
    ["300", "dados e evidências verificáveis", "sem", "3", "facilidade"],
    ["300", "dados e evidências verificáveis", "sem", "3", "facilidade", "muitas", "opinião", "com"],
    "Restrições aguçam a inteligência do modelo ao remover o caminho mais fácil das respostas genéricas."
  ),
  quizStep(
    "Valor das Restrições",
    "Por que restrições deliberadas melhoram a qualidade das respostas do DeepSeek?",
    [
      "Porque o DeepSeek funciona melhor com menos liberdade criativa",
      "Para reduzir o tempo de processamento do modelo",
      "Porque restrições claras eliminam o espaço para respostas vagas e genéricas — forçando o modelo a ser preciso, direto e verdadeiramente útil dentro dos limites definidos",
      "Restrições sempre pioram a qualidade das respostas"
    ],
    2,
    "Limites claros obrigam a IA a focar no que é essencial e valioso."
  ),
  textStep(
    "Técnica 6 — Prompting Socrático",
    "Em vez de pedir respostas diretas, você usa o DeepSeek como um interlocutor intelectual — pedindo que ele questione suas premissas, identifique pontos cegos e faça perguntas que aprofundem seu raciocínio antes de concluir."
  ),
  fillStep(
    "Ative o modo socrático!",
    "Preencha a lacuna para transformar o modelo em seu treinador intelectual.",
    '"Quero analisar a seguinte ___: [descreva]. Em vez de me dar a resposta diretamente, faça ___ perguntas que ___ minhas premissas e me ajudem a enxergar ___ que não estou considerando. Só apresente sua ___ após eu responder cada pergunta."',
    ["decisão de negócio", "5", "questionem", "pontos cegos", "análise final"],
    ["decisão de negócio", "5", "questionem", "pontos cegos", "análise final", "conclusão", "3", "concordem"],
    "O método socrático exercita seu próprio pensamento crítico em parceria com a IA."
  ),
  quizStep(
    "Profundidade Socrática",
    "Por que o método socrático gera um resultado mais profundo do que pedir respostas diretas?",
    [
      "Porque o DeepSeek prefere fazer perguntas a responder diretamente",
      "Para tornar a conversa mais longa sem benefício real",
      "Porque as perguntas forçam você a examinar suas próprias premissas — e as conclusões que surgem desse processo têm muito mais profundidade e precisão do que uma resposta pronta",
      "O método socrático só funciona para questões filosóficas"
    ],
    2,
    "A melhor resposta costuma surgir quando você primeiro refina a qualidade da sua própria premissa."
  ),
  textStep(
    "Técnica 7 — Prompting com Perspectivas Múltiplas",
    "Pedir ao DeepSeek para analisar um problema sob perspectivas opostas ou complementares antes de concluir elimina vieses e entrega uma visão mais completa e equilibrada."
  ),
  fillStep(
    "Analise múltiplas perspectivas!",
    "Preencha a lacuna para ampliar sua visão estratégica.",
    '"Analise a situação abaixo sob ___ perspectivas completamente ___: a perspectiva de ___, a de ___ e a de ___. Para cada perspectiva, apresente os ___ e os ___ mais relevantes. Depois sintetize em uma ___ equilibrada."',
    ["3", "diferentes", "quem defende a ideia", "quem critica", "um observador neutro", "argumentos", "pontos fracos", "conclusão"],
    ["3", "diferentes", "quem defende a ideia", "quem critica", "um observador neutro", "argumentos", "pontos fracos", "conclusão", "iguais", "elogios"],
    "Ver o mesmo problema por diferentes ângulos neutraliza o viés de confirmação."
  ),
  quizStep(
    "Benefício das Perspectivas",
    "Qual situação se beneficia mais da técnica de perspectivas múltiplas no DeepSeek?",
    [
      "Tarefas criativas onde não existe certo ou errado",
      "Perguntas com respostas objetivas e únicas",
      "Decisões estratégicas, análises de risco e avaliações de projetos onde considerar apenas um ponto de vista pode levar a conclusões incompletas ou enviesadas",
      "Perspectivas múltiplas só funcionam em debates políticos e filosóficos"
    ],
    2,
    "A síntese de múltiplos pontos de vista é a base para uma tomada de decisão robusta."
  ),
  textStep(
    "Técnica 8 — Output Formatting Avançado",
    "O DeepSeek responde muito bem a instruções precisas de formato. Especificar exatamente como a resposta deve ser estruturada — tabelas, listas numeradas, hierarquias, seções — transforma a resposta em um documento profissional pronto para uso."
  ),
  fillStep(
    "Controle o formato da resposta!",
    "Preencha a lacuna para receber entregáveis prontos.",
    '"Responda a pergunta abaixo em formato ___ com as seguintes seções obrigatórias: ___ executivo em no máximo 3 linhas, análise ___ em tópicos numerados, ___ em formato de tabela com 3 colunas e ___ ordenadas por prioridade. Use ___ para separar cada seção."',
    ["estruturado de relatório", "resumo", "detalhada", "comparativo de opções", "recomendações finais", "títulos em negrito"],
    ["estruturado de relatório", "resumo", "detalhada", "comparativo de opções", "recomendações finais", "títulos em negrito", "texto", "vago", "rodapé"],
    "Um output bem formatado economiza horas de edição e transmite profissionalismo imediato."
  ),
  quizStep(
    "Importância do Formato",
    "Por que especificar o formato da resposta no DeepSeek é tão importante quanto a pergunta em si?",
    [
      "Porque o DeepSeek só entende prompts em formato estruturado",
      "Para deixar a resposta mais bonita visualmente",
      "Porque um formato bem definido transforma a resposta em um entregável profissional pronto para uso — eliminando o retrabalho de reorganizar e formatar o conteúdo depois",
      "O formato não influencia a qualidade do conteúdo gerado"
    ],
    2,
    "Formato é função: ele dita como o valor da informação será consumido e aplicado."
  ),
  textStep(
    "Técnica 9 — Prompting Iterativo com Autocrítica",
    "Uma das técnicas mais poderosas é pedir ao DeepSeek para gerar uma resposta, depois criticar sua própria resposta identificando fraquezas, e então reescrever uma versão melhorada. Isso cria um ciclo de melhoria automática."
  ),
  fillStep(
    "Ative a autocrítica!",
    "Preencha a lacuna para habilitar o ciclo de melhoria contínua.",
    '"Responda a seguinte pergunta: [sua pergunta]. Depois de responder, ___ sua própria resposta identificando: o que está ___, o que poderia ser mais ___ e o que está ___. Por fim, reescreva uma versão ___ incorporando todas as melhorias identificadas."',
    ["critique", "incompleto ou vago", "preciso e fundamentado", "faltando", "aprimorada"],
    ["critique", "incompleto ou vago", "preciso e fundamentado", "faltando", "aprimorada", "aplauda", "perfeito", "cheio"],
    "Pedir que o modelo critique a si mesmo remove as primeiras camadas de respostas óbvias ou superficiais."
  ),
  quizStep(
    "Valor da Autocrítica",
    "Por que pedir ao DeepSeek para criticar sua própria resposta antes de reescrever gera resultados superiores?",
    [
      "Porque o DeepSeek sempre erra na primeira tentativa",
      "Para gastar mais tokens e gerar respostas mais longas",
      "Porque o modelo identifica suas próprias lacunas com precisão — e a versão reescrita incorpora melhorias que você mesmo poderia não ter percebido ao pedir um refinamento externo",
      "Autocrítica não influencia a qualidade da versão final"
    ],
    2,
    "A autocrítica é o atalho mais rápido para a excelência na interação com IAs avançadas."
  ),
  textStep(
    "Técnica 10 — Context Injection Estratégico",
    "Injetar contexto rico e específico antes de fazer a pergunta principal é especialmente poderoso no DeepSeek — porque o modelo usa esse contexto como base para todo o raciocínio subsequente."
  ),
  fillStep(
    "Injete contexto estratégico!",
    "Preencha a lacuna para dar profundidade ao modelo.",
    '"Contexto: ___. Restrições: ___. Objetivo final: ___. Tentativas anteriores: ___. Com base em tudo isso, analise a situação com ___ e me apresente as ___ mais viáveis considerando as restrições informadas."',
    ["sou fundador de uma startup com 8 funcionários, R$200k em receita anual e 18 meses de runway", "orçamento limitado, sem investimento externo e equipe pequena", "alcançar R$1M de receita em 12 meses", "já tentamos escalar via anúncios pagos sem ROI positivo", "profundidade e rigor", "3 estratégias"],
    ["sou fundador de uma startup com 8 funcionários", "orçamento limitado", "alcançar R$1M", "tentamos escalar", "profundidade e rigor", "3 estratégias", "baixo nível", "sem foco"],
    "Quanto mais o modelo sabe sobre sua realidade específica, menos ele precisa 'adivinhar' e mais ele pode 'analisar'."
  ),
  quizStep(
    "Poder do Contexto",
    "Por que o Context Injection é especialmente eficaz no DeepSeek?",
    [
      "Porque o DeepSeek acessa dados externos com base no contexto fornecido",
      "Para deixar o prompt mais longo e impressionante",
      "Porque o DeepSeek usa cada informação do contexto como variável no seu raciocínio — quanto mais rico e específico o contexto, mais precisa e personalizada será a análise",
      "Context Injection só funciona para perguntas técnicas e de programação"
    ],
    2,
    "Contexto é a matéria-prima do raciocínio. Sem ele, o modelo está apenas processando palavras; com ele, está resolvendo SEU problema."
  ),
  textStep(
    "Combinando Técnicas — O Prompt Definitivo",
    "A verdadeira maestria está em combinar múltiplas técnicas no mesmo prompt. Veja como isso funciona na prática."
  ),
  quizStep(
    "O Combo Vencedor",
    "Qual combinação de técnicas gera o prompt mais poderoso para uma análise estratégica no DeepSeek?",
    [
      "Fazer uma pergunta direta sem contexto ou estrutura",
      "Usar apenas Role Prompting sem nenhuma outra técnica",
      "Combinar Role Prompting especializado com Context Injection, Chain of Thought visível, perspectivas múltiplas e Output Formatting definido — cada técnica potencializando as demais",
      "Quanto mais simples o prompt, melhor o resultado no DeepSeek"
    ],
    2,
    "A união de técnicas cria um cercado lógico que obriga o modelo a entregar o nível máximo de inteligência."
  ),
  fillStep(
    "Monte o prompt definitivo!",
    "Preencha a lacuna para criar uma estrutura de prompt de elite.",
    '"Você é um ___. Contexto: ___. Analise ___ passo a passo sob ___ perspectivas diferentes. Para cada perspectiva mostre o ___ completo antes de concluir. Ao final critique sua própria análise e apresente o resultado em formato de ___ com seções bem definidas."',
    ["consultor estratégico sênior especializado em expansão de negócios", "dados completos da sua empresa e do mercado", "o problema", "3", "raciocínio", "relatório executivo"],
    ["consultor estratégico sênior especializado em expansão de negócios", "dados completos da sua empresa e do mercado", "o problema", "3", "raciocínio", "relatório executivo", "estudante", "texto básico", "nada"],
    "Dominar esta estrutura é como ter um consultor de elite disponível 24 horas por dia."
  ),
  quizStep(
    "Erro Comum",
    "Qual é o erro mais comum ao tentar aplicar técnicas avançadas no DeepSeek?",
    [
      "Fornecer contexto demais antes da pergunta principal",
      "Pedir raciocínio passo a passo em tarefas analíticas",
      "Usar técnicas avançadas sem um objetivo claro — acumulando estrutura sem propósito e tornando o prompt confuso em vez de mais preciso",
      "Combinar mais de uma técnica no mesmo prompt"
    ],
    2,
    "A técnica deve servir ao objetivo, não se tornar o objetivo principal."
  ),
  textStep(
    "Conclusión",
    "DeepSeek responde de forma extraordinaria a prompts bien construidos — especialmente cuando activas su razonamiento profundo, descompones problemas complejos, inyectas un contexto rico y exiges autocrítica antes de la respuesta final. Las técnicas de esta lección no son solo recursos avanzados — son el estándar de uso para quienes quieren extraer resultados profesionales y consistentes del modelo.\n\nDominar estas técnicas te sitúa en un nivel completamente diferente al de la mayoría de los usuarios — que todavía preguntan de forma vaga y aceptan el primer resultado sin cuestionar.\n\nMejores prompts. Razonamiento más profundo. Resultados superiores.\n\nLección completada ✓"
  ),
];

export const DEEPSEEK_MODULE_2_STEPS_FR = [
  textStep(
    "Techniques Avancées de Prompt pour DeepSeek",
    "Bienvenue de retour ! Dans cette leçon, vous maîtriserez les techniques de prompt avancées spécifiques pour extraire le maximum de DeepSeek — en explorant son raisonnement profond, sa capacité analytique et sa précision logique de manière stratégique et professionnelle."
  ),
  textStep(
    "Pourquoi DeepSeek Répond Différemment aux Prompts",
    "DeepSeek — particulièrement R1 — a été entraîné en mettant l'accent sur le raisonnement structuré et la précision logique. Cela signifie qu'il répond différemment à des prompts bien construits. Plus vous structurez votre pensée dans le prompt, plus le résultat sera puissant et précis."
  ),
  quizStep(
    "Activation du Potentiel",
    "Pourquoi les techniques de prompt avancées fonctionnent-elles mieux dans DeepSeek que les questions simples ?",
    [
      "Parce que DeepSeek a été entraîné pour raisonner en profondeur — et des prompts bien structurés activent ce potentiel bien plus efficacement que des questions vagues",
      "Parce que DeepSeek ignore automatiquement les prompts courts",
      "Les techniques avancées ne fonctionnent que pour les utilisateurs ayant des connaissances techniques en IA",
      "La façon dont vous structurez le prompt dans DeepSeek ne fait aucune différence"
    ],
    0,
    "La structure du prompt fonctionne comme une carte qui guide le moteur de raisonnement profond de DeepSeek vers les meilleurs résultats."
  ),
  textStep(
    "Technique 1 — Raisonnement en Chaîne (Chain of Thought)",
    "DeepSeek R1 a été spécifiquement développé pour raisonner étape par étape. Lui demander explicitement de montrer chaque étape de sa réflexion avant de conclure augmente considérablement la précision — surtout pour les tâches complexes."
  ),
  fillStep(
    "Activez le Chain of Thought !",
    "Complétez le vide pour activer le raisonnement étape par étape de manière professionnelle.",
    '"Avant de répondre, ___ votre raisonnement ___. Identifiez les ___ impliquées, considérez les ___ possibles, évaluez l\'___ de chacune et présentez alors seulement la ___ finale avec une justification claire."',
    ["montrez", "étape par étape", "variables principales", "approches", "impact et la faisabilité", "conclusion"],
    ["montrez", "étape par étape", "variables principales", "approches", "impact et la faisabilité", "conclusion", "cachez", "court", "idées"],
    "Demander au modèle de montrer son processus de réflexion expose la logique et permet une validation bien supérieure."
  ),
  quizStep(
    "Avantage du Chain of Thought",
    "Quel est le principal avantage de l'activation du Chain of Thought dans DeepSeek R1 ?",
    [
      "Pour rendre la réponse plus longue et plus détaillée",
      "Parce que DeepSeek ne fonctionne qu'avec un raisonnement visible",
      "Parce que vous suivez chaque étape de la réflexion du modèle — pouvant identifier où questionner, où ajuster et où approfondir avant d'accepter la conclusion finale",
      "Le Chain of Thought ne fonctionne que pour les problèmes mathématiques"
    ],
    2,
    "Le Chain of Thought transforme l'IA d'une boîte noire en un collaborateur transparent."
  ),
  textStep(
    "Technique 2 — Self-Consistency Prompting",
    "Cette technique consiste à demander à DeepSeek de résoudre le même problème de plusieurs manières indépendantes, puis d'identifier la solution qui apparaît le plus systématiquement. Elle est particulièrement puissante pour les décisions importantes où vous souhaitez minimiser les erreurs."
  ),
  fillStep(
    "Utilisez le Self-Consistency !",
    "Complétez le vide pour mettre en œuvre la technique de cohérence propre.",
    '"Résolvez le problème ci-dessous de ___ manières complètement ___, sans utiliser le raisonnement de l\'une pour influencer l\'autre. Ensuite ___ les résultats, identifiez où les solutions ___ et quelle approche apparaît comme la plus ___ et fiable."',
    ["3", "indépendantes", "comparez", "convergent", "cohérente"],
    ["3", "indépendantes", "comparez", "convergent", "cohérente", "égales", "rapides", "confuses"],
    "La cohérence entre plusieurs chemins de raisonnement est un indicateur fort d'une réponse correcte et fiable."
  ),
  quizStep(
    "Usage du Self-Consistency",
    "Dans quelles situations le Self-Consistency Prompting est-il le plus précieux ?",
    [
      "Pour des tâches créatives où il n'y a pas de bonne réponse",
      "Quand vous avez besoin d'une réponse rapide sans profondeur",
      "Dans les décisions importantes, les analyses complexes et les problèmes logiques où un seul chemin de raisonnement peut contenir des biais ou des erreurs inaperçues",
      "Le Self-Consistency ne fonctionne que pour les problèmes mathématiques"
    ],
    2,
    "Pour les décisions à fort impact, valider la cohérence par plusieurs chemins de pensée est une pratique d'élite."
  ),
  textStep(
    "Technique 3 — Role Prompting Spécialisé",
    "Comme pour d'autres modèles, attribuer un rôle à DeepSeek améliore la qualité des réponses. Mais dans DeepSeek, le rôle doit être très spécifique — incluant la méthodologie de travail, le niveau de rigueur et la manière de présenter les conclusions."
  ),
  fillStep(
    "Créez un rôle spécialisé !",
    "Complétez le vide pour créer une persona professionnelle et rigoureuse.",
    '"Vous êtes un ___ avec ___ ans d\'expérience en ___. Vous travaillez avec une ___ basée sur les données, vous êtes ___ dans vos conclusions et présentez toujours des ___ pour chaque affirmation que vous faites. Quand vous n\'êtes pas sûr de quelque chose, ___ clairement au lieu de spéculer."',
    ["analyste stratégique senior", "20", "fusions et acquisitions d'entreprises technologiques", "méthodologie", "rigoureux et précis", "preuves et des sources", "dites-le"],
    ["analyste stratégique senior", "20", "fusions et acquisitions d'entreprises technologiques", "méthodologie", "rigoureux et précis", "preuves et des sources", "dites-le", "junior", "1", "cachez"],
    "Définir la rigueur et la méthodologie du rôle oblige le modèle à adopter un standard de qualité supérieur."
  ),
  quizStep(
    "Spécialisation du Role Prompt",
    "Qu'est-ce qui différencie un Role Prompt spécialisé d'un générique dans DeepSeek ?",
    [
      "La longueur de la description du rôle",
      "L'utilisation de termes techniques spécifiques au domaine",
      "L'inclusion de la méthodologie de travail, du niveau de rigueur attendu et de la manière dont le modèle doit gérer les incertitudes — transformant le rôle en une persona complète et cohérente",
      "Les Role Prompts génériques et spécialisés génèrent des résultats identiques dans DeepSeek"
    ],
    2,
    "Plus le comportement attendu est spécifique, plus DeepSeek s'aligne sur cette attente professionnelle."
  ),
  textStep(
    "Technique 4 — Décomposition de Problèmes",
    "Pour les tâches très complexes, au lieu de poser une question immense, vous décomposez le problème en sous-problèmes plus petits et résolvez chacun de manière séquentielle. DeepSeek est particulièrement performant dans cette approche grâce à sa capacité de raisonnement structuré."
  ),
  fillStep(
    "Décomposez le problème !",
    "Complétez le vide pour maîtriser la technique de décomposition.",
    '"Le problème principal est : ___. Avant de résoudre, ___ ce problème en ___ sous-problèmes plus petits et plus gérables. Résolvez chaque ___ séparément avec un raisonnement complet, puis ___ les solutions dans une réponse finale cohérente."',
    ["comment faire passer mon entreprise de 50k$ à 500k$ en 18 mois", "décomposez", "5", "sous-problème", "intégrez"],
    ["comment faire passer mon entreprise de 50k$ à 500k$ en 18 mois", "décomposez", "5", "sous-problème", "intégrez", "résolvez", "rapidement", "ignorez"],
    "Traiter un gros problème comme une séquence de petits défis augmente considérablement la qualité de chaque étape."
  ),
  quizStep(
    "Avantage de la Décomposition",
    "Pourquoi décomposer un problème complexe en parties plus petites améliore-t-il la réponse de DeepSeek ?",
    [
      "Parce que DeepSeek a une limite de caractères par réponse",
      "Pour rendre la conversation plus longue et plus détaillée",
      "Parce que chaque sous-problème reçoit une attention et un raisonnement dédiés — éliminant la tendance aux réponses superficielles qui arrive quand tout est demandé à la fois",
      "La décomposition de problèmes ne fonctionne que pour les questions techniques"
    ],
    2,
    "La décomposition prévient la fatigue du modèle et garantit la profondeur dans chaque aspect du problème."
  ),
  textStep(
    "Technique 5 — Prompting avec Contraintes Délibérées",
    "Des contraintes bien placées obligent DeepSeek à être plus créatif et précis dans des limites définies. Au lieu de réponses ouvertes et génériques, vous recevez des solutions spécifiques et exploitables."
  ),
  fillStep(
    "Ajoutez des contraintes stratégiques !",
    "Complétez le vide pour calibrer la sortie avec des contraintes professionnelles.",
    '"Répondez à la question ci-dessous avec les contraintes suivantes : maximum de ___ mots, utilisez uniquement ___ comme base pour les recommandations, ___ jargon technique, présentez exactement ___ options et ordonnez par ___ de mise en œuvre. Question : [votre question]"',
    ["300", "données et preuves vérifiables", "sans", "3", "facilité"],
    ["300", "données et preuves vérifiables", "sans", "3", "facilité", "beaucoup de", "opinion", "avec"],
    "Les contraintes aiguisent l'intelligence du modèle en supprimant le chemin facile des réponses génériques."
  ),
  quizStep(
    "Valeur des Contraintes",
    "Pourquoi des contraintes délibérées améliorent-elles la qualité des réponses de DeepSeek ?",
    [
      "Parce que DeepSeek fonctionne mieux avec moins de liberté créative",
      "Pour réduire le temps de traitement du modèle",
      "Parce que des contraintes claires éliminent l'espace pour les réponses vagues et génériques — obligeant le modèle à être précis, direct et véritablement utile dans les limites définies",
      "Les contraintes aggravent toujours la qualité des réponses"
    ],
    2,
    "Des limites claires obligent l'IA à se concentrer sur ce qui est essentiel et précieux."
  ),
  textStep(
    "Technique 6 — Prompting Socratique",
    "Plutôt que de demander des réponses directes, vous utilisez DeepSeek comme un interlocuteur intellectuel — en lui demandant de remettre en question vos prémisses, d'identifier les angles morts et de poser des questions qui approfondissent votre raisonnement avant de conclure."
  ),
  fillStep(
    "Activez le mode socratique !",
    "Complétez le vide pour transformer le modèle en votre coach intellectuel.",
    '"Je veux analyser la ___ suivante : [décrire]. Au lieu de me donner la réponse directement, posez ___ questions qui ___ mes prémisses et m\'aident à voir les ___ que je ne considère pas. Présentez votre ___ seulement après que j\'aie répondu à chaque question."',
    ["décision commerciale", "5", "remettent en question", "angles morts", "analyse finale"],
    ["décision commerciale", "5", "remettent en question", "angles morts", "analyse finale", "conclusion", "3", "approuvent"],
    "La méthode socratique exerce votre propre esprit critique en partenariat avec l'IA."
  ),
  quizStep(
    "Profondeur Socratique",
    "Pourquoi la méthode socratique génère-t-elle un résultat plus profond que de demander des réponses directes ?",
    [
      "Parce que DeepSeek préfère poser des questions plutôt que de répondre directement",
      "Pour rallonger la conversation sans réel bénéfice",
      "Parce que les questions vous obligent à examiner vos propres prémisses — et les conclusions qui émergent de ce processus ont beaucoup plus de profondeur et de précision qu'une réponse toute faite",
      "La méthode socratique ne fonctionne que pour les questions philosophiques"
    ],
    2,
    "La meilleure réponse surgit généralement lorsque vous affinez d'abord la qualité de votre propre prémisse."
  ),
  textStep(
    "Technique 7 — Prompting avec Perspectives Multiples",
    "Demander à DeepSeek d'analyser un problème sous des perspectives opposées ou complémentaires avant de conclure élimine les biais et livre une vision plus complète et équilibrée."
  ),
  fillStep(
    "Analysez plusieurs perspectives !",
    "Complétez le vide pour élargir votre vision stratégique.",
    '"Analysez la situation ci-dessous sous ___ perspectives complètement ___ : la perspective de ___, celle de ___ et celle d\'___. Pour chaque perspective, présentez les ___ et les ___ les plus pertinents. Synthétisez ensuite en une ___ équilibrée."',
    ["3", "différentes", "celui qui défend l'idée", "celui qui la critique", "un observateur neutre", "arguments", "points faibles", "conclusion"],
    ["3", "différentes", "celui qui défend l'idée", "celui qui la critique", "un observateur neutre", "arguments", "points faibles", "conclusion", "identiques", "éloges"],
    "Voir le même problème sous différents angles neutralise le biais de confirmation."
  ),
  quizStep(
    "Bénéfice des Perspectives",
    "Quelle situation bénéficie le plus de la technique des perspectives multiples dans DeepSeek ?",
    [
      "Les tâches créatives où il n'y a ni vrai ni faux",
      "Les questions avec des réponses objectives et uniques",
      "Les décisions stratégiques, les analyses de risques et les évaluations de projets où ne considérer qu'un seul point de vue peut mener à des conclusions incomplètes ou biaisées",
      "Les perspectives multiples ne fonctionnent que dans les débats politiques et philosophiques"
    ],
    2,
    "La synthèse de multiples points de vue est la base d'une prise de décision robuste."
  ),
  textStep(
    "Technique 8 — Output Formatting Avancé",
    "DeepSeek répond très bien à des instructions de format précises. Spécifier exactement comment la réponse doit être structurée — tableaux, listes numérotées, hiérarchies, sections — transforme la réponse en un document professionnel prêt à l'emploi."
  ),
  fillStep(
    "Contrôlez le format de la réponse !",
    "Complétez le vide pour recevoir des livrables prêts à l'emploi.",
    '"Répondez à la question ci-dessous au format ___ avec les sections obligatoires suivantes : ___ exécutif en 3 lignes maximum, analyse ___ en points numérotés, ___ sous forme de tableau à 3 colonnes et ___ finales ordonnées par priorité. Utilisez des ___ pour séparer chaque section."',
    ["rapport structuré", "résumé", "détaillée", "comparatif d'options", "recommandations", "titres en gras"],
    ["rapport structuré", "résumé", "détaillée", "comparatif d'options", "recommandations", "titres en gras", "texte", "vague", "bas de page"],
    "Une sortie bien formatée fait gagner des heures d'édition et transmet un professionnalisme immédiat."
  ),
  quizStep(
    "Importance du Format",
    "Pourquoi spécifier le format de la réponse dans DeepSeek est-il aussi important que la question elle-même ?",
    [
      "Parce que DeepSeek ne comprend que les prompts au format structuré",
      "Pour rendre la réponse plus belle visuellement",
      "Parce qu'un format bien défini transforme la réponse en un livrable professionnel prêt à l'emploi — éliminant le travail de réorganisation et de formatage du contenu après coup",
      "Le format n'influence pas la qualité du contenu généré"
    ],
    2,
    "Le format est une fonction : il dicte comment la valeur de l'information sera consommée et appliquée."
  ),
  textStep(
    "Technique 9 — Prompting Itératif avec Autocritique",
    "L'une des techniques les plus puissantes consiste à demander à DeepSeek de générer une réponse, puis de critiquer sa propre réponse en identifiant ses faiblesses, et enfin de réécrire une version améliorée. Cela crée un cycle d'amélioration automatique."
  ),
  fillStep(
    "Activez l'autocritique !",
    "Complétez le vide pour activer le cycle d'amélioration continue.",
    '"Répondez à la question suivante : [votre question]. Après avoir répondu, ___ votre propre réponse en identifiant : ce qui est ___, ce qui pourrait être plus ___ et ce qui ___. Enfin, réécrivez une version ___ intégrant toutes les améliorations identifiées."',
    ["critiquez", "incomplet ou vague", "précis et argumenté", "manque", "améliorée"],
    ["critiquez", "incomplet ou vague", "précis et argumenté", "manque", "améliorée", "applaudissez", "parfait", "plein"],
    "Demander au modèle de se critiquer lui-même supprime les premières couches de réponses évidentes ou superficielles."
  ),
  quizStep(
    "Valeur de l'Autocritique",
    "Pourquoi demander à DeepSeek de critiquer sa propre réponse avant de la réécrire génère-t-il des résultats supérieurs ?",
    [
      "Parce que DeepSeek se trompe toujours au premier essai",
      "Pour dépenser plus de tokens et générer des réponses plus longues",
      "Parce que le modèle identifie ses propres lacunes avec précision — et la version réécrite intègre des améliorations que vous n'auriez peut-être pas perçues vous-même en demandant un affinement externe",
      "L'autocritique n'influence pas la qualité de la version finale"
    ],
    2,
    "L'autocritique est le raccourci le plus rapide vers l'excellence dans l'interaction avec des IA avancées."
  ),
  textStep(
    "Technique 10 — Context Injection Stratégique",
    "Injecter un contexte riche et spécifique avant de poser la question principale est particulièrement puissant dans DeepSeek — car le modèle utilise ce contexte comme base pour tout son raisonnement ultérieur."
  ),
  fillStep(
    "Injectez un contexte stratégique !",
    "Complétez le vide pour donner de la profondeur au modèle.",
    '"Contexte : ___. Contraintes : ___. Objectif principal : ___. Tentatives précédentes : ___. Sur la base de tout cela, analysez la situation avec ___ et présentez-moi les ___ les plus viables compte tenu des contraintes fournies."',
    ["je suis le fondateur d'une startup avec 8 employés, 200k$ de CA annuel et 18 mois de trésorerie", "budget limité, pas d'investissement externe et petite équipe", "atteindre 1M$ de CA en 12 mois", "nous avons déjà essayé de passer à l'échelle via des publicités payantes sans ROI positif", "profondeur et rigueur", "3 stratégies"],
    ["je suis le fondateur d'une startup", "budget limité", "atteindre 1M$", "essayé de passer à l'échelle", "profondeur et rigueur", "3 stratégies", "bas niveau", "sans focus"],
    "Plus le modèle en sait sur votre réalité spécifique, moins il a besoin de 'deviner' et plus il peut 'analyser'."
  ),
  quizStep(
    "Pouvoir du Contexte",
    "Pourquoi le Context Injection est-il particulièrement efficace dans DeepSeek ?",
    [
      "Parce que DeepSeek accède à des données externes sur la base du contexte fourni",
      "Pour rendre le prompt plus long et plus impressionnant",
      "Parce que DeepSeek utilise chaque information du contexte comme variable dans son raisonnement — plus le contexte est riche et spécifique, plus l'analyse sera précise et personnalisée",
      "Le Context Injection ne fonctionne que pour les questions techniques et de programmation"
    ],
    2,
    "Le contexte est la matière première du raisonnement. Sans lui, le modèle ne fait que traiter des mots ; avec lui, il résout VOTRE problème."
  ),
  textStep(
    "Combinaison de Techniques — Le Prompt Ultime",
    "La véritable maîtrise réside dans la combinaison de plusieurs techniques dans le même prompt. Voyez comment cela fonctionne en pratique."
  ),
  quizStep(
    "Le Combo Gagnant",
    "Quelle combinaison de techniques génère le prompt le plus puissant pour une analyse stratégique dans DeepSeek ?",
    [
      "Poser une question directe sans contexte ni structure",
      "Utiliser uniquement le Role Prompting sans aucune autre technique",
      "Combiner le Role Prompting spécialisé avec le Context Injection, le Chain of Thought visible, les perspectives multiples et l'Output Formatting défini — chaque technique renforçant les autres",
      "Plus le prompt est simple, meilleur est le résultat dans DeepSeek"
    ],
    2,
    "L'union des techniques crée un cadre logique qui oblige le modèle à livrer le niveau maximal d'intelligence."
  ),
  fillStep(
    "Montez le prompt ultime !",
    "Complétez le vide pour créer une structure de prompt d'élite.",
    '"Vous êtes un ___. Contexte : ___. Analysez ___ étape par étape sous ___ perspectives différentes. Pour chaque perspective, montrez le ___ complet avant de conclure. Enfin, critiquez votre propre analyse et présentez le résultat sous forme de ___ exécutif avec des sections bien définies."',
    ["consultant stratégique senior spécialisé dans l'expansion des entreprises", "données complètes de votre entreprise et du marché", "le problème", "3", "raisonnement", "rapport"],
    ["consultant stratégique senior spécialisé dans l'expansion des entreprises", "données complètes de votre entreprise et du marché", "le problème", "3", "raisonnement", "rapport", "étudiant", "texte basique", "rien"],
    "Maîtriser cette structure, c'est comme avoir un consultant d'élite disponible 24 heures sur 24."
  ),
  quizStep(
    "Erreur Commune",
    "Quelle est l'erreur la plus courante lors de l'application de techniques avancées dans DeepSeek ?",
    [
      "Fournir trop de contexte avant la question principale",
      "Demander un raisonnement étape par étape pour des tâches analytiques",
      "Utiliser des techniques avancées sans objectif clair — en accumulant de la structure sans but et en rendant le prompt confus plutôt qu'au plus précis",
      "Combiner plus d'une technique dans le même prompt"
    ],
    2,
    "La technique doit servir l'objectif, pas devenir l'objectif principal."
  ),
  textStep(
    "Conclusion",
    "DeepSeek répond de manière extraordinaire à des prompts bien construits — surtout quand vous activez son raisonnement profond, décomposez des problèmes complexes, injectez un contexte riche et exigez une autocritique avant la réponse finale. Les techniques de cette leçon ne sont pas seulement des fonctionnalités avancées — elles sont la norme d'utilisation pour ceux qui veulent extrair des résultats professionnels et cohérents du modèle.\n\nMaîtriser ces techniques vous place à un niveau complètement différent de la majorité des utilisateurs — qui posent encore des questions vagues et acceptent le premier résultat sans sourciller.\n\nMeilleurs prompts. Raisonnement plus profond. Résultats supérieurs.\n\nLeçon terminée ✓"
  ),
];


export const DEEPSEEK_MODULE_2_STEPS_EN = [
  textStep(
    "Advanced Prompting Techniques for DeepSeek",
    "Welcome back! In this lesson, you will master the specific advanced prompting techniques to extract the maximum from DeepSeek — exploring its deep reasoning, analytical capacity, and logical precision in a strategic and professional way."
  ),
  textStep(
    "Why DeepSeek Responds Differently to Prompts",
    "DeepSeek — especially R1 — was trained with a focus on structured reasoning and logical precision. This means it responds differently to well-constructed prompts. The more you structure your thinking in the prompt, the more powerful and precise the result will be."
  ),
  quizStep(
    "Activating the Potential",
    "Why do advanced prompting techniques work better in DeepSeek than simple questions?",
    [
      "Because DeepSeek was trained to reason in depth — and well-structured prompts activate this potential much more effectively than vague questions",
      "Because DeepSeek ignores short prompts automatically",
      "Advanced techniques only work for users with technical knowledge in AI",
      "It makes no difference how you structure the prompt in DeepSeek"
    ],
    0,
    "The prompt structure works as a map that guides DeepSeek's deep reasoning engine to the best results."
  ),
  textStep(
    "Technique 1 — Chain of Thought",
    "DeepSeek R1 was specifically developed to reason step-by-step. Explicitly asking it to show each step of the thought process before concluding drastically increases precision — especially in complex tasks."
  ),
  fillStep(
    "Activate Chain of Thought!",
    "Fill in the gap to activate step-by-step reasoning professionally.",
    '"Before answering, ___ your reasoning ___. Identify the ___ involved, consider the possible ___, evaluate the ___ of each, and only then present the final ___ with clear justification."',
    ["show", "step-by-step", "main variables", "approaches", "impact and feasibility", "conclusion"],
    ["show", "step-by-step", "main variables", "approaches", "impact and feasibility", "conclusion", "hide", "short", "ideas"],
    "Asking the model to show the thinking process exposes the logic and allows for much superior validation."
  ),
  quizStep(
    "Advantage of Chain of Thought",
    "What is the main advantage of activating Chain of Thought in DeepSeek R1?",
    [
      "To make the response longer and more detailed",
      "Because DeepSeek only works with visible reasoning",
      "Because you follow each step of the model's thinking — being able to identify where to question, where to adjust, and where to deepen before accepting the final conclusion",
      "Chain of Thought only works for mathematical problems"
    ],
    2,
    "Chain of Thought transforms the AI from a black box into a transparent collaborator."
  ),
  textStep(
    "Technique 2 — Self-Consistency Prompting",
    "This technique consists of asking DeepSeek to solve the same problem in multiple independent ways and then identifying which solution appears most consistently. It is especially powerful for important decisions where you want to minimize errors."
  ),
  fillStep(
    "Use Self-Consistency!",
    "Fill in the gap to implement the self-consistency technique.",
    '"Solve the problem below in ___ completely ___ ways, without using the reasoning of one to influence the other. Then ___ the results, identify where the solutions ___ and which approach appears as more ___ and reliable."',
    ["3", "independent", "compare", "converge", "consistent"],
    ["3", "independent", "compare", "converge", "consistent", "equal", "fast", "confusing"],
    "Consistency between multiple paths of reasoning is a strong indicator of a correct and reliable answer."
  ),
  quizStep(
    "Use of Self-Consistency",
    "In which situations is Self-Consistency Prompting most valuable?",
    [
      "For creative tasks where there is no right answer",
      "When you need a quick answer without depth",
      "In important decisions, complex analyses, and logical problems where a single path of reasoning may contain biases or unperceived errors",
      "Self-Consistency only works for mathematical problems"
    ],
    2,
    "For high-impact decisions, validating consistency through multiple thought paths is an elite practice."
  ),
  textStep(
    "Technique 3 — Specialized Role Prompting",
    "Just like in other models, assigning a role to DeepSeek improves the quality of responses. But in DeepSeek, the role must be highly specific — including work methodology, level of rigor, and how to present conclusions."
  ),
  fillStep(
    "Create a specialized role!",
    "Fill in the gap to create a professional and rigorous persona.",
    '"You are a ___ with ___ years of experience in ___. You work with data-based ___, you are ___ in your conclusions and always present ___ for each statement you make. When you are not sure about something, ___ it clearly instead of speculating."',
    ["senior strategic analyst", "20", "technology company mergers and acquisitions", "methodology", "rigorous and precise", "evidence and sources", "say"],
    ["senior strategic analyst", "20", "technology company mergers and acquisitions", "methodology", "rigorous and precise", "evidence and sources", "say", "junior", "1", "hide"],
    "Defining the rigor and methodology of the role forces the model to adopt a higher quality standard."
  ),
  quizStep(
    "Role Prompt Specialization",
    "What differentiates a specialized Role Prompt from a generic one in DeepSeek?",
    [
      "The length of the role description",
      "Using technical terms specific to the field",
      "Including the work methodology, expected level of rigor, and how the model should deal with uncertainties — transforming the role into a complete and consistent persona",
      "Generic and specialized Role Prompts generate equal results in DeepSeek"
    ],
    2,
    "The more specific the expected behavior, the more DeepSeek aligns with that professional expectation."
  ),
  textStep(
    "Technique 4 — Problem Decomposition",
    "For very complex tasks, instead of asking a huge question, you decompose the problem into smaller subproblems and solve each sequentially. DeepSeek is especially good at this approach because of its structured reasoning capacity."
  ),
  fillStep(
    "Decompose the problem!",
    "Fill in the gap to master the decomposition technique.",
    '"The main problem is: ___. Before solving, ___ this problem into ___ smaller and more manageable subproblems. Solve each ___ separately with complete reasoning and then ___ the solutions into a coherent final answer."',
    ["how to scale my business from $50k to $500k in 18 months", "decompose", "5", "subproblem", "integrate"],
    ["how to scale my business from $50k to $500k in 18 months", "decompose", "5", "subproblem", "integrate", "solve", "quickly", "ignore"],
    "Treating a large problem as a sequence of small challenges drastically increases the quality of each step."
  ),
  quizStep(
    "Advantage of Decomposition",
    "Why does decomposing a complex problem into smaller parts improve DeepSeek's response?",
    [
      "Because DeepSeek has a character limit per response",
      "To make the conversation longer and more detailed",
      "Because each subproblem receives dedicated attention and reasoning — eliminating the tendency for superficial responses that happens when everything is asked at once",
      "Problem decomposition only works for technical questions"
    ],
    2,
    "Decomposition prevents model fatigue and ensures depth in each aspect of the problem."
  ),
  textStep(
    "Technique 5 — Prompting with Deliberate Constraints",
    "Well-placed constraints force DeepSeek to be more creative and precise within defined limits. Instead of open and generic responses, you receive specific and actionable solutions."
  ),
  fillStep(
    "Add strategic constraints!",
    "Fill in the gap to calibrate the output with professional constraints.",
    '"Answer the question below with the following constraints: maximum of ___ words, use only ___ as a basis for recommendations, ___ technical jargon, present exactly ___ options, and order by ___ of implementation. Question: [your question]"',
    ["300", "verifiable data and evidence", "no", "3", "ease"],
    ["300", "verifiable data and evidence", "no", "3", "ease", "many", "opinion", "with"],
    "Constraints sharpen the model's intelligence by removing the easy path of generic responses."
  ),
  quizStep(
    "Value of Constraints",
    "Why do deliberate constraints improve the quality of DeepSeek's responses?",
    [
      "Because DeepSeek works better with less creative freedom",
      "To reduce the model's processing time",
      "Because clear constraints eliminate the space for vague and generic responses — forcing the model to be precise, direct, and truly useful within the defined limits",
      "Constraints always worsen the quality of responses"
    ],
    2,
    "Clear limits force the AI to focus on what is essential and valuable."
  ),
  textStep(
    "Technique 6 — Socratic Prompting",
    "Instead of asking for direct answers, you use DeepSeek as an intellectual interlocutor — asking it to question your premises, identify blind spots, and ask questions that deepen your reasoning before concluding."
  ),
  fillStep(
    "Activate Socratic mode!",
    "Fill in the gap to turn the model into your intellectual coach.",
    '"I want to analyze the following ___: [describe]. Instead of giving me the answer directly, ask ___ questions that ___ my premises and help me see ___ that I\'m not considering. Only present your ___ after I answer each question."',
    ["business decision", "5", "question", "blind spots", "final analysis"],
    ["business decision", "5", "question", "blind spots", "final analysis", "conclusion", "3", "agree with"],
    "The Socratic method exercises your own critical thinking in partnership with the AI."
  ),
  quizStep(
    "Socratic Depth",
    "Why does the Socratic method generate a deeper result than asking for direct answers?",
    [
      "Because DeepSeek prefers to ask questions rather than answer directly",
      "To make the conversation longer without real benefit",
      "Because the questions force you to examine your own premises — and the conclusions that emerge from this process have much more depth and precision than a ready-made answer",
      "The Socratic method only works for philosophical questions"
    ],
    2,
    "The best answer usually arises when you first refine the quality of your own premise."
  ),
  textStep(
    "Technique 7 — Multiple Perspectives Prompting",
    "Asking DeepSeek to analyze a problem from opposing or complementary perspectives before concluding removes biases and delivers a more complete and balanced view."
  ),
  fillStep(
    "Analyze multiple perspectives!",
    "Fill in the gap to broaden your strategic view.",
    '"Analyze the situation below under ___ completely ___ perspectives: the perspective of ___, that of ___ and that of ___. For each perspective, present the most relevant ___ and ___. Then synthesize into a balanced ___."',
    ["3", "different", "whoever defends the idea", "whoever criticizes it", "a neutral observer", "arguments", "weak points", "conclusion"],
    ["3", "different", "whoever defends the idea", "whoever criticizes it", "a neutral observer", "arguments", "weak points", "conclusion", "equal", "praises"],
    "Seeing the same problem from different angles neutralizes confirmation bias."
  ),
  quizStep(
    "Benefit of Perspectives",
    "Which situation benefits most from the multiple perspectives technique in DeepSeek?",
    [
      "Creative tasks where there is no right or wrong",
      "Questions with objective and unique answers",
      "Strategic decisions, risk analyses, and project evaluations where considering only one point of view may lead to incomplete or biased conclusions",
      "Multiple perspectives only work in political and philosophical debates"
    ],
    2,
    "The synthesis of multiple points of view is the basis for robust decision-making."
  ),
  textStep(
    "Technique 8 — Advanced Output Formatting",
    "DeepSeek responds very well to precise format instructions. Specifying exactly how the response should be structured — tables, numbered lists, hierarchies, sections — transforms the response into a professional document ready for use."
  ),
  fillStep(
    "Control the response format!",
    "Fill in the gap to receive ready-made deliverables.",
    '"Answer the question below in a ___ format with the following mandatory sections: executive ___ in a maximum of 3 lines, ___ analysis in numbered topics, ___ in a 3-column table format, and final ___ ordered by priority. Use ___ to separate each section."',
    ["structured report", "summary", "detailed", "comparative of options", "recommendations", "bold titles"],
    ["structured report", "summary", "detailed", "comparative of options", "recommendations", "bold titles", "text", "vague", "footer"],
    "A well-formatted output saves hours of editing and conveys immediate professionalism."
  ),
  quizStep(
    "Importance of Format",
    "Why is specifying the response format in DeepSeek as important as the question itself?",
    [
      "Because DeepSeek only understands prompts in a structured format",
      "To make the response visually more beautiful",
      "Because a well-defined format transforms the response into a professional deliverable ready for use — eliminating the rework of reorganizing and formatting content later",
      "Format does not influence the quality of the generated content"
    ],
    2,
    "Format is function: it dictates how the value of information will be consumed and applied."
  ),
  textStep(
    "Technique 9 — Iterative Prompting with Self-Criticism",
    "One of the most powerful techniques is to ask DeepSeek to generate an answer, then criticize its own answer by identifying weaknesses, and then rewrite an improved version. This creates an automatic improvement cycle."
  ),
  fillStep(
    "Activate self-criticism!",
    "Fill in the gap to enable the continuous improvement cycle.",
    '"Answer the following question: [your question]. After answering, ___ your own answer by identifying: what is ___, what could be more ___ and what is ___. Finally, rewrite an ___ version incorporating all the identified improvements."',
    ["criticize", "incomplete or vague", "precise and grounded", "missing", "improved"],
    ["criticize", "incomplete or vague", "precise and grounded", "missing", "improved", "applaud", "perfect", "full"],
    "Asking the model to criticize itself removes the first layers of obvious or superficial responses."
  ),
  quizStep(
    "Value of Self-Criticism",
    "Why does asking DeepSeek to criticize its own answer before rewriting generate superior results?",
    [
      "Because DeepSeek always makes mistakes on the first try",
      "To spend more tokens and generate longer responses",
      "Because the model identifies its own gaps with precision — and the rewritten version incorporates improvements that you yourself might not have perceived when asking for external refinement",
      "Self-criticism does not influence the quality of the final version"
    ],
    2,
    "Self-criticism is the fastest shortcut to excellence in interacting with advanced AIs."
  ),
  textStep(
    "Technique 10 — Strategic Context Injection",
    "Injecting rich and specific context before asking the main question is especially powerful in DeepSeek — because the model uses this context as a basis for all subsequent reasoning."
  ),
  fillStep(
    "Inject strategic context!",
    "Fill in the gap to give depth to the model.",
    '"Context: ___. Constraints: ___. Main objective: ___. Previous attempts: ___. Based on all this, analyze the situation with ___ and present the most viable ___ considering the informed constraints."',
    ["I am the founder of a startup with 8 employees, $200k in annual revenue and 18 months of runway", "limited budget, no external investment and a small team", "reaching $1M in revenue in 12 months", "we have already tried to scale via paid ads without a positive ROI", "depth and rigor", "3 strategies"],
    ["I am the founder of a startup with 8 employees", "limited budget", "reaching $1M", "tried to scale", "depth and rigor", "3 strategies", "low level", "without focus"],
    "The more the model knows about your specific reality, the less it needs to 'guess' and the more it can 'analyze'."
  ),
  quizStep(
    "Power of Context",
    "Why is Context Injection especially effective in DeepSeek?",
    [
      "Because DeepSeek accesses external data based on the context provided",
      "To make the prompt longer and more impressive",
      "Because DeepSeek uses each piece of information from the context as a variable in its reasoning — the richer and more specific the context, the more precise and personalized the analysis will be",
      "Context Injection only works for technical and programming questions"
    ],
    2,
    "Context is the raw material of reasoning. Without it, the model is just processing words; with it, it is solving YOUR problem."
  ),
  textStep(
    "Combining Techniques — The Ultimate Prompt",
    "True mastery is in combining multiple techniques in the same prompt. See how this works in practice."
  ),
  quizStep(
    "The Winning Combo",
    "Which combination of techniques generates the most powerful prompt for a strategic analysis in DeepSeek?",
    [
      "Asking a direct question without context or structure",
      "Using only Role Prompting without any other technique",
      "Combining specialized Role Prompting with Context Injection, visible Chain of Thought, multiple perspectives and defined Output Formatting — each technique enhancing the others",
      "The simpler the prompt, the better the result in DeepSeek"
    ],
    2,
    "The union of techniques creates a logical fence that forces the model to deliver the maximum level of intelligence."
  ),
  fillStep(
    "Assemble the ultimate prompt!",
    "Fill in the gap to create an elite prompt structure.",
    '"You are a ___. Context: ___. Analyze ___ step by step under ___ different perspectives. For each perspective show the complete ___ before concluding. At the end criticize your own analysis and present the result in an executive ___ format with well-defined sections."',
    ["senior strategic consultant specialized in business expansion", "complete data of your company and the market", "the problem", "3", "reasoning", "report"],
    ["senior strategic consultant specialized in business expansion", "complete data of your company and the market", "the problem", "3", "reasoning", "report", "student", "basic text", "nothing"],
    "Mastering this structure is like having an elite consultant available 24 hours a day."
  ),
  quizStep(
    "Common Error",
    "What is the most common error when trying to apply advanced techniques in DeepSeek?",
    [
      "Providing too much context before the main question",
      "Asking for step-by-step reasoning in analytical tasks",
      "Using advanced techniques without a clear objective — accumulating structure without purpose and making the prompt confusing rather than more precise",
      "Combining more than one technique in the same prompt"
    ],
    2,
    "The technique must serve the objective, not become the objective itself."
  ),
  textStep(
    "Conclusion",
    "DeepSeek responds extraordinary well to well-constructed prompts — especially when you activate its deep reasoning, decompose complex problems, inject rich context, and demand self-criticism before the final answer. The techniques in this lesson are not just advanced features — they are the standard of use for those who want to extract professional and consistent results from the model.\n\nMastering these techniques places you at a completely different level from most users — who still ask vaguely and accept the first result without questioning.\n\nBetter prompts. Deeper reasoning. Superior results.\n\nLesson completed ✓"
  ),
];

export const DEEPSEEK_MODULE_2_STEPS_ES = [
  textStep(
    "Técnicas Avanzadas de Prompt para DeepSeek",
    "¡Bienvenido de nuevo! En esta lección, dominarás las técnicas avanzadas de prompt específicas para extraer lo máximo de DeepSeek — explorando su razonamiento profundo, capacidad analítica y precisión lógica de forma estratégica y profesional."
  ),
  textStep(
    "Por qué DeepSeek Responde Diferente a los Prompts",
    "DeepSeek — especialmente R1 — fue entrenado con un enfoque en razonamiento estructurado y precisión lógica. Esto significa que responde de forma diferente a prompts bien construidos. Cuanto más estructures tu pensamiento en el prompt, más poderoso y preciso será el resultado."
  ),
  quizStep(
    "Activando el Potencial",
    "¿Por qué las técnicas avanzadas de prompt funcionan mejor en DeepSeek que las preguntas simples?",
    [
      "Porque DeepSeek fue entrenado para razonar en profundidad — y los prompts bien estructurados activan ese potencial de forma mucho más eficaz que las preguntas vagas",
      "Porque DeepSeek ignora los prompts cortos automáticamente",
      "Las técnicas avanzadas solo funcionan para usuarios con conocimientos técnicos en IA",
      "No hay diferencia en la forma en que estructuras el prompt en DeepSeek"
    ],
    0,
    "La estructura del prompt funciona como un mapa que guía el motor de razonamiento profundo de DeepSeek hacia los mejores resultados."
  ),
  textStep(
    "Técnica 1 — Razonamiento en Cadena (Chain of Thought)",
    "DeepSeek R1 fue desarrollado específicamente para razonar paso a paso. Pedir explícitamente que muestre cada etapa del pensamiento antes de concluir aumenta drásticamente la precisión — especialmente en tareas complejas."
  ),
  fillStep(
    "¡Activa el Chain of Thought!",
    "Completa el hueco para activar el razonamiento paso a paso de forma profesional.",
    '"Antes de responder, ___ tu razonamiento ___. Identifica las ___ involucradas, considera las posibles ___, evalúa el ___ de cada una y solo entonces presenta la ___ final con una justificación clara."',
    ["muestra", "paso a paso", "variables principales", "enfoques", "impacto y viabilidad", "conclusión"],
    ["muestra", "paso a paso", "variables principales", "enfoques", "impacto y viabilidad", "conclusión", "oculta", "corto", "ideas"],
    "Pedir que el modelo muestre el proceso de pensamiento expone la lógica y permite una validación muy superior."
  ),
  quizStep(
    "Ventaja del Chain of Thought",
    "¿Cuál es la principal ventaja de activar el Chain of Thought en DeepSeek R1?",
    [
      "Para que la respuesta sea más larga y detallada",
      "Porque DeepSeek solo funciona con razonamiento visible",
      "Porque acompañas cada etapa del pensamiento del modelo — pudiendo identificar dónde cuestionar, dónde ajustar y dónde profundizar antes de aceptar la conclusión final",
      "El Chain of Thought solo funciona para problemas matemáticos"
    ],
    2,
    "El Chain of Thought transforma la IA de una caja negra en un colaborador transparente."
  ),
  textStep(
    "Técnica 2 — Self-Consistency Prompting",
    "Esta técnica consiste en pedir a DeepSeek que resuelva el mismo problema de múltiples formas independientes y luego identificar qué solución aparece de forma más consistente. Es especialmente poderosa para decisiones importantes donde se quieren minimizar errores."
  ),
  fillStep(
    "¡Usa Self-Consistency!",
    "Completa el hueco para implementar la técnica de consistencia propia.",
    '"Resuelve el problema de abajo de ___ formas completamente ___, sin usar el razonamiento de una para influir en la otra. Después ___ los resultados, identifica dónde las soluciones ___ y qué enfoque aparece como más ___ y confiable."',
    ["3", "independientes", "compara", "convergen", "consistente"],
    ["3", "independientes", "compara", "convergen", "consistente", "iguales", "rápidas", "confusas"],
    "La consistencia entre múltiples caminos de razonamiento es un fuerte indicador de una respuesta correcta y confiable."
  ),
  quizStep(
    "Uso del Self-Consistency",
    "¿En qué situaciones es más valioso el Self-Consistency Prompting?",
    [
      "Para tareas creativas donde no existe una respuesta correcta",
      "Cuando necesitas una respuesta rápida sin profundidad",
      "En decisiones importantes, análisis complejos y problemas lógicos donde un único camino de razonamiento puede contener sesgos o errores no percibidos",
      "El Self-Consistency solo funciona para problemas matemáticos"
    ],
    2,
    "Para decisiones de alto impacto, validar la consistencia a través de múltiples caminos de pensamiento es una práctica de élite."
  ),
  textStep(
    "Técnica 3 — Role Prompting Especializado",
    "Al igual que en otros modelos, asignar un papel a DeepSeek mejora la calidad de las respuestas. Pero en DeepSeek, el papel debe ser altamente específico — incluyendo metodología de trabajo, nivel de rigor y forma de presentar las conclusiones."
  ),
  fillStep(
    "¡Crea un papel especializado!",
    "Completa el hueco para crear una persona profesional y rigurosa.",
    '"Eres un ___ con ___ años de experiencia en ___. Trabajas con una ___ basada en datos, eres ___ en tus conclusiones y siempre presentas ___ para cada afirmación que haces. Cuando no estés seguro de algo, ___ claramente en lugar de especular."',
    ["analista estratégico sénior", "20", "fusiones y adquisiciones de empresas tecnológicas", "metodología", "riguroso y preciso", "evidencias y fuentes", "dilo"],
    ["analista estratégico sénior", "20", "fusiones y adquisiciones de empresas tecnológicas", "metodología", "riguroso y preciso", "evidencias y fuentes", "dilo", "junior", "1", "oculta"],
    "Definir el rigor y la metodología del papel obliga al modelo a adoptar un estándar de calidad superior."
  ),
  quizStep(
    "Especialización del Role Prompt",
    "¿Qué diferencia a un Role Prompt especializado de uno genérico en DeepSeek?",
    [
      "El tamaño de la descripción del papel",
      "Usar términos técnicos específicos del área",
      "Incluir la metodología de trabajo, el nivel de rigor esperado y cómo debe el modelo manejar las incertidumbres — transformando el papel en una persona completa y consistente",
      "Los Role Prompts genéricos y especializados generan resultados iguales en DeepSeek"
    ],
    2,
    "Cuanto más específico sea el comportamiento esperado, más se alineará DeepSeek con esa expectativa profesional."
  ),
  textStep(
    "Técnica 4 — Descomposición de Problemas",
    "Para tareas muy complejas, en lugar de hacer una pregunta enorme, descompones el problema en subproblemas menores y los resuelves cada uno de forma secuencial. DeepSeek es especialmente bueno en este enfoque por su capacidad de razonamiento estructurado."
  ),
  fillStep(
    "¡Descompón el problema!",
    "Completa el hueco para dominar la técnica de descomposición.",
    '"El problema principal es: ___. Antes de resolverlo, ___ este problema en ___ subproblemas menores y más manejables. Resuelve cada ___ por separado con un razonamiento completo y luego ___ las soluciones en una respuesta final coherente."',
    ["cómo escalar mi negocio de $50k a $500k en 18 meses", "descompón", "5", "subproblema", "integra"],
    ["cómo escalar mi negocio de $50k a $500k in 18 meses", "descompón", "5", "subproblema", "integra", "resuelve", "rápidamente", "ignora"],
    "Tratar un gran problema como una secuencia de pequeños desafíos aumenta drásticamente la calidad de cada etapa."
  ),
  quizStep(
    "Ventaja de la Descomposición",
    "¿Por qué descomponer un problema complejo en partes más pequeñas mejora la respuesta de DeepSeek?",
    [
      "Porque DeepSeek tiene un límite de caracteres por respuesta",
      "Para que la conversación sea más larga y detallada",
      "Porque cada subproblema recibe atención y un razonamiento dedicado — eliminando la tendencia a respuestas superficiales que ocurre cuando se pregunta todo a la vez",
      "La descomposición de problemas solo funciona para cuestiones técnicas"
    ],
    2,
    "La descomposición previene la fatiga del modelo y garantiza profundidad en cada aspecto del problema."
  ),
  textStep(
    "Técnica 5 — Prompting con Restricciones Deliberadas",
    "Las restricciones bien colocadas obligan a DeepSeek a ser más creativo y preciso dentro de límites definidos. En lugar de respuestas abiertas y genéricas, recibes soluciones específicas y accionables."
  ),
  fillStep(
    "¡Añade restricciones estratégicas!",
    "Completa el hueco para calibrar el resultado con restricciones profesionales.",
    '"Responde a la pregunta de abajo con las siguientes restricciones: máximo de ___ palabras, utiliza solo ___ como base para las recomendaciones, ___ jerga técnica, presenta exactamente ___ opciones y ordena por ___ de implementación. Pregunta: [tu pregunta]"',
    ["300", "datos y evidencias verificables", "sin", "3", "facilidad"],
    ["300", "datos y evidencias verificables", "sin", "3", "facilidad", "muchas", "opinión", "con"],
    "Las restricciones agudizan la inteligencia del modelo al eliminar el camino fácil de las respuestas genéricas."
  ),
  quizStep(
    "Valor de las Restricciones",
    "¿Por qué las restricciones deliberadas mejoran la calidad de las respuestas de DeepSeek?",
    [
      "Porque DeepSeek funciona mejor con menos libertad creativa",
      "Para reducir el tiempo de procesamiento del modelo",
      "Porque las restricciones claras eliminan el espacio para respuestas vagas y genéricas — obligando al modelo a ser preciso, directo y verdaderamente útil dentro de los límites definidos",
      "Las restricciones siempre empeoran la calidad de las respuestas"
    ],
    2,
    "Los límites claros obligan a la IA a enfocarse en lo que es esencial y valioso."
  ),
  textStep(
    "Técnica 6 — Prompting Socrático",
    "En lugar de pedir respuestas directas, utilizas DeepSeek como un interlocutor intelectual — pidiéndole que cuestione tus premisas, identifique puntos ciegos y haga preguntas que profundicen tu razonamiento antes de concluir."
  ),
  fillStep(
    "¡Activa el modo socrático!",
    "Completa el hueco para transformar el modelo en tu entrenador intelectual.",
    '"Quiero analizar la siguiente ___: [describe]. En lugar de darme la respuesta directamente, haz ___ preguntas que ___ mis premisas y me ayuden a ver ___ que no estoy considerando. Solo presenta tu ___ después de que yo responda a cada pregunta."',
    ["decisión de negocio", "5", "cuestionen", "puntos ciegos", "análisis final"],
    ["decisión de negocio", "5", "cuestionen", "puntos ciegos", "análisis final", "conclusión", "3", "estén de acuerdo con"],
    "El método socrático ejercita tu propio pensamiento crítico en colaboración con la IA."
  ),
  quizStep(
    "Profundidad Socrática",
    "¿Por qué el método socrático genera un resultado más profundo que pedir respuestas directas?",
    [
      "Porque DeepSeek prefiere hacer preguntas en lugar de responder directamente",
      "Para que la conversación sea más larga sin un beneficio real",
      "Porque las preguntas te obligan a examinar tus propias premisas — y las conclusiones que surgen de este proceso tienen mucha más profundidad y precisión que una respuesta ya preparada",
      "El método socrático solo funciona para cuestiones filosóficas"
    ],
    2,
    "La mejor respuesta suele surgir cuando primero refinas la calidad de tu propia premisa."
  ),
  textStep(
    "Técnica 7 — Prompting con Perspectivas Múltiples",
    "Pedir a DeepSeek que analice un problema bajo perspectivas opuestas o complementarias antes de concluir elimina sesgos y entrega una visión más completa y equilibrada."
  ),
  fillStep(
    "¡Analiza múltiples perspectivas!",
    "Completa el hueco para ampliar tu visión estratégica.",
    '"Analiza la situación de abajo bajo ___ perspectivas completamente ___: la perspectiva de ___, la de ___ y la de ___. Para cada perspectiva, presenta los ___ y los ___ más relevantes. Luego sintetiza en una ___ equilibrada."',
    ["3", "diferentes", "quien defiende la idea", "quien la critica", "un observador neutro", "argumentos", "puntos débiles", "conclusión"],
    ["3", "diferentes", "quien defiende la idea", "quien la critica", "un observador neutro", "argumentos", "puntos débiles", "conclusión", "iguales", "elogios"],
    "Ver el mismo problema desde diferentes ángulos neutraliza el sesgo de confirmación."
  ),
  quizStep(
    "Beneficio de las Perspectivas",
    "¿Qué situación se beneficia más de la técnica de perspectivas múltiples en DeepSeek?",
    [
      "Tareas creativas donde no existe lo correcto o incorrecto",
      "Preguntas con respuestas objetivas y únicas",
      "Decisiones estratégicas, análisis de riesgos y evaluaciones de proyectos donde considerar solo un punto de vista puede llevar a conclusiones incompletas o sesgadas",
      "Las perspectivas múltiples solo funcionan en debates políticos y filosóficos"
    ],
    2,
    "La síntesis de múltiples puntos de vista es la base para una toma de decisiones robusta."
  ),
  textStep(
    "Técnica 8 — Output Formatting Avanzado",
    "DeepSeek responde muy bien a instrucciones precisas de formato. Especificar exactamente cómo debe estructurarse la respuesta — tablas, listas numeradas, jerarquías, secciones — transforma la respuesta en un documento profesional listo para usar."
  ),
  fillStep(
    "¡Controla el formato de la respuesta!",
    "Completa el hueco para recibir entregables listos.",
    '"Responde a la pregunta de abajo en formato ___ con las siguientes secciones obligatorias: ___ ejecutivo en un máximo de 3 líneas, análisis ___ en tópicos numerados, ___ en formato de tabla con 3 columnas y ___ finales ordenadas por prioridad. Usa ___ para separar cada sección."',
    ["estructurado de informe", "resumen", "detallado", "comparativo de opciones", "recomendaciones", "títulos en negrita"],
    ["estructurado de informe", "resumen", "detalado", "comparativo de opciones", "recomendaciones", "títulos en negrita", "texto", "vago", "pie de página"],
    "Un output bien formateado ahorra horas de edición y transmite profesionalismo inmediato."
  ),
  quizStep(
    "Importancia del Formato",
    "¿Por qué especificar el formato de la respuesta en DeepSeek es tan importante como la pregunta en sí?",
    [
      "Porque DeepSeek solo entiende prompts en formato estructurado",
      "Para que la respuesta sea visualmente más bonita",
      "Porque un formato bien definido transforma la respuesta en un entregable profesional listo para usar — eliminando el retrabajo de reorganizar y formatear el contenido después",
      "El formato no influye en la calidad del contenido generado"
    ],
    2,
    "El formato es función: dicta cómo se consumirá y aplicará el valor de la información."
  ),
  textStep(
    "Técnica 9 — Prompting Iterativo con Autocrítica",
    "Una de las técnicas más poderosas es pedir a DeepSeek que genere una respuesta, luego critique su propia respuesta identificando debilidades, y después reescriba una versión mejorada. Esto crea un ciclo de mejora automática."
  ),
  fillStep(
    "¡Activa la autocrítica!",
    "Completa el hueco para habilitar el ciclo de mejora continua.",
    '"Responde a la siguiente pregunta: [tu pregunta]. Después de responder, ___ tu propia respuesta identificando: qué es ___, qué podría ser más ___ y qué ___. Por último, reescribe una versión ___ incorporando todas las mejoras identificadas."',
    ["critica", "incompleto o vago", "preciso y fundamentado", "falta", "mejorada"],
    ["critica", "incompleto o vago", "preciso y fundamentado", "falta", "mejorada", "aplaude", "perfecto", "lleno"],
    "Pedir que el modelo se critique a sí mismo elimina las primeras capas de respuestas obvias o superficiales."
  ),
  quizStep(
    "Valor de la Autocrítica",
    "¿Por qué pedir a DeepSeek que critique su propia respuesta antes de reescribirla genera resultados superiores?",
    [
      "Porque DeepSeek siempre se equivoca en el primer intento",
      "Para gastar más tokens y generar respuestas más largas",
      "Porque el modelo identifica sus propias lagunas con precisión — y la versión reescrita incorpora mejoras que tú mismo podrías no haber percibido al pedir un refinamiento externo",
      "La autocrítica no influye en la calidad de la versión final"
    ],
    2,
    "La autocrítica es el atajo más rápido hacia la excelencia en la interacción con IAs avanzadas."
  ),
  textStep(
    "Técnica 10 — Context Injection Estratégico",
    "Inyectar un contexto rico y específico antes de hacer la pregunta principal es especialmente poderoso en DeepSeek — porque el modelo usa ese contexto como base para todo el razonamiento posterior."
  ),
  fillStep(
    "¡Inyecta contexto estratégico!",
    "Completa el hueco para dar profundidad al modelo.",
    '"Contexto: ___. Restricciones: ___. Objetivo principal: ___. Intentos anteriores: ___. Con base en todo esto, analiza la situación con ___ y preséntame las ___ más viables considerando las restricciones informadas."',
    ["soy el fundador de una startup con 8 empleados, $200k en ingresos anuales y 18 meses de caja", "presupuesto limitado, sin inversión externa y equipo pequeño", "alcanzar $1M de ingresos en 12 meses", "ya hemos intentado escalar mediante anuncios pagados sin un ROI positivo", "profundidad y rigor", "3 estrategias"],
    ["soy el fundador de una startup con 8 empleados", "presupuesto limitado", "alcanzar $1M", "intentamos escalar", "profundidade y rigor", "3 estrategias", "bajo nivel", "sin enfoque"],
    "Cuanto más sepa el modelo sobre tu realidad específica, menos necesitará 'adivinar' y más podrá 'analizar'."
  ),
  quizStep(
    "Poder del Contexto",
    "¿Por qué el Context Injection es especialmente eficaz en DeepSeek?",
    [
      "Porque DeepSeek accede a datos externos con base en el contexto proporcionado",
      "Para que el prompt sea más largo e impresionante",
      "Porque DeepSeek utiliza cada información del contexto como variable en su razonamiento — cuanto más rico y específico sea el contexto, más preciso y personalizado será el análisis",
      "Context Injection solo funciona para preguntas técnicas y de programación"
    ],
    2,
    "El contexto es la materia prima del razonamiento. Sin él, el modelo solo procesa palabras; con él, está resolviendo TU problema."
  ),
  textStep(
    "Combinando Técnicas — El Prompt Definitivo",
    "La verdadera maestría está en combinar múltiples técnicas en el mismo prompt. Mira cómo funciona en la práctica."
  ),
  quizStep(
    "El Combo Ganador",
    "¿Qué combinación de técnicas genera el prompt más poderoso para un análisis estratégico en DeepSeek?",
    [
      "Hacer una pregunta directa sin contexto ni estructura",
      "Usar solo Role Prompting sin ninguna otra técnica",
      "Combinar Role Prompting especializado con Context Injection, Chain of Thought visible, perspectivas múltiples y Output Formatting definido — cada técnica potenciando a las demás",
      "Cuanto más simple sea el prompt, mejor será el resultado en DeepSeek"
    ],
    2,
    "La unión de técnicas crea un cercado lógico que obliga al modelo a entregar el nivel máximo de inteligencia."
  ),
  fillStep(
    "¡Monta el prompt definitivo!",
    "Completa el hueco para crear una estructura de prompt de élite.",
    '"Eres un ___. Contexto: ___. Analiza ___ paso a paso bajo ___ perspectivas diferentes. Para cada perspectiva muestra el ___ completo antes de concluir. Al final critica tu propio análisis y presenta el resultado en formato de ___ ejecutivo con secciones bien definidas."',
    ["consultor estratégico sénior especializado en expansión de negocios", "datos completos de tu empresa y del mercado", "el problema", "3", "razonamiento", "informe"],
    ["consultor estratégico sénior especializado en expansión de negocios", "datos completos de tu empresa y del mercado", "el problema", "3", "razonamiento", "informe", "estudiante", "texto básico", "nada"],
    "Dominar esta estructura es como tener a un consultor de élite disponible las 24 horas del día."
  ),
  quizStep(
    "Error Común",
    "¿Cuál es el error más común al intentar aplicar técnicas avanzadas en DeepSeek?",
    [
      "Proporcionar demasiado contexto antes de la pregunta principal",
      "Pedir razonamiento paso a paso en tareas analíticas",
      "Usar técnicas avanzadas sin un objetivo claro — acumulando estructura sin propósito y haciendo que el prompt sea confuso en lugar de más preciso",
      "Combinar más de una técnica en el mismo prompt"
    ],
    2,
    "la técnica debe servir al objetivo, no convertirse en el objetivo principal."
  ),
  textStep(
    "Conclusión",
    "DeepSeek responde de forma extraordinaria a prompts bien construidos — especialmente cuando activas su razonamiento profundo, descompones problemas complejos, inyectas un contexto rico y exiges autocrítica antes de la respuesta final. Las técnicas de esta lección no son solo recursos avanzados — son el estándar de uso para quienes quieren extraer resultados profesionales y consistentes del modelo.\n\nDominar estas técnicas te sitúa en un nivel completamente diferente al de la mayoría de los usuarios — que todavía preguntan de forma vaga y aceptan el primer resultado sin cuestionar.\n\nMejores prompts. Razonamiento más profundo. Resultados superiores.\n\nLección completada ✓"
  ),
];


