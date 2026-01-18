// Receives a repo object, displays its name, description, and star count in a card format
"use client";
import { useState } from "react";
export default function NewsCard({repo}) {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSummarize() {
        // Get API key from localStorage
        const apiKey = localStorage.getItem("apiKey");
        if (!apiKey) {
            alert("Please add your API key in Settings");
            return;
        }

        setLoading(true);

        // Call our summarize API route, sending the repo description and API key
        const response = await fetch("/api/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                description: repo.description,
                apiKey: apiKey
            })
        });
        
        // Gets the summary from the response, updates state, and stops loading
        const data = await response.json();
        console.log("Received data:", data);
        if (data.error) {
            alert("Error: " + data.error);
            setLoading(false);
            return;
        }
        setSummary(data.summary);
        setLoading(false);
    }

    return (
        <div className="card-wrapper">
            {/* Fields from the API */}
            <div className="card">
                <h2>{repo.name}</h2>
                <p>{repo.description}</p>
                <span>⭐ {repo.stargazers_count}</span>
            </div>
            {/* Summarize button, disabled while loading and switches to "Summarizing..." */}
            <button onClick={handleSummarize} disabled={loading}> 
                {loading ? "Summarizing..." : "Summarize"}
            </button>
            {/* only show if summary has a value */}
            {summary && <p className="summary">{summary}</p>}
        </div>    
    );
}