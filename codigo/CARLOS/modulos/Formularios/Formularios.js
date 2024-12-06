let objetivocli = document.querySelector("#objetivo");
let diabetico = document.querySelector("#diabetico");
let alergico = document.querySelector("#alergico");
let alimento = document.querySelector("#alimento_alergico");
let peso = document.querySelector("#peso");
let alt = document.querySelector("#altura");
let calculoimc = document.querySelector("#imc");
let proximo = document.querySelector("#prox");
let sexo = document.querySelector("#sexo");

// Inicializando o objeto 'dados' com os valores iniciais
let dados = {
    objetivo: objetivocli.value,
    diabete: diabetico.value,
    alergia: alergico.value,
    alimento: alimento.value,
    peso: peso.value,
    altura: alt.value,
    sexo: sexo.value
};

function salvarDadosNoLocalStorage() {
    // Obter os alimentos selecionados
    const alimentosSelecionados = Array.from(document.querySelectorAll("#listaAlimentosSelecionados li"))
        .map(item => item.textContent);

    // Atualizando os valores no objeto 'dados'
    dados.objetivo = objetivocli.value;
    dados.diabete = diabetico.value;
    dados.alergia = alergico.value;
    dados.peso = peso.value;
    dados.altura = removerPontuacao(alt.value);
    dados.sexo = sexo.value;
    dados.alimento = alimentosSelecionados; // Armazena como array

    // Salvando o objeto no Local Storage
    localStorage.setItem("dadosUsuario", JSON.stringify(dados));

    alert("Dados salvos com sucesso!");
    console.log("Dados salvos no Local Storage:", dados);
}


function carregarDadosDoLocalStorage() {
    // Verificando se existem dados no Local Storage
    const dadosSalvos = localStorage.getItem("dadosUsuario");
    if (dadosSalvos) {
        const dadosRecuperados = JSON.parse(dadosSalvos);

        // Atualizando os campos do formulário com os dados recuperados
        objetivocli.value = dadosRecuperados.objetivo || "";
        diabetico.value = dadosRecuperados.diabete || "";
        alergico.value = dadosRecuperados.alergia || "";
        peso.value = dadosRecuperados.peso || "";
        alt.value = dadosRecuperados.altura || "";
        sexo.value = dadosRecuperados.sexo || "";

        // Se houver alimentos alérgicos, exiba-os em uma lista
        if (dadosRecuperados.alimento && Array.isArray(dadosRecuperados.alimento)) {
            const listaAlimentos = document.getElementById("listaAlimentosSelecionados");
            listaAlimentos.innerHTML = ""; // Limpa a lista antes de adicionar
            dadosRecuperados.alimento.forEach(alimento => {
                const item = document.createElement("li");
                item.textContent = alimento;
                listaAlimentos.appendChild(item);
            });
        }

        console.log("Dados carregados do Local Storage:", dadosRecuperados);
    } else {
        console.log("Nenhum dado encontrado no Local Storage.");
    }
}



// Exemplo de uso ao clicar no botão "Próximo"
proximo.addEventListener("click", function (e) {
    e.preventDefault(); // Previne o comportamento padrão do botão
    if (
        peso.value === "" ||
        alt.value === "" ||
        objetivocli.value === "" ||
        diabetico.value === "" ||
        alergico.value === "" ||
        sexo.value === ""
    ) {
        alert("Preencha todos os campos!");
    } else {
        salvarDadosNoLocalStorage();
    }
});

// Carregar dados automaticamente ao abrir a página
document.addEventListener("DOMContentLoaded", carregarDadosDoLocalStorage);

function removerPontuacao(string) {
    
   return string.replace(/[^0-9]/g, "");
}

    function buscaAlimentos() {
        const inputValue = document.getElementById("alimento_alergico").value.toLowerCase();
            fetch('Taco-4a-Edicao.xlsx')
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
                atualizarTabela(alimentosEncontrados)
            })
            .catch(error => console.error('Erro ao carregar o arquivo Excel:', error));
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
    console.log(resultados);
    return resultados;
}

function atualizarTabela(alimentos) {
    const tabelaAlimentos = document.querySelector("#modalDeBuscaLanche tbody");
    tabelaAlimentos.innerHTML = '';

    alimentos.forEach((alimento, index) => {
        const nomeAlimento = alimento[1];

        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td><input type="checkbox" name="alimento${index}" id="alimento${index}"></td>
            <th scope="row">${index + 1}</th>
            <td>${alimento[1] || 'Não especificado'}</td>
        `;

        tabelaAlimentos.appendChild(novaLinha);
    });
}
// Função para salvar os alimentos selecionados e exibi-los
function salvarAlimentosSelecionados() {
    const alimentosSelecionados = []; // Lista para armazenar os alimentos selecionados

    // Obter todos os checkboxes no modal de alimentos
    const checkboxes = document.querySelectorAll("#modalDeBuscaLanche input[type='checkbox']:checked");

    // Para cada checkbox marcado, adicione o alimento à lista
    checkboxes.forEach(checkbox => {
        const alimentoIndex = checkbox.getAttribute('id').replace('alimento', ''); // Captura o índice do alimento
        const nomeAlimento = document.querySelector(`#tabelaAlimentosLanche tr:nth-child(${parseInt(alimentoIndex) + 1}) td:nth-child(3)`).innerText;
        alimentosSelecionados.push(nomeAlimento);
    });

    // Exibir os alimentos selecionados
    const listaAlimentos = document.getElementById("listaAlimentosSelecionados");

    // Adicionar novos alimentos à lista, sem apagar os anteriores
    alimentosSelecionados.forEach(alimento => {
        const itemExistente = Array.from(listaAlimentos.children).find(item => item.textContent === alimento);

        // Verificar se o alimento já está na lista, se não estiver, adicione
        if (!itemExistente) {
            const item = document.createElement("li");
            item.textContent = alimento;
            listaAlimentos.appendChild(item);
        }
    });
}

// Evento para monitorar mudanças nos checkboxes
document.querySelectorAll("#modalDeBuscaLanche input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", salvarAlimentosSelecionados);
});
function atualizar() {
    // Função para fazer outras atualizações se necessário
}