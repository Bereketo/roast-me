import { HfInference } from "@huggingface/inference"

// Initialize the Hugging Face Inference client
// You'll need to set HUGGINGFACE_API_KEY in your .env.local file
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { type, content, severity } = JSON.parse(await req.text())

    let prompt = ""

    if (type === "text") {
      prompt = `You are a hilarious roast comedian. Write a clever, funny roast based on this description: "${content}".
      
      The roast should be ${severity} (${
        severity === "mild"
          ? "light-hearted and gentle"
          : severity === "medium"
            ? "moderately spicy but not too harsh"
            : "absolutely savage, no holds barred"
      }).
      
      Make it witty, creative, and unexpected - avoid clichés and obvious jokes. Keep it under 150 words.
      
      Important: While being funny, avoid being truly mean-spirited, racist, sexist, or attacking things people can't change. Focus on being clever rather than cruel.`
    } else {
      // For photo uploads
      prompt = `You are a hilarious roast comedian. Write a clever, funny roast based on a photo that was uploaded.
      
      Since I can't actually see the photo, write a generic but funny roast about someone who uploads photos to be roasted online.
      
      The roast should be ${severity} (${
        severity === "mild"
          ? "light-hearted and gentle"
          : severity === "medium"
            ? "moderately spicy but not too harsh"
            : "absolutely savage, no holds barred"
      }).
      
      Make it witty, creative, and unexpected - avoid clichés and obvious jokes. Keep it under 150 words.
      
      Important: While being funny, avoid being truly mean-spirited, racist, sexist, or attacking things people can't change. Focus on being clever rather than cruel.`
    }

    // Use Hugging Face's text generation
    // We'll use mistralai/Mistral-7B-Instruct-v0.2 which is a good free model
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.8,
        top_p: 0.95,
        repetition_penalty: 1.2,
      },
    })

    // For streaming, we'll simulate it by returning the full text at once
    return new Response(response.generated_text)
  } catch (error) {
    console.error("Error in roast generation:", error)
    return new Response("Error generating roast", { status: 500 })
  }
}

