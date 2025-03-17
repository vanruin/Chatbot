module.exports.config = {
  name: "cog",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jovan (Modified by ChatGPT)",
  description: "Generate a video based on a prompt",
  commandCategory: "general",
  usages: "!cog [your prompt]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require("axios");
  const request = require("request");
  const fs = require("fs");
  var out = (msg) => api.sendMessage(msg, event.threadID, event.messageID);

  if (!args.join("")) return out("Please provide a prompt");

  let prompt = args.join(" ");
  let videoPath = __dirname + `/cache/cog.mp4`;

  try {
    let response = await axios.get(
      `https://renzweb.onrender.com/api/cogvideox-flash?prompt=${encodeURIComponent(prompt)}`,
      { responseType: "stream" },
    );
    let writer = fs.createWriteStream(videoPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      api.sendMessage(
        {
          body: `Here is your generated video for: ${prompt}`,
          attachment: fs.createReadStream(videoPath),
        },
        event.threadID,
        () => fs.unlinkSync(videoPath),
        event.messageID,
      );
    });
  } catch (err) {
    console.error(err);
    api.sendMessage(
      "Failed to generate video, please try again!",
      event.threadID,
      event.messageID,
    );
    api.setMessageReaction("☹️", event.messageID, (err) => {}, true);
  }
};
