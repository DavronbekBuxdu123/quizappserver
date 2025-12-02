require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// 📌 /start komandasi
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  // Inline buttonlar, har bir URL ga chatId qo‘shiladi
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📝 Test ishlash",
            web_app: {
              url: `https://quizapp-alpha-sage.vercel.app/start?chatId=${chatId}`,
            },
          },
        ],
        [
          {
            text: "⚙️ Test yaratish",
            web_app: {
              url: `https://quizapp-alpha-sage.vercel.app/admin/create-test?chatId=${chatId}`,
            },
          },
        ],
        [
          {
            text: "🔍 Statistika",
            web_app: {
              url: `https://quizapp-alpha-sage.vercel.app/admin/results?chatId=${chatId}`,
            },
          },
        ],
        [
          {
            text: "ℹ️ Yordam",
            callback_data: "help",
          },
        ],
      ],
    },
  };

  // Foydalanuvchiga xabar yuborish
  bot.sendMessage(
    chatId,
    `👋 Salom, *${firstName}*!  
Quyidagi bo‘limlardan birini tanlang:`,
    { ...options, parse_mode: "Markdown" }
  );
});

// Callback query uchun yordam bo‘limi
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  if (query.data === "help") {
    bot.sendMessage(
      chatId,
      `🆘 *Yordam bo‘limi*\n
📝 *Test ishlash* — tayyor tuzilgan testlarni ishlaysiz.  
⚙️ *Test yaratish* — o‘zingiz test yaratib, boshqalarga berishingiz mumkin.  
🔍 *Statistika* — o‘z natijangiz va testlaringizni ko‘rasiz.

Agar biror joyda muammo chiqsa — menga yozing.\n
\`@Feruz_Akmalovich_o1\``,
      { parse_mode: "MarkdownV2" }
    );
  }
});

console.log("🚀 Bot ishga tushdi...");
