# roast-me

roast-me is a dual-mode humor generator that uses AI to create personalized roasts and stand-up comedy bits. The application features two distinct modes: RoastMe for generating clever roasts based on text descriptions or photos, and Stand-Up Comedian for creating comedy bits in the style of famous comedians.

![roast-me Screenshot](https://placeholder.svg?height=400&width=800)

## Features

### RoastMe Mode 🔥
- Input text descriptions or upload photos
- Choose roast severity (mild, medium, or savage)
- Get AI-generated roasts tailored to your input
- Share or copy the results

### Stand-Up Comedian Mode 🎭
- Enter any topic for comedy
- Select from 10 different comedian styles
- Get custom comedy bits written in that comedian's unique style
- Share or save your favorite bits

### Additional Features
- Dark/Light theme toggle
- Responsive design for all devices
- Interactive feedback system
- Copy to clipboard functionality

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- AI SDK with OpenAI integration
- Vercel for deployment

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/humorai.git
   cd humorai
   ```
2. Install dependencies:
    ```bash
     npm install
     # or
     yarn install
     # or 
     pnpm install 
    ```
3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
    ```bash
    OPENAI_API_KEY=your_openai_api_key
    ```
4. Run the development server:

```shellscript
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev

```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
