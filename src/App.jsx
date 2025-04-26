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
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `   https://rickandmortyapi.com/api/character/?name=${query}     `,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  const onHandleSelectCharacter = (id) => {
    selectId((prevId) => (prevId == id ? null : id));
  };

  const onAddFavorites = (character) => {
    setFavorites((prevFav) => [...prevFav, character]);
    toast.success(`  ${character.name} added to favorites!  `);
  };

  const isAddedToFavorites = favorites.find((fav) => fav.id == selectedId);

  return (
    <div className=" select-none w-full 2xl:max-w-[1200px] xl:max-w-[1050px]  flex items-center flex-col pb-12 ">
      <Toaster />
      <Navbar query={query} setQuery={setQuery} favorites={favorites} />
      <div className=" mt-2 bg-blue-200/ flex items-start justify-between w-11/12 gap-x-3  ">
        <CharactersList
          selectedId={selectedId}
          Characters={Characters}
          isLoading={isLoading}
          onSelectCharacter={onHandleSelectCharacter}
        />
        <CharacterData
          selectedId={selectedId}
          onAddFavorites={onAddFavorites}
          isAddedToFavorites={isAddedToFavorites}
        />
      </div>
    </div>
  );
}

export default App;
