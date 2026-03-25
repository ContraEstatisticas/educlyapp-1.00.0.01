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

export const CLAUDE_MODULE_1_STEPS_PT = [
  textStep(
    "Claude como Seu Assistente Inteligente",
    "Bem-vindo a esta licao. Aqui voce vai descobrir como usar o Claude, o assistente de IA da Anthropic, para turbinar sua produtividade, criatividade e aprendizado. O Claude tem caracteristicas unicas que o diferenciam de outras IAs, e entender essas diferencas muda a forma como voce trabalha."
  ),
  textStep(
    "O que e o Claude?",
    "O Claude e um assistente de inteligencia artificial desenvolvido pela Anthropic. Ele foi criado com foco em ser util, honesto e seguro. Isso significa que ele nao apenas responde, mas raciocina junto com voce, questiona premissas quando necessario e admite quando nao tem certeza sobre algo."
  ),
  quizStep(
    "Diferencial do Claude",
    "O que diferencia o Claude de outros assistentes de IA?",
    [
      "Ele foi desenvolvido com foco em raciocinio aprofundado, honestidade e respostas contextualizadas.",
      "Ele memoriza todas as suas conversas anteriores automaticamente.",
      "Ele acessa a internet em tempo real sem nenhuma configuracao.",
      "Ele nunca comete erros em nenhuma circunstancia."
    ],
    0,
    "O principal diferencial do Claude esta na combinacao entre profundidade de raciocinio, honestidade sobre limites e respostas contextualizadas."
  ),
  textStep(
    "Como o Claude Pensa",
    "Diferente de uma busca no Google, que retorna links, o Claude le sua mensagem inteira, interpreta o contexto e construi uma resposta coerente do inicio ao fim. Quanto mais contexto voce fornece, mais precisa e util tende a ser a resposta."
  ),
  fillStep(
    "Preencha a lacuna - Ative o melhor do Claude!",
    "Monte um prompt completo para pedir ajuda com clareza e contexto.",
    '"Voce e um ___ com experiencia em ___. Preciso de ajuda para ___. Meu nivel de conhecimento no assunto e ___ e o objetivo final e ___."',
    [
      "especialista em financas pessoais",
      "investimentos para iniciantes",
      "montar minha primeira carteira de investimentos",
      "basico",
      "ter uma reserva de emergencia solida em 12 meses"
    ],
    [
      "especialista em financas pessoais",
      "investimentos para iniciantes",
      "montar minha primeira carteira de investimentos",
      "basico",
      "ter uma reserva de emergencia solida em 12 meses",
      "advogado criminal",
      "nivel avancado",
      "esquecer meu objetivo"
    ],
    "Quando voce define papel, contexto, tarefa, nivel atual e objetivo final, o Claude consegue responder com muito mais precisao."
  ),
  textStep(
    "O que o Claude Faz Muito Bem",
    "O Claude se destaca em tarefas que exigem raciocinio, analise e escrita de qualidade. Ele analisa textos, raciocina sobre problemas complexos, escreve com qualidade e explica conceitos em profundidade. Ele nao gera imagens, nao executa tarefas em outros aplicativos automaticamente e nao substitui a opiniao de um especialista humano, mas dentro do seu territorio e uma das ferramentas mais poderosas disponiveis."
  ),
  textStep(
    "Conversando com o Claude de Forma Estrategica",
    "O Claude responde melhor quando voce trata a conversa como um dialogo, nao como uma busca. Voce pode fazer perguntas de acompanhamento, pedir refinamentos e construir a resposta ideal ao longo de varios turnos. Se a primeira resposta nao foi exatamente o que voce precisava, nao comece do zero: refine."
  ),
  fillStep(
    "Preencha a lacuna - Refine sua conversa!",
    "Refine a resposta sem perder o contexto da conversa.",
    '"Gostei da resposta, mas quero que voce ___ a segunda parte, use um tom mais ___ e adicione ___ praticos para alguem que esta comecando do zero."',
    ["aprofunde", "acessivel", "exemplos"],
    ["aprofunde", "acessivel", "exemplos", "ignore", "tecnico demais", "graficos"],
    "Refinar a conversa aproveita o contexto acumulado e leva a uma resposta mais alinhada ao que voce realmente precisa."
  ),
  textStep(
    "Claude para Analise e Raciocinio",
    "Uma das maiores forcas do Claude e a capacidade de analisar situacoes complexas, considerar multiplos angulos e apresentar uma visao equilibrada sem esconder as partes dificeis."
  ),
  fillStep(
    "Preencha a lacuna - Peca uma analise completa!",
    "Monte um prompt para receber uma avaliacao equilibrada.",
    '"Analise a situacao abaixo considerando ___ diferentes perspectivas. Para cada uma, apresente os ___ e os ___. Ao final, de sua recomendacao mais ___ com base nos fatos apresentados. [Descreva a situacao]"',
    ["3", "pontos positivos", "pontos negativos", "equilibrada"],
    ["3", "pontos positivos", "pontos negativos", "equilibrada", "2", "argumentos vagos", "certeza absoluta"],
    "Esse tipo de estrutura ajuda o Claude a comparar cenarios, mapear riscos e entregar uma recomendacao mais madura."
  ),
  textStep(
    "Claude para Escrita e Revisao de Textos",
    "O Claude escreve com naturalidade, adapta o tom ao contexto e consegue imitar diferentes estilos de escrita. Mais do que isso, ele explica o raciocinio por tras de cada escolha quando voce pede."
  ),
  quizStep(
    "Prompt de escrita mais forte",
    "Qual prompt aproveita melhor a capacidade de escrita do Claude?",
    [
      "\"Escreva um texto sobre sustentabilidade\"",
      "\"Faca um texto bom e criativo\"",
      "\"Reescreva o texto abaixo mantendo as ideias originais, mas com um tom mais conversacional e direto. Depois explique as principais mudancas que fez e por que. [Cole o texto aqui]\"",
      "\"Corrija apenas os erros de portugues\""
    ],
    2,
    "O melhor prompt preserva o objetivo original, define o tom desejado e ainda pede transparencia sobre as mudancas feitas."
  ),
  textStep(
    "Claude para Brainstorming e Tomada de Decisao",
    "Quando voce precisa tomar uma decisao dificil ou explorar possibilidades, o Claude vai alem de listar opcoes: ele raciocina junto com voce, questiona premissas e aponta pontos cegos. Use-o para organizar informacoes, mapear riscos e enxergar o que voce nao esta considerando. A decisao final sempre e sua."
  ),
  fillStep(
    "Preencha a lacuna - Use o Claude para decidir melhor!",
    "Monte um pedido de apoio para uma decisao importante.",
    '"Preciso decidir entre ___. Meus criterios mais importantes sao ___. Antes de recomendar, me ___ se estou considerando todos os fatores relevantes ou se existe algum ___ que nao estou levando em conta."',
    [
      "duas propostas de emprego",
      "salario, crescimento e qualidade de vida",
      "questione",
      "ponto cego"
    ],
    [
      "duas propostas de emprego",
      "salario, crescimento e qualidade de vida",
      "questione",
      "ponto cego",
      "uma serie aleatoria",
      "ignore",
      "detalhe irrelevante"
    ],
    "Esse formato transforma o Claude em um parceiro de decisao, nao apenas em uma maquina de opcoes soltas."
  ),
  textStep(
    "Honestidade como Diferencial",
    "O Claude foi desenvolvido para ser honesto, inclusive quando a resposta honesta nao e a que voce quer ouvir. Ele admite incertezas, sinaliza quando nao tem informacoes suficientes e nao inventa dados para parecer mais util."
  ),
  quizStep(
    "Quando ha incerteza",
    "O que o Claude faz quando nao tem certeza sobre uma informacao?",
    [
      "Inventa uma resposta convincente para nao decepcionar o usuario.",
      "Ignora a pergunta e muda de assunto.",
      "Sinaliza a incerteza claramente e sugere que voce verifique em fontes especializadas.",
      "Repete a pergunta de volta para ganhar tempo."
    ],
    2,
    "A honestidade sobre limites e incertezas e uma parte central da experiencia esperada com o Claude."
  ),
  textStep(
    "Usando o Claude no Dia a Dia",
    "O Claude fica mais util quando integrado a sua rotina como um parceiro de pensamento, nao apenas para tarefas pontuais."
  ),
  fillStep(
    "Preencha a lacuna - Monte sua rotina com o Claude!",
    "Transforme o Claude em parte da sua rotina de trabalho.",
    '"Quero usar o Claude para ___ no meu dia a dia. Me sugira ___ formas praticas de integra-lo a minha ___, com exemplos de prompts que eu possa usar ___ nas minhas tarefas mais comuns."',
    [
      "aumentar minha produtividade",
      "5",
      "rotina de trabalho",
      "imediatamente"
    ],
    [
      "aumentar minha produtividade",
      "5",
      "rotina de trabalho",
      "imediatamente",
      "evitar pensar",
      "100",
      "vida inteira"
    ],
    "Quando voce pede integracao pratica e imediata, o Claude sai da teoria e entra no seu fluxo real."
  ),
  textStep(
    "Conclusao",
    "O Claude e um assistente que raciocina, questiona e colabora, nao apenas executa. Quanto mais contexto, clareza e intencao voce colocar nos seus prompts, mais poderoso ele se torna. Use-o como parceiro de pensamento no seu dia a dia e voce vai perceber que as melhores respostas nao vem de perguntas simples, e sim de conversas bem construidas.\n\nLicao concluida."
  ),
] as const;

export const CLAUDE_MODULE_1_STEPS_EN = CLAUDE_MODULE_1_STEPS_PT;
export const CLAUDE_MODULE_1_STEPS_ES = CLAUDE_MODULE_1_STEPS_PT;
export const CLAUDE_MODULE_1_STEPS_FR = CLAUDE_MODULE_1_STEPS_PT;
