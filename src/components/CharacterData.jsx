/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import DataLoader from "./DataLoader";
import toast from "react-hot-toast";

function CharacterData({ selectedId, onAddFavorites, isAddedToFavorites }) {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // fetch character
        setCharacter(null);
        setIsLoading(true);
        const { data } = await axios.get(
          `  https://rickandmortyapi.com/api/character/${selectedId}  `
        );
        setCharacter(data);

        // fetch episodes
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodesData } = await axios.get(
          `  https://rickandmortyapi.com/api/episode/${episodesId}  `
        );
        setEpisodes([episodesData].flat().slice(0, 7));
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div className=" bg-white basis-[63%] w-full h-full flex items-center justify-center  mt-2 min-h-[445px] rounded-2xl ">
        <DataLoader />
      </div>
    );
  }

  if (!character || !selectedId)
    return (
      <div className="  bg-white basis-[63%] w-full h-full flex items-center justify-center flex-col  mt-2 pt-4 min-h-[445px] rounded-2xl">
        <p className=" font-semibold text-lg text-gray-800 text-center leading-8 ">
          Please <span className="px-[1px]  font-bold ">Search</span> in movie
          characters or <br />
          <span className="px-[1px] font-bold">Select</span> a character !
        </p>
        {/* <img src="/src/assets/Thinking face.gif" className="w-72 mt-6 " /> */}
      </div>
    );

  return (
    <div className="bg-white rounded-xl  basis-[63%] w-full flex items-start justify-center flex-col mt-2 ">
      <CharacterSubInfo
        character={character}
        onAddFavorites={onAddFavorites}
        isAddedToFavorites={isAddedToFavorites}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterData;

function Episode({ episode }) {
  return (
    <div className=" flex items-center justify-between w-full px-2 py-2 ">
      <p className=" font-medium ">
        {String(episode.id).padStart(2, "0")} . {episode.episode.slice(0, 3)} -{" "}
        {episode.episode.slice(3)} :{" "}
        <span className=" font-bold ">{episode.name}</span>
      </p>
      <p className=" font-medium px-2 py-0.5 bg-gray-700 rounded-lg text-gray-50 ">
        {episode.air_date}
      </p>
    </div>
  );
}

function CharacterSubInfo({ character, onAddFavorites, isAddedToFavorites }) {
  return (
    <div className="  flex items-start justify-start w-full ">
      <img
        className="2xl:size-72 xl:size-60 rounded-xl m-5 "
        src={character.image}
        alt="character photo"
      />
      <div className=" flex flex-col  py-8 px-2 ">
        <div className=" flex items-start justify-around flex-col gap-y-1 ">
          <h3 className="  text-zinc-950 text-[18px] font-semibold ">
            {character.name}
          </h3>
          <p className=" flex items-center text-zinc-700 text-base font-meduim ">
            <span
              className={`  ${
                character.status == "Alive" ? "bg-green-500" : "bg-red-500"
              }  size-2 mr-2 rounded-full inline-block   `}
            ></span>{" "}
            {character.status} - {character.species}
          </p>
        </div>
        <div className=" flex flex-col mt-6 ">
          <p className=" text-[17px] font-semilight text-zinc-500 ">
            Last known location:
          </p>
          <p className=" text-[18px] mt-1 font-bold text-zinc-800 ">
            {character.location.name}
          </p>
        </div>
        {isAddedToFavorites ? (
          <button
            disabled
            className=" flex items-center justify-center gap-x-2  py-2 px-7 rounded-[8px] cursor-default mt-8 bg-gray-300 border-gray-400 border-2  text-gray-700 "
          >
            Already in Favorites !
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 stroke-gray-500 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => onAddFavorites(character)}
            className=" hover:bg-zinc-black hover:shadow-xl p-2 rounded-[8px] cursor-pointer mt-8 bg-zinc-950 text-zinc-100 "
          >
            Add to Favorites !
          </button>
        )}
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(false);
  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  console.log(sortBy, episodes);

  return (
    <div className=" px-6 py-5 w-full ">
      <div className=" flex items-center justify-between ">
        <h4 className=" font-semibold text-2xl py-4 ">List of Episodes:</h4>
        <button
          onClick={() => setSortBy((isSort) => !isSort)}
          className=" p-1.5 bg-zinc-900 rounded-full cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className={`  stroke-white size-3.5 duration-300 ${sortBy ? "rotate-0 " : "rotate-180"}  `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      </div>
      <div className=" max-h-40 w-full overflow-auto pr-5 my-2 ">
        {sortedEpisodes.map((episode) => (
          <Episode key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}
