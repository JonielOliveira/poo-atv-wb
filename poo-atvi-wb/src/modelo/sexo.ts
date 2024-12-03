export default class Sexo {
    private tipo!: string;
    constructor(tipo: string) {
        this.setTipo = tipo;
    }
    public get getTipo(): string {
        return this.tipo;
    }
    public get getTipoAbreviado(): string {
        if (this.tipo === 'Masculino') {
          return 'M';
        } else if (this.tipo === 'Feminino') {
          return 'F';
        } else {
          return 'X';
        }
    }
    public set setTipo(tipo: string){
        const primeiroCaractere = tipo.toUpperCase().charAt(0);
        if (primeiroCaractere === 'M') {
            this.tipo = 'Masculino';
        } else if (primeiroCaractere ==='F') {
            this.tipo = 'Feminino';
        } else {
            this.tipo = 'Não informado';
        }
    }
}