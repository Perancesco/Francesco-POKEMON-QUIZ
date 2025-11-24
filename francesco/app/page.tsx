import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export default function Home() {
  return (
    <div className="home-page">
      <div className="glass-card text-center">
        <h1 className="mb-4">Pokémon Project</h1>
        <h5 className="card-title">Francesco Alexander</h5>
        <p className="card-text">535240156</p>
        <a href="/explore" className="btn btn-primary mt-3">Explore Pokémon</a>
      </div>
    </div>
  );
}
