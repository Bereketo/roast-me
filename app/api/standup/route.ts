import { HfInference } from "@huggingface/inference"

// Initialize the Hugging Face Inference client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// Map of comedian IDs to their descriptions
const comedianStyles = {
  chapelle:
    "Dave Chappelle - known for sharp social commentary, storytelling, and tackling controversial topics with a mix of insight and irreverence",
  burr: "Bill Burr - known for his angry rants, challenging political correctness, and aggressive delivery style with a Boston accent",
  schumer:
    "Amy Schumer - known for explicit sexual humor, self-deprecation, and commentary on gender and relationships",
  rock: "Chris Rock - known for energetic delivery, social commentary, and observations about race, relationships, and society",
  seinfeld:
    "Jerry Seinfeld - known for clean, observational humor about everyday situations and human behavior with a 'What's the deal with...' style",
  wong: "Ali Wong - known for raw, explicit humor about motherhood, marriage, and her Asian-American background",
  burnham: "Bo Burnham - known for musical comedy, meta-humor, and commentary on internet culture and mental health",
  mulaney:
    "John Mulaney - known for storytelling, self-deprecation, and precise delivery with references to his upbringing and personal life",
  silverman:
    "Sarah Silverman - known for taboo-breaking humor, ironic delivery, and tackling controversial topics with a sweet demeanor",
  hedberg:
    "Mitch Hedberg - known for surreal one-liners, non-sequiturs, and a laid-back delivery style with unique observations",
}

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { topic, comedianStyle } = JSON.parse(await req.text())

    const comedianDescription = comedianStyles[comedianStyle as keyof typeof comedianStyles] || comedianStyles.chapelle

    const prompt = `Write a short stand-up comedy bit about "${topic}" in the style of ${comedianDescription}.

    The bit should be 150-250 words and capture the comedian's voice, delivery style, and typical themes.
    
    Format it as a stand-up routine with natural pauses, audience reactions, and the comedian's typical mannerisms or catchphrases where appropriate.
    
    Make it genuinely funny and authentic to the comedian's style.`

    // Use Hugging Face's text generation
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.9,
        top_p: 0.95,
        repetition_penalty: 1.2,
      },
    })

    return new Response(response.generated_text)
  } catch (error) {
    console.error("Error in standup generation:", error)
    return new Response("Error generating comedy", { status: 500 })
  }
}

