/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import DataLoader from "./DataLoader";
import axios from "axios";
import DataLoader from "./DataLoader";
import toast from "react-hot-toast";

function CharacterData({ selectedId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setCharacter(null)
        setIsLoading(true);
        const { data } = await axios.get(
          `  https://rickandmortyapi.com/api/character/${selectedId}  `
        );
        setCharacter(data);
      } catch (error){
        toast.error(error.response.data.error)
      } 
      finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div className=" bg-white basis-[63%] w-full h-full flex items-center justify-center  mt-2 min-h-[445px] rounded-2xl ">
        <DataLoader  />
      </div>
    );
  }

  if (!character || !selectedId)
    return (
      <div className=" flex items-center justify-center w-full h-96 ">
        <p className=" font-medium text-lg text-gray-800 ">
          Please select a character!
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl  basis-[63%] w-full flex items-start justify-center flex-col mt-2 ">
      <div className="  flex items-start justify-start w-full ">
        <img
          className="size-75 rounded-xl m-5 "
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
          <button className=" hover:bg-zinc-black hover:shadow-xl p-2 rounded-[8px] cursor-pointer mt-8 bg-zinc-950 text-zinc-100 ">
            Add To Favorites!
          </button>
        </div>
      </div>
      <div className=" p-5 w-full ">
        <div className=" flex items-center justify-between ">
          <h4 className=" font-semibold text-2xl py-4 ">List of Episodes:</h4>
          <button className=" p-1.5 bg-zinc-900 rounded-full cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className=" stroke-white size-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>
        {/* {episodes.map((episode) => (
        <Episode key={episode.id} episode={episode} />
      ))} */}
      </div>
    </div>
  );
}

export default CharacterData;

// function Episode({ episode }) {
//   return (
//     <div className=" flex items-center justify-between w-full px-2 py-2.5 ">
//       <p className=" font-medium ">
//         {String(episode.id).padStart(2, "0")} . {episode.episode.slice(0, 3)} -{" "}
//         {episode.episode.slice(3)} :{" "}
//         <span className=" font-bold ">{episode.name}</span>
//       </p>
//       <p className=" font-semibold ">{episode.air_date}</p>
//     </div>
//   );
// }
