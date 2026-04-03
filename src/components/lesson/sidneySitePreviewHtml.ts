import landingPageHtmlRaw from "../../../Landing Page.txt?raw";
import ecommerceHtmlRaw from "../../../e-commerce.txt?raw";
import nutritionBlogHtmlRaw from "../../../Site blog nutrição.txt?raw";

import type { SidneyJourneyLocale } from "@/components/lesson/sidneyDay1JourneyCopy";

type SiteOptionId = "A" | "B" | "C";
type ReplacementEntry = readonly [string, string];

const HTML_LANGUAGE_BY_LOCALE: Record<SidneyJourneyLocale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

const SITE_URLS: Record<SiteOptionId, string> = {
  A: "https://senda.educly.site",
  B: "https://forma.educly.store",
  C: "https://raiz.educly.blog",
};

const MOJIBAKE_FIXES: ReplacementEntry[] = [
  ["â€”", "—"],
  ["â€“", "–"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€¦", "…"],
  ["âˆ’", "−"],
  ["Â©", "©"],
  ["Âº", "º"],
  ["Â²", "²"],
  ["Â·", "·"],
  ["Ã€", "À"],
  ["Ã", "Á"],
  ["Ã‚", "Â"],
  ["Ãƒ", "Ã"],
  ["Ã‡", "Ç"],
  ["Ãˆ", "È"],
  ["Ã‰", "É"],
  ["ÃŠ", "Ê"],
  ["Ã", "Í"],
  ["Ã“", "Ó"],
  ["Ã”", "Ô"],
  ["Ã•", "Õ"],
  ["Ãš", "Ú"],
  ["Ã ", "à"],
  ["Ã¡", "á"],
  ["Ã¢", "â"],
  ["Ã£", "ã"],
  ["Ã§", "ç"],
  ["Ã¨", "è"],
  ["Ã©", "é"],
  ["Ãª", "ê"],
  ["Ã­", "í"],
  ["Ã³", "ó"],
  ["Ã´", "ô"],
  ["Ãµ", "õ"],
  ["Ãº", "ú"],
  ["Ã¼", "ü"],
  ["Ã±", "ñ"],
];

const PREVIEW_STYLE_PATCH = `
<style>
  .cursor,
  .cursor-ring,
  .cur,
  .cur-ring {
    display: none !important;
  }

  body,
  a,
  button,
  input,
  select,
  textarea,
  .gallery-item,
  .diff-item,
  .post-card,
  .article-card,
  .cat-item {
    cursor: auto !important;
  }

  html,
  body {
    overscroll-behavior: contain;
  }
</style>
`;

const LANDING_TRANSLATIONS: Partial<
  Record<SidneyJourneyLocale, Record<string, string>>
> = {
  en: {
    "Senda — Residencial": "Senda — Residence",
    "Agendar Visita": "Schedule a Visit",
    "Residencial de Alto Padrão": "Luxury Residence",
    "Viver<br>\n        com <em>arte.</em>": "Live<br>\n        with <em>art.</em>",
    "O apartamento Senda é uma expressão singular de elegância contemporânea. Cada detalhe foi concebido para quem reconhece o valor do extraordinário.":
      "The Senda apartment is a singular expression of contemporary elegance. Every detail was designed for people who recognize the value of the extraordinary.",
    "Quero Conhecer": "Book a Tour",
    "Ver Ambientes": "View Spaces",
    "Área Privativa": "Private Area",
    "Dormitórios": "Bedrooms",
    "Vagas na Garagem": "Parking Spaces",
    "Andar Alto": "High Floor",
    "Unidade Disponível": "Available Unit",
    "Cada espaço,<br>uma <em>experiência.</em>":
      "Every space,<br>an <em>experience.</em>",
    "Ambientes Únicos": "Unique Spaces",
    "Living Principal": "Main Living Room",
    "Varanda Gourmet": "Gourmet Balcony",
    "Cozinha Integrada": "Integrated Kitchen",
    "Padrão<br>Construtivo": "Build<br>Quality",
    "Diferenciais": "Highlights",
    "O que torna<br>o Senda <em>único.</em>":
      "What makes<br>Senda <em>unique.</em>",
    "Pé Direito Duplo": "Double-Height Ceiling",
    "Living com 4,2m de altura, criando uma amplitude visual incomum.":
      "Living room with a 4.2m ceiling height, creating an uncommon sense of scale.",
    "Automação Total": "Full Automation",
    "Iluminação, climatização e segurança integrados ao seu smartphone.":
      "Lighting, climate control, and security integrated with your smartphone.",
    "Vista Panorâmica": "Panoramic View",
    "18º andar com visão privilegiada da cidade e horizon sem obstruções.":
      "18th floor with an open city view and an unobstructed horizon.",
    "Acabamentos Nobres": "Premium Finishes",
    "Mármore carrara, madeira de lei e metais Dornbracht em todos os banheiros.":
      "Carrara marble, hardwood, and Dornbracht fixtures in every bathroom.",
    "Lazer Exclusivo": "Private Leisure",
    "Piscina infinity, spa, academia e rooftop de uso reservado aos moradores.":
      "Infinity pool, spa, gym, and rooftop reserved for residents.",
    "Portaria 24h": "24/7 Concierge",
    "Sistema de controle de acesso com biometria e reconhecimento facial.":
      "Access control system with biometrics and facial recognition.",
    "Contato": "Contact",
    "Agende sua<br>visita <em>exclusiva.</em>":
      "Book your<br><em>private</em> tour.",
    "Uma visita guiada com atendimento personalizado. Nossa equipe está pronta para apresentar cada detalhe deste imóvel único.":
      "A guided visit with tailored service. Our team is ready to walk you through every detail of this unique property.",
    "Nome": "Name",
    "Seu nome completo": "Your full name",
    "Telefone": "Phone",
    "E-mail": "Email",
    "Melhor Período": "Best Time",
    "Selecione um período": "Select a time slot",
    "Manhã (9h às 12h)": "Morning (9am to 12pm)",
    "Tarde (14h às 18h)": "Afternoon (2pm to 6pm)",
    "Noite (19h às 21h)": "Evening (7pm to 9pm)",
    "Mensagem": "Message",
    "Deixe aqui suas dúvidas ou observações...":
      "Leave your questions or notes here...",
    "Solicitar Visita Exclusiva": "Request a Private Tour",
    "Localização Privilegiada": "Prime Location",
    "Shopping Flamboyant — 3 min": "Flamboyant Mall — 3 min",
    "Parque Flamboyant — 5 min": "Flamboyant Park — 5 min",
    "Todos os direitos reservados.": "All rights reserved.",
    "Mensagem enviada. Em breve entraremos em contato.":
      "Message sent. We will contact you soon.",
  },
  es: {
    "Agendar Visita": "Agendar visita",
    "Residencial de Alto Padrão": "Residencial de alto nivel",
    "Viver<br>\n        com <em>arte.</em>":
      "Vivir<br>\n        con <em>arte.</em>",
    "O apartamento Senda é uma expressão singular de elegância contemporânea. Cada detalhe foi concebido para quem reconhece o valor do extraordinário.":
      "El apartamento Senda es una expresion singular de elegancia contemporanea. Cada detalle fue concebido para quienes reconocen el valor de lo extraordinario.",
    "Quero Conhecer": "Quiero conocerlo",
    "Ver Ambientes": "Ver ambientes",
    "Área Privativa": "Area privada",
    "Dormitórios": "Dormitorios",
    "Vagas na Garagem": "Plazas de garaje",
    "Andar Alto": "Piso alto",
    "Unidade Disponível": "Unidad disponible",
    "Cada espaço,<br>uma <em>experiência.</em>":
      "Cada espacio,<br>una <em>experiencia.</em>",
    "Ambientes Únicos": "Espacios unicos",
    "Living Principal": "Sala principal",
    "Varanda Gourmet": "Terraza gourmet",
    "Cozinha Integrada": "Cocina integrada",
    "Padrão<br>Construtivo": "Nivel<br>constructivo",
    "Diferenciais": "Diferenciales",
    "O que torna<br>o Senda <em>único.</em>":
      "Lo que hace<br>a Senda <em>unico.</em>",
    "Pé Direito Duplo": "Doble altura",
    "Living com 4,2m de altura, criando uma amplitude visual incomum.":
      "Sala con 4,2 m de altura, creando una sensacion de amplitud poco comun.",
    "Automação Total": "Automatizacion total",
    "Iluminação, climatização e segurança integrados ao seu smartphone.":
      "Iluminacion, climatizacion y seguridad integradas a tu smartphone.",
    "Vista Panorâmica": "Vista panoramica",
    "18º andar com visão privilegiada da cidade e horizon sem obstruções.":
      "Piso 18 con vista privilegiada de la ciudad y horizonte despejado.",
    "Acabamentos Nobres": "Acabados nobles",
    "Mármore carrara, madeira de lei e metais Dornbracht em todos os banheiros.":
      "Marmol carrara, madera noble y griferia Dornbracht en todos los banos.",
    "Lazer Exclusivo": "Amenidades exclusivas",
    "Piscina infinity, spa, academia e rooftop de uso reservado aos moradores.":
      "Piscina infinity, spa, gimnasio y rooftop de uso reservado para residentes.",
    "Portaria 24h": "Recepcion 24 h",
    "Sistema de controle de acesso com biometria e reconhecimento facial.":
      "Sistema de control de acceso con biometria y reconocimiento facial.",
    "Contato": "Contacto",
    "Agende sua<br>visita <em>exclusiva.</em>":
      "Agenda tu<br>visita <em>exclusiva.</em>",
    "Uma visita guiada com atendimento personalizado. Nossa equipe está pronta para apresentar cada detalhe deste imóvel único.":
      "Una visita guiada con atencion personalizada. Nuestro equipo esta listo para mostrarte cada detalle de esta propiedad unica.",
    "Nome": "Nombre",
    "Seu nome completo": "Tu nombre completo",
    "Telefone": "Telefono",
    "E-mail": "Correo",
    "Melhor Período": "Mejor horario",
    "Selecione um período": "Selecciona un horario",
    "Manhã (9h às 12h)": "Manana (9h a 12h)",
    "Tarde (14h às 18h)": "Tarde (14h a 18h)",
    "Noite (19h às 21h)": "Noche (19h a 21h)",
    "Mensagem": "Mensaje",
    "Deixe aqui suas dúvidas ou observações...":
      "Deja aqui tus dudas u observaciones...",
    "Solicitar Visita Exclusiva": "Solicitar visita exclusiva",
    "Localização Privilegiada": "Ubicacion privilegiada",
    "Todos os direitos reservados.": "Todos los derechos reservados.",
    "Mensagem enviada. Em breve entraremos em contato.":
      "Mensaje enviado. Pronto nos pondremos en contacto.",
  },
  fr: {
    "Senda — Residencial": "Senda — Residence",
    "Agendar Visita": "Planifier une visite",
    "Residencial de Alto Padrão": "Residence haut de gamme",
    "Viver<br>\n        com <em>arte.</em>":
      "Vivre<br>\n        avec <em>art.</em>",
    "O apartamento Senda é uma expressão singular de elegância contemporânea. Cada detalhe foi concebido para quem reconhece o valor do extraordinário.":
      "L'appartement Senda est une expression singuliere de l'elegance contemporaine. Chaque detail a ete pense pour ceux qui reconnaissent la valeur de l'exceptionnel.",
    "Quero Conhecer": "Je veux decouvrir",
    "Ver Ambientes": "Voir les espaces",
    "Área Privativa": "Surface privee",
    "Dormitórios": "Chambres",
    "Vagas na Garagem": "Places de parking",
    "Andar Alto": "Etage eleve",
    "Unidade Disponível": "Unite disponible",
    "Cada espaço,<br>uma <em>experiência.</em>":
      "Chaque espace,<br>une <em>experience.</em>",
    "Ambientes Únicos": "Espaces uniques",
    "Living Principal": "Sejour principal",
    "Varanda Gourmet": "Terrasse gourmet",
    "Cozinha Integrada": "Cuisine integree",
    "Padrão<br>Construtivo": "Niveau<br>constructif",
    "Diferenciais": "Atouts",
    "O que torna<br>o Senda <em>único.</em>":
      "Ce qui rend<br>Senda <em>unique.</em>",
    "Pé Direito Duplo": "Double hauteur",
    "Living com 4,2m de altura, criando uma amplitude visual incomum.":
      "Sejour avec 4,2 m de hauteur sous plafond, creant une ampleur visuelle rare.",
    "Automação Total": "Automatisation totale",
    "Iluminação, climatização e segurança integrados ao seu smartphone.":
      "Eclairage, climatisation et securite integres a votre smartphone.",
    "Vista Panorâmica": "Vue panoramique",
    "18º andar com visão privilegiada da cidade e horizon sem obstruções.":
      "18e etage avec vue privilegiee sur la ville et horizon degage.",
    "Acabamentos Nobres": "Finitions nobles",
    "Mármore carrara, madeira de lei e metais Dornbracht em todos os banheiros.":
      "Marbre de Carrare, bois noble et robinetterie Dornbracht dans toutes les salles de bain.",
    "Lazer Exclusivo": "Loisirs exclusifs",
    "Piscina infinity, spa, academia e rooftop de uso reservado aos moradores.":
      "Piscine a debordement, spa, salle de sport et rooftop reserves aux residents.",
    "Portaria 24h": "Reception 24h/24",
    "Sistema de controle de acesso com biometria e reconhecimento facial.":
      "Systeme de controle d'acces avec biometrie et reconnaissance faciale.",
    "Contato": "Contact",
    "Agende sua<br>visita <em>exclusiva.</em>":
      "Planifiez votre<br>visite <em>exclusive.</em>",
    "Uma visita guiada com atendimento personalizado. Nossa equipe está pronta para apresentar cada detalhe deste imóvel único.":
      "Une visite guidee avec un accompagnement personnalise. Notre equipe est prete a vous presenter chaque detail de ce bien unique.",
    "Nome": "Nom",
    "Seu nome completo": "Votre nom complet",
    "Telefone": "Telephone",
    "E-mail": "Email",
    "Melhor Período": "Meilleur moment",
    "Selecione um período": "Selectionnez un creneau",
    "Manhã (9h às 12h)": "Matin (9h a 12h)",
    "Tarde (14h às 18h)": "Apres-midi (14h a 18h)",
    "Noite (19h às 21h)": "Soir (19h a 21h)",
    "Mensagem": "Message",
    "Deixe aqui suas dúvidas ou observações...":
      "Laissez ici vos questions ou remarques...",
    "Solicitar Visita Exclusiva": "Demander une visite exclusive",
    "Localização Privilegiada": "Emplacement privilegie",
    "Todos os direitos reservados.": "Tous droits reserves.",
    "Mensagem enviada. Em breve entraremos em contato.":
      "Message envoye. Nous vous contacterons bientot.",
  },
};

const ECOMMERCE_TRANSLATIONS: Partial<
  Record<SidneyJourneyLocale, Record<string, string>>
> = {
  en: {
    "FORMA — Moda": "FORMA — Fashion",
    'placeholder="Buscar..."': 'placeholder="Search..."',
    'title="Buscar"': 'title="Search"',
    'title="Carrinho"': 'title="Cart"',
    ">Todos<": ">All<",
    ">Calças<": ">Pants<",
    ">Vestidos<": ">Dresses<",
    ">Acessórios<": ">Accessories<",
    "Nova coleção / Primavera 2025": "New collection / Spring 2025",
    "Veste quem<br>você <em>é.</em>": "Wear who<br>you <em>are.</em>",
    "Ver coleção": "View collection",
    ">Novidades<": ">New arrivals<",
    ">Promoção<": ">Sale<",
    ">Menor preço<": ">Lowest price<",
    ">Maior preço<": ">Highest price<",
    'Nenhum produto encontrado para "': 'No products found for "',
    ">Tamanho<": ">Size<",
    ">Cor<": ">Color<",
    ">Adicionar ao carrinho<": ">Add to cart<",
    ">Carrinho<": ">Cart<",
    ">Finalizar compra<": ">Checkout<",
    ">Continuar comprando<": ">Keep shopping<",
    "Blazer Estruturado": "Structured Blazer",
    "Calça Wide Leg": "Wide-Leg Pants",
    "Vestido Midi Slip": "Midi Slip Dress",
    "Camiseta Essential": "Essential T-Shirt",
    "Saia Assimétrica": "Asymmetric Skirt",
    "Jaqueta Oversize": "Oversized Jacket",
    "Calça Alfaiataria": "Tailored Pants",
    "Vestido Chemise": "Chemise Dress",
    "Brinco Geométrico": "Geometric Earring",
    "Bolsa Tote": "Tote Bag",
    "Top Cropped Canelado": "Ribbed Cropped Top",
    "Vestido Longo Drapeado": "Long Draped Dress",
    "Calças": "Pants",
    "Acessórios": "Accessories",
    "Calcas": "Pants",
    "único": "one size",
    "Corte reto com ombros definidos. Tecido crepe de alta gramatura com forro parcial.":
      "Straight cut with defined shoulders. Heavy crepe fabric with partial lining.",
    "Modelagem ampla com cós alto e pregas frontais. Queda perfeita do quadril ao tornozelo.":
      "Wide-leg cut with a high waist and front pleats. A perfect drape from hip to ankle.",
    "Tecido acetinado com textura sedosa. Alças finas reguláveis e comprimento midi.":
      "Satin fabric with a silky texture. Thin adjustable straps and a midi length.",
    "Algodão 100% pima com caimento relaxado. Básica que eleva qualquer look.":
      "100% pima cotton with a relaxed fit. A basic piece that elevates any look.",
    "Barra diagonal com variação de comprimento. Tecido fluido de crepe italiano.":
      "Diagonal hem with an asymmetric length. Fluid Italian crepe fabric.",
    "Corte masculinizado com botões de pressão ocultos. Algodão thick-gauge importado.":
      "Masculine cut with hidden snap buttons. Imported thick-gauge cotton.",
    "Tecido blend lã-poliéster. Bolsos embutidos e cós com passantes finos.":
      "Wool-blend fabric with welt pockets and a slim belted waistband.",
    "Botões perolados ao longo do decote. Cinto incluso para marcar ou soltar a silhueta.":
      "Pearl buttons along the neckline. Includes a belt to define or relax the silhouette.",
    "Liga de zinco com banho de ouro 18k. Comprimento 6cm com movimento pendente.":
      "Zinc alloy with 18k gold plating. 6 cm length with a delicate drop movement.",
    'Couro vegetal com costuras à vista. Capacidade para notebook 13". Alça ajustável.':
      'Vegan leather with visible stitching. Fits a 13" laptop and includes an adjustable strap.',
    "Malha canelada com elastano. Decote redondo e comprimento cropped acima do umbigo.":
      "Ribbed knit with elastane. Round neckline and a cropped cut above the waist.",
    "Seda natural com drapeado na lateral. Fechamento invisível no lateral esquerdo.":
      "Natural silk with side draping. Invisible closure on the left side seam.",
    "count.textContent=list.length+' produto'+(list.length!==1?'s':'');":
      "count.textContent=list.length+' product'+(list.length!==1?'s':'');",
    "p.badge==='novo'?'Novo':'Sale'": "p.badge==='novo'?'New':'Sale'",
    ">Adicionar<": ">Add<",
    ">Ver mais<": ">View details<",
    "showToast('Selecione um tamanho');":
      "showToast('Select a size');",
    "showToast(currentProduct.name+' adicionado ao carrinho');":
      "showToast('Added to cart: '+currentProduct.name);",
    "showToast(p.name+' adicionado');":
      "showToast('Added: '+p.name);",
    "Seu carrinho está vazio.<br>Explore a coleção e adicione peças.":
      "Your cart is empty.<br>Explore the collection and add a few pieces.",
    "showToast('Em breve: checkout disponível!')":
      "showToast('Checkout coming soon!')",
    "'pt-BR'": "'en-US'",
  },
  es: {
    'title="Carrinho"': 'title="Carrito"',
    ">Calças<": ">Pantalones<",
    ">Acessórios<": ">Accesorios<",
    "Nova coleção / Primavera 2025": "Nueva coleccion / Primavera 2025",
    "Veste quem<br>você <em>é.</em>": "Viste quien<br>tu <em>eres.</em>",
    "Ver coleção": "Ver coleccion",
    ">Novidades<": ">Novedades<",
    ">Promoção<": ">Oferta<",
    ">Menor preço<": ">Menor precio<",
    ">Maior preço<": ">Mayor precio<",
    'Nenhum produto encontrado para "': 'No se encontraron productos para "',
    ">Tamanho<": ">Talla<",
    ">Cor<": ">Color<",
    ">Adicionar ao carrinho<": ">Agregar al carrito<",
    ">Carrinho<": ">Carrito<",
    ">Finalizar compra<": ">Finalizar compra<",
    ">Continuar comprando<": ">Seguir comprando<",
    "Blazer Estruturado": "Blazer estructurado",
    "Calça Wide Leg": "Pantalon wide leg",
    "Vestido Midi Slip": "Vestido midi slip",
    "Camiseta Essential": "Camiseta essential",
    "Saia Assimétrica": "Falda asimetrica",
    "Jaqueta Oversize": "Chaqueta oversize",
    "Calça Alfaiataria": "Pantalon de sastreria",
    "Vestido Chemise": "Vestido chemise",
    "Brinco Geométrico": "Pendiente geometrico",
    "Bolsa Tote": "Bolso tote",
    "Top Cropped Canelado": "Top cropped acanalado",
    "Vestido Longo Drapeado": "Vestido largo drapeado",
    "Calças": "Pantalones",
    "Acessórios": "Accesorios",
    "Calcas": "Pantalones",
    "único": "talla unica",
    "Corte reto com ombros definidos. Tecido crepe de alta gramatura com forro parcial.":
      "Corte recto con hombros definidos. Tejido crepe de alto gramaje con forro parcial.",
    "Modelagem ampla com cós alto e pregas frontais. Queda perfeita do quadril ao tornozelo.":
      "Corte amplio con cintura alta y pinzas frontales. Caida perfecta de la cadera al tobillo.",
    "Tecido acetinado com textura sedosa. Alças finas reguláveis e comprimento midi.":
      "Tejido satinado con textura sedosa. Tirantes finos ajustables y largo midi.",
    "Algodão 100% pima com caimento relaxado. Básica que eleva qualquer look.":
      "Algodon 100% pima con caida relajada. Un basico que eleva cualquier look.",
    "Barra diagonal com variação de comprimento. Tecido fluido de crepe italiano.":
      "Bajo diagonal con variacion de largo. Tejido fluido de crepe italiano.",
    "Corte masculinizado com botões de pressão ocultos. Algodão thick-gauge importado.":
      "Corte masculinizado con broches ocultos. Algodon importado de alto gramaje.",
    "Tecido blend lã-poliéster. Bolsos embutidos e cós com passantes finos.":
      "Tejido mezcla lana-poliester. Bolsillos discretos y cintura con trabillas finas.",
    "Botões perolados ao longo do decote. Cinto incluso para marcar ou soltar a silhueta.":
      "Botones perlados a lo largo del escote. Cinturon incluido para ajustar o soltar la silueta.",
    "Liga de zinco com banho de ouro 18k. Comprimento 6cm com movimento pendente.":
      "Aleacion de zinc con bano de oro 18k. Largo de 6 cm con movimiento colgante.",
    'Couro vegetal com costuras à vista. Capacidade para notebook 13". Alça ajustável.':
      'Cuero vegetal con costuras visibles. Capacidad para notebook de 13" y correa ajustable.',
    "Malha canelada com elastano. Decote redondo e comprimento cropped acima do umbigo.":
      "Tejido acanalado con elastano. Escote redondo y largo cropped por encima de la cintura.",
    "Seda natural com drapeado na lateral. Fechamento invisível no lateral esquerdo.":
      "Seda natural con drapeado lateral. Cierre invisible en el costado izquierdo.",
    "count.textContent=list.length+' produto'+(list.length!==1?'s':'');":
      "count.textContent=list.length+' producto'+(list.length!==1?'s':'');",
    "p.badge==='novo'?'Novo':'Sale'":
      "p.badge==='novo'?'Nuevo':'Sale'",
    ">Adicionar<": ">Agregar<",
    ">Ver mais<": ">Ver mas<",
    "showToast('Selecione um tamanho');":
      "showToast('Selecciona una talla');",
    "showToast(currentProduct.name+' adicionado ao carrinho');":
      "showToast('Agregado al carrito: '+currentProduct.name);",
    "showToast(p.name+' adicionado');":
      "showToast('Agregado: '+p.name);",
    "Seu carrinho está vazio.<br>Explore a coleção e adicione peças.":
      "Tu carrito esta vacio.<br>Explora la coleccion y agrega algunas piezas.",
    "showToast('Em breve: checkout disponível!')":
      "showToast('Proximamente: checkout disponible!')",
    "'pt-BR'": "'es-ES'",
  },
  fr: {
    "FORMA — Moda": "FORMA — Mode",
    'placeholder="Buscar..."': 'placeholder="Rechercher..."',
    'title="Buscar"': 'title="Rechercher"',
    'title="Carrinho"': 'title="Panier"',
    ">Todos<": ">Tous<",
    ">Calças<": ">Pantalons<",
    ">Vestidos<": ">Robes<",
    ">Acessórios<": ">Accessoires<",
    "Nova coleção / Primavera 2025": "Nouvelle collection / Printemps 2025",
    "Veste quem<br>você <em>é.</em>": "Porte ce que<br>tu <em>es.</em>",
    "Ver coleção": "Voir la collection",
    ">Novidades<": ">Nouveautes<",
    ">Promoção<": ">Promo<",
    ">Menor preço<": ">Prix le plus bas<",
    ">Maior preço<": ">Prix le plus eleve<",
    'Nenhum produto encontrado para "': 'Aucun produit trouve pour "',
    ">Tamanho<": ">Taille<",
    ">Cor<": ">Couleur<",
    ">Adicionar ao carrinho<": ">Ajouter au panier<",
    ">Carrinho<": ">Panier<",
    ">Finalizar compra<": ">Finaliser l'achat<",
    ">Continuar comprando<": ">Continuer mes achats<",
    "Blazer Estruturado": "Blazer structure",
    "Calça Wide Leg": "Pantalon wide leg",
    "Vestido Midi Slip": "Robe slip midi",
    "Camiseta Essential": "T-shirt essential",
    "Saia Assimétrica": "Jupe asymetrique",
    "Jaqueta Oversize": "Veste oversize",
    "Calça Alfaiataria": "Pantalon tailleur",
    "Vestido Chemise": "Robe chemise",
    "Brinco Geométrico": "Boucle geometrique",
    "Bolsa Tote": "Sac tote",
    "Top Cropped Canelado": "Top cropped cotele",
    "Vestido Longo Drapeado": "Robe longue drapee",
    "Calças": "Pantalons",
    "Acessórios": "Accessoires",
    "Calcas": "Pantalons",
    "único": "taille unique",
    "Corte reto com ombros definidos. Tecido crepe de alta gramatura com forro parcial.":
      "Coupe droite avec epaules marquees. Crepe epais avec doublure partielle.",
    "Modelagem ampla com cós alto e pregas frontais. Queda perfeita do quadril ao tornozelo.":
      "Coupe ample a taille haute avec plis frontaux. Beau tombe de la hanche a la cheville.",
    "Tecido acetinado com textura sedosa. Alças finas reguláveis e comprimento midi.":
      "Tissu satine a la texture soyeuse. Fines bretelles reglables et longueur midi.",
    "Algodão 100% pima com caimento relaxado. Básica que eleva qualquer look.":
      "Coton pima 100% avec une coupe decontractee. Une piece essentielle qui rehausse chaque silhouette.",
    "Barra diagonal com variação de comprimento. Tecido fluido de crepe italiano.":
      "Ourlet diagonal avec longueur asymetrique. Crepe italien fluide.",
    "Corte masculinizado com botões de pressão ocultos. Algodão thick-gauge importado.":
      "Coupe inspiree du vestiaire masculin avec pressions cachees. Coton epais importe.",
    "Tecido blend lã-poliéster. Bolsos embutidos e cós com passantes finos.":
      "Melange laine-polyester. Poches discretes et ceinture a passants fins.",
    "Botões perolados ao longo do decote. Cinto incluso para marcar ou soltar a silhueta.":
      "Boutons perles le long du decollete. Ceinture incluse pour structurer ou relacher la silhouette.",
    "Liga de zinco com banho de ouro 18k. Comprimento 6cm com movimento pendente.":
      "Alliage de zinc plaque or 18k. Longueur de 6 cm avec un joli mouvement pendant.",
    'Couro vegetal com costuras à vista. Capacidade para notebook 13". Alça ajustável.':
      'Cuir vegetal avec coutures apparentes. Peut accueillir un ordinateur 13" et dispose d\'une anse reglable.',
    "Malha canelada com elastano. Decote redondo e comprimento cropped acima do umbigo.":
      "Maille cotele avec elastane. Encolure ronde et coupe cropped au-dessus de la taille.",
    "Seda natural com drapeado na lateral. Fechamento invisível no lateral esquerdo.":
      "Soie naturelle avec drape laterale. Fermeture invisible sur le cote gauche.",
    "count.textContent=list.length+' produto'+(list.length!==1?'s':'');":
      "count.textContent=list.length+' article'+(list.length!==1?'s':'');",
    "p.badge==='novo'?'Novo':'Sale'":
      "p.badge==='novo'?'Nouveau':'Promo'",
    ">Adicionar<": ">Ajouter<",
    ">Ver mais<": ">Voir plus<",
    "showToast('Selecione um tamanho');":
      "showToast('Selectionne une taille');",
    "showToast(currentProduct.name+' adicionado ao carrinho');":
      "showToast('Ajoute au panier : '+currentProduct.name);",
    "showToast(p.name+' adicionado');":
      "showToast('Ajoute : '+p.name);",
    "Seu carrinho está vazio.<br>Explore a coleção e adicione peças.":
      "Ton panier est vide.<br>Explore la collection et ajoute quelques pieces.",
    "showToast('Em breve: checkout disponível!')":
      "showToast('Paiement bientot disponible !')",
    "'pt-BR'": "'fr-FR'",
  },
};

const BLOG_TRANSLATIONS: Partial<
  Record<SidneyJourneyLocale, Record<string, string>>
> = {
  en: {
    "RAIZ — Nutrição & Vida": "RAIZ — Nutrition & Life",
    ">Início<": ">Home<",
    ">Receitas<": ">Recipes<",
    ">Nutrição<": ">Nutrition<",
    ">Bem-estar<": ">Wellness<",
    ">Guias<": ">Guides<",
    "Nutrição consciente": "Mindful nutrition",
    "Comer bem<br>\n      é um ato de<br>\n      <em>amor-próprio.</em>":
      "Eating well<br>\n      is an act of<br>\n      <em>self-care.</em>",
    "Receitas, ciência e filosofia alimentar para quem quer viver com mais leveza, energia e intenção.":
      "Recipes, science, and food philosophy for people who want to live with more lightness, energy, and intention.",
    "Explorar artigos": "Explore articles",
    "Receber por e-mail": "Get it by email",
    ">Leitores<": ">Readers<",
    "Dieta anti-inflamatória": "Anti-inflammatory diet",
    "Receitas plant-based": "Plant-based recipes",
    "Nutrição esportiva": "Sports nutrition",
    "Saúde hormonal": "Hormonal health",
    "Fermentados": "Fermented foods",
    "Superalimentos": "Superfoods",
    "Jejum intermitente": "Intermittent fasting",
    "Em destaque": "Featured",
    "Leituras <em>essenciais</em>": "Essential <em>reads</em>",
    "O guia completo sobre inflamação crônica e como sua alimentação pode reverter esse quadro":
      "The complete guide to chronic inflammation and how your diet can help reverse it",
    "Dra. Ana Luz <span>·</span> 12 min de leitura <span>·</span> 14 mar 2025":
      "Dr. Ana Luz <span>·</span> 12 min read <span>·</span> Mar 14, 2025",
    ">Receita<": ">Recipe<",
    "Bowl de quinoa com legumes assados e molho tahine de limão":
      "Quinoa bowl with roasted vegetables and lemon tahini sauce",
    "Carla Moura <span>·</span> 8 min <span>·</span> 10 mar 2025":
      "Carla Moura <span>·</span> 8 min <span>·</span> Mar 10, 2025",
    "Microbiota intestinal: o que a ciência diz sobre o eixo intestino-cérebro":
      "Gut microbiota: what science says about the gut-brain axis",
    "Prof. Marcos Viana <span>·</span> 15 min <span>·</span> 6 mar 2025":
      "Prof. Marcos Viana <span>·</span> 15 min <span>·</span> Mar 6, 2025",
    "Artigos recentes": "Recent articles",
    "Mais <em>lidos</em>": "Most <em>read</em>",
    "Ver todos": "See all",
    "Pão de fermentação natural: passo a passo para o seu primeiro levain":
      "Sourdough bread: a step-by-step guide to your first starter",
    "Fazer pão em casa é um ritual. Entenda a ciência por trás da fermentação natural e por que ela muda tudo no sabor e na digestibilidade.":
      "Baking bread at home is a ritual. Understand the science behind sourdough and why it changes everything in flavor and digestibility.",
    ">Guia<": ">Guide<",
    "Como montar uma despensa funcional com 20 itens essenciais":
      "How to build a practical pantry with 20 essential items",
    "Uma despensa bem montada é a diferença entre comer bem toda semana ou depender de delivery. Veja a lista definitiva.":
      "A well-planned pantry is the difference between eating well every week and relying on delivery. Here is the definitive list.",
    ">Hormônios<": ">Hormones<",
    "Alimentos que regulam o cortisol e reduzem o estresse crônico":
      "Foods that regulate cortisol and reduce chronic stress",
    "O cortisol elevado impacta desde o sono até o peso. Saiba quais nutrientes têm evidência científica para equilibrá-lo.":
      "High cortisol affects everything from sleep to weight. Learn which nutrients have scientific evidence behind them.",
    "Receita da semana": "Recipe of the week",
    "Ceviche de<br>manga com <em>coentro</em><br>e pimenta.":
      "Mango<br>ceviche with <em>cilantro</em><br>and chili.",
    "Uma releitura tropical do clássico peruano. Fresco, ácido, com um toque de calor que abre o apetite e nutre o corpo.":
      "A tropical take on the Peruvian classic. Fresh, bright, and lightly spicy to wake up the appetite and nourish the body.",
    "Preparo": "Prep",
    "Porções": "Servings",
    "Ver receita completa": "View full recipe",
    "avaliação": "rating",
    "Sem glúten": "Gluten free",
    "Categorias": "Categories",
    "Encontre pelo <em>tema</em>": "Browse by <em>topic</em>",
    "128 artigos": "128 articles",
    "64 artigos": "64 articles",
    "42 artigos": "42 articles",
    "36 artigos": "36 articles",
    "Ciência": "Science",
    "28 artigos": "28 articles",
    "Toda semana na sua<br><em>caixa de entrada.</em>":
      "Every week in your<br><em>inbox.</em>",
    "Receitas, descobertas da ciência e reflexões sobre alimentação consciente. Sem spam, só conteúdo que vale a pena.":
      "Recipes, science discoveries, and reflections on mindful eating. No spam, only content worth reading.",
    'placeholder="seu@email.com"': 'placeholder="your@email.com"',
    "Quero receber": "Subscribe",
    "Um espaço para quem acredita que a comida é muito mais do que combustível. É cultura, afeto e saúde.":
      "A space for people who believe food is much more than fuel. It is culture, care, and health.",
    "Instagram em breve": "Instagram coming soon",
    "YouTube em breve": "YouTube coming soon",
    "Spotify em breve": "Spotify coming soon",
    "Conteúdo": "Content",
    "Sobre": "About",
    "Nossa equipe": "Our team",
    "Metodologia": "Methodology",
    "Parceiros": "Partners",
    "Contato": "Contact",
    "Legal": "Legal",
    "Política de privacidade": "Privacy policy",
    "Termos de uso": "Terms of use",
    "Todos os direitos reservados.": "All rights reserved.",
    "Feito com intenção.": "Made with intention.",
    "Em breve: todos os artigos": "Coming soon: all articles",
    "Digite um e-mail válido": "Enter a valid email",
    "Bem-vindo ao RAIZ! Confirme no seu e-mail.":
      "Welcome to RAIZ! Check your inbox to confirm.",
  },
  es: {
    "RAIZ — Nutrição & Vida": "RAIZ — Nutricion y Vida",
    ">Início<": ">Inicio<",
    ">Receitas<": ">Recetas<",
    ">Nutrição<": ">Nutricion<",
    ">Bem-estar<": ">Bienestar<",
    ">Guias<": ">Guias<",
    "Nutrição consciente": "Nutricion consciente",
    "Comer bem<br>\n      é um ato de<br>\n      <em>amor-próprio.</em>":
      "Comer bien<br>\n      es un acto de<br>\n      <em>amor propio.</em>",
    "Receitas, ciência e filosofia alimentar para quem quer viver com mais leveza, energia e intenção.":
      "Recetas, ciencia y filosofia alimentaria para quienes quieren vivir con mas ligereza, energia e intencion.",
    "Explorar artigos": "Explorar articulos",
    "Receber por e-mail": "Recibir por correo",
    ">Leitores<": ">Lectores<",
    "Dieta anti-inflamatória": "Dieta antiinflamatoria",
    "Receitas plant-based": "Recetas plant-based",
    "Nutrição esportiva": "Nutricion deportiva",
    "Saúde hormonal": "Salud hormonal",
    "Fermentados": "Fermentados",
    "Superalimentos": "Superalimentos",
    "Jejum intermitente": "Ayuno intermitente",
    "Em destaque": "Destacados",
    "Leituras <em>essenciais</em>": "Lecturas <em>esenciales</em>",
    "O guia completo sobre inflamação crônica e como sua alimentação pode reverter esse quadro":
      "La guia completa sobre la inflamacion cronica y como tu alimentacion puede ayudar a revertirla",
    "Dra. Ana Luz <span>·</span> 12 min de leitura <span>·</span> 14 mar 2025":
      "Dra. Ana Luz <span>·</span> 12 min de lectura <span>·</span> 14 mar 2025",
    ">Receita<": ">Receta<",
    "Bowl de quinoa com legumes assados e molho tahine de limão":
      "Bowl de quinoa con vegetales asados y salsa tahini de limon",
    "Microbiota intestinal: o que a ciência diz sobre o eixo intestino-cérebro":
      "Microbiota intestinal: lo que dice la ciencia sobre el eje intestino-cerebro",
    "Artigos recentes": "Articulos recientes",
    "Mais <em>lidos</em>": "Mas <em>leidos</em>",
    "Ver todos": "Ver todos",
    "Pão de fermentação natural: passo a passo para o seu primeiro levain":
      "Pan de fermentacion natural: paso a paso para tu primer levain",
    "Fazer pão em casa é um ritual. Entenda a ciência por trás da fermentação natural e por que ela muda tudo no sabor e na digestibilidade.":
      "Hacer pan en casa es un ritual. Entiende la ciencia detras de la fermentacion natural y por que cambia todo en sabor y digestibilidad.",
    ">Guia<": ">Guia<",
    "Como montar uma despensa funcional com 20 itens essenciais":
      "Como montar una despensa funcional con 20 elementos esenciales",
    "Uma despensa bem montada é a diferença entre comer bem toda semana ou depender de delivery. Veja a lista definitiva.":
      "Una despensa bien montada es la diferencia entre comer bien cada semana o depender del delivery. Mira la lista definitiva.",
    ">Hormônios<": ">Hormonas<",
    "Alimentos que regulam o cortisol e reduzem o estresse crônico":
      "Alimentos que regulan el cortisol y reducen el estres cronico",
    "O cortisol elevado impacta desde o sono até o peso. Saiba quais nutrientes têm evidência científica para equilibrá-lo.":
      "El cortisol elevado impacta desde el sueno hasta el peso. Descubre que nutrientes tienen evidencia cientifica para equilibrarlo.",
    "Receita da semana": "Receta de la semana",
    "Ceviche de<br>manga com <em>coentro</em><br>e pimenta.":
      "Ceviche de<br>mango con <em>cilantro</em><br>y chile.",
    "Uma releitura tropical do clássico peruano. Fresco, ácido, com um toque de calor que abre o apetite e nutre o corpo.":
      "Una reinterpretacion tropical del clasico peruano. Fresco, acido y con un toque de calor que abre el apetito y nutre el cuerpo.",
    "Preparo": "Preparacion",
    "Porções": "Porciones",
    "Ver receita completa": "Ver receta completa",
    "avaliação": "valoracion",
    "Sem glúten": "Sin gluten",
    "Categorias": "Categorias",
    "Encontre pelo <em>tema</em>": "Encuentra por <em>tema</em>",
    "128 artigos": "128 articulos",
    "64 artigos": "64 articulos",
    "42 artigos": "42 articulos",
    "36 artigos": "36 articulos",
    "Ciência": "Ciencia",
    "28 artigos": "28 articulos",
    "Toda semana na sua<br><em>caixa de entrada.</em>":
      "Cada semana en tu<br><em>bandeja de entrada.</em>",
    "Receitas, descobertas da ciência e reflexões sobre alimentação consciente. Sem spam, só conteúdo que vale a pena.":
      "Recetas, descubrimientos de la ciencia y reflexiones sobre alimentacion consciente. Sin spam, solo contenido que vale la pena.",
    'placeholder="seu@email.com"': 'placeholder="tu@email.com"',
    "Quero receber": "Quiero recibirlo",
    "Um espaço para quem acredita que a comida é muito mais do que combustível. É cultura, afeto e saúde.":
      "Un espacio para quienes creen que la comida es mucho mas que combustible. Es cultura, afecto y salud.",
    "Instagram em breve": "Instagram proximamente",
    "YouTube em breve": "YouTube proximamente",
    "Spotify em breve": "Spotify proximamente",
    "Conteúdo": "Contenido",
    "Sobre": "Sobre",
    "Nossa equipe": "Nuestro equipo",
    "Metodologia": "Metodologia",
    "Parceiros": "Aliados",
    "Contato": "Contacto",
    "Política de privacidade": "Politica de privacidad",
    "Termos de uso": "Terminos de uso",
    "Todos os direitos reservados.": "Todos los derechos reservados.",
    "Feito com intenção.": "Hecho con intencion.",
    "Em breve: todos os artigos": "Proximamente: todos los articulos",
    "Digite um e-mail válido": "Ingresa un correo valido",
    "Bem-vindo ao RAIZ! Confirme no seu e-mail.":
      "Bienvenido a RAIZ! Confirma en tu correo.",
  },
  fr: {
    "RAIZ â€” NutriÃ§Ã£o & Vida": "RAIZ â€” Nutrition & Vie",
    ">InÃ­cio<": ">Accueil<",
    ">Receitas<": ">Recettes<",
    ">NutriÃ§Ã£o<": ">Nutrition<",
    ">Bem-estar<": ">Bien-etre<",
    ">Guias<": ">Guides<",
    "NutriÃ§Ã£o consciente": "Nutrition consciente",
    "Comer bem<br>\n      Ã© um ato de<br>\n      <em>amor-prÃ³prio.</em>":
      "Bien manger<br>\n      est un acte de<br>\n      <em>bienveillance envers soi.</em>",
    "Receitas, ciÃªncia e filosofia alimentar para quem quer viver com mais leveza, energia e intenÃ§Ã£o.":
      "Recettes, science et philosophie alimentaire pour celles et ceux qui veulent vivre avec plus de legerete, d'energie et d'intention.",
    "Explorar artigos": "Explorer les articles",
    "Receber por e-mail": "Recevoir par email",
    ">Leitores<": ">Lecteurs<",
    "Dieta anti-inflamatÃ³ria": "Regime anti-inflammatoire",
    "Receitas plant-based": "Recettes plant-based",
    "NutriÃ§Ã£o esportiva": "Nutrition sportive",
    "SaÃºde hormonal": "Sante hormonale",
    "Fermentados": "Fermentes",
    "Superalimentos": "Superaliments",
    "Jejum intermitente": "Jeune intermittent",
    "Em destaque": "A la une",
    "Leituras <em>essenciais</em>": "Lectures <em>essentielles</em>",
    "O guia completo sobre inflamaÃ§Ã£o crÃ´nica e como sua alimentaÃ§Ã£o pode reverter esse quadro":
      "Le guide complet sur l'inflammation chronique et la facon dont l'alimentation peut aider a l'inverser",
    "Dra. Ana Luz <span>Â·</span> 12 min de leitura <span>Â·</span> 14 mar 2025":
      "Dr Ana Luz <span>Â·</span> 12 min de lecture <span>Â·</span> 14 mars 2025",
    ">Receita<": ">Recette<",
    "Bowl de quinoa com legumes assados e molho tahine de limÃ£o":
      "Bol de quinoa aux legumes rotis et sauce tahini au citron",
    "Microbiota intestinal: o que a ciÃªncia diz sobre o eixo intestino-cÃ©rebro":
      "Microbiote intestinal : ce que dit la science sur l'axe intestin-cerveau",
    "Artigos recentes": "Articles recents",
    "Mais <em>lidos</em>": "Les plus <em>lus</em>",
    "Ver todos": "Voir tout",
    "PÃ£o de fermentaÃ§Ã£o natural: passo a passo para o seu primeiro levain":
      "Pain au levain : le pas a pas pour ton premier levain",
    "Fazer pÃ£o em casa Ã© um ritual. Entenda a ciÃªncia por trÃ¡s da fermentaÃ§Ã£o natural e por que ela muda tudo no sabor e na digestibilidade.":
      "Faire du pain chez soi est un rituel. Comprends la science derriere la fermentation naturelle et pourquoi elle change tout en gout et en digestibilite.",
    ">Guia<": ">Guide<",
    "Como montar uma despensa funcional com 20 itens essenciais":
      "Comment composer un garde-manger fonctionnel avec 20 essentiels",
    "Uma despensa bem montada Ã© a diferenÃ§a entre comer bem toda semana ou depender de delivery. Veja a lista definitiva.":
      "Un garde-manger bien pense fait la difference entre bien manger chaque semaine et depend re des livraisons. Voici la liste definitive.",
    ">HormÃ´nios<": ">Hormones<",
    "Alimentos que regulam o cortisol e reduzem o estresse crÃ´nico":
      "Les aliments qui regulent le cortisol et reduisent le stress chronique",
    "O cortisol elevado impacta desde o sono atÃ© o peso. Saiba quais nutrientes tÃªm evidÃªncia cientÃ­fica para equilibrÃ¡-lo.":
      "Un cortisol eleve agit sur le sommeil comme sur le poids. Decouvre quels nutriments sont soutenus par la science pour le reguler.",
    "Receita da semana": "Recette de la semaine",
    "Ceviche de<br>manga com <em>coentro</em><br>e pimenta.":
      "Ceviche de<br>mangue au <em>coriandre</em><br>et piment.",
    "Uma releitura tropical do clÃ¡ssico peruano. Fresco, Ã¡cido, com um toque de calor que abre o apetite e nutre o corpo.":
      "Une relecture tropicale du classique peruvien. Frais, acidule et releve juste ce qu'il faut pour ouvrir l'appetit et nourrir le corps.",
    "Preparo": "Preparation",
    "PorÃ§Ãµes": "Portions",
    "Ver receita completa": "Voir la recette complete",
    "avaliaÃ§Ã£o": "note",
    "Sem glÃºten": "Sans gluten",
    "Categorias": "Categories",
    "Encontre pelo <em>tema</em>": "Trouver par <em>theme</em>",
    "128 artigos": "128 articles",
    "64 artigos": "64 articles",
    "42 artigos": "42 articles",
    "36 artigos": "36 articles",
    "CiÃªncia": "Science",
    "28 artigos": "28 articles",
    "Toda semana na sua<br><em>caixa de entrada.</em>":
      "Chaque semaine dans ta<br><em>boite mail.</em>",
    "Receitas, descobertas da ciÃªncia e reflexÃµes sobre alimentaÃ§Ã£o consciente. Sem spam, sÃ³ conteÃºdo que vale a pena.":
      "Recettes, decouvertes scientifiques et reflexions sur l'alimentation consciente. Pas de spam, seulement du contenu utile.",
    'placeholder="seu@email.com"': 'placeholder="ton@email.com"',
    "Quero receber": "Je veux recevoir",
    "Um espaÃ§o para quem acredita que a comida Ã© muito mais do que combustÃ­vel. Ã‰ cultura, afeto e saÃºde.":
      "Un espace pour celles et ceux qui croient que la nourriture est bien plus qu'un carburant. C'est de la culture, du lien et de la sante.",
    "Instagram em breve": "Instagram bientot",
    "YouTube em breve": "YouTube bientot",
    "Spotify em breve": "Spotify bientot",
    "ConteÃºdo": "Contenu",
    "Sobre": "A propos",
    "Nossa equipe": "Notre equipe",
    "Metodologia": "Methodologie",
    "Parceiros": "Partenaires",
    "Contato": "Contact",
    "Legal": "Mentions",
    "PolÃ­tica de privacidade": "Politique de confidentialite",
    "Termos de uso": "Conditions d'utilisation",
    "Todos os direitos reservados.": "Tous droits reserves.",
    "Feito com intenÃ§Ã£o.": "Fait avec intention.",
    "Em breve: todos os artigos": "Bientot : tous les articles",
    "Digite um e-mail vÃ¡lido": "Entre un email valide",
    "Bem-vindo ao RAIZ! Confirme no seu e-mail.":
      "Bienvenue chez RAIZ ! Verifie ton email pour confirmer.",
  },
};

const BLOG_RUNTIME_PATCHES: Partial<Record<SidneyJourneyLocale, string>> = {
  en: `
<script>
  const __raizTagLabels = {
    receitas: 'recipes',
    nutricao: 'nutrition',
    'bem-estar': 'wellness',
    guias: 'guides',
    ciencia: 'science'
  };
  openPost = function () {
    showToast('Full article preview is coming soon.');
  };
  filterTag = function (tag) {
    showToast('Filtering: ' + (__raizTagLabels[tag] || tag));
    scrollToFeatured();
  };
</script>
`,
  es: `
<script>
  const __raizTagLabels = {
    receitas: 'recetas',
    nutricao: 'nutricion',
    'bem-estar': 'bienestar',
    guias: 'guias',
    ciencia: 'ciencia'
  };
  openPost = function () {
    showToast('La vista completa del articulo estara disponible pronto.');
  };
  filterTag = function (tag) {
    showToast('Filtrando: ' + (__raizTagLabels[tag] || tag));
    scrollToFeatured();
  };
</script>
`,
  fr: `
<script>
  const __raizTagLabels = {
    receitas: 'recettes',
    nutricao: 'nutrition',
    'bem-estar': 'bien-etre',
    guias: 'guides',
    ciencia: 'science'
  };
  openPost = function () {
    showToast('La preview complete de l article arrive bientot.');
  };
  filterTag = function (tag) {
    showToast('Filtre : ' + (__raizTagLabels[tag] || tag));
    scrollToFeatured();
  };
</script>
`,
};

const applyReplacements = (source: string, replacements: ReplacementEntry[]) =>
  replacements.reduce(
    (current, [from, to]) => current.split(from).join(to),
    source,
  );

const fixMojibake = (source: string) =>
  applyReplacements(source, MOJIBAKE_FIXES);

const injectPreviewStyle = (source: string) =>
  source.includes(PREVIEW_STYLE_PATCH)
    ? source
    : source.replace("</head>", `${PREVIEW_STYLE_PATCH}</head>`);

const withHtmlLanguage = (source: string, locale: SidneyJourneyLocale) =>
  source.replace(
    /<html lang="[^"]+">/i,
    `<html lang="${HTML_LANGUAGE_BY_LOCALE[locale]}">`,
  );

const getLandingHtml = (locale: SidneyJourneyLocale) => {
  const source = withHtmlLanguage(
    injectPreviewStyle(fixMojibake(landingPageHtmlRaw)),
    locale,
  );

  return applyReplacements(
    source,
    Object.entries(LANDING_TRANSLATIONS[locale] || {}),
  );
};

const getEcommerceHtml = (locale: SidneyJourneyLocale) => {
  const source = withHtmlLanguage(
    injectPreviewStyle(fixMojibake(ecommerceHtmlRaw)),
    locale,
  );

  return applyReplacements(
    source,
    Object.entries(ECOMMERCE_TRANSLATIONS[locale] || {}),
  );
};

const getBlogHtml = (locale: SidneyJourneyLocale) => {
  let source = withHtmlLanguage(
    injectPreviewStyle(fixMojibake(nutritionBlogHtmlRaw)),
    locale,
  );

  source = applyReplacements(
    source,
    Object.entries(BLOG_TRANSLATIONS[locale] || {}),
  );

  const runtimePatch = BLOG_RUNTIME_PATCHES[locale];

  if (runtimePatch) {
    source = source.replace("</body>", `${runtimePatch}</body>`);
  }

  return source;
};

export const getSidneySitePreviewUrl = (optionId: SiteOptionId) =>
  SITE_URLS[optionId];

export const getSidneySitePreviewHtml = (
  optionId: SiteOptionId,
  locale: SidneyJourneyLocale,
) => {
  if (optionId === "A") {
    return getLandingHtml(locale);
  }

  if (optionId === "B") {
    return getEcommerceHtml(locale);
  }

  return getBlogHtml(locale);
};
