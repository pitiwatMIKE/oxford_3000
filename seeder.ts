import mongoose from "mongoose";
import VocabModel, { Vocab } from "./models/Vocal";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

const seedVocab: Partial<Vocab>[] = [];

const importVocab = () => {
  const data = fs.readFileSync("./vocab.txt", "utf8");
  const vacabList = data.split("\n");
  vacabList.forEach((vocab) => {
    const [eng, th] = vocab.split(",");
    seedVocab.push({
      eng: eng,
      th: th,
    });
  });
};

const seedDb = async () => {
  importVocab();
  await VocabModel.deleteMany({});
  await VocabModel.insertMany(seedVocab);
};

seedDb().then(() => {
  mongoose.connection.close();
});
