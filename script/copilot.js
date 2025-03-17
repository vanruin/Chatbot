const axios = require("axios");

module.exports.config = {
  name: "copilot",
  version: "1.0.0",
  hasPermission: 0,
  usePrefix: true,
  aliases: ["ghcopilot", "copilotai"],
  description: "An AI command powered by GitHub Copilot API",
  usages: "copilot [prompt]",
  credits: "Developer",
  cooldowns: 3,
  dependencies: {
    axios: "",
  },
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");

  if (!input) {
    return api.sendMessage(
      "Please provide a question or statement after 'copilot'. For example: '!copilot How to write a for loop in Python?'",
      event.threadID,
      event.messageID,
    );
  }

  api.sendMessage(
    "GitHub Copilot is Thinking..🤖💻",
    event.threadID,
    event.messageID,
  );

  try {
    const response = await axios.get(
      `https://kaiz-apis.gleeze.com/api/github-copilot?ask=${encodeURIComponent(input)}&uid=1234`,
    );

    console.log("API Response:", response.data);
    const aiResponse = response.data.response;

    const formattedResponse = `𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 : ${aiResponse}\n Owner 👑 : facebook.com/61566999886241`;

    api.sendMessage(formattedResponse, event.threadID, event.messageID);
  } catch (error) {
    console.error("Error Details:", error.response?.data || error.message);

    return api.sendMessage(
      "An error occurred while processing your request. Please try again later.",
      event.threadID,
      event.messageID,
    );
  }
};
