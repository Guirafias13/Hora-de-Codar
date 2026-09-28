function taxaOcupacao() {
    var ocupados = 0;
    for (var i = 0; i < quartos.length; i++) {
        if (quartos[i] !== null) ocupados++;
    }
    return ocupados / quartos.length;
}

function linhaRelatorio(rotulo, valor) {
    return rotulo.padEnd(28, '.') + ' ' + valor + '\n';
}

function sistema_relatorios() {
    var ocupacao = taxaOcupacao() * 100;
    var receitaTotal = receitaHospedagem + receitaEventos;

    var relatorio = 'RELATÓRIO OPERACIONAL\n\n';
    relatorio += linhaRelatorio('Reservas confirmadas', reservasConfirmadas.length);
    relatorio += linhaRelatorio('Taxa de ocupação', ocupacao.toFixed(1).replace('.', ',') + '%');
    relatorio += linhaRelatorio('Hóspedes cadastrados', hospedes.length);
    relatorio += linhaRelatorio('Eventos confirmados', eventosConfirmados.length);
    relatorio += linhaRelatorio('Receita de hospedagem', paraReal(receitaHospedagem));
    relatorio += linhaRelatorio('Receita de eventos', paraReal(receitaEventos));
    relatorio += linhaRelatorio('Receita total', paraReal(receitaTotal));

    alert(relatorio);
    inicio();
}