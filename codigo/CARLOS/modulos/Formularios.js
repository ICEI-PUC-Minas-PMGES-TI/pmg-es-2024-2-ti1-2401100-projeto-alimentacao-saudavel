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
    peso: peso.value,
    altura: alt.value,
    sexo: sexo.value
};

console.log(dados);

function removerPontuacao(string) {
    
   return string.replace(/[^0-9]/g, "");
}


proximo.addEventListener('click', function() {
    // Atualizando os valores no objeto 'dados' com os valores atuais dos inputs 
    if(peso.value == "" || alt.value == "" || objetivocli.value == "" || diabetico.value == "" || alergico.value == "" || sexo.value == ""){
        alert("Preencha todos os campos")
    } else{
    dados.objetivo = objetivocli.value;
    dados.diabete = diabetico.value;
    dados.alergia = alergico.value;
    dados.peso = peso.value;
    dados.altura = removerPontuacao(alt.value)
    dados.sexo = sexo.value;
    alert("Dados do usuário:\n" + JSON.stringify(dados, null, 2));
    }
    console.log(dados); // Exibe os dados atualizados ao clicar no botão
});


function atualizar() {
    // Função para fazer outras atualizações se necessário
}