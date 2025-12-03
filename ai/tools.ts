import { tool, jsonSchema } from 'ai';

// Weather Tool
// Input: { location: string } (required)
// Output: { location, weather, temperature, humidity, wind }
export const weatherTool = tool({
  description: 'Display the weather for a location. The location parameter is the city or place to get weather for.',
  inputSchema: jsonSchema<{ location: string }>({
    type: 'object',
    properties: {
      location: { type: 'string', description: 'The location to get weather for' },
    },
    required: ['location'],
  }),
  execute: async ({ location }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock weather data - in production, call a real weather API
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Snowy'];
    const randomCondition =
      conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * 30) + 10; // 10-40°C

    return {
      location,
      weather: randomCondition,
      temperature: randomTemp,
      humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
      wind: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    };
  },
});

// Stock Tool
// Input: { symbol: string } (required)
// Output: { symbol, price, change, changePercent, high, low, volume }
export const stockTool = tool({
  description: 'Display stock price and information. The symbol parameter is the stock ticker symbol (e.g., AAPL, GOOGL, TSLA).',
  inputSchema: jsonSchema<{ symbol: string }>({
    type: 'object',
    properties: {
      symbol: { type: 'string', description: 'The stock ticker symbol' },
    },
    required: ['symbol'],
  }),
  execute: async ({ symbol }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock stock data - in production, call a real stock API
    const basePrice = Math.random() * 500 + 50; // $50-$550
    const change = (Math.random() - 0.5) * 20; // -10 to +10
    const changePercent = (change / basePrice) * 100;

    return {
      symbol: symbol.toUpperCase(),
      price: parseFloat(basePrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      high: parseFloat((basePrice + Math.random() * 10).toFixed(2)),
      low: parseFloat((basePrice - Math.random() * 10).toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    };
  },
});

// ECommerce Tool
// Input: { query?: string } (optional)
// Output: { products: Array<{ id, title, price, image }> }
export const ecommerceTool = tool({
  description: 'Display airfryer products for purchase. Use this when the user asks about airfryers, fritadeiras, or kitchen appliances.',
  inputSchema: jsonSchema<{ query?: string }>({
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Optional search query for products' },
    },
    required: [],
  }),
  execute: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock product data - 3 airfryer products
    const products = [
      {
        id: 1,
        title: 'Fritadeira Inteligente Xiaomi Xm704bra 3,5L 127V',
        price: 399.0,
        image: '/images/1.png',
      },
      {
        id: 2,
        title: 'Fritadeira Airfryer Multilaser 4L 1500W Display Digital',
        price: 429.0,
        image: '/images/3.png',
      },
      {
        id: 3,
        title: 'Fritadeira Airfryer Digital Série 2000 XL Philips Walita Preta',
        price: 489.0,
        image: '/images/2.png',
      },
    ];

    return { products };
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayStock: stockTool,
  displayProducts: ecommerceTool,
};
