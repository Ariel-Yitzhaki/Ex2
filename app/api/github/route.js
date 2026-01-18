// Cache storage
let cache = {
    data: null,
    timestamp: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Builds GitHub API URL, fetches trending AI/ML repos, parses response into a JS object, and returns it
export async function GET() {
    const now = Date.now();

    // If cache exists and is less than 5 minutes old, return it
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
        return Response.json(cache.data);
    }
    // Otherwise fetch fresh data

    // Calculate date 24 hours ago
    const yesterday = new Date(now - 24 * 60 * 60 * 1000);
    const dateString = yesterday.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const url = `https://api.github.com/search/repositories?q=topic:machine-learning+topic:artificial-intelligence+pushed:>${dateString}&sort=stars&order=desc&per_page=10`;

    const response = await fetch(url);
    // Parses the JSON response from the GitHub API
    const data = await response.json();

     // Store in cache
    cache.data = data;
    cache.timestamp = now;

    // Creates a response to return with the fetched data in JSON format
    return Response.json(data);
}
