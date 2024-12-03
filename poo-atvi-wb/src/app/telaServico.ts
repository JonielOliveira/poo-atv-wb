import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";

export default function telaServico(empresa: Empresa) {
    
    let execucao = true

    let cadastro = empresa.getCadServico;
    let listagem = empresa.getListServico;
    let entrada = new Entrada();

    while (execucao) {

        console.clear();

        console.log(`Bem-vindo ao Grupo World Beauty`)
        console.log(`[MENU PRINCIPAL]->[SERVIÇOS]`)
        console.log(` `)
        console.log(`Opções:`);
        console.log(`1 - Cadastrar Serviço`);
        console.log(`2 - Listar todos os Serviços`);
        console.log(`3 - Remover Serviço`);
        console.log(`4 - Atualizar Serviço`);
        console.log(`5 - Consultar Serviço`);
        console.log(`0 - Voltar`);

        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

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