import { useEffect, useState } from "react";
import { useJoke } from "./hooks/useJoke";

function App() {
  const { joke, loading, error, fetchJoke, goToPrevious } = useJoke();

  const [showPunchline, setShowPunchline] = useState(false);
  const [category, setCategory] = useState("Programming");

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    fetchJoke(category);
    setShowPunchline(false);
  }, [category]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleNext = () => {
    if (!showPunchline) {
      setShowPunchline(true);
    } else {
      setShowPunchline(false);
      fetchJoke(category);
    }
  };

  const handlePrevious = () => {
    const didNavigate = goToPrevious(category);
    if (didNavigate) {
      setShowPunchline(true);
    }
  };

  const saveJoke = () => {
    if (!joke) return;

    const exists = favorites.some(
      (fav) =>
        fav.setup === joke.setup &&
        fav.punchline === joke.punchline
    );

    if (!exists) {
      setFavorites([...favorites, joke]);
    }
  };

  const removeJoke = (index) => {
    const updated = favorites.filter((_, i) => i !== index);
    setFavorites(updated);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Dev Humor Hub</h1>

      {/* Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: "20px", padding: "5px" }}
      >
        <option value="Programming">Programming</option>
        <option value="Dark">Dark</option>
        <option value="Pun">Pun</option>
        <option value="Misc">Misc</option>
        <option value="Any">Any</option>
      </select>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Joke Display */}
      {!loading && joke && (
        <>
          <h3>{joke.setup}</h3>
          {showPunchline && <p>{joke.punchline}</p>}

          <button
            onClick={saveJoke}
            style={{ marginTop: "10px", padding: "6px 10px" }}
          >
            ❤️ Save Joke
          </button>
        </>
      )}

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleNext}
          style={{ padding: "8px 12px", marginRight: "10px" }}
        >
          {showPunchline ? "Next Joke" : "Reveal Punchline"}
        </button>

        <button
          onClick={handlePrevious}
          style={{ padding: "8px 12px" }}
        >
          Previous Joke
        </button>
      </div>

      {/* Favorites Section */}
      <hr style={{ margin: "30px 0" }} />

      <h2>Saved Jokes</h2>

      {favorites.length === 0 && <p>No saved jokes yet.</p>}

      {favorites.map((fav, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <strong>{fav.setup}</strong>
          <p>{fav.punchline}</p>
          <button
            onClick={() => removeJoke(index)}
            style={{ padding: "4px 8px" }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;