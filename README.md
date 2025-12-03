## Getting Started

### Environment Setup

1. Get your own AI_GATEWAY_API_KEY in Vercel.https://vercel.com/

2. Create a `.env.local` file in the root of the project with the following content:

```
AI_GATEWAY_API_KEY=your_api_key_here
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Enter prompts like:
- What is the weather in San Francisco?
- What is the best airfryer?
- Show me AAPL stocks.

### Project Overview

```
gen-ui-app/
├── ai/
│   └── tools.ts              # AI tool definitions (weather, stock, ecommerce)
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # API endpoint that handles chat requests and streams AI responses
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main chat interface with useChat hook
├── components/
│   ├── ECommerce.tsx         # Product card grid component for airfryer recommendations
│   ├── Stock.tsx             # Stock price display component with price/change info
│   └── Weather.tsx           # Weather card component showing temperature/humidity/wind
└── public/
    └── images/               # Product images for ecommerce display
```

### Adding New Components

To add a new generative UI component:

1. **Create the tool** in `ai/tools.ts`:
   ```ts
   export const myTool = tool({
     description: 'Description of when to use this tool',
     inputSchema: jsonSchema<{ param: string }>({
       type: 'object',
       properties: {
         param: { type: 'string', description: 'Parameter description' },
       },
       required: ['param'],
     }),
     execute: async ({ param }) => {
       // Return data for your component
       return { param, result: 'data' };
     },
   });

   // Add to the tools export
   export const tools = {
     // ...existing tools
     displayMyTool: myTool,
   };
   ```

2. **Create the component** in `components/MyComponent.tsx`:
   ```tsx
   type MyComponentProps = {
     param: string;
     result: string;
   };

   export function MyComponent({ param, result }: MyComponentProps) {
     return <div>{/* Your UI here */}</div>;
   }
   ```

3. **Add rendering logic** in `app/page.tsx`:
   ```tsx
   import { MyComponent } from '@/components/MyComponent';

   // Inside the message.parts.map(), add:
   if (part.type === 'tool-displayMyTool') {
     switch (part.state) {
       case 'input-available':
         return <div key={index}>Loading...</div>;
       case 'output-available':
         return <MyComponent key={index} {...(part.output as MyComponentProps)} />;
       case 'output-error':
         return <div key={index}>Error: {part.errorText}</div>;
     }
   }
   ```

4. **Update the system prompt** in `app/api/chat/route.ts` to tell the AI when to use your new tool.