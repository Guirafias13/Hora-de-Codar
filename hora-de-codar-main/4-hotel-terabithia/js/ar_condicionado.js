function orcarEmpresa() {
    var empresa = (prompt('Empresa:') || '').trim();
    var valorAparelho = parseFloat((prompt('Valor por aparelho:') || '').replace(',', '.'));
    var quantidade = parseInt(prompt('Quantidade de aparelhos:'));
    var desconto = parseFloat((prompt('Desconto (%):') || '').replace(',', '.'));
    var minimo = parseInt(prompt('Mínimo de aparelhos para desconto:'));
    var deslocamento = parseFloat((prompt('Deslocamento:') || '').replace(',', '.'));

    var bruto = valorAparelho * quantidade;
    var valorDesconto = (quantidade >= minimo) ? bruto * (desconto / 100) : 0;
    var total = bruto - valorDesconto + deslocamento;

    alert('O serviço de ' + empresa + ' custará ' + paraReal(total));

    return { empresa: empresa, total: total };
}

function mostrarMelhorOrcamento(orcamentos) {
    var melhor = orcamentos[0];
    var pior = orcamentos[0];

    for (var i = 1; i < orcamentos.length; i++) {
        if (orcamentos[i].total < melhor.total) melhor = orcamentos[i];
        if (orcamentos[i].total > pior.total) pior = orcamentos[i];
    }

    var diferencaPercentual = ((pior.total - melhor.total) / melhor.total) * 100;

    alert(
        'Melhor orçamento: ' + melhor.empresa + ' — ' + paraReal(melhor.total) + '\n' +
        'Maior orçamento: ' + pior.empresa + ' — ' + paraReal(pior.total) + '\n' +
        'Diferença percentual: ' + diferencaPercentual.toFixed(2).replace('.', ',') + '%'
    );
}

function sistema_ar_condicionado() {
    var orcamentos = [];
    var continuar = true;

    while (continuar) {
        var orcamento = orcarEmpresa();
        orcamentos.push(orcamento);

        var resposta = prompt('Deseja informar novos dados, ' + nomeUsuario + '? (S/N):');
        continuar = (resposta || '').trim().toUpperCase() === 'S';
    }

    mostrarMelhorOrcamento(orcamentos);
    inicio();
}