import CharactersList from "./components/CharactersList.jsx";
import CharacterData from "./components/CharacterData.jsx";
import Navbar from "./components/Navbar.jsx";
import { useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import userCharacters from "./hooks/userCharacters.js";
import userLocalStorage from "./hooks/userLocalStorage.js";

function App() {
  const [query, setQuery] = useState("");
  const { Characters, isLoading } = userCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectedId, selectId] = useState(null);

  const [favorites,setFavorites] = userLocalStorage("favorites",[])

  const onHandleSelectCharacter = (id) => {
    selectId((prevId) => (prevId == id ? null : id));
  };

  const onAddFavorites = (character) => {
    setFavorites((prevFav) => [...prevFav, character]);
    toast.success(`  ${character.name} added to favorites!  `);
  };

  const isAddedToFavorites = favorites.find((fav) => fav.id == selectedId);

  const onHandleRemoveFav = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  return (
    <div className="  duration-300 select-none w-full 2xl:max-w-[1240px] xl:max-w-[1090px] lg:max-w-[980px] md:max-w-full flex items-center flex-col xl:pb-12 lg:pb-8 md:pb-6 sm:pb-14 xs:pb-10 xx:pb-8 ">
      <Toaster />
      <Navbar
        query={query}
        setQuery={setQuery}
        favorites={favorites}
        onHandleRemove={onHandleRemoveFav}
      />
      <div className="duration-300 lg:mt-2 md:mt-1 flex items-start justify-between md:flex-row xx:flex-col xl:w-11/12 md:w-[97%] sm:w-9/12 xs:w-10/12 xx:w-full 2xl:gap-x-3 lg:gap-x-2 md:gap-x-1.5 sm:gap-y-1 xs:gap-y-1 xx:gap-y-0 ">
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
