import Venda from "./venda"
import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"
import CadastroVenda from "../negocio/cadastroVenda";
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import ListagemVendas from "../negocio/listagemVendas";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemProdutos from "../negocio/listagemProdutos";
import ListagemServicos from "../negocio/listagemServicos";

export default class Empresa{
    private vendas: Array<Venda>;
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private cadVenda: CadastroVenda;
    private cadCliente: CadastroCliente;
    private cadProduto: CadastroProduto;
    private cadServico: CadastroServico;
    private listVenda: ListagemVendas;
    private listCliente: ListagemClientes;
    private listProduto: ListagemProdutos;
    private listServico: ListagemServicos;

    constructor(arquivo_clientes: string, arquivo_produtos: string, arquivo_servicos: string, arquivo_vendas: string){
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
        this.vendas = [];
        this.cadCliente = new CadastroCliente(this.clientes, arquivo_clientes);
        this.cadProduto = new CadastroProduto(this.produtos, arquivo_produtos);
        this.cadServico = new CadastroServico(this.servicos, arquivo_servicos);
        this.cadVenda = new CadastroVenda(this.vendas, this.cadCliente, this.cadProduto, this.cadServico, arquivo_vendas);
        this.listCliente = new ListagemClientes(this.clientes);
        this.listProduto = new ListagemProdutos(this.produtos);
        this.listServico = new ListagemServicos(this.servicos);
        this.listVenda = new ListagemVendas(this.vendas);
    }
    public get getClientes(){
        return this.clientes;
    }
    public get getProdutos(){
        return this.produtos;
    }
    public get getServicos(){
        return this.servicos;
    }
    public get getVendas(){
        return this.vendas;
    }
    public get getCadCliente(){
        return this.cadCliente;
    }
    public get getCadProduto(){
        return this.cadProduto;
    }
    public get getCadServico(){
        return this.cadServico;
    }
    public get getCadVenda(){
        return this.cadVenda;
    }
    public get getListCliente(){
        return this.listCliente;
    }
    public get getListProduto(){
        return this.listProduto;
    }
    public get getListServico(){
        return this.listServico;
    }
    public get getListVenda(){
        return this.listVenda;
    }
}