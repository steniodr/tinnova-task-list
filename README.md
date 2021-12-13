<h1 align="center">
  <img src="https://tinnova.com.br/wp-content/uploads/2021/05/logo_dark.png" alt="Tinnova" width="300px">
</h1>

<p align="center">
  <a href="#description">Description</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#task-summary">Task Summary</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>
</p>

<br />

<p align="center">
  <a href="https://github.com/steniodr/tinnova-task-list/issues">Report bug</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/steniodr/tinnova-task-list\/issues">Request feature</a>
</p>

<br />

## Developed with
<div align="center">
  <img src="https://ctnovatec.com.br/wp-content/uploads/2015/03/nodejs-logo.png" alt="Node.js" width=250px> &nbsp;
</div>

## Description

List of tasks requested by the Tinnova company. Containing 5 tasks.

All tasks were splited by folders to make it easier when correcting.

## Task Summary

- 01: Votos em relação ao total de eleitores.
- 02: Algoritmo de ordenação Bubble Sort.
- 03: Fatorial.
- 04: Soma dos multiplos de 3 ou 5.
- 05: Cadastro de veiculos (API JSON RESTful).

## Technologies

* [Nodejs](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [Express](https://www.npmjs.com/package/express)
* [Ajv](https://www.npmjs.com/package/ajv)
* [Consign](https://www.npmjs.com/package/consign)
* [Moment](https://www.npmjs.com/package/moment)
* [Uuid](https://www.npmjs.com/package/uuid)

## Usage

You can clone it on your PC using the command:
```bash
git clone https://github.com/steniodr/tinnova-task-list.git
cd tinnova-task-list
```

The only task that needs to install dependencies is task 05:
```bash
cd tinnova-task-list/'task 05'
npm i
```

To run the tasks, inside the respective folder (task 01 to taks 04):
```bash
node index.js
```
In the case of task 05:
```bash
node server.js
```
After that, input in Web Browser:

localhost:8080/api/v1/veiculos

**I advise using Postman or Insomnia for tests**

## License

Distributed under the MIT License. See `LICENSE` for more information.

<h4 align="center">
  Made by <a href="https://github.com/steniodr" target="_blank">Stenio D. Rapchan</a>
</h4>
