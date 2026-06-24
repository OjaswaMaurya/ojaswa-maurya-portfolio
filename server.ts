import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// Note: Port MUST be 3000
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client lazily/safely as requested in constraints
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // API endpoint to generate content using Gemini
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const { prompt, systemInstruction, modelConfig, model } = req.body;
      
      let ai;
      try {
        ai = getGeminiClient();
      } catch (err: any) {
        return res.status(503).json({
          error: 'Gemini API status: OFFLINE. Please configure your GEMINI_API_KEY in Settings > Secrets.'
        });
      }

      const activeModel = model || 'gemini-3.5-flash';

      const response = await ai.models.generateContent({
        model: activeModel,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are an expert developer assistant specialized in prompt engineering, IoT code generation, and AI architectures.",
          temperature: modelConfig?.temperature ?? 0.7,
          topP: modelConfig?.topP ?? 0.95,
          topK: modelConfig?.topK ?? 40,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || 'Error executing intelligence query.' });
    }
  });

  // Serve static UI / Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve build outputs directly from the dist folder
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SYS] Orange Cyber-Telemetry Server active at http://0.0.0.0:${PORT}`);
  });
}

startServer();
