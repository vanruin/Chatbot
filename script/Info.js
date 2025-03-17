const os = require("os");
const pidusage = require("pidusage");

module.exports.config = {
  name: "info",
  version: "1.0.0",
  hasPermission: 0,
  usePrefix: true,
  aliases: ["botinfo", "about"],
  description: "Displays bot information",
  usages: "info",
  credits: "Developer",
  cooldowns: 3,
};

function byte2mb(bytes) {
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let l = 0,
    n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async function ({ api, event }) {
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);

  const usage = await pidusage(process.pid);
  const osInfo = {
    platform: os.platform(),
    architecture: os.arch(),
  };

  const timeStart = Date.now();
  const botInfo =
    `🤖 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼 🤖\n\n` +
    `📌 𝗡𝗮𝗺𝗲: Eeave 🤖\n` +
    `🆙 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: 1.0.0 🛠️\n` +
    `👑 𝗢𝘄𝗻𝗲𝗿: facebook.com/61566999886241 👤\n` +
    `⚡ 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀: AI Commands 🤖, User Assistance 🆘, Fun Commands 🎉\n` +
    `🚀 𝗣𝗿𝗲𝗳𝗶𝘅: {prefix} 🔤\n` +
    `🔧 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: !deepseek, !info, !help 📜\n\n` +
    `⏳ BOT has been working for ⏳ ${hours} hour(s) 🕒 ${minutes} minute(s) ⏱️ ${seconds} second(s).\n\n` +
    ` 🔥 Cpu usage: ${usage.cpu.toFixed(1)}% 💻\n` +
    ` 🏗️ RAM usage: ${byte2mb(usage.memory)} 🖥️\n` +
    ` ⚙️ Cores: ${os.cpus().length} 🛠️\n` +
    ` 📶 Ping: ${Date.now() - timeStart}ms 🚀\n` +
    ` 🖥️ Operating System Platform: ${osInfo.platform} 🌍\n` +
    ` 🏗️ System CPU Architecture: ${osInfo.architecture} 🏗️`;

  return api.sendMessage(botInfo, event.threadID, event.messageID);
};
