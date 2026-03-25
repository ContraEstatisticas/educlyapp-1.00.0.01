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

  textStep(
    "Técnica 7 — Prompting com Perspectivas Múltiplas",
    "Pedir ao DeepSeek para analisar um problema sob perspectivas opostas ou complementares antes de concluir elimina vieses e entrega uma visão mais completa e equilibrada."
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

  textStep(
    "Técnica 10 — Context Injection Estratégico",
    "Injetar contexto rico e específico antes de fazer a pergunta principal é especialmente poderoso no DeepSeek — porque o modelo usa esse contexto como base para todo o raciocínio subsequente."
  ),


  textStep(
    "Combinando Técnicas — O Prompt Definitivo",
    "A verdadeira maestria está em combinar múltiplas técnicas no mesmo prompt. Veja como isso funciona na prática."
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

  textStep(
    "Technique 4 — Décomposition de Problèmes",
    "Pour les tâches très complexes, au lieu de poser une question immense, vous décomposez le problème en sous-problèmes plus petits et résolvez chacun de manière séquentielle. DeepSeek est particulièrement performant dans cette approche grâce à sa capacité de raisonnement structuré."
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

  textStep(
    "Technique 6 — Prompting Socratique",
    "Plutôt que de demander des réponses directes, vous utilisez DeepSeek comme un interlocuteur intellectuel — en lui demandant de remettre en question vos prémisses, d'identifier les angles morts et de poser des questions qui approfondissent votre raisonnement avant de conclure."
  ),

  textStep(
    "Technique 7 — Prompting avec Perspectives Multiples",
    "Demander à DeepSeek d'analyser un problème sous des perspectives opposées ou complémentaires avant de conclure élimine les biais et livre une vision plus complète et équilibrée."
  ),
  quizStep(
    "Bénéfice des Perspectivas",
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


  textStep(
    "Technique 9 — Prompting Itératif avec Autocritique",
    "L'une des techniques les plus puissantes consiste à demander à DeepSeek de générer une réponse, puis de critiquer sa propre réponse en identifiant ses faiblesses, et enfin de réécrire une version améliorée. Cela crée un cycle d'amélioration automatique."
  ),

  textStep(
    "Technique 10 — Context Injection Stratégique",
    "Injecter un contexte riche et spécifique avant de poser la question principale est particulièrement puissant dans DeepSeek — car le modèle utilise ce contexte comme base pour tout son raisonnement ultérieur."
  ),

  textStep(
    "Combinaison de Techniques — Le Prompt Ultime",
    "La véritable maîtrise réside dans la combinaison de plusieurs techniques dans le même prompt. Voyez comment cela fonctionne en pratique."
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

  textStep(
    "Technique 7 — Multiple Perspectives Prompting",
    "Asking DeepSeek to analyze a problem from opposing or complementary perspectives before concluding removes biases and delivers a more complete and balanced view."
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

  textStep(
    "Technique 10 — Strategic Context Injection",
    "Injecting rich and specific context before asking the main question is especially powerful in DeepSeek — because the model uses this context as a basis for all subsequent reasoning."
  ),


  textStep(
    "Combining Techniques — The Ultimate Prompt",
    "True mastery is in combining multiple techniques in the same prompt. See how this works in practice."
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

  textStep(
    "Técnica 7 — Prompting con Perspectivas Múltiples",
    "Pedir a DeepSeek que analice un problema bajo perspectivas opuestas o complementarias antes de concluir elimina sesgos y entrega una visión más completa y equilibrada."
  ),

  textStep(
    "Técnica 8 — Output Formatting Avanzado",
    "DeepSeek responde muy bien a instrucciones precisas de formato. Especificar exactamente cómo debe estructurarse la respuesta — tablas, listas numeradas, jerarquías, secciones — transforma la respuesta en un documento profesional listo para usar."
  ),

  textStep(
    "Técnica 9 — Prompting Iterativo con Autocrítica",
    "Una de las técnicas más poderosas es pedir a DeepSeek que genere una respuesta, luego critique su propia respuesta identificando debilidades, y después reescriba una versión mejorada. Esto crea un ciclo de mejora automática."
  ),

  textStep(
    "Técnica 10 — Context Injection Estratégico",
    "Inyectar un contexto rico y específico antes de hacer la pregunta principal es especialmente poderoso en DeepSeek — porque el modelo usa ese contexto como base para todo el razonamiento posterior."
  ),

  textStep(
    "Combinando Técnicas — El Prompt Definitivo",
    "La verdadera maestría está en combinar múltiples técnicas en el mismo prompt. Mira cómo funciona en la práctica."
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


