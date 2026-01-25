# AI News Aggregator

A web application that displays trending AI/ML projects from GitHub with AI-powered summaries.

## Live Website

https://ex2-eosin.vercel.app/

## Features

- Displays trending AI/ML GitHub repositories from the last 24 hours
- AI-powered project summaries using Groq API
- Settings page to save your API key
- 5-minute caching to avoid API rate limits

## Tech Stack

- **Framework:** Next.js
- **Frontend:** React
- **Styling:** Vanilla CSS
- **AI Provider:** Groq (Llama 3.1)
- **Deployment:** Vercel

## APIs Used

- **GitHub API** - Fetches trending repositories
- **Groq API** - Generates AI summaries
- 
## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/github` | GET | Fetches trending AI/ML repos from GitHub |
| `/api/summarize` | POST | Sends project description to Groq for summary |

## Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000
5. Add your Groq API key in Settings (get one free at https://console.groq.com/keys)

## Author

Ariel Yitzhaki
