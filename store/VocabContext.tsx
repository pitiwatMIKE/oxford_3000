import { Vocab } from "@/models/Vocal";
import { ReactNode, createContext, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export const VocabContext = createContext<Vocab[]>([]);

export default function VocabContextProvider({ children }: Props) {
  const [vocabList, setVocabList] = useState<Vocab[]>([]);

  useEffect(() => {
    const getVocab = async () => {
      const key = "vocabList";
      const jsonVocab = localStorage.getItem(key);

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
