import Entrada from "../io/entrada";
import LeitorArquivo from "../io/leitorArquivo";
import GravadorArquivo from "../io/gravadorArquivo";
import Cliente from "../modelo/cliente";
import Sexo from "../modelo/sexo";
import CPF from "../modelo/cpf";
import Cadastro from "./cadastro";
import telaRg from "../app/telaRg";
import ListagemRgs from "./listagemRgs";
import telaTelefone from "../app/telaTelefone";
import ListagemTelefones from "./listagemTelefones";
import telaProduto from "../app/telaProduto";
import ListagemProdutos from "./listagemProdutos";
import telaServico from "../app/telaServico";
import ListagemServicos from "./listagemServicos";


export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private arquivo: string
    private entrada: Entrada
    constructor(clientes: Array<Cliente>, arquivo: string) {
        super()
        this.clientes = clientes
        this.arquivo = arquivo
        this.entrada = new Entrada()
        this.load()
    }

    // CRUD (Create, Read, Update e Delete)
    // Create:
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let sexo = new Sexo(this.entrada.receberTexto(`Por favor informe o sexo (M | F): `));
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/')
        let ano = new Number(partesData[2].valueOf()).valueOf()
        let mes = new Number(partesData[1].valueOf()).valueOf()
        let dia = new Number(partesData[0].valueOf()).valueOf()
        let dataEmissao = new Date(ano, mes, dia)
        let cpf = new CPF(valor, dataEmissao);
        let cliente = new Cliente(nome, nomeSocial, sexo, cpf);
        this.clientes.push(cliente)
        this.sendOne(cliente);
        console.log(`\nCadastro concluído!\n`);
    }

    // Read:
    public consultar(): void {
        console.log(`\nConsulta de cliente`);
        let cpfValor = this.entrada.receberTexto(`Por favor informe o número do CPF do cliente a ser consultado: `);
        
        // Encontra o cliente com o CPF fornecido
        let cliente = this.findByCpfValue(cpfValor)

        if (cliente) {
            
            console.log(cliente.toString());
            
            console.log(`\nConsulta concluída.\n`);
        } else {
            console.log(`\nCliente com o CPF informado não encontrado.\n`);
        }
    }

    // Update:
    public atualizar(): void {
        console.log(`\nInício da atualização do cliente`);
        let cpfValor = this.entrada.receberTexto(`Por favor informe o número do CPF do cliente a ser atualizado: `);

        // Encontra o cliente com o CPF fornecido
        let cliente = this.findByCpfValue(cpfValor)

        if (cliente == null) {
            console.log(`\nCliente com o CPF informado não encontrado.\n`);
            return;
        }

        let novoNome = this.entrada.receberTexto(`Novo nome do cliente (deixe em branco para manter: ${cliente.getNome}): `);
        let novoNomeSocial = this.entrada.receberTexto(`Novo nome social do cliente (deixe em branco para manter: ${cliente.getNomeSocial}): `);
        let novoSexo = this.entrada.receberTexto(`Novo sexo do cliente (deixe em branco para manter: ${cliente.getSexo}): `);

        if (novoNome) cliente.setNome = novoNome;
        if (novoNomeSocial) cliente.setNomeSocial = novoNomeSocial;
        if (novoSexo) cliente.setSexo = new Sexo(novoSexo);

        let resposta = this.entrada.receberTexto(`Atualizar informações de RG? (sim | não): `);
        resposta.toLowerCase();
        if (resposta === "sim" || resposta === "yes") {
            telaRg(cliente);
        }

        resposta = this.entrada.receberTexto(`Atualizar informações de telefone? (sim | não): `);
        resposta.toLowerCase();
        if (resposta === "sim" || resposta === "yes") {
            telaTelefone(cliente);
        }

        // resposta = this.entrada.receberTexto(`Atualizar informações de produto? (sim | não): `);
        // resposta.toLowerCase();
        // if (resposta === "sim" || resposta === "yes") {
        //     telaProduto(cliente.getProdutosConsumidos);
        // }

        // resposta = this.entrada.receberTexto(`Atualizar informações de serviço? (sim | não): `);
        // resposta.toLowerCase();
        // if (resposta === "sim" || resposta === "yes") {
        //     telaServico(cliente.getServicosConsumidos);
        // }
        this.send();
        console.log(`\nAtualização concluída :)\n`);
    }

    // Delete:
    public remover(): void {
        console.log(`\nInício da remoção do cliente`);
        let cpfValor = this.entrada.receberTexto(`Por favor informe o número do CPF do cliente a ser removido: `);
        
        let index = this.findIndexByCpfValue(cpfValor)

        if (index) {
            this.clientes.splice(index, 1);
            this.send();
            console.log(`\nCliente removido com sucesso :)\n`);
        } else {
            console.log(`\nCliente com o CPF informado não encontrado.\n`);
        }
    }
    
    // Método para ler os dados no arquivo
    public load(): void {
        
        const leitor = new LeitorArquivo(this.arquivo);
        
        try {
          const linhas = leitor.lerArquivoLinhaPorLinha();
          
          this.clientes.splice(0);
          // Processar cada linha
          for (const linha of linhas) {
            const [nomeCompleto, nomeSocial, sexo, cpf, dataEmissao] = linha.split(',').map(item => item.trim());
      
            // Separar a data
            const partesData = dataEmissao.split('/');
            const dia = parseInt(partesData[0], 10);
            const mes = parseInt(partesData[1], 10) - 1; // Meses no JavaScript são de 0 a 11
            const ano = parseInt(partesData[2], 10);
      
            // Criar o objeto Date para a data de emissão
            const dataEmissaoDate = new Date(ano, mes, dia);
      
            // Criação do CPF e Cliente
            const cpfObj = new CPF(cpf, dataEmissaoDate);
            const sexoObj = new Sexo(sexo);
            const cliente = new Cliente(nomeCompleto, nomeSocial, sexoObj, cpfObj);

            // Adicionar o cliente a lista de clientes
            this.clientes.push(cliente)
            // console.log(cliente);
          }
        } catch (erro) {
          console.error(erro);
        }
    }

    // Método para gravar os dados no arquivo (sobrescrever os dados)
    public send(): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Criar o conteúdo do arquivo a partir da lista de clientes
            const conteudo = this.clientes.map(cliente => {
            const nomeCompleto = cliente.getNome;
            const nomeSocial = cliente.getNomeSocial;
            const sexo = cliente.getSexoAbreviado;
            const cpf = cliente.getCpf.getValor; // Supondo que a classe CPF tenha um método getNumero()
            const dataEmissao = cliente.getCpf.getDataEmissaoFormatada; // Formatar a data de emissão para 'dd/mm/yyyy'

            // Formatar o conteúdo para salvar no arquivo
            return `${nomeCompleto}, ${nomeSocial}, ${sexo}, ${cpf}, ${dataEmissao}`;
            }).join('\n'); // Junta as linhas com quebras de linha

            // Gravar o conteúdo no arquivo
            gravador.gravarConteudo(conteudo);

        } catch (erro) {
            console.error('Erro ao gravar os dados no arquivo:', erro);
        }
    }

    // Método para gravar os dados no arquivo (sem sobrescrever os dados)
    public sendOne(cliente: Cliente): void {
        const gravador = new GravadorArquivo(this.arquivo);

        try {
            // Obter os dados do cliente
            const nomeCompleto = cliente.getNome;
            const nomeSocial = cliente.getNomeSocial;
            const sexo = cliente.getSexoAbreviado;
            const cpf = cliente.getCpf.getValor; // Supondo que a classe CPF tenha um método getNumero()
            const dataEmissao = cliente.getCpf.getDataEmissaoFormatada; // Formatar a data de emissão para 'dd/mm/yyyy'

            // Formatar o conteúdo para salvar no arquivo
            const conteudo = `\n${nomeCompleto}, ${nomeSocial}, ${sexo}, ${cpf}, ${dataEmissao}`;

            // Gravar o conteúdo no arquivo
            gravador.adicionarConteudo(conteudo);

        } catch (erro) {
            console.error('Erro ao gravar os dados no arquivo:', erro);
        }
    }

    // Método para procurar o cliente pelo valor do CPF
    public findByCpfValue(cpfValue: string): Cliente | null {
        let cpf = new CPF(cpfValue, new Date());
        let cliente = this.clientes.find(cliente => cliente.getCpf.equals(cpf));
        return cliente || null;
    }
    // Método para procurar o cliente pelo CPF (Objeto)
    public findByCpf(cpf: CPF): Cliente | null {
        let cliente = this.clientes.find(cliente => cliente.getCpf.equals(cpf));
        return cliente || null;
    }
    // Método para procurar o cliente pelo valor do CPF e retornar o índice
    public findIndexByCpfValue(cpfValue: string): number | null {
        let cpf = new CPF(cpfValue, new Date());
        let index = this.clientes.findIndex(cliente => cliente.getCpf.equals(cpf));
        if (index == -1) {
            return null; 
        } else {
            return index;
        }
    }
    // Método para procurar o cliente pelo CPF (Objeto) e retorna o índice
    public findIndexByCpf(cpf: CPF): number | null {
        let index = this.clientes.findIndex(cliente => cliente.getCpf.equals(cpf));
        if (index == -1) {
            return null; 
        } else {
            return index;
        }
    }
}