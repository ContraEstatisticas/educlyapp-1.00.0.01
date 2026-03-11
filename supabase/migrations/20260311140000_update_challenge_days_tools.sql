-- Insert new AI tools (ON CONFLICT DO NOTHING to avoid duplicates if re-run)
INSERT INTO ai_tools (name, slug, description, icon_name, color_gradient, category) VALUES
('Copilot', 'copilot', 'Assistente de IA da Microsoft integrado ao ecossistema Office 365', 'Bot', 'from-blue-500 to-blue-700', 'conversacional'),
('Grok', 'grok', 'IA da xAI com acesso em tempo real ao X/Twitter e raciocínio avançado', 'Zap', 'from-gray-700 to-gray-900', 'conversacional'),
('Perplexity', 'perplexity', 'Motor de busca com IA que responde com fontes verificadas', 'Search', 'from-teal-500 to-cyan-600', 'busca'),
('Manus', 'manus', 'Agente de IA autônomo para tarefas complexas na web', 'Globe', 'from-orange-500 to-red-500', 'conversacional'),
('LeonardoAI', 'leonardo', 'Plataforma de geração de imagens com IA focada em design criativo', 'Palette', 'from-violet-600 to-purple-700', 'imagem'),
('MidJourney', 'midjourney', 'Gerador de imagens artísticas de alta qualidade via IA', 'Image', 'from-slate-700 to-slate-900', 'imagem'),
('VEO', 'veo', 'Gerador de vídeos com IA do Google DeepMind', 'Video', 'from-red-500 to-red-700', 'video')
ON CONFLICT (slug) DO NOTHING;

-- Update challenge_days ai_tool_id based on new day-to-tool mapping
-- Challenge: iniciante-ia
DO $$
DECLARE
  v_challenge_id uuid;
  v_chatgpt_id   uuid;
  v_claude_id    uuid;
  v_deepseek_id  uuid;
  v_gemini_id    uuid;
  v_copilot_id   uuid;
  v_grok_id      uuid;
  v_perplexity_id uuid;
  v_manus_id     uuid;
  v_lovable_id   uuid;
  v_nanobanana_id uuid;
  v_leonardo_id  uuid;
  v_midjourney_id uuid;
  v_captions_id  uuid;
  v_elevenlabs_id uuid;
  v_veo_id       uuid;
BEGIN
  SELECT id INTO v_challenge_id  FROM challenges WHERE slug = 'iniciante-ia';
  SELECT id INTO v_chatgpt_id    FROM ai_tools WHERE slug = 'chatgpt';
  SELECT id INTO v_claude_id     FROM ai_tools WHERE slug = 'claude';
  SELECT id INTO v_deepseek_id   FROM ai_tools WHERE slug = 'deepseek';
  SELECT id INTO v_gemini_id     FROM ai_tools WHERE slug = 'gemini';
  SELECT id INTO v_copilot_id    FROM ai_tools WHERE slug = 'copilot';
  SELECT id INTO v_grok_id       FROM ai_tools WHERE slug = 'grok';
  SELECT id INTO v_perplexity_id FROM ai_tools WHERE slug = 'perplexity';
  SELECT id INTO v_manus_id      FROM ai_tools WHERE slug = 'manus';
  SELECT id INTO v_lovable_id    FROM ai_tools WHERE slug = 'lovable';
  SELECT id INTO v_nanobanana_id FROM ai_tools WHERE slug = 'nanobanana';
  SELECT id INTO v_leonardo_id   FROM ai_tools WHERE slug = 'leonardo';
  SELECT id INTO v_midjourney_id FROM ai_tools WHERE slug = 'midjourney';
  SELECT id INTO v_captions_id   FROM ai_tools WHERE slug = 'captions';
  SELECT id INTO v_elevenlabs_id FROM ai_tools WHERE slug = 'elevenlabs';
  SELECT id INTO v_veo_id        FROM ai_tools WHERE slug = 'veo';

  -- Dias 1-4: ChatGPT
  UPDATE challenge_days SET ai_tool_id = v_chatgpt_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 1 AND 4;

  -- Dias 5-6: Claude
  UPDATE challenge_days SET ai_tool_id = v_claude_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 5 AND 6;

  -- Dias 7-8: DeepSeek
  UPDATE challenge_days SET ai_tool_id = v_deepseek_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 7 AND 8;

  -- Dias 9-10: Gemini
  UPDATE challenge_days SET ai_tool_id = v_gemini_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 9 AND 10;

  -- Dias 11-12: Copilot
  UPDATE challenge_days SET ai_tool_id = v_copilot_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 11 AND 12;

  -- Dias 13-14: Grok
  UPDATE challenge_days SET ai_tool_id = v_grok_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 13 AND 14;

  -- Dias 15-16: Perplexity
  UPDATE challenge_days SET ai_tool_id = v_perplexity_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 15 AND 16;

  -- Dias 17-18: Manus
  UPDATE challenge_days SET ai_tool_id = v_manus_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 17 AND 18;

  -- Dias 19-20: Lovable
  UPDATE challenge_days SET ai_tool_id = v_lovable_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 19 AND 20;

  -- Dia 21: NanoBanana
  UPDATE challenge_days SET ai_tool_id = v_nanobanana_id
    WHERE challenge_id = v_challenge_id AND day_number = 21;

  -- Dia 22: LeonardoAI
  UPDATE challenge_days SET ai_tool_id = v_leonardo_id
    WHERE challenge_id = v_challenge_id AND day_number = 22;

  -- Dia 23: MidJourney
  UPDATE challenge_days SET ai_tool_id = v_midjourney_id
    WHERE challenge_id = v_challenge_id AND day_number = 23;

  -- Dia 24: Captions
  UPDATE challenge_days SET ai_tool_id = v_captions_id
    WHERE challenge_id = v_challenge_id AND day_number = 24;

  -- Dia 25: ElevenLabs
  UPDATE challenge_days SET ai_tool_id = v_elevenlabs_id
    WHERE challenge_id = v_challenge_id AND day_number = 25;

  -- Dia 26: VEO
  UPDATE challenge_days SET ai_tool_id = v_veo_id
    WHERE challenge_id = v_challenge_id AND day_number = 26;

  -- Dias 27-28: Revisões (mantidos com VEO como referência)
  UPDATE challenge_days SET ai_tool_id = v_veo_id
    WHERE challenge_id = v_challenge_id AND day_number BETWEEN 27 AND 28;

END $$;
