/* eslint-disable react/prop-types */
import DataLoader from "./DataLoader";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharactersList({
  Characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) {
  if (Characters.length < 1) {
    return (
      <div className="  xl:mr-[10px] lg:mr-[8px] md:mr-2  flex items-center justify-center xl:h-[555px] lg:h-[500px] md:h-[450px] sm:h-[300px] md:mt-2 sm:mt-4 bg-white rounded-[12px] lg:basis-[37%] md:basis-[40%] min-w-[320px]  w-full ">
        <div className=" flex items-center justify-center w-full  flex-col ">
          <h1 className=" font-bold xl:text-[22px] lg:text-[21px] md:text-[19px] sm:text-[18px] text-blue-900 ">
            Ups!... no results found!
          </h1>
          <br />
          <p className=" font-medium xl:text-[17px] lg:text-[16px] md:text-[15px ] sm:text-[14.5px] text-gray-800 ">
            Please try another search . . .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  lg:basis-[37%] md:basis-[40%] w-full flex items-center justify-center flex-col p-2 lg:gap-y-3 md:gap-y-2 sm:gap-y-2.5 md:mt-0 sm:mt-2 ">
      {isLoading ? (
        <div className=" flex items-center justify-center xl:h-[555px] lg:h-[500px] md:h-[450px] sm:h-[300px] bg-white md:rounded-xl sm:rounded-2xl min-w-[320px]  w-full ">
          <DataLoader />
        </div>
      ) : (
        Characters.map((character) => (
          <Character
            selectedId={selectedId}
            key={character.id}
            character={character}
            onSelectCharacter={onSelectCharacter}
          />
        ))
      )}
    </div>
  );
}

export default CharactersList;

function Character({ character, onSelectCharacter, selectedId }) {
  return (
    <div className="  flex items-center justify-between xl:py-2.5 lg:py-2.5 md:py-2 sm:py-2.5 xl:pr-[18px] lg:pr-4.5 md:pr-4 sm:pr-5 2xl:pl-4 xl:pl-3.5 lg:pl-3 md:pl-2 sm:pl-2.5 bg-white rounded-[12px] lg:min-w-[320px]   w-full ">
      <div className="  flex items-center justify-start 2xl:gap-x-5 xl:gap-x-[18px] lg:gap-x-5 md:gap-x-5 sm:gap-x-7 ">
        <img
          className=" 2xl:w-[84px] xl:w-[82px] lg:w-20 md:w-[78px] sm:w-[90px] md:rounded-lg sm:rounded-xl "
          src={character.image}
          alt="character photo"
        />
        <CharacterInfo character={character} />
      </div>
      <button onClick={() => onSelectCharacter(character.id)}>
        {selectedId == character.id ? (
          <EyeSlashIcon className=" 2xl:size-6 xl:size-[22px] lg:size-[22px] md:size-5 sm:size-6 cursor-pointer " />
        ) : (
          <EyeIcon className=" 2xl:size-6 xl:size-[22px] lg:size-[22px] md:size-5 sm:size-6 cursor-pointer " />
        )}
      </button>
    </div>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className=" flex flex-col xl:gap-y-2 lg:gap-y-1.5 md:gap-y-1.5 sm:gap-y-2.5 ">
      <h3 className="  text-zinc-950 2xl:text-[18px] xl:text-[17.5px] lg:text-[17px] md:text-[16.5px] sm:text-[17px] font-semibold ">
        {character.name}
      </h3>
      <p className=" flex items-center text-zinc-600 2xl:text-base xl:text-[15px] lg:text-[15px] md:text-[14.5px] sm:text-[15.5px] font-[500] ">
        <span
          className={`  ${
            character.status == "Alive" ? "bg-green-500" : "bg-red-500"
          }  size-2 mr-2 rounded-full inline-block   `}
        ></span>
        {character.status} - {character.species}
      </p>
    </div>
  );
}
