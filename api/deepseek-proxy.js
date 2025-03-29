
export default async function handler(req, res) {
  console.log("Incoming request method:", req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const response = await fetch('https://chatapi.littlewheat.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-IhNww1Cgcp5ycorA1geu9J7MJa9z1o45XWKY0nb8eWDJczco`,
      },
      body: JSON.stringify(req.body),
    });

    const result = await response.json();
    console.log("DeepSeek response:", result);
    res.status(response.status).json(result);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: 'Failed to connect to DeepSeek API', details: error.message });
  }
}
