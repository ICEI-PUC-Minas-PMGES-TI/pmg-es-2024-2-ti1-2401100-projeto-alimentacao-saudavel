document.addEventListener('DOMContentLoaded', function() {
    const adicionarReceita = true;

    if (adicionarReceita) {
        const mainElement = document.createElement('main');
        const receitasDiv = document.createElement('div');
        receitasDiv.id = 'receitas';
        
        const receitaDiv = document.createElement('div');
        receitaDiv.classList.add('receita');
        
        const descricaoDiv = document.createElement('div');
        descricaoDiv.classList.add('descricao');
        

        const h6Element = document.createElement('h6');
        h6Element.classList.add('texto');
        h6Element.textContent = 'Receita de Exemplo';
        
        descricaoDiv.appendChild(h6Element);
        
        const itensDiv = document.createElement('div');
        itensDiv.classList.add('itens');
        
        const ulElement = document.createElement('ul');
        ulElement.classList.add('lista');
        
        const ingredienteLi = document.createElement('li');
        ingredienteLi.classList.add('ingrediente');
        ingredienteLi.textContent = 'Farinha de trigo';
        
        ulElement.appendChild(ingredienteLi);
        
        itensDiv.appendChild(ulElement);
        
        receitaDiv.appendChild(descricaoDiv);

        receitaDiv.appendChild(itensDiv);
        
        receitasDiv.appendChild(receitaDiv);
        
        mainElement.appendChild(receitasDiv);
        
        document.body.appendChild(mainElement);
    }
});