const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyA0IViqp72EbVova7mWaXwzKf0vSLcNLx8");

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});


console.log(model)
// ...

async function run() {
  const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();