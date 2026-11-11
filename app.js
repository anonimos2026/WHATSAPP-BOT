/*
 * CONFIGURE A CONVERSA AQUI.
 * Quando você enviar a foto, coloque o arquivo na pasta do projeto e informe
 * o caminho em profile.avatarUrl (por exemplo: "nicole.jpg").
 * As opções aparecem em etapas; cada escolha revela a próxima mensagem.
 */
const CHAT_CONFIG = {
  profile: {
    name: 'Nicole Yasmim',
    status: '',
    avatarUrl: 'assets/nicole-profile.jpeg',
    initials: 'NY'
  },
  conversation: [
    { from: 'bot', text: '¡Hola! Me llamo Nicole y soy una pelirroja muy traviesa.' }
  ],
  options: [
    {
      title: 'Quiero conocerte mejor',
      reply: 'Tengo un lado misterioso y algunas sorpresas que quiero mostrarte... ¿Quieres conocerme un poco más? 😉',
      nextOptions: [
        {
          title: 'Quiero conocerte más',
          reply: 'En mi espacio privado encontrarás 👇\n📸 Más de 258 fotos exclusivas\n🎬 En vivos exclusivos\n🎥 Más de 68 videos\n\nTodo en un solo lugar 😘\n\n¿Quieres saber cómo funciona el acceso?',
          nextOptions: [
            {
              title: 'Cuéntame cómo funciona',
              reply: 'Es muy fácil: eliges por cuánto tiempo quieres tener acceso y confirmas en la plataforma. Puedes elegir 1 mes, 3 meses o 1 año. ✨\n\n¿Cuál plan te late más?',
              nextOptions: [
                {
                  title: 'Plan de 1 mes · MX$37',
                  reply: '¡Buena elección! ✨ El plan de 1 mes cuesta MX$37. ¿Quieres asegurar tu acceso?',
                  nextOptions: [
                    {
                      title: 'Quiero asegurar mi acceso',
                      checkoutUrl: 'https://xpag.global/pay/rU6oGqyF'
                    }
                  ]
                },
                {
                  title: 'Plan de 3 meses · MX$57',
                  reply: '¡Buena elección! ✨ Con el plan de 3 meses tendrás más tiempo para disfrutar el contenido y enterarte de las novedades. Cuesta MX$57. ¿Quieres asegurar tu acceso?',
                  nextOptions: [
                    {
                      title: 'Quiero asegurar mi acceso',
                      checkoutUrl: 'https://xpag.global/pay/IQUFADcs'
                    }
                  ]
                },
                {
                  title: 'Plan de 1 año · MX$75',
                  reply: '¡Me encanta tu elección! 😘 Con el plan de 1 año tendrás mucho tiempo para disfrutar todo con calma. Cuesta MX$75. ¿Quieres asegurar tu acceso?',
                  nextOptions: [
                    {
                      title: 'Quiero asegurar mi acceso',
                      checkoutUrl: 'https://xpag.global/pay/v8j6rQZN'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  pauseBeforeReply: 750
};

const chat = document.querySelector('#chat');
const messages = document.querySelector('#messages');
const typing = document.querySelector('#typing');

function wait(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

function scrollBottom() {
  chat.scrollTop = chat.scrollHeight;
}

function timeNow() {
  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
}

function makeBubble(from) {
  const bubble = document.createElement('div');
  bubble.className = `message ${from === 'user' ? 'user' : 'bot'}`;
  const content = document.createElement('span');
  const stamp = document.createElement('span');
  stamp.className = 'message-time';
  stamp.textContent = timeNow() + (from === 'user' ? '  ✓✓' : '');
  bubble.append(content, stamp);
  messages.append(bubble);
  scrollBottom();
  return { bubble, content };
}

async function addBotMessage(text) {
  typing.hidden = false;
  scrollBottom();
  await wait(CHAT_CONFIG.pauseBeforeReply);
  typing.hidden = true;
  const { content } = makeBubble('bot');
  content.textContent = text;
  scrollBottom();
}

function addUserMessage(text) {
  const { content } = makeBubble('user');
  content.textContent = text;
}

function addUtmParameters(checkoutUrl) {
  const destination = new URL(checkoutUrl);
  const incoming = new URLSearchParams(window.location.search);
  incoming.forEach((value, key) => {
    if (/^utm_/i.test(key)) destination.searchParams.set(key, value);
  });
  return destination.toString();
}

function addOptions(options) {
  if (!options?.length) return;
  const group = document.createElement('div');
  group.className = 'reply-options';
  if (options.some(option => option.checkoutUrl)) group.classList.add('final-action');
  options.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'reply-option';
    button.textContent = option.title;
    button.addEventListener('click', async () => {
      if (group.dataset.used) return;
      group.dataset.used = 'true';
      group.remove();
      addUserMessage(option.title);
      if (option.checkoutUrl) {
        window.location.assign(addUtmParameters(option.checkoutUrl));
        return;
      }
      await addBotMessage(option.reply);
      addOptions(option.nextOptions);
    });
    group.append(button);
  });
  messages.append(group);
  scrollBottom();
}

async function playConversation() {
  for (const item of CHAT_CONFIG.conversation) {
    if (item.from === 'user') {
      await wait(450);
      addUserMessage(item.text);
    } else {
      await addBotMessage(item.text);
    }
  }
  addOptions(CHAT_CONFIG.options);
}

document.querySelector('#contact-name').textContent = CHAT_CONFIG.profile.name;
document.querySelector('#contact-status').textContent = CHAT_CONFIG.profile.status;

const avatar = document.querySelector('#contact-avatar');
if (CHAT_CONFIG.profile.avatarUrl) {
  avatar.style.backgroundImage = `url("${CHAT_CONFIG.profile.avatarUrl.replace(/["\\]/g, '')}")`;
} else {
  avatar.classList.add('initials');
  avatar.dataset.initials = CHAT_CONFIG.profile.initials;
}

playConversation();
