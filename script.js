function finalizarPedido() {
    const precoBala = 2;
    const precoOutros = 6;

    const sabores = [
        { nome: "Coco", id: "coco" },
        { nome: "Morango", id: "morango" },
        { nome: "Limão", id: "limao" },
        { nome: "Maracujá", id: "maracuja" },
        { nome: "Caipirinha", id: "caipirinha" },
        { nome: "Nutella", id: "nutella" }
    ];

    let resumoHTML = "<h3>📝 Resumo do Pedido</h3>";
    let total = 0;

    sabores.forEach(sabor => {
        const qtd = parseInt(document.getElementById(sabor.id).value) || 0;
        if (qtd > 0) {
            const subtotal = qtd * precoBala;
            total += subtotal;
            resumoHTML += `<p>Balas de ${sabor.nome}: ${qtd} → R$ ${subtotal.toFixed(2)}</p>`;
        }
    });

    const brownie = parseInt(document.getElementById("brownie").value) || 0;
    const palha = parseInt(document.getElementById("palha").value) || 0;

    if (brownie > 0) {
        total += brownie * precoOutros;
        resumoHTML += `<p>Brownie: ${brownie} → R$ ${(brownie * precoOutros).toFixed(2)}</p>`;
    }

    if (palha > 0) {
        total += palha * precoOutros;
        resumoHTML += `<p>Palha Italiana: ${palha} → R$ ${(palha * precoOutros).toFixed(2)}</p>`;
    }

    resumoHTML += `<hr><h3>Total: R$ ${total.toFixed(2)}</h3>`;

    document.getElementById("resumo").innerHTML = resumoHTML;
}
