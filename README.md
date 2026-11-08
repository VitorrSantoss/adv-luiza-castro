# Luiza de Castro · Links

Página de links (estilo Linktree) para o Instagram [@luizadecastroadv](https://www.instagram.com/luizadecastroadv/).
React 18 + Vite + TypeScript + Tailwind CSS + framer-motion. Site estático, sem backend.

## Como rodar

Precisa do Node.js 18 ou superior.

```bash
npm install
npm run dev       # abre em http://localhost:5173
npm run build     # gera a pasta dist/ para produção
npm run preview   # testa o build localmente
```

## Onde trocar os dados

**Tudo** fica em [`src/config/profile.ts`](src/config/profile.ts): nome, bio, links, áreas de atuação, FAQ, textos do formulário e rodapé. Os componentes não têm texto fixo.

Pendências marcadas com `TODO` no topo do arquivo:

| Constante         | O que colocar                                          |
| ----------------- | ------------------------------------------------------ |
| `CONTACT_EMAIL`   | E-mail profissional                                    |
| `FORMSPREE_ID`    | ID do formulário no Formspree (veja abaixo)            |
| `OAB_NUMBER`      | Número de inscrição na OAB/PE                          |

Os links "Fui demitido(a)", "Sou PJ…" e "Alerta de golpes" apontam para o perfil do Instagram. Troque pelo link do post ou destaque específico.

**Foto:** substitua `public/foto.jpg` (quadrada, de preferência com 400×400 px ou mais). Se a foto não carregar, aparecem as iniciais "LC".

> Lembrete (Provimento 205/2021 da OAB): mantenha o tom informativo. Nada de preços, promoções, "consulta grátis", garantia de resultado, depoimentos ou valores ganhos.

## Formulário de e-mail (Formspree)

1. Crie uma conta gratuita em <https://formspree.io>.
2. Clique em **+ New Form**, dê um nome (ex.: "Site Luiza") e informe o e-mail que vai receber as mensagens.
3. Copie o ID do formulário: é o trecho final da URL `https://formspree.io/f/xyzabcd`, ou seja, `xyzabcd`.
4. Cole em `src/config/profile.ts`:
   ```ts
   const FORMSPREE_ID = 'xyzabcd';
   ```
5. Envie uma mensagem de teste pelo site e confirme o e-mail de ativação que o Formspree mandar.

O campo escondido `_gotcha` funciona como honeypot contra spam: o Formspree descarta automaticamente envios em que ele vier preenchido.

## Link direto para o formulário de e-mail

O botão "Enviar um e-mail" abre o formulário na própria página (com "Voltar aos links" no topo; o botão voltar do celular também funciona).
Use `https://seu-dominio.com/#email` nos stories para abrir a página direto no formulário.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em <https://vercel.com>, clique em **Add New → Project** e importe o repositório.
3. A Vercel detecta o Vite sozinha (Build: `npm run build`, Output: `dist`). Clique em **Deploy**.
4. Opcional: em **Settings → Domains**, conecte um domínio próprio.
5. Depois do deploy, troque no `index.html` as URLs do Open Graph (`og:image`) pelo endereço completo, por exemplo `https://seu-dominio.com/foto.jpg`, para a prévia aparecer certinho no WhatsApp e no Instagram.

**Netlify:** mesmo processo. Build command `npm run build`, publish directory `dist`.

Por fim, coloque o link no campo "Site" da bio do Instagram.
# adv-luiza-castro
