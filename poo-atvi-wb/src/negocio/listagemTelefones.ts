import Telefone from "../modelo/telefone";
import Listagem from "./listagem";

export default class ListagemTelefones extends Listagem {
    private telefones: Array<Telefone>
    constructor(telefones: Array<Telefone>) {
        super()
        this.telefones = telefones;
    }
    public listar(): void {
        console.log(`\nLista de todos os telefones:\n`);
        if(this.telefones.length > 0) {
            for (let i = 0; i < this.telefones.length; i++) {
                console.log(`[${i+1}] ${this.telefones[i]}`);
            }
            console.log();
        } else {
            console.log(`-> Nenhum telefone cadastrado.\n`);
        }
    }
}