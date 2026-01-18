export async function POST(request) {
    // Get the description and API key from the request
    const { description, name, apiKey } = await request.json();

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
                    role: "system",
                    content: "You explain GitHub projects in plain English in up to 3 lines. Be direct and concise. Never mention that you're summarizing or that information is limited. Just explain what the project does based on what you know."
                },
                {
                    role: "user",
                    content: `Project: ${name}\nDescription: ${description}`
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