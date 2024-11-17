document.addEventListener('DOMContentLoaded', function() {
    const jsonDosAlimentos = {
        "alimentos": {
            "Cafe": [
                {
                    "nome": "Banana, maçã, crua",
                    "calorias": 87,
                    "proteinas": 2,
                    "carboidratos": 22,
                    "sodio": 0,
                    "quantidade": 100
                },
                {
                    "nome": "Pão, trigo, forma, integral",
                    "calorias": 124,
                    "proteinas": 7,
                    "carboidratos": 35,
                    "sodio": 354,
                    "quantidade": 70
                },
                {
                    "nome": "Ovo, de galinha, inteiro, cozido/10minutos",
                    "calorias": 146,
                    "proteinas": 13,
                    "carboidratos": 1,
                    "sodio": 146,
                    "quantidade": 100
                }
            ],
            "Almoco": [
                {
                    "nome": "Arroz, integral, cozido",
                    "calorias": 124,
                    "proteinas": 3,
                    "carboidratos": 26,
                    "sodio": 1,
                    "quantidade": 100
                },
                {
                    "nome": "Frango, peito, sem pele, cozido",
                    "calorias": 366,
                    "proteinas": 47,
                    "carboidratos": 0,
                    "sodio": 54,
                    "quantidade": 150
                }
            ],
            "Janta": [
                {
                    "nome": "Arroz, tipo 1, cozido",
                    "calorias": 288,
                    "proteinas": 4,
                    "carboidratos": 42,
                    "sodio": 2,
                    "quantidade": 150
                },
                {
                    "nome": "Estrogonofe de frango",
                    "calorias": 628,
                    "proteinas": 35,
                    "carboidratos": 5,
                    "sodio": 199,
                    "quantidade": 200
                }
            ],
            "Lanche": [
                {
                    "nome": "Empada de frango, pré-cozida, assada",
                    "calorias": 806,
                    "proteinas": 10,
                    "carboidratos": 71,
                    "sodio": 787,
                    "quantidade": 150
                }
            ]
        },
        "totais": {
            "calorias": "2569",
            "proteinas": "121",
            "carboidratos": "202",
            "sodio": "NaN"
        }
    };

    // Função para preencher a tabela com os alimentos
    function preencherTabela() {

        alert("Abra o console para ver o JSON dos alimentos que estão preenchendo a lista de compras");

        console.log(jsonDosAlimentos);

        const corpoDaLista = document.querySelector('.corpoDaLista'); // Referência ao corpo da tabela
        if (!corpoDaLista) {
            console.error('Não foi possível encontrar o corpo da tabela.');
            return; 
        }

        const refeições = jsonDosAlimentos.alimentos; 
        let contador = 1;

        // Iterar sobre cada tipo de refeição (Cafe, Almoco, Janta, Lanche)
        for (const refeição in refeições) {
            const alimentos = refeições[refeição]; 

            // Se houver alimentos para essa refeição
            alimentos.forEach(alimento => {
                // Criar uma nova linha na tabela
                const novaLinha = document.createElement('tr');
                
                // Preencher as células da linha com as informações do alimento
                novaLinha.innerHTML = `
                    <td>${contador}</td>
                    <td>${alimento.nome} (${refeição})</td>
                    <td>${alimento.quantidade} g</td> <!-- Quantidade em gramas -->
                    <td>${alimento.calorias} kcal</td>
                `;
               
                corpoDaLista.appendChild(novaLinha);
                
                contador++;
            });
        }
    }

    // Chamar a função para preencher a tabela
    preencherTabela();
});