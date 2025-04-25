import CharactersList from "./components/CharactersList.jsx";
import CharacterData from "./components/CharacterData.jsx";
import Navbar from "./components/Navbar.jsx";
import { useEffect, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [Characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, selectId] = useState(null);

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

  const onHandleSelectCharacter = (id) => {
    selectId((prevId) => (prevId == id ? null : id));
  };

  return (
    <div className=" select-none w-full 2xl:max-w-[1200px] xl:max-w-[1050px]  flex items-center flex-col pb-12 ">
      <Toaster />
      <Navbar query={query} setQuery={setQuery} />
      <div className=" mt-2 bg-blue-200/ flex items-start justify-between w-11/12 gap-x-3  ">
        <CharactersList
          selectedId={selectedId}
          Characters={Characters}
          isLoading={isLoading}
          onSelectCharacter={onHandleSelectCharacter}
        />
        <CharacterData selectedId={selectedId} />
      </div>
    </div>
  );
}

export default App;
