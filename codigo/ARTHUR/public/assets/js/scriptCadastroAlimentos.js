// Função para carregar o conteúdo do modal
function loadModal() {
  fetch('templateModal.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('modalContainer').innerHTML = data;
      })
      .catch(error => console.error('Erro ao carregar o modal:', error));
}

function buscaAlimentos(inputId, modalId, refeicao) {
    const inputValue = document.getElementById(inputId).value.toLowerCase();

    if(inputValue==''){
        const modal = new bootstrap.Modal(document.getElementById('inserirUmAlimento'));
        modal.show(); // Exibe o modal
    }else{
        fetch('../assets/dados/Taco-4a-Edicao.xlsx')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Busca os alimentos pelo nome
            const alimentosEncontrados = buscarAlimentosPorNome(jsonData, inputValue);
            // Atualiza a tabela com os resultados, passando o ID do modal
            atualizarTabela(alimentosEncontrados, modalId, refeicao);
        })
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
    }
    
}

function atualizarTabela(alimentos, modalId, refeicao) {
    const tabelaAlimentos = document.querySelector(`#${modalId} tbody`);
    tabelaAlimentos.innerHTML = '';

    alimentos.forEach((alimento, index) => {
        const caloriasPor100g = alimento[3] ? parseFloat(alimento[3]) : 0;
        const proteinasPor100g = alimento[5] ? parseFloat(alimento[5]) : 0;
        const nomeAlimento = alimento[1];
        const carboidratosPor100g = alimento[8] ? parseFloat(alimento[8]) : 0;
        const sodioPor100g = alimento[17] ? parseFloat(alimento[17]) : 0; // Adicionando sódio

        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td><input type="checkbox" name="alimento${refeicao}${index}" id="alimento${refeicao}${index}"></td>
            <th scope="row">${index + 1}</th>
            <td>${alimento[1] || 'Não especificado'}</td>
            <td>
                <input style="border-radius: 5px" type="number" placeholder="Quantidade (g)" min="0" 
                       id="quantidade${refeicao}${index}" 
                       oninput="calcularCalorias(${index}, ${caloriasPor100g}, '${refeicao}')">
                <input type="hidden" id="nomeAlimento${refeicao}${index}" value="${nomeAlimento}">
                <input type="hidden" id="proteinas${refeicao}${index}" value="${proteinasPor100g}">
                <input type="hidden" id="carboidratos${refeicao}${index}" value="${carboidratosPor100g}">
                <input type="hidden" id="sodio${refeicao}${index}" value="${sodioPor100g}"> <!-- Campo oculto para sódio -->
            </td>
            <td id="calorias${refeicao}${index}">${caloriasPor100g.toFixed(0)} kcal</td>
        `;

        tabelaAlimentos.appendChild(novaLinha);
    });
}

function calcularCalorias(index, caloriasPor100g, refeicao) {
    const quantidadeInput = document.getElementById(`quantidade${refeicao}${index}`);
    const caloriasOutput = document.getElementById(`calorias${refeicao}${index}`);

    if (quantidadeInput) {
        const quantidade = parseFloat(quantidadeInput.value) || 0;
        const calorias = (caloriasPor100g / 100) * quantidade;
        caloriasOutput.innerText = `${calorias.toFixed(0)} kcal`;
    }
}



// Função para buscar alimentos com base no nome
function buscarAlimentosPorNome(jsonData, nome) {
    const resultados = [];

    // Percorre cada linha do array
    jsonData.forEach(linha => {
        // Verifica se a linha contém um nome de alimento e se o nome está incluído
        if (linha[1] && linha[1].toLowerCase().includes(nome)) {
            resultados.push(linha);
        }
    });

    return resultados;
}

let totalCaloriasGeral = 0;
let totalProteinasGeral = 0;
let totalCarboidratosGeral = 0;
let totalSodioGeral = 0;

function salvarAlimentosSelecionados(tabela, modalId, refeicao) {
    const listaAlimentos = document.getElementById(tabela).querySelector('ul');
    let totalCalorias = 0;
    let totalProteinas = 0;
    let totalCarboidratos = 0;
    let totalSodio = 0;

    const checkboxes = document.querySelectorAll(`#${modalId} input[type="checkbox"]`);
    
    // Obter o último índice usado
    let lastIndex = Array.from(listaAlimentos.querySelectorAll('li')).length;

    checkboxes.forEach((checkbox, idx) => {
        if (checkbox.checked) {
            const nomeAlimento = document.querySelector(`#${modalId} tr:nth-child(${idx + 1}) td:nth-child(3)`).innerText;
            const caloriasPor100g = parseFloat(document.querySelector(`#${modalId} tr:nth-child(${idx + 1}) td:nth-child(5)`).innerText);
            const proteinasPor100g = parseFloat(document.getElementById(`proteinas${refeicao}${idx}`).value);
            const carboidratosPor100g = parseFloat(document.getElementById(`carboidratos${refeicao}${idx}`).value);
            const sodioPor100g = parseFloat(document.getElementById(`sodio${refeicao}${idx}`).value);
            const nomeAlimentoPadrao = document.getElementById(`nomeAlimento${refeicao}${idx}`).value;

            const quantidadeInput = document.getElementById(`quantidade${refeicao}${idx}`);
            const quantidade = parseFloat(quantidadeInput.value) || 0;

            if (quantidade > 0) {
                const calorias = (caloriasPor100g / 100) * quantidade;
                const proteinas = (proteinasPor100g / 100) * quantidade;
                const carboidratos = (carboidratosPor100g / 100) * quantidade;
                const sodio = (sodioPor100g / 100) * quantidade;

                totalCalorias += calorias;
                totalProteinas += proteinas;
                totalCarboidratos += carboidratos;
                totalSodio += sodio;

                const li = document.createElement('li');
                li.innerText = `${nomeAlimento} - ${quantidade}g: ${calorias.toFixed(0)} kcal, Proteínas: ${proteinas.toFixed(0)}g, Carboidratos: ${carboidratos.toFixed(0)}g, Sódio: ${sodio.toFixed(0)} mg`;

                // Criar campos ocultos com IDs únicos
                const caloriasInput = document.createElement('input');
                caloriasInput.type = 'hidden';
                caloriasInput.id = `caloriasAlimento${refeicao}${lastIndex}`;
                caloriasInput.value = calorias.toFixed(0);

                const proteinasInput = document.createElement('input');
                proteinasInput.type = 'hidden';
                proteinasInput.id = `proteinasAlimento${refeicao}${lastIndex}`;
                proteinasInput.value = proteinas.toFixed(0);

                const carboidratosInput = document.createElement('input');
                carboidratosInput.type = 'hidden';
                carboidratosInput.id = `carboidratosAlimento${refeicao}${lastIndex}`;
                carboidratosInput.value = carboidratos.toFixed(0);

                const sodioInput = document.createElement('input');
                sodioInput.type = 'hidden';
                sodioInput.id = `sodioAlimento${refeicao}${lastIndex}`;
                sodioInput.value = sodio.toFixed(0);

                const nomeInput = document.createElement('input');
                nomeInput.type = 'hidden';
                nomeInput.id = `nomeAlimento${refeicao}${lastIndex}`;
                nomeInput.value = nomeAlimentoPadrao;

                li.appendChild(caloriasInput);
                li.appendChild(proteinasInput);
                li.appendChild(carboidratosInput);
                li.appendChild(sodioInput);
                li.appendChild(nomeInput);

                listaAlimentos.appendChild(li);
                lastIndex++; // Incrementa o índice para o próximo alimento
            }
        }
    });

    // Atualiza os totais acumulados
    totalCaloriasGeral += totalCalorias;
    totalProteinasGeral += totalProteinas;
    totalCarboidratosGeral += totalCarboidratos;
    totalSodioGeral += totalSodio;

    const totalElement = document.querySelector(`#${tabela} p`);
    const caloriasAnteriores = parseFloat(totalElement.innerText.replace('Total: ', '').replace(' kcal', '')) || 0;
    const novoTotal = caloriasAnteriores + totalCalorias;
    totalElement.innerText = `Total: ${novoTotal.toFixed(0)} kcal`;

    atualizarTotalProteinas(totalProteinasGeral);
    atualizarTotalCarboidratos(totalCarboidratosGeral);
    atualizarTotalSodio(totalSodioGeral);
    atualizarTotalCalorias();
}




// As funções de atualizar os totais permanecem inalteradas

function atualizarTotalSodio(totalSodio) {
    const totalSodioElement = document.querySelector('#totalSodio');
    totalSodioElement.innerText = `Total de Sódio: ${totalSodio.toFixed(0)} mg`;

    // Salva no campo oculto
    const sodioHiddenInput = document.getElementById('valorTotalSodio');
    if (sodioHiddenInput) {
        sodioHiddenInput.value = totalSodio.toFixed(0);
    } else {
        console.warn('Campo oculto para total de sódio não encontrado.');
    }
}

function atualizarTotalProteinas(totalProteinas) {
    const totalProteinasElement = document.querySelector('.CaloriasTotais p strong');
    totalProteinasElement.innerText = `Total de Proteínas: ${totalProteinas.toFixed(0)}g`;

    // Salva no campo oculto
    const proteinasHiddenInput = document.getElementById('valorTotalProteinas');
    if (proteinasHiddenInput) {
        proteinasHiddenInput.value = totalProteinas.toFixed(0);
    } else {
        console.warn('Campo oculto para total de proteínas não encontrado.');
    }
}

function atualizarTotalCarboidratos(totalCarboidratos) {
    const totalElement = document.querySelector('#totalCarboidratos');
    totalElement.innerText = `Total de Carboidratos: ${totalCarboidratos.toFixed(0)}g`;

    // Salva no campo oculto
    const carboidratosHiddenInput = document.getElementById('valorTotalCarboidratos');
    if (carboidratosHiddenInput) {
        carboidratosHiddenInput.value = totalCarboidratos.toFixed(0);
    } else {
        console.warn('Campo oculto para total de carboidratos não encontrado.');
    }
}

function atualizarTotalCalorias() {
    const secoes = ['cafeDaManha', 'almoco', 'janta', 'lanche']; // IDs das seções de refeição
    let totalGeral = 0; // Inicializa o total geral

    secoes.forEach(secao => {
        const totalElement = document.querySelector(`#${secao} p`);
        const caloriasTotais = parseFloat(totalElement.innerText.replace('Total: ', '').replace(' kcal', '')) || 0;
        totalGeral += caloriasTotais; // Adiciona ao total geral
    });

    // Atualiza o total geral na seção de Informações Nutricionais da Dieta
    const totalCaloriasElement = document.querySelector('.CaloriasTotais h3 strong');
    totalCaloriasElement.innerText = `${totalGeral.toFixed(0)} kcal`;

    // Salva no campo oculto
    const caloriasHiddenInput = document.getElementById('valorTotalCalorias');
    if (caloriasHiddenInput) {
        caloriasHiddenInput.value = totalGeral.toFixed(0);
    } else {
        console.warn('Campo oculto para total de calorias não encontrado.');
    }
}

function salvarDieta() {
    const alimentosPorRefeicao = {
        Cafe: [],
        Almoco: [],
        Janta: [],
        Lanche: []
    };

    const secoes = ['Cafe', 'Almoco', 'Janta', 'Lanche'];
    let temAlimentos = false;

    secoes.forEach(secao => {
        const listaElement = document.getElementById(`alimentosInseridos${secao.charAt(0).toUpperCase() + secao.slice(1)}`);
        
        if (listaElement) {
            const lista = listaElement.querySelector('ul');
            const items = lista ? lista.querySelectorAll('li') : [];

            items.forEach((item, index) => {
                const secaoLower = secao.charAt(0).toLowerCase() + secao.slice(1);

                const nome = document.getElementById(`nomeAlimento${secaoLower}${index}`).value || '';
                const calorias = parseFloat(document.getElementById(`caloriasAlimento${secaoLower}${index}`)?.value) || 0;
                const proteinas = parseFloat(document.getElementById(`proteinasAlimento${secaoLower}${index}`)?.value) || 0;
                const carboidratos = parseFloat(document.getElementById(`carboidratosAlimento${secaoLower}${index}`)?.value) || 0;
                const sodio = parseFloat(document.getElementById(`sodioAlimento${secaoLower}${index}`)?.value) || 0;

                // Verifica se o alimento tem um nome e valor de calorias maior que zero
                if (nome && calorias > 0) {
                    temAlimentos = true; // Há pelo menos um alimento válido
                }

                const infoAlimento = {
                    nome: nome,
                    calorias: calorias,
                    proteinas: proteinas,
                    carboidratos: carboidratos,
                    sodio: sodio
                };

                alimentosPorRefeicao[secao].push(infoAlimento);
            });
        } else {
            console.warn(`Elemento com ID 'alimentosInseridos${secao.charAt(0).toUpperCase() + secao.slice(1)}' não encontrado.`);
        }
    });

    const totalCaloriasElement = document.getElementById('valorTotalCalorias');
    const totalProteinasElement = document.getElementById('valorTotalProteinas');
    const totalCarboidratosElement = document.getElementById('valorTotalCarboidratos');
    const totalSodioElement = document.getElementById('valorTotalSodio');

    if (!totalCaloriasElement || !totalProteinasElement || !totalCarboidratosElement || !totalSodioElement) {
        console.error('Um ou mais elementos para totais não foram encontrados.');
        return;
    }

    // Mostra o modal se não houver alimentos
    if (!temAlimentos) {
        const modal = new bootstrap.Modal(document.getElementById('inserirUmAlimento'));
        modal.show(); // Exibe o modal
        return;
    }

    // Se houver alimentos, salva a dieta
    const totalCalorias = totalCaloriasElement.value;
    const totalProteinas = totalProteinasElement.value;
    const totalCarboidratos = totalCarboidratosElement.value;
    const totalSodio = totalSodioElement.value;

    const dieta = {
        alimentos: alimentosPorRefeicao,
        totais: {
            calorias: totalCalorias,
            proteinas: totalProteinas,
            carboidratos: totalCarboidratos,
            sodio: totalSodio
        }
    };

    localStorage.setItem('dieta', JSON.stringify(dieta));

    // Chama o modal após salvar a dieta
    const modal = new bootstrap.Modal(document.getElementById('salvaDieta'));
    modal.show(); // Exibe o modal
}


function recarregarPagina() {
    location.reload(); // Recarrega a página atual
}


// Carregar o modal ao inicializar a página
document.addEventListener('DOMContentLoaded', loadModal, buscaAlimentos);