// Builds GitHub API URL, fetches trending AI/ML repos, parses response into a JS object, and returns it
export async function GET() {
    const url = "https://api.github.com/search/repositories?q=topic:machine-learning+topic:artificial-intelligence&sort=stars&order=desc&per_page=10";

    const response = await fetch(url);
    // Parses the JSON response from the GitHub API
    const data = await response.json();
    // Creates a response to return with the fetched data in JSON format
    return Response.json(data);
}
