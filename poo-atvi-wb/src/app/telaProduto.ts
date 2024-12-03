import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";

export default function telaProduto(empresa: Empresa) {
    
    let execucao = true

    let cadastro = empresa.getCadProduto;
    let listagem = empresa.getListProduto;
    let entrada = new Entrada();

    while (execucao) {

        console.clear();

        console.log(`Bem-vindo ao Grupo World Beauty`)
        console.log(`[MENU PRINCIPAL]->[PRODUTOS]`)
        console.log(` `)
        console.log(`Opções:`);
        console.log(`1 - Cadastrar Produto`);
        console.log(`2 - Listar todos os Produtos`);
        console.log(`3 - Remover Produto`);
        console.log(`4 - Atualizar Produto`);
        console.log(`5 - Consultar Produto`);
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