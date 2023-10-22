import mongoose from "mongoose";

export interface Vocab extends mongoose.Document {
  eng: string;
  th: string;
  descr: string;
}

const VocabSchema = new mongoose.Schema<Vocab>({
  eng: { type: String, required: true, trim: true },
  th: { type: String, trim: true },
  descr: { type: String, trim: true },
});

const VocabModel =
  mongoose.models.Vocab || mongoose.model<Vocab>("Vocab", VocabSchema);

export default VocabModel;
