"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NewsCard from "./components/NewsCard";

// Fetches repos from our API when page loads, stores them in state, and renders a NewsCard for each
export default function Home() {
    // creates varialbe repos (empty array) and function setRepos to update it
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch("/api/github")
            .then(response => response.json())
            .then(data => setRepos(data.items));
    }, []); // [] means "only run once"

    return (
        <main>
            <h1>
                The Latest AI Trends
            <Link href="/settings">
                <button className="settings-btn">Settings</button>
            </Link>
            </h1>
            {repos.map(repo => (
                <NewsCard key={repo.id} repo={repo} />
            ))}
        </main>
    );
}
