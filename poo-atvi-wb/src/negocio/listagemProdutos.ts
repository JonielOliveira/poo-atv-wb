import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    private produtos: Array<Produto>;
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos;
    }
    public listar(): void {
        console.log(`\nLista de todos os produtos:\n`);
        if(this.produtos.length > 0) {
            for (let i = 0; i < this.produtos.length; i++) {
                console.log(`[${i+1}] ${this.produtos[i]}`);
            }
            console.log();
        } else {
            console.log(`-> Nenhum produto cadastrado.\n`);
        }
    }
}