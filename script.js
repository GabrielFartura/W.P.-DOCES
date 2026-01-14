/* ================= PRODUTOS ================= */
const produtos = {
  bala_coco: {nome:"Bala Coco", preco:2.5},
  bala_maracuja: {nome:"Bala Maracujá", preco:2.5},
  bala_morango: {nome:"Bala Morango", preco:2.5},
  bala_pistache: {nome:"Bala Pistache", preco:2.5},
  bala_limao: {nome:"Bala Limão", preco:2.5},
  bala_caipirinha: {nome:"Bala Caipirinha", preco:2.5},
  bala_nutella: {nome:"Bala Nutella", preco:3.5},

  bolo_brigadeiro: {nome:"Mini Bolo Brigadeiro", preco:15},
  bolo_ninho: {nome:"Mini Bolo Ninho", preco:15},
  bolo_dois_amores: {nome:"Mini Bolo Dois Amores", preco:15},
  bolo_ninho_morango: {nome:"Mini Bolo Ninho c/ Morango", preco:15},
  bolo_cenoura: {nome:"Mini Bolo Cenoura c/ Chocolate", preco:15},

  brownie_brigadeiro:{nome:"Brownie Brigadeiro",preco:9},
  brownie_ninho:{nome:"Brownie Ninho",preco:9},
  brownie_doce:{nome:"Brownie Doce de Leite",preco:9},
  brownie_nutella:{nome:"Brownie Nutella",preco:9},

  palha_brigadeiro:{nome:"Palha Brigadeiro",preco:9},
  palha_ninho:{nome:"Palha Ninho",preco:9},
  palha_oreo:{nome:"Palha Oreo",preco:9},

  maca:{nome:"Maçã do Amor",preco:5},
  morango_amor:{nome:"Morango do Amor",preco:10},
  bombom_amor:{nome:"Bombom do Amor",preco:10}
};

/* ================= QUANTIDADE ================= */
function alterar(id, valor) {
  const input = document.getElementById(id);
  let v = parseInt(input.value) || 0;
  v += valor;
  if (v < 0) v = 0;
  input.value = v;
  atualizarCarrinho();
}

/* ================= CARRINHO ================= */
function atualizarCarrinho() {
  let html = "";
  let total = 0;

  for (let id in produtos) {
    const input = document.getElementById(id);
    if (!input) continue;

    const qtd = parseInt(input.value) || 0;

    if (qtd > 0) {
      const p = produtos[id];
      const sub = qtd * p.preco;
      total += sub;
      html += `${p.nome} (${qtd}x) — R$ ${sub.toFixed(2)}\n`;
    }
  }

  document.getElementById("listaCarrinho").innerText =
    html || "Carrinho vazio";

  document.getElementById("total").innerText =
    `Total: R$ ${total.toFixed(2)}`;

  return total;
}

function limpar() {
  for (let id in produtos) {
    document.getElementById(id).value = 0;
  }
  atualizarCarrinho();
}

/* ================= MODAL ================= */
function abrirPagamento() {
  atualizarCarrinho();
  document.getElementById("modalPagamento").style.display = "block";
}

function fecharPagamento() {
  document.getElementById("modalPagamento").style.display = "none";
}

function mostrarPagamento() {
  const pag = document.querySelector('input[name="pagamento"]:checked');
  const info = document.getElementById("infoPagamento");

  if (!pag) return;

  if (pag.value === "PIX") {
    info.innerHTML = "📲 PIX: <strong>21 976742777</strong>";
  } else {
    info.innerHTML = "💵 Pagamento em dinheiro na entrega";
  }
}

/* ================= FINALIZAR ================= */
function confirmarPedido() {
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const pag = document.querySelector('input[name="pagamento"]:checked');

  if (!nome || !endereco || !pag) {
    alert("Preencha todos os dados");
    return;
  }

  let total = atualizarCarrinho();
  if (total === 0) {
    alert("Carrinho vazio");
    return;
  }

  let msg = `🍬 *Pedido W&P Doces*\n\n`;
  msg += `👤 ${nome}\n`;
  msg += `📍 ${endereco}\n\n`;
  msg += `🧾 Itens:\n${document.getElementById("listaCarrinho").innerText}\n\n`;
  msg += `💳 Pagamento: ${pag.value}\n`;
  msg += `💰 Total: R$ ${total.toFixed(2)}`;

  window.open(
    `https://wa.me/5521976742777?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

  fecharPagamento();
}
