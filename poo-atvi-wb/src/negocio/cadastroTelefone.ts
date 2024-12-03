import Entrada from "../io/entrada";
import Telefone from "../modelo/telefone";
import Cadastro from "./cadastro";

export default class CadastroTelefone extends Cadastro {
    private telefones: Array<Telefone>
    private entrada: Entrada
    constructor(telefones: Array<Telefone>) {
        super()
        this.telefones = telefones;
        this.entrada = new Entrada()
    }

    // CRUD (Create, Read, Update e Delete)
    // Create:
    public cadastrar(): void {
        console.log(`\nInício do cadastro de telefone`);
        let ddd = this.entrada.receberTexto(`Por favor informe o DDD (apenas números): `);
        let numero = this.entrada.receberTexto(`Por favor informe o número (apenas números): `);
        let telefone = new Telefone(ddd, numero);
        this.telefones.push(telefone);
        console.log(`\nCadastro concluído!\n`);
    }

    // Read:
    public consultar(): void {
        console.log(`\nConsulta de telefone`);   
        let index = this.entrada.receberNumero(`Por favor informe o índice do telefone: `);

        if(index < 1 || index > this.telefones.length) {
            console.log(`\nTelefone não encontrado.\n`);
        } else {
            let telefone = this.telefones[index-1];
            console.log(`\nInformações do telefone:`);
            console.log(`DDD: ${telefone.getDdd}`);
            console.log(`Número: ${telefone.getNumero}`);
            console.log(`\nConsulta concluída.\n`);
        }
    }

    // Update:
    public atualizar(): void {
        console.log(`\nInício da atualização do telefone`);
        let index = this.entrada.receberNumero(`Por favor informe o índice do telefone: `);

        if(index < 1 || index > this.telefones.length) {
            console.log(`\nTelefone não encontrado.\n`);
            return;
        }

        let telefone = this.telefones[index-1];
        let novoDdd = this.entrada.receberTexto(`Novo DDD (deixe em branco para manter ${telefone.getDdd}): `);
        let novoNumero = this.entrada.receberTexto(`Novo Número (deixe em branco para manter ${telefone.getNumero}): `);

        if (novoDdd) telefone.setDdd = novoDdd;
        if (novoNumero) telefone.setNumero = novoNumero;

        console.log(`\nAtualização concluída!\n`);
    }

    // Delete:
    public remover(): void {
        console.log(`\nInício da remoção do telefone`);
        let index = this.entrada.receberNumero(`Por favor informe o índice do telefone: `);

        if(index < 1 || index > this.telefones.length) {
            console.log(`\nTelefone não encontrado.\n`);
        } else {
            this.telefones.splice(index-1, 1);
            console.log(`\nTelefone removido com sucesso!\n`);
        }
    }

}