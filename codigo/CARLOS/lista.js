        // Função para gerar o HTML
        function gerarHTML(pratos) {
            let htmlContent = "<!DOCTYPE html><html lang='pt-BR'><head><meta charset='UTF-8'><title>Pratos e Ingredientes</title></head><body>";

            pratos.forEach(prato => {
                // Adicionar a div com o nome do prato em negrito
                htmlContent += `<div><strong>${prato.nome}</strong></div>`;

                // Adicionar os alimentos em uma lista <ul>
                htmlContent += "<ul>";
                prato.alimentos.forEach(alimento => {
                    htmlContent += `<li>${alimento.nome}: ${alimento.quantidade}g</li>`;
                });
                htmlContent += "</ul>";
            });

            htmlContent += "</body></html>";
            return htmlContent;
        }
