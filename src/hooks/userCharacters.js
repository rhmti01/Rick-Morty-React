import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters (url,query){
    
    const  [Characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
        useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
            `  ${url} =${query}     `,
            { signal }
            );
            setCharacters(data.results.slice(0, 5));
        } catch (error) {
            if (!axios.isCancel()) {
            setCharacters([]);
            toast.error(error.response.data.error);
            }
        } finally {
            setIsLoading(false);
        }
        }

        fetchData();

        return () => {
        controller.abort();
        };
    }, [query]);

    return{Characters,isLoading}
}