import Cliente from "../modelo/cliente";
import Venda from "../modelo/venda";
import Listagem from "./listagem";

export default class ListagemVendas extends Listagem {
    private vendas: Array<Venda>
    constructor(vendas: Array<Venda>) {
        super()
        this.vendas = vendas
    }

    // Método para listar os N clientes que mais consumiram em quantidade
    public listarClientesMaisConsumiramPorQuantidade(numero: number): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Clientes que mais consumiram (em quantidade):\n`);
        
        // Criar um mapa para armazenar a quantidade total consumida por cada cliente
        let quantidadePorCliente: Map<Cliente, number> = new Map();

        // Acumular as quantidades consumidas por cada cliente
        for (let venda of this.vendas) {
            let cliente = venda.getCliente;
            let quantidade = venda.getQuantidade;

            // Se o cliente já estiver no mapa, soma a quantidade, senão inicializa com a quantidade da venda
            if (quantidadePorCliente.has(cliente)) {
                quantidadePorCliente.set(cliente, quantidadePorCliente.get(cliente)! + quantidade);
            } else {
                quantidadePorCliente.set(cliente, quantidade);
            }
        }

        // Converter o mapa para um array e ordenar em ordem decrescente pela quantidade consumida
        let clientesOrdenados = Array.from(quantidadePorCliente.entries())
            .sort((a, b) => b[1] - a[1]); // Ordena pela quantidade consumida (decrescente)

        // Limitar a exibição para os top N
        let topN;
        if (numero == 0) {
            topN = clientesOrdenados;
        } else {
            topN = clientesOrdenados.slice(0, numero);
        }

        // Exibir o resultado
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let cliente = entry[0];
                let quantidade = entry[1];
                console.log(`[${index + 1}] Cliente: ${cliente.getCpf.getValor}, ${cliente.getNome} - Quantidade Consumida: ${quantidade}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada..\n`);
        }
    }


    // Método para listar os N clientes que menos consumiram em quantidade
    public listarClientesMenosConsumiramPorQuantidade(numero: number): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Clientes que menos consumiram (em quantidade):\n`);
        
        // Criar objetos para armazenar os clientes e a quantidade consumida por cada um
        let quantidadePorCliente: Map<Cliente, number> = new Map();

        // Acumular as quantidades consumidas por cada cliente
        for (let venda of this.vendas) {
            let cliente = venda.getCliente;
            let quantidade = venda.getQuantidade;

            // Se o cliente já estiver no mapa, soma a quantidade, senão inicializa com a quantidade da venda
            if (quantidadePorCliente.has(cliente)) {
                quantidadePorCliente.set(cliente, quantidadePorCliente.get(cliente)! + quantidade);
            } else {
                quantidadePorCliente.set(cliente, quantidade);
            }
        }

        // Converter o mapa para um array e ordenar em ordem crescente pela quantidade consumida
        let clientesOrdenados = Array.from(quantidadePorCliente.entries())
            .sort((a, b) => a[1] - b[1]); // Ordena pela quantidade consumida (crescente)

        // Limitar a exibição para os top N (menos consumidores)
        let topN;
        if (numero == 0) {
            topN = clientesOrdenados;
        } else {
            topN = clientesOrdenados.slice(0, numero);
        }

        // Exibir os resultados
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let cliente = entry[0];
                let quantidade = entry[1];
                console.log(`[${index + 1}] Cliente: ${cliente.getCpf.getValor}, ${cliente.getNome} - Quantidade Consumida: ${quantidade}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada.\n`);
        }
    }


    // Método para listar os N clientes que mais consumiram em valor
    public listarClientesMaisConsumiramPorValor(numero: number): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Clientes que mais consumiram (em valor):\n`);
        
        // Criar um mapa para armazenar o valor total consumido por cada cliente
        let valorPorCliente: Map<Cliente, number> = new Map();

        // Acumular os valores consumidos por cada cliente
        for (let venda of this.vendas) {
            let cliente = venda.getCliente;
            let valorTotal = venda.calcularTotal(); // Chama o método que já calcula o valor total da venda

            // Se o cliente já estiver no mapa, soma o valor total da venda, senão inicializa com o valor da venda
            if (valorPorCliente.has(cliente)) {
                valorPorCliente.set(cliente, valorPorCliente.get(cliente)! + valorTotal);
            } else {
                valorPorCliente.set(cliente, valorTotal);
            }
        }

        // Converter o mapa para um array e ordenar em ordem decrescente pelo valor consumido
        let clientesOrdenados = Array.from(valorPorCliente.entries())
            .sort((a, b) => b[1] - a[1]); // Ordena pelo valor consumido (decrescente)

        // Limitar a exibição para os top N (mais consumidores em valor)
        let topN;
        if (numero == 0) {
            topN = clientesOrdenados;
        } else {
            topN = clientesOrdenados.slice(0, numero);
        }

        // Exibir os resultados
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let cliente = entry[0];
                let valor = entry[1];
                console.log(`[${index + 1}] Cliente: ${cliente.getCpf.getValor}, ${cliente.getNome} - Valor Consumido: R$ ${valor.toFixed(2)}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada.\n`);
        }
    }


    // Método para listar os N clientes que menos consumiram em valor
    public listarClientesMenosConsumiramPorValor(numero: number): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Clientes que menos consumiram (em valor):\n`);
        
        // Criar um mapa para armazenar o valor total consumido por cada cliente
        let valorPorCliente: Map<Cliente, number> = new Map();

        // Acumular os valores consumidos por cada cliente
        for (let venda of this.vendas) {
            let cliente = venda.getCliente;
            let valorTotal = venda.calcularTotal(); // Chama o método que já calcula o valor total da venda

            // Se o cliente já estiver no mapa, soma o valor total da venda, senão inicializa com o valor da venda
            if (valorPorCliente.has(cliente)) {
                valorPorCliente.set(cliente, valorPorCliente.get(cliente)! + valorTotal);
            } else {
                valorPorCliente.set(cliente, valorTotal);
            }
        }

        // Converter o mapa para um array e ordenar em ordem crescente pelo valor consumido
        let clientesOrdenados = Array.from(valorPorCliente.entries())
            .sort((a, b) => a[1] - b[1]); // Ordena pelo valor consumido (crescente)

        // Limitar a exibição para os top N (menos consumidores em valor)
        let topN;
        if (numero == 0) {
            topN = clientesOrdenados;
        } else {
            topN = clientesOrdenados.slice(0, numero);
        }

        // Exibir os resultados
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let cliente = entry[0];
                let valor = entry[1];
                console.log(`[${index + 1}] Cliente: ${cliente.getNome} - Valor Consumido: R$ ${valor.toFixed(2)}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda registrada para calcular o consumo.\n`);
        }
    }


    // Método para listar os N produtos ou serviços mais consumidos em quantidade
    public listarItensMaisConsumidos(numero: number): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Produtos ou Serviços mais consumidos (em quantidade):\n`);
        
        // Criar um mapa para armazenar a quantidade total consumida de cada produto ou serviço
        let consumoPorItem: Map<string, { id: number, tipo: string, quantidade: number }> = new Map();

        // Acumular a quantidade consumida de cada produto ou serviço
        for (let venda of this.vendas) {
            if (venda.getTipo === "P" && venda.getProdutoConsumido) {
                // Se for um produto, soma a quantidade consumida
                let produto = venda.getProdutoConsumido;
                let quantidade = venda.getQuantidade;

                if (consumoPorItem.has(produto.getNome)) {
                    consumoPorItem.set(produto.getNome, {
                        id: produto.getId,
                        tipo: 'Produto',
                        quantidade: consumoPorItem.get(produto.getNome)!.quantidade + quantidade
                    });
                } else {
                    consumoPorItem.set(produto.getNome, {
                        id: produto.getId,
                        tipo: 'Produto',
                        quantidade: quantidade
                    });
                }
            } else if (venda.getTipo === "S" && venda.getServicoConsumido) {
                // Se for um serviço, soma a quantidade consumida
                let servico = venda.getServicoConsumido;
                let quantidade = venda.getQuantidade;

                if (consumoPorItem.has(servico.getNome)) {
                    consumoPorItem.set(servico.getNome, {
                        id: servico.getId,
                        tipo: 'Serviço',
                        quantidade: consumoPorItem.get(servico.getNome)!.quantidade + quantidade
                    });
                } else {
                    consumoPorItem.set(servico.getNome, {
                        id: servico.getId,
                        tipo: 'Serviço',
                        quantidade: quantidade
                    });
                }
            }
        }

        // Converter o mapa para um array e ordenar em ordem decrescente pelo total consumido
        let itensOrdenados = Array.from(consumoPorItem.entries())
            .sort((a, b) => b[1].quantidade - a[1].quantidade); // Ordena pela quantidade consumida (decrescente)

        // Limitar a exibição para os top N (mais consumidos)
        let topN;
        if (numero == 0) {
            topN = itensOrdenados;
        } else {
            topN = itensOrdenados.slice(0, numero);
        }

        // Exibir os resultados
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let itemNome = entry[0];
                let itemInfo = entry[1];  // { id, tipo, quantidade }
                console.log(`[${index + 1}] (ID: ${itemInfo.id}, Tipo: ${itemInfo.tipo}) ${itemNome} - Quantidade Consumida: ${itemInfo.quantidade}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada.\n`);
        }
    }


    // Método para listar os N produtos ou serviços menos consumidos em quantidade
    public listarItensMenosConsumidos(numero: number): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Produtos ou Serviços menos consumidos (em quantidade):\n`);
        
        // Criar um mapa para armazenar a quantidade total consumida de cada produto ou serviço
        let consumoPorItem: Map<string, { id: number, tipo: string, quantidade: number }> = new Map();

        // Acumular a quantidade consumida de cada produto ou serviço
        for (let venda of this.vendas) {
            if (venda.getTipo === "P" && venda.getProdutoConsumido) {
                // Se for um produto, soma a quantidade consumida
                let produto = venda.getProdutoConsumido;
                let quantidade = venda.getQuantidade;

                if (consumoPorItem.has(produto.getNome)) {
                    consumoPorItem.set(produto.getNome, {
                        id: produto.getId,
                        tipo: 'Produto',
                        quantidade: consumoPorItem.get(produto.getNome)!.quantidade + quantidade
                    });
                } else {
                    consumoPorItem.set(produto.getNome, {
                        id: produto.getId,
                        tipo: 'Produto',
                        quantidade: quantidade
                    });
                }
            } else if (venda.getTipo === "S" && venda.getServicoConsumido) {
                // Se for um serviço, soma a quantidade consumida
                let servico = venda.getServicoConsumido;
                let quantidade = venda.getQuantidade;

                if (consumoPorItem.has(servico.getNome)) {
                    consumoPorItem.set(servico.getNome, {
                        id: servico.getId,
                        tipo: 'Serviço',
                        quantidade: consumoPorItem.get(servico.getNome)!.quantidade + quantidade
                    });
                } else {
                    consumoPorItem.set(servico.getNome, {
                        id: servico.getId,
                        tipo: 'Serviço',
                        quantidade: quantidade
                    });
                }
            }
        }

        // Converter o mapa para um array e ordenar em ordem crescente pelo total consumido
        let itensOrdenados = Array.from(consumoPorItem.entries())
            .sort((a, b) => a[1].quantidade - b[1].quantidade); // Ordena pela quantidade consumida (crescente)

        // Limitar a exibição para os top N (menos consumidos)
        let topN;
        if (numero == 0) {
            topN = itensOrdenados;
        } else {
            topN = itensOrdenados.slice(0, numero);
        }

        // Exibir os resultados
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let itemNome = entry[0];
                let itemInfo = entry[1];  // { id, tipo, quantidade }
                console.log(`[${index + 1}] (ID: ${itemInfo.id}, Tipo: ${itemInfo.tipo}) ${itemNome} - Quantidade Consumida: ${itemInfo.quantidade}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada.\n`);
        }
    }


    // Método para listar os N produtos ou serviços mais consumidos por gênero
    public listarItensMaisConsumidosPorGenero(numero: number, genero: string): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Produtos ou Serviços mais consumidos para o gênero ${genero === 'M' ? 'Masculino' : 'Feminino'}:\n`);

        // Criar um mapa para armazenar a quantidade consumida de cada produto ou serviço
        let consumoPorItem: Map<string, { id: number, tipo: string, quantidade: number }> = new Map();

        // Acumular a quantidade consumida de cada produto ou serviço pelo gênero
        for (let venda of this.vendas) {
            let cliente = venda.getCliente;
            let generoCliente = cliente.getSexoAbreviado;

            // Verificar se a venda corresponde ao gênero passado como parâmetro
            if (generoCliente === genero) {
                if (venda.getTipo === "P" && venda.getProdutoConsumido) {
                    // Se for um produto, soma a quantidade consumida
                    let produto = venda.getProdutoConsumido;
                    let quantidade = venda.getQuantidade;

                    if (consumoPorItem.has(produto.getNome)) {
                        consumoPorItem.set(produto.getNome, {
                            id: produto.getId,
                            tipo: 'Produto',
                            quantidade: consumoPorItem.get(produto.getNome)!.quantidade + quantidade
                        });
                    } else {
                        consumoPorItem.set(produto.getNome, {
                            id: produto.getId,
                            tipo: 'Produto',
                            quantidade: quantidade
                        });
                    }
                } else if (venda.getTipo === "S" && venda.getServicoConsumido) {
                    // Se for um serviço, soma a quantidade consumida
                    let servico = venda.getServicoConsumido;
                    let quantidade = venda.getQuantidade;

                    if (consumoPorItem.has(servico.getNome)) {
                        consumoPorItem.set(servico.getNome, {
                            id: servico.getId,
                            tipo: 'Serviço',
                            quantidade: consumoPorItem.get(servico.getNome)!.quantidade + quantidade
                        });
                    } else {
                        consumoPorItem.set(servico.getNome, {
                            id: servico.getId,
                            tipo: 'Serviço',
                            quantidade: quantidade
                        });
                    }
                }
            }
        }

        // Ordenar os itens por quantidade consumida (decrescente)
        let itensOrdenados = Array.from(consumoPorItem.entries())
            .sort((a, b) => b[1].quantidade - a[1].quantidade); // Ordenação decrescente por quantidade

        // Limitar a exibição para os top N mais consumidos
        let topN;
        if (numero == 0) {
            topN = itensOrdenados;
        } else {
            topN = itensOrdenados.slice(0, numero);
        }

        // Exibir os resultados
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let itemNome = entry[0];
                let itemInfo = entry[1];  // { id, tipo, quantidade }
                console.log(`[${index + 1}] (ID: ${itemInfo.id}, Tipo: ${itemInfo.tipo}) ${itemNome} - Quantidade Consumida: ${itemInfo.quantidade}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada para o gênero ${genero === 'M' ? 'Masculino' : 'Feminino'}.\n`);
        }
    }


    // Método para listar os N produtos ou serviços menos consumidos por gênero
    public listarItensMenosConsumidosPorGenero(numero: number, genero: string): void {
        console.log(`\nTop ${numero == 0 ? 'N' : numero} Produtos ou Serviços menos consumidos para o gênero ${genero === 'M' ? 'Masculino' : 'Feminino'}:\n`);

        // Criar um mapa para armazenar a quantidade consumida de cada produto ou serviço
        let consumoPorItem: Map<string, { id: number, tipo: string, quantidade: number }> = new Map();

        // Acumular a quantidade consumida de cada produto ou serviço pelo gênero
        for (let venda of this.vendas) {
            let cliente = venda.getCliente;
            let generoCliente = cliente.getSexoAbreviado;

            // Verificar se a venda corresponde ao gênero passado como parâmetro
            if (generoCliente === genero) {
                if (venda.getTipo === "P" && venda.getProdutoConsumido) {
                    // Se for um produto, soma a quantidade consumida
                    let produto = venda.getProdutoConsumido;
                    let quantidade = venda.getQuantidade;

                    if (consumoPorItem.has(produto.getNome)) {
                        consumoPorItem.set(produto.getNome, {
                            id: produto.getId,
                            tipo: 'Produto',
                            quantidade: consumoPorItem.get(produto.getNome)!.quantidade + quantidade
                        });
                    } else {
                        consumoPorItem.set(produto.getNome, {
                            id: produto.getId,
                            tipo: 'Produto',
                            quantidade: quantidade
                        });
                    }
                } else if (venda.getTipo === "S" && venda.getServicoConsumido) {
                    // Se for um serviço, soma a quantidade consumida
                    let servico = venda.getServicoConsumido;
                    let quantidade = venda.getQuantidade;

                    if (consumoPorItem.has(servico.getNome)) {
                        consumoPorItem.set(servico.getNome, {
                            id: servico.getId,
                            tipo: 'Serviço',
                            quantidade: consumoPorItem.get(servico.getNome)!.quantidade + quantidade
                        });
                    } else {
                        consumoPorItem.set(servico.getNome, {
                            id: servico.getId,
                            tipo: 'Serviço',
                            quantidade: quantidade
                        });
                    }
                }
            }
        }

        // Ordenar os itens por quantidade consumida (crescente) para listar os menos consumidos
        let itensOrdenados = Array.from(consumoPorItem.entries())
            .sort((a, b) => a[1].quantidade - b[1].quantidade); // Ordenação crescente por quantidade

        // Limitar a exibição para os top N menos consumidos
        let topN;
        if (numero == 0) {
            topN = itensOrdenados;
        } else {
            topN = itensOrdenados.slice(0, numero);
        }

        // Exibir os resultados
        if (topN.length > 0) {
            topN.forEach((entry, index) => {
                let itemNome = entry[0];
                let itemInfo = entry[1];  // { id, tipo, quantidade }
                console.log(`[${index + 1}] (ID: ${itemInfo.id}, Tipo: ${itemInfo.tipo}) ${itemNome} - Quantidade Consumida: ${itemInfo.quantidade}`);
            });
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada para o gênero ${genero === 'M' ? 'Masculino' : 'Feminino'}.\n`);
        }
    }


    public listar(): void {
        console.log(`\nLista de todas as vendas:\n`);
        if(this.vendas.length > 0) {
            for (let i = 0; i < this.vendas.length; i++) {
                console.log(`[${i+1}] ${this.vendas[i]}`);
            }
            console.log();
        } else {
            console.log(`-> Nenhuma venda cadastrada.\n`);
        }
    }
}