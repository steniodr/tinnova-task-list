    class Apuracao {
        constructor(total, validos, brancos, nulos) {
            this.total = total;
            this.validos = validos;
            this.brancos = brancos;
            this.nulos = nulos;
        }

        get perValidos() {
            return this.calcValidos() + '%';
        }

        get perBrancos() {
            return this.calcBrancos() + '%';
        }

        get perNulos() {
            return this.calcNulos() + '%';
        }

        calcValidos(){
            return this.validos / this.total * 100;
        }

        calcBrancos(){
            return this.brancos / this.total * 100;
        }

        calcNulos(){
            return this.nulos / this.total * 100;
        }
    }

    const votos = new Apuracao(1000, 800, 150, 50);

    console.log(votos.perValidos);
    console.log(votos.perBrancos);
    console.log(votos.perNulos);
    