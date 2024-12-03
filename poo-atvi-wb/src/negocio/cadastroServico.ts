import Entrada from "../io/entrada";
import LeitorArquivo from "../io/leitorArquivo";
import GravadorArquivo from "../io/gravadorArquivo";
import Servico from "../modelo/servico";
import Cadastro from "./cadastro";

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>;
    private arquivo: string;
    private entrada: Entrada;
    private maxId: number;
    constructor(servicos: Array<Servico>, arquivo: string) {
        super();
        this.servicos = servicos;
        this.arquivo = arquivo;
        this.entrada = new Entrada();
        this.load();
        this.maxId = this.findMaxId();
    }

    // CRUD (Create, Read, Update e Delete)
    // Create:
    public cadastrar(): void {
        console.log(`\nInício do cadastro de serviço`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do serviço: `);
        let preco = this.entrada.receberNumero(`Por favor informe o preco do serviço: `);
        let id = this.maxId + 1;
        let servico = new Servico(id, nome, preco);
        this.servicos.push(servico);
        this.sendOne(servico);
        this.maxId++;
        console.log(`\nCadastro concluído!\n`);
    }

    // Read:
    public consultar(): void {
        console.log(`\nConsulta de serviço`);   
        let id = this.entrada.receberNumero(`Por favor informe o ID do serviço: `);

        let servico = this.findById(id);

        if(servico == null) {
            console.log(`\nServiço não encontrado.\n`);
        } else {
            console.log(`\nInformações do serviço:`);
            console.log(`ID: ${servico.getId}`);
            console.log(`Serviço: ${servico.getNome}`);
            console.log(`Preço: R$ ${servico.getPreco.toFixed(2)}`);
            console.log(`\nConsulta concluída.\n`);
        }
    }

    // Update:
    public atualizar(): void {
        console.log(`\nInício da atualização do serviço`);
        let id = this.entrada.receberNumero(`Por favor informe o ID do serviço: `);

        let servico = this.findById(id);

        if(servico == null) {
            console.log(`\nServiço não encontrado.\n`);
            return;
        }

        let novoNome = this.entrada.receberTexto(`Novo Nome (deixe em branco para manter: ${servico.getNome}): `);
        let novoPreco = this.entrada.receberNumero(`Novo Preço (deixe em branco para manter: R$ ${servico.getPreco.toFixed(2)}): `);

        if (novoNome) servico.setNome = novoNome;
        if (novoPreco) servico.setPreco = novoPreco;

        this.send();
        console.log(`\nAtualização concluída!\n`);
    }

    // Delete:
    public remover(): void {
        console.log(`\nInício da remoção do serviço`);
        let id = this.entrada.receberNumero(`Por favor informe o ID do serviço: `);

        let servico = this.findById(id);

        if(servico == null) {
            console.log(`\nServiço não encontrado.\n`);
        } else {
            
            const indexToRemove = this.servicos.indexOf(servico);
        
            if (indexToRemove !== -1) {
                this.servicos.splice(indexToRemove, 1);
                this.send();
                console.log(`\nInformações do serviço:`);
                console.log(`ID: ${servico.getId}`);
                console.log(`Serviço: ${servico.getNome}`);
                console.log(`Preço: R$ ${servico.getPreco.toFixed(2)}`);
                console.log(`\nServiço removido com sucesso!\n`);
            } else {
                console.log("\nServiço não encontrado.\n");
            }
        }
    }

    // Método para ler os dados no arquivo
    public load(): void {
        const leitor = new LeitorArquivo(this.arquivo); // Supondo que 'this.arquivo' seja o nome do arquivo

        try {
            const linhas = leitor.lerArquivoLinhaPorLinha(); // Lê o conteúdo do arquivo

            // Limpa o array de produtos antes de adicionar novos
            this.servicos.splice(0);

            // Processa cada linha
            let idServico = 1; // ID inicial para os serviços, pode ser incrementado conforme a necessidade

            for (const linha of linhas) {
                // Separar a linha em nome e preço
                const [idStr, nome, precoStr] = linha.split(',').map(item => item.trim());

                // Converter o id de string para número
                const id = parseInt(idStr);

                // Converter o preço de string para número
                const preco = parseFloat(precoStr);

                if (isNaN(id)) {
                    console.error(`ID inválido para o serviço: ${linha}`);
                } else if (isNaN(preco)) {
                    console.error(`Preço inválido para o serviço: ${linha}`);
                } else {
                    // Criar o objeto Servico com o id, nome e preço
                    const servico = new Servico(id, nome, preco);
                    // Adicionar o serviço à lista de serviços
                    this.servicos.push(servico);
                }
            }
        } catch (erro) {
            console.error(`Erro ao carregar o arquivo de serviços: ${erro}`);
        }
    }

    // Método para gravar os dados no arquivo (sobrescrever os dados)
    public send(): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Criar o conteúdo do arquivo a partir da lista de serviços
            const conteudo = this.servicos.map(servico => {
                const id = servico.getId;    // ID do serviço
                const nome = servico.getNome;    // Nome do serviço
                const preco = servico.getPreco.toFixed(2);  // Preço do serviço formatado para 2 casas decimais

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
    public sendOne(servico: Servico): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Obter os dados do serviço
            const idServico = servico.getId;
            const nomeServico = servico.getNome;
            const precoServico = servico.getPreco.toFixed(2);  // Garantir que o preço tenha 2 casas decimais

            // Formatar o conteúdo para salvar no arquivo
            const conteudo = `\n${idServico}, ${nomeServico}, ${precoServico}`;

            // Gravar o conteúdo no arquivo (adicionando no final do arquivo)
            gravador.adicionarConteudo(conteudo);

        } catch (erro) {
            console.error('Erro ao gravar os dados no arquivo:', erro);
        }
    }

    // Método que retorna o maior id
    public findMaxId(): number {
        if (this.servicos.length === 0) {
            return 0;
        }

        let maxId = this.servicos[0].getId;

        for (const servico of this.servicos) {
            if (servico.getId > maxId) {
                maxId = servico.getId;
            }
        }

        return maxId;
    }

    // Método para procurar o produto pelo id
    public findById(id: number): Servico | null {
        const servico = this.servicos.find(servico => servico.getId === id);
        return servico || null;
    }
}