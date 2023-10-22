import { Vocab } from "@/models/Vocal";
import { createContext, useEffect, useState } from "react";

export const VocabContext = createContext<Vocab[]>([]);

export default function VocabContextProvider({ children }: any) {
  const [vocabList, setVocabList] = useState<Vocab[]>([]);

  useEffect(() => {
    const getVocab = async () => {
      const key = "vocabList";
      const jsonVocab = localStorage.getItem(key);
      console.log({jsonVocab})
      if (jsonVocab) {
        setVocabList(JSON.parse(jsonVocab));
      } else {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/vocab");
        const { data } = await res.json();
        setVocabList(data);
        localStorage.setItem(key, JSON.stringify(data));
      }
    };

    getVocab();
  }, []);

  return (
    <VocabContext.Provider value={vocabList}>{children}</VocabContext.Provider>
  );
}
