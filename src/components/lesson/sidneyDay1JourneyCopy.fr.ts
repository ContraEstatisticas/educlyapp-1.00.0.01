export const FR_SIDNEY_DAY1_JOURNEY_COPY = {
  common: {
    simulatorBadge: "experience pratique",
    exerciseBadge: "exercice rapide",
    choosePrompt: "Choisis un prompt",
    promptSelected: "Prompt selectionne",
    promptLockedTitle: "Complete l'exercice pour debloquer le prompt",
    promptLockedBody:
      "Choisis les bonnes options dans l'exercice ci-dessus. Quand tu reussis, le prompt complet apparait ici et le bouton pour generer est active.",
    promptReadyTitle: "Prompt complet debloque",
    promptReadyBody:
      "Tu as monte la bonne base. Verifie le prompt complet ci-dessous avant de generer.",
    exerciseLockedHint:
      "Complete d'abord le prompt avec les bonnes options. Ensuite la generation sera debloquee.",
    exerciseCompleted: "Prompt monte avec succes",
    redoExercise: "Monter ce prompt encore une fois",
    generate: "Generer maintenant",
    regenerate: "Generer une autre version",
    loadingLabel: "Generation avec IA",
    resultLabel: "Resultat pret",
    readyToContinue:
      "Tout est pret. Tu peux maintenant passer a la creation suivante.",
    loadingProgress: (value: number) => `${value}% termine`,
    pipelineLabel: "pipeline IA",
    generatedResultBadge: "resultat genere",
    finalAssetLabel: "asset final",
    videoAssetPending:
      "La video generee apparaitra ici des que les assets seront relies.",
    frameAssetPending:
      "Le frame genere apparaitra ici des que les assets seront relies.",
    protectedResultLabel: "resultat protege",
    hiddenVideoLabel: "video cachee",
    hiddenFrameLabel: "frame cache",
    hiddenVideoHint:
      "Choisis l'option que tu veux et clique sur generer maintenant. La vraie video apparait seulement apres le suspense et l'ecran de chargement.",
    hiddenFramesHint:
      "Choisis l'option que tu veux et clique sur generer maintenant. Les vrais frames apparaissent seulement apres le suspense et l'ecran de chargement.",
    generatedVideoLabel: "video generee",
    generatedFrameLabel: "frame genere",
    flyerCtaLabel: "Reserver maintenant",
    promptPanelLabel: "Prompt",
    dayLabel: "Jour 1",
  },
  onboarding: {
    eyebrow: "Bienvenue en video",
    title: "Regarde l'onboarding avant de commencer a creer",
    description:
      "Cette video ouvre l'experience de Sidney et te montre rapidement comment le Jour 1 va se passer avant les generations avec l'IA.",
    supporting:
      "Ensuite, le parcours suit le meme flux que sidney_texto : frames, video, flyer, presentation et site.",
    playerEyebrow: "video d'onboarding",
    playerTitle: "Introduction rapide du parcours",
    playerDescription:
      "Regarde-la pour entrer dans l'experience en sachant ce que tu vas voir et construire ensuite.",
    videoBadge: "video reel",
    enableSoundLabel: "Activer le son",
    autoPlayHint:
      "La video demarre automatiquement sans son. Appuie sur 'Activer le son' pour l'entendre.",
    fallbackNotice:
      "En attendant l'onboarding de cette langue, nous affichons la version disponible la plus proche.",
    continueLabel: "Entrer dans l'experience pratique",
    continueHelper:
      "Apres l'onboarding, tu continues vers l'introduction normale du Jour 1.",
  },
  intro: {
    eyebrow: "Jour 1 en action",
    title: "Aujourd'hui tu ne vas pas etudier. Tu vas creer.",
    description:
      "Aujourd'hui tu vas creer 5 livrables visibles avec l'IA : des frames, une video, un flyer, une presentation et un vrai site. Tu n'as pas besoin de connaissances prealables. Suis simplement les etapes, choisis un prompt et regarde le resultat.",
    supporting:
      "La theorie deviendra plus claire au fil de la progression dans le parcours.",
    cards: [
      {
        icon: "frames",
        title: "Frames pour la video",
        tool: "Gemini",
        time: "~3 min",
      },
      { icon: "video", title: "Une video", tool: "Grok", time: "~3 min" },
      { icon: "flyer", title: "Un flyer", tool: "ChatGPT", time: "~3 min" },
      {
        icon: "slides",
        title: "Une presentation",
        tool: "Gamma",
        time: "~3 min",
      },
      {
        icon: "site",
        title: "Un site complet",
        tool: "Claude",
        time: "~3 min",
      },
    ],
    kickoffTitle: "Tout commence par la pratique",
    kickoffBody:
      "D'abord tu crees les frames de la video, puis tu les transformes en video parlee, ensuite tu generes un flyer, puis tu vois une presentation complete se monter a l'ecran et tu termines l'experience en voyant un vrai site apparaitre. L'idee ici est de te faire ressentir l'IA en action avant la theorie.",
    continueLabel: "Commencer par les frames de la video",
    continueHelper:
      "Avant la video, nous allons creer les images cles qui vont definir l'ambiance de la scene.",
  },
  sections: {
    frames: {
      eyebrow: "Preparation de la video",
      title: "Cree des frames pour ta video",
      tool: "Outil : Gemini",
      description:
        "Avant de generer la video, nous allons creer les images cles. L'IA genere les frames et tu les utilises ensuite pour monter la video.",
      steps: [
        "Choisis un des prompts ci-dessous.",
        "Colle-le dans le champ de generation d'image dans Educly.",
        "Appuie sur generer l'image et attends.",
        "Sauvegarde les frames et utilise-les a l'etape suivante.",
      ],
      promptHint:
        "Un prompt est la consigne que tu donnes a l'IA. Plus tu es clair, meilleur sera le resultat.",
      loadingTitle: "Generation des frames",
      loadingLines: [
        "Lecture de l'expression, de la pose, du cadrage et du style visuel...",
        "Construction de la lumiere, du personnage et de l'ambiance de chaque frame...",
        "Finalisation des plans cles pour reveler les frames a l'ecran...",
      ],
      options: [
        {
          id: "A",
          name: "Femme heureuse",
          prompt:
            "Femme latine d'environ 30 ans, cheveux longs fonces, tenue casual moderne dans des tons bleu clair et blanc, grand sourire, regard direct vers la camera, fond blanc propre, cadrage du buste vers le haut, lumiere douce. Style mascotte d'application mobile. Haute resolution, sans texte.",
          exercise: {
            title: "Complete le prompt de la femme heureuse",
            sentence:
              "Femme latine d'environ 30 ans, cheveux longs fonces, tenue casual moderne dans des tons bleu clair et blanc, grand sourire, regard direct vers la camera, [BLANK], cadrage [BLANK], lumiere douce. Style mascotte d'application mobile. Haute resolution, sans texte.",
            answers: ["fond blanc propre", "du buste vers le haut"],
            options: [
              "fond blanc propre",
              "fond avec ville neon",
              "du buste vers le haut",
              "en pied",
              "regard vers le bas",
              "sans lumiere douce",
            ],
            explanation:
              "Parfait. Le prompt complet de la femme heureuse est maintenant debloque.",
          },
          resultFrames: [
            { label: "Frame genere", alt: "Frame de la femme heureuse" },
          ],
          previewTitle: "Frame heureuse pour une ouverture accueillante",
          previewDescription:
            "Une image cle avec un grand sourire, une energie positive et une ambiance de bienvenue pour commencer la video.",
          previewTags: ["Heureuse", "Frame", "Ouverture"],
        },
        {
          id: "B",
          name: "Femme triste",
          prompt:
            "Femme latine d'environ 30 ans, cheveux longs fonces, tenue casual moderne dans des tons bleu clair et blanc, expression triste et demoralisee, regard legerement baisse, fond blanc propre, cadrage du buste vers le haut, lumiere douce. Style mascotte d'application mobile. Haute resolution, sans texte.",
          exercise: {
            title: "Complete le prompt de la femme triste",
            sentence:
              "Femme latine d'environ 30 ans, cheveux longs fonces, tenue casual moderne dans des tons bleu clair et blanc, expression triste et demoralisee, [BLANK], [BLANK], cadrage du buste vers le haut, lumiere douce. Style mascotte d'application mobile. Haute resolution, sans texte.",
            answers: ["regard legerement baisse", "fond blanc propre"],
            options: [
              "regard legerement baisse",
              "grand sourire",
              "fond blanc propre",
              "fond de scene sombre",
              "regard provocateur",
              "lumiere neon bleue",
            ],
            explanation:
              "Bien. Le prompt complet de la femme triste est maintenant debloque.",
          },
          resultFrames: [
            { label: "Frame genere", alt: "Frame de la femme triste" },
          ],
          previewTitle: "Frame triste pour des scenes plus emotionnelles",
          previewDescription:
            "Un frame plus sensible pour creer du contraste, de l'empathie et un ton de depassement dans la video.",
          previewTags: ["Triste", "Emotion", "Contraste"],
        },
        {
          id: "C",
          name: "Femme serieuse",
          prompt:
            "Femme latine d'environ 30 ans, cheveux longs fonces, tenue casual moderne dans des tons bleu clair et blanc, expression serieuse et ferme, regard direct vers la camera sans sourire, fond blanc propre, cadrage du buste vers le haut, lumiere douce. Style mascotte d'application mobile. Haute resolution, sans texte.",
          exercise: {
            title: "Complete le prompt de la femme serieuse",
            sentence:
              "Femme latine d'environ 30 ans, cheveux longs fonces, tenue casual moderne dans des tons bleu clair et blanc, expression [BLANK], [BLANK] [BLANK], fond blanc propre, cadrage du buste vers le haut, lumiere douce. Style mascotte d'application mobile. Haute resolution, sans texte.",
            answers: [
              "serieuse et ferme",
              "regard direct vers la camera",
              "sans sourire",
            ],
            options: [
              "serieuse et ferme",
              "joyeuse et detendue",
              "regard direct vers la camera",
              "regard vers le sol",
              "sans sourire",
              "avec un grand rire",
            ],
            explanation:
              "Parfait. Le prompt le plus ferme est maintenant debloque.",
          },
          resultFrames: [
            { label: "Frame genere", alt: "Frame de la femme serieuse" },
          ],
          previewTitle: "Frame serieuse pour un message ferme",
          previewDescription:
            "Un cadrage direct et confiant pour des messages plus forts, avec presence et autorite dans la scene.",
          previewTags: ["Serieuse", "Ferme", "Autorite"],
        },
      ],
      resultTitle: "Tes frames sont prets",
      resultDescription:
        "Tu as maintenant les plans cles du personnage. A l'etape suivante, cela devient une video avec voix, emotion et plus d'impact.",
      continueLabel: "Continuer vers la video IA",
      continueHelper:
        "Maintenant nous allons transformer cette ambiance en une video parlee avec l'IA.",
    },
    video: {
      eyebrow: "Creation 1",
      title: "Cree une video avec l'IA",
      tool: "Outil : Grok",
      description:
        "Tu decris la scene. L'IA cree la video. Choisis un prompt, clique sur generer et attends.",
      steps: [
        "Choisis un des 3 prompts ci-dessous.",
        "Colle-le dans le champ de generation de video dans Educly.",
        "Appuie sur generer la video et attends.",
        "Regarde le resultat.",
      ],
      promptHint:
        "Pense comme un realisateur : dis ce que tu veux, comment tu le veux et quelle ambiance tu veux pour la scene.",
      loadingTitle: "Rendu de la video",
      loadingLines: [
        "Interpretation de l'ambiance de la scene, de l'emotion et de la voix du personnage...",
        "Animation de l'expression, de la voix, des levres et de la presence du personnage...",
        "Finalisation du rendu pour reveler la video avec lip sync...",
      ],
      options: [
        {
          id: "A",
          name: "Plage au coucher du soleil",
          prompt: `Une femme latine d'une vingtaine d'annees, avec de longs cheveux fonces, portant une tenue casual moderne dans des tons bleu clair et blanc, debout devant un fond blanc propre. Elle regarde directement la camera avec un grand sourire accueillant, des yeux brillants et pleins d'energie. Elle parle en francais, avec un ton enthousiaste et heureux : "Bienvenue. Entrer dans Educly a ete l'une des meilleures decisions de ta vie. Tu as choisi l'education, et cela change tout." Style realiste, lumiere douce, cadrage du buste vers le haut. Sans musique. Lip sync naturel.`,
          exercise: {
            title: "Complete le prompt de la video heureuse",
            sentence:
              `Une femme latine d'une vingtaine d'annees, avec de longs cheveux fonces, portant une tenue casual moderne dans des tons bleu clair et blanc, debout devant un fond blanc propre. Elle regarde directement la camera avec [BLANK]. Elle parle en [BLANK], avec un ton [BLANK] et heureux : "Bienvenue. Entrer dans Educly a ete l'une des meilleures decisions de ta vie. Tu as choisi l'education, et cela change tout." Style realiste, lumiere douce, cadrage du buste vers le haut. Sans musique. Lip sync naturel.`,
            answers: [
              "un grand sourire accueillant, des yeux brillants et pleins d'energie",
              "francais",
              "enthousiaste",
            ],
            options: [
              "un grand sourire accueillant, des yeux brillants et pleins d'energie",
              "des yeux legerement humides et un regard melancolique",
              "francais",
              "anglais",
              "enthousiaste",
              "lent et sincere",
            ],
            explanation:
              "Parfait. Le prompt de la video heureuse est maintenant pret a etre utilise.",
          },
          resultVideos: [
            { label: "Video generee", alt: "Video de la femme heureuse" },
          ],
          previewTitle: "Bienvenue avec energie et enthousiasme",
          previewDescription:
            "Une phrase chaleureuse, un grand sourire et un ton confiant pour ouvrir la video avec un impact positif.",
          previewTags: ["Heureuse", "Bienvenue", "Lip sync"],
        },
        {
          id: "B",
          name: "Message emouvant",
          prompt: `Une femme latine d'une vingtaine d'annees, avec de longs cheveux fonces, portant une tenue casual moderne dans des tons bleu clair et blanc, debout devant un fond blanc propre. Elle regarde directement la camera avec une expression douce, emouvante et melancolique, les yeux legerement humides, comme si elle etait vraiment touchee. Elle parle en francais, avec un ton lent et sincere : "Entrer dans Educly n'etait pas une decision quelconque... mais tu as choisi l'education. Et cela... cela fait partie des choses les plus precieuses qui existent." Style realiste, lumiere douce, cadrage du buste vers le haut. Sans musique. Lip sync naturel.`,
          exercise: {
            title: "Complete le prompt de la video emouvante",
            sentence:
              `Une femme latine d'une vingtaine d'annees, avec de longs cheveux fonces, portant une tenue casual moderne dans des tons bleu clair et blanc, debout devant un fond blanc propre. Elle regarde directement la camera avec [BLANK]. Elle parle en [BLANK], avec un ton [BLANK] : "Entrer dans Educly n'etait pas une decision quelconque... mais tu as choisi l'education. Et cela... cela fait partie des choses les plus precieuses qui existent." Style realiste, lumiere douce, cadrage du buste vers le haut. Sans musique. Lip sync naturel.`,
            answers: [
              "une expression douce, emouvante et melancolique, les yeux legerement humides, comme si elle etait vraiment touchee",
              "francais",
              "lent et sincere",
            ],
            options: [
              "une expression douce, emouvante et melancolique, les yeux legerement humides, comme si elle etait vraiment touchee",
              "une expression forte et determinee",
              "francais",
              "espagnol",
              "lent et sincere",
              "fort et passionne",
            ],
            explanation:
              "Parfait. Le prompt de la video emouvante est maintenant debloque.",
          },
          resultVideos: [
            { label: "Video generee", alt: "Video de la femme triste" },
          ],
          previewTitle: "Ton emotionnel avec douleur et valeur du choix",
          previewDescription:
            "Un personnage plus sensible, avec une voix chargee d'emotion et une phrase qui valorise la decision de l'eleve.",
          previewTags: ["Triste", "Emotion", "Lip sync"],
        },
        {
          id: "C",
          name: "Invitation ferme",
          prompt: `Une femme latine d'une vingtaine d'annees, avec de longs cheveux fonces, portant une tenue casual moderne dans des tons bleu clair et blanc, debout devant un fond blanc propre. Elle regarde directement la camera avec une expression forte et determinee, les sourcils legerement fronces, ton serieux. Elle parle en francais, avec un ton fort et passionne : "Bienvenue dans Educly. Tu as choisi l'education et ce n'est pas rien. Maintenant il est temps d'agir, parce que ceux qui etudient ne restent pas derriere." Style realiste, lumiere douce, cadrage du buste vers le haut. Sans musique. Lip sync naturel.`,
          exercise: {
            title: "Complete le prompt de la video ferme",
            sentence:
              `Une femme latine d'une vingtaine d'annees, avec de longs cheveux fonces, portant une tenue casual moderne dans des tons bleu clair et blanc, debout devant un fond blanc propre. Elle regarde directement la camera avec [BLANK]. Elle parle en [BLANK], avec un ton [BLANK] : "Bienvenue dans Educly. Tu as choisi l'education et ce n'est pas rien. Maintenant il est temps d'agir, parce que ceux qui etudient ne restent pas derriere." Style realiste, lumiere douce, cadrage du buste vers le haut. Sans musique. Lip sync naturel.`,
            answers: [
              "une expression forte et determinee, les sourcils legerement fronces, ton serieux",
              "francais",
              "fort et passionne",
            ],
            options: [
              "une expression forte et determinee, les sourcils legerement fronces, ton serieux",
              "une expression douce et emouvante avec les yeux humides",
              "francais",
              "anglais",
              "fort et passionne",
              "leger et detendu",
            ],
            explanation:
              "Bien. Le prompt de la video ferme est maintenant debloque pour la generation.",
          },
          resultVideos: [
            { label: "Video generee", alt: "Video de la femme serieuse" },
          ],
          previewTitle: "Invitation ferme et determinee a agir",
          previewDescription:
            "Une phrase forte, une posture sure et une energie d'action pour transmettre urgence et attitude.",
          previewTags: ["Forte", "Determination", "Lip sync"],
        },
      ],
      resultTitle: "Ta video est prete",
      resultDescription:
        "La scene a ete construite a partir du prompt que tu as choisi. Observe maintenant comment l'emotion du personnage change l'impact de la video.",
      continueLabel: "Continuer vers le flyer",
      continueHelper:
        "Maintenant tu vas transformer l'idee de la video en un visuel pret a diffuser.",
    },
    flyer: {
      eyebrow: "Creation 3",
      title: "Cree un flyer motivation",
      tool: "Outil : ChatGPT",
      description:
        "L'IA peut aussi creer des images professionnelles. Ici tu vas generer un visuel pret pour Instagram qui ressemble a une creation de designer.",
      steps: [
        "Choisis un des 3 prompts ci-dessous.",
        "Colle le prompt dans le champ indique dans Educly.",
        "Appuie sur generer l'image.",
        "Observe le resultat.",
      ],
      promptHint:
        "Chaque prompt cree un type de visuel different. Choisis celui qui correspond le mieux a ton style.",
      loadingTitle: "Construction du flyer",
      loadingLines: [
        "Lecture de la composition, de la palette de couleurs et du style creatif...",
        "Generation du fond, de la typographie et des elements de mise en avant...",
        "Finalisation du visuel pour afficher le flyer a l'ecran...",
      ],
      options: [
        {
          id: "A",
          name: "Image option 1",
          prompt:
            `Cree un flyer motivation pour Instagram avec une personne en train de s'entrainer ou de travailler avec concentration, lumiere dramatique et style moderne.
Ajoute un texte fort dans l'image :
"Discipline aujourd'hui. Resultat demain."
Utilise une grande typographie, un contraste eleve et un design professionnel.`,
          exercise: {
            title: "Complete le prompt du flyer discipline",
            sentence:
              `Cree un flyer motivation pour Instagram avec [BLANK], lumiere dramatique et style [BLANK].
Ajoute un texte fort dans l'image :
"[BLANK]"
Utilise une grande typographie, un contraste eleve et un design professionnel.`,
            answers: [
              "une personne en train de s'entrainer ou de travailler avec concentration",
              "moderne",
              "Discipline aujourd'hui. Resultat demain.",
            ],
            options: [
              "une personne en train de s'entrainer ou de travailler avec concentration",
              "une plage vide",
              "moderne",
              "retro enfantin",
              "Discipline aujourd'hui. Resultat demain.",
              "Tout ira bien sans effort.",
            ],
            explanation:
              "Parfait. Le prompt du flyer discipline est maintenant pret.",
          },
          previewTitle: "Discipline aujourd'hui. Resultat demain.",
          previewDescription:
            "Un visuel fort, moderne et dramatique pour transmettre concentration et constance.",
          previewTags: ["Motivation", "Contraste", "Instagram"],
        },
        {
          id: "B",
          name: "Image option 2",
          prompt:
            `Cree un flyer motivation avec une personne marchant au lever du soleil, transmettant une sensation de nouveau depart et de progres.
Ajoute ce texte :
"Tu n'as pas besoin d'etre parfait. Tu ne peux pas t'arreter."
Style cinematographique, couleurs chaudes et visuel inspirant.`,
          exercise: {
            title: "Complete le prompt du flyer nouveau depart",
            sentence:
              `Cree un flyer motivation avec [BLANK], transmettant une sensation de nouveau depart et de progres.
Ajoute ce texte :
"[BLANK]"
Style [BLANK], couleurs chaudes et visuel inspirant.`,
            answers: [
              "une personne marchant au lever du soleil",
              "Tu n'as pas besoin d'etre parfait. Tu ne peux pas t'arreter.",
              "cinematographique",
            ],
            options: [
              "une personne marchant au lever du soleil",
              "une femme dans un bureau sombre",
              "Tu n'as pas besoin d'etre parfait. Tu ne peux pas t'arreter.",
              "Reste immobile et attends.",
              "cinematographique",
              "cartoon",
            ],
            explanation:
              "Parfait. Le flyer le plus inspirant est maintenant debloque.",
          },
          previewTitle: "Tu n'as pas besoin d'etre parfait",
          previewDescription:
            "Un visuel inspirant, chaleureux et cinematographique pour transmettre nouveau depart et constance.",
          previewTags: ["Inspirant", "Nouveau depart", "Instagram"],
        },
        {
          id: "C",
          name: "Image option 3",
          prompt:
            `Cree un flyer motivation avec une personne regardant vers l'horizon dans un environnement urbain ou naturel, symbolisant la croissance personnelle.
Ajoute ce texte :
"Chaque jour est une nouvelle chance d'evoluer."
Design clean, elegant et aspect professionnel.`,
          exercise: {
            title: "Complete le prompt du flyer evolution",
            sentence:
              `Cree un flyer motivation avec [BLANK] dans un environnement urbain ou naturel, symbolisant la croissance personnelle.
Ajoute ce texte :
"[BLANK]"
Design [BLANK], elegant et aspect professionnel.`,
            answers: [
              "une personne regardant vers l'horizon",
              "Chaque jour est une nouvelle chance d'evoluer.",
              "clean",
            ],
            options: [
              "une personne regardant vers l'horizon",
              "un groupe courant sur la plage",
              "Chaque jour est une nouvelle chance d'evoluer.",
              "Ne change jamais rien.",
              "clean",
              "plein de bruit visuel",
            ],
            explanation:
              "Bien. Le prompt du flyer clean est maintenant complet.",
          },
          previewTitle: "Chaque jour est une nouvelle chance d'evoluer",
          previewDescription:
            "Un visuel clean et elegant qui communique la croissance personnelle avec un message fort.",
          previewTags: ["Clean", "Croissance", "Instagram"],
        },
      ],
      resultTitle: "Ton flyer est pret",
      resultDescription:
        "En changeant uniquement le prompt, l'identite visuelle change completement. C'est ainsi que l'IA commence a suivre une direction creative.",
      continueLabel: "Continuer vers la presentation",
      continueHelper:
        "Maintenant tu vas quitter l'image pour voir une presentation complete se structurer en quelques secondes.",
    },
    slides: {
      eyebrow: "Creation 2",
      title: "Cree une presentation en slides",
      tool: "Outil : Gamma",
      description:
        "Plus besoin de passer des heures sur PowerPoint. L'IA monte une presentation complete avec design, texte et structure en quelques secondes.",
      steps: [
        "Choisis un des 3 prompts ci-dessous.",
        "Colle-le dans le champ de generation de presentation dans Educly.",
        "Appuie sur generer la presentation et attends.",
        "Parcours les slides deja prets.",
      ],
      promptHint:
        "Gamma s'occupe du design, du texte et de la mise en page. Tu n'as rien a ajuster.",
      loadingTitle: "Construction des slides",
      loadingLines: [
        "Organisation du fil, du recit et de l'ordre des sujets...",
        "Distribution des titres, des pages et de la hierarchie visuelle...",
        "Application du layout, des points forts et du rythme de presentation...",
      ],
      options: [
        {
          id: "A",
          label: "Presentation option 1",
          name: "Presentation premium",
          prompt:
            "Cree une presentation professionnelle haut de gamme sur [theme], avec un angle strategique et un visuel premium. Genere entre 10 et 12 diapositives bien structurees avec : une couverture marquante, le contexte du probleme, l'analyse de la situation actuelle, les opportunites, la proposition de solution, le plan d'action, les benefices clairs, les differenciateurs et la conclusion. Utilise un langage executif, clair et persuasif, en evitant les termes inutilement techniques. Le design doit etre moderne, elegant et minimaliste, avec des couleurs sobres (noir, blanc, tons neutres) et une typographie sophistiquee. Inclue des suggestions visuelles pour chaque diapositive (graphiques, icones, schemas) et garde des textes courts et a fort impact.",
          exercise: {
            title: "Complete le prompt de la presentation premium",
            sentence:
              "Cree une presentation professionnelle haut de gamme sur [theme], avec un angle [BLANK]. Genere entre 10 et 12 diapositives bien structurees avec : une couverture marquante, le contexte du probleme, l'analyse de la situation actuelle, les opportunites, la proposition de solution, [BLANK], les benefices clairs, les differenciateurs et la conclusion. Le design doit etre moderne, elegant et minimaliste, avec [BLANK] et une typographie sophistiquee.",
            answers: [
              "strategique et un visuel premium",
              "le plan d'action",
              "des couleurs sobres (noir, blanc, tons neutres)",
            ],
            options: [
              "strategique et un visuel premium",
              "leger et improvise",
              "le plan d'action",
              "des blagues au milieu du contenu",
              "des couleurs sobres (noir, blanc, tons neutres)",
              "des couleurs neon saturees",
            ],
            explanation:
              "Parfait. Le prompt de la presentation premium est maintenant pret.",
          },
          previewTitle: "Deck executif au visuel premium",
          previewDescription:
            "Une presentation strategique, elegante et persuasive pour des sujets corporate ou haut de gamme.",
          previewTags: ["Executif", "Premium", "Strategie"],
        },
        {
          id: "B",
          label: "Presentation option 2",
          name: "Presentation dynamique",
          prompt:
            "Cree une presentation dynamique et attractive sur [theme], avec une approche moderne et facile a connecter avec l'audience. Structure entre 8 et 10 diapositives en format storytelling : ouverture marquante, contexte du probleme, situations du quotidien, decouverte d'une solution, fonctionnement concret, benefices reels et conclusion avec appel a l'action. Utilise un langage proche, clair et facile a comprendre, en evitant trop de formalite. Le design doit etre visuel, moderne et propre, avec des couleurs douces, une bonne hierarchie visuelle et des images qui transmettent des situations reelles. Inclue des textes courts, des phrases d'impact et des suggestions visuelles pour chaque diapositive.",
          exercise: {
            title: "Complete le prompt de la presentation dynamique",
            sentence:
              "Cree une presentation dynamique et attractive sur [theme], avec une approche [BLANK]. Structure entre 8 et 10 diapositives en format storytelling : ouverture marquante, contexte du probleme, situations du quotidien, [BLANK], fonctionnement concret, benefices reels et conclusion avec appel a l'action. Le design doit etre visuel, moderne et propre, avec [BLANK], une bonne hierarchie visuelle et des images qui transmettent des situations reelles.",
            answers: [
              "moderne et facile a connecter avec l'audience",
              "decouverte d'une solution",
              "des couleurs douces",
            ],
            options: [
              "moderne et facile a connecter avec l'audience",
              "froide et distante",
              "decouverte d'une solution",
              "une fin sans direction",
              "des couleurs douces",
              "des tons agressifs et lourds",
            ],
            explanation:
              "Bien. Le prompt de la presentation dynamique est maintenant pret.",
          },
          previewTitle: "Storytelling visuel et engageant",
          previewDescription:
            "Une structure moderne, legere et connectee a des situations reelles pour garder l'attention du public.",
          previewTags: ["Dynamique", "Storytelling", "Connexion"],
        },
        {
          id: "C",
          label: "Presentation option 3",
          name: "Productivite au travail",
          prompt:
            "Cree une presentation professionnelle sur la productivite au travail. Genere entre 8 et 12 diapositives avec la structure suivante : introduction, situation actuelle, principaux defis, solutions pratiques, benefices et conclusion. Utilise un langage clair, direct et facile a comprendre dans un contexte professionnel. Inclue des titres courts, des points organises et des suggestions visuelles pour chaque diapositive.",
          exercise: {
            title: "Complete le prompt de la presentation sur la productivite",
            sentence:
              "Cree une presentation professionnelle sur [BLANK]. Genere entre 8 et 12 diapositives avec la structure suivante : introduction, situation actuelle, principaux defis, [BLANK], benefices et conclusion. Utilise [BLANK] dans un contexte professionnel.",
            answers: [
              "la productivite au travail",
              "solutions pratiques",
              "un langage clair, direct et facile a comprendre",
            ],
            options: [
              "la productivite au travail",
              "la mode de luxe",
              "solutions pratiques",
              "des histoires sans application",
              "un langage clair, direct et facile a comprendre",
              "un langage trop complexe et confus",
            ],
            explanation:
              "Parfait. Le prompt de la presentation sur la productivite est maintenant pret.",
          },
          previewTitle: "Presentation professionnelle et objective",
          previewDescription:
            "Un deck clair et pratique sur la productivite, avec une structure corporate et un focus sur l'application.",
          previewTags: ["Productivite", "Professionnel", "Clarte"],
        },
      ],
      resultTitle: "Ta presentation est prete",
      resultDescription:
        "Ici tu ressens comment l'IA peut prendre en charge la structure, le visuel et le texte en meme temps, sans partir d'un fichier vide.",
      continueLabel: "Continuer vers le site complet",
      continueHelper:
        "Pour boucler le Jour 1, tu vas demander un site entier et voir une page terminee apparaitre a partir d'un seul prompt.",
    },
    site: {
      eyebrow: "Creation 4",
      title: "Cree un site complet",
      tool: "Outil : Claude",
      description:
        "Un site entier avec pages, boutons, design et textes. Tout a partir d'une seule demande. Ce n'est pas juste une image : c'est du vrai code.",
      steps: [
        "Choisis un des 3 prompts ci-dessous.",
        "Colle-le dans le champ de generation de site dans Educly.",
        "Appuie sur generer le site et attends.",
        "Parcours le site deja pret.",
      ],
      promptHint:
        "Claude construit des sites avec HTML, CSS et vrai code. Cela signifie que le resultat ressemble deja a quelque chose de navigable.",
      loadingTitle: "Construction du site",
      loadingLines: [
        "Interpretation de la structure, des sections et de l'experience principale...",
        "Composition du layout, du style visuel et des elements interactifs...",
        "Finalisation du HTML, du CSS et des details pour reveler la page...",
      ],
      options: [
        {
          id: "A",
          label: "Site option 1",
          name: "Landing page luxe",
          prompt:
            "Cree une landing page haut de gamme pour vendre un appartement de luxe appele Senda. Visuel elegant avec des tons sombres, dores et creme. Elle doit inclure : un hero impactant avec un grand titre, une barre avec les informations de l'appartement (142m2, 3 chambres, 3 places, 18e etage), une galerie d'espaces, une section de points forts, un formulaire de contact et une carte de localisation. Curseur dore personnalise. Le tout dans un seul fichier HTML.",
          exercise: {
            title: "Complete le prompt du site Senda",
            sentence:
              "Cree une landing page haut de gamme pour vendre [BLANK]. Visuel elegant avec [BLANK]. Elle doit inclure : un hero impactant avec un grand titre, une barre avec les informations de l'appartement (142m2, 3 chambres, 3 places, 18e etage), une galerie d'espaces, une section de points forts, un formulaire de contact et une carte de localisation. Curseur dore personnalise. Le tout dans [BLANK].",
            answers: [
              "un appartement de luxe appele Senda",
              "des tons sombres, dores et creme",
              "un seul fichier HTML",
            ],
            options: [
              "un appartement de luxe appele Senda",
              "une boutique de mode appelee Forma",
              "des tons sombres, dores et creme",
              "un visuel neon tres charge",
              "un seul fichier HTML",
              "dix fichiers separes",
            ],
            explanation:
              "Parfait. Le prompt premium de Senda est pret.",
          },
          previewTitle: "Senda : visuel premium avec hero impactant",
          previewDescription:
            "Un projet haut de gamme avec une atmosphere sophistiquee et des details penses pour la conversion.",
          previewTags: ["Luxe", "Landing page", "Dark gold"],
        },
        {
          id: "B",
          label: "Site option 2",
          name: "E-commerce clean",
          prompt:
            "Cree un site e-commerce de mode appele Forma. Visuel clean et minimaliste avec un fond presque blanc. Il doit fonctionner pour de vrai : liste de produits avec filtre par categorie, recherche en temps reel, page produit individuelle avec choix de taille et de couleur, panier lateral qui s'ouvre et se ferme, et compteur sur l'icone du panier. Inclue au moins 10 produits de mode avec leurs prix. Le tout dans un seul fichier HTML.",
          exercise: {
            title: "Complete le prompt du e-commerce Forma",
            sentence:
              "Cree un site e-commerce de mode appele [BLANK]. Visuel [BLANK] avec un fond presque blanc. Il doit fonctionner pour de vrai : liste de produits avec filtre par categorie, recherche en temps reel, page produit individuelle avec choix de taille et de couleur, [BLANK], et compteur sur l'icone du panier. Inclue au moins 10 produits de mode avec leurs prix. Le tout dans un seul fichier HTML.",
            answers: [
              "Forma",
              "clean et minimaliste",
              "un panier lateral qui s'ouvre et se ferme",
            ],
            options: [
              "Forma",
              "Raiz",
              "clean et minimaliste",
              "sombre et baroque",
              "un panier lateral qui s'ouvre et se ferme",
              "aucun panier",
            ],
            explanation:
              "Bien. Le prompt du e-commerce fonctionnel est pret a etre genere.",
          },
          previewTitle: "Forma : boutique elegante et fonctionnelle",
          previewDescription:
            "Catalogue, filtres, recherche et panier dans un visuel leger qui ressemble a une marque moderne.",
          previewTags: ["E-commerce", "Minimaliste", "Fonctionnel"],
        },
        {
          id: "C",
          label: "Site option 3",
          name: "Blog organique",
          prompt:
            "Cree un blog de nutrition et d'alimentation saine appele Raiz. Visuel organique avec des tons de vert, de terre et de creme. Il doit inclure : une page d'accueil avec des articles mis en avant, des cartes d'articles recents, la recette de la semaine, des categories, une newsletter et un footer. Quand on clique sur un article, il doit ouvrir le post complet avec un vrai contenu nutrition. Inclue au moins 6 articles complets sur l'alimentation saine. Le tout dans un seul fichier HTML.",
          exercise: {
            title: "Complete le prompt du blog Raiz",
            sentence:
              "Cree un blog de nutrition et d'alimentation saine appele [BLANK]. Visuel organique avec des tons [BLANK]. Il doit inclure : une page d'accueil avec des articles mis en avant, des cartes d'articles recents, la recette de la semaine, des categories, une newsletter et un footer. Quand on clique sur un article, il doit ouvrir le post complet avec un vrai contenu nutrition. Inclue au moins [BLANK] sur l'alimentation saine. Le tout dans un seul fichier HTML.",
            answers: [
              "Raiz",
              "de vert, de terre et de creme",
              "6 articles complets",
            ],
            options: [
              "Raiz",
              "Forma",
              "de vert, de terre et de creme",
              "metalliques et froids",
              "6 articles complets",
              "une seule phrase isolee",
            ],
            explanation:
              "Parfait. Le prompt du blog organique est maintenant debloque.",
          },
          previewTitle: "Raiz : blog editorial avec vrai contenu",
          previewDescription:
            "Une page vivante, avec une identite organique et une structure prete pour la lecture, la decouverte et la newsletter.",
          previewTags: ["Blog", "Editorial", "Organique"],
        },
      ],
      resultTitle: "Ton site est pret",
      resultDescription:
        "Tu as demande un produit complet et tu as recu une interface navigable. C'est ce genre de saut qui rend l'IA impressionnante pour quelqu'un qui la voit pour la premiere fois.",
      continueLabel: "Aller au resume final du Jour 1",
      continueHelper:
        "Maintenant cela vaut le coup de regarder en arriere et de voir tout ce que tu as cree en quelques minutes.",
    },
  },
  summary: {
    eyebrow: "Cloture",
    title: "Ce que tu viens de creer",
    description:
      "Des frames pour une video, une video parlee, un flyer, une presentation en slides et un site complet. Le tout en quelques minutes, avec des prompts prets et sans avoir besoin de comprendre la theorie avant.",
    items: [
      "Des frames pour la video",
      "Une video",
      "Un flyer",
      "Une presentation",
      "Un site complet",
    ],
    finalLine:
      "Maintenant imagine ce qui se passe quand tu apprends a creer tes propres prompts a partir de zero.",
    nextDay:
      "A partir de demain, nous allons t'aider a comprendre et apprendre chacune de ces IA pour que tu puisses tout faire tout seul.",
    toolsEyebrow: "IA utilisees aujourd'hui",
    toolsTitle: "Les outils que tu viens d'utiliser",
    toolsDescription:
      "Dans les prochains jours, nous allons t'aider a apprendre Gemini, Grok, ChatGPT, Gamma et Claude pour que tu puisses creer tout cela tout seul, sans dependre de prompts deja prets.",
    tools: [
      { icon: "frames", name: "Gemini", focus: "Frames pour la video" },
      { icon: "video", name: "Grok", focus: "Video parlee" },
      { icon: "flyer", name: "ChatGPT", focus: "Flyer" },
      { icon: "slides", name: "Gamma", focus: "Presentation" },
      { icon: "site", name: "Claude", focus: "Site complet" },
    ],
    continueLabel: "Conclure le Jour 1",
    continueHelper:
      "Conclue pour ouvrir le flux normal de fin du Jour 1 et enregistrer ton evaluation.",
  },
} as const;
