let bala = {
    sabor: "",
    quantidade: 0,
    preco: 2
};

function adicionarBala() {
    bala.sabor = document.getElementById("sabor").value;
    bala.quantidade = parseInt(document.getElementById("qtdBala").value);

    if (!bala.quantidade || bala.quantidade <= 0) {
        alert("Informe a quantidade de balas.");
        return;
    }

    alert("Balas adicionadas!");
}

function finalizarPedido() {
    const qtdBrownie = parseInt(document.getElementById("qtdBrownie").value) || 0;
    const qtdPalha = parseInt(document.getElementById("qtdPalha").value) || 0;

    const totalBalas = bala.quantidade * bala.preco;
    const totalBrownie = qtdBrownie * 6;
    const totalPalha = qtdPalha * 6;

    const total = totalBalas + totalBrownie + totalPalha;

    document.getElementById("resumo").innerHTML = `
        <h3>📝 Resumo do Pedido</h3>
        <p>Balas de Coco (${bala.sabor}): ${bala.quantidade} → R$ ${totalBalas.toFixed(2)}</p>
        <p>Brownies: ${qtdBrownie} → R$ ${totalBrownie.toFixed(2)}</p>
        <p>Palha Italiana: ${qtdPalha} → R$ ${totalPalha.toFixed(2)}</p>
        <hr>
        <h3>Total: R$ ${total.toFixed(2)}</h3>
    `;
}
