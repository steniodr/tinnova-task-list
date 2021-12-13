const app = require('./config/express')();
const port = app.get('port');

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});



// function test(data) {
//     const valid = validate(data)
//     if (valid) console.log("Valid!")
//     else console.log("Invalid: " + ajv.errorsText(validate.errors))
// }

// const validate = ajv.compile(schema)

// test({
//     veiculo: "Argo",
//     marca: "Fiat",
//     ano: 2020,
//     descricao: "Carro tá potente",
//     vendido: false,
// })



