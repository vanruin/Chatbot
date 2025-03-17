module.exports.config = {
  name: "blowjob",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jovan (Modified by ChatGPT)",
  description: "Sends a random NSFW blowjob GIF",
  commandCategory: "NSFW",
  usages: "!blowjob",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs");
  const request = require("request");
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  let gifPath = __dirname + `/cache/blowjob.gif`;

  try {
    let response = await axios.get("https://kaiz-apis.gleeze.com/api/blowjob", {
      responseType: "stream",
    });

    let writer = fs.createWriteStream(gifPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      api.sendMessage(
        {
          body: `Here is your NSFW GIF 🔞`,
          attachment: fs.createReadStream(gifPath),
        },
        event.threadID,
        () => fs.unlinkSync(gifPath), // Delete file after sending
        event.messageID,
      );
    });
  } catch (err) {
    console.error(err);
    api.sendMessage(
      "Failed to fetch GIF, please try again!",
      event.threadID,
      event.messageID,
    );
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
  }
};
