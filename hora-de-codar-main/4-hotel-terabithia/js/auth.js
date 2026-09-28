var SENHA_CORRETA = '2678';
var NOME_HOTEL = 'Terabithia';
var nomeUsuario = '';
var tentativasLogin = 0;

function login() {
    renderTela(
        '<div class="card">' +
        '<h1>Hotel ' + NOME_HOTEL + '</h1>' +
        '<label>Nome</label>' +
        '<input type="text" id="campo-nome" placeholder="Seu nome">' +
        '<label>Senha</label>' +
        '<input type="password" id="campo-senha" placeholder="Senha">' +
        '<button onclick="tentarLogin()">Entrar</button>' +
        '<p class="erro" id="mensagem-login"></p>' +
        '</div>'
    );
}

function tentarLogin() {
    var nome = document.getElementById('campo-nome').value.trim();
    var senha = document.getElementById('campo-senha').value;

    if (nome === '') {
        document.getElementById('mensagem-login').textContent = 'Informe seu nome.';
        return;
    }

    tentativasLogin++;

    if (senha === SENHA_CORRETA) {
        nomeUsuario = nome;
        inicio();
        return;
    }

    if (tentativasLogin >= 3) {
        renderTela('<div class="card"><h1>Acesso bloqueado</h1><p>Número máximo de tentativas excedido.</p></div>');
        return;
    }

    document.getElementById('mensagem-login').textContent =
        'Senha incorreta. Tentativa ' + tentativasLogin + ' de 3.';
}