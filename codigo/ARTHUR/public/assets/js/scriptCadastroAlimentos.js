// Função para carregar o conteúdo do modal
function loadModal() {
  fetch('templateModal.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('modalContainer').innerHTML = data;
      })
      .catch(error => console.error('Erro ao carregar o modal:', error));
}

function teste(inputId) {
    const inputValue = document.getElementById(inputId).value.toLowerCase(); // Obtém o valor do input
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
            // Atualiza a tabela com os resultados
            atualizarTabela(alimentosEncontrados);
        })
        .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
}


// Função para atualizar a tabela
function atualizarTabela(alimentos) {
    const tabelaAlimentos = document.getElementById('tabelaAlimentos');
    tabelaAlimentos.innerHTML = ''; // Limpa a tabela

    // Preenche a tabela com os alimentos encontrados
    alimentos.forEach((alimento, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td><input type="checkbox" name="alimento${index}" id="alimento${index}"></td>
            <th scope="row">${index + 1}</th>
            <td>${alimento[1] || 'Não especificado'}</td> <!-- Nome do alimento na primeira coluna -->
            <td><input type="text" placeholder="Quantidade"></td>
            <td>${alimento[3] || '0 kcal'}</td> <!-- Calorias na segunda coluna -->
        `;
        tabelaAlimentos.appendChild(novaLinha);
    });
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



// Carregar o modal ao inicializar a página
document.addEventListener('DOMContentLoaded', loadModal, teste);

