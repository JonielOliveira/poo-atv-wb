import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemServicos extends Listagem {
    private servicos: Array<Servico>;
    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
    }
    public listar(): void {
        console.log(`\nLista de todos os serviços:\n`);
        if(this.servicos.length > 0) {
            for (let i = 0; i < this.servicos.length; i++) {
                console.log(`[${i+1}] ${this.servicos[i]}`);
            }
            console.log();
        } else {
            console.log(`-> Nenhum serviço cadastrado.\n`);
        }
    }
}