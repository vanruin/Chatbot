const axios = require("axios");

module.exports.config = {
  name: "gemini",
  version: "1.0.0",
  hasPermission: 0,
  usePrefix: true,
  aliases: ["gv", "geminivision"],
  description: "An AI command powered by Gemini Vision API",
  usages: "gemini [prompt]",
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
      "Please provide a question or statement after 'gemini'. For example: '!gemini What is AI?'",
      event.threadID,
      event.messageID,
    );
  }

  api.sendMessage("Gemini is Thinking..🤖🔍", event.threadID, event.messageID);

  try {
    const response = await axios.get(
      `https://kaiz-apis.gleeze.com/api/gemini-vision?q=${encodeURIComponent(input)}&uid=123&imageUrl=`,
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
