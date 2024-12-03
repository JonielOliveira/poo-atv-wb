import Sexo from "./sexo"
import CPF from "./cpf"
import RG from "./rg"
import Telefone from "./telefone"
import Produto from "./produto"
import Servico from "./servico"

export default class Cliente {
    private nome: string;
    private nomeSocial: string;
    private sexo: Sexo;
    private cpf: CPF;
    private rgs: Array<RG>;
    private dataCadastro: Date;
    private telefones: Array<Telefone>;
    private produtosConsumidos: Array<Produto>;
    private servicosConsumidos: Array<Servico>;

    constructor(nome: string, nomeSocial: string, sexo: Sexo, cpf: CPF) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.sexo = sexo;
        this.cpf = cpf;
        this.rgs = [];
        this.dataCadastro = new Date();
        this.telefones = [];
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
    }

    public get getNome(): string {
        return this.nome;
    }
    public set setNome(nome: string) {
        this.nome = nome;
    }
    public get getNomeSocial(): string {
        return this.nomeSocial;
    }
    public set setNomeSocial(nomeSocial: string) {
        this.nomeSocial = nomeSocial;
    }
    public get getSexo(): string {
        return this.sexo.getTipo;
    }
    public get getSexoAbreviado(): string {
        return this.sexo.getTipoAbreviado;
    }
    public set setSexo(sexo: Sexo) {
        this.sexo = sexo;
    }
    public get getCpf(): CPF {
        return this.cpf;
    }
    public get getRgs(): Array<RG> {
        return this.rgs;
    }
    public set setRgs(rgs: Array<RG>) {
        this.rgs = rgs;
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro;
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones;
    }
    public set setTelefones(telefones: Array<Telefone>) {
        this.telefones = telefones;
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos;
    }
    public set setProdutosConsumidos(produtosConsumidos: Array<Produto>) {
        this.produtosConsumidos = produtosConsumidos;
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos;
    }
    public set setServicosConsumidos(servicosConsumidos: Array<Servico>) {
        this.servicosConsumidos = servicosConsumidos;
    }
    public totalConsumoProdutos(): number {
        let total = 0.0;
        this.produtosConsumidos.forEach((produto) => {
            total += produto.getPreco;
        });
        return total;
    }
    public totalConsumoServicos(): number {
        let total = 0.0;
        this.servicosConsumidos.forEach((servico) => {
            total += servico.getPreco;
        });
        return total;
    }
    public totalConsumo(): number {
        return this.totalConsumoProdutos() + this.totalConsumoServicos();
    }

    public toString() {
        let resposta = "";
        resposta += `Nome: ${this.nome}\n`;
        resposta += `Nome Social: ${this.nomeSocial}\n`;
        resposta += `Sexo: ${this.sexo.getTipo}\n`;
        resposta += `CPF: ${this.cpf.getValor}\n`;
        resposta += `Data de Emissão do CPF: ${this.cpf.getDataEmissao.toLocaleDateString()}\n`;
        
        resposta += `RG(s):\n`;
        if(this.rgs.length > 0) {
            for (let i = 0; i < this.rgs.length; i++) {
                resposta += `  [${i+1}] ${this.rgs[i]}\n`;
            }
        } else {
            resposta += `<nenhum RG cadastrado>\n`;
        }

        resposta += `Telefone(s):\n`;
        if(this.telefones.length > 0) {
            for (let i = 0; i < this.telefones.length; i++) {
                resposta += `  [${i+1}] ${this.telefones[i]}\n`;
            }
        } else {
            resposta += `<nenhum telefone cadastrado>\n`;
        }

        resposta += `Produto(s) Consumido(s):\n`;
        if(this.produtosConsumidos.length > 0) {
            for (let i = 0; i < this.produtosConsumidos.length; i++) {
                resposta += `  [${i+1}] ${this.produtosConsumidos[i]}\n`;
            }
            resposta += `  Total em Produtos: R$ ${this.totalConsumoProdutos().toFixed(2)}\n`;
        } else {
            resposta += `<nenhum produto consumido>\n`;
        }

        resposta += `Serviço(s) Consumido(s):\n`;
        if(this.servicosConsumidos.length > 0) {
            for (let i = 0; i < this.servicosConsumidos.length; i++) {
                resposta += `  [${i+1}] ${this.servicosConsumidos[i]}\n`;
            }
            resposta += `  Total em Serviços: R$ ${this.totalConsumoServicos().toFixed(2)}\n`;
        } else {
            resposta += `<nenhum serviço consumido>\n`;
        }
        resposta += `Total: R$ ${this.totalConsumo().toFixed(2)}\n`;
        return resposta;
    }
}