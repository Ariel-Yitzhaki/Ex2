// Receives a repo object, displays its name, description, and star count in a card format
export default function NewsCard({repo}) {
    return (
        // Fields from the API
        <div className="card">
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <span>Stars: {repo.stargazers_count}</span>
        </div>
    );
}