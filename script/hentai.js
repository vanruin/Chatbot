module.exports.config = {
  name: "hentai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jovan (Modified by ChatGPT)",
  description: "Sends random NSFW hentai images",
  commandCategory: "NSFW",
  usages: "!hentai [limit (1-20)]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");
  const fs = require("fs");
  const path = require("path");
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  let limit =
    args[0] && !isNaN(args[0])
      ? Math.min(Math.max(parseInt(args[0]), 1), 20)
      : 1;
  let hentaiPath = __dirname + `/cache/hentai`;

  if (!fs.existsSync(hentaiPath)) fs.mkdirSync(hentaiPath);

  try {
    let response = await axios.get(
      `https://kaiz-apis.gleeze.com/api/hentai?limit=${limit}`,
    );
    let urls = response.data.urls;

    if (!urls || urls.length === 0) return out("No images found, try again!");

    let attachments = [];
    api.setMessageReaction("🔞", event.messageID, (err) => {}, true);

    for (let i = 0; i < urls.length; i++) {
      let filePath = path.join(hentaiPath, `hentai_${i}.webp`);
      let imgResponse = await axios.get(urls[i], {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(filePath, imgResponse.data);
      attachments.push(fs.createReadStream(filePath));
    }

    api.sendMessage(
      {
        body: `Here are ${urls.length} random hentai images 🔥`,
        attachment: attachments,
      },
      event.threadID,
      () => {
        attachments.forEach((file) => fs.unlinkSync(file.path)); // Delete images after sending
      },
      event.messageID,
    );
  } catch (err) {
    console.error(err);
    api.sendMessage(
      "Failed to fetch hentai images, please try again!",
      event.threadID,
      event.messageID,
    );
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
  }
};
