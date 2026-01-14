/* ===============================
   PRODUTOS (NOME + PREÇO)
================================ */
const produtos = {
  // BALAS
  bala_coco: { nome: "Bala de Coco", preco: 2.5 },
  bala_maracuja: { nome: "Bala de Maracujá", preco: 2.5 },
  bala_morango: { nome: "Bala de Morango", preco: 2.5 },
  bala_pistache: { nome: "Bala de Pistache", preco: 2.5 },
  bala_limao: { nome: "Bala de Limão", preco: 2.5 },
  bala_caipirinha: { nome: "Bala Caipirinha", preco: 2.5 },
  bala_nutella: { nome: "Bala de Nutella", preco: 3.5 },

  // MINI BOLOS
  bolo_brigadeiro: { nome: "Mini Bolo Brigadeiro", preco: 15 },
  bolo_ninho: { nome: "Mini Bolo Ninho", preco: 15 },
  bolo_dois_amores: { nome: "Mini Bolo Dois Amores", preco: 15 },
  bolo_ninho_morango: { nome: "Mini Bolo Ninho c/ Morango", preco: 15 },
  bolo_cenoura: { nome: "Mini Bolo Cenoura c/ Chocolate", preco: 15 },

  // BROWNIES
  brownie_brigadeiro: { nome: "Brownie Brigadeiro", preco: 9 },
  brownie_ninho: { nome: "Brownie Ninho", preco: 9 },
  brownie_doce: { nome: "Brownie Doce de Leite", preco: 9 },
  brownie_nutella: { nome: "Brownie Nutella", preco: 9 },

  // PALHA ITALIANA
  palha_brigadeiro: { nome: "Palha Italiana Brigadeiro", preco: 9 },
  palha_ninho: { nome: "Palha Italiana Ninho", preco: 9 },
  palha_oreo: { nome: "Palha Italiana Oreo", preco: 9 },

  // DO AMOR
  maca: { nome: "Maçã do Amor", preco: 5 },
  morango_amor: { nome: "Morango do Amor", preco: 10 },
  bombom_amor: { nome: "Bombom do Amor", preco: 10 }
};

/* ===============================
   ALTERAR QUANTIDADE (+ / -)
================================ */
function alterar(id, valor) {
  const input = document.getElementById(id);
  if (!input) return;

  let qtd = parseInt(input.value) || 0;
  qtd += valor;
  if (qtd < 0) qtd = 0;

  input.value = qtd;
  atualizarCarrinho();
}

/* ===============================
   ATUALIZAR CARRINHO
================================ */
function atualizarCarrinho() {
  let html = "";
  let total = 0;

  for (let id in produtos) {
    const input = document.getElementById(id);
    if (!input) continue;

    const qtd = parseInt(input.value) || 0;
    if (qtd > 0) {
      const produto = produtos[id];
      const subtotal = qtd * produto.preco;

      total += subtotal;
      html += `• ${produto.nome} (${qtd}x) — R$ ${subtotal.toFixed(2)}<br>`;
    }
  }

  document.getElementById("listaCarrinho").innerHTML =
    html || "<em>Carrinho vazio</em>";

  document.getElementById("total").innerText =
    `Total: R$ ${total.toFixed(2)}`;

  return total;
}

/* ===============================
   LIMPAR CARRINHO
================================ */
function limpar() {
  for (let id in produtos) {
    const input = document.getElementById(id);
    if (input) input.value = 0;
  }
  atualizarCarrinho();
}

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
    info.innerHTML = "📲 <strong>Faça o PIX para:</strong><br>21 976742777";
    comprovante.style.display = "block";
  } else {
    info.innerHTML = "💵 <strong>Pagamento em dinheiro na entrega</strong>";
    comprovante.style.display = "none";
  }
}

/* ===============================
   CONFIRMAR PEDIDO
================================ */
function confirmarPagamento() {
  const nome = document.getElementById("nome")?.value.trim();
  const endereco = document.getElementById("endereco")?.value.trim();
  const pagamento = document.querySelector('input[name="pagamento"]:checked');

  if (!nome || !endereco || !pagamento) {
    alert("Preencha nome, endereço e forma de pagamento.");
    return;
  }

  const total = atualizarCarrinho();
  if (total === 0) {
    alert("Carrinho vazio.");
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
   GERAR CSV (PLANILHA)
================================ */
function gerarCSV(nome, endereco, pagamento, total) {
  const data = new Date().toLocaleString("pt-BR");

  let itens = "";
  for (let id in produtos) {
    const input = document.getElementById(id);
    const qtd = parseInt(input?.value) || 0;
    if (qtd > 0) {
      itens += `${produtos[id].nome} (${qtd}x) | `;
    }
  }

  const csv = `Data,Nome,Endereço,Pagamento,Itens,Total
"${data}","${nome}","${endereco}","${pagamento}","${itens}","${total.toFixed(2)}"`;

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pedidos_wp_doces.csv";
  a.click();
}
