function sistema_reservas() {
    var diaria = parseFloat(prompt('[Reservas]\nInforme o valor da diária:'));
    var diarias = parseInt(prompt('Informe a quantidade de diárias (1-30):'));

    if (!ehNumeroPositivo(diaria) || !estaEntre(diarias, 1, 30)) {
        alert('Valor inválido, ' + nomeUsuario);
        inicio();
        return;
    }

    var nomeHospede = prompt('Informe o nome do hóspede:');
    var tipo = perguntarTipoQuarto();
    var quarto = escolherQuarto();
    var valores = calcularValores(diaria, diarias, tipo.fator);

    mostrarResumo(nomeHospede, quarto, tipo, valores);
    confirmarReserva(nomeHospede, quarto, tipo, diarias, valores);
}

function perguntarTipoQuarto() {
    var entrada = prompt('Tipo de quarto (S/E/L):');
    var tipo = (entrada || '').toUpperCase();

    if (tipo === 'S') return { sigla: 'S', nome: 'Standard', fator: 1.00 };
    if (tipo === 'E') return { sigla: 'E', nome: 'Executivo', fator: 1.35 };
    if (tipo === 'L') return { sigla: 'L', nome: 'Luxo', fator: 1.65 };

    alert('Tipo inválido. Considerando Standard.');
    return { sigla: 'S', nome: 'Standard', fator: 1.00 };
}

function escolherQuarto() {
    var numero = parseInt(prompt('Escolha um quarto (1-20):'));

    if (!estaEntre(numero, 1, 20)) {
        alert('Número de quarto inválido.');
        return escolherQuarto();
    }

    if (quartos[numero - 1] !== null) {
        alert('Quarto já está ocupado.\n\n' + listarQuartosLivres());
        return escolherQuarto();
    }

    return numero;
}

function listarQuartosLivres() {
    var livres = [];
    for (var i = 0; i < quartos.length; i++) {
        if (quartos[i] === null) livres.push(i + 1);
    }
    return 'Quartos livres: ' + livres.join(', ');
}

function calcularValores(diaria, diarias, fator) {
    var subtotal = diaria * diarias * fator;
    var taxa = subtotal * 0.10;
    var total = subtotal + taxa;
    return { subtotal: subtotal, taxa: taxa, total: total };
}

function mostrarResumo(nomeHospede, quarto, tipo, valores) {
    alert(
        'Resumo:\n' +
        'Hóspede: ' + nomeHospede + '\n' +
        'Quarto: ' + quarto + ' (' + tipo.nome + ')\n' +
        'Subtotal: ' + paraReal(valores.subtotal) + '\n' +
        'Taxa de serviço (10%): ' + paraReal(valores.taxa) + '\n' +
        'Total: ' + paraReal(valores.total)
    );
}

function confirmarReserva(nomeHospede, quarto, tipo, diarias, valores) {
    var resposta = prompt(nomeUsuario + ', confirma a reserva? (S/N):');

    if ((resposta || '').toUpperCase() === 'S') {
        quartos[quarto - 1] = { nome: nomeHospede, tipo: tipo.sigla, diarias: diarias, total: valores.total };
        reservasConfirmadas.push(quartos[quarto - 1]);
        receitaHospedagem += valores.total;

        alert('Reserva efetuada com sucesso.');
        mostrarMapaQuartos();
    } else {
        alert('Reserva não efetuada.');
    }

    inicio();
}

function mostrarMapaQuartos() {
    var mapa = 'Mapa de quartos:\n';
    for (var i = 0; i < quartos.length; i++) {
        var status = quartos[i] === null ? 'L' : 'O';
        var numero = (i + 1) < 10 ? '0' + (i + 1) : (i + 1);
        mapa += numero + ':' + status + '  ';
        if ((i + 1) % 4 === 0) mapa += '\n';
    }
    alert(mapa);
}