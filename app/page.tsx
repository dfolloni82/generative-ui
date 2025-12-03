'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { Weather } from '@/components/Weather';
import { Stock } from '@/components/Stock';
import { ECommerce } from '@/components/ECommerce';

function Spinner() {
  return (
    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
  );
}

export default function Page() {
  // Receives stream from route.ts via useChat hook
  // messages array is populated with streamed data from the AI
  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat', // Connects to route.ts endpoint
    }),
    experimental_throttle: 50,
    onFinish: ({ isAbort, isDisconnect, isError }) => {
      if (isAbort) console.log('Response was aborted');
      if (isDisconnect) console.log('Connection was lost');
      if (isError) console.log('An error occurred');
    },
    onError: err => {
      console.error('Chat error:', err);
    },
  });

  // User input state
  const [input, setInput] = useState('');
  // File attachments state
  const [files, setFiles] = useState<FileList | undefined>();

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`${
              message.role === 'user'
                ? 'p-3 rounded-lg ml-auto max-w-[80%]'
                : 'mr-auto max-w-[80%]'
            }`}
            style={message.role === 'user' ? { backgroundColor: '#1a1a1a' } : undefined}
          >
            <div className="font-semibold text-sm mb-1">
              {message.role === 'user' ? 'You' : 'Assistant'}
            </div>
            {/* Renders components from /components based on part.type from streamed data */}
            <div className="space-y-3">
              {message.parts.map((part, index) => {
                // Text content rendering
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>;
                }

                // Weather component rendering - calls <Weather /> from /components/Weather
                if (part.type === 'tool-displayWeather') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-500"
                        >
                          <Spinner />
                          <span>Loading weather...</span>
                        </div>
                      );
                    case 'output-available':
                      return (
                        <Weather
                          key={index}
                          {...(part.output as {
                            location: string;
                            weather: string;
                            temperature: number;
                            humidity: number;
                            wind: number;
                          })}
                        />
                      );
                    case 'output-error':
                      return (
                        <div key={index} className="text-red-500">
                          Error: {part.errorText}
                        </div>
                      );
                  }
                }

                // Stock component rendering - calls <Stock /> from /components/Stock
                if (part.type === 'tool-displayStock') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-500"
                        >
                          <Spinner />
                          <span>Loading stock info...</span>
                        </div>
                      );
                    case 'output-available':
                      return (
                        <Stock
                          key={index}
                          {...(part.output as {
                            symbol: string;
                            price: number;
                            change: number;
                            changePercent: number;
                            high: number;
                            low: number;
                            volume: number;
                          })}
                        />
                      );
                    case 'output-error':
                      return (
                        <div key={index} className="text-red-500">
                          Error: {part.errorText}
                        </div>
                      );
                  }
                }

                // ECommerce component rendering - calls <ECommerce /> from /components/ECommerce
                if (part.type === 'tool-displayProducts') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-500"
                        >
                          <Spinner />
                          <span>Carregando produtos...</span>
                        </div>
                      );
                    case 'output-available':
                      return (
                        <ECommerce
                          key={index}
                          {...(part.output as {
                            products: Array<{
                              id: number;
                              title: string;
                              price: number;
                              image: string;
                            }>;
                          })}
                        />
                      );
                    case 'output-error':
                      return (
                        <div key={index} className="text-red-500">
                          Erro: {part.errorText}
                        </div>
                      );
                  }
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {error && (
          <div className="p-3 bg-red-100 rounded-lg text-red-700">
            <div>An error occurred: {error.message}</div>
          </div>
        )}
      </div>

      {(status === 'submitted' || status === 'streaming') && (
        <div className="flex items-center gap-2 mb-4">
          {status === 'submitted' && <Spinner />}
          <span className="text-sm text-gray-500">
            {status === 'submitted' ? 'Thinking...' : 'Streaming...'}
          </span>
          <button
            type="button"
            onClick={() => stop()}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Stop
          </button>
        </div>
      )}

      {/* User input form - handles submission and sends message */}
      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input, files });
            setInput('');
            setFiles(undefined);
          }
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2">
          {/* Text input field - captures user message */}
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={status !== 'ready'}
            placeholder="Try: What's the weather in Tokyo? or Show me AAPL stock"
            className="flex-1 px-4 py-2 border border-gray-700 bg-[#2a2a2a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        {/* File input - captures file attachments */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            onChange={event => setFiles(event.target.files ?? undefined)}
            multiple
            className="text-sm"
          />
          {files && files.length > 0 && (
            <span className="text-sm text-gray-500">
              {files.length} file(s) selected
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
