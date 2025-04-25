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
      <div className=" flex items-center justify-center h-[555px] mt-2 bg-white rounded-[12px] basis-[37%] min-w-[390px]  w-full ">
        <div className=" flex items-center justify-center w-full  flex-col ">
          <h1 className=" font-bold text-[22px] text-blue-900 ">
            Ups!... no results found!
          </h1>
          <br />
          <p className=" font-medium text-[16px] text-gray-800 ">
            Please try another search . . .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  basis-[37%] w-full flex items-center justify-center flex-col p-2 gap-y-3 ">
      {isLoading ? (
        <div className=" flex items-center justify-center h-[555px] bg-white rounded-[12px] min-w-[390px]  w-full ">
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
    <div className="  flex items-center justify-between py-3 pr-5 pl-4 bg-white rounded-[12px] min-w-[390px]  w-full ">
      <div className="  flex items-center justify-start gap-x-5 ">
        <img
          className=" w-[77px] rounded-lg "
          src={character.image}
          alt="character photo"
        />
        <CharacterInfo character={character} />
      </div>
      <button onClick={() => onSelectCharacter(character.id)}>
        {selectedId == character.id ? (
          <EyeSlashIcon className=" size-6 cursor-pointer " />
        ) : (
          <EyeIcon className=" size-6 cursor-pointer " />
        )}
      </button>
    </div>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className=" flex flex-col gap-y-2 ">
      <h3 className="  text-zinc-950 text-[18px] font-semibold ">
        {character.name}
      </h3>
      <p className=" flex items-center text-zinc-700 text-base font-meduim ">
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
