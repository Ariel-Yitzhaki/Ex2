// Runs in the browser, needed for useState, useEffect and LocalStorage
"use client";
import { useState, useEffect } from "react";

export default function Settings() {
    const [apiKey, setApiKey] = useState("");
    const [saved, setSaved] = useState(false);

    // Load existing key when page opens
    useEffect(() => {
        const existingKey = localStorage.getItem("apiKey");
        if (existingKey) {
            setApiKey(existingKey);
        }
    }, []);

    // Save key to LocalStorage
    function handleSave(e) {
        e.preventDefault();
        const inputValue = e.target.apiKeyInput.value;
        localStorage.setItem("apiKey", inputValue);
        setApiKey(inputValue);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <main>
            <h1>Settings</h1>
            <form className="card" onSubmit={handleSave}>
                <label>API Key (Groq/OpenAI/Anthropic)</label>
                <input
                    // Hides the key as dots
                    type="password"
                    name="apiKeyInput"
                    defaultValue={apiKey}
                    placeholder="Enter your API key"
                />
                <button type="submit">Save</button>
                {saved && <p>Key saved!</p>}
            </form>
        </main>
    );
}