/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

export default function userLocalStorage(key , initialvalue){
    const [value, setValue] = useState(() => {
    const savedNotes = localStorage.getItem(key) 
    return savedNotes ? JSON.parse(savedNotes) : initialvalue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);   

  return [value, setValue]
}