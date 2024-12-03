import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"

export default function telaCliente(empresa: Empresa) {
    
    let execucao = true

    let cadastro = empresa.getCadCliente;
    let listagem = empresa.getListCliente;
    let entrada = new Entrada();

    while (execucao) {
        
        console.clear();

        console.log(`Bem-vindo ao Grupo World Beauty`)
        console.log(`[MENU PRINCIPAL]->[CLIENTES]`)
        console.log(` `)
        console.log(`Opções:`);
        console.log(`1 - Cadastrar cliente`);
        console.log(`2 - Listar todos os clientes`);
        console.log(`3 - Remover cliente`);
        console.log(`4 - Atualizar cliente`);
        console.log(`5 - Consultar cliente`);
        console.log(`0 - Voltar`);

        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch (opcao) {
            case 1:
                cadastro.cadastrar();
                entrada.continuar();
                break;
            case 2:
                listagem.listar();
                entrada.continuar();
                break;
            case 3:
                cadastro.remover();
                entrada.continuar();
                break;
            case 4:
                cadastro.atualizar();
                entrada.continuar();
                break;
            case 5:
                cadastro.consultar();
                entrada.continuar();
                break;
            case 0:
                execucao = false;
                break;
            default:
                console.log(`Operação inválida!`);
        }
    }

}