// Importar os módulos necessários
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const uri = `mongodb+srv://admin:admin@diagnostics.nrhlk.mongodb.net/?retryWrites=true&w=majority&appName=Diagnostics`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const DiagnosticsModel = mongoose.model("Diagnostic", {
  nomeacao: Number,
  repeticao: Number,
  compreensao: Number,
  resultadoFinal: String,
}, {collection: "diagnostics"});

app.post("/", (req, res) => {
  res.status(200).send('Request successful!');
})

app.post("/get-data", async (req, res) => {
  try {
    const data = await DiagnosticsModel.find()

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error
  }
});

app.post("/submit-test", (req, res) => {
  const { nomeacao, repeticao, compreensao, resultadoFinal } = req.body;
  const diagnostics = new DiagnosticsModel({
    compreensao: compreensao,
    nomeacao: nomeacao,
    resultadoFinal: resultadoFinal,
    repeticao: repeticao,
  });

  diagnostics.save().then(() => {
    console.log(`data inserted into the database: ${diagnostics}`);
  });
});

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
