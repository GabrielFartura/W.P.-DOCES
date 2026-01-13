function abrirPagamento() {
    document.getElementById("modalPagamento").style.display = "block";
}

function confirmarPagamento() {
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const pagamento = document.querySelector('input[name="pagamento"]:checked');

    if (!nome || !endereco || !pagamento) {
        alert("Preencha todos os dados!");
        return;
    }

    let resumo = `🍬 *Pedido W&P Doces*\n👤 ${nome}\n📍 ${endereco}\n\n`;
    let total = 0;

    const itens = [
        ["Coco", "coco"], ["Morango", "morango"], ["Limão", "limao"],
        ["Maracujá", "maracuja"], ["Caipirinha", "caipirinha"], ["Nutella", "nutella"]
    ];

    itens.forEach(i => {
        const q = parseInt(document.getElementById(i[1]).value) || 0;
        if (q > 0) {
            resumo += `Balas ${i[0]}: ${q}\n`;
            total += q * 2;
        }
    });

    const brownie = parseInt(document.getElementById("brownie").value) || 0;
    const palha = parseInt(document.getElementById("palha").value) || 0;

    if (brownie) { resumo += `Brownie: ${brownie}\n`; total += brownie * 6; }
    if (palha) { resumo += `Palha Italiana: ${palha}\n`; total += palha * 6; }

    resumo += `\n💳 Pagamento: ${pagamento.value}\n💰 Total: R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/5521976742777?text=${encodeURIComponent(resumo)}`;
    window.open(url, "_blank");

    gerarCSV(nome, endereco, pagamento.value, total);
}

function gerarCSV(nome, endereco, pagamento, total) {
    const csv = `Nome,Endereço,Pagamento,Total
"${nome}","${endereco}","${pagamento}","${total.toFixed(2)}"`;

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "pedidos_wp_doces.csv";
    a.click();
}
