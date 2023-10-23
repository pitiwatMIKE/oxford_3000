import { VocabContext } from "@/store/VocabContext";
import { useContext } from "react";
import VocabItem from "./VocabItem";
import FadeInMotion from "./layout/FadeInMotion";

export default function VocabList() {
  const VocabList = useContext(VocabContext);

  const renderVocabList = () => {
    return VocabList.map((vocab) => (
      <VocabItem key={vocab._id} vocab={vocab} />
    ));
  };

  return (
    <FadeInMotion className="flex flex-wrap justify-around mt-6">
      {renderVocabList()}
    </FadeInMotion>
  );
}
