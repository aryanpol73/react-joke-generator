import { useState, useEffect } from "react";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPunchline, setShowPunchline] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setShowPunchline(false);

    try {
      const response = await fetch(
        "https://v2.jokeapi.dev/joke/Programming?type=twopart"
      );

      const data = await response.json();

      if (data.type === "twopart") {
        setJoke({
          setup: data.setup,
          punchline: data.delivery,
        });
      } else {
        setJoke({
          setup: data.joke,
          punchline: "",
        });
      }
    } catch (error) {
      console.log("Error fetching joke:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const handleButtonClick = () => {
    if (!showPunchline) {
      setRevealing(true);

      setTimeout(() => {
        setShowPunchline(true);
        setRevealing(false);
      }, 800);
    } else {
      fetchJoke();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Programming Joke Generator</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          joke && (
            <>
              <h3 style={styles.setup}>{joke.setup}</h3>

              {showPunchline && joke.punchline && (
                <p style={styles.punchline}>{joke.punchline}</p>
              )}
            </>
          )
        )}

        <button
          onClick={handleButtonClick}
          style={styles.button}
          disabled={revealing}
        >
          {revealing
            ? "Revealing..."
            : showPunchline
            ? "Next Joke"
            : "Reveal Punchline"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "15px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  title: {
    marginBottom: "20px",
  },
  setup: {
    fontWeight: "600",
    fontSize: "18px",
  },
  punchline: {
    marginTop: "15px",
    fontSize: "20px",
    color: "#4f46e5",
    fontWeight: "600",
  },
  button: {
    marginTop: "25px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4f46e5",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default App;