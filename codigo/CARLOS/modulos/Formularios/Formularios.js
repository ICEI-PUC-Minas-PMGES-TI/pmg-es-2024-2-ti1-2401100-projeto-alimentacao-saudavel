let objetivocli = document.querySelector("#objetivo");
let diabetico = document.querySelector("#diabetico");
let alergico = document.querySelector("#alergico");
let alimento = document.querySelector("#alimento_alergico");
let peso = document.querySelector("#peso");
let alt = document.querySelector("#altura");
let calculoimc = document.querySelector("#imc");
let proximo = document.querySelector("#prox");
let sexo = document.querySelector("#sexo");
document.getElementById('Calculo').addEventListener('click', calcularIMC);

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

function limparCampos() {
    objetivocli.value = "";
    diabetico.value = "";
    alergico.value = "";
    alimento.value = "";
    peso.value = "";
    alt.value = "";
    sexo.value = "";
    calculoimc.value = "";
    
    // Limpar a lista de alimentos selecionados
    const listaAlimentos = document.getElementById("listaAlimentosSelecionados");
    listaAlimentos.innerHTML = ""; // Limpa todos os itens da lista

    console.log("Campos limpos");
}

function calcularIMC() {
    // Obtém os valores dos campos de peso e altura
    var pesoValue = parseFloat(peso.value);
    var alturaValue = parseFloat(alt.value);

    // Verifica se os valores são válidos
    if (isNaN(pesoValue) || isNaN(alturaValue) || pesoValue <= 0 || alturaValue <= 0) {
        alert("Por favor, insira valores válidos para peso e altura.");
        return;
    }

    // Verifique se a altura está em metros e o peso está em kg.
    // Caso necessário, converta a altura para metros.
    if (alturaValue > 3) { // caso o valor da altura seja muito alto (provavelmente em centímetros)
        alturaValue = alturaValue / 100; // converte para metros
    }

    // Calcula o IMC
    var imc = pesoValue / (alturaValue * alturaValue);

    // Exibe o resultado no campo de IMC com duas casas decimais

    // Classificação do IMC
    var classificacao = "";
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        classificacao = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        classificacao = "Sobrepeso";
    } else if (imc >= 30 && imc < 34.9) {
        classificacao = "Obesidade grau 1";
    } else if (imc >= 35 && imc < 39.9) {
        classificacao = "Obesidade grau 2";
    } else {
        classificacao = "Obesidade grau 3 (mórbida)";
    }

    // Exibe a classificação no console ou em algum campo HTML
    alert(`Seu IMC é ${imc.toFixed(2)}. Classificação: ${classificacao}`);
    calculoimc.value = `Seu IMC é ${imc.toFixed(2)}. Classificação: ${classificacao}`;


}
document.getElementById('Calculo').addEventListener('click', calcularIMC);


window.addEventListener("beforeunload", function () {
    limparCampos();
});

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
        salvarDadosNoLocalStorage(); // Salva os dados
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
// Função para salvar os alimentos selecionados e exibi-los com "X" para exclusão
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

            // Criar o "X" para excluir o item
            const excluirBtn = document.createElement("span");
            excluirBtn.textContent = " X";
            excluirBtn.style.color = "red";
            excluirBtn.style.cursor = "pointer";
            excluirBtn.style.marginLeft = "10px";

            // Adicionar o evento de clique para excluir o alimento
            excluirBtn.addEventListener("click", () => {
                listaAlimentos.removeChild(item); // Remove o item da lista
            });

            // Adicionar o "X" ao item
            item.appendChild(excluirBtn);

            // Adicionar o item à lista
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