export const EN_SIDNEY_DAY1_JOURNEY_COPY = {
  common: {
    simulatorBadge: "hands-on experience",
    exerciseBadge: "quick exercise",
    choosePrompt: "Choose a prompt",
    promptSelected: "Prompt selected",
    promptLockedTitle: "Complete the exercise to unlock the prompt",
    promptLockedBody:
      "Choose the correct options in the exercise above. Once you get it right, the full prompt appears here and the generate button is unlocked.",
    promptReadyTitle: "Full prompt unlocked",
    promptReadyBody:
      "You built the right base. Review the full prompt below before generating.",
    exerciseLockedHint:
      "First complete the prompt with the correct options. After that, generation will be unlocked.",
    exerciseCompleted: "Prompt assembled successfully",
    redoExercise: "Build this prompt again",
    generate: "Generate now",
    regenerate: "Generate another version",
    loadingLabel: "Generating with AI",
    resultLabel: "Result ready",
    readyToContinue:
      "All set. Now you can move on to the next creation.",
    loadingProgress: (value: number) => `${value}% completed`,
    pipelineLabel: "AI pipeline",
    generatedResultBadge: "generated result",
    finalAssetLabel: "final asset",
    videoAssetPending:
      "The generated video will appear here as soon as the assets are connected.",
    frameAssetPending:
      "The generated frame will appear here as soon as the assets are connected.",
    protectedResultLabel: "protected result",
    hiddenVideoLabel: "hidden video",
    hiddenFrameLabel: "hidden frame",
    hiddenVideoHint:
      "Choose the option you want and click generate now. The real video only appears after the suspense screen and the loading step.",
    hiddenFramesHint:
      "Choose the option you want and click generate now. The real frames only appear after the suspense screen and the loading step.",
    generatedVideoLabel: "generated video",
    generatedFrameLabel: "generated frame",
    flyerCtaLabel: "Book now",
    promptPanelLabel: "Prompt",
    dayLabel: "Day 1",
  },
  intro: {
    eyebrow: "Day 1 in action",
    title: "Today you are not going to study. You are going to create.",
    description:
      "Today you will create 5 visible deliverables with AI: frames, a video, a flyer, a presentation, and a real website. You do not need prior knowledge. Just follow the steps, choose a prompt, and watch the result.",
    supporting:
      "We will clarify the theory as you move through the trail.",
    cards: [
      {
        icon: "frames",
        title: "Frames for the video",
        tool: "Gemini",
        time: "~3 min",
      },
      { icon: "video", title: "A video", tool: "Grok", time: "~3 min" },
      { icon: "flyer", title: "A flyer", tool: "ChatGPT", time: "~3 min" },
      {
        icon: "slides",
        title: "A presentation",
        tool: "Gamma",
        time: "~3 min",
      },
      {
        icon: "site",
        title: "A complete website",
        tool: "Claude",
        time: "~3 min",
      },
    ],
    kickoffTitle: "Everything starts with practice",
    kickoffBody:
      "First you create the frames for the video, then you turn that into a spoken video, then you generate a flyer, then you watch a full presentation appear on screen, and you finish by seeing a real website show up. The goal here is for you to feel AI working in practice before the theory.",
    continueLabel: "Start with the video frames",
    continueHelper:
      "Before the video, let's create the key images that will define the mood of the scene.",
  },
  sections: {
    frames: {
      eyebrow: "Video preparation",
      title: "Create frames for your video",
      tool: "Tool: Gemini",
      description:
        "Before generating the video, let's create the key images first. The AI generates the frames and then you use them to assemble the video.",
      steps: [
        "Choose one of the prompts below.",
        "Paste it into the image generation field in Educly.",
        "Tap generate image and wait.",
        "Save the frames and use them in the next step.",
      ],
      promptHint:
        "A prompt is the command you give the AI. The clearer you are, the better the result will be.",
      loadingTitle: "Generating the frames",
      loadingLines: [
        "Reading expression, pose, framing, and visual style...",
        "Building the lighting, the character, and the mood of each frame...",
        "Finishing the key shots to reveal the frames on screen...",
      ],
      options: [
        {
          id: "A",
          name: "Happy woman",
          prompt:
            "Latina woman around 30 years old, long dark hair, modern casual clothes in light blue and white tones, wide smile, direct eye contact with the camera, clean white background, chest-up framing, soft lighting. Mobile app mascot style. High resolution, no text.",
          exercise: {
            title: "Complete the happy woman prompt",
            sentence:
              "Latina woman around 30 years old, long dark hair, modern casual clothes in light blue and white tones, wide smile, direct eye contact with the camera, [BLANK], [BLANK] framing, soft lighting. Mobile app mascot style. High resolution, no text.",
            answers: ["clean white background", "chest-up"],
            options: [
              "clean white background",
              "neon city background",
              "chest-up",
              "full body",
              "looking down",
              "without soft lighting",
            ],
            explanation:
              "Perfect. The full happy woman prompt is now unlocked.",
          },
          resultFrames: [{ label: "Generated frame", alt: "Happy woman frame" }],
          previewTitle: "Happy frame for a warm opening",
          previewDescription:
            "A key image with an open smile, positive energy, and a welcoming mood to start the video.",
          previewTags: ["Happy", "Frame", "Opening"],
        },
        {
          id: "B",
          name: "Sad woman",
          prompt:
            "Latina woman around 30 years old, long dark hair, modern casual clothes in light blue and white tones, sad and discouraged expression, eyes slightly lowered, clean white background, chest-up framing, soft lighting. Mobile app mascot style. High resolution, no text.",
          exercise: {
            title: "Complete the sad woman prompt",
            sentence:
              "Latina woman around 30 years old, long dark hair, modern casual clothes in light blue and white tones, sad and discouraged expression, [BLANK], [BLANK], chest-up framing, soft lighting. Mobile app mascot style. High resolution, no text.",
            answers: ["eyes slightly lowered", "clean white background"],
            options: [
              "eyes slightly lowered",
              "wide smile",
              "clean white background",
              "dark scene background",
              "defiant gaze",
              "blue neon light",
            ],
            explanation:
              "Nice. The full sad woman prompt is now unlocked.",
          },
          resultFrames: [{ label: "Generated frame", alt: "Sad woman frame" }],
          previewTitle: "Sad frame for more emotional scenes",
          previewDescription:
            "A more sensitive frame to create contrast, empathy, and a sense of growth throughout the video.",
          previewTags: ["Sad", "Emotion", "Contrast"],
        },
        {
          id: "C",
          name: "Serious woman",
          prompt:
            "Latina woman around 30 years old, long dark hair, modern casual clothes in light blue and white tones, serious and firm expression, direct eye contact with the camera without smiling, clean white background, chest-up framing, soft lighting. Mobile app mascot style. High resolution, no text.",
          exercise: {
            title: "Complete the serious woman prompt",
            sentence:
              "Latina woman around 30 years old, long dark hair, modern casual clothes in light blue and white tones, [BLANK] expression, [BLANK] [BLANK], clean white background, chest-up framing, soft lighting. Mobile app mascot style. High resolution, no text.",
            answers: [
              "serious and firm",
              "direct eye contact with the camera",
              "without smiling",
            ],
            options: [
              "serious and firm",
              "happy and relaxed",
              "direct eye contact with the camera",
              "looking at the floor",
              "without smiling",
              "with a big laugh",
            ],
            explanation:
              "Perfect. The firmer prompt is now unlocked.",
          },
          resultFrames: [
            { label: "Generated frame", alt: "Serious woman frame" },
          ],
          previewTitle: "Serious frame for a firm message",
          previewDescription:
            "A direct and confident frame for stronger messages, with presence and authority in the scene.",
          previewTags: ["Serious", "Firm", "Authority"],
        },
      ],
      resultTitle: "Your frames are ready",
      resultDescription:
        "Now you already have the character's key shots. In the next step, this turns into a video with voice, emotion, and more impact.",
      continueLabel: "Continue to the AI video",
      continueHelper:
        "Now let's turn this mood into a spoken video with AI.",
    },
    video: {
      eyebrow: "Creation 1",
      title: "Create a video with AI",
      tool: "Tool: Grok",
      description:
        "You describe the scene. The AI creates the video. Choose a prompt, tap generate, and wait.",
      steps: [
        "Choose one of the 3 prompts below.",
        "Paste it into the video generation field in Educly.",
        "Tap generate video and wait.",
        "Watch the result.",
      ],
      promptHint:
        "Think like a director: say what you want, how you want it, and what the mood of the scene should be.",
      loadingTitle: "Rendering the video",
      loadingLines: [
        "Interpreting the mood of the scene, the emotion, and the character's speech...",
        "Animating expression, voice, lips, and the character's presence...",
        "Finishing the render to reveal the lip-sync video...",
      ],
      options: [
        {
          id: "A",
          name: "Enthusiastic welcome",
          prompt: `A Latina woman in her mid 20s, with long dark hair, wearing modern casual clothes in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with a big welcoming smile, bright and lively eyes. She speaks in English, with an enthusiastic and happy tone: "Welcome. Joining Educly was one of the best decisions of your life. You chose education, and that changes everything." Realistic style, soft lighting, chest-up framing. No music. Natural lip sync.`,
          exercise: {
            title: "Complete the happy video prompt",
            sentence:
              'A Latina woman in her mid 20s, with long dark hair, wearing modern casual clothes in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with [BLANK]. She speaks in [BLANK], with an [BLANK] and happy tone: "Welcome. Joining Educly was one of the best decisions of your life. You chose education, and that changes everything." Realistic style, soft lighting, chest-up framing. No music. Natural lip sync.',
            answers: [
              "a big welcoming smile, bright and lively eyes",
              "English",
              "enthusiastic",
            ],
            options: [
              "a big welcoming smile, bright and lively eyes",
              "slightly teary eyes and a melancholic gaze",
              "English",
              "Spanish",
              "enthusiastic",
              "slow and sincere",
            ],
            explanation:
              "Right. The happy video prompt is now ready to use.",
          },
          resultVideos: [{ label: "Generated video", alt: "Happy woman video" }],
          previewTitle: "Welcome message with energy and enthusiasm",
          previewDescription:
            "A warm line, a wide smile, and a confident tone to open the video with positive impact.",
          previewTags: ["Happy", "Welcome", "Lip sync"],
        },
        {
          id: "B",
          name: "Emotional message",
          prompt: `A Latina woman in her mid 20s, with long dark hair, wearing modern casual clothes in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with a soft, emotional, and melancholic expression, slightly teary eyes, as if she were genuinely moved. She speaks in English, with a slow and sincere tone: "Joining Educly was not just any decision... but you chose education. And that... that is one of the most valuable things there is." Realistic style, soft lighting, chest-up framing. No music. Natural lip sync.`,
          exercise: {
            title: "Complete the emotional video prompt",
            sentence:
              'A Latina woman in her mid 20s, with long dark hair, wearing modern casual clothes in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with [BLANK]. She speaks in [BLANK], with a [BLANK] tone: "Joining Educly was not just any decision... but you chose education. And that... that is one of the most valuable things there is." Realistic style, soft lighting, chest-up framing. No music. Natural lip sync.',
            answers: [
              "a soft, emotional, and melancholic expression, slightly teary eyes, as if she were genuinely moved",
              "English",
              "slow and sincere",
            ],
            options: [
              "a soft, emotional, and melancholic expression, slightly teary eyes, as if she were genuinely moved",
              "a strong and determined expression",
              "English",
              "French",
              "slow and sincere",
              "strong and passionate",
            ],
            explanation:
              "Perfect. The emotional video prompt is now unlocked.",
          },
          resultVideos: [{ label: "Generated video", alt: "Sad woman video" }],
          previewTitle: "Emotional tone with pain and value in the choice",
          previewDescription:
            "A more sensitive character, with a voice full of emotion and a line that values the student's decision.",
          previewTags: ["Sad", "Emotion", "Lip sync"],
        },
        {
          id: "C",
          name: "Firm invitation",
          prompt: `A Latina woman in her mid 20s, with long dark hair, wearing modern casual clothes in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with a strong and determined expression, slightly furrowed brows, and a serious tone. She speaks in English, with a strong and passionate tone: "Welcome to Educly. You chose education, and that is no small thing. Now it is time to act, because people who study do not get left behind." Realistic style, soft lighting, chest-up framing. No music. Natural lip sync.`,
          exercise: {
            title: "Complete the firm video prompt",
            sentence:
              'A Latina woman in her mid 20s, with long dark hair, wearing modern casual clothes in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with [BLANK]. She speaks in [BLANK], with a [BLANK] tone: "Welcome to Educly. You chose education, and that is no small thing. Now it is time to act, because people who study do not get left behind." Realistic style, soft lighting, chest-up framing. No music. Natural lip sync.',
            answers: [
              "a strong and determined expression, slightly furrowed brows, and a serious tone",
              "English",
              "strong and passionate",
            ],
            options: [
              "a strong and determined expression, slightly furrowed brows, and a serious tone",
              "a soft and emotional expression with teary eyes",
              "English",
              "Spanish",
              "strong and passionate",
              "light and casual",
            ],
            explanation:
              "Nice. The firm video prompt is now unlocked for generation.",
          },
          resultVideos: [
            { label: "Generated video", alt: "Serious woman video" },
          ],
          previewTitle: "Firm invitation to take action",
          previewDescription:
            "A strong line, secure posture, and action energy to communicate urgency and attitude.",
          previewTags: ["Fierce", "Determination", "Lip sync"],
        },
      ],
      resultTitle: "Your video is ready",
      resultDescription:
        "The scene was built from the prompt you chose. Now notice how the character's emotion changes the impact of the video.",
      continueLabel: "Continue to the flyer",
      continueHelper:
        "Now you will turn the idea of the video into a ready-to-share visual.",
    },
    flyer: {
      eyebrow: "Creation 3",
      title: "Create a motivational flyer",
      tool: "Tool: ChatGPT",
      description:
        "AI can also create professional images. Here you will generate an Instagram-ready visual that looks like it was made by a designer.",
      steps: [
        "Choose one of the 3 prompts below.",
        "Paste the prompt into the indicated field in Educly.",
        "Tap generate image.",
        "See the result.",
      ],
      promptHint:
        "Each prompt creates a different kind of visual. Choose the one that fits you best.",
      loadingTitle: "Building the flyer",
      loadingLines: [
        "Reading composition, color palette, and creative style...",
        "Generating background, typography, and highlight elements...",
        "Finishing the artwork to display the flyer on screen...",
      ],
      options: [
        {
          id: "A",
          name: "Image option 1",
          previewTitle: "Discipline today. Results tomorrow.",
          previewDescription:
            "A strong, modern, dramatic visual to communicate focus and consistency.",
          previewTags: ["Motivation", "Contrast", "Instagram"],
        },
        {
          id: "B",
          name: "Image option 2",
          previewTitle: "You do not need to be perfect",
          previewDescription:
            "An inspiring, warm, cinematic look that communicates a fresh start and consistency.",
          previewTags: ["Inspiring", "Fresh start", "Instagram"],
        },
        {
          id: "C",
          name: "Image option 3",
          previewTitle: "Every day is a new chance to evolve",
          previewDescription:
            "A clean and elegant visual that communicates personal growth with a strong message.",
          previewTags: ["Clean", "Growth", "Instagram"],
        },
      ],
      resultTitle: "Your flyer is ready",
      resultDescription:
        "Even by changing only the prompt, the visual identity changes completely. That is how AI starts following creative direction.",
      continueLabel: "Continue to the presentation",
      continueHelper:
        "Now you will move beyond images and watch an entire presentation being structured in a few seconds.",
    },
    slides: {
      eyebrow: "Creation 2",
      title: "Create a slide presentation",
      tool: "Tool: Gamma",
      description:
        "No more spending hours in PowerPoint. AI builds a full presentation with design, copy, and structure in seconds.",
      steps: [
        "Choose one of the 3 prompts below.",
        "Paste it into the presentation generation field in Educly.",
        "Tap generate presentation and wait.",
        "Browse the finished slides.",
      ],
      promptHint:
        "Gamma takes care of design, copy, and layout. You do not need to tweak anything.",
      loadingTitle: "Building the slides",
      loadingLines: [
        "Organizing the storyline, narrative, and order of topics...",
        "Distributing titles, pages, and visual hierarchy...",
        "Applying layout, emphasis, and presentation rhythm...",
      ],
      options: [
        {
          id: "A",
          label: "Presentation option 1",
          name: "Premium presentation",
          prompt:
            "Create a high-level professional presentation about [topic], with a strategic focus and a premium visual style. Generate between 10 and 12 well-structured slides with: an impactful cover, problem context, analysis of the current situation, opportunities, solution proposal, action plan, clear benefits, differentiators, and conclusion. Use executive, clear, and persuasive language, avoiding unnecessarily technical terms. The design should be modern, elegant, and minimalist, with sober colors (black, white, neutral tones) and sophisticated typography. Include visual suggestions for each slide (charts, icons, diagrams) and keep the copy short and high impact.",
          exercise: {
            title: "Complete the premium presentation prompt",
            sentence:
              "Create a high-level professional presentation about [topic], with a [BLANK] focus. Generate between 10 and 12 well-structured slides with: an impactful cover, problem context, analysis of the current situation, opportunities, solution proposal, [BLANK], clear benefits, differentiators, and conclusion. The design should be modern, elegant, and minimalist, with [BLANK] and sophisticated typography.",
            answers: [
              "strategic and premium visual",
              "action plan",
              "sober colors (black, white, neutral tones)",
            ],
            options: [
              "strategic and premium visual",
              "casual and improvised",
              "action plan",
              "random jokes in the middle",
              "sober colors (black, white, neutral tones)",
              "saturated neon colors",
            ],
            explanation:
              "Perfect. The premium presentation prompt is now ready.",
          },
          previewTitle: "Executive deck with a premium visual style",
          previewDescription:
            "A strategic, elegant, and persuasive presentation for corporate or high-level topics.",
          previewTags: ["Executive", "Premium", "Strategy"],
        },
        {
          id: "B",
          label: "Presentation option 2",
          name: "Dynamic presentation",
          prompt:
            "Create a dynamic and engaging presentation about [topic], with a modern approach that is easy to connect with for the audience. Structure between 8 and 10 slides in storytelling format: attention-grabbing opening, problem context, everyday situations, discovery of a solution, how it works in practice, real benefits, and a conclusion with a call to action. Use approachable, clear, and easy-to-understand language, avoiding too much formality. The design should be visual, modern, and clean, with soft colors, strong visual hierarchy, and images that convey real situations. Include short copy, impact lines, and visual suggestions for each slide.",
          exercise: {
            title: "Complete the dynamic presentation prompt",
            sentence:
              "Create a dynamic and engaging presentation about [topic], with a [BLANK] approach. Structure between 8 and 10 slides in storytelling format: attention-grabbing opening, problem context, everyday situations, [BLANK], how it works in practice, real benefits, and a conclusion with a call to action. The design should be visual, modern, and clean, with [BLANK], strong visual hierarchy, and images that convey real situations.",
            answers: [
              "modern approach that is easy to connect with for the audience",
              "discovery of a solution",
              "soft colors",
            ],
            options: [
              "modern approach that is easy to connect with for the audience",
              "cold and distant tone",
              "discovery of a solution",
              "an ending with no direction",
              "soft colors",
              "heavy and aggressive tones",
            ],
            explanation:
              "Nice. The dynamic presentation prompt is now ready.",
          },
          previewTitle: "Visual storytelling with audience connection",
          previewDescription:
            "A modern, light structure connected to real situations to keep the audience engaged.",
          previewTags: ["Dynamic", "Storytelling", "Connection"],
        },
        {
          id: "C",
          label: "Presentation option 3",
          name: "Work productivity",
          prompt:
            "Create a professional presentation about productivity at work. Generate between 8 and 12 slides with the following structure: introduction, current situation, main challenges, practical solutions, benefits, and conclusion. Use clear, direct, and easy-to-understand language in a professional context. Include short titles, organized points, and visual suggestions for each slide.",
          exercise: {
            title: "Complete the productivity presentation prompt",
            sentence:
              "Create a professional presentation about [BLANK]. Generate between 8 and 12 slides with the following structure: introduction, current situation, main challenges, [BLANK], benefits, and conclusion. Use [BLANK] in a professional context.",
            answers: [
              "productivity at work",
              "practical solutions",
              "clear, direct, and easy-to-understand language",
            ],
            options: [
              "productivity at work",
              "luxury fashion",
              "practical solutions",
              "stories with no application",
              "clear, direct, and easy-to-understand language",
              "overly complex and confusing language",
            ],
            explanation:
              "Perfect. The productivity presentation prompt is now ready.",
          },
          previewTitle: "Professional and objective presentation",
          previewDescription:
            "A clear and practical deck about productivity, with a corporate structure and focus on application.",
          previewTags: ["Productivity", "Professional", "Clarity"],
        },
      ],
      resultTitle: "Your presentation is ready",
      resultDescription:
        "Here you can feel how AI can take care of structure, visual direction, and copy at the same time without depending on a blank file.",
      continueLabel: "Continue to the full website",
      continueHelper:
        "To close Day 1, you will ask for a whole site and watch a finished page appear from a single prompt.",
    },
    site: {
      eyebrow: "Creation 4",
      title: "Create a complete website",
      tool: "Tool: Claude",
      description:
        "A whole site with pages, buttons, design, and copy. All from a single request. It is not just an image: it is real code.",
      steps: [
        "Choose one of the 3 prompts below.",
        "Paste it into the site generation field in Educly.",
        "Tap generate site and wait.",
        "Browse the finished site.",
      ],
      promptHint:
        "Claude builds sites with HTML, CSS, and real code. That means the result already looks like something you can navigate.",
      loadingTitle: "Building the website",
      loadingLines: [
        "Interpreting structure, sections, and the main experience...",
        "Composing layout, visual style, and interactive elements...",
        "Closing HTML, CSS, and details to reveal the page...",
      ],
      options: [
        {
          id: "A",
          label: "Site option 1",
          name: "Luxury landing page",
          prompt:
            "Create a high-end landing page to sell a luxury apartment called Senda. Elegant visual style with dark, gold, and cream tones. It must include: an impactful hero with a large headline, a stats bar with the apartment details (142m2, 3 bedrooms, 3 parking spaces, 18th floor), a gallery of spaces, a features section, a contact form, and a location map. Custom gold cursor. Everything in a single HTML file.",
          exercise: {
            title: "Complete the Senda website prompt",
            sentence:
              "Create a high-end landing page to sell [BLANK]. Elegant visual style with [BLANK]. It must include: an impactful hero with a large headline, a stats bar with the apartment details (142m2, 3 bedrooms, 3 parking spaces, 18th floor), a gallery of spaces, a features section, a contact form, and a location map. Custom gold cursor. Everything in [BLANK].",
            answers: [
              "a luxury apartment called Senda",
              "dark, gold, and cream tones",
              "a single HTML file",
            ],
            options: [
              "a luxury apartment called Senda",
              "a fashion store called Forma",
              "dark, gold, and cream tones",
              "a neon-heavy visual style",
              "a single HTML file",
              "ten separate files",
            ],
            explanation:
              "Perfect. The premium Senda prompt is now ready to use.",
          },
          previewTitle: "Senda: premium look with an impactful hero",
          previewDescription:
            "A high-end project with a sophisticated atmosphere and details designed for conversion.",
          previewTags: ["Luxury", "Landing page", "Dark gold"],
        },
        {
          id: "B",
          label: "Site option 2",
          name: "Clean e-commerce",
          prompt:
            "Create a fashion e-commerce site called Forma. Clean, minimalist look with an almost white background. It must work for real: a product list with category filters, real-time search, an individual product page with size and color selection, a side cart that opens and closes, and a counter on the cart icon. Include at least 10 clothing products with prices. Everything in a single HTML file.",
          exercise: {
            title: "Complete the Forma e-commerce prompt",
            sentence:
              "Create a fashion e-commerce site called [BLANK]. Clean, [BLANK] visual style with an almost white background. It must work for real: a product list with category filters, real-time search, an individual product page with size and color selection, [BLANK], and a counter on the cart icon. Include at least 10 clothing products with prices. Everything in a single HTML file.",
            answers: [
              "Forma",
              "minimalist",
              "a side cart that opens and closes",
            ],
            options: [
              "Forma",
              "Raiz",
              "minimalist",
              "dark and baroque",
              "a side cart that opens and closes",
              "no cart at all",
            ],
            explanation:
              "Nice. The functional e-commerce prompt is ready to generate.",
          },
          previewTitle: "Forma: elegant and functional store",
          previewDescription:
            "Catalog, filters, search, and cart in a light layout that feels like a modern brand.",
          previewTags: ["E-commerce", "Minimalist", "Functional"],
        },
        {
          id: "C",
          label: "Site option 3",
          name: "Organic blog",
          prompt:
            "Create a nutrition and healthy eating blog called Raiz. Organic visual style with green, earth, and cream tones. It must include: a homepage with featured posts, recent article cards, a recipe of the week, categories, a newsletter section, and a footer. When someone clicks an article, it should open the full post with real nutrition content. Include at least 6 fully written articles about healthy eating. Everything in a single HTML file.",
          exercise: {
            title: "Complete the Raiz blog prompt",
            sentence:
              "Create a nutrition and healthy eating blog called [BLANK]. Organic visual style with tones [BLANK]. It must include: a homepage with featured posts, recent article cards, a recipe of the week, categories, a newsletter section, and a footer. When someone clicks an article, it should open the full post with real nutrition content. Include at least [BLANK] about healthy eating. Everything in a single HTML file.",
            answers: [
              "Raiz",
              "of green, earth, and cream",
              "6 fully written articles",
            ],
            options: [
              "Raiz",
              "Forma",
              "of green, earth, and cream",
              "metallic and cold",
              "6 fully written articles",
              "just one loose sentence",
            ],
            explanation:
              "Perfect. The organic blog prompt is now unlocked.",
          },
          previewTitle: "Raiz: editorial blog with real content",
          previewDescription:
            "A living page with an organic identity and a structure ready for reading, discovery, and newsletter growth.",
          previewTags: ["Blog", "Editorial", "Organic"],
        },
      ],
      resultTitle: "Your website is ready",
      resultDescription:
        "You asked for a full product and received a navigable interface. That is the kind of leap that makes AI feel absurd to someone seeing it for the first time.",
      continueLabel: "Go to the final Day 1 summary",
      continueHelper:
        "Now it is worth looking back and noticing what you created in just a few minutes.",
    },
  },
  summary: {
    eyebrow: "Wrap-up",
    title: "What you just created",
    description:
      "Frames for a video, a spoken video, a flyer, a slide presentation, and a complete website. All in a few minutes, with ready prompts and without needing to understand theory first.",
    items: [
      "Frames for the video",
      "A video",
      "A flyer",
      "A presentation",
      "A complete website",
    ],
    finalLine:
      "Now imagine what happens when you learn to create your own prompts from scratch.",
    nextDay:
      "Starting tomorrow, we will help you understand and learn each of these AI tools so you can do all of this on your own.",
    toolsEyebrow: "AI tools used today",
    toolsTitle: "The tools you just experienced",
    toolsDescription:
      "Over the next days, we will help you learn Gemini, Grok, ChatGPT, Gamma, and Claude so you can create all of this on your own, without relying on ready-made prompts.",
    tools: [
      { icon: "frames", name: "Gemini", focus: "Frames for the video" },
      { icon: "video", name: "Grok", focus: "Spoken video" },
      { icon: "flyer", name: "ChatGPT", focus: "Flyer" },
      { icon: "slides", name: "Gamma", focus: "Presentation" },
      { icon: "site", name: "Claude", focus: "Complete website" },
    ],
    continueLabel: "Finish Day 1",
    continueHelper:
      "Finish to open the normal end-of-Day-1 flow and record your feedback.",
  },
} as const;
