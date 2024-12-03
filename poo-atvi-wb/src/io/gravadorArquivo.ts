import * as fs from 'fs';
import * as path from 'path';

export default class GravadorArquivo {
  private caminhoArquivo: string;

  constructor(nomeArquivo: string) {
    // Caminho absoluto para o arquivo
    this.caminhoArquivo = path.join(__dirname, '..', 'assets', nomeArquivo);
  }

  // Método para gravar conteúdo no arquivo (sobrescreve o arquivo)
  public gravarConteudo(conteudo: string): void {
    try {
      // Cria ou sobrescreve o arquivo com o conteúdo fornecido
      fs.writeFileSync(this.caminhoArquivo, conteudo, 'utf-8');
      // console.log(`Conteúdo gravado com sucesso no arquivo: ${this.caminhoArquivo}`);
    } catch (err: unknown) {
      // Verifica se o erro é uma instância de Error
      if (err instanceof Error) {
        // Se for um erro, lança uma exceção com a mensagem
        throw new Error(`Erro ao gravar o arquivo: ${err.message}`);
      } else {
        // Caso o erro não seja do tipo Error, lança um erro genérico
        throw new Error('Erro desconhecido ao gravar o arquivo');
      }
    }
  }

  // Método para adicionar conteúdo ao arquivo (não sobrescreve, apenas adiciona)
  public adicionarConteudo(conteudo: string): void {
    try {
      // Adiciona o conteúdo ao final do arquivo
      fs.appendFileSync(this.caminhoArquivo, conteudo, 'utf-8');
      // console.log(`Conteúdo adicionado com sucesso ao arquivo: ${this.caminhoArquivo}`);
    } catch (err: unknown) {
      // Verifica se o erro é uma instância de Error
      if (err instanceof Error) {
        // Se for um erro, lança uma exceção com a mensagem
        throw new Error(`Erro ao adicionar conteúdo ao arquivo: ${err.message}`);
      } else {
        // Caso o erro não seja do tipo Error, lança um erro genérico
        throw new Error('Erro desconhecido ao adicionar conteúdo ao arquivo');
      }
    }
  }
}
