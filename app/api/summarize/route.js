export async function POST(request) {
    // Get the description and API key from the request
    const { description, apiKey } = await request.json();

    // Handle empty descriptions
    if (!description) {
        return Response.json({ summary: "No description available for this project." });
    }
    // Send to Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: `Summarize this project in 2-3 short sentences: ${description}`
                }
            ],
            max_tokens: 100
        })
    });

    const data = await response.json();

    // Check if there's an error from Groq
    if (data.error) {
        return Response.json({ error: data.error.message }, { status: 400 });
    }
    const summary = data.choices[0].message.content;

    return Response.json({ summary });
}