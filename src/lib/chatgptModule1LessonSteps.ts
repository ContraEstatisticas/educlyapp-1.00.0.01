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

export const CHATGPT_MODULE_1_STEPS_PT = [
  textStep(
    "Como o ChatGPT Pensa e Responde",
    "Por exemplo, se você começar uma frase com \"O sol nasceu e o dia estava...\", o ChatGPT pode prever \"ensolarado\" ou \"frio\" como as próximas palavras — porque viu esse padrão milhares de vezes nos textos com os quais foi treinado.\n\nMas não se trata apenas de palavras isoladas. O ChatGPT entende o contexto e é capaz de gerar respostas complexas e significativas com base em tudo que foi dito antes."
  ),
  fillStep(
    "Exercício 1: Complete a lacuna!",
    "Suponha que você está escrevendo uma história e travou no meio. Experimente usar o ChatGPT para continuar.",
    '"___ a ___ que começa com \'Era uma vez, em uma cidade movimentada, uma criança que encontrou uma mochila misteriosa na calçada...\'"',
    ["Continue", "história"],
    ["Continue", "história", "Termine", "frase"],
    "É assim que o ChatGPT usa padrões dos dados com os quais foi treinado para gerar respostas. Como você pode ver, o ChatGPT consegue manter o contexto ao longo de toda a conversa."
  ),
  textStep(
    "Engenharia de Prompts",
    "No entanto, sem uma boa orientação, suas respostas nem sempre são exatamente o que você precisa. É aí que entra a engenharia de prompts.\n\nOs LLMs são sistemas sofisticados de reconhecimento de padrões, treinados em uma quantidade enorme de textos. A engenharia de prompts é a arte de se comunicar de forma eficaz com esses modelos — ou seja, encontrar a maneira certa de fazer a pergunta para obter a resposta que você realmente quer.\n\nSe você formular seus comandos de maneira clara e estratégica, o ChatGPT se torna uma ferramenta poderosa para alcançar seus objetivos. Pedir uma receita é apenas o exemplo mais simples."
  ),
  fillStep(
    "Exercício 2: Complete a lacuna!",
    "Para outro exemplo, experimente pedir ajuda com algo do dia a dia.",
    '"Você pode me ajudar ___ o ___ para fazer uma ___?"',
    ["explicando", "passo a passo", "vitamina de banana"],
    ["explicando", "passo a passo", "vitamina de banana", "ignorando", "resumo", "pizza"],
    "A clareza dos verbos e a especificidade do formato desejado garantem uma resposta útil."
  ),
  quizStep(
    "Origem das Respostas",
    "O que você acha que o ChatGPT respondeu quando você pediu a receita?",
    [
      "Ele copia a receita de um site de culinária específico",
      "Ele repete um preparo que já viu antes nos dados de treinamento",
      "Ele procura a receita no Google em tempo real",
      "Ele cria receitas aleatórias escolhendo palavras"
    ],
    1,
    "O ChatGPT gera o texto combinando os padrões estatísticos que internalizou durante o treinamento e não copiando de uma única fonte."
  ),
  textStep(
    "As Aplicações no Dia a Dia",
    "Na prática, as aplicações são enormes: atendimento ao cliente, criação de conteúdo, planejamento, estudos, escrita criativa e muito mais. As habilidades de engenharia de prompts podem otimizar seu tempo e ampliar seus resultados com IA.\n\nComo engenheiro de prompts iniciante, seu foco principal agora é aprender a se comunicar com o ChatGPT de forma cada vez mais eficaz. Continue explorando, continue praticando — e o mais importante: experimente. O mundo dos LLMs está cheio de possibilidades, e você está apenas começando.\n\nLição concluída ✓"
  )
] as const;

export const CHATGPT_MODULE_1_STEPS_EN = [
  textStep(
    "How ChatGPT Thinks and Responds",
    "For example, if you start a sentence with \"The sun rose and the day was...\", ChatGPT might predict \"sunny\" or \"cold\" as the next words — because it has seen this pattern thousands of times in the texts it was trained on.\n\nBut it's not just about isolated words. ChatGPT understands context and is capable of generating complex and meaningful responses based on everything said before."
  ),
  fillStep(
    "Exercise 1: Fill in the blank!",
    "Suppose you are writing a story and got stuck in the middle. Try using ChatGPT to continue.",
    '"___ the ___ that starts with \'Once upon a time, in a bustling city, a child found a mysterious backpack on the sidewalk...\'"',
    ["Continue", "story"],
    ["Continue", "story", "Finish", "sentence"],
    "This is how ChatGPT uses patterns from the data it was trained on to generate responses. As you can see, ChatGPT can maintain context throughout the entire conversation."
  ),
  textStep(
    "Prompt Engineering",
    "However, without good guidance, its answers aren't always exactly what you need. That's where prompt engineering comes in.\n\nLLMs are sophisticated pattern recognition systems, trained on a massive amount of text. Prompt engineering is the art of communicating effectively with these models — that is, finding the right way to ask the question to get the answer you really want.\n\nIf you formulate your commands clearly and strategically, ChatGPT becomes a powerful tool to achieve your goals. Asking for a recipe is just the simplest example."
  ),
  fillStep(
    "Exercise 2: Fill in the blank!",
    "For another example, try asking for help with something everyday.",
    '"Can you help me by ___ the ___ to make a ___?"',
    ["explaining", "step-by-step", "banana smoothie"],
    ["explaining", "step-by-step", "banana smoothie", "ignoring", "summary", "pizza"],
    "The clarity of verbs and the specificity of the desired format guarantee a useful response."
  ),
  quizStep(
    "Origin of the Answers",
    "What do you think ChatGPT answered when you asked for the recipe?",
    [
      "It copies the recipe from a specific cooking website",
      "It repeats a preparation it has seen before in the training data",
      "It creates random recipes by choosing words",
      "It searches for the recipe on Google in real time"
    ],
    1,
    "ChatGPT generates text by combining the statistical patterns it internalized during training and not by copying from a single source."
  ),
  textStep(
    "Everyday Applications",
    "In practice, the applications are enormous: customer service, content creation, planning, studies, creative writing, and much more. Prompt engineering skills can optimize your time and amplify your results with AI.\n\nAs a beginner prompt engineer, your main focus now is to learn how to communicate with ChatGPT more effectively. Keep exploring, keep practicing — and most importantly: experiment. The world of LLMs is full of possibilities, and you are just getting started.\n\nLesson complete ✓"
  )
] as const;

export const CHATGPT_MODULE_1_STEPS_ES = [
  textStep(
    "Cómo ChatGPT Piensa y Responde",
    "Por ejemplo, si empiezas una frase con \"El sol salió y el día estaba...\", ChatGPT puede predecir \"soleado\" o \"frío\" como las próximas palabras — porque vio este patrón miles de veces en los textos con los que fue entrenado.\n\nPero no se trata solo de palabras aisladas. ChatGPT entiende el contexto y es capaz de generar respuestas complejas y significativas basadas en todo lo dicho anteriormente."
  ),
  fillStep(
    "Ejercicio 1: ¡Completa el espacio!",
    "Supón que estás escribiendo una historia y te atascaste en el medio. Intenta usar ChatGPT para continuar.",
    '"___ la ___ que empieza con \'Érase una vez, en una ciudad bulliciosa, un niño que encontró una mochila misteriosa en la acera...\'"',
    ["Continúa", "historia"],
    ["Continúa", "historia", "Termina", "oración"],
    "Así es como ChatGPT usa patrones de los datos con los que fue entrenado para generar respuestas. Como puedes ver, ChatGPT puede mantener el contexto durante toda la conversación."
  ),
  textStep(
    "Ingeniería de Prompts",
    "Sin embargo, sin una buena orientación, sus respuestas no siempre son exactamente lo que necesitas. Ahí es donde entra la ingeniería de prompts.\n\nLos LLMs son sistemas sofisticados de reconocimiento de patrones, entrenados en una enorme cantidad de textos. La ingeniería de prompts es el arte de comunicarse de manera efectiva con estos modelos — es decir, encontrar la forma correcta de hacer la pregunta para obtener la respuesta que realmente deseas.\n\nSi formulas tus comandos de manera clara y estratégica, ChatGPT se convierte en una herramienta poderosa para alcanzar tus objetivos. Pedir una receta es solo el ejemplo más simple."
  ),
  fillStep(
    "Ejercicio 2: ¡Completa el espacio!",
    "Para otro ejemplo, intenta pedir ayuda con algo del día a día.",
    '"¿Puedes ayudarme ___ el ___ para hacer un ___?"',
    ["explicando", "paso a paso", "batido de plátano"],
    ["explicando", "paso a paso", "batido de plátano", "ignorando", "resumen", "pizza"],
    "La claridad de los verbos y la especificidad del formato deseado garantizan una respuesta útil."
  ),
  quizStep(
    "Origen de las Respuestas",
    "¿Qué crees que respondió ChatGPT cuando le pediste la receta?",
    [
      "Busca la receta en Google en tiempo real",
      "Crea recetas aleatorias eligiendo palabras",
      "Copia la receta de un sitio web de cocina específico",
      "Repite una preparación que ya ha visto antes en los datos de entrenamiento"
    ],
    3,
    "ChatGPT genera texto combinando los patrones estadísticos que internalizó durante el entrenamiento y no copiando de una sola fuente."
  ),
  textStep(
    "Las Aplicaciones en el Día a Día",
    "En la práctica, las aplicaciones son enormes: servicio al cliente, creación de contenido, planificación, estudios, escritura creativa y mucho más. Las habilidades de ingeniería de prompts pueden optimizar tu tiempo y ampliar tus resultados con IA.\n\nComo ingeniero de prompts principiante, tu enfoque principal ahora es aprender a comunicarte con ChatGPT de forma cada vez más eficaz. Sigue explorando, sigue practicando — y lo más importante: experimenta. El mundo de los LLMs está lleno de posibilidades y apenas estás empezando.\n\nLección completada ✓"
  )
] as const;

export const CHATGPT_MODULE_1_STEPS_FR = [
  textStep(
    "Comment ChatGPT Pense et Répond",
    "Par exemple, si vous commencez une phrase par \"Le soleil s'est levé et la journée était...\", ChatGPT peut prédire \"ensoleillée\" ou \"froide\" comme mots suivants — car il a vu ce modèle des milliers de fois dans les textes sur lesquels il a été entraîné.\n\nMais il ne s'agit pas seulement de mots isolés. ChatGPT comprend le contexte et est capable de générer des réponses complexes et significatives basées sur tout ce qui a été dit auparavant."
  ),
  fillStep(
    "Exercice 1 : Remplissez l'espace !",
    "Supposons que vous écrivez une histoire et que vous êtes bloqué au milieu. Essayez d'utiliser ChatGPT pour continuer.",
    '"___ l\'___ qui commence par \'Il était une fois, dans une ville animée, un enfant qui a trouvé un sac à dos mystérieux sur le trottoir...\'"',
    ["Continuez", "histoire"],
    ["Continuez", "histoire", "Terminez", "phrase"],
    "C'est ainsi que ChatGPT utilise les modèles des données avec lesquelles il a été formé pour générer des réponses. Comme vous pouvez le voir, ChatGPT peut maintenir le contexte tout au long de la conversation."
  ),
  textStep(
    "Ingénierie de Prompts",
    "Cependant, sans une bonne orientation, ses réponses ne sont pas toujours ce dont vous avez besoin. C'est là qu'intervient l'ingénierie des prompts.\n\nLes LLMs sont des systèmes sophistiqués de reconnaissance de formes, entraînés sur une énorme quantité de textes. L'ingénierie de prompts est l'art de communiquer efficacement avec ces modèles — c'est-à-dire trouver la bonne façon de poser la question pour obtenir la réponse que vous voulez vraiment.\n\nSi vous formulez vos commandes de manière claire et stratégique, ChatGPT devient un outil puissant pour atteindre vos objectifs. Demander une recette n'est que l'exemple le plus simple."
  ),
  fillStep(
    "Exercice 2 : Remplissez l'espace !",
    "Pour un autre exemple, essayez de demander de l'aide pour quelque chose du quotidien.",
    '"Pouvez-vous m\'aider en ___ le ___ pour faire un ___ ?"',
    ["expliquant", "pas à pas", "smoothie à la banane"],
    ["expliquant", "pas à pas", "smoothie à la banane", "ignorant", "résumé", "pizza"],
    "La clarté des verbes et la spécificité du format souhaité garantissent une réponse utile."
  ),
  quizStep(
    "Origine des Réponses",
    "Que pensez-vous que ChatGPT a répondu lorsque vous avez demandé la recette ?",
    [
      "Il répète une préparation qu'il a déjà vue dans les données d'entraînement",
      "Il crée des recettes aléatoires en choisissant des mots",
      "Il cherche la recette sur Google en temps réel",
      "Il copie la recette à partir d'un site Web de cuisine spécifique"
    ],
    0,
    "ChatGPT génère du texte en combinant les modèles statistiques qu'il a intériorisés pendant la formation et non en copiant à partir d'une seule source."
  ),
  textStep(
    "Les Applications au Quotidien",
    "En pratique, les applications sont énormes : service client, création de contenu, planification, études, écriture créative et bien plus encore. Les compétences en ingénierie de prompts peuvent optimiser votre temps et amplifier vos résultats avec l'IA.\n\nEn tant qu'ingénieur de prompts débutant, votre objectif principal est maintenant d'apprendre à communiquer avec ChatGPT plus efficacement. Continuez à explorer, continuez à pratiquer — et surtout : expérimentez. Le monde des LLMs regorge de possibilités, et vous ne faites que commencer.\n\nLeçon terminée ✓"
  )
] as const;
