# Guia: Como Criar Screenshots para Play Store

## 📱 Requisitos da Play Store

### Screenshots de Smartphone (OBRIGATÓRIO)
- **Quantidade**: Mínimo 2, máximo 8
- **Resolução recomendada**: 1080x1920 (portrait) ou 1920x1080 (landscape)
- **Formato**: PNG ou JPEG (24-bit, sem canal alpha)
- **Tamanho máximo**: 8MB por imagem

### Screenshots de Tablet (Opcional, mas recomendado)
- **7 polegadas**: 1200x1920
- **10 polegadas**: 1600x2560

---

## 🎯 Telas Recomendadas para Capturar

### 1. Tela de Boas-vindas / Login
- Mostra a primeira impressão do app
- Destaca o branding e proposta de valor

### 2. Dashboard Principal
- Visão geral das funcionalidades
- Mostra trilhas, progresso, XP

### 3. Tela de Desafios
- Lista de desafios disponíveis
- Cards coloridos e atrativos

### 4. Tela de Assistentes IA
- Mostra os diferentes assistentes (ChatGPT, Claude, etc.)
- Interface de chat

### 5. Tela de Progresso / Conquistas
- Medalhas conquistadas
- Gráficos de evolução
- Sistema de gamificação

### 6. Tela de Certificados
- Certificados obtidos
- Design profissional

---

## 🛠️ Método 1: Chrome DevTools (Recomendado)

### Passo a Passo:

1. **Abrir o PWA no Chrome**
   ```
   https://SEU_DOMINIO
   ```

2. **Abrir DevTools**
   - Pressione `F12` ou `Ctrl+Shift+I`

3. **Ativar Device Toolbar**
   - Clique no ícone de celular/tablet
   - Ou pressione `Ctrl+Shift+M`

4. **Selecionar Dispositivo**
   - Escolha "Pixel 5" ou "iPhone 12 Pro"
   - Resolução: 1080x2340 (ajusta automaticamente)

5. **Navegar e Capturar**
   - Navegue até a tela desejada
   - Pressione `Ctrl+Shift+P`
   - Digite "Capture screenshot"
   - Selecione "Capture screenshot" (não "full size")

6. **Repetir para Todas as Telas**
   - Capture pelo menos 6 telas diferentes

### Configurações Recomendadas:
- **Zoom**: 100%
- **Device**: Pixel 5 (1080x2340)
- **Orientation**: Portrait
- **Show device frame**: Opcional (fica mais bonito COM frame)

---

## 🛠️ Método 2: Dispositivo Android Real

### Passo a Passo:

1. **Abrir PWA no Celular**
   - Acesse seu domínio no Chrome
   - Faça login

2. **Tirar Screenshots**
   - Android: `Power + Volume Down`
   - Ou use a função de screenshot do sistema

3. **Transferir para PC**
   - Via USB: Conecte o celular e copie da pasta DCIM/Screenshots
   - Via Cloud: Google Photos, Dropbox, etc.

4. **Verificar Resolução**
   - Abra no visualizador de imagens
   - Confirme que está em 1080x1920 ou similar

---

## 🛠️ Método 3: Ferramentas Online

### Opção A: Screely (https://screely.com)
1. Tire screenshots simples
2. Faça upload no Screely
3. Adicione moldura de celular
4. Baixe em alta resolução

### Opção B: Mockuphone (https://mockuphone.com)
1. Upload das screenshots
2. Escolha modelo de celular
3. Gera imagem com moldura
4. Download

### Opção C: Figma/Canva
1. Crie um frame 1080x1920
2. Importe screenshots
3. Adicione textos explicativos (opcional)
4. Exporte como PNG

---

## 🎨 Dicas para Screenshots Profissionais

### 1. Use Dados Reais
- Mostre conteúdo real, não placeholders
- Use conta de teste com progresso visível

### 2. Destaque Funcionalidades
- Capture momentos que mostram valor
- Evite telas vazias ou de loading

### 3. Consistência Visual
- Todas as screenshots com mesmo tema (claro/escuro)
- Mesmo nível de zoom
- Mesma orientação

### 4. Ordem Lógica
- Organize screenshots na ordem de uso
- Primeira screenshot é a mais importante!

### 5. Adicione Contexto (Opcional)
- Textos curtos explicando funcionalidades
- Setas ou destaques em elementos importantes
- Mantenha design limpo e profissional

---

## 📐 Template de Organização

Crie uma pasta `play-store-assets/screenshots/` com:

```
screenshots/
├── phone/
│   ├── 01-welcome.png          (1080x1920)
│   ├── 02-dashboard.png        (1080x1920)
│   ├── 03-challenges.png       (1080x1920)
│   ├── 04-ai-assistants.png    (1080x1920)
│   ├── 05-progress.png         (1080x1920)
│   ├── 06-certificates.png     (1080x1920)
│   └── 07-gamification.png     (1080x1920)
│
├── tablet-7/
│   ├── 01-dashboard.png        (1200x1920)
│   └── 02-challenges.png       (1200x1920)
│
└── tablet-10/
    ├── 01-dashboard.png        (1600x2560)
    └── 02-challenges.png       (1600x2560)
```

---

## ✅ Checklist de Qualidade

Antes de fazer upload na Play Store, verifique:

- [ ] Mínimo 2 screenshots (recomendado 6-8)
- [ ] Resolução correta (1080x1920 ou similar)
- [ ] Formato PNG ou JPEG
- [ ] Tamanho menor que 8MB cada
- [ ] Sem bordas brancas ou pretas desnecessárias
- [ ] Conteúdo legível e claro
- [ ] Sem informações sensíveis (emails, senhas, etc.)
- [ ] Representam bem as funcionalidades principais
- [ ] Ordem lógica de apresentação
- [ ] Mesmo tema visual em todas

---

## 🚀 Ferramentas Úteis

### Edição de Imagem:
- **GIMP**: Gratuito, completo
- **Paint.NET**: Windows, simples
- **Photopea**: Online, gratuito

### Redimensionamento:
- **ImageMagick**: Linha de comando
- **Bulk Resize Photos**: Online, batch processing
- **IrfanView**: Windows, batch conversion

### Compressão (se necessário):
- **TinyPNG**: Online, mantém qualidade
- **Squoosh**: Google, controle fino

---

## 📝 Exemplo de Comando para Redimensionar

Se suas screenshots estiverem em resolução diferente:

### ImageMagick:
```bash
magick convert input.png -resize 1080x1920 -gravity center -extent 1080x1920 output.png
```

### PowerShell (Windows):
```powershell
# Instalar módulo de imagem
Install-Module -Name ImageResize

# Redimensionar
Resize-Image -InputFile "input.png" -OutputFile "output.png" -Width 1080 -Height 1920
```

---

## 💡 Dica Extra: Feature Graphic

Além dos screenshots, você precisará de um **Feature Graphic** (banner):

- **Tamanho**: 1024x500 pixels
- **Formato**: PNG ou JPEG (24-bit)
- **Conteúdo sugerido**:
  - Logo do Educly centralizado
  - Texto: "Formando Líderes em IA"
  - Background com gradiente #0D2837
  - Ícones de IA ao redor (ChatGPT, Claude, etc.)

---

**Última atualização**: Março 2026
