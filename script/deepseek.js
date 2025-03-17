const axios = require("axios");

module.exports.config = {
  name: "deepseek",
  version: "1.0.0",
  hasPermission: 0,
  usePrefix: true,
  aliases: ["ds", "deepseekai"],
  description: "An AI command powered by DeepSeek-V3",
  usages: "deepseek [prompt]",
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
      "Please provide a question or statement after 'deepseek'. For example: '!deepseek What is the capital of France?'",
      event.threadID,
      event.messageID,
    );
  }

  api.sendMessage("DeepSeek is Thinking..🔍 ", event.threadID, event.messageID);

  try {
    const response = await axios.get(
      `https://kaiz-apis.gleeze.com/api/deepseek-v3?ask=${encodeURIComponent(input)}`,
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
