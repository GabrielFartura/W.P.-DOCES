let resumoPedido = "";
let totalPedido = 0;

function abrirPagamento() {
    gerarResumo();
    document.getElementById("modalPagamento").style.display = "block";
}

function confirmarPagamento() {
    const pagamento = document.querySelector('input[name="pagamento"]:checked');

    if (!pagamento) {
        alert("Selecione a forma de pagamento");
        return;
    }

    const formaPagamento = pagamento.value;

    enviarWhatsApp(formaPagamento);
    gerarPlanilha(formaPagamento);

    document.getElementById("modalPagamento").style.display = "none";
}

function gerarResumo() {
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

    resumoPedido = "🍬 *Pedido W.E.P Doces* 🍫\n";
    totalPedido = 0;

    sabores.forEach(sabor => {
        const qtd = parseInt(document.getElementById(sabor.id).value) || 0;
        if (qtd > 0) {
            resumoPedido += `Balas ${sabor.nome}: ${qtd}\n`;
            totalPedido += qtd * precoBala;
        }
    });

    const brownie = parseInt(document.getElementById("brownie").value) || 0;
    const palha = parseInt(document.getElementById("palha").value) || 0;

    if (brownie > 0) {
        resumoPedido += `Brownie: ${brownie}\n`;
        totalPedido += brownie * precoOutros;
    }

    if (palha > 0) {
        resumoPedido += `Palha Italiana: ${palha}\n`;
        totalPedido += palha * precoOutros;
    }

    resumoPedido += `\n💰 Total: R$ ${totalPedido.toFixed(2)}`;
}

function enviarWhatsApp(pagamento) {
    const mensagem = `${resumoPedido}\n\n💳 Pagamento: ${pagamento}`;
    const numero = "5521976742777"; // WhatsApp com DDI
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

function gerarPlanilha(pagamento) {
    const data = new Date().toLocaleString("pt-BR");

    const csv = `
Data,Pedido,Total,Pagamento
"${data}","${resumoPedido.replace(/\n/g, " | ")}","${totalPedido.toFixed(2)}","${pagamento}"
`;

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pedidos_w.e.p_doces.csv";
    link.click();
}
