const form = document.getElementById("formProduto");
const lista = document.getElementById("lista");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const unidade = document.getElementById("unidade").value;
  const tipo = document.querySelector('input[name="tipo"]:checked');

  if (!nome || !descricao || !valor || !unidade || !tipo) {
    alert("Preencha todos os campos!");
    return;
  }

  const div = document.createElement("div");
  div.classList.add("item");

  if (tipo.value == "1") {
    div.classList.add("isento");
  }

  div.innerHTML = `
    <strong>${nome}</strong><br>
    Valor: R$ ${valor.toFixed(2)} (${unidade})<br>
    Tipo: ${tipo.value}<br><br>

    Quantidade: <input type="number" value="0"><br><br>

    Total: R$ <span class="total">0.00</span><br>
    Imposto: R$ <span class="imposto">0.00</span><br>
    Final: R$ <span class="final">0.00</span><br><br>

    <button class="remover">Excluir</button>
  `;

  const inputQtd = div.querySelector("input");
  const totalEl = div.querySelector(".total");
  const impostoEl = div.querySelector(".imposto");
  const finalEl = div.querySelector(".final");

  inputQtd.addEventListener("input", function() {
    const qtd = parseFloat(inputQtd.value) || 0;
    const total = qtd * valor;

    let taxa = 0;

    switch (parseInt(tipo.value)) {
      case 2: taxa = 0.08; break;
      case 3: taxa = 0.10; break;
      case 4: taxa = 0.12; break;
      case 5: taxa = 0.17; break;
    }

    const imposto = total * taxa;
    const final = total + imposto;

    totalEl.textContent = total.toFixed(2);
    impostoEl.textContent = imposto.toFixed(2);
    finalEl.textContent = final.toFixed(2);
  });

  div.querySelector(".remover").addEventListener("click", () => {
    div.remove();
  });

  lista.appendChild(div);

  form.reset();
});