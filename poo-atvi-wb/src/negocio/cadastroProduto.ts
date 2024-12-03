import Entrada from "../io/entrada";
import LeitorArquivo from "../io/leitorArquivo";
import GravadorArquivo from "../io/gravadorArquivo";
import Produto from "../modelo/produto";
import Cadastro from "./cadastro";

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>;
    private arquivo: string;
    private entrada: Entrada;
    private maxId: number;
    constructor(produtos: Array<Produto>, arquivo: string) {
        super();
        this.produtos = produtos;
        this.arquivo = arquivo;
        this.entrada = new Entrada();
        this.load();
        this.maxId = this.findMaxId();
    }

    // CRUD (Create, Read, Update e Delete)
    // Create:
    public cadastrar(): void {
        console.log(`\nInício do cadastro de produto`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `);
        let preco = this.entrada.receberNumero(`Por favor informe o preco do produto: `);
        let id = this.maxId + 1;
        let produto = new Produto(id, nome, preco);
        this.produtos.push(produto);
        this.sendOne(produto);
        this.maxId++;
        console.log(`\nCadastro concluído!\n`);
    }

    // Read:
    public consultar(): void {
        console.log(`\nConsulta de produto`);   
        let id = this.entrada.receberNumero(`Por favor informe o ID do produto: `);
        
        let produto = this.findById(id);

        if(produto == null) {
            console.log(`\nProduto não encontrado.\n`);
        } else {
            console.log(`\nInformações do produto:`);
            console.log(`ID: ${produto.getId}`);
            console.log(`Produto: ${produto.getNome}`);
            console.log(`Preço: R$ ${produto.getPreco.toFixed(2)}`);
            console.log(`\nConsulta concluída.\n`);
        }
    }

    // Update:
    public atualizar(): void {
        console.log(`\nInício da atualização do produto`);
        let id = this.entrada.receberNumero(`Por favor informe o ID do produto: `);

        let produto = this.findById(id);

        if(produto == null) {
            console.log(`\nProduto não encontrado.\n`);
            return;
        }

        let novoNome = this.entrada.receberTexto(`Novo Nome (deixe em branco para manter: ${produto.getNome}): `);
        let novoPreco = this.entrada.receberNumero(`Novo Preço (deixe em branco para manter: R$ ${produto.getPreco.toFixed(2)}): `);

        if (novoNome) produto.setNome = novoNome;
        if (novoPreco) produto.setPreco = novoPreco;

        this.send();
        console.log(`\nAtualização concluída!\n`);
    }

    // Delete:
    public remover(): void {
        console.log(`\nInício da remoção do produto`);
        let id = this.entrada.receberNumero(`Por favor informe o ID do produto: `);

        let produto = this.findById(id);

        if (produto == null) {
            console.log(`\nProduto não encontrado.\n`);
        } else {

            const indexToRemove = this.produtos.indexOf(produto);
        
            if (indexToRemove !== -1) {
                this.produtos.splice(indexToRemove, 1);
                this.send();
                console.log(`\nInformações do produto:`);
                console.log(`ID: ${produto.getId}`);
                console.log(`Produto: ${produto.getNome}`);
                console.log(`Preço: R$ ${produto.getPreco.toFixed(2)}`);
                console.log(`\nProduto removido com sucesso!\n`);
            } else {
                console.log("\nProduto não encontrado.\n");
            }
        }
    }

    // Método para ler os dados no arquivo
    public load(): void {
        const leitor = new LeitorArquivo(this.arquivo); // Supondo que 'this.arquivo' seja o nome do arquivo

        try {
            const linhas = leitor.lerArquivoLinhaPorLinha(); // Lê o conteúdo do arquivo

            // Limpa o array de produtos antes de adicionar novos
            this.produtos.splice(0);

            for (const linha of linhas) {
                // Separar a linha em nome e preço
                const [idStr, nome, precoStr] = linha.split(',').map(item => item.trim());

                // Converter o id de string para número
                const id = parseInt(idStr);

                // Converter o preço de string para número
                const preco = parseFloat(precoStr);

                if (isNaN(id)) {
                    console.error(`ID inválido para o produto: ${linha}`);
                } else if (isNaN(preco)) {
                    console.error(`Preço inválido para o produto: ${linha}`);
                } else {
                    // Criar o objeto Produto com o id, nome e preço
                    const produto = new Produto(id, nome, preco);
                    // Adicionar o produto à lista de produtos
                    this.produtos.push(produto);
                }
            }
        } catch (erro) {
            console.error(`Erro ao carregar o arquivo de produtos: ${erro}`);
        }
    }

    // Método para gravar os dados no arquivo (sobrescrever os dados)
    public send(): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Criar o conteúdo do arquivo a partir da lista de produtos
            const conteudo = this.produtos.map(produto => {
                const id = produto.getId;    // ID do produto
                const nome = produto.getNome;    // Nome do produto
                const preco = produto.getPreco.toFixed(2);  // Preço do produto formatado para 2 casas decimais

                // Formatar o conteúdo para salvar no arquivo
                return `${id}, ${nome}, ${preco}`;
            }).join('\n'); // Junta as linhas com quebras de linha

            // Gravar o conteúdo no arquivo
            gravador.gravarConteudo(conteudo);

        } catch (erro) {
            console.error('Erro ao gravar os dados no arquivo:', erro);
        }
    }

    // Método para gravar os dados no arquivo (sem sobrescrever os dados)
    public sendOne(produto: Produto): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Obter os dados do produto
            const idProduto = produto.getId;
            const nomeProduto = produto.getNome;
            const precoProduto = produto.getPreco.toFixed(2);  // Garantir que o preço tenha 2 casas decimais

            // Formatar o conteúdo para salvar no arquivo
            const conteudo = `\n${idProduto}, ${nomeProduto}, ${precoProduto}`;

            // Gravar o conteúdo no arquivo (adicionando no final do arquivo)
            gravador.adicionarConteudo(conteudo);

        } catch (erro) {
            console.error('Erro ao gravar os dados no arquivo:', erro);
        }
    }

    // Método que retorna o maior id
    public findMaxId(): number {
        if (this.produtos.length === 0) {
            return 0;
        }

        let maxId = this.produtos[0].getId;

        for (const produto of this.produtos) {
            if (produto.getId > maxId) {
                maxId = produto.getId;
            }
        }

        return maxId;
    }

    // Método para procurar o produto pelo id
    public findById(id: number): Produto | null {
        const produto = this.produtos.find(produto => produto.getId === id);
        return produto || null;
    }
}