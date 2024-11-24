// Lista que armazenará os alimentos selecionados
let listaAlimentosSelecionados = [];

// Função para adicionar os alimentos selecionados à lista
function adicionarSelecionados() {
    const tabelaAlimentos = document.getElementById('tabelaAlimentos');
    const linhas = tabelaAlimentos.querySelectorAll('tr');

    linhas.forEach((linha, index) => {
        if (index === 0) return; // Ignorar o cabeçalho

        const checkbox = linha.querySelector('input[type="checkbox"]');
        const quantidadeInput = linha.querySelector('input[type="text"]');
        const nome = linha.cells[2]?.textContent || 'Não especificado';
        const kcal = linha.cells[4]?.textContent || '0 kcal';

        if (checkbox?.checked) {
            const quantidade = quantidadeInput?.value.trim();
            if (!quantidade) {
                alert(`Por favor, insira a quantidade para o alimento: ${nome}`);
                return;
            }

            listaAlimentosSelecionados.push({
                nome,
                quantidade,
                kcal: kcal.replace(' kcal', ''), // Remover "kcal" para deixar o valor limpo
            });

            // Desmarcar o checkbox após adicionar
            checkbox.checked = false;
        }
    });

    alert('Alimentos adicionados à lista com sucesso!');
}

// Função para gerar o PDF da lista
function gerarPDF() {
    if (listaAlimentosSelecionados.length === 0) {
        alert('Nenhum alimento foi adicionado à lista.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);

    let y = 10;
    doc.text('Lista de Alimentos Selecionados', 10, y);
    y += 10;

    listaAlimentosSelecionados.forEach((alimento, index) => {
        const linha = `${index + 1}. Nome: ${alimento.nome}, Quantidade: ${alimento.quantidade}, Calorias: ${alimento.kcal} kcal`;
        doc.text(linha, 10, y);
        y += 10;

        if (y > 280) { // Criar nova página se ultrapassar o limite
            doc.addPage();
            y = 10;
        }
    });

    doc.save('Lista_de_Alimentos.pdf');
}
