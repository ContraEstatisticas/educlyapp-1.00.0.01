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

export const GEMINI_MODULE_4_STEPS_PT = [
  textStep(
    "Gemini para Planilhas Google Sheets com Inteligência Artificial",
    "Bem-vindo de volta! Nesta lição, você vai aprender como o Gemini transforma sua experiência com planilhas — analisando dados, criando fórmulas, gerando gráficos e automatizando tarefas diretamente no Google Sheets, sem precisar ser um especialista em Excel ou programação.\n\nPor que o Gemini é um Aliado Poderoso em Planilhas?\nPlanilhas são uma das ferramentas mais usadas no mundo profissional — e também uma das mais subutilizadas. A maioria das pessoas usa apenas 10% do potencial do Google Sheets. Com o Gemini integrado, esse potencial se torna acessível para qualquer pessoa, independentemente do nível técnico."
  ),
  textStep(
    "Criando Fórmulas com o Gemini",
    "Um dos maiores bloqueios de quem usa planilhas é não saber a fórmula certa. Com o Gemini, você descreve o que quer calcular em português e ele entrega a fórmula pronta para copiar e colar."
  ),
  fillStep(
    "Peça sua fórmula!",
    "Descreva o cálculo na linguagem humana e ganhe a linguagem das máquinas.",
    "\"Preciso de uma fórmula no Google Sheets que [___] os valores da coluna [___] apenas quando a coluna [___] for igual a [___]. Explique como a fórmula funciona e onde devo [___] na planilha.\"",
    ["some", "B", "C", "\"Aprovado\"", "inseri-la"],
    ["some", "B", "C", "\"Aprovado\"", "inseri-la"],
    "Delegar não apenas a confecção da fórmula, mas a sua implantação guiada extingue a chance do famoso erro '#VALUE!' aparecer."
  ),
  textStep(
    "Analisando Dados Colados na Conversa",
    "Você pode copiar os dados da sua planilha, colar diretamente na conversa com o Gemini e pedir análises, comparações e interpretações — sem precisar de nenhum plugin ou integração."
  ),
  fillStep(
    "Analise seus dados!",
    "Transforme imensas colunas estáticas num resumo inteligente.",
    "\"Aqui estão os dados de [___] da minha planilha: [cole os dados]. Analise e me diga: qual [___] teve melhor desempenho, quais [___] estão abaixo da média, qual é a [___] geral e quais [___] merecem investigação.\"",
    ["vendas por região", "região", "regiões", "tendência", "números fora do padrão"],
    ["vendas por região", "região", "regiões", "tendência", "números fora do padrão"],
    "Forçar o Gemini a destacar os desvios foca a análise para o campo da gestão e da solução em vez de um diagnóstico cego."
  ),
  textStep(
    "Identificando Erros e Inconsistências",
    "O Gemini consegue revisar seus dados e identificar erros que passariam despercebidos em uma leitura rápida — valores duplicados, células vazias, números fora do padrão e inconsistências de formato."
  ),
  fillStep(
    "Revise sua planilha!",
    "Acabe com os erros de digitação e buracos no banco de dados.",
    "\"Aqui estão os dados da minha planilha de [___]: [cole os dados]. Identifique: [___] duplicados, células que deveriam ter valor mas estão [___], números que parecem [___] para o contexto e qualquer [___] de formato entre as colunas.\"",
    ["cadastro de clientes", "registros", "vazias", "fora do padrão", "inconsistência"],
    ["cadastro de clientes", "registros", "vazias", "fora do padrão", "inconsistência"],
    "Um simples prompt elimina dias gastos passando pentes finos sobre centenas de listas intermináveis."
  ),
  textStep(
    "Gerando Insights Estratégicos com Dados",
    "Além de calcular e revisar, o Gemini transforma números em interpretações estratégicas — o que os dados significam, o que está funcionando e onde estão as oportunidades."
  ),
  fillStep(
    "Transforme dados em decisões!",
    "Force o bot a ser seu Chief Data Officer.",
    "\"Aqui estão os dados de [___] dos últimos [___] meses: [cole os dados]. Com base nesses números, me diga: qual é a [___] identificada, quais [___] merecem atenção, o que esses dados [___] sobre o comportamento do negócio e quais [___] você recomenda.\"",
    ["faturamento e despesas", "6", "tendência principal", "pontos de alerta", "revelam", "3 ações"],
    ["faturamento e despesas", "6", "tendência principal", "pontos de alerta", "revelam", "3 ações"],
    "Exigir 'Ações Recomendadas' arranca a IA do seu papel contemplativo obrigando-a a ofertar saídas comerciais concretas."
  ),
  quizStep(
    "Analisador-Chefe de Insights",
    "Qual prompt gera o insight mais estratégico a partir de dados de planilha?",
    [
      "\"O que você acha desses números?\"",
      "\"Esses dados estão bons ou ruins?\"",
      "\"Analise esses dados de desempenho e me diga: o que está crescendo, o que está caindo, qual é o padrão mais relevante identificado e quais decisões esses números sugerem para os próximos 3 meses\"",
      "\"Calcule a média desses valores\""
    ],
    2,
    "Os melhores resultados vêm de solicitações multifacetadas; não baste perguntar a média de vendas, pergunte simultaneamente qual métrica caiu e o que deve ser feito a respeito."
  ),
  textStep(
    "Criando Estruturas de Planilhas do Zero",
    "Não sabe como montar uma planilha para um novo projeto? O Gemini cria a estrutura completa — colunas, categorias, fórmulas sugeridas e lógica de organização — para você só precisar preencher com seus dados."
  ),
  fillStep(
    "Crie sua planilha do zero!",
    "Economize formatações cansativas e obtenha alicerces prontos.",
    "\"Crie a estrutura de uma planilha de [___] para um [___]. Inclua: todas as [___] necessárias, a [___] lógica das informações, [___] sugeridas para automatizar os cálculos e uma aba de [___] para visualizar os totais.\"",
    ["controle financeiro mensal", "negócio de pequeno porte", "colunas", "organização", "fórmulas", "resumo"],
    ["controle financeiro mensal", "negócio de pequeno porte", "colunas", "organização", "fórmulas", "resumo"],
    "Dar o contexto do seu segmento garante que as abas e colunas sejam moldadas com o linguajar da sua indústria diária."
  ),
  textStep(
    "Automatizando Tarefas com Google Apps Script",
    "Para usuários mais avançados, o Gemini consegue escrever scripts em Google Apps Script — o que permite automatizar tarefas repetitivas diretamente no Google Sheets sem saber programar."
  ),
  fillStep(
    "Automatize com o Gemini!",
    "Traga o poder de um programador para dentro do seu Sheets diário.",
    "\"Escreva um script em Google Apps Script que [___] automaticamente os dados da aba [___] e os organize na aba [___] por ordem [___], agrupados por [___]. Explique passo a passo como [___] o script na minha planilha.\"",
    ["copie", "Dados Brutos", "Relatório", "decrescente de valor", "categoria", "instalar e executar"],
    ["copie", "Dados Brutos", "Relatório", "decrescente de valor", "categoria", "instalar e executar"],
    "Pedir um tutorial junto com o código previne que você fique olhando para a tela do computador sem ter a mínima ideia do que clicar."
  ),
  textStep(
    "Criando Dashboards e Visualizações",
    "O Gemini pode orientar passo a passo a criação de dashboards visuais no Google Sheets — indicando quais gráficos usar, como organizar os dados e como criar uma visão executiva dos seus números."
  ),
  textStep(
    "Comparando Planilhas e Versões",
    "Quando você tem duas versões de uma planilha e precisa entender o que mudou, o Gemini consegue comparar os dados colados e identificar diferenças, alterações e discrepâncias."
  ),
  textStep(
    "Conclusão",
    "Com o Gemini, planilhas deixam de ser um obstáculo e se tornam uma vantagem competitiva. Fórmulas complexas em segundos, análises estratégicas de dados, identificação de erros, criação de estruturas, automações e dashboards — tudo acessível em linguagem natural, sem precisar ser especialista.\n\nO poder dos dados sempre esteve nas planilhas. Agora, com o Gemini, ele está ao alcance de qualquer pessoa que saiba fazer as perguntas certas.\n\nDados organizados. Decisões mais inteligentes."
  )
] as const;

export const GEMINI_MODULE_4_STEPS_EN = [
  textStep(
    "Gemini for Google Sheets with Artificial Intelligence",
    "Welcome back! In this lesson, you will learn how Gemini transforms your spreadsheet experience — analyzing data, formulating equations, charting graphics, and automating tasks directly inside Google Sheets without you ever needing to be an Excel maestro or programmer.\n\ Why is Gemini a Powerful Ally within Spreadsheets?\nSpreadsheets represent one of the most heavily adopted utilities in the corporate world — yet simultaneously one of the most underutilized. The average worker utilizes merely 10% of Google Sheets' true potential. Merging Gemini directly into the grid grants full access to this sheer power for anyone, entirely regardless of their baseline technical tier."
  ),
  textStep(
    "Forging Formulas Using Gemini",
    "One of the largest hurdles haunting spreadsheet users is blanking out on the exact mathematical syntax. With Gemini, you narrate exactly what needs calculating in plain English, and it replies with the ready-to-paste architecture."
  ),
  fillStep(
    "Command your formula natively!",
    "Transmute human language over to machine calculation code.",
    "\"I absolutely need a Google Sheets formula that [___] the values rooted inside column [___] strictly when column [___] explicitly matches [___]. Explain precisely how this exact formula operates and indicate where I must [___] it inside my grid.\"",
    ["sums", "B", "C", "\"Approved\"", "insert"],
    ["sums", "B", "C", "\"Approved\"", "insert"],
    "Delegating not just the code creation, but the exact deployment instructions nullifies the dreaded '#VALUE!' errors."
  ),
  textStep(
    "Evaluating Pasted Data in Chat",
    "You can simply copy your sheet columns, dump them brutally into the Gemini conversation window, and demand sweeping analyses, comparisons, and executive interpretations — requiring zero plugins or complex integrations."
  ),
  fillStep(
    "Crush your raw data!",
    "Summarize endless, mind-numbing static columns into a genius-level overview.",
    "\"Here is the raw data concerning our [___] straight from my sheet: [paste data]. Audit it closely and dictate: which [___] outperformed the rest violently, which [___] are trailing terribly below baseline, the overarching general [___], and explicitly which [___] mandate an immediate deep-dive investigation.\"",
    ["regional sales", "region", "regions", "trend", "anomalous numbers"],
    ["regional sales", "region", "regions", "trend", "anomalous numbers"],
    "Commanding Gemini to blatantly highlight deviations forces the output strictly toward management and resolution rather than passive descriptions."
  ),
  textStep(
    "Hunting Errors and Flagging Inconsistencies",
    "Gemini excels at scrubbing your data, isolating silent errors that easily bypass human exhaustion — cloned values, desolate empty cells, bizarre numbering styles, and chaotic formatting breaks."
  ),
  fillStep(
    "Audit your spreadsheet ruthlessly!",
    "Vaporize typos and sinkholes inhabiting your databases.",
    "\"Here are the raw metrics from my [___] sheet: [paste data]. Identify immediately: cloned [___], desolate cells that supposedly mandate values yet sit [___], specific figures that seem dangerously [___] inside this context, and any glaring formatting [___] sprawling across the varied columns.\"",
    ["client registry", "records", "empty", "off-standard", "inconsistency"],
    ["client registry", "records", "empty", "off-standard", "inconsistency"],
    "One robust prompt evaporates days otherwise wasted scraping fine-tooth combs across endless digital lists."
  ),
  textStep(
    "Generating Weapons-Grade Strategic Insights",
    "Beyond merely tallying and scrubbing, Gemini forcefully translates flat digits into warfare methodologies — exposing what the data screams, what genuinely works, and where hidden goldmines are buried."
  ),
  fillStep(
    "Weaponize flat data into decisions!",
    "Compel the bot into functioning as your Chief Data Officer.",
    "\"Attached is the raw data enclosing our [___] spanning the trailing [___] months: [paste data]. Based stringently upon these metrics, dictate: what is the undeniable [___] surfaced, which precise [___] scream for triage, entirely what these figures [___] regarding our raw business behavior, and spell out exactly [___] you fiercely recommend.\"",
    ["revenue and expenses", "6", "main trend", "alert points", "reveal", "3 actions"],
    ["revenue and expenses", "6", "main trend", "alert points", "reveal", "3 actions"],
    "Mandating explicit 'Recommended Actions' violently yanks the AI out of its contemplative sandbox, forcing it to dispense aggressive commercial solutions."
  ),
  quizStep(
    "Chief Insight Parser",
    "Which exact prompting structure guarantees the absolute highest tier of strategic insight extracted from flat spreadsheet grids?",
    [
      "\"Hey, what are your general thoughts on these basic numbers over here?\"",
      "\"Tell me, do you consider these data points positive or completely ruined?\"",
      "\"Audit this performance data ruthlessly and declare: exactly what is surging, what is bleeding out, what constitutes the most dominant prevailing pattern, and list the stark decisions these metrics inherently suggest for Q3.\"",
      "\"Just give me the quick mathematical average of these scattered values.\""
    ],
    2,
    "Elite outputs stem from multifaceted demands; don't just ask for an average — simultaneously demand what metric tanked and the precise operational remedy expected."
  ),
  textStep(
    "Forging Spreadsheet Architectures out of Thin Air",
    "Clueless on how to even launch a grid for an upcoming project? Gemini actively writes the entire architectural blueprint — columns, nested categories, dictated formulas, and visual logic — leaving you to merely pour in your values."
  ),
  fillStep(
    "Spawn your grid from zero!",
    "Bypass exhaustive formatting and secure pre-built foundations.",
    "\"Design the exact structure for a highly proficient [___] spreadsheet catering strictly toward a [___]. Integrate: all essential [___] inherently required, the absolute [___] logic orchestrating the data, specific [___] recommended to automate the heavy lifting, and an isolated [___] tab to beautifully visualize the final totals.\"",
    ["monthly financial control", "small-sized business", "columns", "organizational", "formulas", "summary"],
    ["monthly financial control", "small-sized business", "columns", "organizational", "formulas", "summary"],
    "Supplying the niche of your industry guarantees the generated tabs and tracking columns speak the precise jargon of your daily grind."
  ),
  textStep(
    "Automating Drudgery Utilizing Google Apps Script",
    "For operators demanding advanced might, Gemini flawlessly codes in Google Apps Script — bestowing upon you the power to automate brutal, repetitive loops natively inside Google Sheets without writing a single line of code yourself."
  ),
  fillStep(
    "Automate visciously alongside Gemini!",
    "Summon a lead developer straight into your mundane Sheets.",
    "\"Draft a highly resilient Google Apps Script codebase that aggressively [___] the raw data housed inside the [___] tab, dynamically sorts it inside the [___] tab strictly by [___], grouped categorically by [___]. Conclude with a painfully clear step-by-step masterclass on exactly how to [___] this script inside my live grid.\"",
    ["copies", "Raw Data", "Report", "descending value", "category", "install and execute"],
    ["copies", "Raw Data", "Report", "descending value", "category", "install and execute"],
    "Requesting a foolproof tutorial alongside the raw code barricades you from staring blankly at your monitor having zero clue where the developer console even resides."
  ),
  textStep(
    "Architecting Dashboards and Visualizing Data",
    "Gemini coaches you painstakingly through erecting executive visual dashboards inside Google Sheets — dictating exactly which charts to leverage, orienting data pipelines, and structuring your numbers into an elite command center."
  ),
  textStep(
    "Pitting Sheets Against Versions",
    "Saddled with two divergent iterations of a massive grid desperately needing to isolate the mutations? Gemini cross-examines the pasted data grids, aggressively pinpointing shifts, edits, and volatile discrepancies."
  ),
  textStep(
    "Conclusion",
    "Unleashing Gemini shatters the spreadsheet barrier, transforming former roadblocks into razor-sharp competitive advantages. Arcane formulas birthed in seconds, aggressive strategic data sweeps, error neutralization, ground-up architecture spawning, heavy loop automation, and elite dashboarding — entirely unlocked via plain human vernacular, wholly obliterating the requirement for specialized mastery.\n\nThe undeniable raw power of data has perpetually slept within grids. Today, armed with Gemini, that supremacy rests within the grip of anyone possessing the capacity to ask the devastatingly correct questions.\n\nOrganized data. Viciously intelligent execution."
  )
] as const;
export const GEMINI_MODULE_4_STEPS_ES = [
  textStep(
    "Gemini para Hojas de Cálculo (Google Sheets) con Inteligencia Artificial",
    "¡Bienvenido de vuelta! En esta lección aprenderás cómo Gemini transforma tu experiencia con hojas de cálculo — analizando datos, formulando ecuaciones, graficando y automatizando tareas directamente en Google Sheets, sin necesitar ser un experto en Excel o programación.\n\n¿Por qué Gemini es un Aliado Poderoso en las Hojas de Cálculo?\nLas hojas de cálculo son una de las herramientas más usadas en el mundo profesional — y también una de las más subutilizadas. La mayoría usa solo el 10% del potencial de Google Sheets. Con Gemini integrado, este potencial se vuelve accesible para cualquier persona, independientemente del nivel técnico."
  ),
  textStep(
    "Creando Fórmulas con Gemini",
    "Uno de los mayores bloqueos de quien usa planillas es no saber la fórmula correcta. Con Gemini, describes lo que quieres calcular en español y él te entrega la fórmula lista para copiar y pegar."
  ),
  fillStep(
    "¡Pide tu fórmula!",
    "Describe el cálculo en lenguaje humano y obtén el lenguaje de las máquinas.",
    "\"Necesito una fórmula en Google Sheets que [___] los valores de la columna [___] solo cuando la columna [___] sea igual a [___]. Explica cómo funciona la fórmula y dónde debo [___] en la planilla.\"",
    ["sume", "B", "C", "\"Aprobado\"", "insertarla"],
    ["sume", "B", "C", "\"Aprobado\"", "insertarla"],
    "Delegar no solo la creación de la fórmula, sino su implantación guiada extingue la posibilidad del famoso error '#VALUE!'."
  ),
  textStep(
    "Analizando Datos Pegados en la Conversación",
    "Puedes copiar los datos de tu planilla, pegarlos directamente en la conversación con Gemini y pedir análisis, comparaciones e interpretaciones — sin necesitar ningún plugin o integración."
  ),
  fillStep(
    "¡Analiza tus datos!",
    "Transforma inmensas columnas estáticas en un resumen inteligente.",
    "\"Aquí están los datos de [___] de mi planilla: [pegar los datos]. Analiza y dime: cuál [___] tuvo mejor desempeño, cuáles [___] están por debajo de la media, cuál es la [___] general y cuáles [___] merecen investigación.\"",
    ["ventas por región", "región", "regiones", "tendencia", "números fuera de patrón"],
    ["ventas por región", "región", "regiones", "tendencia", "números fuera de patrón"],
    "Forzar a Gemini a destacar los desvíos enfoca el análisis al campo de la gestión directiva."
  ),
  textStep(
    "Identificando Errores e Inconsistencias",
    "Gemini logra revisar tus datos e identificar errores que pasarían desapercibidos en una lectura rápida — valores duplicados, celdas vacías, números fuera del patrón y formatos rotos."
  ),
  fillStep(
    "¡Revisa tu planilla!",
    "Termina con los errores de tipeo y agujeros en tu base de datos.",
    "\"Aquí están los datos de mi planilla de [___]: [pega los datos]. Identifica: [___] duplicados, celdas que deberían tener valor pero están [___], números que parecen [___] para el contexto y cualquier [___] de formato entre columnas.\"",
    ["registro de clientes", "registros", "vacías", "fuera de patrón", "inconsistencia"],
    ["registro de clientes", "registros", "vacías", "fuera de patrón", "inconsistencia"],
    "Un simple prompt elimina horas gastadas revisando cientos de largas listas a ojo desnudo."
  ),
  textStep(
    "Generando Insights Estratégicos con Datos",
    "Además de calcular, Gemini transforma números en conclusiones estratégicas — qué significan los datos, qué funciona y dónde están las oportunidades ocultas."
  ),
  fillStep(
    "¡Transforma datos en decisiones!",
    "Obliga al bot a ser tu Analista de Datos Jefe.",
    "\"Aquí están los datos de [___] de los últimos [___] meses: [pega los datos]. En base a estos números, dime: cuál es la [___] identificada, cuáles [___] merecen atención, qué [___] revelan sobre el comportamiento del negocio y cuáles [___] recomiendas.\"",
    ["facturación y gastos", "6", "tendencia principal", "puntos de alerta", "datos", "3 acciones"],
    ["facturación y gastos", "6", "tendencia principal", "puntos de alerta", "datos", "3 acciones"],
    "Exigir 'Acciones Recomendadas' saca a la IA de su rol pasivo obligándola a proponer salidas comerciales reales."
  ),
  quizStep(
    "Analizador Jefe de Insights",
    "¿Qué prompt genera el insight más estratégico a partir de datos estáticos?",
    [
      "\"¿Qué opinas de estos números?\"",
      "\"¿Estos datos están bien o mal?\"",
      "\"Analiza estos datos de rendimiento y dime: qué crece, qué cae, cuál es el patrón dominante y qué decisiones directivas sugieren estos números para el próximo trimestre.\"",
      "\"Calcula el promedio matemático de estos valores.\""
    ],
    2,
    "Los mejores resultados vienen de peticiones polifacéticas; jamás te conformes con promedios, exige tendencias y soluciones."
  ),
  textStep(
    "Creando Estructuras de Planillas desde Cero",
    "¿No sabes cómo montar una planilla para un proyecto nuevo? Gemini crea la estructura completa — columnas, categorías, fórmulas sugeridas y lógica operativa — dejándote solo la tarea de llenarla."
  ),
  fillStep(
    "¡Crea tu planilla desde cero!",
    "Evita frustraciones de formato obteniendo cimientos sólidos de inmediato.",
    "\"Crea la estructura de una planilla de [___] para un [___]. Incluye: todas las [___] necesarias, la [___] lógica de la información, [___] sugeridas para automatizar cálculos y una pestaña de [___] para visualizar totales.\"",
    ["control financiero mensual", "negocio pequeño", "columnas", "organización", "fórmulas", "resumen"],
    ["control financiero mensual", "negocio pequeño", "columnas", "organización", "fórmulas", "resumen"],
    "Dar el contexto comercial garantiza que tu planilla hable la misma jerga que tu industria."
  ),
  textStep(
    "Automatizando Tareas con Google Apps Script",
    "Para operadores avanzados, Gemini escribe scripts en Google Apps Script — permitiéndote automatizar interminables bucles rutinarios directamente en Google Sheets sin saber una pizca de programación."
  ),
  fillStep(
    "¡Automatiza ferozmente con Gemini!",
    "Trae un desarrollador ejecutivo directo a tus macros.",
    "\"Escribe un script altamente resistente en Google Apps Script que [___] automáticamente los datos de la pestaña [___] y los organice en la pestaña [___] por orden [___], agrupados por [___]. Explica paso a paso cómo debo [___] este script en mi planilla en vivo.\"",
    ["copie", "Datos Brutos", "Reporte", "descendente", "categoría", "instalar y ejecutar"],
    ["copie", "Datos Brutos", "Reporte", "descendente", "categoría", "instalar y ejecutar"],
    "Tener el script es medio camino; obligar al bot a explicarte cómo pegarlo sin explotar el editor técnico es la victoria completa."
  ),
  textStep(
    "Erigiendo Dashboards y Paneles Visuales",
    "Gemini actúa como arquitecto orientándote minuciosamente para levantar comandos visuales — qué tipo de gráficos desplegar, cómo canalizar métricas base, y organizarlo todo estéticamente para líderes."
  ),
  textStep(
    "Cruzando Planillas ante Diferidas Versiones",
    "¿Atrapado lúgubremente entre identificar qué diablos cambió radicalmente respecto de la versión anterior de la plantilla sin volverse loco? Gemini intercepta copias colisionándolas e identificando disonancias sutiles al vuelo."
  ),
  textStep(
    "Conclusión",
    "Al unleashing Gemini, el intimidante y tedioso letargo de la matriz contable crasa muta violentamente de una barrera frustrante a convertirse en un arsenal invencible altamente directivo. Formulación arcana en parpadeos, destilación analítica directiva férrea letal, blindado hermético contra fallos invisibles estáticos silenciosos ciegos mudos mudos crudos y yugo dominador y absoluto sobre arquitecturas y dashboards. Todo por un simple golpe implacable comunicativo de tu propio idioma y voz nativa.\n\nEl brutal poder latía allí adentro en estático. Hoy con ello el dominio táctico y el absoluto de y de y de e de e a t t o todo e te ob ob es. Datos controlados. Ejecutoria impecable y letal."
  )
] as const;

export const GEMINI_MODULE_4_STEPS_FR = [
  textStep(
    "Gemini pour Google Sheets avec l'Intelligence Artificielle",
    "Bon retour ! Dans cette leçon, vous allez apprendre comment Gemini transforme votre expérience avec les feuilles de calcul — en analysant des données, en créant des formules, en générant des graphiques et en automatisant des tâches directement dans Google Sheets, sans avoir besoin d'être un expert en Excel ou en programmation.\n\nPourquoi Gemini est-il un Allié Puissant pour les Feuilles de Calcul ?\nLes feuilles de calcul sont l'un des outils les plus utilisés dans le monde professionnel — et aussi l'un des plus sous-utilisés. La plupart des gens n'utilisent que 10 % du potentiel de Google Sheets. Avec l'intégration de Gemini, ce potentiel devient accessible à tous, quel que soit le niveau technique."
  ),
  textStep(
    "Création de Formules avec Gemini",
    "L'un des plus grands blocages pour ceux qui utilisent des feuilles de calcul est de ne pas connaître la bonne formule. Avec Gemini, vous décrivez ce que vous voulez calculer en français et il vous donne la formule prête à être copiée et collée."
  ),
  fillStep(
    "Demandez votre formule !",
    "Décrivez le calcul en langage humain et obtenez le langage des machines.",
    "\"J'ai besoin d'une formule dans Google Sheets qui [___] les valeurs de la colonne [___] uniquement lorsque la colonne [___] est égale à [___]. Explique comment fonctionne la formule et où je dois l'[___] dans le tableur.\"",
    ["additionne", "B", "C", "\"Approuvé\"", "insérer"],
    ["additionne", "B", "C", "\"Approuvé\"", "insérer"],
    "Déléguer non seulement la création de la formule, mais aussi son implantation guidée élimine la possibilité de la fameuse erreur '#VALUE!'."
  ),
  textStep(
    "Analyse de Données Collées dans la Conversation",
    "Vous pouvez copier les données de votre feuille de calcul, les coller directement dans la conversation avec Gemini et demander des analyses, des comparaisons et des interprétations — sans avoir besoin d'aucun plugin ou intégration."
  ),
  fillStep(
    "Analysez vos données !",
    "Transformez d'immenses colonnes statiques en un résumé intelligent.",
    "\"Voici les données des [___] de mon tableur : [coller les données]. Analyse et dis-moi : quelle [___] a eu les meilleures performances, quelles [___] sont en dessous de la moyenne, quelle est la [___] générale et quels [___] méritent d'être étudiés.\"",
    ["ventes par région", "région", "régions", "tendance", "nombres hors norme"],
    ["ventes par région", "région", "régions", "tendance", "nombres hors norme"],
    "Forcer Gemini à mettre en évidence les écarts dirige l'analyse vers le domaine de la gestion de direction."
  ),
  textStep(
    "Identification des Erreurs et des Incohérences",
    "Gemini peut analyser vos données et identifier les erreurs qui passeraient inaperçues lors d'une lecture rapide : valeurs en double, cellules vides, nombres hors normes et formats cassés."
  ),
  fillStep(
    "Révisez votre tableur !",
    "Mettez fin aux fautes de frappe et aux trous dans votre base de données.",
    "\"Voici les données de mon tableur de [___] : [coller les données]. Identifie : les [___] en double, les cellules qui devraient avoir une valeur mais sont [___], les nombres qui semblent [___] pour le contexte et toute [___] de format entre les colonnes.\"",
    ["registre des clients", "registres", "vides", "hors norme", "incohérence"],
    ["registre des clients", "registres", "vides", "hors norme", "incohérence"],
    "Un simple prompt élimine les heures passées à vérifier à l'œil nu des centaines de longues listes."
  ),
  textStep(
    "Génération d'Insights Stratégiques à partir des Données",
    "En plus de calculer, Gemini transforme les nombres en conclusions stratégiques : que signifient les données, ce qui fonctionne et où se trouvent les opportunités cachées."
  ),
  fillStep(
    "Transformez les données en décisions !",
    "Forcez le bot à être votre Analyste de Données en Chef.",
    "\"Voici les données de [___] des [___] derniers mois : [coller les données]. Sur la base de ces nombres, dis-moi : quelle est la [___] identifiée, quels [___] méritent une attention, que révèlent ces [___] sur le comportement de l'entreprise et quelles [___] recommandes-tu.\"",
    ["facturation et dépenses", "6", "tendance principale", "points d'alerte", "données", "3 actions"],
    ["facturation et dépenses", "6", "tendance principale", "points d'alerte", "données", "3 actions"],
    "L'exigence d''Actions Recommandées' sort l'IA de son rôle passif et l'oblige à proposer de véritables solutions commerciales."
  ),
  quizStep(
    "Analyste en Chef de l'Aperçu",
    "Quel prompt génère l'insight le plus stratégique à partir de données statiques ?",
    [
      "\"Que penses-tu de ces nombres ?\"",
      "\"Ces données sont-elles bonnes ou mauvaises ?\"",
      "\"Analyse ces données de performance et dis-moi : ce qui augmente, ce qui baisse, quel est le modèle dominant et quelles décisions de gestion ces nombres suggèrent pour le prochain trimestre.\"",
      "\"Calcule la moyenne mathématique de ces valeurs.\""
    ],
    2,
    "Les meilleurs résultats proviennent de demandes multiples ; ne vous contentez jamais de moyennes, exigez des tendances et des solutions."
  ),
  textStep(
    "Création de Structures de Tableurs à partir de Zéro",
    "Vous ne savez pas comment configurer un tableur pour un nouveau projet ? Gemini crée la structure complète : colonnes, catégories, formules suggérées et logique opérationnelle, vous laissant ainsi avec pour seule tâche de le remplir."
  ),
  fillStep(
    "Créez votre tableur à partir de zéro !",
    "Évitez les frustrations liées à la mise en forme en obtenant des fondations solides dès le départ.",
    "\"Crée la structure d'un tableur de [___] pour une [___]. Inclus : toutes les [___] nécessaires, l'[___] logique des informations, les [___] suggérées pour automatiser les calculs et un onglet de [___] pour visualiser les totaux.\"",
    ["contrôle financier mensuel", "petite entreprise", "colonnes", "organisation", "formules", "résumé"],
    ["contrôle financier mensuel", "petite entreprise", "colonnes", "organisation", "formules", "résumé"],
    "Donner le contexte commercial permet à votre feuille de calcul de parler le même jargon que votre secteur d'activité."
  ),
  textStep(
    "Automatisation des Tâches avec Google Apps Script",
    "Pour les opérateurs avancés, Gemini rédige des scripts dans Google Apps Script, ce qui vous permet d'automatiser des boucles de routine interminables directement dans Google Sheets sans avoir à connaître un peu de programmation."
  ),
  fillStep(
    "Automatisez de manière féroce avec Gemini !",
    "Faites appel à un développeur exécutif pour vos macros.",
    "\"Écris un script très résistant dans Google Apps Script qui [___] automatiquement les données de l'onglet [___] et les organise dans l'onglet [___] par ordre [___], regroupées par [___]. Explique pas à pas comment je dois [___] ce script dans mon tableur en direct.\"",
    ["copie", "Données Brutes", "Rapport", "décroissant", "catégorie", "installer et exécuter"],
    ["copie", "Données Brutes", "Rapport", "décroissant", "catégorie", "installer et exécuter"],
    "Avoir le script est la moitié de la bataille ; forcer le bot à vous expliquer comment le coller sans exploiter l'éditeur technique est la victoire complète."
  ),
  textStep(
    "Création de Tableaux de Bord et Panneaux Visuels",
    "Gemini agit comme un architecte qui vous guide minutieusement dans l'élaboration de commandes visuelles — quel type de graphiques déployer, comment canaliser les mesures de base, et tout organiser de manière esthétique pour les leaders."
  ),
  textStep(
    "Croisement de Tableurs pour des Versions Différentes",
    "Coincé entre le fait d'essayer d'identifier ce qui a radicalement changé par rapport à la version précédente du tableur sans devenir fou ? Gemini intercepte les copies en les entrechoquant et en identifiant à la volée les dissemblances subtiles."
  ),
  textStep(
    "Conclusion",
    "En libérant Gemini, l'inertie pesante et décourageante de la matrice de comptabilité morne se modifie d'un revers accablant pour endosser un pouvoir d'administration implacable d'une qualité hors pair. Dérivation sans faille de formules alambiquées, processus irréprochable et pointu qui met en perspective les informations pertinentes pour une excellente capacité managériale qui exclut efficacement toute source d'anomalies indiscernables... L'arsenal puissant conféré bat en un simple signal oral émis sans difficulté avec la certitude de la langue de base de l'agent.\n\nCe colossal dynamisme logeait immobile au préalable dans des tableaux. Actuellement et avec son appui, un avantage implacable et décisif. Analyse des flux. Réponse exceptionnelle, propre et redoutable."
  )
] as const;
