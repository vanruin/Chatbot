module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jovan",
  description: "given prefix detail",
  commandCategory: "Dành cho Admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;

  function out(data) {
    api.sendMessage(data, threadID, messageID);
  }

  var dataThread = await Threads.getData(threadID);
  var data = dataThread.data;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  var arr = [
    "mpre",
    "mprefix",
    "prefix",
    "dấu lệnh",
    "prefix của bot là gì",
    "daulenh",
    "duong",
    "what prefix",
    "freefix",
    "what is the prefix",
    "bot dead",
    "bots dead",
    "where prefix",
    "what is bot",
    "what prefix bot",
    "how to use bot",
    "how use bot",
    "where are the bots",
    "bot not working",
    "bot is offline",
    "where prefix",
    "prefx",
    "prfix",
    "prifx",
    "perfix",
    "bot not talking",
    "where is bot",
  ];

  arr.forEach((i) => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (
      body === i.toUpperCase() ||
      body === i ||
      str === body ||
      body.startsWith(`${prefix}${i} `) ||
      body === `${prefix}${i}`
    ) {
      if (data.PREFIX == null) {
        return out(
          `✨ This is my Prefix → [ ${prefix} ] ✨\n💝🥀 Owner → Jovan 💫\n🖤 You can call him **Van** 🖤\n😳 His Facebook → [Click Here](www.facebook.com/61566999886241) 🌐\n`,
        );
      } else {
        return out(
          `✨ This is my Prefix → [ ${prefix} ] ✨\n💝🥀 Owner → Jovan 💫\n🖤 You can call him **Van** 🖤\n😳 His Facebook → [Click Here](www.facebook.com/61566999886241) 🌐\n${data.PREFIX}`,
        );
      }
    }
  });
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("error", event.threadID);
};
