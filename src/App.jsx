
import './App.css'
import CharactersList from './components/CharactersList.jsx'
import CharacterData from './components/CharacterData.jsx'
import Navbar from './components/Navbar.jsx'
import { allCharacters } from "../data/data.js";
import { character } from "../data/data.js";
import { episodes } from "../data/data.js";

function App() {

  return (
    <div className=" w-full 2xl:max-w-[1200px] xl:max-w-[1050px]  flex items-center flex-col " >
      <Navbar />
      <div className=' mt-5 bg-blue-200/ flex items-start justify-between w-11/12 gap-x-4  ' >
        <CharactersList  allCharacters={allCharacters} />
        <CharacterData episodes={episodes} character={character} />
      </div>
    </div>
  )
}

export default App
