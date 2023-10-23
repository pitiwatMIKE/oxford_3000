import { VocabContext } from "@/store/VocabContext";
import React, { useContext } from "react";

export default function Home() {
  const vocabList = useContext(VocabContext);

  const renderVocabList = () => {
    return vocabList.map((vocab) => <div key={vocab._id}>{vocab.eng}</div>);
  };
  return (
    <div>
      <h1>Home page</h1>
      <hr />
      {renderVocabList()}
    </div>
  );
}
