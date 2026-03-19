CREATE INDEX IF NOT EXISTS idx_chat_messages_user_assistant_context_created_at
ON public.chat_messages (user_id, ai_assistant_type, ai_tool_context, created_at);

UPDATE public.chat_messages
SET ai_tool_context = 'assistentes_hub'
WHERE ai_tool_context IS NULL
  AND ai_assistant_type IN ('chatgpt', 'gemini', 'claude', 'grok', 'nanobanana');
