import mongoose from "mongoose";

interface ICodeSchema {
  fullCode: {
    html: String;
    css: String;
    javascrit: String;
  };
}

const CodeSchema = new mongoose.Schema<ICodeSchema>({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
});

const Code = mongoose.model("Code", CodeSchema);

export default Code;
