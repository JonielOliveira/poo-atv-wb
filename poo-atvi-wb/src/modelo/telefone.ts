export default class Telefone {
    private ddd: string
    private numero: string

    constructor(ddd: string, numero: string) {
        this.ddd = this.filtrarDDD(ddd);
        this.numero = this.filtrarNumero(numero);
    }

    public get getDdd(): string {
        return this.ddd
    }

    public set setDdd(ddd: string) {
        this.ddd = this.filtrarDDD(ddd);
    }

    public get getNumero(): string {
        return this.numero
    }

    public set setNumero(numero: string) {
        this.numero = this.filtrarNumero(numero);
    }

    private filtrarDDD(input: string): string {
        // Remove todos os caracteres que não são dígitos (0-9)
        let ddd = input.replace(/\D/g, '');

        if (ddd.length < 2) {
            ddd = "00";
        } else {
            ddd = ddd.substring(0, 2);
        }
        
        return ddd;
    }

    private filtrarNumero(input: string): string {
        // Remove todos os caracteres que não são dígitos (0-9)
        let numero = input.replace(/\D/g, '');
        
        if (numero.length < 8) {
            numero = "90000-0000";
        } else if (numero.length < 9) {
            numero = "9" + numero;
        } else {
            numero = numero.substring(0, 9);
        }
        
        return numero;

    }

    public toString(): string {
        // Divide a string em partes e adiciona o hífen
        const part1 = this.numero.substring(0, 5); // '98888'
        const part2 = this.numero.substring(5);    // '7777'
        
        return `(${this.ddd}) ${part1}-${part2}`;
    }

}