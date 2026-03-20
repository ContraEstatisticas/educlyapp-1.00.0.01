import fs from 'fs';
import path from 'path';

const localesDir = 'c:\\Users\\User\\Documents\\GitHub\\Marcos\\educlyapp-1.00.0.01\\src\\i18n\\locales';

const descriptions = {
  pt: {
    copilot: "demonstrando domínio em produtividade assistida por IA, integração com o ecossistema Microsoft 365 e fluxos de trabalho corporativos.",
    grok: "demonstrando domínio em análise de informações em tempo real, raciocínio lógico avançado e exploração de dados.",
    perplexity: "demonstrando domínio em pesquisa inteligente, verificação de fontes e síntese de informações complexas.",
    manus: "demonstrando domínio em automação web com agentes de IA, execução de tarefas complexas e navegação assistida.",
    leonardo: "demonstrando domínio em geração de arte digital, manipulação de modelos de imagem e design criativo de alta performance.",
    midjourney: "demonstrando domínio em criação visual artística de alta fidelidade, exploração de estilos e composição avançada com IA.",
    veo: "demonstrando domínio em geração de vídeos cinematográficos, animação por IA e narrativas visuais orientadas a dados."
  },
  en: {
    copilot: "demonstrating mastery in AI-assisted productivity, Microsoft 365 ecosystem integration, and enterprise workflows.",
    grok: "demonstrating mastery in real-time information analysis, advanced logical reasoning, and data exploration.",
    perplexity: "demonstrating mastery in intelligent search, source verification, and synthesis of complex information.",
    manus: "demonstrating mastery in web automation with AI agents, complex task execution, and assisted navigation.",
    leonardo: "demonstrating mastery in digital art generation, image model manipulation, and high-performance creative design.",
    midjourney: "demonstrating mastery in high-fidelity artistic visual creation, style exploration, and advanced AI composition.",
    veo: "demonstrating mastery in cinematic video generation, AI animation, and data-driven visual storytelling."
  },
  es: {
    copilot: "demostrando dominio en productividad asistida por IA, integración con el ecosistema Microsoft 365 y flujos de trabajo corporativos.",
    grok: "demostrando dominio en análisis de información en tempo real, razonamiento lógico avanzado y exploración de datos.",
    perplexity: "demostrando dominio en búsqueda inteligente, verificación de fuentes y síntesis de información compleja.",
    manus: "demostrando dominio en automatización web con agentes de IA, ejecución de tareas complejas y navegación asistida.",
    leonardo: "demostrando dominio en generación de arte digital, manipulación de modelos de imagen y diseño creativo de alto rendimiento.",
    midjourney: "demostrando dominio en creación visual artística de alta fidelidad, exploración de estilos y composición avanzada con IA.",
    veo: "demostrando dominio en generación de videos cinematográficos, animación por IA y narrativas visuales orientadas a datos."
  },
  fr: {
    copilot: "démontrant sa maîtrise de la productivité assistée par l'IA, de l'intégration de l'écosystème Microsoft 365 et des workflows d'entreprise.",
    grok: "démontrant sa maîtrise de l'analyse d'informations en temps réel, du raisonnement logique avancé et de l'exploration de données.",
    perplexity: "démontrant sa maîtrise de la recherche intelligente, de la vérification des sources et de la synthèse d'informations complexes.",
    manus: "démontrant sa maîtrise de l'automatisation Web avec des agents d'IA, de l'exécution de tâches complexes et de la navigation assistée.",
    leonardo: "démontrant sa maîtrise de la génération d'art numérique, de la manipulation de modèles d'images et du design créatif haute performance.",
    midjourney: "démontrant sa maîtrise de la création visuelle artistique haute fidélité, de l'exploration de styles et de la composition IA avancée.",
    veo: "démontrant sa maîtrise de la génération de vidéos cinématographiques, de l'animation par IA et du storytelling visuel axé sur les données."
  },
  it: {
    copilot: "dimostrando padronanza nella produttività assistita dall'IA, nell'integrazione dell'ecosistema Microsoft 365 e nei workflow aziendali.",
    grok: "dimostrando padronanza nell'analisi delle informazioni in tempo reale, nel ragionamento logico avanzato e nell'esplorazione dei dati.",
    perplexity: "dimostrando padronanza nella ricerca intelligente, nella verifica delle fonti e nella sintesi di informazioni complesse.",
    manus: "dimostrando padronanza nell'automazione web con agenti IA, nell'esecuzione di compiti complessi e nella navigazione assistita.",
    leonardo: "dimostrando padronanza nella generazione di arte digitale, nella manipolazione di modelli di immagine e nel design creativo ad alte prestazioni.",
    midjourney: "dimostrando padronanza nella creazione visuale artistica ad alta fedeltà, nell'esplorazione degli stili e nella composizione IA avanzata.",
    veo: "dimostrando padronanza nella generazione di video cinematografici, nell'animazione tramite IA e nello storytelling visuale basato sui dati."
  }
};

const defaultDesc = descriptions.en;

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const lang = file.split('.')[0];
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!data.certificate) data.certificate = {};
  if (!data.certificate.canvas) data.certificate.canvas = {};
  if (!data.certificate.canvas.toolDescription) data.certificate.canvas.toolDescription = {};

  const langDesc = descriptions[lang] || defaultDesc;
  
  Object.keys(langDesc).forEach(tool => {
    data.certificate.canvas.toolDescription[tool] = langDesc[tool];
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${file}`);
});

console.log('Finished updating tool descriptions in all locales.');
