export default class CPF {
    private valor: string
    private dataEmissao: Date
    constructor(valor: string, dataEmissao: Date) {
        this.valor = valor
        this.dataEmissao = dataEmissao
    }
    public get getValor(): string {
        return this.valor
    }
    public get getDataEmissao(): Date {
        return this.dataEmissao
    }

    // Método para retornar a data no formato dd/mm/aaaa
    public get getDataEmissaoFormatada(): string {
        const dia = this.dataEmissao.getDate().toString().padStart(2, '0');
        const mes = (this.dataEmissao.getMonth() + 1).toString().padStart(2, '0');
        const ano = this.dataEmissao.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    public equals(cpf: CPF): boolean {
        return this.valor === cpf.getValor;
    }

}