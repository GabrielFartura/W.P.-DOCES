/* ===============================
   PREÇOS
================================ */
const precoBala = 2;
const precoNutella = 3;
const precoOutros = 6;

/* ===============================
   MODAL DE PAGAMENTO
================================ */
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

/* ===============================
   CARRINHO
================================ */
function atualizarCarrinho() {
    let totalBalas = 0;

    const sabores = ["coco","morango","limao","maracuja","caipirinha"];
    sabores.forEach(id => {
        const qtd = parseInt(document.getElementById(id).value) || 0;
        totalBalas += qtd * precoBala;
    });

    const qtdNutella = parseInt(document.getElementById("nutella").value) || 0;
    totalBalas += qtdNutella * precoNutella;

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

    return totalGeral;
}

/* ===============================
   CONTROLE DE QUANTIDADE
================================ */
function alterarQuantidade(id, valor) {
    const input = document.getElementById(id);
    let atual = parseInt(input.value) || 0;

    atual += valor;
    if (atual < 0) atual = 0;

    input.value = atual;
    animarInput(input);
    atualizarCarrinho();
}

function validarInput(id) {
    const input = document.getElementById(id);
    let valor = parseInt(input.value);

    if (isNaN(valor) || valor < 0) valor = 0;

    input.value = valor;
    atualizarCarrinho();
}

function animarInput(input) {
    input.style.transform = "scale(1.1)";
    setTimeout(() => {
        input.style.transform = "scale(1)";
    }, 150);
}

function limparCarrinho() {
    const ids = [
        "coco","morango","limao","maracuja","caipirinha","nutella",
        "brownie","palha"
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = 0;
    });

    atualizarCarrinho();
}

/* ===============================
   CONFIRMAR PAGAMENTO
================================ */
function confirmarPagamento() {
    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');

    if (!nome || !endereco || !pagamentoSelecionado) {
        alert("Preencha todos os dados!");
        return;
    }

    const pagamento = pagamentoSelecionado.value;
    const total = atualizarCarrinho();

    if (total === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let resumo = `🍬 *Pedido W&P Doces*\n`;
    resumo += `👤 ${nome}\n`;
    resumo += `📍 ${endereco}\n\n`;
    resumo += `💳 Pagamento: ${pagamento}\n`;
    resumo += `💰 Total: R$ ${total.toFixed(2)}`;

    // WhatsApp
    const url = `https://wa.me/5521976742777?text=${encodeURIComponent(resumo)}`;
    window.open(url, "_blank");

    // Planilha CSV
    gerarCSV(nome, endereco, pagamento, total);

    fecharPagamento();
}

/* ===============================
   GERAR PLANILHA CSV
================================ */
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
