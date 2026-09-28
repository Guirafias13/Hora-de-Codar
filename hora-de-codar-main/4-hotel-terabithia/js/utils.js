function perguntar(mensagem) {
    return prompt(mensagem);
}

function perguntarNumero(mensagem) {
    return parseFloat(prompt(mensagem));
}

function estaEntre(valor, min, max) {
    return typeof valor === 'number' && !isNaN(valor) && valor >= min && valor <= max;
}

function ehNumeroPositivo(valor) {
    return typeof valor === 'number' && !isNaN(valor) && valor > 0;
}

function paraReal(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderTela(html) {
    document.getElementById('app').innerHTML = html;
}