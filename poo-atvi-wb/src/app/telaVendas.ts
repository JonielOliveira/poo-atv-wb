import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";

export default function telaVendas(empresa: Empresa) {
    
    let execucao = true;

    let cadastro = empresa.getCadVenda;
    let listagem = empresa.getListVenda;
    let entrada = new Entrada();

    while (execucao) {

        console.clear();

        console.log(`Bem-vindo ao Grupo World Beauty`)
        console.log(`[MENU PRINCIPAL]->[VENDAS]`)
        console.log(` `)
        console.log(`Opções:`);
        console.log(`1 - Cadastrar Venda`);
        console.log(`2 - Listar todas as Vendas`);
        console.log(`3 - Remover Venda`);
        console.log(`4 - Atualizar Venda`);
        console.log(`5 - Consultar Venda`);
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