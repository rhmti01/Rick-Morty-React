import CharactersList from "./components/CharactersList.jsx";
import CharacterData from "./components/CharacterData.jsx";
import Navbar from "./components/Navbar.jsx";
import { episodes, character } from "../data/data.js";
import { useEffect, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [Characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `   https://rickandmortyapi.com/api/character/?name=${query}     `
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query]);

  return (
    <div className=" select-none w-full 2xl:max-w-[1200px] xl:max-w-[1050px]  flex items-center flex-col pb-12 ">
      <Toaster />
      <Navbar query={query} setQuery={setQuery} />
      <div className=" mt-5 bg-blue-200/ flex items-start justify-between w-11/12 gap-x-4  ">
        <CharactersList Characters={Characters} isLoading={isLoading} />
        <CharacterData episodes={episodes} character={character} />
      </div>
    </div>
  );
}

export default App;
