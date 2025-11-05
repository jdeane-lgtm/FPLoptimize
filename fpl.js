// Vercel serverless function to proxy FPL API requests
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get the path from query parameter
  const { path } = req.query;
  
  if (!path) {
    return res.status(400).json({ error: 'Path parameter is required' });
  }

  try {
    // Fetch from FPL API
    const fplUrl = `https://fantasy.premierleague.com/api/${path}`;
    const response = await fetch(fplUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `FPL API returned ${response.status}` 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from FPL API',
      message: error.message 
    });
  }
}
