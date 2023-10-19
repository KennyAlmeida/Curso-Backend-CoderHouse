const fs = require("fs");

const data = new Date();

const dataFormatada = `${data.getDate()}/${
  data.getMonth() + 1
}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`;

fs.writeFile("data.txt", dataFormatada, (error) => {
  if (error) return console.error("erro ao escrever arquivo");
  fs.readFile("data.txt", "utf-8", (err, data) => {
    if (error) return console.error("erro ao ler arquivo");
    console.log(data);
  });
});
