import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { systemPrompt } from "../src/domains/chat/data/system-prompt";

// Vercel serverless function - used at runtime by Vercel
export default async function handler(req: Request) {
	if (req.method !== "POST") {
		return new Response("Method not allowed", { status: 405 });
	}

	try {
		const { messages } = await req.json();

		const result = streamText({
			model: openai("gpt-4o-mini"),
			system: systemPrompt,
			messages,
		});

		return result.toTextStreamResponse();
	} catch (error) {
		console.error("Chat API error:", error);
		return new Response("Internal server error", { status: 500 });
	}
}
