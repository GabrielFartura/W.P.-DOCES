function abrirPagamento() {
    document.getElementById("modalPagamento").style.display = "flex";
}

function fecharPagamento() {
    document.getElementById("modalPagamento").style.display = "none";
}

function mostrarPagamento() {
    const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');
    const info = document.getElementById("infoPagamento");
    const comprovante = document.getElementById("comprovante");

    if (!pagamentoSelecionado) return;

    if (pagamentoSelecionado.value === "PIX") {
        info.innerHTML = "📲 <strong>Faça o PIX para:</strong><br>21 976742777";
        comprovante.style.display = "block";
    } else {
        info.innerHTML = "💵 <strong>Pagamento será feito no domicílio</strong>";
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

const precoBala = 2;
const precoOutros = 6;

// Atualiza o carrinho em tempo real
function atualizarCarrinho() {
    let totalBalas = 0;

    const sabores = [
        "coco", "morango", "limao",
        "maracuja", "caipirinha", "nutella"
    ];

    sabores.forEach(id => {
        const qtd = parseInt(document.getElementById(id).value) || 0;
        totalBalas += qtd * precoBala;
    });

    const brownie = parseInt(document.getElementById("brownie").value) || 0;
    const palha = parseInt(document.getElementById("palha").value) || 0;

    const totalBrownie = brownie * precoOutros;
    const totalPalha = palha * precoOutros;

    const totalGeral = totalBalas + totalBrownie + totalPalha;

    document.getElementById("resumoBalas").innerText =
        `Balas: R$ ${totalBalas.toFixed(2)}`;

    document.getElementById("resumoBrownie").innerText =
        `Brownie: R$ ${totalBrownie.toFixed(2)}`;

    document.getElementById("resumoPalha").innerText =
        `Palha Italiana: R$ ${totalPalha.toFixed(2)}`;

    document.getElementById("totalGeral").innerText =
        `Total: R$ ${totalGeral.toFixed(2)}`;
}

function alterarQuantidade(id, valor) {
    const input = document.getElementById(id);
    let atual = parseInt(input.value) || 0;

    atual += valor;

    if (atual < 0) atual = 0;

    input.value = atual;

    atualizarCarrinho();
}

