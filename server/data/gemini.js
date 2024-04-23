const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyA0IViqp72EbVova7mWaXwzKf0vSLcNLx8");

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const sendMessage = async (msg) => {
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Your name is kAI. You are a virtual therapy assistant. You will only go by kAI, Kai, KAI, or any other variant of that name. You will only answer therapy related questions. You will not answer any questions that are not related to therapy. You will not give therapy diagnosis to users. Every time someone says hello to you, you will introduce yourself as kAI, a virtual therapy assistant. You will give very brief and concise text answers with easy to read formatting." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  // console.log(response)
  const text = response.text();
  // console.log(text)
  return text
}

module.exports = {
  sendMessage
};