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
});

app.post("/", (req, res) => {
  res.status(200).send('Request successful!');
})

app.post("/submit-test", (req, res) => {
  // // Capturar os dados enviados pelo frontend
  // ;
  // // Query SQL para inserir os dados no banco de dados
  // const query =
  //   "INSERT INTO diagnosticos (nomeacao, repeticao, compreensao, resultado) VALUES (?, ?, ?, ?)";
  // // Executar a query e passar os dados
  // db.query(
  //   query,
  //   [nomeacao, repeticao, compreensao, resultadoFinal],
  //   (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send("Erro ao salvar os dados");
  //     } else {
  //       res.status(200).send("Dados salvos com sucesso");
  //     }
  //   },
  // );
  //
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
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
