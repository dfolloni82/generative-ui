import { createGateway, convertToModelMessages, streamText, UIMessage } from 'ai';
import { tools } from '@/ai/tools';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Capture user input from request body
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Send system prompt + user messages + tools to AI model
  const result = streamText({
    model: gateway('openai/gpt-4o'),
    // System prompt - defines AI behavior and tool usage instructions
    system: `You are a helpful assistant that can display weather, stock information, and product recommendations.
When a user asks about the weather for a location, use the displayWeather tool.
When a user asks about a stock price or stock information, use the displayStock tool.
When a user asks about airfryers, fritadeiras, or kitchen appliances, use the displayProducts tool.
Always be helpful and provide context around the information you display.`,
    // User messages - converted from UI format to model format
    messages: convertToModelMessages(messages),
    // Tools array - available tools for the AI to use
    tools,
  });

  // Stream response back to client (page.tsx receives via useChat hook)
  return result.toUIMessageStreamResponse();
}
