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
  quizStep(
    "Capacidade Real nas Planilhas",
    "O que o Gemini consegue fazer dentro do Google Sheets?",
    [
      "Criar fórmulas, analisar dados, gerar insights e automatizar tarefas diretamente na planilha",
      "Editar planilhas de outras pessoas sem permissão",
      "Substituir completamente o conhecimento de Excel e Google Sheets",
      "Funciona apenas com planilhas em inglês"
    ],
    0,
    "Ele funciona como um macro-assistente de cálculos e estruturação permitindo elevar planilhas básicas a um patamar super profissional em segundos."
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
  quizStep(
    "Programação em Linguagem Natural",
    "Por que descrever o que você quer calcular é mais eficiente do que tentar lembrar a fórmula?",
    [
      "Porque o Gemini insere a fórmula automaticamente na planilha",
      "Para evitar qualquer aprendizado sobre planilhas",
      "Porque você chega ao resultado em segundos sem precisar pesquisar em tutoriais — e ainda entende como a fórmula funciona pela explicação do Gemini",
      "Fórmulas geradas pelo Gemini são exclusivas e não funcionam em outros contextos"
    ],
    2,
    "Você converte um problema engessado de sintaxe matemática num prompt prático, dominando fórmulas super avançadas mesmo sem background em exatas."
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
  quizStep(
    "A Arte da Transferência de Dados",
    "Qual é a melhor forma de compartilhar dados de uma planilha com o Gemini?",
    [
      "Tirar uma foto da planilha e enviar como imagem",
      "Descrever os dados em texto sem copiar os valores reais",
      "Copiar as células diretamente da planilha e colar na conversa — o Gemini lê a estrutura tabular e processa os valores com precisão",
      "Exportar para PDF antes de enviar para o Gemini"
    ],
    2,
    "Ao usar `CTRL+C` e `CTRL+V` nas colunas, o Gemini identifica invisivelmente as separações entre campos (tabs/vírgulas) assegurando a contagem fiel."
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
  quizStep(
    "Segurança da Informação Plena",
    "Por que usar o Gemini para revisar dados antes de criar relatórios é importante?",
    [
      "Porque o Gemini corrige os erros automaticamente na planilha original",
      "Para deixar a planilha com mais linhas e colunas",
      "Porque erros nos dados de origem comprometem qualquer análise ou relatório gerado a partir deles — identificar antes garante que as decisões serão baseadas em informações corretas",
      "Revisão de dados só é necessária em planilhas muito grandes"
    ],
    2,
    "Garantir a qualidade (limpeza) do banco de dados na ponta assegura que gráficos e painéis diretores nunca reflitam informações fantasiosas."
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
  quizStep(
    "Domador de Modelos Estruturais",
    "O que você deve fazer após receber a estrutura de planilha criada pelo Gemini?",
    [
      "Usar exatamente como foi entregue sem nenhum ajuste",
      "Criar uma nova planilha do zero ignorando a sugestão",
      "Usar como base e pedir ajustes específicos para adaptar à realidade do seu negócio — adicionando ou removendo colunas conforme necessário",
      "A estrutura só funciona no Google Sheets, no Excel não"
    ],
    2,
    "Sempre pegue o bruto oferecido pela máquina e invista vinte segundos lapidando os pormenores na sua tela manual — é aqui que nasce a perfeição corporativa."
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
  quizStep(
    "Dominando Automações Complexas",
    "Por que pedir ao Gemini para explicar o script gerado é importante?",
    [
      "Para deixar a resposta mais longa",
      "Porque scripts sem explicação não funcionam no Google Sheets",
      "Para que você entenda o que o código faz antes de executá-lo, podendo identificar ajustes necessários e aprender o suficiente para modificar no futuro",
      "A explicação é opcional e não agrega valor prático"
    ],
    2,
    "Scripts são linguagens de execução de software; inseri-los à cega aumenta as chances de estragos colaterais na aba de comandos, logo a explicação linha a linha blinda você de panes lógicas."
  ),
  textStep(
    "Criando Dashboards e Visualizações",
    "O Gemini pode orientar passo a passo a criação de dashboards visuais no Google Sheets — indicando quais gráficos usar, como organizar os dados e como criar uma visão executiva dos seus números."
  ),
  fillStep(
    "Monte seu dashboard!",
    "Planeje o painel interativo inteiro numa única pergunta central.",
    "\"Quero criar um dashboard no Google Sheets para acompanhar [___]. Me diga: quais [___] devo incluir, qual [___] de gráfico é mais adequado para cada métrica, como [___] os dados para alimentar o dashboard e quais [___] incluir para facilitar a leitura.\"",
    ["o desempenho de vendas da minha equipe", "métricas principais", "tipo", "organizar", "elementos visuais"],
    ["o desempenho de vendas da minha equipe", "métricas principais", "tipo", "organizar", "elementos visuais"],
    "Você vira roteirista em vez de digitador: dita o painel de longe e deixa o bot mapear que estilo do gráfico expõe o volume com maior clareza visual."
  ),
  quizStep(
    "Regras de Painel Gerencial (Dashboard)",
    "Qual é a melhor sequência para criar um dashboard com ajuda do Gemini?",
    [
      "Criar os gráficos primeiro e depois organizar os dados",
      "Pedir ao Gemini para criar o dashboard automaticamente sem fornecer os dados",
      "Definir quais métricas quer visualizar, organizar os dados com ajuda do Gemini, criar as fórmulas e depois construir os gráficos seguindo as orientações recebidas",
      "Dashboards no Google Sheets não funcionam com dados gerados pelo Gemini"
    ],
    2,
    "Gráficos são sempre o topo da pirâmide; deve-se asseverar uma sustentação estrita dos pilares basais (os números e métodos exatos) no primeiro degrau evolutivo da folha."
  ),
  textStep(
    "Comparando Planilhas e Versões",
    "Quando você tem duas versões de uma planilha e precisa entender o que mudou, o Gemini consegue comparar os dados colados e identificar diferenças, alterações e discrepâncias."
  ),
  fillStep(
    "Compare suas planilhas!",
    "Encontre rapidamente os descompassos perigosos ou mudanças.",
    "\"Aqui estão duas versões da planilha de [___]: [cole versão 1] e [cole versão 2]. Compare e me diga: quais [___] foram alterados, quais [___] foram adicionados ou removidos e se existe alguma [___] que pode indicar um [___] nos dados.\"",
    ["inventário de produtos", "valores", "itens", "inconsistência", "erro de lançamento"],
    ["inventário de produtos", "valores", "itens", "inconsistência", "erro de lançamento"],
    "Deixe para os robôs o terrível martírio visual de confrontar linhas idênticas exaustivamente atrás de variações unitárias irrisórias no fim de um mês contábil conturbado."
  ),
  quizStep(
    "O Custo da Discrepância de Versão",
    "Qual é o uso mais estratégico do Gemini ao comparar planilhas?",
    [
      "Apenas verificar se o número de linhas é igual entre as versões",
      "Pedir ao Gemini para escolher qual versão é a correta",
      "Identificar mudanças específicas, entender o impacto de cada alteração e detectar possíveis erros antes que afetem relatórios e decisões",
      "O Gemini não consegue comparar duas planilhas ao mesmo tempo"
    ],
    2,
    "Sua capacidade de checar diferenças linha por linha desaloja deuses esguios escondidos sob a vasta névoa de edições cruzadas do time inteiro da sexta-feira à noite."
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
  quizStep(
    "Actual Capability Within Sheets",
    "What exactly can Gemini execute when deployed within Google Sheets?",
    [
      "Forge complex formulas, parse massive datasets, synthesize strategic insights, and automate repetitive drudgery directly on the grid",
      "Illegitimately edit third-party private spreadsheets entirely bypassing sharing permissions",
      "Instantly replace and render entirely obsolete any foundational knowledge of Excel and Google Sheets",
      "Function exclusively on domains and spreadsheets anchored strictly to the English language"
    ],
    0,
    "It acts as a macro-assistant for calculations and structuring, letting you scale basic lists into elite professional matrices instantly."
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
  quizStep(
    "Natural Language Programming",
    "Why does narrating your calculation intent grossly outperform struggling to memorize rigid formulas?",
    [
      "Because Gemini invisibly forces the formula directly into your spreadsheet backend instantly",
      "To aggressively avoid having to ever learn anything about mathematical spreadsheets",
      "Because you secure the exact final calculation in seconds without hunting through obscure tutorials — and simultaneously grasp the logic thanks to Gemini's plain breakdown",
      "Formulas spit out by Gemini are highly unstable and inherently shatter when ported outside"
    ],
    2,
    "You bypass rigid syntax roadblocks by issuing practical prompts, commanding high-level formulas even lacking a mathematics degree."
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
  quizStep(
    "The Art of Information Transfer",
    "What remains the unequivocally supreme method for feeding spreadsheet data sets into the Gemini brain?",
    [
      "Snapping a physical photograph of the monitor screen and attaching it awkwardly as an image file",
      "Painfully narrating the data out as an endless text paragraph lacking actual numbered cells",
      "Brutally copying the raw cells directly off the sheet and pasting them bluntly into chat — Gemini flawlessly reads tabular architectures and digests the raw values hyper-accurately",
      "Mandating an export into an encrypted PDF protocol before bravely uploading it"
    ],
    2,
    "Using simple `CTRL+C` and `CTRL+V` on columns allows Gemini to invisibly detect field separators (tabs/commas), guaranteeing perfect tallies."
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
  quizStep(
    "Total Information Ironclad Security",
    "Why represents using Gemini to sanitize data before generating executive reports a matter of corporate survival?",
    [
      "Because Gemini possesses the magical administrative rights to autocorrect the original spreadsheet natively",
      "Simply to pad the spreadsheet with aesthetically pleasing extra rows and neat columns",
      "Because compromised upstream data inherently poisons any downstream analysis or dashboard born from it — filtering errors extremely early ensures final decisions lean purely on bulletproof realities",
      "Scrubbing data is universally deemed a waste unless the spreadsheet surpasses fifty thousand lines"
    ],
    2,
    "Ensuring database purity (sanitation) at the earliest stage guarantees that high-level dashboards never hallucinate phantom business metrics."
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
  quizStep(
    "Taming Scaffold Models",
    "What dictates the absolute correct protocol the minute you receive the skeletal spreadsheet architecture handed over by Gemini?",
    [
      "Deploy it entirely blindly exactly as generated without altering a single punctuation mark",
      "Trash the output completely, deciding to build it from zero the hard manual way regardless",
      "Treat it as a heavyweight foundational baseline, immediately demanding heavily specific adjustments to seamlessly map it to your precise operational reality — aggressively adding or gutting columns as practically needed",
      "Realize the architecture bizarrely only functions natively on Google Sheets while permanently glitching any Excel platforms"
    ],
    2,
    "Consistently harvest the brute block generated by the machine and invest twenty sharp seconds chiseling the intricate corners natively on your screen — absolute corporate perfection is born here."
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
  quizStep(
    "Dominating Complex Automations",
    "Why represents forcing Gemini to rigorously explain its freshly generated script a non-negotiable step?",
    [
      "Merely to artificially stretch the text density of the output window expansively",
      "Because silent, unexplained scripts natively trigger fail-safes inside Google Sheets preventing execution",
      "So you comprehensively decode what the machine's code triggers prior to executing it live, inherently allowing you to pinpoint necessary tweaks and gradually absorb the logic needed for future modifications",
      "The explanation phase technically remains a vanity option completely devoid of actionable worth"
    ],
    2,
    "Scripts act as live execution software; injecting them blindly multiplies the odds of catastrophic collateral damage across your grid tabs, making a line-by-line debriefing your ultimate shield against logic meltdowns."
  ),
  textStep(
    "Architecting Dashboards and Visualizing Data",
    "Gemini coaches you painstakingly through erecting executive visual dashboards inside Google Sheets — dictating exactly which charts to leverage, orienting data pipelines, and structuring your numbers into an elite command center."
  ),
  fillStep(
    "Erect your command dashboard!",
    "Blueprint the entire interactive panel utilizing a single master question.",
    "\"I urgently need to construct a robust Google Sheets dashboard aimed squarely at tracking [___]. Dictate to me: specifically which core [___] demand inclusion, exactly what [___] of charting is brutally effective for each metric, entirely how to [___] the raw data pipelines feeding the beast, and explicitly what visual [___] to embed speeding up the executive read.\"",
    ["my team's sales performance", "metrics", "type", "organize", "elements"],
    ["my team's sales performance", "metrics", "type", "organize", "elements"],
    "You ascend to director instead of typist: you dictate the panel broadly from afar, permitting the bot to obsess over which graph style exposes the absolute volume with maximum visual ferocity."
  ),
  quizStep(
    "Laws of Executive Panels (Dashboards)",
    "Which chronological sequence is officially heralded as the master execution path for constructing dashboards alongside Gemini?",
    [
      "Blindly spawning the graphical charts first, subsequently attempting to shoehorn raw data inside them",
      "Demanding Gemini miraculously generate the full dashboard instantly devoid of supplying it any baseline metrics",
      "Strictly defining target metrics first, ruthlessly organizing the data pipelines alongside Gemini, locking down mathematical formulas, and finally raising the graphical charts exactly following the generated navigational compass",
      "Live dashboards within Google Sheets inherently refuse to sync functionally utilizing AI-generated structuring"
    ],
    2,
    "Graphs infinitely remain the absolute tip of the pyramid; one must undeniably secure a rigid lock on the foundational bedrock (the exact numbers and parsing methods) along the very first evolutionary step of the sheet."
  ),
  textStep(
    "Pitting Sheets Against Versions",
    "Saddled with two divergent iterations of a massive grid desperately needing to isolate the mutations? Gemini cross-examines the pasted data grids, aggressively pinpointing shifts, edits, and volatile discrepancies."
  ),
  fillStep(
    "Cross-examine your sheets!",
    "Rapidly isolate dangerous desyncs or unauthorized overnight shifts.",
    "\"Attached below lie two completely isolated versions involving our [___] sheet: [paste version 1] followed by [paste version 2]. Cross-examine them ruthlessly and expose: exactly which [___] mutated, explicitly which [___] were silently added or gutted, and alert me if a severe [___] surfaces hinting squarely at a catastrophic data [___].\"",
    ["product inventory", "values", "items", "inconsistency", "entry error"],
    ["product inventory", "values", "items", "inconsistency", "entry error"],
    "Discharge unto the robots the hellish visual martyrdom of manually cross-referencing brutally identical columns chasing microscopic numeric variations at the exhausted tail-end of chaotic fiscal cycles."
  ),
  quizStep(
    "The Lethal Cost of Version Discrepancy",
    "What embodies the single most devastatingly strategic employment of Gemini during spreadsheet collision tracking?",
    [
      "Aping a simple row-count tally ensuring both files maintain identical vertical lengths",
      "Pathetically begging Gemini to arbitrarily guess which iteration happens to be the officially authorized file",
      "Surgically isolating extremely specific mutations, deeply comprehending the ripple effect of each edit, and neutralizing lurking phantom errors long before they successfully poison executive reports and finalized decisions",
      "Gemini inherently crashes attempting to juggle two distinct spreadsheet structures simultaneously via prompt"
    ],
    2,
    "Its unyielding capability to scrutinize variations line-by-line evicts elusive ghosts hiding underneath the dense fog of an entire team's chaotic Friday night cross-editing sessions."
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
  quizStep(
    "Capacidad Real en las Planillas",
    "¿Qué logra hacer Gemini dentro de Google Sheets?",
    [
      "Crear fórmulas, analizar datos, generar insights y automatizar tareas directamente en la planilla",
      "Editar planillas de otras personas sin permiso",
      "Sustituir completamente el conocimiento de Excel y Google Sheets",
      "Funciona solo con planillas en inglés"
    ],
    0,
    "Funciona como un macro-asistente de cálculos y estructuración permitiendo elevar planillas básicas a un nivel profesional en segundos."
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
  quizStep(
    "Programación en Lenguaje Natural",
    "¿Por qué describir lo que quieres calcular es más eficiente que intentar recordar la fórmula?",
    [
      "Porque Gemini inserta la fórmula automáticamente en la planilla",
      "Para evitar cualquier aprendizaje sobre planillas",
      "Porque llegas al resultado en segundos sin investigar tutoriales — y aún entiendes la lógica por la explicación de Gemini",
      "Las fórmulas generadas por Gemini son exclusivas y no funcionan en otros contextos"
    ],
    2,
    "Conviertes un problema rígido de sintaxis matemática en un prompt táctico, dominando fórmulas avanzadas incluso sin conocimientos en exactas."
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
  quizStep(
    "El Arte de la Transferencia de Datos",
    "¿Cuál es la mejor forma de compartir datos de una planilla con Gemini?",
    [
      "Tomar una foto de la planilla y enviarla como imagen",
      "Describir los datos en texto sin copiar los valores reales",
      "Copiar las celdas directamente de la planilla y pegar en la conversación — Gemini lee la estructura tabular y procesa los valores con precisión",
      "Exportar a PDF antes de enviar a Gemini"
    ],
    2,
    "Al usar el tradicional `CTRL+C` y `CTRL+V` en las columnas, Gemini identifica invisiblemente las separaciones garantizando un análisis fiel."
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
  quizStep(
    "Seguridad de la Información",
    "¿Por qué es vital usar Gemini para revisar datos antes de crear informes?",
    [
      "Porque Gemini corrige los errores automáticamente en la planilla original",
      "Para dejar la planilla con más líneas",
      "Porque errores en los datos de origen comprometen cualquier análisis posterior — identificar antes garantiza que las decisiones se basen en información correcta",
      "Revisar datos solo es necesario en planillas muy grandes"
    ],
    2,
    "Garantizar la calidad de la base de datos asegura que los paneles directivos nunca reflejen métricas fantasmas."
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
  quizStep(
    "El Domador de Modelos Estructurales",
    "¿Qué debes hacer segundos después de recibir la arquitectura recomendada por Gemini?",
    [
      "Usarla ciegamente sin alterar una sola letra",
      "Ignorarla y hacerla manualmente desde cero",
      "Usarla como una base masiva pidiendo ajustes muy específicos para acoplarla a tu realidad organizativa profunda",
      "Creer que tal plantilla solo es compatible con sistemas desfasados o anticuados"
    ],
    2,
    "Invierte veinte segundos perfilando el esquema rudo de Gemini directamente en tus columnas — es aquí donde nace el orden perfecto."
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
  quizStep(
    "Dominando Automatizaciones Lógicas",
    "¿Por qué forzar a Gemini a desglosarte la funcionalidad del script generado es vital?",
    [
      "Para hacer más pesado visualmente el chat",
      "Porque sin eso bloquea los permisos de seguridad nativamente",
      "Para decodificar su propósito previniendo daños lógicos accidentales a otras pestañas matrices al mismo tiempo que dominas conceptos rudimentarios para tus futuras modificaciones",
      "Porque caso contrario, el script expira en menos de treinta minutos en el editor."
    ],
    2,
    "Insertar código mágico a ciegas multiplica las chances de destrozar tu archivo accidentalmente."
  ),
  textStep(
    "Erigiendo Dashboards y Paneles Visuales",
    "Gemini actúa como arquitecto orientándote minuciosamente para levantar comandos visuales — qué tipo de gráficos desplegar, cómo canalizar métricas base, y organizarlo todo estéticamente para líderes."
  ),
  fillStep(
    "¡Construye paneles ejecutivos!",
    "Forja la consola maestra usando la pregunta maestra.",
    "\"Quiero estructurar un dashboard rudo en Google Sheets enfocado a auditar [___]. Dime sin rodeos: cuáles [___] centrales requiere, qué [___] de gráfico es indiscutiblemente letal para esa métrica, cómo [___] la tubería de datos y qué visuales [___] extras se imponen incluir.\"",
    ["rendimiento de volumen grupal", "métricas", "tipo", "organizar", "complementos"],
    ["rendimiento de volumen grupal", "métricas", "tipo", "organizar", "complementos"],
    "Dejas la labor trivial manual del cálculo al sistema y te conviertes velozmente en director absoluto de la visualización macro."
  ),
  quizStep(
    "Leyes Sagradas de Paneles Analíticos",
    "¿Cuál es el camino jerárquico inamovible al erigir dashboards apoyándose en Inteligencia Artificial?",
    [
      "Crear primero los dibujos gráficos y después intentar encajonar los fríos números dentro al azar",
      "Solicitar al IA que dispare un visual ya animado mágicamente en pleno chat",
      "Afinar primero el núcleo bruto numérico dictaminando qué medir, consolidando sus respectivas fórmulas y solo finalmente cediendo paso al maquillaje o estilización gráfica que lo corone arriba.",
      "Esquivar directamente su utilización ya que un dashboard rompe irremediablemente la cuadrícula interna tabular."
    ],
    2,
    "Los gráficos son y siempre serán el peldaño cosmético final basándose ciegamente en un sólido, rocoso e implacable núcleo matemático y métrico inalterable base subyacente inferior."
  ),
  textStep(
    "Cruzando Planillas ante Diferidas Versiones",
    "¿Atrapado lúgubremente entre identificar qué diablos cambió radicalmente respecto de la versión anterior de la plantilla sin volverse loco? Gemini intercepta copias colisionándolas e identificando disonancias sutiles al vuelo."
  ),
  fillStep(
    "¡Somete al choque tus bases en disputa!",
    "Arranca al sistema las discordancias que enmascaran catástrofes de sincronización de versiones.",
    "\"Inyecto enlazadas directamente a ti un par de sagradas versiones referidas al rastreo sobre nuestro [___]: [pega la versión inicial uno] y [pega la siguiente dos]. Chócalas inquisitivamente cara a cara sacando a flote qué [___] fue re-alterado, cuáles se [___] o eliminaron invisiblemente y alerta agresivamente indicando si salta un síntoma fatal que encare a un [___] desastroso contablemente irreversible.\"",
    ["registro inventarial físico en almacén", "registro", "añadieron", "error humano de manipulación o copiado manual"],
    ["registro inventarial físico en almacén", "registro", "añadieron", "error humano de manipulación o copiado manual"],
    "Sacudir esta agobiante tortura comparativa manual pasándosela directamente a un ente computacional blinda fuertemente un plácido cierre de mes a milésimas del agotamiento."
  ),
  quizStep(
    "El Muro Definitivo ante Colisiones Informáticas",
    "Al encarar las profundidades oscuras de dos bases que teóricamente dicen expresar lo mismo pero divergen siniestramente, ¿qué meta domina imperativamente y define la estocada maestra al llamar a Gemini?",
    [
      "Mera e inútil sumatoria aritmética comparando de un latigazo general superficial la cuenta básica bruta para verificar líneas coincidentes",
      "Implorar que una adivinación del oráculo digital lance la moneda de la suerte por una de las dos plantillas en pleno sorteo y juego del azar inútil ciego.",
      "Asilar quirúrgicamente las fugas, rastrear los micro-movimientos oscuros inasibles y desterrar letalmente fantasmas contables desincronizados muchísimo antes que manchen irrevocablemente a todo comité ejecutivo directivo con datos ilusorios fantasiosos apócrifos y ficticios.",
      "Generar en cadena un bloqueo informático absoluto interno letárgico rompiendo irrevocablemente tu plataforma y sistema nativamente."
    ],
    2,
    "Su mirada atroz en modo microscopio expulsa toda sombra, disonancia y anomalía encarnizada por tu batallón de colaboradores cruzando sucios archivos toda una lúgubre noche contable."
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
  quizStep(
    "Capacité Réelle dans les Tableurs",
    "Que peut faire Gemini dans Google Sheets ?",
    [
      "Créer des formules, analyser des données, générer des insights et automatiser des tâches directement dans le tableur",
      "Modifier les tableurs d'autres personnes sans permission",
      "Remplacer complètement les connaissances d'Excel et de Google Sheets",
      "Il ne fonctionne qu'avec des tableurs en anglais"
    ],
    0,
    "Il fonctionne comme un macro-assistant de calculs et de structuration, permettant d'élever des feuilles de calcul de base à un niveau professionnel en quelques secondes."
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
  quizStep(
    "Programmation en Langage Naturel",
    "Pourquoi décrire ce que vous voulez calculer est-il plus efficace que d'essayer de se souvenir de la formule ?",
    [
      "Parce que Gemini insère la formule automatiquement dans le tableur",
      "Pour éviter tout apprentissage sur les tableurs",
      "Parce que vous obtenez le résultat en quelques secondes sans chercher de tutoriels — et vous comprenez toujours la logique grâce à l'explication de Gemini",
      "Les formules générées par Gemini sont exclusives et ne fonctionnent pas dans d'autres contextes"
    ],
    2,
    "Vous transformez un problème rigide de syntaxe mathématique en un prompt tactique, maîtrisant des formules avancées même sans connaissances en sciences exactes."
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
  quizStep(
    "L'Art du Transfert de Données",
    "Quelle est la meilleure façon de partager des données d'une feuille de calcul avec Gemini ?",
    [
      "Prendre une photo du tableur et l'envoyer comme image",
      "Décrire les données sous forme de texte sans copier les vraies valeurs",
      "Copier les cellules directement du tableur et les coller dans la conversation — Gemini lit la structure tabulaire et traite les valeurs avec précision",
      "Exporter en PDF avant d'envoyer à Gemini"
    ],
    2,
    "En utilisant le `CTRL+C` et `CTRL+V` traditionnel sur les colonnes, Gemini identifie de manière invisible les séparations, garantissant une analyse fidèle."
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
  quizStep(
    "Sécurité de l'Information",
    "Pourquoi est-il vital d'utiliser Gemini pour réviser les données avant de créer des rapports ?",
    [
      "Parce que Gemini corrige les erreurs automatiquement dans le tableur d'origine",
      "Pour ajouter plus de lignes à la feuille de calcul",
      "C'est parce que des erreurs dans les données sources compromettent toute analyse ultérieure : les identifier au préalable permet de s'assurer que les décisions sont fondées sur des informations correctes.",
      "La révision des données n'est nécessaire que pour les très grands tableurs"
    ],
    2,
    "Garantir la qualité de la base de données permet de s'assurer que les tableaux de bord de gestion ne reflètent jamais d'indicateurs fantômes."
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
  quizStep(
    "Le Maître des Modèles Structurels",
    "Que devez-vous faire quelques secondes après avoir reçu l'architecture recommandée par Gemini ?",
    [
      "L'utiliser aveuglément sans changer une seule lettre",
      "L'ignorer et le faire manuellement à partir de zéro",
      "L'utiliser comme une base massive, en demandant des ajustements très spécifiques pour l'adapter à vos profondes réalités organisationnelles",
      "Croire qu'un tel modèle n'est compatible qu'avec des systèmes obsolètes ou vieillissants"
    ],
    2,
    "Passez vingt secondes à profiler le schéma de base de Gemini directement dans vos colonnes : c'est là que l'ordre parfait est né."
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
  quizStep(
    "Maîtriser les Automatisations Logiques",
    "Pourquoi est-il vital de forcer Gemini à détailler la fonctionnalité du script généré ?",
    [
      "Pour alourdir visuellement le chat",
      "Parce que sans cela, il bloque les autorisations de sécurité en mode natif",
      "Afin de décoder son but, évitant ainsi des dommages logiques accidentels aux autres onglets maîtres, tout en maîtrisant les concepts rudimentaires pour vos modifications futures",
      "Parce que dans le cas contraire, le script expire dans l'éditeur au bout de moins de trente minutes."
    ],
    2,
    "Insérer aveuglément du code magique multiplie les chances de détruire accidentellement votre fichier."
  ),
  textStep(
    "Création de Tableaux de Bord et Panneaux Visuels",
    "Gemini agit comme un architecte qui vous guide minutieusement dans l'élaboration de commandes visuelles — quel type de graphiques déployer, comment canaliser les mesures de base, et tout organiser de manière esthétique pour les leaders."
  ),
  fillStep(
    "Construisez des panneaux exécutifs !",
    "Forgez la console principale en posant la question principale.",
    "\"Je veux structurer un tableau de bord percutant sur Google Sheets, axé sur l'audit de [___]. Dis-moi franchement : quelles [___] principales nécessite-t-il, quel [___] de graphique est indiscutablement essentiel pour cette métrique, comment [___] le pipeline de données et quels [___] visuels supplémentaires doivent être inclus.\"",
    ["performance des volumes de groupe", "métriques", "type", "organiser", "compléments"],
    ["performance des volumes de groupe", "métriques", "type", "organiser", "compléments"],
    "Vous laissez le travail manuel fastidieux du calcul au système et devenez rapidement le maître absolu de la visualisation macro."
  ),
  quizStep(
    "Lois Sacrées des Panneaux Analytiques",
    "Quel est le chemin hiérarchique inamovible pour ériger des tableaux de bord en s'appuyant sur l'intelligence artificielle ?",
    [
      "Créer d'abord les dessins graphiques, puis essayer d'y insérer les numéros froids au hasard",
      "Demander à l'IA de déclencher un visuel déjà animé et magique en plein chat",
      "Affiner d'abord le noyau numérique brut en dictant ce qu'il faut mesurer, consolider leurs formules respectives et ensuite seulement laisser place à la cosmétique ou le style graphique qui le couronne",
      "L'éviter complètement car un tableau de bord casse irrémédiablement la grille tabulaire interne."
    ],
    2,
    "Les graphiques sont et seront toujours la touche cosmétique finale, reposant aveuglément sur un noyau mathématique et métrique solide, inébranlable et immuable en dessous."
  ),
  textStep(
    "Croisement de Tableurs pour des Versions Différentes",
    "Coincé entre le fait d'essayer d'identifier ce qui a radicalement changé par rapport à la version précédente du tableur sans devenir fou ? Gemini intercepte les copies en les entrechoquant et en identifiant à la volée les dissemblances subtiles."
  ),
  fillStep(
    "Confrontez vos bases discordantes !",
    "Arrachez au système les divergences qui masquent les catastrophes de synchronisation de version.",
    "\"Je lie et injecte directement une paire de versions saintes se rapportant au suivi sur notre [___]: [coller la version unice initiale] et [coller la suivante deux]. Compare-les de manière inquisitionnelle l'une face à l'autre en soulignant ce qui a été [___], ce qui a été [___] ou retiré sans qu'on le remarque et alerte de façon agressive en signalant un symptôme fatal qui conduirait à une irréversible erreur de manipulation au niveau de la comptabilité : [___].\"",
    ["inventaire physique en entrepôt", "ré-altéré", "ajouté", "erreur humaine de saisie manuelle"],
    ["inventaire physique en entrepôt", "ré-altéré", "ajouté", "erreur humaine de saisie manuelle"],
    "Transférer cette torture comparative fastidieuse et manuelle directement à une entité informatique blinde un bouclage de mois en douceur, à des années-lumière de l'épuisement."
  ),
  quizStep(
    "Le Mur Décisif Face aux Collisions Informatiques",
    "En faisant face aux sombres abysses de deux bases qui, en principe, prétendent exprimer le même concept, mais qui se séparent d'une manière sinistre, quel est l'impératif premier et constitue l'astuce maîtresse pour faire appel à Gemini ?",
    [
      "Le simple et futile calcul arithmétique qui donne une liste peu pertinente de résultats des calculs de base quantifiant les lignes coïncidentes",
      "Quémander que les pouvoirs devinatoires de l'oracle en ligne jouent à un jeu de chance aveugle et vain",
      "Isoler de manière analytique les failles, tracer les obscurs micro-mouvements indiscernables, et détruire les discordances fantômes concernant la comptabilité bien avant qu'ils ne souillent fatalement les informations décisionnelles frauduleuses au niveau du comité de direction à un niveau exécutif et de conseil.",
      "Engendrer consécutivement une barricade intra-informatique inerte bloquant votre interface native d'une part comme de l'autre de manière inaltérable."
    ],
    2,
    "Son approche méticuleuse sous un regard perçant exclut impitoyablement tout spectre de dissonance ou toute incertitude que le régiment de la main-d'œuvre traquerait autrement désespérément en balayant tout un fatras de paperasse non classée pendant une longue durée pendant la soirée des bilans d'entreprise."
  ),
  textStep(
    "Conclusion",
    "En libérant Gemini, l'inertie pesante et décourageante de la matrice de comptabilité morne se modifie d'un revers accablant pour endosser un pouvoir d'administration implacable d'une qualité hors pair. Dérivation sans faille de formules alambiquées, processus irréprochable et pointu qui met en perspective les informations pertinentes pour une excellente capacité managériale qui exclut efficacement toute source d'anomalies indiscernables... L'arsenal puissant conféré bat en un simple signal oral émis sans difficulté avec la certitude de la langue de base de l'agent.\n\nCe colossal dynamisme logeait immobile au préalable dans des tableaux. Actuellement et avec son appui, un avantage implacable et décisif. Analyse des flux. Réponse exceptionnelle, propre et redoutable."
  )
] as const;
