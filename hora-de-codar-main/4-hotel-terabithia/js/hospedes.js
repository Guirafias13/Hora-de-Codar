function lerNome(mensagem) {
    return (prompt(mensagem) || '').trim();
}

function nomeJaExiste(nome) {
    for (var i = 0; i < hospedes.length; i++) {
        if (hospedes[i].nome.toLowerCase() === nome.toLowerCase()) return true;
    }
    return false;
}

function hospedesOrdenados() {
    return hospedes.slice().sort(function (a, b) {
        return a.nome.localeCompare(b.nome, 'pt-BR');
    });
}

function textoLista(lista) {
    var texto = '';
    for (var i = 0; i < lista.length; i++) {
        texto += '[' + (i + 1) + '] ' + lista[i].nome + ' - ' + lista[i].dataCadastro + '\n';
    }
    return texto;
}

function cadastrar_hospede() {
    if (hospedes.length >= 15) {
        alert('Máximo de cadastros atingido');
        return;
    }

    var nome = lerNome('Nome do hóspede:');
    if (nome === '') {
        alert('Nome inválido.');
        return;
    }

    if (nomeJaExiste(nome)) {
        alert('Hóspede já cadastrado');
        return;
    }

    hospedes.push({ nome: nome, dataCadastro: new Date().toLocaleString('pt-BR') });
    alert('Hóspede cadastrado com sucesso.');
}

function buscarHospedePorNome(nome) {
    var procurado = nome.toLowerCase();

    for (var i = 0; i < hospedes.length; i++) {
        if (hospedes[i].nome.toLowerCase() === procurado) {
            return hospedes[i];
        }
    }

    return null;
}

function pesquisar_exato() {
    var nome = lerNome('Nome do hóspede para pesquisa:');
    var hospede = buscarHospedePorNome(nome);

    if (hospede !== null) {
        alert('Hóspede ' + hospede.nome + ' foi encontrado');
    } else {
        alert('Hóspede não encontrado');
    }
}

function pesquisar_prefixo() {
    var prefixo = lerNome('Prefixo:').toLowerCase();
    var resultados = '';
    var contador = 0;

    for (var i = 0; i < hospedes.length; i++) {
        if (hospedes[i].nome.toLowerCase().startsWith(prefixo)) {
            contador++;
            resultados += '[' + contador + '] ' + hospedes[i].nome + '\n';
        }
    }

    if (prefixo === '' || contador === 0) {
        alert('Hóspede não encontrado');
    } else {
        alert('Resultados:\n' + resultados);
    }
}

function listar_hospedes() {
    if (hospedes.length === 0) {
        alert('Nenhum hóspede cadastrado.');
        return;
    }

    alert('Hóspedes (A-Z):\n' + textoLista(hospedesOrdenados()));
}

function escolherHospedePorIndice() {
    if (hospedes.length === 0) {
        alert('Nenhum hóspede cadastrado.');
        return null;
    }

    var lista = hospedesOrdenados();
    var indice = parseInt(prompt('Informe o índice do hóspede:\n\n' + textoLista(lista)));

    if (!estaEntre(indice, 1, lista.length)) {
        alert('Hóspede não encontrado');
        return null;
    }

    return lista[indice - 1];
}

function atualizar_hospede() {
    var hospede = escolherHospedePorIndice();
    if (hospede === null) return;

    var novoNome = lerNome('Novo nome:');
    if (novoNome === '') {
        alert('Nome inválido.');
        return;
    }

    if (novoNome !== hospede.nome && nomeJaExiste(novoNome)) {
        alert('Hóspede já cadastrado');
        return;
    }

    hospede.nome = novoNome;
    alert('Operação realizada com sucesso');
}

function remover_hospede() {
    var hospede = escolherHospedePorIndice();
    if (hospede === null) return;

    hospedes.splice(hospedes.indexOf(hospede), 1);
    alert('Operação realizada com sucesso');
}

function sistema_cadastrar_hospedes() {
    var opcao = parseInt(prompt(
        '[Cadastro de Hóspedes]\n\n' +
        '1 - Cadastrar\n' +
        '2 - Pesquisar por nome exato\n' +
        '3 - Pesquisar por prefixo\n' +
        '4 - Listar ordenado (A-Z)\n' +
        '5 - Atualizar cadastro\n' +
        '6 - Remover cadastro\n' +
        '7 - Voltar'
    ));

    if (opcao === 7) {
        inicio();
        return;
    }

    if (opcao === 1) cadastrar_hospede();
    else if (opcao === 2) pesquisar_exato();
    else if (opcao === 3) pesquisar_prefixo();
    else if (opcao === 4) listar_hospedes();
    else if (opcao === 5) atualizar_hospede();
    else if (opcao === 6) remover_hospede();
    else alert('Opção inválida. Tente novamente.');

    sistema_cadastrar_hospedes();
}