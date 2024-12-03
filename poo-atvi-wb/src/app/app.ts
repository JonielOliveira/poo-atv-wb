import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import telaCliente from "./telaCliente";
import telaProduto from "./telaProduto";
import telaRelatorios from "./telaRelatorios";
import telaServico from "./telaServico";
import telaVendas from "./telaVendas";

export function runApplication(prompt: (question: string) => string) {

    let execucao = true;

    let empresa = new Empresa("clientes.txt", "produtos.txt", "servicos.txt", "vendas.txt")
    let entrada = new Entrada();
    
    while (execucao) {
        console.clear();

        console.log(`Bem-vindo ao Grupo World Beauty`)
        console.log(`[MENU PRINCIPAL]`)
        console.log(` `)
        console.log(`Opções:`);
        console.log(`1 - Vendas`);
        console.log(`2 - Clientes`);
        console.log(`3 - Serviços`);
        console.log(`4 - Produtos`);
        console.log(`5 - Relatórios (Listas)`);
        console.log(`0 - Sair`);

        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

        switch (opcao) {
            case 1:
                // Tela de Vendas
                telaVendas(empresa);
                break;
            case 2:
                // Tela de Clientes
                telaCliente(empresa); 
                break;
            case 3:
                // Tela de Serviços
                telaServico(empresa);
                break;
            case 4:
                // Tela de Produtos
                telaProduto(empresa);
                break;
            case 5:
                // Tela de Relatórios
                telaRelatorios(empresa);
                break;
            case 0:
                execucao = false;
                console.log(`\nObrigado pela visita, até breve!\n`);
                break;
            default:
                console.log(`Operação inválida!`);
        }
    }

}