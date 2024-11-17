document.addEventListener('DOMContentLoaded', function() {
    const jsonDosAlimentos = {
        "alimentos": {
            "Cafe": [
                {
                    "nome": "Banana, prata, crua",
                    "calorias": 98,
                    "proteinas": 1,
                    "carboidratos": 26,
                    "sodio": 0
                },
                {
                    "nome": "Pão, trigo, forma, integral",
                    "calorias": 253,
                    "proteinas": 9,
                    "carboidratos": 50,
                    "sodio": 506
                },
                {
                    "nome": "Ovo, de galinha, inteiro, cozido/10minutos",
                    "calorias": 52,
                    "proteinas": 8,
                    "carboidratos": 0,
                    "sodio": 88
                }
            ],
            "Almoco": [
                {
                    "nome": "Arroz, tipo 1, cozido",
                    "calorias": 128,
                    "proteinas": 3,
                    "carboidratos": 28,
                    "sodio": 1
                },
                {
                    "nome": "Frango, inteiro, sem pele, assado",
                    "calorias": 422,
                    "proteinas": 42,
                    "carboidratos": 0,
                    "sodio": 105
                }
            ],
            "Janta": [
                {
                    "nome": "Arroz, integral, cozido",
                    "calorias": 494,
                    "proteinas": 5,
                    "carboidratos": 52,
                    "sodio": 2
                },
                {
                    "nome": "Carne, bovina, acém, moído, cozido",
                    "calorias": 479,
                    "proteinas": 40,
                    "carboidratos": 0,
                    "sodio": 79
                }
            ],
            "Lanche": [
                {
                    "nome": "Coxinha de frango, frita",
                    "calorias": 283,
                    "proteinas": 10,
                    "carboidratos": 35,
                    "sodio": 532
                }
            ]
        },
        "totais": {
            "calorias": "2209",
            "proteinas": "118",
            "carboidratos": "190",
            "sodio": "NaN"
        }
    }

    // Função para preencher a tabela com os alimentos
    function preencherTabela() {
        const corpoDaLista = document.querySelector('.corpoDaLista'); // Referência ao corpo da tabela
        if (!corpoDaLista) {
            console.error('Não foi possível encontrar o corpo da tabela.');
            return; // Para a execução se o elemento não for encontrado
        }

        const refeições = jsonDosAlimentos.alimentos; // Objeto contendo as refeições e alimentos
        let contador = 1; // Contador para o índice das linhas da tabela

        // Iterar sobre cada tipo de refeição (Cafe, Almoco, Janta, Lanche)
        for (const refeição in refeições) {
            const alimentos = refeições[refeição]; // Alimentos da refeição atual

            // Se houver alimentos para essa refeição
            alimentos.forEach(alimento => {
                // Criar uma nova linha na tabela
                const novaLinha = document.createElement('tr');
                
                // Preencher as células da linha com as informações do alimento
                novaLinha.innerHTML = `
                    <td>${contador}</td>
                    <td>${alimento.nome} (${refeição})</td>
                    <td>${alimento.calorias} kcal</td>
                `;

                // Adicionar a nova linha no corpo da tabela
                corpoDaLista.appendChild(novaLinha);
                
                // Incrementar o contador para a próxima linha
                contador++;
            });
        }
    }

    // Chamar a função para preencher a tabela
    preencherTabela();
});
