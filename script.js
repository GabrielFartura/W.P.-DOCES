/* ===============================
   PREÇOS
================================ */
const precoBala = 2;
const precoNutella = 3;
const precoOutros = 6;
const precoBrownie = 9;
const precoPalha = 9;
const precoMaca = 5;
const precoAmor = 10;


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

    /* ===== BALAS ===== */
    const saboresBalas = ["coco","morango","limao","maracuja","caipirinha"];
    saboresBalas.forEach(id => {
        const qtd = parseInt(document.getElementById(id)?.value) || 0;
        totalBalas += qtd * precoBala;
    });

    const qtdNutella = parseInt(document.getElementById("nutella")?.value) || 0;
    totalBalas += qtdNutella * precoNutella;

    /* ===== BROWNIES ===== */
    const brownies = [
        "brownie_brigadeiro",
        "brownie_ninho",
        "brownie_doce",
        "brownie_nutella"
    ];

    let totalBrownie = 0;
    brownies.forEach(id => {
        totalBrownie += (parseInt(document.getElementById(id)?.value) || 0) * precoBrownie;
    });

    /* ===== PALHA ITALIANA ===== */
    const palhas = [
        "palha_brigadeiro",
        "palha_ninho",
        "palha_oreo"
    ];

    let totalPalha = 0;
    palhas.forEach(id => {
        totalPalha += (parseInt(document.getElementById(id)?.value) || 0) * precoPalha;
    });

    /* ===== MAÇÃ DO AMOR ===== */
    const totalMaca =
        (parseInt(document.getElementById("maca")?.value) || 0) * precoMaca;

    /* ===== MORANGO / BOMBOM DO AMOR ===== */
    const totalAmor =
        ((parseInt(document.getElementById("morango_amor")?.value) || 0) +
         (parseInt(document.getElementById("bombom_amor")?.value) || 0)) * precoAmor;

    /* ===== TOTAL GERAL ===== */
    const totalGeral =
        totalBalas + totalBrownie + totalPalha + totalMaca + totalAmor;

    /* ===== RESUMO ===== */
    document.getElementById("resumoBalas").innerText =
        `Balas: R$ ${totalBalas.toFixed(2)}`;

    document.getElementById("resumoBrownie").innerText =
        `Brownies: R$ ${totalBrownie.toFixed(2)}`;

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
        "brownie_brigadeiro","brownie_ninho","brownie_doce","brownie_nutella",
        "palha_brigadeiro","palha_ninho","palha_oreo",
        "maca","morango_amor","bombom_amor"
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
