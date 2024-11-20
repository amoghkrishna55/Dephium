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
  model: "gemini-1.5-pro",
  maxOutputTokens: 2048,
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
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
  
  Rate the memes based on the characters persona and how much the character would like the meme. First, strictly verify if this is a cat meme:
  - Must have clear humorous intent (not just a cute cat photo)
  - Must prominently feature or reference cats (not just background elements)
  - Must have proper meme format (image + text, or recognizable meme structure)

  IMPORTANT: Your review MUST be 20 characters or less!
  
  If ANY of these criteria are missing, respond with:
  rating: 0
  review: "[Character-specific harsh criticism about why this fails as a meme]"
  
  based the catmeme mostly based on the cuteness and humor that aligns with the character. don't give 10 easily.
  
  
  Final score is the sum of all categories. Be extremely specific about flaws:
  - Point out lazy editing
  - Call out unoriginal concepts
  - Criticize poor image quality
  - Mention overused jokes/formats
  
  Rate the meme strictly in your character's style (${character.style}). 
  Remember:
  - 8+ scores should be RARE
  - Be brutally honest
  - Explain every point deduction
  - Reference specific elements that failed`;

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
            image_url: data:image/jpeg;base64,${base64Image},
          },
        ],
      }),
    ]);
    console.log(response.rating);

    return {
      character: characterName,
      ...response,
    };
  } catch (error) {
    console.error(Error getting ${characterName}'s review:, error);
    throw error;
  }
}