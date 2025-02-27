/* eslint-disable react/prop-types */


function CharactersList({allCharacters}) {
    return (
        <div className="  basis-[37%] w-full flex items-center justify-center flex-col p-2 gap-y-4 " >
            {
                allCharacters.map((character)=>(
                    <Character key={character.id}  character={character} /> 
                ))
            }
        </div>
    )
}

export default CharactersList





function Character({character}) {
    return (
        <div className="  flex items-center justify-between py-3 pr-5 pl-4 bg-white rounded-[12px] w-full " >
            <div className="  flex items-center justify-start gap-x-5 " >
                <img className=" w-[77px] rounded-lg " src={character.image} alt="character photo" />
                <div className=" flex flex-col gap-y-2 " >
                    <h3 className="  text-zinc-950 text-[18px] font-semibold " >{character.name}</h3>
                    <h3 className="  text-zinc-700 text-base font-meduim " >{character.status} - {character.species}</h3>
                </div>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer  ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
        </div>
    )
}

