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

  const [favorites, setFavorites] = useState(() => {
    const savedNotes = localStorage.getItem("favorites");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(()=>{
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

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

  const onHandleRemoveFav = (id) =>{
     setFavorites((prevFav) => prevFav.filter((fav)=>fav.id !== id))
  }


  return (
    <div className=" duration-300 select-none w-full 2xl:max-w-[1240px] xl:max-w-[1090px] lg:max-w-[980px] md:max-w-full flex items-center flex-col xl:pb-12 lg:pb-8 md:pb-6 sm:pb-6 ">
      <Toaster />
      <Navbar
        query={query}
        setQuery={setQuery}
        favorites={favorites}
        onHandleRemove={onHandleRemoveFav}
      />
      <div className="duration-300 lg:mt-2 md:mt-1 flex items-start justify-between md:flex-row sm:flex-col xl:w-11/12 md:w-[97%] sm:w-9/12  2xl:gap-x-3 lg:gap-x-2 md:gap-x-1.5 sm:gap-y-1 ">
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
