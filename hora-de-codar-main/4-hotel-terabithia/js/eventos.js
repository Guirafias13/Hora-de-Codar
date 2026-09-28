function escolherAuditorio(convidados) {
    if (convidados <= 150) {
        return { nome: 'Laranja', cadeirasExtras: 0 };
    }
    if (convidados <= 220) {
        return { nome: 'Laranja', cadeirasExtras: convidados - 150 };
    }
    return { nome: 'Colorado', cadeirasExtras: 0 };
}

function descreverAuditorio(auditorio) {
    var texto = auditorio.nome;
    if (auditorio.cadeirasExtras === 1) {
        texto += ' (1 cadeira adicional)';
    } else if (auditorio.cadeirasExtras > 1) {
        texto += ' (' + auditorio.cadeirasExtras + ' cadeiras adicionais)';
    }
    return texto;
}

function normalizarDia(texto) {
    return (texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/-?feira/, '')
        .trim();
}

function janelaDoDia(dia) {
    if (dia === 'sabado' || dia === 'domingo') {
        return { abre: 7, fecha: 15 };
    }
    if (['segunda', 'terca', 'quarta', 'quinta', 'sexta'].includes(dia)) {
        return { abre: 7, fecha: 23 };
    }
    return null;
}

function estaDisponivel(janela, horaInicio, duracao) {
    var horaFim = horaInicio + duracao;
    return horaInicio >= janela.abre && horaFim <= janela.fecha;
}

function calcularGarcons(convidados, duracao) {
    var base = Math.ceil(convidados / 12);
    var reforco = Math.floor(duracao / 2);
    var quantidade = base + reforco;
    var custo = quantidade * duracao * 10.5;
    return { quantidade: quantidade, custo: custo };
}

function calcularBuffet(convidados) {
    var cafeL = convidados * 0.2;
    var aguaL = convidados * 0.5;
    var salgados = convidados * 7;
    var custo = (cafeL * 0.80) + (aguaL * 0.40) + (salgados / 100) * 34;
    return { cafeL: cafeL, aguaL: aguaL, salgados: salgados, custo: custo };
}

function formatarDecimal(valor) {
    return valor.toFixed(1).replace('.', ',');
}

function mostrarRelatorioEvento(evento) {
    alert(
        'RELATÓRIO DO EVENTO\n\n' +
        'Auditório: ' + evento.auditorio + '\n' +
        'Empresa: ' + evento.empresa + '\n' +
        'Dia: ' + evento.dia + '\n' +
        'Horário: ' + evento.horaInicio + 'hs às ' + evento.horaFim + 'hs (' + evento.duracao + ' horas)\n' +
        'Convidados: ' + evento.convidados + '\n\n' +
        'Garçons necessários: ' + evento.garcons + '\n' +
        'Custo com garçons: ' + paraReal(evento.custoGarcons) + '\n\n' +
        'Buffet:\n' +
        'Café: ' + formatarDecimal(evento.buffet.cafeL) + ' L\n' +
        'Água: ' + formatarDecimal(evento.buffet.aguaL) + ' L\n' +
        'Salgados: ' + evento.buffet.salgados + ' un\n' +
        'Custo buffet: ' + paraReal(evento.buffet.custo) + '\n\n' +
        'Total do evento: ' + paraReal(evento.total)
    );
}

function confirmarEvento(evento) {
    var resposta = prompt(nomeUsuario + ', confirmar reserva? (S/N):');

    if ((resposta || '').trim().toUpperCase() === 'S') {
        eventosConfirmados.push(evento);
        receitaEventos += evento.total;
        alert('Reserva efetuada com sucesso.');
    } else {
        alert('Reserva não efetuada.');
    }
}

function sistema_eventos() {
    // Parte A: convidados e auditório
    var convidados = parseFloat(prompt('[Eventos]\nNúmero de convidados:'));

    if (!Number.isInteger(convidados) || convidados < 0 || convidados > 350) {
        alert('Número de convidados inválido');
        inicio();
        return;
    }

    var auditorio = escolherAuditorio(convidados);
    alert('Auditório selecionado: ' + descreverAuditorio(auditorio));

    // Parte B: dia, hora, duração e disponibilidade
    var dia = normalizarDia(prompt('Dia da semana (ex: segunda, terca, sabado):'));
    var horaInicio = parseFloat((prompt('Hora inicial (número inteiro, ex: 13):') || '').replace(',', '.')); var duracao = parseFloat(prompt('Duração em horas (1 a 12):'));
    var janela = janelaDoDia(dia);

    if (janela === null || !Number.isInteger(horaInicio) || !Number.isInteger(duracao) || !estaEntre(duracao, 1, 12)) {
        alert('Valor inválido');
        inicio();
        return;
    }

    if (!estaDisponivel(janela, horaInicio, duracao)) {
        alert(
            'Auditório indisponível.\n' +
            'Neste dia ele funciona das ' + janela.abre + 'hs às ' + janela.fecha + 'hs, ' +
            'e o evento ocuparia das ' + horaInicio + 'hs às ' + (horaInicio + duracao) + 'hs.'
        );
        inicio();
        return;
    }

    var empresa = (prompt('Nome da empresa:') || '').trim();
    if (empresa === '') {
        alert('Nome da empresa inválido');
        inicio();
        return;
    }
    alert('Auditório reservado para ' + empresa + ': ' + dia + ' às ' + horaInicio + 'hs');

    // Partes C e D: custos
    var garcons = calcularGarcons(convidados, duracao);
    var buffet = calcularBuffet(convidados);

    // Parte E: relatório e confirmação
    var evento = {
        auditorio: descreverAuditorio(auditorio),
        empresa: empresa,
        dia: dia,
        horaInicio: horaInicio,
        horaFim: horaInicio + duracao,
        duracao: duracao,
        convidados: convidados,
        garcons: garcons.quantidade,
        custoGarcons: garcons.custo,
        buffet: buffet,
        total: garcons.custo + buffet.custo
    };

    mostrarRelatorioEvento(evento);
    confirmarEvento(evento);
    inicio();
}