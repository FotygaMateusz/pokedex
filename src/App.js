import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import "./Pokemon/styles.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");

  const getPokemonList = async (url) => {
    const { data } = await axios.get(
      url || "https://pokeapi.co/api/v2/pokemon"
    );
    const promises = await Promise.all(
      data.results.map(({ name }) =>
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      )
    );
    const responseData = await Promise.all(promises.map(({ data }) => data));
    setNextUrl(data.next);
    setPokemonList([...pokemonList, ...responseData]);
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <>
      <div
        style={{
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        {pokemonList &&
          pokemonList.length &&
          pokemonList.map((item) => (
            <Fragment key={item.id}>
              <Pokemon {...item} />
            </Fragment>
          ))}
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div
          className="button"
          onClick={() => {
            getPokemonList(nextUrl);
          }}
        >
          Load More
        </div>
      </div>
    </>
  );
}

export default App;
