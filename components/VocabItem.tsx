import { Vocab } from "@/models/Vocal";

interface Props {
  vocab: Vocab;
}

export default function VocabItem({ vocab }: Props) {
  return (
    <div className="shadow-md w-36 m-2 p-2 bg-custom-primary outline outline-custom-text">
      <span>{vocab.eng}</span>
    </div>
  );
}
