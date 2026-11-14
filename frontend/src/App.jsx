
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Store animals received from backend
  const [animals, setAnimals] = useState([]);

  // Store selected animal
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // Track API loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch animals when the component loads
  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await fetch(
          "/api/animals"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch animals");
        }

        const result = await response.json();

        setAnimals(result.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Unable to load animals. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, []);

  // Handle animal click
  function playAnimalSound(animal) {
    setSelectedAnimal(animal);

    const speech = new SpeechSynthesisUtterance(animal.sound);

    speech.rate = 0.85;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🐾 Mini SoundBox</h1>
        <p>Tap an animal and hear its sound!</p>
      </header>

      <main className="soundbox">
        <h2>Animal Sounds</h2>

        {loading && <p>Loading animals...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="animal-grid">
            {animals.map((animal) => (
              <button
                className={`animal-card ${
                  selectedAnimal?.id === animal.id
                    ? "selected"
                    : ""
                }`}
                key={animal.id}
                onClick={() => playAnimalSound(animal)}
              >
                <span className="animal-emoji">
                  {animal.emoji}
                </span>

                <span>{animal.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="message">
          {selectedAnimal
            ? `You selected ${selectedAnimal.name}! ${selectedAnimal.sound}`
            : "Choose your favourite animal!"}
        </div>
      </main>

      <footer>
        Mini SoundBox | Built with React + Node.js
      </footer>
    </div>
  );
}

export default App;