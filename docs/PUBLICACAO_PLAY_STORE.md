# Guia Completo: Publicação do PWA Educly na Google Play Store

## 📋 Pré-requisitos

### 1. Conta Google Play Console
- Criar conta em: https://play.google.com/console
- Taxa única de registro: $25 USD
- Tempo de aprovação: 1-2 dias úteis

### 2. Domínio Verificado
- Seu PWA deve estar hospedado em um domínio HTTPS
- Domínio atual: [SEU_DOMINIO_AQUI]

### 3. Assets Necessários (✅ Já existem no projeto)
- ✅ Ícone 192x192: `/public/pwa-192x192.png`
- ✅ Ícone 512x512: `/public/pwa-512x512.png`
- ✅ Ícone maskable 512x512: `/public/pwa-maskable-512x512.png`
- ⚠️ Screenshots: **PRECISAM SER CRIADOS**

---

## 🎯 Método Recomendado: Bubblewrap (Google)

O **Bubblewrap** é a ferramenta oficial do Google para converter PWAs em apps Android.

### Passo 1: Instalar Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

### Passo 2: Inicializar o Projeto TWA

Execute no diretório raiz do projeto:

```bash
bubblewrap init --manifest https://SEU_DOMINIO/manifest.json
```

**Informações necessárias durante a inicialização:**
- **Domain**: Seu domínio (ex: educly.com.br)
- **Package Name**: `br.com.educly` (formato reverso do domínio)
- **App Name**: `Educly`
- **Start URL**: `/dashboard`
- **Theme Color**: `#0D2837`
- **Background Color**: `#FFFFFF`
- **Icon URL**: `https://SEU_DOMINIO/pwa-512x512.png`

### Passo 3: Configurar Assetlinks (Verificação de Domínio)

O Bubblewrap gerará um arquivo `assetlinks.json`. Você precisa:

1. Copiar o conteúdo gerado
2. Criar o arquivo no servidor web em: `/.well-known/assetlinks.json`
3. Verificar acesso público: `https://SEU_DOMINIO/.well-known/assetlinks.json`

**Exemplo de assetlinks.json:**
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "br.com.educly",
    "sha256_cert_fingerprints": [
      "FINGERPRINT_AQUI"
    ]
  }
}]
```

### Passo 4: Gerar Keystore (Chave de Assinatura)

```bash
keytool -genkey -v -keystore educly-release-key.keystore -alias educly -keyalg RSA -keysize 2048 -validity 10000
```

**Informações necessárias:**
- **Password**: Criar senha forte e **GUARDAR COM SEGURANÇA**
- **Nome**: Educly
- **Organização**: Sua empresa
- **Cidade/Estado/País**: Seus dados

⚠️ **IMPORTANTE**: Guarde o arquivo `.keystore` e a senha em local seguro. Perder isso significa não poder atualizar o app!

### Passo 5: Construir o APK/AAB

```bash
# Construir AAB (recomendado para Play Store)
bubblewrap build

# Ou construir APK (para testes)
bubblewrap build --apk
```

### Passo 6: Testar Localmente

```bash
# Instalar no dispositivo Android conectado via USB
adb install app-release-signed.apk
```

---

## 📱 Criar Screenshots Obrigatórios

A Play Store exige **no mínimo 2 screenshots** para cada tipo de dispositivo.

### Screenshots Necessários:

#### 📱 Smartphone (OBRIGATÓRIO)
- **Quantidade**: Mínimo 2, máximo 8
- **Resolução**: 
  - Mínimo: 320px
  - Máximo: 3840px
  - Proporção: 16:9 ou 9:16
- **Formato**: PNG ou JPEG (24-bit, sem alpha)
- **Recomendado**: 1080x1920 (portrait) ou 1920x1080 (landscape)

#### 📱 Tablet 7" (Opcional)
- **Resolução recomendada**: 1200x1920

#### 📱 Tablet 10" (Opcional)
- **Resolução recomendada**: 1600x2560

### Como Criar Screenshots:

**Opção 1: Usar Chrome DevTools**
1. Abrir seu PWA no Chrome
2. F12 → Toggle Device Toolbar
3. Selecionar dispositivo (ex: Pixel 5)
4. Navegar pelas telas principais
5. Capturar screenshots (Ctrl+Shift+P → "Capture screenshot")

**Opção 2: Usar Dispositivo Real**
1. Abrir PWA no celular
2. Tirar screenshots das telas principais
3. Transferir para o computador

**Telas Recomendadas para Screenshot:**
1. Tela de Login/Boas-vindas
2. Dashboard principal
3. Tela de desafios/trilhas
4. Tela de progresso/conquistas
5. Tela de IA/assistentes
6. Tela de certificados

---

## 🎨 Assets Gráficos Adicionais

### Ícone de Alta Resolução (Feature Graphic)
- **Tamanho**: 1024x500 pixels
- **Formato**: PNG ou JPEG (24-bit)
- **Uso**: Banner principal na Play Store
- **Conteúdo**: Logo + slogan "Formando Líderes em IA"

### Ícone do App (Play Store)
- **Tamanho**: 512x512 pixels
- **Formato**: PNG (32-bit com alpha)
- **Já existe**: `/public/pwa-512x512.png` ✅

---

## 📝 Informações para a Listagem na Play Store

### Título do App
```
Educly - Formando Líderes em IA
```
(Máximo: 50 caracteres)

### Descrição Curta
```
Domine ChatGPT, Claude, Lovable e mais ferramentas de IA. 50.000+ alunos em 150+ países.
```
(Máximo: 80 caracteres)

### Descrição Completa
```
🚀 Educly - A Plataforma Líder em Educação de Inteligência Artificial

Transforme sua carreira dominando as ferramentas de IA mais poderosas do mercado!

✨ O QUE VOCÊ VAI APRENDER:
• ChatGPT - Domine prompts avançados e automação
• Claude - Técnicas profissionais de conversação
• Lovable - Crie aplicações sem código
• Midjourney - Gere imagens incríveis com IA
• E muito mais!

🎯 RECURSOS EXCLUSIVOS:
• Trilhas de aprendizado estruturadas
• Desafios práticos e interativos
• Certificados reconhecidos
• Comunidade de 50.000+ alunos
• Suporte em Português, Inglês e Espanhol
• Assistentes de IA personalizados

🏆 CONQUISTAS E GAMIFICAÇÃO:
• Sistema de XP e níveis
• Medalhas exclusivas
• Rankings e competições
• Acompanhamento de progresso

💼 IDEAL PARA:
• Profissionais que querem se destacar
• Estudantes de tecnologia
• Empreendedores digitais
• Criadores de conteúdo
• Qualquer pessoa interessada em IA

📊 RESULTADOS COMPROVADOS:
• 50.000+ alunos ativos
• Presença em 150+ países
• 4.8+ de avaliação média
• Certificados reconhecidos

🌍 DISPONÍVEL EM:
• Português (Brasil)
• Inglês
• Espanhol

Junte-se à revolução da IA e transforme seu futuro hoje!

---
Educly © 2026 - Todos os direitos reservados
```
(Máximo: 4000 caracteres)

### Categoria
- **Principal**: Educação
- **Secundária**: Produtividade

### Tags/Palavras-chave
```
inteligência artificial, IA, ChatGPT, Claude, educação, cursos online, aprendizado, tecnologia, programação, automação
```

### Classificação de Conteúdo
- **Público-alvo**: Livre (PEGI 3)
- **Conteúdo educacional**: Sim

### Informações de Contato
- **Email**: [SEU_EMAIL_DE_SUPORTE]
- **Site**: [SEU_DOMINIO]
- **Política de Privacidade**: [URL_DA_POLITICA]

---

## 🚀 Processo de Publicação no Play Console

### 1. Criar Novo App
1. Acessar: https://play.google.com/console
2. Clicar em "Criar app"
3. Preencher informações básicas
4. Aceitar declarações de conteúdo

### 2. Configurar Listagem da Loja
1. **Detalhes do app**: Título, descrição curta, descrição completa
2. **Recursos gráficos**: Ícone, feature graphic, screenshots
3. **Categorização**: Categoria, tags
4. **Informações de contato**: Email, site, política de privacidade

### 3. Configurar Classificação de Conteúdo
1. Preencher questionário
2. Obter classificação PEGI/ESRB

### 4. Selecionar Países e Regiões
1. Escolher países de distribuição
2. Configurar preços (gratuito)

### 5. Upload do AAB
1. Ir para "Produção" → "Criar nova versão"
2. Upload do arquivo `.aab`
3. Preencher notas da versão
4. Revisar e enviar

### 6. Revisão do Google
- **Tempo médio**: 1-7 dias
- **Possíveis solicitações**: Correções, documentação adicional

---

## 🔧 Configuração do Servidor (assetlinks.json)

### Criar arquivo no servidor:

**Caminho**: `/.well-known/assetlinks.json`

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "br.com.educly",
    "sha256_cert_fingerprints": [
      "SUBSTITUIR_PELO_FINGERPRINT_REAL"
    ]
  }
}]
```

### Obter SHA-256 Fingerprint:

```bash
keytool -list -v -keystore educly-release-key.keystore -alias educly
```

### Verificar configuração:

```bash
curl https://SEU_DOMINIO/.well-known/assetlinks.json
```

### Headers necessários no servidor:
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

---

## ✅ Checklist Final

### Antes de Submeter:
- [ ] PWA funcionando em produção (HTTPS)
- [ ] Manifest.json acessível publicamente
- [ ] Service Worker registrado corretamente
- [ ] Assetlinks.json configurado no servidor
- [ ] Keystore gerado e guardado com segurança
- [ ] AAB/APK construído e assinado
- [ ] App testado em dispositivo Android real
- [ ] Screenshots criados (mínimo 2)
- [ ] Feature graphic criado (1024x500)
- [ ] Descrições escritas em todos os idiomas
- [ ] Política de privacidade publicada
- [ ] Email de contato configurado
- [ ] Classificação de conteúdo obtida

### Após Aprovação:
- [ ] Testar instalação da Play Store
- [ ] Verificar deep links funcionando
- [ ] Monitorar reviews e feedback
- [ ] Configurar atualizações automáticas

---

## 🆘 Problemas Comuns e Soluções

### 1. "Digital Asset Links verification failed"
**Solução**: Verificar se `assetlinks.json` está acessível e com fingerprint correto.

### 2. "App não abre URLs do domínio"
**Solução**: Confirmar que `assetlinks.json` está em `/.well-known/` e não em subpasta.

### 3. "Ícone não aparece corretamente"
**Solução**: Usar ícone maskable com área segura de 20% nas bordas.

### 4. "Rejeição por conteúdo"
**Solução**: Revisar política de privacidade e classificação de conteúdo.

---

## 📚 Recursos Úteis

- **Bubblewrap Docs**: https://github.com/GoogleChromeLabs/bubblewrap
- **TWA Guide**: https://developer.chrome.com/docs/android/trusted-web-activity/
- **Play Console**: https://play.google.com/console
- **Asset Links Tool**: https://developers.google.com/digital-asset-links/tools/generator
- **PWA Builder**: https://www.pwabuilder.com/ (alternativa visual)

---

## 🔄 Atualizações Futuras

Para atualizar o app após publicação:

1. Incrementar `versionCode` e `versionName` no `twa-manifest.json`
2. Reconstruir AAB: `bubblewrap build`
3. Upload nova versão no Play Console
4. Aguardar aprovação (geralmente mais rápida que primeira vez)

---

## 💡 Dicas Importantes

1. **Teste antes de publicar**: Sempre teste o APK em dispositivos reais
2. **Mantenha backups**: Guarde keystore e senhas em múltiplos locais seguros
3. **Monitore analytics**: Configure Google Analytics ou similar
4. **Responda reviews**: Engajamento aumenta ranking na Play Store
5. **Atualize regularmente**: Apps atualizados têm melhor visibilidade
6. **Use ASO**: Otimize título e descrição para busca (App Store Optimization)

---

**Última atualização**: Março 2026
**Versão do guia**: 1.0
