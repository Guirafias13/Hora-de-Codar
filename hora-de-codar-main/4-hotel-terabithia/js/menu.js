function inicio() {
    renderTela(
        '<div class="card">' +
        '<h1>Bem-vindo(a), ' + nomeUsuario + '</h1>' +
        '<button onclick="sistema_reservas()">1. Reservas de Quartos</button>' +
        '<button onclick="sistema_cadastrar_hospedes()">2. Cadastro de Hóspedes</button>' +
        '<button onclick="sistema_eventos()">3. Eventos</button>' +
        '<button onclick="sistema_ar_condicionado()">4. Ar-Condicionado</button>' +
        '<button onclick="sistema_abastecimento()">5. Abastecimento</button>' +
        '<button onclick="sistema_relatorios()">6. Relatórios Operacionais</button>' +
        '<button class="secundario" onclick="sair()">7. Sair</button>' +
        '</div>'
    );
}

function sair() {
    renderTela('<div class="card"><h1>Até logo, ' + nomeUsuario + '!</h1><p>Muito obrigado pela visita.</p></div>');
}