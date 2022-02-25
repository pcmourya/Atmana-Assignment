import "./App.css";
import { useState, useEffect } from "react";
import Category from "./Category";
import Block from "./Block";

function App() {
  const [category, setCategory] = useState([]);
  const [joke, setJoke] = useState("animal");
  const [newJoke, setNewJoke] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("https://api.chucknorris.io/jokes/categories").then((res) =>
        res.json()
      ),
    ]).then(
      ([categoryData]) => {
        setCategory(categoryData);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(
        `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
      ).then((res) => res.json()),
    ]).then(([jokesData]) => {
      setJoke(jokesData.value);
      setNewJoke("");
    });
  }, [selectedCategory]);

  // useEffect(() => {
  //   Promise.all([
  //     fetch("https://api.chucknorris.io/jokes/random").then((res) =>
  //       res.json()
  //     ),
  //   ]).then((randomJokeData) => {
  //     setNewJoke(randomJokeData);
  //   });
  // }, [newJoke]);

  function handleItemButton(event) {
    setSelectedCategory(event.target.value);
  }

  function fetchAPI() {
    return fetch("https://api.chucknorris.io/jokes/random").then((res) =>
      res.json()
    );
  }

  function handleLink() {
    fetchAPI().then((result) => {
      console.log("Result");
      setJoke("");
      setNewJoke(result.value);
    });
  }

  return (
    <div>
      <h1>Chuck Norries</h1>
      <Category category={category} handleItemButton={handleItemButton} />
      <br />
      <br />
      <br />
      <p style={{ textAlign: "center" }}>
        Selected Category :{" "}
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </p>
      <Block joke={newJoke ? newJoke : joke} />
      <button className="newJoke" onClick={handleLink}>
        New Joke
      </button>
    </div>
  );
}

export default App;
