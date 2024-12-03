import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes:\n`);
        if(this.clientes.length > 0) {
            this.clientes.forEach(cliente => {
                console.log(`Nome: ` + cliente.getNome);
                console.log(`Nome social: ` + cliente.getNomeSocial);
                console.log(`Sexo: ` + cliente.getSexo);
                console.log(`CPF: ` + cliente.getCpf.getValor);
                console.log(`--------------------------------------`);
            });
            console.log();
        } else {
            console.log(`-> Nenhum cliente cadastrado.\n`);
        }
    }
    public listarPorGenero(genero: string): void {
        console.log(`\nLista de clientes do gênero: ${genero}\n`);
    
        // Filtra clientes pelo gênero especificado
        const clientesFiltrados = this.clientes.filter(cliente => cliente.getSexoAbreviado === genero);
    
        if (clientesFiltrados.length > 0) {
            clientesFiltrados.forEach(cliente => {
                console.log(`Nome: ` + cliente.getNome);
                console.log(`Nome social: ` + cliente.getNomeSocial);
                console.log(`Sexo: ` + cliente.getSexo);
                console.log(`CPF: ` + cliente.getCpf.getValor);
                console.log(`--------------------------------------`);
            });
            console.log();
        } else {
            console.log(`Nenhum cliente do gênero "${genero}" cadastrado.\n`);
        }
    }
}