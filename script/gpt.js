const axios = require("axios");

module.exports.config = {
  name: "gpt",
  version: "1.0.0",
  hasPermission: 0,
  usePrefix: true,
  aliases: ["gpt3", "gpt35"],
  description: "An AI command powered by GPT-3.5",
  usages: "gpt [prompt]",
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
      "Please provide a question or statement after 'gpt'. For example: '!gpt Explain quantum mechanics.'",
      event.threadID,
      event.messageID,
    );
  }

  api.sendMessage("GPT-3.5 is Thinking..🤖💬", event.threadID, event.messageID);

  try {
    const response = await axios.post(
      `https://kaiz-apis.gleeze.com/api/gpt-3.5?q=${encodeURIComponent(input)}`,
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
