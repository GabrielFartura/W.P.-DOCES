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
    let totalGeral = 0;
    let lista = "";

    function addItem(nome, qtd, preco) {
        if (qtd > 0) {
            const subtotal = qtd * preco;
            lista += `• ${nome} (${qtd}x) — R$ ${subtotal.toFixed(2)}<br>`;
            totalGeral += subtotal;
        }
    }

    /* ===== BALAS BAIANAS ===== */
    addItem("Bala de Coco", parseInt(coco.value)||0, precoBala);
    addItem("Bala de Maracujá", parseInt(maracuja.value)||0, precoBala);
    addItem("Bala de Morango", parseInt(morango.value)||0, precoBala);
    addItem("Bala de Pistache", parseInt(pistache.value)||0, precoBala);
    addItem("Bala de Limão", parseInt(limao.value)||0, precoBala);
    addItem("Bala Caipirinha", parseInt(caipirinha.value)||0, precoBala);
    addItem("Bala de Nutella", parseInt(nutella.value)||0, precoNutella);

    /* ===== BROWNIES ===== */
    addItem("Brownie Brigadeiro", parseInt(brownie_brigadeiro.value)||0, precoBrownie);
    addItem("Brownie Ninho", parseInt(brownie_ninho.value)||0, precoBrownie);
    addItem("Brownie Doce de Leite", parseInt(brownie_doce.value)||0, precoBrownie);
    addItem("Brownie Nutella", parseInt(brownie_nutella.value)||0, precoBrownie);

    /* ===== PALHA ITALIANA ===== */
    addItem("Palha Brigadeiro", parseInt(palha_brigadeiro.value)||0, precoPalha);
    addItem("Palha Ninho", parseInt(palha_ninho.value)||0, precoPalha);
    addItem("Palha Oreo", parseInt(palha_oreo.value)||0, precoPalha);

    /* ===== MINI BOLO ===== */
    addItem("Mini Bolo Brigadeiro", parseInt(bolo_brigadeiro.value)||0, precoMiniBolo);
    addItem("Mini Bolo Ninho", parseInt(bolo_ninho.value)||0, precoMiniBolo);
    addItem("Mini Bolo Dois Amores", parseInt(bolo_dois_amores.value)||0, precoMiniBolo);
    addItem("Mini Bolo Ninho c/ Morango", parseInt(bolo_ninho_morango.value)||0, precoMiniBolo);
    addItem("Mini Bolo Cenoura", parseInt(bolo_cenoura.value)||0, precoMiniBolo);

    /* ===== OUTROS ===== */
    addItem("Maçã do Amor", parseInt(maca.value)||0, precoMaca);
    addItem("Morango do Amor", parseInt(morango_amor.value)||0, precoAmor);
    addItem("Bombom do Amor", parseInt(bombom_amor.value)||0, precoAmor);

    document.getElementById("listaCarrinho").innerHTML =
        lista || "<em>Carrinho vazio</em>";

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
resumo += `👤 ${nome}\n📍 ${endereco}\n\n`;
resumo += `🧾 Itens:\n${document.getElementById("listaCarrinho").innerText}\n\n`;
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
