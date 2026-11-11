# Prévia mobile de conversa no WhatsApp

Prévia vertical em estilo WhatsApp. Em telas grandes, fica centralizada na proporção de um celular; em celulares, ocupa a tela inteira sem moldura.

## Abrir

Use [http://localhost:5173](http://localhost:5173) com o servidor local ativo. Para iniciar o servidor novamente, rode `node server.js` nesta pasta. Também é possível abrir `index.html` diretamente no navegador.

## Personalizar

Edite `CHAT_CONFIG`, no início de `app.js`:

- `profile.name`, `profile.status` e `profile.avatarUrl` definem o cabeçalho.
- `conversation` contém as mensagens exibidas em sequência. Mensagens do bot aparecem com animação de digitação.
- `options` define as opções clicáveis que aparecem depois da conversa. Deixe vazio até definir as escolhas.
- `pauseBeforeReply` ajusta quanto tempo os três pontinhos aparecem antes da mensagem completa.

