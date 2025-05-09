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
      <div className="  xl:mr-[10px] lg:mr-[8px] md:mr-2  flex items-center justify-center xl:h-[555px] lg:h-[500px] md:h-[450px] sm:h-[300px] xs:h-[250px] xx:h-[220px] md:mt-2 sm:mt-4 xs:mt-3 xx:mt-3 bg-white dark:bg-dk  rounded-[12px] lg:basis-[37%] md:basis-[40%] xs:min-w-[320px] xs:w-full xx:w-[95%] xx:mx-auto ">
        <div className=" flex items-center justify-center w-full  flex-col ">
          <h1 className=" font-bold xl:text-[22px] lg:text-[21px] md:text-[19px] sm:text-[18px] xs:text-[17px] xx:text-[17px] text-blue-900 dark:text-blue-600 ">
            Ups!... no results found!
          </h1>
          <br />
          <p className=" font-medium xl:text-[17px] lg:text-[16px] md:text-[15px ] sm:text-[14.5px] xs:text-[14px] xx:text-[13.5px] text-gray-800 dark:text-gray-200 ">
            Please try another search . . .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  lg:basis-[37%] md:basis-[40%] w-full flex items-center justify-center flex-col p-2 lg:gap-y-3 md:gap-y-2 sm:gap-y-2.5 xs:gap-y-2.5 xx:gap-y-2.5 md:mt-0 sm:mt-2 xs:mt-1 xx:mt-1.5 
    ">
      {isLoading ? (
        <div className=" flex items-center justify-center xl:h-[555px] lg:h-[500px] md:h-[450px] sm:h-[300px] xs:h-[270px] xx:h-[220px] bg-white dark:bg-dk xx:rounded-xl   min-w-[320px]  w-full ">
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
    <div className="  flex items-center justify-between 2xl:py-3 xl:py-2.5 lg:py-2.5 md:py-2 sm:py-2.5 xs:py-2 xx:py-2 xl:pr-[18px] lg:pr-4.5 md:pr-4 sm:pr-5 xs:pr-4 xx:pr-4 2xl:pl-3 xl:pl-3.5 lg:pl-3 md:pl-2 sm:pl-2.5 xs:pl-2 xx:pl-2 bg-white dark:bg-dk rounded-[12px] lg:min-w-[320px]   w-full ">
      <div className="  flex items-center justify-start 2xl:gap-x-5 xl:gap-x-[18px] lg:gap-x-5 md:gap-x-5 sm:gap-x-7 xs:gap-x-5 xx:gap-x-4">
        <img
          className=" 2xl:w-[84px] xl:w-[82px] lg:w-20 md:w-[78px] sm:w-[90px] xs:w-[80px] xx:w-[70px] md:rounded-lg xx:rounded-xl "
          src={character.image}
          alt="character photo"
        />
        <CharacterInfo character={character} />
      </div>
      <button onClick={() => onSelectCharacter(character.id)}>
        {selectedId == character.id ? (
          <EyeSlashIcon className=" stroke-stone-800 dark:stroke-stone-300 2xl:size-6 xl:size-[22px] lg:size-[22px] md:size-5 sm:size-6 xs:size-5 xx:size-5 cursor-pointer " />
        ) : (
          <EyeIcon className=" stroke-stone-800 dark:stroke-stone-300 2xl:size-6 xl:size-[22px] lg:size-[22px] md:size-5 sm:size-6 xs:size-5 xx:size-5 cursor-pointer " />
        )}
      </button>
    </div>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className=" flex flex-col xl:gap-y-2 lg:gap-y-1.5 md:gap-y-1.5 sm:gap-y-2.5 xs:gap-y-2 xx:gap-y-1.5 ">
      <h3 className="  text-zinc-950 dark:text-white 2xl:text-[18px] xl:text-[17.5px] lg:text-[17px] md:text-[16.5px] sm:text-[17px] xs:text-base xx:text-[15.5px] font-semibold ">
        {character.name}
      </h3>
      <p className=" flex items-center text-zinc-600 dark:text-zinc-400 2xl:text-base xl:text-[15px] lg:text-[15px] md:text-[14.5px] sm:text-[15.5px] xs:text-[15px] xx:text-[15px] font-[500] ">
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
