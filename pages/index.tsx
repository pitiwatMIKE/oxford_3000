import { VocabContext } from "@/store/VocabContext";
import React, { useContext } from "react";
import { signOut } from "next-auth/react";

export default function Home() {
  const vocabList = useContext(VocabContext);

  const renderVocabList = () => {
    console.log({ vocabList });
    return vocabList.map((vocab) => <div key={vocab._id}>{vocab.eng}</div>);
  };
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={() => signOut()}>sign out</button>
      <hr />
      {renderVocabList()}
    </div>
  );
}
