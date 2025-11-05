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

  // Get the endpoint from the query parameter
  const endpoint = req.query.endpoint || req.query.path;
  
  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint parameter is required' });
  }

  try {
    // Construct FPL API URL
    const fplUrl = `https://fantasy.premierleague.com/api/${endpoint}`;
    console.log('Fetching from:', fplUrl);
    
    const response = await fetch(fplUrl, {
      headers: {
        'User-Agent': 'FPL-Transfer-Advisor/1.0'
      }
    });
    
    if (!response.ok) {
      console.error('FPL API error:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: `FPL API returned ${response.status}`,
        statusText: response.statusText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from FPL API',
      message: error.message,
      stack: error.stack
    });
  }
}
