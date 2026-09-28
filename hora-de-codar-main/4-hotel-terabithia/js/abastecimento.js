function orcarPosto(nomePosto) {
    var alcool = parseFloat((prompt(nomePosto + ' - Preço do álcool:') || '').replace(',', '.'));
    var gasolina = parseFloat((prompt(nomePosto + ' - Preço da gasolina:') || '').replace(',', '.'));

    var etanolVantajoso = alcool <= gasolina * 0.70;
    var combustivel = etanolVantajoso ? 'Álcool' : 'Gasolina';
    var precoUnitario = etanolVantajoso ? alcool : gasolina;
    var total = precoUnitario * 42;

    return { posto: nomePosto, combustivel: combustivel, total: total };
}

function sistema_abastecimento() {
    var wayne = orcarPosto('Wayne Oil');
    var stark = orcarPosto('Stark Petrol');

    alert(
        'Wayne Oil: melhor opção = ' + wayne.combustivel + ' | Total (42L) = ' + paraReal(wayne.total) + '\n' +
        'Stark Petrol: melhor opção = ' + stark.combustivel + ' | Total (42L) = ' + paraReal(stark.total)
    );

    var melhor = (wayne.total <= stark.total) ? wayne : stark;

    alert(nomeUsuario + ', é mais barato abastecer com ' + melhor.combustivel.toLowerCase() + ' no posto ' + melhor.posto + '.');

    inicio();
}