import Cadastro from "./cadastro";
import Entrada from "../io/entrada";
import LeitorArquivo from "../io/leitorArquivo";
import GravadorArquivo from "../io/gravadorArquivo";
import Venda from "../modelo/venda";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import CadastroCliente from "./cadastroCliente";
import CadastroProduto from "./cadastroProduto";
import CadastroServico from "./cadastroServico";

export default class CadastroVenda extends Cadastro {
    private vendas: Array<Venda>;
    private cadastroCliente: CadastroCliente;
    private cadastroProduto: CadastroProduto;
    private cadastroServico: CadastroServico;
    private arquivo: string;
    private entrada: Entrada;
    private maxId: number;
    constructor(vendas: Array<Venda>, cadastroCliente: CadastroCliente, cadastroProduto: CadastroProduto, cadastroServico: CadastroServico, arquivo: string) {
        super();
        this.vendas = vendas;
        this.cadastroCliente = cadastroCliente;
        this.cadastroProduto = cadastroProduto;
        this.cadastroServico = cadastroServico;
        this.arquivo = arquivo;
        this.entrada = new Entrada();
        this.load();
        this.maxId = this.findMaxId();
    }

    // CRUD (Create, Read, Update e Delete)
    // Create:
    public cadastrar(): void {
        console.log(`\nInício do cadastro de venda`);
        
        let cliente: Cliente | null;
        do {
            let cpfValor = this.entrada.receberTexto(`Por favor informe o número do cpf do cliente: `);
            
            cliente = this.cadastroCliente.findByCpfValue(cpfValor);

            if (cliente == null) {
                console.log(`\nCliente com o CPF informado não encontrado.\n`);
            }
        } while (cliente == null)

        console.log(`\nInformações do cliente:`);
        console.log(`CPF: ${cliente.getCpf.getValor}`);
        console.log(`Nome: ${cliente.getNome}`);
        console.log(`Sexo: ${cliente.getSexo}`);    
        
        let consumivel: string;
        do {
            consumivel = this.entrada.receberTexto(`Por favor informe o tipo de venda (P - Produto | S - Serviço): `);
            consumivel = consumivel.trim().charAt(0).toUpperCase();
            if(consumivel !== 'P' && consumivel !== 'S') {
                console.log(`\nOpção inválida, digite P ou S.\n`);
            }
        } while (consumivel !== 'P' && consumivel !== 'S');

        let produto: Produto | null = null;
        let servico: Servico | null = null;
        if(consumivel == 'P') {

            do {
                let id = this.entrada.receberNumero(`Por favor informe o ID do produto: `);
                produto = this.cadastroProduto.findById(id);
                if(produto == null) {
                    console.log(`\nProduto não encontrado.\n`);
                }
            } while (produto == null);

            console.log(`\nInformações do produto:`);
            console.log(`ID: ${produto.getId}`);
            console.log(`Produto: ${produto.getNome}`);
            console.log(`Preço: R$ ${produto.getPreco.toFixed(2)}`);

        } else {

            do {
                let id = this.entrada.receberNumero(`Por favor informe o ID do serviço: `);
                servico = this.cadastroServico.findById(id);
                if(servico == null) {
                    console.log(`\nServiço não encontrado.\n`);
                }
            } while (servico == null);

            console.log(`\nInformações do serviço:`);
            console.log(`ID: ${servico.getId}`);
            console.log(`Serviço: ${servico.getNome}`);
            console.log(`Preço: R$ ${servico.getPreco.toFixed(2)}`);

        }

        let quantidade: number;
        do {
            quantidade = this.entrada.receberNumero(`Por favor informe a quantidade adquirida (0 a 1000): `);
            if(quantidade < 0 || quantidade > 1000) {
                console.log(`Quantidade inválida, digite um valor entre 0 e 1000.`);
            }
        } while (quantidade < 0 || quantidade > 1000);

        if (quantidade === 0) {
            console.log(`\nVenda cancelada!\n`);
        } else {
            let id = this.maxId + 1;
            let venda = new Venda(id, cliente, produto, servico, quantidade);
            this.vendas.push(venda);
            this.sendOne(venda);
            this.maxId++;
            console.log(`\nVenda realizada com sucesso!\n`);
        }
    }

    // Read:
    public consultar(): void {
        console.log(`\nConsulta de venda`);   
        let id = this.entrada.receberNumero(`Por favor informe o ID da venda: `);
        
        let venda = this.findById(id);

        if(venda == null) {
            console.log(`\nVenda não encontrada.\n`);
        } else {
            console.log(`\nInformações do produto:`);
            console.log(venda.exibirDetalhes());
            console.log(`\nConsulta concluída.\n`);
        }
    }

    // Update:
    public atualizar(): void {
        console.log(`\nInício da atualização de venda`);
        let id = this.entrada.receberNumero(`Por favor informe o ID da venda: `);

        let venda = this.findById(id);

        if(venda == null) {
            console.log(`\nVenda não encontrada.\n`);
        } else {
            
            let cliente = this.cadastroCliente.findByCpfValue(venda.getCliente.getCpf.getValor)

            if(cliente == null) {
                console.log(`\nCliente não encontrado.\n`);
                do {
                    let cpfValor = this.entrada.receberTexto(`Por favor informe o número do cpf do cliente: `);
                    
                    cliente = this.cadastroCliente.findByCpfValue(cpfValor);
        
                    if (cliente == null) {
                        console.log(`\nCliente com o CPF informado não encontrado.\n`);
                    } else {
                        console.log(`\nInformações do cliente:`);
                        console.log(`CPF: ${cliente.getCpf.getValor}`);
                        console.log(`Nome: ${cliente.getNome}`);
                        console.log(`Sexo: ${cliente.getSexo}`);
                    }
                } while (cliente == null)
            } else {
                console.log(`\nInformações do cliente (Atual):`);
                console.log(`CPF: ${cliente.getCpf.getValor}`);
                console.log(`Nome: ${cliente.getNome}`);
                console.log(`Sexo: ${cliente.getSexo}`);
            }

            let novoCpf: string = '';
            do {
                novoCpf = this.entrada.receberTexto(`Novo Cliente (deixe em branco para manter: ${cliente?.getCpf.getValor ?? "--"}): `);
                if (novoCpf !== '') {
                    cliente = this.cadastroCliente.findByCpfValue(novoCpf);
    
                    if (cliente == null) {
                        console.log(`\nCliente com o CPF informado não encontrado.\n`);
                    } else {
                        console.log(`\nInformações do cliente:`);
                        console.log(`CPF: ${cliente.getCpf.getValor}`);
                        console.log(`Nome: ${cliente.getNome}`);
                        console.log(`Sexo: ${cliente.getSexo}`);
                    }
                }
            } while (novoCpf !== '' || cliente == null)

            venda.setCliente = cliente;
            
            let NovoConsumivel: string;
            do {
                NovoConsumivel = this.entrada.receberTexto(`Novo tipo de venda (deixe em branco para manter: ${venda.getTipo}): `);
                
                if (NovoConsumivel !== '') {
                    NovoConsumivel = NovoConsumivel.trim().charAt(0).toUpperCase();
                    if(NovoConsumivel !== 'P' && NovoConsumivel !== 'S') {
                        console.log(`\nOpção inválida, digite P ou S.\n`);
                    }
                }
            } while (NovoConsumivel !== '' && NovoConsumivel !== 'P' && NovoConsumivel !== 'S');

            if (NovoConsumivel !== '') {
                venda.setTipo = NovoConsumivel;
            }

            let produto: Produto | null = venda.getProdutoConsumido;
            let servico: Servico | null = venda.getServicoConsumido;
            if(venda.getTipo === 'P') {
                
                venda.setServicoConsumido = null;

                if (produto !== null) {
                    console.log(`\nInformações do produto (Atual):`);
                    console.log(`ID: ${produto.getId}`);
                    console.log(`Produto: ${produto.getNome}`);
                    console.log(`Preço: R$ ${produto.getPreco.toFixed(2)}`);
                }

                let id: number;
                do {

                    id = this.entrada.receberNumero(`Novo Produto ID (deixe em branco para manter: ${produto?.getId ?? "--"}): `);
                    if (id !== 0) {
                        produto = this.cadastroProduto.findById(id);
                        if(produto == null) {
                            console.log(`\nProduto não encontrado.\n`);
                        } else {
                            console.log(`\nInformações do produto:`);
                            console.log(`ID: ${produto.getId}`);
                            console.log(`Produto: ${produto.getNome}`);
                            console.log(`Preço: R$ ${produto.getPreco.toFixed(2)}`);
                        }
                    }

                } while (id !== 0 || produto == null);
                
                venda.setProdutoConsumido = produto;
    
            } else {
                
                venda.setProdutoConsumido = null;

                if (servico !== null) {
                    console.log(`\nInformações do serviço (Atual):`);
                    console.log(`ID: ${servico.getId}`);
                    console.log(`Serviço: ${servico.getNome}`);
                    console.log(`Preço: R$ ${servico.getPreco.toFixed(2)}`);
                }

                let id: number;
                do {

                    id = this.entrada.receberNumero(`Novo Serviço ID (deixe em branco para manter: ${servico?.getId ?? "--"}): `);
                    if (id !== 0) {
                        servico = this.cadastroServico.findById(id);
                        if(servico == null) {
                            console.log(`\nServiço não encontrado.\n`);
                        } else {
                            console.log(`\nInformações do serviço:`);
                            console.log(`ID: ${servico.getId}`);
                            console.log(`Serviço: ${servico.getNome}`);
                            console.log(`Preço: R$ ${servico.getPreco.toFixed(2)}`);
                        }
                    }
                } while (id !== 0 || servico == null);
                
                venda.setServicoConsumido = servico;
    
            }

            let novaQuantidade: number | null = null;
            do {
                novaQuantidade = this.entrada.receberNumero(`Nova Quantidade (deixe em branco para manter: ${venda.getQuantidade}): `);
                
                if (novaQuantidade !== 0) {
                    if(novaQuantidade <= 0 || novaQuantidade > 1000) {
                        console.log(`Quantidade inválida, digite um valor entre 1 e 1000.`);
                    }
                }
            } while (novaQuantidade < 0 || novaQuantidade > 1000);

            if (novaQuantidade !== 0) {
                venda.setQuantidade = novaQuantidade;
            }

            this.send();
            console.log(`\nInformações da venda:`);
            console.log(venda.exibirDetalhes());
            console.log(`\nAtualização concluída!\n`);
        }
    }

    // Delete:
    public remover(): void {
        console.log(`\nInício da remoção de venda`);
        let id = this.entrada.receberNumero(`Por favor informe o ID da venda: `);

        let index = this.findIndexById(id);

        if (index) {
            let venda = this.vendas[index] 
            this.vendas.splice(index, 1);
            this.send();
            console.log(`\nInformações da venda:`);
            console.log(venda.exibirDetalhes());
            console.log(`\nVenda removida com sucesso!\n`);
        } else {
            console.log(`\nVenda não encontrada.\n`);
        }
    }

    // Método para ler os dados no arquivo
    public load(): void {
        const leitor = new LeitorArquivo(this.arquivo);

        try {
            const linhas = leitor.lerArquivoLinhaPorLinha(); // Lê o conteúdo do arquivo

            // Limpa o array de vendas antes de adicionar novos
            this.vendas.splice(0);

            for (const linha of linhas) {
                // Separar a linha em seus atributos da venda
                const [idStr, 
                       cpf, 
                       tipo,
                       quantidadeStr,
                       itemIdStr,
                       itemNome,
                       itemPrecoStr,
                       totalStr
                    ] = linha.split(',').map(item => item.trim());

                // Converter o id de string para número
                const id = parseInt(idStr);

                // Converter a quantidade de string para número
                const quantidade = parseInt(quantidadeStr);

                // Converter o id do item de string para número
                const itemId = parseInt(itemIdStr);
                
                // Converter o preço de string para número
                const itemPreco = parseFloat(itemPrecoStr);

                // Converter o total de string para número
                const total = parseFloat(totalStr);

                if (isNaN(id)) {
                    console.error(`ID inválido para a venda: ${linha}`);
                } else if (this.cadastroCliente.findByCpfValue(cpf) == null) {
                    console.error(`Cliente não encontrado para a venda: ${linha}`);
                } else if (tipo != 'P' && tipo != 'S') {
                    console.error(`Tipo inválido para a venda: ${linha}`);
                } else if (isNaN(quantidade) || quantidade > 1000 || quantidade < 0) {
                    console.error(`Quantidade inválida para a venda: ${linha}`);
                } else if (isNaN(itemId)) {
                    console.error(`ID do item inválido para a venda: ${linha}`); 
                } else if (isNaN(itemPreco)) {
                    console.error(`Preço do item inválido para a venda: ${linha}`);
                } else if (isNaN(total)) {
                    console.error(`Total inválido para a venda: ${linha}`);
                } else {
                    const cliente = this.cadastroCliente.findByCpfValue(cpf)             
                    if (cliente) {
                        let servico: Servico | null = null;
                        let produto: Produto | null = null;
                        if (tipo == 'P') {
                            produto = this.cadastroProduto.findById(itemId)
                            if (produto == null) {
                                produto = new Produto(itemId, itemNome, itemPreco);
                            }
                        } else {
                            servico = this.cadastroServico.findById(itemId)
                            if (servico == null) {
                                servico = new Servico(itemId, itemNome, itemPreco);
                            }
                        }
                        // Criar o objeto Venda
                        let venda = new Venda(id, cliente, produto, servico, quantidade);
                        // Adicionar a venda à lista de vendas
                        this.vendas.push(venda);
                    }
                }
            }
        } catch (erro) {
            console.error(`Erro ao carregar o arquivo de vendas: ${erro}`);
        }
    }

    // Método para gravar os dados no arquivo (sobrescrever os dados)
    public send(): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Criar o conteúdo do arquivo a partir da lista de vendas
            const conteudo = this.vendas.map(venda => {
                return venda.toString();
            }).join('\n'); // Junta as linhas com quebras de linha

            // Gravar o conteúdo no arquivo
            gravador.gravarConteudo(conteudo);

        } catch (erro) {
            console.error('Erro ao gravar os dados no arquivo:', erro);
        }
    }

    // Método para gravar os dados no arquivo (sem sobrescrever os dados)
    public sendOne(venda: Venda): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Formatar o conteúdo para salvar no arquivo
            const conteudo = `\n${venda.toString()}`;

            // Gravar o conteúdo no arquivo (adicionando no final do arquivo)
            gravador.adicionarConteudo(conteudo);

        } catch (erro) {
            console.error('Erro ao gravar os dados no arquivo:', erro);
        }
    }

    // Método que retorna o maior id
    public findMaxId(): number {
        if (this.vendas.length === 0) {
            return 0;
        }

        let maxId = this.vendas[0].getId;

        for (const venda of this.vendas) {
            if (venda.getId > maxId) {
                maxId = venda.getId;
            }
        }

        return maxId;
    }

    // Método para procurar a venda pelo id
    public findById(id: number): Venda | null {
        let venda = this.vendas.find(venda => venda.getId === id);
        return venda || null;
    }

    // Método para procurar a venda pelo id e retornar o índice
    public findIndexById(id: number): number | null {
        let index = this.vendas.findIndex(venda => venda.getId === id);
        if (index == -1) {
            return null; 
        } else {
            return index;
        }
    }
}