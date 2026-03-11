-- Create challenge_day_translations table for multilingual day titles
CREATE TABLE IF NOT EXISTS challenge_day_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_day_id uuid NOT NULL REFERENCES challenge_days(id) ON DELETE CASCADE,
  language text NOT NULL,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(challenge_day_id, language)
);

ALTER TABLE challenge_day_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "challenge_day_translations_select"
  ON challenge_day_translations FOR SELECT USING (true);

-- =====================
-- English (en)
-- =====================
INSERT INTO challenge_day_translations (challenge_day_id, language, title, description) VALUES
('c6a53196-f5db-4659-8a06-ecf055e4b9f9', 'en', 'What is ChatGPT', 'Fundamentals and first steps with ChatGPT'),
('7ba3b16a-a1fb-464c-94cd-de8894dd6040', 'en', 'ChatGPT Customization', 'Techniques for creating effective prompts'),
('e1502f54-bbf4-45b8-842c-be2666b86df6', 'en', 'How to Know if the Response is Good?', 'How to use personas for specialized responses'),
('e566ade3-f2ca-4134-ae85-f3537e625fb7', 'en', 'Getting the Most Out of ChatGPT', 'Practical application: complete marketing campaign'),
('ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1', 'en', 'The History of Claude', 'Introduction to Claude and its unique capabilities'),
('e8b3843e-eacc-40d3-99bd-16d8781867bc', 'en', 'Mastering the Projects Feature', 'AIDA and PAS techniques for persuasive texts'),
('f417f5c3-33c9-426d-b8ae-e4acf4cdf642', 'en', 'The History of DeepSeek', 'Practical application: creating professional copy'),
('f8609d72-4e87-4b64-9424-b7a16c8440fa', 'en', 'Getting the Most Out of DeepSeek', 'Getting to know DeepSeek and data analysis'),
('9dbd536f-cf83-431f-8c5a-4f7fcc957ff3', 'en', 'The History of Gemini', 'Data analysis and SQL queries with AI'),
('676ed71a-7f88-495a-a09c-9f04c94bb9e1', 'en', 'Mastering File Upload and Context', 'Practical application: business data analysis'),
('b5243402-6874-4948-96c7-e03976d8aa22', 'en', 'The History of Copilot', 'Getting to know Google Gemini'),
('23ddffa8-6992-4afc-9704-473ebf7e5bde', 'en', 'The Art of Prompting - From Basic to Advanced', 'Integrations with Google Workspace'),
('490b6622-ba5e-4f18-beb8-c12f46ab59cd', 'en', 'The History of Grok', 'Practical application: workflow automation'),
('33bca1f8-ca8e-4a79-86a4-a5f88c7a083d', 'en', 'Quick Grok Review', 'Fundamentals of AI image generation'),
('8ed220b2-5603-4ed7-9fce-b53cd361e74c', 'en', 'The History of Perplexity', 'Exploring different visual styles'),
('2aa47580-d3b7-49dc-a36a-442b2c265ab5', 'en', 'The Art of Prompting in Perplexity - From Basic to Advanced', 'Advanced visual composition techniques'),
('927719a9-7473-4853-bb03-6854f4d8b3e1', 'en', 'The History of Manus', 'Practical application: complete visual campaign'),
('f05afd89-0de1-4e38-b7a5-86c5163979e4', 'en', 'The Art of Prompting in Manus - From Basic to Advanced', 'Creating web applications with AI'),
('c0936215-f5ef-4746-a116-6704c7485f7a', 'en', 'The History of Lovable', 'Creating consistent design systems'),
('52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4', 'en', 'How the Correct Workflow Works', 'Complex integrations and features'),
('e2fd9f11-7e72-47fb-8de3-c181cd7e557c', 'en', 'The History of NanoBanana', 'Practical application: functional web app'),
('a78378eb-5fef-46b5-bb27-c4c8c5929091', 'en', 'The History of LeonardoAI', 'Introduction to Captions for video editing'),
('0f9c2367-4dee-496d-a706-b878c57b3504', 'en', 'The History of MidJourney', 'Editing techniques and automatic captions'),
('66f23261-4215-4131-b1b5-d51303792e83', 'en', 'The History of Captions', 'Practical application: complete professional video'),
('20c07f69-c0a3-424d-977f-a778ee71f36e', 'en', 'The History of ElevenLabs', 'Voice cloning and synthesis with AI'),
('2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6', 'en', 'The History of VEO', 'Advanced vocal expressiveness techniques'),
('4cdc62e5-1f39-47ad-9a51-19664ac08620', 'en', 'Day 1 (General Review)', 'Practical application: audiobook or podcast'),
('c038e903-6a34-4983-9862-adfbc331716a', 'en', 'Day 2 (Final Review)', 'Final project: integrating all tools');

-- =====================
-- Spanish (es)
-- =====================
INSERT INTO challenge_day_translations (challenge_day_id, language, title, description) VALUES
('c6a53196-f5db-4659-8a06-ecf055e4b9f9', 'es', '¿Qué es ChatGPT?', 'Fundamentos y primeros pasos con ChatGPT'),
('7ba3b16a-a1fb-464c-94cd-de8894dd6040', 'es', 'Personalización de ChatGPT', 'Técnicas para crear prompts eficaces'),
('e1502f54-bbf4-45b8-842c-be2666b86df6', 'es', '¿Cómo saber si la respuesta es buena?', 'Cómo usar personas para respuestas especializadas'),
('e566ade3-f2ca-4134-ae85-f3537e625fb7', 'es', 'Extrayendo el máximo de ChatGPT', 'Aplicación práctica: campaña de marketing completa'),
('ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1', 'es', 'La historia de Claude', 'Introducción a Claude y sus capacidades únicas'),
('e8b3843e-eacc-40d3-99bd-16d8781867bc', 'es', 'Dominando la funcionalidad Projects', 'Técnicas AIDA y PAS para textos persuasivos'),
('f417f5c3-33c9-426d-b8ae-e4acf4cdf642', 'es', 'La historia de DeepSeek', 'Aplicación práctica: creando copy profesional'),
('f8609d72-4e87-4b64-9424-b7a16c8440fa', 'es', 'Cómo extraer el máximo de DeepSeek', 'Conociendo DeepSeek y análisis de datos'),
('9dbd536f-cf83-431f-8c5a-4f7fcc957ff3', 'es', 'La historia de Gemini', 'Análisis de datos y consultas SQL con IA'),
('676ed71a-7f88-495a-a09c-9f04c94bb9e1', 'es', 'Dominando la subida de archivos y contexto', 'Aplicación práctica: análisis de datos empresariales'),
('b5243402-6874-4948-96c7-e03976d8aa22', 'es', 'La historia de Copilot', 'Conociendo Gemini de Google'),
('23ddffa8-6992-4afc-9704-473ebf7e5bde', 'es', 'El arte del prompt - de básico a avanzado', 'Integraciones con Google Workspace'),
('490b6622-ba5e-4f18-beb8-c12f46ab59cd', 'es', 'La historia de Grok', 'Aplicación práctica: automatización de flujos de trabajo'),
('33bca1f8-ca8e-4a79-86a4-a5f88c7a083d', 'es', 'Revisión rápida de Grok', 'Fundamentos de generación de imágenes con IA'),
('8ed220b2-5603-4ed7-9fce-b53cd361e74c', 'es', 'La historia de Perplexity', 'Explorando diferentes estilos visuales'),
('2aa47580-d3b7-49dc-a36a-442b2c265ab5', 'es', 'El arte del prompt en Perplexity - de básico a avanzado', 'Técnicas avanzadas de composición visual'),
('927719a9-7473-4853-bb03-6854f4d8b3e1', 'es', 'La historia de Manus', 'Aplicación práctica: campaña visual completa'),
('f05afd89-0de1-4e38-b7a5-86c5163979e4', 'es', 'El arte del prompt en Manus - de básico a avanzado', 'Creando aplicaciones web con IA'),
('c0936215-f5ef-4746-a116-6704c7485f7a', 'es', 'La historia de Lovable', 'Creando sistemas de diseño consistentes'),
('52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4', 'es', 'Cómo funciona el flujo correcto', 'Integraciones y funcionalidades complejas'),
('e2fd9f11-7e72-47fb-8de3-c181cd7e557c', 'es', 'La historia de NanoBanana', 'Aplicación práctica: app web funcional'),
('a78378eb-5fef-46b5-bb27-c4c8c5929091', 'es', 'La historia de LeonardoAI', 'Introducción a Captions para edición de vídeo'),
('0f9c2367-4dee-496d-a706-b878c57b3504', 'es', 'La historia de MidJourney', 'Técnicas de edición y subtítulos automáticos'),
('66f23261-4215-4131-b1b5-d51303792e83', 'es', 'La historia de Captions', 'Aplicación práctica: vídeo profesional completo'),
('20c07f69-c0a3-424d-977f-a778ee71f36e', 'es', 'La historia de ElevenLabs', 'Clonación y síntesis de voz con IA'),
('2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6', 'es', 'La historia de VEO', 'Técnicas avanzadas de expresividad vocal'),
('4cdc62e5-1f39-47ad-9a51-19664ac08620', 'es', 'Día 1 (Revisión General)', 'Aplicación práctica: audiolibro o podcast'),
('c038e903-6a34-4983-9862-adfbc331716a', 'es', 'Día 2 (Revisión Final)', 'Proyecto final: integrando todas las herramientas');

-- =====================
-- French (fr)
-- =====================
INSERT INTO challenge_day_translations (challenge_day_id, language, title, description) VALUES
('c6a53196-f5db-4659-8a06-ecf055e4b9f9', 'fr', 'Qu''est-ce que ChatGPT ?', 'Fondamentaux et premiers pas avec ChatGPT'),
('7ba3b16a-a1fb-464c-94cd-de8894dd6040', 'fr', 'Personnalisation de ChatGPT', 'Techniques pour créer des prompts efficaces'),
('e1502f54-bbf4-45b8-842c-be2666b86df6', 'fr', 'Comment savoir si la réponse est bonne ?', 'Comment utiliser des personas pour des réponses spécialisées'),
('e566ade3-f2ca-4134-ae85-f3537e625fb7', 'fr', 'Tirer le meilleur de ChatGPT', 'Application pratique : campagne marketing complète'),
('ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1', 'fr', 'L''histoire de Claude', 'Introduction à Claude et ses capacités uniques'),
('e8b3843e-eacc-40d3-99bd-16d8781867bc', 'fr', 'Maîtriser la fonctionnalité Projects', 'Techniques AIDA et PAS pour les textes persuasifs'),
('f417f5c3-33c9-426d-b8ae-e4acf4cdf642', 'fr', 'L''histoire de DeepSeek', 'Application pratique : création de copy professionnel'),
('f8609d72-4e87-4b64-9424-b7a16c8440fa', 'fr', 'Tirer le meilleur de DeepSeek', 'Découverte de DeepSeek et analyse de données'),
('9dbd536f-cf83-431f-8c5a-4f7fcc957ff3', 'fr', 'L''histoire de Gemini', 'Analyse de données et requêtes SQL avec l''IA'),
('676ed71a-7f88-495a-a09c-9f04c94bb9e1', 'fr', 'Maîtriser le téléchargement de fichiers et le contexte', 'Application pratique : analyse de données d''entreprise'),
('b5243402-6874-4948-96c7-e03976d8aa22', 'fr', 'L''histoire de Copilot', 'Découverte de Gemini de Google'),
('23ddffa8-6992-4afc-9704-473ebf7e5bde', 'fr', 'L''art du prompt - du basique à l''avancé', 'Intégrations avec Google Workspace'),
('490b6622-ba5e-4f18-beb8-c12f46ab59cd', 'fr', 'L''histoire de Grok', 'Application pratique : automatisation des flux de travail'),
('33bca1f8-ca8e-4a79-86a4-a5f88c7a083d', 'fr', 'Révision rapide de Grok', 'Fondamentaux de génération d''images par IA'),
('8ed220b2-5603-4ed7-9fce-b53cd361e74c', 'fr', 'L''histoire de Perplexity', 'Exploration de différents styles visuels'),
('2aa47580-d3b7-49dc-a36a-442b2c265ab5', 'fr', 'L''art du prompt dans Perplexity - du basique à l''avancé', 'Techniques avancées de composition visuelle'),
('927719a9-7473-4853-bb03-6854f4d8b3e1', 'fr', 'L''histoire de Manus', 'Application pratique : campagne visuelle complète'),
('f05afd89-0de1-4e38-b7a5-86c5163979e4', 'fr', 'L''art du prompt dans Manus - du basique à l''avancé', 'Création d''applications web avec l''IA'),
('c0936215-f5ef-4746-a116-6704c7485f7a', 'fr', 'L''histoire de Lovable', 'Création de systèmes de design cohérents'),
('52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4', 'fr', 'Comment fonctionne le bon flux de travail', 'Intégrations et fonctionnalités complexes'),
('e2fd9f11-7e72-47fb-8de3-c181cd7e557c', 'fr', 'L''histoire de NanoBanana', 'Application pratique : application web fonctionnelle'),
('a78378eb-5fef-46b5-bb27-c4c8c5929091', 'fr', 'L''histoire de LeonardoAI', 'Introduction à Captions pour l''édition vidéo'),
('0f9c2367-4dee-496d-a706-b878c57b3504', 'fr', 'L''histoire de MidJourney', 'Techniques d''édition et sous-titres automatiques'),
('66f23261-4215-4131-b1b5-d51303792e83', 'fr', 'L''histoire de Captions', 'Application pratique : vidéo professionnelle complète'),
('20c07f69-c0a3-424d-977f-a778ee71f36e', 'fr', 'L''histoire de ElevenLabs', 'Clonage et synthèse vocale avec l''IA'),
('2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6', 'fr', 'L''histoire de VEO', 'Techniques avancées d''expressivité vocale'),
('4cdc62e5-1f39-47ad-9a51-19664ac08620', 'fr', 'Jour 1 (Révision Générale)', 'Application pratique : livre audio ou podcast'),
('c038e903-6a34-4983-9862-adfbc331716a', 'fr', 'Jour 2 (Révision Finale)', 'Projet final : intégration de tous les outils');

-- =====================
-- German (de)
-- =====================
INSERT INTO challenge_day_translations (challenge_day_id, language, title, description) VALUES
('c6a53196-f5db-4659-8a06-ecf055e4b9f9', 'de', 'Was ist ChatGPT?', 'Grundlagen und erste Schritte mit ChatGPT'),
('7ba3b16a-a1fb-464c-94cd-de8894dd6040', 'de', 'ChatGPT-Personalisierung', 'Techniken zur Erstellung effektiver Prompts'),
('e1502f54-bbf4-45b8-842c-be2666b86df6', 'de', 'Wie erkenne ich eine gute Antwort?', 'Verwendung von Personas für spezialisierte Antworten'),
('e566ade3-f2ca-4134-ae85-f3537e625fb7', 'de', 'Das Maximum aus ChatGPT herausholen', 'Praktische Anwendung: vollständige Marketingkampagne'),
('ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1', 'de', 'Die Geschichte von Claude', 'Einführung in Claude und seine einzigartigen Fähigkeiten'),
('e8b3843e-eacc-40d3-99bd-16d8781867bc', 'de', 'Die Projects-Funktion meistern', 'AIDA- und PAS-Techniken für überzeugende Texte'),
('f417f5c3-33c9-426d-b8ae-e4acf4cdf642', 'de', 'Die Geschichte von DeepSeek', 'Praktische Anwendung: professionellen Copy erstellen'),
('f8609d72-4e87-4b64-9424-b7a16c8440fa', 'de', 'Das Maximum aus DeepSeek herausholen', 'DeepSeek kennenlernen und Datenanalyse'),
('9dbd536f-cf83-431f-8c5a-4f7fcc957ff3', 'de', 'Die Geschichte von Gemini', 'Datenanalyse und SQL-Abfragen mit KI'),
('676ed71a-7f88-495a-a09c-9f04c94bb9e1', 'de', 'Datei-Upload und Kontext meistern', 'Praktische Anwendung: Unternehmensdatenanalyse'),
('b5243402-6874-4948-96c7-e03976d8aa22', 'de', 'Die Geschichte von Copilot', 'Gemini von Google kennenlernen'),
('23ddffa8-6992-4afc-9704-473ebf7e5bde', 'de', 'Die Kunst des Promptings - von Grundlagen bis Fortgeschritten', 'Integrationen mit Google Workspace'),
('490b6622-ba5e-4f18-beb8-c12f46ab59cd', 'de', 'Die Geschichte von Grok', 'Praktische Anwendung: Workflow-Automatisierung'),
('33bca1f8-ca8e-4a79-86a4-a5f88c7a083d', 'de', 'Schnelle Grok-Überprüfung', 'Grundlagen der KI-Bildgenerierung'),
('8ed220b2-5603-4ed7-9fce-b53cd361e74c', 'de', 'Die Geschichte von Perplexity', 'Verschiedene visuelle Stile erkunden'),
('2aa47580-d3b7-49dc-a36a-442b2c265ab5', 'de', 'Die Kunst des Promptings in Perplexity - von Grundlagen bis Fortgeschritten', 'Fortgeschrittene Techniken der visuellen Komposition'),
('927719a9-7473-4853-bb03-6854f4d8b3e1', 'de', 'Die Geschichte von Manus', 'Praktische Anwendung: vollständige Bildkampagne'),
('f05afd89-0de1-4e38-b7a5-86c5163979e4', 'de', 'Die Kunst des Promptings in Manus - von Grundlagen bis Fortgeschritten', 'Web-Anwendungen mit KI erstellen'),
('c0936215-f5ef-4746-a116-6704c7485f7a', 'de', 'Die Geschichte von Lovable', 'Konsistente Design-Systeme erstellen'),
('52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4', 'de', 'Wie der richtige Workflow funktioniert', 'Komplexe Integrationen und Funktionen'),
('e2fd9f11-7e72-47fb-8de3-c181cd7e557c', 'de', 'Die Geschichte von NanoBanana', 'Praktische Anwendung: funktionale Web-App'),
('a78378eb-5fef-46b5-bb27-c4c8c5929091', 'de', 'Die Geschichte von LeonardoAI', 'Einführung in Captions für Videobearbeitung'),
('0f9c2367-4dee-496d-a706-b878c57b3504', 'de', 'Die Geschichte von MidJourney', 'Bearbeitungstechniken und automatische Untertitel'),
('66f23261-4215-4131-b1b5-d51303792e83', 'de', 'Die Geschichte von Captions', 'Praktische Anwendung: vollständiges professionelles Video'),
('20c07f69-c0a3-424d-977f-a778ee71f36e', 'de', 'Die Geschichte von ElevenLabs', 'Stimmklonierung und -synthese mit KI'),
('2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6', 'de', 'Die Geschichte von VEO', 'Fortgeschrittene Techniken der vokalen Ausdrucksstärke'),
('4cdc62e5-1f39-47ad-9a51-19664ac08620', 'de', 'Tag 1 (Allgemeine Überprüfung)', 'Praktische Anwendung: Hörbuch oder Podcast'),
('c038e903-6a34-4983-9862-adfbc331716a', 'de', 'Tag 2 (Abschlussüberprüfung)', 'Abschlussprojekt: alle Werkzeuge integrieren');

-- =====================
-- Russian (ru)
-- =====================
INSERT INTO challenge_day_translations (challenge_day_id, language, title, description) VALUES
('c6a53196-f5db-4659-8a06-ecf055e4b9f9', 'ru', 'Что такое ChatGPT', 'Основы и первые шаги с ChatGPT'),
('7ba3b16a-a1fb-464c-94cd-de8894dd6040', 'ru', 'Настройка ChatGPT', 'Техники создания эффективных промптов'),
('e1502f54-bbf4-45b8-842c-be2666b86df6', 'ru', 'Как понять, хорош ли ответ?', 'Как использовать персоны для специализированных ответов'),
('e566ade3-f2ca-4134-ae85-f3537e625fb7', 'ru', 'Как получить максимум от ChatGPT', 'Практическое применение: полная маркетинговая кампания'),
('ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1', 'ru', 'История Claude', 'Введение в Claude и его уникальные возможности'),
('e8b3843e-eacc-40d3-99bd-16d8781867bc', 'ru', 'Освоение функции Projects', 'Техники AIDA и PAS для убедительных текстов'),
('f417f5c3-33c9-426d-b8ae-e4acf4cdf642', 'ru', 'История DeepSeek', 'Практическое применение: создание профессионального копирайтинга'),
('f8609d72-4e87-4b64-9424-b7a16c8440fa', 'ru', 'Как получить максимум от DeepSeek', 'Знакомство с DeepSeek и анализ данных'),
('9dbd536f-cf83-431f-8c5a-4f7fcc957ff3', 'ru', 'История Gemini', 'Анализ данных и SQL-запросы с ИИ'),
('676ed71a-7f88-495a-a09c-9f04c94bb9e1', 'ru', 'Освоение загрузки файлов и контекста', 'Практическое применение: анализ бизнес-данных'),
('b5243402-6874-4948-96c7-e03976d8aa22', 'ru', 'История Copilot', 'Знакомство с Gemini от Google'),
('23ddffa8-6992-4afc-9704-473ebf7e5bde', 'ru', 'Искусство промпта — от основ до продвинутого', 'Интеграции с Google Workspace'),
('490b6622-ba5e-4f18-beb8-c12f46ab59cd', 'ru', 'История Grok', 'Практическое применение: автоматизация рабочих процессов'),
('33bca1f8-ca8e-4a79-86a4-a5f88c7a083d', 'ru', 'Быстрый обзор Grok', 'Основы генерации изображений с ИИ'),
('8ed220b2-5603-4ed7-9fce-b53cd361e74c', 'ru', 'История Perplexity', 'Изучение различных визуальных стилей'),
('2aa47580-d3b7-49dc-a36a-442b2c265ab5', 'ru', 'Искусство промпта в Perplexity — от основ до продвинутого', 'Продвинутые техники визуальной композиции'),
('927719a9-7473-4853-bb03-6854f4d8b3e1', 'ru', 'История Manus', 'Практическое применение: полная визуальная кампания'),
('f05afd89-0de1-4e38-b7a5-86c5163979e4', 'ru', 'Искусство промпта в Manus — от основ до продвинутого', 'Создание веб-приложений с ИИ'),
('c0936215-f5ef-4746-a116-6704c7485f7a', 'ru', 'История Lovable', 'Создание согласованных дизайн-систем'),
('52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4', 'ru', 'Как работает правильный рабочий процесс', 'Сложные интеграции и функциональность'),
('e2fd9f11-7e72-47fb-8de3-c181cd7e557c', 'ru', 'История NanoBanana', 'Практическое применение: функциональное веб-приложение'),
('a78378eb-5fef-46b5-bb27-c4c8c5929091', 'ru', 'История LeonardoAI', 'Введение в Captions для редактирования видео'),
('0f9c2367-4dee-496d-a706-b878c57b3504', 'ru', 'История MidJourney', 'Техники редактирования и автоматические субтитры'),
('66f23261-4215-4131-b1b5-d51303792e83', 'ru', 'История Captions', 'Практическое применение: полное профессиональное видео'),
('20c07f69-c0a3-424d-977f-a778ee71f36e', 'ru', 'История ElevenLabs', 'Клонирование и синтез голоса с ИИ'),
('2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6', 'ru', 'История VEO', 'Продвинутые техники вокальной выразительности'),
('4cdc62e5-1f39-47ad-9a51-19664ac08620', 'ru', 'День 1 (Общий обзор)', 'Практическое применение: аудиокнига или подкаст'),
('c038e903-6a34-4983-9862-adfbc331716a', 'ru', 'День 2 (Финальный обзор)', 'Итоговый проект: интеграция всех инструментов');

-- =====================
-- Italian (it)
-- =====================
INSERT INTO challenge_day_translations (challenge_day_id, language, title, description) VALUES
('c6a53196-f5db-4659-8a06-ecf055e4b9f9', 'it', 'Cos''è ChatGPT', 'Fondamentali e primi passi con ChatGPT'),
('7ba3b16a-a1fb-464c-94cd-de8894dd6040', 'it', 'Personalizzazione di ChatGPT', 'Tecniche per creare prompt efficaci'),
('e1502f54-bbf4-45b8-842c-be2666b86df6', 'it', 'Come capire se la risposta è buona?', 'Come usare le persona per risposte specializzate'),
('e566ade3-f2ca-4134-ae85-f3537e625fb7', 'it', 'Ottenere il massimo da ChatGPT', 'Applicazione pratica: campagna di marketing completa'),
('ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1', 'it', 'La storia di Claude', 'Introduzione a Claude e le sue capacità uniche'),
('e8b3843e-eacc-40d3-99bd-16d8781867bc', 'it', 'Padroneggiare la funzione Projects', 'Tecniche AIDA e PAS per testi persuasivi'),
('f417f5c3-33c9-426d-b8ae-e4acf4cdf642', 'it', 'La storia di DeepSeek', 'Applicazione pratica: creazione di copy professionale'),
('f8609d72-4e87-4b64-9424-b7a16c8440fa', 'it', 'Ottenere il massimo da DeepSeek', 'Scoprire DeepSeek e l''analisi dei dati'),
('9dbd536f-cf83-431f-8c5a-4f7fcc957ff3', 'it', 'La storia di Gemini', 'Analisi dei dati e query SQL con l''IA'),
('676ed71a-7f88-495a-a09c-9f04c94bb9e1', 'it', 'Padroneggiare il caricamento di file e il contesto', 'Applicazione pratica: analisi dei dati aziendali'),
('b5243402-6874-4948-96c7-e03976d8aa22', 'it', 'La storia di Copilot', 'Scoprire Gemini di Google'),
('23ddffa8-6992-4afc-9704-473ebf7e5bde', 'it', 'L''arte del prompting - dal base all''avanzato', 'Integrazioni con Google Workspace'),
('490b6622-ba5e-4f18-beb8-c12f46ab59cd', 'it', 'La storia di Grok', 'Applicazione pratica: automazione dei flussi di lavoro'),
('33bca1f8-ca8e-4a79-86a4-a5f88c7a083d', 'it', 'Revisione rapida di Grok', 'Fondamentali della generazione di immagini con IA'),
('8ed220b2-5603-4ed7-9fce-b53cd361e74c', 'it', 'La storia di Perplexity', 'Esplorare diversi stili visivi'),
('2aa47580-d3b7-49dc-a36a-442b2c265ab5', 'it', 'L''arte del prompting in Perplexity - dal base all''avanzato', 'Tecniche avanzate di composizione visiva'),
('927719a9-7473-4853-bb03-6854f4d8b3e1', 'it', 'La storia di Manus', 'Applicazione pratica: campagna visiva completa'),
('f05afd89-0de1-4e38-b7a5-86c5163979e4', 'it', 'L''arte del prompting in Manus - dal base all''avanzato', 'Creare applicazioni web con l''IA'),
('c0936215-f5ef-4746-a116-6704c7485f7a', 'it', 'La storia di Lovable', 'Creare sistemi di design coerenti'),
('52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4', 'it', 'Come funziona il flusso di lavoro corretto', 'Integrazioni e funzionalità complesse'),
('e2fd9f11-7e72-47fb-8de3-c181cd7e557c', 'it', 'La storia di NanoBanana', 'Applicazione pratica: app web funzionale'),
('a78378eb-5fef-46b5-bb27-c4c8c5929091', 'it', 'La storia di LeonardoAI', 'Introduzione a Captions per il montaggio video'),
('0f9c2367-4dee-496d-a706-b878c57b3504', 'it', 'La storia di MidJourney', 'Tecniche di montaggio e sottotitoli automatici'),
('66f23261-4215-4131-b1b5-d51303792e83', 'it', 'La storia di Captions', 'Applicazione pratica: video professionale completo'),
('20c07f69-c0a3-424d-977f-a778ee71f36e', 'it', 'La storia di ElevenLabs', 'Clonazione e sintesi vocale con l''IA'),
('2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6', 'it', 'La storia di VEO', 'Tecniche avanzate di espressività vocale'),
('4cdc62e5-1f39-47ad-9a51-19664ac08620', 'it', 'Giorno 1 (Revisione Generale)', 'Applicazione pratica: audiolibro o podcast'),
('c038e903-6a34-4983-9862-adfbc331716a', 'it', 'Giorno 2 (Revisione Finale)', 'Progetto finale: integrare tutti gli strumenti');
