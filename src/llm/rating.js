import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

const joke = z.object({
  setup: z.string().describe("The setup of the joke"),
  punchline: z.string().describe("The punchline to the joke"),
  rating: z.number().describe("How funny the joke is, from 1 to 10"),
  tags: z.array(z.string()).describe("Tags related to the joke"),
});

const structuredLlm = model.withStructuredOutput(joke, { name: "joke" });
const data = await structuredLlm.invoke("Tell me a joke about cats");
console.log(data);
