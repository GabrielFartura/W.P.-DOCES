function abrirPagamento() {
    document.getElementById("modalPagamento").style.display = "block";
}

function fecharPagamento() {
    document.getElementById("modalPagamento").style.display = "none";
}

function mostrarPagamento() {
    const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
    const info = document.getElementById("infoPagamento");
    const comprovante = document.getElementById("comprovante");

    if (pagamento === "PIX") {
        info.innerText = "📲 Faça o PIX para 21 976742777";
        comprovante.style.display = "block";
    } else {
        info.innerText = "💵 Pagamento será feito no domicílio";
        comprovante.style.display = "none";
    }
}

function confirmarPagamento() {
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');

    if (!nome || !endereco || !pagamentoSelecionado) {
        alert("Preencha todos os dados!");
        return;
    }

    const pagamento = pagamentoSelecionado.value;

    let resumo = `🍬 *Pedido W&P Doces*\n👤 ${nome}\n📍 ${endereco}\n\n`;
    let total = 0;

    const sabores = [
        ["Coco","coco"],["Morango","morango"],["Limão","limao"],
        ["Maracujá","maracuja"],["Caipirinha","caipirinha"],["Nutella","nutella"]
    ];

    sabores.forEach(s => {
        const q = parseInt(document.getElementById(s[1]).value) || 0;
        if (q > 0) {
            resumo += `Balas ${s[0]}: ${q}\n`;
            total += q * 2;
        }
    });

    const brownie = parseInt(document.getElementById("brownie").value) || 0;
    const palha = parseInt(document.getElementById("palha").value) || 0;

    if (brownie) { resumo += `Brownie: ${brownie}\n`; total += brownie * 6; }
    if (palha) { resumo += `Palha Italiana: ${palha}\n`; total += palha * 6; }

    resumo += `\n💳 Pagamento: ${pagamento}\n💰 Total: R$ ${total.toFixed(2)}`;

    // WhatsApp
    const url = `https://wa.me/5521976742777?text=${encodeURIComponent(resumo)}`;
    window.open(url, "_blank");

    // Planilha (CSV)
    gerarCSV(nome, endereco, pagamento, total);

    fecharPagamento();
}

function gerarCSV(nome, endereco, pagamento, total) {
    const data = new Date().toLocaleString("pt-BR");

    const csv = `Data,Nome,Endereço,Pagamento,Total
"${data}","${nome}","${endereco}","${pagamento}","${total.toFixed(2)}"`;

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "pedidos_wp_doces.csv";
    a.click();
}
