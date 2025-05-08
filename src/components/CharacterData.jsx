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
      <div className="  bg-white lg:basis-[63%] md:basis-[60%] sm:basis-full xs:basis-full xx:basis-[95%] sm:w-[97%] xs:w-full xx:w-[95%] mx-auto md:w-full h-full flex items-center justify-center  mt-2 sm:min-h-[445px] xs:min-h-[380px] xx:min-h-[280px] rounded-xl ">
        <DataLoader />
      </div>
    );
  }

  if (!character || !selectedId)
    return (
      <div className="  bg-white lg:basis-[63%] md:basis-[60%] sm:basis-full xs:basis-full xx:basis-full sm:w-[97%] xs:w-full xx:w-[95%] mx-auto md:w-full  h-full flex items-center justify-center flex-col  mt-2 md:pt-4 sm:pt-5 xs:pt-4 xx:pt-5 md:min-h-[445px] sm:min-h-[300px] xs:min-h-[280px] xx:min-h-[250px] rounded-xl">
        <p className=" font-semibold 2xl:text-lg xl:text-[16.5px] md:text-base sm:text-[15.5px] xs:text-[15px] xx:text-[15px] text-gray-800 text-center leading-8 ">
          Please <span className="px-[1px]  font-bold ">Search</span> in movie
          characters or <br />
          <span className="px-[1px] font-bold">Select</span> a character !
        </p>
        <img
          src="./assets/Thinking-face.gif"
          className="2xl:w-68 xl:w-60 lg:w-52 md:w-44 sm:w-52 xs:w-48 xx:w-44 mt-6  "
        />
      </div>
    );

  return (
    <div className="bg-white rounded-xl  lg:basis-[63%] md:basis-[60%] xs:basis-full xx:basis-full sm:w-[97%] xs:w-full xx:w-[95%] mx-auto md:w-full h-full flex items-start justify-center flex-col mt-2 ">
      <CharacterSubInfo
        character={character}
        onAddFavorites={onAddFavorites}
        isAddedToFavorites={isAddedToFavorites}
      />
      <ButtonXXScreen
        isAddedToFavorites={isAddedToFavorites}
        onAddFavorites={onAddFavorites}
        character={character}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterData;

function CharacterSubInfo({ character, onAddFavorites, isAddedToFavorites }) {
  return (
    <div className=" flex items-start justify-start w-full  ">
      <img
        className="2xl:size-68 xl:size-56 lg:size-48 md:size-48 sm:size-40 xs:size-36 xx:size-28 rounded-xl xl:m-5 lg:m-6 md:m-4.5 sm:m-5 xs:m-4 xx:m-3 "
        src={character.image}
        alt="character photo"
      />
      <div className=" xx:w-96  flex flex-col  2xl:py-8 xl:py-6 lg:py-7 md:py-6 sm:py-5 xs:py-4 xx:py-3.5 px-2 ">
        <div className=" flex items-start justify-around flex-col gap-y-1 ">
          <h3 className="  text-zinc-950 2xl:text-[20px] xl:text-[19px] lg:text-[17.5px] md:text-[17px] sm:text-[18px] xs:text-[17px] xx:text-[16.5px] font-semibold ">
            {character.name}
          </h3>
          <p className=" flex items-center text-zinc-600 2xl:text-base xl:text-[15.5px] lg:text-[15px] md:text-[15px] sm:text-[15.5px] xs:text-[15px] xx:text-[14.5px] font-[500] md:mt-0 sm:mt-1 xs:mt-0.5 xx:mt-0.5 ">
            <span
              className={`  ${
                character.status == "Alive" ? "bg-green-500" : "bg-red-500"
              }  size-2 mr-2 rounded-full inline-block   `}
            ></span>{" "}
            {character.status} - {character.species}
          </p>
        </div>
        <div className=" flex flex-col 2xl:mt-6 xl:mt-4 lg:mt-3 md:mt-3 sm:mt-3 xs:mt-2.5 xx:mt-2 ">
          <p className=" 2xl:text-[17px] xl:text-[16px] lg:text-[15.5px] md:text-[15px] sm:text-[15.5px] xs:text-[15px] xx:text-[14.5px] font-semilight text-zinc-500 ">
            Last known location:
          </p>
          <p className=" 2xl:text-[17px] xl:text-[16px] lg:text-[15.5px] md:text-[15px] sm:text-[15.5px] xs:text-[15px] xx:text-[14.5px] mt-1 font-semibold text-zinc-800 ">
            {character.location.name}
          </p>
        </div>
        {isAddedToFavorites ? (
          <button
            disabled
            className=" xs:flex xx:hidden 2xl:text-base xl:text-[15px] lg:text-[15px] md:text-[14.5px] sm:text-[15px] xs:text-[14.5px] xx:text-[14px] hover:bg-zinc-900  items-center lg:justify-center xx:justify-center lg:gap-x-2 md:gap-x-1 sm:gap-x-1 xx:gap-x-0.5 py-2 xl:px-7 lg:px-5 md:px-2 sm:px-2 xs:px-1.5 xx:px-1 2xl:max-w-[260px] xl:max-w-[240px] lg:max-w-[230px] md:max-w-[185px] sm:max-w-[192px] xs:max-w-[180px] xx:max-w-[175px] rounded-[8px] cursor-default xl:mt-8 lg:mt-6 md:mt-5 sm:mt-3 xs:mt-2.5 xx:mt-2 bg-zinc-900 border-2  border-zinc-900  text-white font-medium "
          >
            Already in Favorites !
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="  lg:size-6 md:size-5 sm:size-6 xs:size-5 xx:size-5 stroke-gray-200 "
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
            className=" xs:inline xx:hidden 2xl:text-base xl:text-[15px] lg:text-[15px] md:text-[14.5px] sm:text-[15px] xs:text-[14.5px] xx:text-[14px] hover:bg-zinc-800 duration-200 shadow-2xl shadow-zinc-200 py-[7px] xl:px-7 lg:px-5 md:px-0 sm:px-0 xs:px-0 xx:px-0  2xl:max-w-[210px] xl:max-w-[180px] lg:max-w-[165px] md:max-w-36 sm:max-w-36 xs:max-w-32 xx:max-w-32 rounded-[8px] cursor-pointer bg-zinc-300 border-2 border-zinc-400 xl:mt-8 lg:mt-6 md:mt-5 sm:mt-3 xs:mt-2.5 xx:mt-2 text-zinc-700 hover:text-white hover:border-zinc-800 font-medium "
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

  return (
    <div className=" px-6 2xl:py-4 xl:py-3.5 lg:py-3 md:py-3 md:pb-0 sm:pb-3 xs:pb-2.5  w-full ">
      <div className=" flex items-center justify-between ">
        <h4 className=" font-semibold 2xl:text-2xl xl:text-[22px] lg:text-[21px] md:text-[20px] sm:text-[20px] xs:text-[19px] xx:text-[18px] 2xl:py-4 xl:py-2.5 lg:py-2.5 md:py-2 sm:py-2 xs:py-1.5 xx:py-2 ">
          List of Episodes:
        </h4>
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
            className={`  stroke-white xl:size-3.5 lg:size-3 md:size-3 sm:size-3 xs:size-3 xx:size-3 duration-300 ${
              sortBy ? "rotate-0 " : "rotate-180"
            }  `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      </div>
      <div className=" lg:max-h-40 md:max-h-32 sm:max-h-28 xs:max-h-28 xx:max-h-28 w-full overflow-auto xl:pr-5 lg:pr-4 md:pr-3  my-2 ">
        {sortedEpisodes.map((episode) => (
          <Episode key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
}

function Episode({ episode }) {
  return (
    <div className=" flex items-center justify-between w-full  2xl:p-2 xl:p-1.5 lg:p-[7px] md:p-[5px] sm:p-1 xs:p-1 xx:p-0.5 ">
      <p className=" xx:hidden xs:inline font-[500]  2xl:text-base xl:text-[15.5px] lg:text-[15px] md:text-base sm:text-[15.5px] xs:text-[15px] xx:text-[14.5px] ">
        {String(episode.id).padStart(2, "0")} . {episode.episode.slice(0, 3)} -{" "}
        {episode.episode.slice(3)} :{" "}
        <span className=" font-[600] ">{episode.name}</span>
      </p>
      <p className=" xx:inline xs:hidden font-[500]  2xl:text-base xl:text-[15.5px] lg:text-[15px] md:text-base sm:text-[15.5px] xs:text-[15px] xx:text-[14.5px] ">
        {String(episode.id).padStart(2, "0") } - {" "} 
        <span className=" font-[600] ">{episode.name}</span>
      </p>
      <p className=" hidden lg:inline 2xl:text-base xl:text-[15px] lg:text-[14px] md:text-[8px] font-normal px-2 py-0.5 bg-gray-700 rounded-lg text-gray-50 ">
        {episode.air_date}
      </p>
    </div>
  );
}

function ButtonXXScreen({ isAddedToFavorites, onAddFavorites ,character}) {
  return (
    <div className=" w-full flex justify-center items-center my-3 " >
      {/* buttons for xx screen */}
      {isAddedToFavorites ? (
        <button
          disabled
          className=" xs:hidden xx:flex 2xl:text-base xl:text-[15px] lg:text-[15px] md:text-[14.5px] sm:text-[15px] xs:text-[14.5px] xx:text-[14px] hover:bg-zinc-900  items-center xx:justify-center  xx:gap-x-0.5 py-2 xx:px-1 w-full xx:max-w-[220px] rounded-[8px] cursor-default  xx:mt-2 bg-zinc-900 border-2  border-zinc-900  text-white font-medium "
        >
          Already in Favorites !
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="  lg:size-6 md:size-5 sm:size-6 xs:size-5 xx:size-5 stroke-gray-200 "
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
          className=" xs:hidden xx:inline  xx:text-[14px] hover:bg-zinc-800 duration-200 shadow-2xl shadow-zinc-200 py-[7px] xx:px-0  xx:max-w-44 rounded-[8px] cursor-pointer bg-zinc-300 border-2 border-zinc-400 w-full xx:mt-2 text-zinc-700 hover:text-white hover:border-zinc-800 font-medium "
        >
          Add to Favorites !
        </button>
      )}
    </div>
  );
}
