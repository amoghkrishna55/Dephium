import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { HumanMessage } from "@langchain/core/messages";

export interface Character {
  persona: string;
  style: string;
}

export interface Characters {
  SpongeBob: Character;
  Patrick: Character;
  Squidward: Character;
  "Mr. Krabs": Character;
  Sandy: Character;
}

export interface ReviewResponse {
  character: keyof Characters;
  rating: number;
  review: string;
}

export const characters: Characters = {
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

export const reviewSchema = z.object({
  rating: z.number().min(1).max(10).describe("Rating of the meme from 1-10"),
  review: z.string().describe("Your character's review of the meme"),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
  apiKey: "import.meta.env.VITE_GOOGLE_API_KEY",
});

export async function getMemeReview(
  blobUrl: string,
  characterName: keyof Characters
): Promise<ReviewResponse> {
  if (!characters[characterName]) {
    throw new Error("Invalid character name");
  }

  const base64Image = await fetch(blobUrl)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = (reader.result as string).split(",")[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

  const character = characters[characterName];
  const structuredLlm = model.withStructuredOutput(reviewSchema);

  const prompt = `${character.persona}
  You are looking at an image. First, determine if this is actually a cat meme:
  - It should be an image with humorous intent
  - It should feature or reference cats
  - It should have elements that make it share-worthy
  
  If this is NOT a cat meme, respond with:
  rating: 1
  review: "This isn't even a cat meme! [Add character-specific disappointed reaction]"
  
  If it IS a cat meme, rate it based on these criteria:
  1. Humor (Is it actually funny?)
  2. Originality (Have we seen this before?)
  3. Cat-relevance (How well does it use cat elements?)
  4. Visual quality (Is it well-made?)
  
  Rate the meme from 1-10 and explain your rating in your character's style (${character.style}).
  Be honest and critical - not every meme deserves a high score!
  
  Remember to:
  - Stay true to your character's personality
  - Be critical and don't give high scores unless truly deserved
  - Explain specifically what makes it good or bad
  - Reference the actual content of the meme in your review`;

  try {
    const response = await structuredLlm.invoke([
      new HumanMessage({
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: `data:image/jpeg;base64,${base64Image}`,
          },
        ],
      }),
    ]);

    return {
      character: characterName,
      ...response,
    };
  } catch (error) {
    console.error(`Error getting ${characterName}'s review:`, error);
    throw error;
  }
}
