import nodemailer from "nodemailer"

// Configuração do transporte do Nodemailer (exemplo com SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SMTP,  // Use o SMTP do seu provedor de e-mail (Mailtrap, Gmail, etc.)
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
      user: process.env.MAIL_USER,  // Usuário de autenticação do SMTP (do .env)
      pass: process.env.MAIL_PASS   // Senha de autenticação do SMTP (do .env)
  }
});

// Função para enviar e-mail
export async function newAcountEmail(name, email, password, plan) {
  try {
      const info = await transporter.sendMail({
          from: '"Freud Psicologo" <no-reply@freudpsicologo.com>',  // Remetente
          to: email, //Destinatário
          subject: "Bem Vindo Ao Nosso Sistema!",
          html: `
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Bem-vindo ao Sistema</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      color: #333;
                  }
                  h1 {
                      color: #007bff;
                  }
                  p {
                      margin: 10px 0;
                  }
                  ul {
                      list-style-type: none;
                      padding: 0;
                  }
                  ul li {
                      margin: 5px 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #f9f9f9;
                      border: 1px solid #ddd;
                      border-radius: 10px;
                  }
                  .footer {
                      margin-top: 20px;
                      font-size: 0.9em;
                      color: #777;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Olá ${name}, seja bem-vindo ao nosso sistema!</h1>
                  <p>Seus dados de acesso são:</p>
                  <ul>
                      <li><strong>Email:</strong> ${email}</li>
                      <li><strong>Senha:</strong> ${password}</li>
                  </ul>
                  <p><strong>Importante:</strong> Por favor, altere sua senha ao acessar o sistema, pois ela foi gerada automaticamente. Não nos responsabilizamos caso você perca o acesso à sua conta por não realizar a troca de senha.</p>
                  <p>Obrigado por se cadastrar e boa sorte com o seu plano <strong>${plan}</strong>!</p>
              </div>
              <div class="footer">
                  <p>Esta é uma mensagem automática, por favor não responda este email.</p>
              </div>
          </body>
          </html>`,
          text:`
          Olá ${name}, seja bem-vindo ao nosso sistema!

          Seus dados de acesso são:
          Email: ${email}
          Senha: ${password}

          Por favor, altere sua senha logo após acessar o sistema, pois a senha foi gerada automaticamente. Não nos responsabilizamos caso você perca o acesso à sua conta por não realizar a troca de senha.

          Acessos ao nosso sistema:

          Obrigado por se cadastrar e boa sorte com o seu plano ${plan}!`
      });

      console.log('E-mail enviado:', info.messageId);
      return true;
  } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      return false;
  }
}