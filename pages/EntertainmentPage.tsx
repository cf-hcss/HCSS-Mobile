
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { 
    RefreshIcon,
    PuzzlePieceIcon,
    LightBulbIcon,
    PhotoIcon,
    ExclamationTriangleIcon
} from '../components/icons.tsx';
import { QUOTES, Quote } from '../quotes.ts';
import { BRAIN_TEASERS, BrainTeaser } from '../brain-teasers.ts';
import { Modality } from '@google/genai';
import { gemini, isAiConfigured } from '../api.ts';

// --- Quote of the Day ---
const getRandomQuote = (currentQuote: Quote | null = null): Quote => {
    let newQuote;
    if (QUOTES.length === 1) return QUOTES[0];
    do {
        newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    } while (QUOTES.length > 1 && newQuote.text === currentQuote?.text);
    return newQuote;
};

const QuoteOfTheDay: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState<Quote>(() => getRandomQuote());
    const getNewQuote = useCallback(() => {
        setCurrentQuote(prevQuote => getRandomQuote(prevQuote));
    }, []);

    return (
        <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quote of the Day</h3>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 min-h-[12rem] flex flex-col justify-center">
                <figure>
                    <blockquote className="text-xl italic font-medium text-gray-700 relative">
                        <span className="absolute -left-4 -top-2 text-6xl text-gray-100 font-serif">“</span>
                        {currentQuote.text}
                    </blockquote>
                    <figcaption className="mt-4 text-right text-gray-500">
                        — {currentQuote.author ?? 'Unknown'}
                    </figcaption>
                </figure>
                 <button
                    onClick={getNewQuote}
                    className="group flex items-center justify-center mx-auto mt-6 px-5 py-2.5 bg-brand-burgundy text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all"
                    aria-label="Get a new quote"
                >
                    <RefreshIcon className="h-5 w-5 mr-2 group-hover:animate-spin-once" />
                    New Quote
                </button>
            </div>
        </section>
    );
};


// --- Daily Brain Teaser ---
const DailyBrainTeaser: React.FC = () => {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    
    const dailyTeaser: BrainTeaser = useMemo(() => {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        return BRAIN_TEASERS[dayOfYear % BRAIN_TEASERS.length];
    }, []);

    return (
        <section className="mb-8">
             <div className="flex items-center justify-center mb-4">
                <PuzzlePieceIcon className="h-6 w-6 mr-2 text-gray-800" />
                <h3 className="text-xl font-bold text-gray-800">Daily Brain Teaser</h3>
             </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 min-h-[12rem] flex flex-col justify-between">
                <p className="text-lg text-gray-700 text-left">{dailyTeaser.question}</p>
                <div>
                    {isAnswerVisible && (
                        <p className="text-lg font-bold text-brand-burgundy text-left mt-4 p-3 bg-slate-100 rounded-md">
                            Answer: {dailyTeaser.answer}
                        </p>
                    )}
                    <button
                        onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                        className="group flex items-center justify-center mt-4 px-5 py-2.5 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
                    >
                       <LightBulbIcon className="h-5 w-5 mr-2" />
                       {isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- AI Image Creator ---
const AiImageCreator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isGenerating || !isAiConfigured || !gemini) return;
        
        setIsGenerating(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const fullPrompt = `A safe-for-work, school-appropriate, photorealistic image of: ${prompt}`;
            
            const response = await gemini.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: {
                parts: [{ text: fullPrompt }],
              },
              config: {
                  responseModalities: [Modality.IMAGE],
              },
            });
            
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                setGeneratedImage(imageUrl);
                return;
              }
            }
            throw new Error("No image data found in response.");

        } catch (err) {
            console.error("Image generation failed:", err);
            setError("Sorry, I couldn't create that image. Please try a different prompt.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section>
             <div className="flex items-center justify-center mb-4">
                <PhotoIcon className="h-6 w-6 mr-2 text-gray-800" />
                <h3 className="text-xl font-bold text-gray-800">AI Image Creator</h3>
             </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
                <form onSubmit={handleGenerateImage} className="space-y-4">
                     <p className="text-sm text-gray-600">Describe an image you want to create. Be creative and have fun!</p>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., A robot playing chess with a cat on Mars"
                        className="w-full bg-slate-100 text-gray-800 rounded-md border-gray-300 focus:ring-brand-burgundy focus:border-brand-burgundy disabled:bg-slate-200 disabled:cursor-not-allowed"
                        disabled={isGenerating || !isAiConfigured}
                    />
                    <button
                        type="submit"
                        className="w-full px-5 py-2.5 bg-brand-burgundy text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                        disabled={isGenerating || !prompt.trim() || !isAiConfigured}
                    >
                        {isGenerating ? 'Creating...' : 'Generate Image'}
                    </button>
                </form>

                <div className="mt-4 min-h-[256px] bg-slate-100 rounded-lg flex items-center justify-center border border-gray-200">
                    {!isAiConfigured ? (
                        <div className="p-4 text-center text-yellow-700">
                            <ExclamationTriangleIcon className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                            <p className="font-semibold text-sm">This feature is not available.</p>
                            <p className="text-xs">The AI service has not been configured.</p>
                        </div>
                    ) : isGenerating ? (
                         <div className="flex flex-col items-center text-gray-500">
                             <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-brand-burgundy"></div>
                             <p className="mt-2">Generating your masterpiece...</p>
                         </div>
                    ) : error ? (
                        <p className="text-red-500 p-4">{error}</p>
                    ) : generatedImage ? (
                        <img src={generatedImage} alt={prompt} className="rounded-lg max-w-full max-h-[50vh] object-contain"/>
                    ) : null }
                </div>
            </div>
        </section>
    );
};


const EntertainmentPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-navy mb-8">Entertainment Zone</h2>
      
      <div className="space-y-8">
        <AiImageCreator />
        <DailyBrainTeaser />
        <QuoteOfTheDay />
      </div>
    </div>
  );
};

export default EntertainmentPage;
