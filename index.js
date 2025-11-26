require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📝 Test ishlash",
            web_app: {
              url: "https://quizapp-alpha-sage.vercel.app/start",
            },
          },
        ],
        [
          {
            text: "⚙️ Test yaratish",
            web_app: {
              url: "https://quizapp-alpha-sage.vercel.app/admin/create-test",
            },
          },
        ],
        [
          {
            text: "🔍 Statistika",
            web_app: {
              url: "https://quizapp-alpha-sage.vercel.app/admin/results",
            },
          },
        ],
        [{ text: "ℹ️ Yordam", callback_data: "help" }],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    `👋 Salom, *${firstName}*!  
Quyidagi bo‘limlardan birini tanlang:`,
    { ...options, parse_mode: "Markdown" }
  );
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "help") {
    bot.sendMessage(
      chatId,
      `🆘 *Yordam bo‘limi*\n
📝 *Test ishlash* — tayyor tuzilgan testlarni ishlaysiz.  
⚙️ *Test yaratish* — o‘zingiz test yaratib, boshqalarga berishingiz mumkin.

Agar biror joyda muammo chiqsa — menga yozing.`,
      { parse_mode: "Markdown" }
    );
  }
});

console.log("🚀 Bot ishga tushdi...");
