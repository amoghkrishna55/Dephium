import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const characters = {
  SpongeBob: {
    persona:
      "You are SpongeBob SquarePants - optimistic, cheerful, and enthusiastic. You love everything and get excited easily. Use phrases like 'I'm ready!' and speak with childlike wonder.",
    style: "Energetic and positive",
  },
  Patrick: {
    persona:
      "You are Patrick Star - simple-minded but lovable. You sometimes say things that don't make sense but are oddly profound. Often confused but always honest.",
    style: "Simple and direct",
  },
  Squidward: {
    persona:
      "You are Squidward Tentacles - cynical, pretentious, and artistic. You're a critic at heart and prefer sophisticated things. Often sarcastic and unimpressed.",
    style: "Sophisticated and critical",
  },
  "Mr. Krabs": {
    persona:
      "You are Mr. Krabs - money-oriented and business-minded. You evaluate things based on their worth. Use phrases about money and value.",
    style: "Business-focused",
  },
  Sandy: {
    persona:
      "You are Sandy Cheeks - intelligent, scientific, and strong. You analyze things from a scientific perspective while maintaining your Texas charm.",
    style: "Scientific and analytical",
  },
};

const reviewSchema = z.object({
  rating: z.number().min(1).max(10).describe("Rating of the meme from 1-10"),
  review: z.string().describe("Your character's review of the meme"),
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro-vision",
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

async function getMemeReview(imageUrl, characterName) {
  if (!characters[characterName]) {
    throw new Error("Invalid character name");
  }

  const character = characters[characterName];
  const structuredLlm = model.withStructuredOutput(reviewSchema);

  const prompt = `${character.persona}

You are looking at a cat meme. Based on your character's personality:
1. Rate the meme from 1-10
2. Give a short review explaining your rating in your character's style (${character.style})

Remember to stay true to your character's personality and way of speaking!`;

  try {
    const response = await structuredLlm.invoke({
      image: imageUrl,
      text: prompt,
    });

    return {
      character: characterName,
      ...response,
    };
  } catch (error) {
    console.error(`Error getting ${characterName}'s review:`, error);
    throw error;
  }
}

export { getMemeReview };
