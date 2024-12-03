import Cliente from "./cliente";
import Produto from "./produto";
import Servico from "./servico";

export default class Venda {
    private id: number;
    private cliente: Cliente;
    private tipo: string | null;
    private produtoConsumido: Produto | null;
    private servicoConsumido: Servico | null;
    private quantidade: number;

    constructor(id: number, cliente: Cliente, produtoConsumido: Produto | null = null, servicoConsumido: Servico | null = null, quantidade: number) {
        this.id = id;
        this.cliente = cliente;
        if (produtoConsumido) {
            this.tipo = "P";
        } else if(servicoConsumido) {
            this.tipo = "S";
        } else {
            this.tipo = null;
        }
        this.produtoConsumido = produtoConsumido;
        this.servicoConsumido = servicoConsumido;
        this.quantidade = quantidade;
    }

    public get getId(): number {
        return this.id;
    }
    public set setId(id: number) {
        this.id = id;
    }

    public get getCliente(): Cliente {
        return this.cliente;
    }
    public set setCliente(cliente: Cliente){
        this.cliente = cliente;
    }

    public get getTipo(): string | null {
        return this.tipo;
    }
    public set setTipo(tipo: string | null) {
        this.tipo = tipo;
    }

    public get getProdutoConsumido(): Produto | null {
        return this.produtoConsumido;
    }
    public set setProdutoConsumido(produto: Produto | null ) {
        this.produtoConsumido = produto;
    }

    public get getServicoConsumido(): Servico | null {
        return this.servicoConsumido;
    }
    public set setServicoConsumido(servico: Servico | null) {
        this.servicoConsumido = servico;
    }

    public get getQuantidade(): number {
        return this.quantidade;
    }

    public set setQuantidade(quantidade: number) {
        this.quantidade = quantidade;
    }

    public calcularTotal(): number {
        let total = 0;

        if (this.produtoConsumido !== null && this.tipo == 'P') {
            total = this.produtoConsumido.getPreco * this.quantidade;
        } else if (this.servicoConsumido !== null && this.tipo == 'S') {
            total = this.servicoConsumido.getPreco * this.quantidade;
        }

        return total;
    }

    public exibirDetalhes(): string {
        let detalhes = `Cliente: ${this.cliente.getNome}\n`;
        if (this.produtoConsumido && this.tipo == 'P') {
            detalhes += `Produto: ${this.produtoConsumido.getNome} - Preço unitário: R$ ${this.produtoConsumido.getPreco.toFixed(2)}\n`;
        } else if (this.servicoConsumido && this.tipo == 'S') {
            detalhes += `Serviço: ${this.servicoConsumido.getNome} - Preço unitário: R$ ${this.servicoConsumido.getPreco.toFixed(2)}\n`;
        }
        detalhes += `Quantidade: ${this.quantidade}\n`;
        detalhes += `Total: R$ ${this.calcularTotal().toFixed(2)}\n`;

        return detalhes;
    }

    public toString(): string {
        let resposta = "";
        resposta += `${this.getId}, ${this.cliente.getCpf.getValor}, ${this.getTipo}, ${this.getQuantidade}, `;

        if (this.produtoConsumido && this.tipo == 'P') {
            resposta += `${this.produtoConsumido.getId}, ${this.produtoConsumido.getNome}, ${this.produtoConsumido.getPreco.toFixed(2)}, `;
        } else if (this.servicoConsumido && this.tipo == 'S') {
            resposta += `${this.servicoConsumido.getId}, ${this.servicoConsumido.getNome}, ${this.servicoConsumido.getPreco.toFixed(2)}, `;
        }
        resposta += `${this.calcularTotal().toFixed(2)}`
        return resposta;
    }

}
