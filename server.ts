import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Lumi AI Tutor Chat Endpoint
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  const { message, history, language, stage } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!ai) {
    // Graceful fallback response handled by client or fallback route
    return res.json({
      reply: null,
      fallbackNeeded: true,
      reason: 'No API key configured',
    });
  }

  try {
    const prompt = `You are Lumi, a friendly, encouraging, and highly knowledgeable AI Language Tutor inside the LinguaLearn AI learning application.
The user is currently learning "${language || 'English'}" at the "${stage || 'Basic'}" level.
User message: "${message}"

Instructions:
- Keep your tone warm, playful, and easy to understand.
- If the user asks for explanations (e.g. grammar rules, tenses, nouns), explain simply with clear bullet points and everyday examples.
- If relevant to English learning with Indian/Native learners, you can include Telugu or Hindi equivalents/meanings when helpful.
- If the user asks you to correct a sentence, clearly state the Correct Sentence, highlight the error, and explain why.
- Provide a quick 1-question practice challenge at the end of explanations if appropriate.
- Keep the response concise and formatted with markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const reply = response.text || 'Keep learning! You are doing great.';
    return res.json({ reply, fallbackNeeded: false });
  } catch (err: any) {
    console.error('Lumi chat error:', err?.message || err);
    return res.json({
      reply: null,
      fallbackNeeded: true,
      error: err?.message,
    });
  }
});

// 2. Neural Translation Endpoint
app.post('/api/gemini/translate', async (req: Request, res: Response) => {
  const { text, fromLanguage, toLanguage } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (!ai) {
    return res.json({
      translation: null,
      fallbackNeeded: true,
    });
  }

  try {
    const prompt = `Translate the following sentence accurately from ${fromLanguage} to ${toLanguage}.
Original text: "${text}"

Respond in JSON format with these exact keys:
{
  "translation": "The exact translated text",
  "transliteration": "Phonetic pronunciation guide if non-English, or key pronunciation tip",
  "notes": "Brief grammatical note explaining tense or key vocabulary",
  "synonyms": ["alternate translation 1", "alternate translation 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      ...parsed,
      fallbackNeeded: false,
    });
  } catch (err: any) {
    console.error('Translation error:', err?.message || err);
    return res.json({
      translation: null,
      fallbackNeeded: true,
      error: err?.message,
    });
  }
});

// 3. NLP Analysis & Grammar Correction Endpoint
app.post('/api/gemini/nlp-analyze', async (req: Request, res: Response) => {
  const { sentence, targetLanguage } = req.body;
  if (!sentence) {
    return res.status(400).json({ error: 'Sentence is required' });
  }

  if (!ai) {
    return res.json({
      analysis: null,
      fallbackNeeded: true,
    });
  }

  try {
    const prompt = `Perform comprehensive Natural Language Processing (NLP) and grammatical analysis on the following sentence:
"${sentence}"
Language context: ${targetLanguage || 'English'}

Respond with JSON adhering to this schema:
{
  "tokens": [
    { "word": "word1", "pos": "NN", "posLabel": "Noun", "lemma": "root", "explanation": "description" }
  ],
  "isGrammaticallyCorrect": true or false,
  "correctedSentence": "corrected sentence if any, or original if already correct",
  "errors": [
    { "errorType": "Subject-Verb Agreement / Tense / Spelling / Punctuation", "explanation": "why it is wrong", "suggestion": "what it should be" }
  ],
  "syntaxAnalysis": {
    "subject": "identified subject",
    "verb": "identified main verb",
    "object": "identified object or predicate",
    "sentenceType": "Declarative / Interrogative / Imperative / Exclamatory",
    "tense": "Present / Past / Future / etc."
  },
  "readability": {
    "score": "Easy / Medium / Complex",
    "gradeLevel": "Grade 3-5",
    "sentiment": "Positive / Neutral / Encouraging"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      analysis: parsed,
      fallbackNeeded: false,
    });
  } catch (err: any) {
    console.error('NLP analyze error:', err?.message || err);
    return res.json({
      analysis: null,
      fallbackNeeded: true,
      error: err?.message,
    });
  }
});

// Setup Vite in Dev or Static in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌍 LinguaLearn AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
