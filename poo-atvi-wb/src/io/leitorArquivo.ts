import * as fs from 'fs';
import * as path from 'path';

export default class LeitorArquivo {
  private caminhoArquivo: string;

  constructor(nomeArquivo: string) {
    // Caminho absoluto para o arquivo
    this.caminhoArquivo = path.join(__dirname, '..', 'assets', nomeArquivo);
  }

  // Método para ler o arquivo de forma síncrona
  public lerArquivoLinhaPorLinha(): string[] {
    try {
      // Lê o conteúdo do arquivo de forma síncrona
      const conteudoArquivo = fs.readFileSync(this.caminhoArquivo, 'utf-8');

      // Divide o conteúdo do arquivo por linhas
      const linhas = conteudoArquivo.split('\n');

      // Retorna as linhas lidas
      return linhas;
    } catch (err: unknown) {
      // Verifica se o erro é uma instância de Error
      if (err instanceof Error) {
        // Se for um erro, lança uma exceção com a mensagem
        throw new Error(`Erro ao ler o arquivo: ${err.message}`);
      } else {
        // Caso o erro não seja do tipo Error, lança um erro genérico
        throw new Error('Erro desconhecido ao ler o arquivo');
      }
    }
  }
}
