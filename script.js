/* ===============================
   PREÇOS
================================ */
const precoBala = 2.5;
const precoNutella = 3.5;
const precoBrownie = 9;
const precoPalha = 9;
const precoMaca = 5;
const precoAmor = 10;
const precoMiniBolo = 15;

/* ===============================
   MODAL PAGAMENTO
================================ */
function abrirPagamento() {
    document.getElementById("modalPagamento").style.display = "flex";
}

function fecharPagamento() {
    document.getElementById("modalPagamento").style.display = "none";
}

function mostrarPagamento() {
    const pagamento = document.querySelector('input[name="pagamento"]:checked');
    const info = document.getElementById("infoPagamento");
    const comprovante = document.getElementById("comprovante");

    if (!pagamento) return;

    if (pagamento.value === "PIX") {
        info.innerHTML = "📲 <strong>PIX:</strong><br>21 976742777";
        comprovante.style.display = "block";
    } else {
        info.innerHTML = "💵 <strong>Pagamento na entrega</strong>";
        comprovante.style.display = "none";
    }
}

/* ===============================
   CARRINHO
================================ */
function atualizarCarrinho() {
    let totalBalas = 0;

    /* ===== BALAS BAIANAS ===== */
    const balas = [
        "coco","maracuja","morango",
        "pistache","limao","caipirinha"
    ];

    balas.forEach(id => {
        totalBalas += (parseInt(document.getElementById(id)?.value) || 0) * precoBala;
    });

    const nutella = parseInt(document.getElementById("nutella")?.value) || 0;
    totalBalas += nutella * precoNutella;

    /* ===== BROWNIES ===== */
    const brownies = [
        "brownie_brigadeiro","brownie_ninho",
        "brownie_doce","brownie_nutella"
    ];

    let totalBrownie = 0;
    brownies.forEach(id => {
        totalBrownie += (parseInt(document.getElementById(id)?.value) || 0) * precoBrownie;
    });

    /* ===== PALHA ITALIANA ===== */
    const palhas = [
        "palha_brigadeiro","palha_ninho","palha_oreo"
    ];

    let totalPalha = 0;
    palhas.forEach(id => {
        totalPalha += (parseInt(document.getElementById(id)?.value) || 0) * precoPalha;
    });

    /* ===== MINI BOLO VULCÃO ===== */
    const miniBolos = [
        "bolo_brigadeiro","bolo_ninho","bolo_dois_amores",
        "bolo_ninho_morango","bolo_cenoura"
    ];

    let totalMiniBolo = 0;
    miniBolos.forEach(id => {
        totalMiniBolo += (parseInt(document.getElementById(id)?.value) || 0) * precoMiniBolo;
    });

    /* ===== OUTROS ===== */
    const totalMaca =
        (parseInt(document.getElementById("maca")?.value) || 0) * precoMaca;

    const totalAmor =
        ((parseInt(document.getElementById("morango_amor")?.value) || 0) +
         (parseInt(document.getElementById("bombom_amor")?.value) || 0)) * precoAmor;

    /* ===== TOTAL GERAL ===== */
    const totalGeral =
        totalBalas + totalBrownie + totalPalha +
        totalMiniBolo + totalMaca + totalAmor;

    /* ===== RESUMO ===== */
    document.getElementById("resumoBalas").innerText =
        `Balas: R$ ${totalBalas.toFixed(2)}`;

    document.getElementById("resumoBrownie").innerText =
        `Brownies: R$ ${totalBrownie.toFixed(2)}`;

    document.getElementById("resumoPalha").innerText =
        `Palha Italiana: R$ ${totalPalha.toFixed(2)}`;

    document.getElementById("resumoBolo").innerText =
        `Mini Bolo Vulcão: R$ ${totalMiniBolo.toFixed(2)}`;

    document.getElementById("totalGeral").innerText =
        `Total: R$ ${totalGeral.toFixed(2)}`;

    return totalGeral;
}

/* ===============================
   QUANTIDADE
================================ */
function alterarQuantidade(id, valor) {
    const input = document.getElementById(id);
    let atual = parseInt(input.value) || 0;

    atual += valor;
    if (atual < 0) atual = 0;

    input.value = atual;
    atualizarCarrinho();
}

function validarInput(id) {
    let input = document.getElementById(id);
    let valor = parseInt(input.value);
    if (isNaN(valor) || valor < 0) valor = 0;
    input.value = valor;
    atualizarCarrinho();
}

/* ===============================
   LIMPAR
================================ */
function limparCarrinho() {
    const ids = document.querySelectorAll("input[type='number']");
    ids.forEach(i => i.value = 0);
    atualizarCarrinho();
}

/* ===============================
   CONFIRMAR PEDIDO
================================ */
function confirmarPagamento() {
    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const pagamento = document.querySelector('input[name="pagamento"]:checked');

    if (!nome || !endereco || !pagamento) {
        alert("Preencha todos os dados!");
        return;
    }

    const total = atualizarCarrinho();
    if (total === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let resumo = `🍬 *Pedido W&P Doces*\n`;
    resumo += `👤 ${nome}\n📍 ${endereco}\n`;
    resumo += `💳 Pagamento: ${pagamento.value}\n`;
    resumo += `💰 Total: R$ ${total.toFixed(2)}`;

    window.open(
        `https://wa.me/5521976742777?text=${encodeURIComponent(resumo)}`,
        "_blank"
    );

    gerarCSV(nome, endereco, pagamento.value, total);
    fecharPagamento();
}

/* ===============================
   CSV
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
