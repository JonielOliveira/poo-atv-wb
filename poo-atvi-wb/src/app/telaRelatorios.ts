import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";

export default function telaRelatorios(empresa: Empresa) {
    
    let execucao = true;

    let listVenda = empresa.getListVenda;
    let listCliente = empresa.getListCliente;
    let entrada = new Entrada();

    while (execucao) {

        console.clear();

        console.log(`Bem-vindo ao Grupo World Beauty`)
        console.log(`[MENU PRINCIPAL]->[RELATÓRIOS]`)
        console.log(` `)
        console.log(`Opções:`);
        console.log(`1 - Listar todos Clientes`);
        console.log(`2 - Listar todos Clientes (Gênero: Masculino)`);
        console.log(`3 - Listar todos Clientes (Gênero: Feminino)`);
        console.log(`4 - Listar Top N Clientes (Maior Consumo): Quantidade`);
        console.log(`5 - Listar Top N Clientes (Menor Consumo): Quantidade`);
        console.log(`6 - Listar Top N Clientes (Maior Consumo): Valor`);
        console.log(`7 - Listar Top N Clientes (Menor Consumo): Valor`);
        console.log(`8 - Listar Top N Itens (Maior Consumo): Quantidade`);
        console.log(`9 - Listar Top N Itens (Maior Consumo, Gênero: Masculino): Quantidade`);
        console.log(`10 - Listar Top N Itens (Maior Consumo, Gênero: Feminino): Quantidade`);
        console.log(`11 - Listar Top N Itens (Menor Consumo): Quantidade`);
        console.log(`12 - Listar Top N Itens (Menor Consumo, Gênero: Masculino): Quantidade`);
        console.log(`13 - Listar Top N Itens (Menor Consumo, Gênero: Feminino): Quantidade`);
        console.log(`0 - Voltar`);

        let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
        let n: number = 0;
        if (4 <= opcao && opcao <= 13) {
            do {
                n = entrada.receberNumero(`Por favor, escolha a quantidade N de itens: `)
            } while (isNaN(n))
        }

        switch (opcao) {
            case 1:
                listCliente.listar();
                entrada.continuar();
                break;
            case 2:
                listCliente.listarPorGenero('M');
                entrada.continuar();
                break;
            case 3:
                listCliente.listarPorGenero('F');
                entrada.continuar();
                break;
            case 4:
                listVenda.listarClientesMaisConsumiramPorQuantidade(n);
                entrada.continuar();
                break;
            case 5:
                listVenda.listarClientesMenosConsumiramPorQuantidade(n);
                entrada.continuar();
                break;
            case 6:
                listVenda.listarClientesMaisConsumiramPorValor(n);
                entrada.continuar();
                break;
            case 7:
                listVenda.listarClientesMenosConsumiramPorValor(n);
                entrada.continuar();
                break;
            case 8:
                listVenda.listarItensMaisConsumidos(n);
                entrada.continuar();
                break; 
            case 9:
                listVenda.listarItensMaisConsumidosPorGenero(n, 'M');
                entrada.continuar();
                break;
            case 10:
                listVenda.listarItensMaisConsumidosPorGenero(n, 'F');
                entrada.continuar();
                break;
            case 11:
                listVenda.listarItensMenosConsumidos(n);
                entrada.continuar();
                break; 
            case 12:
                listVenda.listarItensMenosConsumidosPorGenero(n, 'M');
                entrada.continuar();
                break;
            case 13:
                listVenda.listarItensMenosConsumidosPorGenero(n, 'F');
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