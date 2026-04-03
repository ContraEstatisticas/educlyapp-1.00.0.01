export const ES_SIDNEY_DAY1_JOURNEY_COPY = {
  common: {
    simulatorBadge: "experiencia practica",
    exerciseBadge: "ejercicio rapido",
    choosePrompt: "Elige un prompt",
    promptSelected: "Prompt seleccionado",
    promptLockedTitle: "Completa el ejercicio para desbloquear el prompt",
    promptLockedBody:
      "Elige las opciones correctas en el ejercicio de arriba. Cuando aciertes, el prompt completo aparece aqui y se habilita el boton de generar.",
    promptReadyTitle: "Prompt completo desbloqueado",
    promptReadyBody:
      "Ya armaste la base correcta. Revisa el prompt completo abajo antes de generar.",
    exerciseLockedHint:
      "Primero completa el prompt con las opciones correctas. Despues de eso se habilitara la generacion.",
    exerciseCompleted: "Prompt armado con exito",
    redoExercise: "Armar este prompt de nuevo",
    generate: "Generar ahora",
    regenerate: "Generar otra version",
    loadingLabel: "Generando con IA",
    resultLabel: "Resultado listo",
    readyToContinue:
      "Todo listo. Ahora puedes seguir a la siguiente creacion.",
    loadingProgress: (value: number) => `${value}% completado`,
    pipelineLabel: "pipeline de IA",
    generatedResultBadge: "resultado generado",
    finalAssetLabel: "asset final",
    videoAssetPending:
      "El video generado aparecera aqui en cuanto se conecten los assets.",
    frameAssetPending:
      "El frame generado aparecera aqui en cuanto se conecten los assets.",
    protectedResultLabel: "resultado protegido",
    hiddenVideoLabel: "video oculto",
    hiddenFrameLabel: "frame oculto",
    hiddenVideoHint:
      "Elige la opcion que quieras y haz clic en generar ahora. El video real aparece solo despues del suspenso y de la pantalla de carga.",
    hiddenFramesHint:
      "Elige la opcion que quieras y haz clic en generar ahora. Los frames reales aparecen solo despues del suspenso y de la pantalla de carga.",
    generatedVideoLabel: "video generado",
    generatedFrameLabel: "frame generado",
    flyerCtaLabel: "Reserva ahora",
    promptPanelLabel: "Prompt",
    dayLabel: "Dia 1",
  },
  intro: {
    eyebrow: "Dia 1 en accion",
    title: "Hoy no vas a estudiar. Vas a crear.",
    description:
      "Hoy vas a crear 4 entregas visibles con IA: frames, un video, una presentacion y un sitio real. No necesitas saber nada antes. Solo sigue los pasos, elige un prompt y mira el resultado.",
    supporting:
      "La teoria se ira aclarando a medida que avances en la ruta.",
    cards: [
      {
        icon: "frames",
        title: "Frames para el video",
        tool: "Gemini",
        time: "~3 min",
      },
      { icon: "video", title: "Un video", tool: "Grok", time: "~3 min" },
      {
        icon: "slides",
        title: "Una presentacion",
        tool: "Gamma",
        time: "~3 min",
      },
      {
        icon: "site",
        title: "Un sitio completo",
        tool: "Claude",
        time: "~3 min",
      },
    ],
    kickoffTitle: "Todo empieza por la practica",
    kickoffBody:
      "Primero creas los frames del video, despues los conviertes en un video hablado, luego ves una presentacion completa montarse en pantalla y cierras la experiencia viendo un sitio real aparecer. La idea es que sientas a la IA trabajando en la practica antes de entrar en teoria.",
    continueLabel: "Empezar por los frames del video",
    continueHelper:
      "Antes del video, vamos a crear las imagenes clave que van a definir el clima de la escena.",
  },
  sections: {
    frames: {
      eyebrow: "Preparacion del video",
      title: "Crea frames para tu video",
      tool: "Herramienta: ChatGPT",
      description:
        "Antes de generar el video, vamos a crear las imagenes clave. La IA genera los cuadros y despues los usas para montar el video.",
      steps: [
        "Elige uno de los prompts de abajo.",
        "Pegalo en el campo de generacion de imagen en Educly.",
        "Toca generar imagen y espera.",
        "Guarda los frames y usalos en el siguiente paso.",
      ],
      promptHint:
        "Prompt es el comando que le das a la IA. Cuanto mas claro seas, mejor sera la respuesta.",
      loadingTitle: "Generando los frames",
      loadingLines: [
        "Leyendo expresion, pose, encuadre y estilo visual...",
        "Montando la iluminacion, el personaje y el clima de cada frame...",
        "Terminando los cuadros clave para revelar los frames en pantalla...",
      ],
      options: [
        {
          id: "A",
          name: "Mujer feliz",
          prompt:
            "Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, sonrisa amplia, mirada directa a la camara, fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
          exercise: {
            title: "Completa el prompt de la mujer feliz",
            sentence:
              "Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, sonrisa amplia, mirada directa a la camara, [BLANK], encuadre [BLANK], iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
            answers: ["fondo blanco limpio", "del busto hacia arriba"],
            options: [
              "fondo blanco limpio",
              "fondo con ciudad neon",
              "del busto hacia arriba",
              "de cuerpo entero",
              "mirando hacia abajo",
              "sin iluminacion suave",
            ],
            explanation:
              "Perfecto. Ahora el prompt completo de la mujer feliz ya esta liberado.",
          },
          resultFrames: [
            { label: "Frame generado", alt: "Frame de la mujer feliz" },
          ],
          previewTitle: "Frame feliz para una apertura acogedora",
          previewDescription:
            "Una imagen clave con sonrisa abierta, energia positiva y clima de bienvenida para iniciar el video.",
          previewTags: ["Feliz", "Frame", "Apertura"],
        },
        {
          id: "B",
          name: "Mujer triste",
          prompt:
            "Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion triste y desanimada, ojos levemente hacia abajo, fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
          exercise: {
            title: "Completa el prompt de la mujer triste",
            sentence:
              "Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion triste y desanimada, [BLANK], [BLANK], encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
            answers: ["ojos levemente hacia abajo", "fondo blanco limpio"],
            options: [
              "ojos levemente hacia abajo",
              "sonrisa amplia",
              "fondo blanco limpio",
              "fondo de escenario oscuro",
              "mirada desafiante",
              "luz neon azul",
            ],
            explanation:
              "Bien. Ahora el prompt completo de la mujer triste ya esta liberado.",
          },
          resultFrames: [
            { label: "Frame generado", alt: "Frame de la mujer triste" },
          ],
          previewTitle: "Frame triste para escenas mas emocionales",
          previewDescription:
            "Un frame mas sensible para generar contraste, empatia y tono de superacion a lo largo del video.",
          previewTags: ["Triste", "Emocion", "Contraste"],
        },
        {
          id: "C",
          name: "Mujer seria",
          prompt:
            "Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion seria y firme, mirada directa a la camara sin sonreir, fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
          exercise: {
            title: "Completa el prompt de la mujer seria",
            sentence:
              "Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion [BLANK], [BLANK] [BLANK], fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
            answers: [
              "seria y firme",
              "mirada directa a la camara",
              "sin sonreir",
            ],
            options: [
              "seria y firme",
              "alegre y relajada",
              "mirada directa a la camara",
              "mirando al suelo",
              "sin sonreir",
              "con una gran carcajada",
            ],
            explanation:
              "Perfecto. El prompt mas firme ahora ya esta desbloqueado.",
          },
          resultFrames: [
            { label: "Frame generado", alt: "Frame de la mujer seria" },
          ],
          previewTitle: "Frame serio para un mensaje firme",
          previewDescription:
            "Un cuadro directo y confiado para mensajes mas fuertes, con presencia y autoridad en la escena.",
          previewTags: ["Seria", "Firme", "Autoridad"],
        },
      ],
      resultTitle: "Tus frames estan listos",
      resultDescription:
        "Ahora ya tienes los cuadros clave del personaje. En el siguiente paso, eso se convierte en un video con voz, emocion y mas impacto.",
      continueLabel: "Continuar al video con IA",
      continueHelper:
        "Ahora vamos a transformar ese clima en un video hablado con IA.",
    },
    video: {
      eyebrow: "Creacion 1",
      title: "Crea un video con IA",
      tool: "Herramienta: Grok",
      description:
        "Tu describes la escena. La IA crea el video. Elige un prompt, toca generar y espera.",
      steps: [
        "Elige uno de los 3 prompts de abajo.",
        "Pegalo en el campo de generacion de video en Educly.",
        "Toca generar video y espera.",
        "Mira el resultado.",
      ],
      promptHint:
        "Piensa como director: di que quieres, como lo quieres y cual es el clima de la escena.",
      loadingTitle: "Renderizando el video",
      loadingLines: [
        "Interpretando el clima de la escena, la emocion y la voz del personaje...",
        "Animando expresion, voz, labios y presencia del personaje...",
        "Terminando el render para revelar el video con lip sync...",
      ],
      options: [
        {
          id: "A",
          name: "Playa al atardecer",
          prompt: `Una mujer latina de unos 20 y tantos anos, con cabello largo oscuro, usando ropa casual moderna en tonos azul claro y blanco, de pie frente a un fondo blanco limpio. Mira directamente a la camara con una sonrisa grande y acogedora, ojos brillantes y animados. Habla en espanol, con un tono entusiasta y feliz: "Bienvenida. Tomaste una de las mejores decisiones de tu vida al entrar a Educly. Elegiste la educacion, y eso lo cambia todo." Estilo realista, iluminacion suave, encuadre del busto hacia arriba. Sin musica. Lip sync natural.`,
          exercise: {
            title: "Completa el prompt del video feliz",
            sentence:
              'Una mujer latina de unos 20 y tantos anos, con cabello largo oscuro, usando ropa casual moderna en tonos azul claro y blanco, de pie frente a un fondo blanco limpio. Mira directamente a la camara con [BLANK]. Habla en [BLANK], con un tono [BLANK] y feliz: "Bienvenida. Tomaste una de las mejores decisiones de tu vida al entrar a Educly. Elegiste la educacion, y eso lo cambia todo." Estilo realista, iluminacion suave, encuadre del busto hacia arriba. Sin musica. Lip sync natural.',
            answers: [
              "una sonrisa grande y acogedora, ojos brillantes y animados",
              "espanol",
              "entusiasta",
            ],
            options: [
              "una sonrisa grande y acogedora, ojos brillantes y animados",
              "ojos levemente llorosos y una mirada melancolica",
              "espanol",
              "ingles",
              "entusiasta",
              "lento y sincero",
            ],
            explanation:
              "Listo. Ahora el prompt del video feliz ya se puede usar en la generacion.",
          },
          resultVideos: [
            { label: "Video generado", alt: "Video de la mujer feliz" },
          ],
          previewTitle: "Bienvenida con energia y entusiasmo",
          previewDescription:
            "Una frase calida, una gran sonrisa y un tono confiado para abrir el video con impacto positivo.",
          previewTags: ["Feliz", "Bienvenida", "Lip sync"],
        },
        {
          id: "B",
          name: "Ciudad de noche",
          prompt: `Una mujer latina de unos 20 y tantos anos, con cabello largo oscuro, usando ropa casual moderna en tonos azul claro y blanco, de pie frente a un fondo blanco limpio. Mira directamente a la camara con una expresion suave, emotiva y melancolica, ojos levemente llorosos, como si de verdad estuviera conmovida. Habla en espanol, con un tono lento y sincero: "Entrar a Educly no fue una decision cualquiera... pero elegiste la educacion. Y eso... eso es una de las cosas mas valiosas que existen." Estilo realista, iluminacion suave, encuadre del busto hacia arriba. Sin musica. Lip sync natural.`,
          exercise: {
            title: "Completa el prompt del video emotivo",
            sentence:
              'Una mujer latina de unos 20 y tantos anos, con cabello largo oscuro, usando ropa casual moderna en tonos azul claro y blanco, de pie frente a un fondo blanco limpio. Mira directamente a la camara con [BLANK]. Habla en [BLANK], con un tono [BLANK]: "Entrar a Educly no fue una decision cualquiera... pero elegiste la educacion. Y eso... eso es una de las cosas mas valiosas que existen." Estilo realista, iluminacion suave, encuadre del busto hacia arriba. Sin musica. Lip sync natural.',
            answers: [
              "una expresion suave, emotiva y melancolica, ojos levemente llorosos, como si de verdad estuviera conmovida",
              "espanol",
              "lento y sincero",
            ],
            options: [
              "una expresion suave, emotiva y melancolica, ojos levemente llorosos, como si de verdad estuviera conmovida",
              "una expresion fuerte y decidida",
              "espanol",
              "frances",
              "lento y sincero",
              "fuerte y apasionado",
            ],
            explanation:
              "Perfecto. El prompt del video emocional ya esta desbloqueado.",
          },
          resultVideos: [
            { label: "Video generado", alt: "Video de la mujer triste" },
          ],
          previewTitle: "Tono emotivo con dolor y valor de la decision",
          previewDescription:
            "Un personaje mas sensible, con voz cargada de emocion y una frase que valora la decision del alumno.",
          previewTags: ["Triste", "Emocion", "Lip sync"],
        },
        {
          id: "C",
          name: "Amanecer en las montanas",
          prompt: `Una mujer latina de unos 20 y tantos anos, con cabello largo oscuro, usando ropa casual moderna en tonos azul claro y blanco, de pie frente a un fondo blanco limpio. Mira directamente a la camara con una expresion fuerte y decidida, cejas levemente fruncidas y tono serio. Habla en espanol, con un tono fuerte y apasionado: "Bienvenida a Educly. Elegiste la educacion y eso no es poca cosa. Ahora es momento de actuar, porque quien estudia no se queda atras." Estilo realista, iluminacion suave, encuadre del busto hacia arriba. Sin musica. Lip sync natural.`,
          exercise: {
            title: "Completa el prompt del video firme",
            sentence:
              'Una mujer latina de unos 20 y tantos anos, con cabello largo oscuro, usando ropa casual moderna en tonos azul claro y blanco, de pie frente a un fondo blanco limpio. Mira directamente a la camara con [BLANK]. Habla en [BLANK], con un tono [BLANK]: "Bienvenida a Educly. Elegiste la educacion y eso no es poca cosa. Ahora es momento de actuar, porque quien estudia no se queda atras." Estilo realista, iluminacion suave, encuadre del busto hacia arriba. Sin musica. Lip sync natural.',
            answers: [
              "una expresion fuerte y decidida, cejas levemente fruncidas y tono serio",
              "espanol",
              "fuerte y apasionado",
            ],
            options: [
              "una expresion fuerte y decidida, cejas levemente fruncidas y tono serio",
              "una expresion suave y emotiva, con ojos llorosos",
              "espanol",
              "ingles",
              "fuerte y apasionado",
              "ligero y casual",
            ],
            explanation:
              "Muy bien. Ahora el prompt del video firme ya esta liberado para generar.",
          },
          resultVideos: [
            { label: "Video generado", alt: "Video de la mujer firme" },
          ],
          previewTitle: "Invitacion firme y decidida a actuar",
          previewDescription:
            "Una frase fuerte, postura segura y energia de accion para transmitir urgencia y actitud.",
          previewTags: ["Brava", "Determinacion", "Lip sync"],
        },
      ],
      resultTitle: "Tu video esta listo",
      resultDescription:
        "La escena fue construida a partir del prompt que elegiste. Ahora observa como la emocion del personaje cambia el impacto del video.",
      continueLabel: "Continuar a la presentacion",
      continueHelper:
        "Ahora vas a ver una presentacion completa en slides, ya montada y lista para recorrer.",
    },
    flyer: {
      eyebrow: "Creacion 2",
      title: "Crea un flyer motivacional",
      tool: "Herramienta: ChatGPT",
      description:
        "La IA tambien crea imagenes profesionales. Aqui vas a generar una pieza lista para Instagram que parece hecha por un disenador.",
      steps: [
        "Elige uno de los 3 prompts de abajo.",
        "Pega el prompt en el campo indicado en Educly.",
        "Toca generar imagen.",
        "Mira el resultado.",
      ],
      promptHint:
        "Cada prompt genera un tipo distinto de creativo. Elige el que mas combine contigo.",
      loadingTitle: "Montando el flyer",
      loadingLines: [
        "Leyendo composicion, paleta de colores y estilo del creativo...",
        "Generando fondo, tipografia y elementos destacados...",
        "Terminando el arte para mostrar el flyer en pantalla...",
      ],
      options: [
        {
          id: "A",
          name: "Imagen opcion 1",
          previewTitle: "Disciplina hoy. Resultado manana.",
          previewDescription:
            "Un creativo fuerte, moderno y dramatico para transmitir enfoque y constancia.",
          previewTags: ["Motivacion", "Contraste", "Instagram"],
        },
        {
          id: "B",
          name: "Imagen opcion 2",
          previewTitle: "No necesitas ser perfecto",
          previewDescription:
            "Un visual inspirador, calido y cinematografico para transmitir recomienzo y constancia.",
          previewTags: ["Inspirador", "Recomienzo", "Instagram"],
        },
        {
          id: "C",
          name: "Imagen opcion 3",
          previewTitle: "Cada dia es una nueva oportunidad para evolucionar",
          previewDescription:
            "Un creativo clean y elegante que comunica crecimiento personal con un mensaje fuerte.",
          previewTags: ["Clean", "Crecimiento", "Instagram"],
        },
      ],
      resultTitle: "Tu flyer esta listo",
      resultDescription:
        "Incluso cambiando solo el prompt, la identidad visual cambia por completo. Asi es como la IA empieza a obedecer una direccion creativa.",
      continueLabel: "Continuar a la presentacion",
      continueHelper:
        "Ahora vas a salir de la imagen y ver una presentacion completa estructurandose en pocos segundos.",
    },
    slides: {
      eyebrow: "Creacion 2",
      title: "Crea una presentacion en slides",
      tool: "Herramienta: Gamma",
      description:
        "Basta de pasar horas en PowerPoint. La IA monta una presentacion completa con diseno, textos y estructura en segundos.",
      steps: [
        "Elige uno de los 3 prompts de abajo.",
        "Pegalo en el campo de generacion de presentacion en Educly.",
        "Toca generar presentacion y espera.",
        "Recorre los slides listos.",
      ],
      promptHint:
        "Gamma se encarga del diseno, los textos y el layout. No necesitas ajustar nada.",
      loadingTitle: "Montando los slides",
      loadingLines: [
        "Organizando guion, narrativa y orden de los temas...",
        "Distribuyendo titulos, paginas y jerarquia visual...",
        "Aplicando layout, destaque y ritmo de presentacion...",
      ],
      options: [
        {
          id: "A",
          label: "Presentacion opcion 1",
          name: "Presentacion premium",
          prompt:
            "Crea una presentacion profesional de alto nivel sobre [tema], con un enfoque estrategico y visual premium. Genera entre 10 y 12 diapositivas bien estructuradas con: portada impactante, contexto del problema, analisis de la situacion actual, oportunidades, propuesta de solucion, plan de accion, beneficios claros, diferenciadores y conclusion. Utiliza un lenguaje ejecutivo, claro y persuasivo, evitando terminos innecesariamente tecnicos. El diseno debe ser moderno, elegante y minimalista, con uso de colores sobrios (negro, blanco, tonos neutros) y tipografia sofisticada. Incluye sugerencias visuales para cada diapositiva (graficos, iconos, esquemas) y manten los textos cortos y de alto impacto.",
          exercise: {
            title: "Completa el prompt de la presentacion premium",
            sentence:
              "Crea una presentacion profesional de alto nivel sobre [tema], con un enfoque [BLANK]. Genera entre 10 y 12 diapositivas bien estructuradas con: portada impactante, contexto del problema, analisis de la situacion actual, oportunidades, propuesta de solucion, [BLANK], beneficios claros, diferenciadores y conclusion. El diseno debe ser moderno, elegante y minimalista, con uso de [BLANK] y tipografia sofisticada.",
            answers: [
              "estrategico y visual premium",
              "plan de accion",
              "colores sobrios (negro, blanco, tonos neutros)",
            ],
            options: [
              "estrategico y visual premium",
              "informal e improvisado",
              "plan de accion",
              "bromas a mitad del contenido",
              "colores sobrios (negro, blanco, tonos neutros)",
              "colores neon saturados",
            ],
            explanation:
              "Perfecto. El prompt de la presentacion premium ya esta listo.",
          },
          previewTitle: "Deck ejecutivo con visual premium",
          previewDescription:
            "Una presentacion estrategica, elegante y persuasiva para temas corporativos o de alto nivel.",
          previewTags: ["Ejecutiva", "Premium", "Estrategica"],
        },
        {
          id: "B",
          label: "Presentacion opcion 2",
          name: "Presentacion dinamica",
          prompt:
            "Crea una presentacion dinamica y atractiva sobre [tema], con un enfoque moderno y facil de conectar con la audiencia. Estructura entre 8 y 10 diapositivas en formato storytelling: inicio llamativo, contexto del problema, situaciones del dia a dia, descubrimiento de una solucion, como funciona en la practica, beneficios reales y conclusion con llamado a la accion. Usa un lenguaje cercano, claro y facil de entender, evitando exceso de formalidad. El diseno debe ser visual, moderno y limpio, con colores suaves, buena jerarquia visual e imagenes que transmitan situaciones reales. Incluye textos cortos, frases de impacto y sugerencias visuales para cada diapositiva.",
          exercise: {
            title: "Completa el prompt de la presentacion dinamica",
            sentence:
              "Crea una presentacion dinamica y atractiva sobre [tema], con un enfoque [BLANK]. Estructura entre 8 y 10 diapositivas en formato storytelling: inicio llamativo, contexto del problema, situaciones del dia a dia, [BLANK], como funciona en la practica, beneficios reales y conclusion con llamado a la accion. El diseno debe ser visual, moderno y limpio, con [BLANK], buena jerarquia visual e imagenes que transmitan situaciones reales.",
            answers: [
              "moderno y facil de conectar con la audiencia",
              "descubrimiento de una solucion",
              "colores suaves",
            ],
            options: [
              "moderno y facil de conectar con la audiencia",
              "frio y distante",
              "descubrimiento de una solucion",
              "un cierre sin direccion",
              "colores suaves",
              "tonos agresivos y pesados",
            ],
            explanation:
              "Muy bien. El prompt de la presentacion dinamica ya esta listo.",
          },
          previewTitle: "Storytelling visual y atractivo",
          previewDescription:
            "Una estructura moderna, ligera y conectada con situaciones reales para mantener la atencion.",
          previewTags: ["Dinamica", "Storytelling", "Conexion"],
        },
        {
          id: "C",
          label: "Presentacion opcion 3",
          name: "Productividad en el trabajo",
          prompt:
            "Crea una presentacion profesional sobre productividad en el trabajo. Genera entre 8 y 12 diapositivas con la siguiente estructura: introduccion, situacion actual, principales desafios, soluciones practicas, beneficios y conclusion. Usa un lenguaje claro, directo y facil de entender en un entorno profesional. Incluye titulos cortos, puntos organizados y sugerencias visuales para cada diapositiva.",
          exercise: {
            title: "Completa el prompt de la presentacion de productividad",
            sentence:
              "Crea una presentacion profesional sobre [BLANK]. Genera entre 8 y 12 diapositivas con la siguiente estructura: introduccion, situacion actual, principales desafios, [BLANK], beneficios y conclusion. Usa [BLANK] en un entorno profesional.",
            answers: [
              "productividad en el trabajo",
              "soluciones practicas",
              "un lenguaje claro, directo y facil de entender",
            ],
            options: [
              "productividad en el trabajo",
              "moda de lujo",
              "soluciones practicas",
              "historias sin aplicacion",
              "un lenguaje claro, directo y facil de entender",
              "un lenguaje rebuscado y confuso",
            ],
            explanation:
              "Perfecto. El prompt de la presentacion de productividad ya esta listo.",
          },
          previewTitle: "Presentacion profesional y objetiva",
          previewDescription:
            "Un deck claro y practico sobre productividad, con estructura corporativa y foco en aplicacion.",
          previewTags: ["Productividad", "Profesional", "Claridad"],
        },
      ],
      resultTitle: "Tu presentacion esta lista",
      resultDescription:
        "Aqui sientes como la IA puede asumir estructura, visual y texto al mismo tiempo, sin depender de un archivo en blanco.",
      continueLabel: "Continuar al sitio completo",
      continueHelper:
        "Para cerrar el Dia 1, vas a pedir un sitio entero y ver una pagina lista aparecer a partir de un solo prompt.",
    },
    site: {
      eyebrow: "Creacion 3",
      title: "Crea un sitio completo",
      tool: "Herramienta: Claude",
      description:
        "Un sitio entero con paginas, botones, diseno y textos. Todo a partir de una sola solicitud. No es solo imagen: es codigo real.",
      steps: [
        "Elige uno de los 3 prompts de abajo.",
        "Pegalo en el campo de generacion de sitio en Educly.",
        "Toca generar sitio y espera.",
        "Recorre el sitio listo.",
      ],
      promptHint:
        "Claude construye sitios con HTML, CSS y codigo real. Eso significa que el resultado ya nace con cara de algo navegable.",
      loadingTitle: "Construyendo el sitio",
      loadingLines: [
        "Interpretando estructura, secciones y experiencia principal...",
        "Componiendo layout, estilo visual y elementos interactivos...",
        "Cerrando HTML, CSS y detalles para revelar la pagina...",
      ],
      options: [
        {
          id: "A",
          label: "Sitio opcion 1",
          name: "Landing page de lujo",
          prompt:
            "Crea una landing page de alto nivel para vender un apartamento de lujo llamado Senda. Visual elegante con tonos oscuros, dorados y crema. Debe incluir: un hero impactante con titulo grande, una barra con los datos del apartamento (142m2, 3 dormitorios, 3 plazas, piso 18), una galeria de ambientes, una seccion de diferenciales, un formulario de contacto y un mapa de ubicacion. Cursor dorado personalizado. Todo en un solo archivo HTML.",
          exercise: {
            title: "Completa el prompt del sitio Senda",
            sentence:
              "Crea una landing page de alto nivel para vender [BLANK]. Visual elegante con [BLANK]. Debe incluir: un hero impactante con titulo grande, una barra con los datos del apartamento (142m2, 3 dormitorios, 3 plazas, piso 18), una galeria de ambientes, una seccion de diferenciales, un formulario de contacto y un mapa de ubicacion. Cursor dorado personalizado. Todo en [BLANK].",
            answers: [
              "un apartamento de lujo llamado Senda",
              "tonos oscuros, dorados y crema",
              "un solo archivo HTML",
            ],
            options: [
              "un apartamento de lujo llamado Senda",
              "una tienda de moda llamada Forma",
              "tonos oscuros, dorados y crema",
              "un visual totalmente neon",
              "un solo archivo HTML",
              "diez archivos separados",
            ],
            explanation:
              "Perfecto. El prompt premium de Senda ya esta listo.",
          },
          previewTitle: "Senda: visual premium con hero de impacto",
          previewDescription:
            "Un proyecto de alto nivel con atmosfera sofisticada y detalles pensados para conversion.",
          previewTags: ["Lujo", "Landing page", "Dark gold"],
        },
        {
          id: "B",
          label: "Sitio opcion 2",
          name: "E-commerce clean",
          prompt:
            "Crea un e-commerce de moda llamado Forma. Visual clean y minimalista, con fondo casi blanco. Debe funcionar de verdad: listado de productos con filtro por categoria, busqueda en tiempo real, pagina individual de producto con seleccion de talla y color, carrito lateral que abre y cierra, y contador en el icono del carrito. Incluye al menos 10 productos de ropa con precios. Todo en un solo archivo HTML.",
          exercise: {
            title: "Completa el prompt del e-commerce Forma",
            sentence:
              "Crea un e-commerce de moda llamado [BLANK]. Visual [BLANK], con fondo casi blanco. Debe funcionar de verdad: listado de productos con filtro por categoria, busqueda en tiempo real, pagina individual de producto con seleccion de talla y color, [BLANK], y contador en el icono del carrito. Incluye al menos 10 productos de ropa con precios. Todo en un solo archivo HTML.",
            answers: [
              "Forma",
              "clean y minimalista",
              "carrito lateral que abre y cierra",
            ],
            options: [
              "Forma",
              "Raiz",
              "clean y minimalista",
              "oscuro y barroco",
              "carrito lateral que abre y cierra",
              "sin carrito",
            ],
            explanation:
              "Muy bien. El prompt del e-commerce funcional ya esta listo para generar.",
          },
          previewTitle: "Forma: tienda elegante y funcional",
          previewDescription:
            "Catalogo, filtros, busqueda y carrito en un visual ligero con cara de marca moderna.",
          previewTags: ["E-commerce", "Minimalista", "Funcional"],
        },
        {
          id: "C",
          label: "Sitio opcion 3",
          name: "Blog organico",
          prompt:
            "Crea un blog de nutricion y alimentacion saludable llamado Raiz. Visual organico con tonos de verde, tierra y crema. Debe incluir: pagina inicial con posts destacados, articulos recientes en cards, receta de la semana, categorias, newsletter y footer. Al hacer clic en un articulo debe abrir el post completo con contenido real de nutricion. Incluye al menos 6 articulos completos sobre alimentacion saludable. Todo en un solo archivo HTML.",
          exercise: {
            title: "Completa el prompt del blog Raiz",
            sentence:
              "Crea un blog de nutricion y alimentacion saludable llamado [BLANK]. Visual organico con tonos [BLANK]. Debe incluir: pagina inicial con posts destacados, articulos recientes en cards, receta de la semana, categorias, newsletter y footer. Al hacer clic en un articulo debe abrir el post completo con contenido real de nutricion. Incluye al menos [BLANK] sobre alimentacion saludable. Todo en un solo archivo HTML.",
            answers: [
              "Raiz",
              "de verde, tierra y crema",
              "6 articulos completos",
            ],
            options: [
              "Raiz",
              "Forma",
              "de verde, tierra y crema",
              "metalicos y frios",
              "6 articulos completos",
              "solo una frase suelta",
            ],
            explanation:
              "Perfecto. El prompt del blog organico ya quedo desbloqueado.",
          },
          previewTitle: "Raiz: blog editorial con contenido real",
          previewDescription:
            "Una pagina viva, con identidad organica y estructura lista para lectura, descubrimiento y newsletter.",
          previewTags: ["Blog", "Editorial", "Organico"],
        },
      ],
      resultTitle: "Tu sitio esta listo",
      resultDescription:
        "Pediste un producto entero y recibiste una interfaz navegable. Ese es el tipo de salto que hace que la IA parezca absurda para quien la ve por primera vez.",
      continueLabel: "Ir al resumen final del Dia 1",
      continueHelper:
        "Ahora vale mirar hacia atras y notar lo que creaste en solo unos minutos.",
    },
  },
  summary: {
    eyebrow: "Cierre",
    title: "Lo que acabas de crear",
    description:
      "Frames para un video, un video hablado, una presentacion en slides y un sitio completo. Todo en pocos minutos, con prompts listos y sin necesitar teoria primero.",
    items: [
      "Frames para el video",
      "Un video",
      "Una presentacion",
      "Un sitio completo",
    ],
    finalLine:
      "Ahora imagina lo que pasa cuando aprendes a crear tus propios prompts desde cero.",
    nextDay:
      "Manana: como funciona la IA y como hacer que trabaje a tu manera.",
    continueLabel: "Concluir Dia 1",
    continueHelper:
      "Concluye para abrir el flujo normal del final del Dia 1 y registrar tu evaluacion.",
  },
} as const;
