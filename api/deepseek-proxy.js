// File: api/deepseek-proxy.js (Vercel Serverless Function)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const deepseekKey = 'sk-IhNww1Cgcp5ycorA1geu9J7MJa9z1o45XWKY0nb8eWDJczco';

  try {
    const response = await fetch('https://chatapi.littlewheat.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekKey}`,
      },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to DeepSeek API', details: error.message });
  }
}
