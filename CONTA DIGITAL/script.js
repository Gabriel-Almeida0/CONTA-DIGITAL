let saldo = 10.0;
let entradas = 10.0;
let saidas = 0.0;

const saldoElement = document.getElementById('saldo');
const entradasElement = document.getElementById('entradas');
const saidasElement = document.getElementById('saidas');
const transactionList = document.getElementById('transactionList');

const btnPix = document.getElementById('btnPix');
const btnPagar = document.getElementById('btnPagar');
const btnInvestir = document.getElementById('btnInvestir');
const transactionArea = document.getElementById('transactionArea');
const pixArea = document.getElementById('pixArea');

const btnReceber = document.getElementById('btnReceber');
const btnTransferir = document.getElementById('btnTransferir');
const pixForm = document.getElementById('pixForm');
const btnConfirmarPix = document.getElementById('btnConfirmarPix');
const chavePixInput = document.getElementById('chavePix');
const valorPixInput = document.getElementById('valorPix');

function updateBalances() {
    saldoElement.textContent = `R$ ${saldo.toFixed(2)}`;
    entradasElement.textContent = `R$ ${entradas.toFixed(2)}`;
    saidasElement.textContent = `R$ ${saidas.toFixed(2)}`;
}

function addTransaction(tipo, valor, detalhe) {
    const li = document.createElement('li');
    const iconClass = tipo === 'Entrada' ? 'fas fa-arrow-down' : 'fas fa-arrow-up';
    li.innerHTML = `
        <i class="${iconClass}"></i>
        <span><b>${tipo} |</b> ${detalhe}</span>
        <span>Valor: R$${valor.toFixed(2)}</span>
    `;

    if (transactionList.children[0].textContent === "Não constam transações") {
        transactionList.innerHTML = '';
    }
    transactionList.prepend(li);
}

btnPagar.addEventListener('click', () => {
    transactionArea.style.display = 'block';
    pixArea.style.display = 'none';
    transactionArea.innerHTML = `
        <h3>Seção Indisponível</h3>
        <p>Sistema indisponível. Tente novamente mais tarde.</p>
    `;
});

btnInvestir.addEventListener('click', () => {
    transactionArea.style.display = 'block';
    pixArea.style.display = 'none';
    transactionArea.innerHTML = `
        <h3>Seção Indisponível</h3>
        <p>Sistema indisponível. Tente novamente mais tarde.</p>
    `;
});

btnPix.addEventListener('click', () => {
    transactionArea.style.display = 'none';
    pixArea.style.display = 'block';
});

btnReceber.addEventListener('click', () => {
    btnReceber.classList.add('active');
    btnReceber.classList.remove('inactive');
    btnTransferir.classList.add('inactive');
    btnTransferir.classList.remove('active');
    chavePixInput.placeholder = "Chave PIX (CPF/CNPJ)";
});

btnTransferir.addEventListener('click', () => {
    btnReceber.classList.add('inactive');
    btnReceber.classList.remove('active');
    btnTransferir.classList.add('active');
    btnTransferir.classList.remove('inactive');
    chavePixInput.placeholder = "Chave PIX do destinatário";
});

btnConfirmarPix.addEventListener('click', () => {
    const chavePix = chavePixInput.value.trim();
    const valorPix = parseFloat(valorPixInput.value);
    
    if (!chavePix || isNaN(valorPix) || valorPix <= 0) {
        alert("Todos os campos devem ser preenchidos corretamente!");
        return;
    }

    if (btnReceber.classList.contains('active')) {
        saldo += valorPix;
        entradas += valorPix;
        addTransaction('Entrada', valorPix, `Transferência recebida de ${chavePix}`);
    } else if (btnTransferir.classList.contains('active')) {
        if (valorPix > saldo) {
            alert("Saldo insuficiente!");
            return;
        }
        saldo -= valorPix;
        saidas += valorPix;
        addTransaction('Saída', valorPix, `Transferência enviada para ${chavePix}`);
    }

    updateBalances();
    alert("Transação realizada com sucesso!");
});

updateBalances();
