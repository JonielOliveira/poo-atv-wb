import Entrada from "../io/entrada";
import RG from "../modelo/rg";
import Cadastro from "./cadastro";

export default class CadastroRg extends Cadastro {
    private rgs: Array<RG>;
    private entrada: Entrada;
    constructor(rgs: Array<RG>) {
        super()
        this.rgs = rgs;
        this.entrada = new Entrada()
    }

    // CRUD (Create, Read, Update e Delete)
    // Create:
    public cadastrar(): void {
        console.log(`\nInício do cadastro de RG`);
        let valor = this.entrada.receberTexto(`Por favor informe o número do RG: `);
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/');
        let ano = new Number(partesData[2].valueOf()).valueOf();
        let mes = new Number(partesData[1].valueOf()).valueOf();
        let dia = new Number(partesData[0].valueOf()).valueOf();
        let dataEmissao = new Date(ano, mes, dia);
        let rg = new RG(valor, dataEmissao);
        this.rgs.push(rg);
        console.log(`\nCadastro concluído!\n`);
    }

    // Read:
    public consultar(): void {
        console.log(`\nConsulta de RG`);   
        let index = this.entrada.receberNumero(`Por favor informe o índice do RG: `);

        if(index < 1 || index > this.rgs.length) {
            console.log(`\nRG não encontrado.\n`);
        } else {
            let rg = this.rgs[index-1];
            console.log(`\nInformações do RG:`);
            console.log(`Número: ${rg.getValor}`);
            console.log(`Data de Emissão do RG: ${rg.getDataEmissao.toLocaleDateString()}`);
            console.log(`\nConsulta concluída.\n`);
        }
    }

    // Update:
    public atualizar(): void {
        console.log(`\nInício da atualização do RG`);
        let index = this.entrada.receberNumero(`Por favor informe o índice do RG: `);

        if(index < 1 || index > this.rgs.length) {
            console.log(`\nRG não encontrado.\n`);
            return;
        }

        let rg = this.rgs[index-1];
        let novoValor = this.entrada.receberTexto(`Novo número (deixe em branco para manter ${rg.getValor}): `);
        let novaData = this.entrada.receberTexto(`Nova data de emissão (deixe em branco para manter ${rg.getDataEmissao.toLocaleDateString()}): `);
        let partesData = novaData.split('/');
        let ano = new Number(partesData[2].valueOf()).valueOf();
        let mes = new Number(partesData[1].valueOf()).valueOf();
        let dia = new Number(partesData[0].valueOf()).valueOf();
        let novaDataEmissao = new Date(ano, mes, dia);

        if (novoValor) rg.setValor = novoValor;
        if (novaData) rg.setDataEmissao = novaDataEmissao;

        console.log(`\nAtualização concluída!\n`);
    }

    // Delete:
    public remover(): void {
        console.log(`\nInício da remoção do RG`);
        let index = this.entrada.receberNumero(`Por favor informe o índice do RG: `);

        if(index < 1 || index > this.rgs.length) {
            console.log(`\nRG não encontrado.\n`);
        } else {
            this.rgs.splice(index-1, 1);
            console.log(`\nRG removido com sucesso!\n`);
        }
    }

}