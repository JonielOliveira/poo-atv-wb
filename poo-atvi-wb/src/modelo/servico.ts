export default class Servico {
    private id: number;
    private nome: string;
    private preco: number;

    constructor(id: number, nome: string, preco: number) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }

    public get getId(): number {
        return this.id;
    }
    public set setId(id: number) {
        this.id = id;
    }
    public get getNome(): string {
        return this.nome;
    }
    public set setNome(nome: string) {
        this.nome = nome;
    }
    public get getPreco(): number {
        return this.preco;
    }
    public set setPreco(preco: number) {
        this.preco = preco;
    }
    public toString(): string {
        return `ID: ${this.id}, Serviço: ${this.nome}, Preço: R$ ${this.preco.toFixed(2)}`;
    }
}