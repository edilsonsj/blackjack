let iniciarBTN = window.document.querySelector('input#iniciar')
let reiniciarBTN = window.document.querySelector('input#reiniciar')
let manterBTN = window.document.querySelector('input#manter')
let comprarBTN = window.document.querySelector('input#comprar')
let novaRodadaBTN = window.document.querySelector('input#nova-rodada')
let output = window.document.querySelector('div.output-player') 
let outputAdversario = window.document.querySelector('div.output-adversario')
let stats = window.document.querySelector('p.stats')
let vitorias = 0
let derrotas = 0


reiniciarBTN.style.display = 'none'
manterBTN.style.display = 'none'
comprarBTN.style.display = 'none'
novaRodadaBTN.style.display = 'none'
stats.style.display = 'none'

let naipes = ['COPAS', 'ESPADAS', 'OUROS', 'PAUS'];
let valores = ['AS', 'REI', 'DAMA', 'VALETE',
'DEZ', 'NOVE', 'OITO', 'SETE', 'SEIS',
'CINCO', 'QUATRO', 'TRES', 'DOIS'
];


let baralho, 
    minhas_cartas, 
    adversario_cartas, 
    minha_pontuacao, 
    adversario_pontuacao,
    jogoEmAndamento = false,
    jogoEncerrado = false,
    jogadorGanhou = false



function getValorNumerico(carta) {
    switch (carta.valor) {
        case 'AS':
            return 1;
        case 'DOIS':
            return 2;
        case 'TRES':
            return 3;
        case 'QUATRO':
            return 4;
        case 'CINCO':
            return 5;
        case 'SEIS':
            return 6;
        case 'SETE':
            return 7;
        case 'OITO':
            return 8;
        case 'NOVE':
            return 9;

        default:
            return 10;
    }
}



function criarBaralho() {
    let baralho = []
    for(let naipeIndex = 0; naipeIndex < naipes.length; naipeIndex++){
        for (let valoresIndex = 0; valoresIndex < valores.length; valoresIndex++) {
            let carta = {
                naipe: naipes[naipeIndex], 
                valor: valores[valoresIndex]
            }            
            baralho.push(carta) 
        }
    }
    return baralho
}


function embaralhar(cartas) {
    for (let i = baralho.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
    }
    return cartas
}

function getPontuacao(arrCartasJogador) {
    let pontuacao = 0
    let jogardorTemAs = false

    for (let i = 0; i < arrCartasJogador.length; i++) {
        let carta = arrCartasJogador[i]
        pontuacao += getValorNumerico(carta)
        if(carta.valor == 'AS'){
            jogardorTemAs = true
        }
        if(jogardorTemAs && pontuacao + 10 < 21){
            pontuacao += 10 
        }
        
    }
    return pontuacao
}

function atualizaPontuacao() {
    minha_pontuacao = getPontuacao(minhas_cartas)
    adversario_pontuacao = getPontuacao(adversario_cartas)
}

function getProxCarta() {
    return baralho.shift()
}

function getDescricaoCarta(carta) {
    return carta.valor + ' de ' + carta.naipe
}


function getStatus() {
    if(!jogoEmAndamento){
        output.innerHTML = 'Clique n para começar!'
    }
    
    let descricaoMy = ''

    for (let i = 0; i < minhas_cartas.length; i++) {
        descricaoMy += getDescricaoCarta(minhas_cartas[i]) + '\n';
    }
    let descricaoAd = ''
    for (let i = 0; i < adversario_cartas.length; i++) {
        descricaoAd += getDescricaoCarta(adversario_cartas[i]) + '\n'
    }
    atualizaPontuacao()
    output.innerText = `Suas cartas:\n ${descricaoMy} [${minha_pontuacao} pts]\n\n`
    getImg(minhas_cartas, 'output-player')
    outputAdversario.innerText = `\n\nCartas Adversario:\n ${descricaoAd} [${adversario_pontuacao} pts]\n\n`
    getImg(adversario_cartas, 'output-adversario')
}



function getImg(cartas, player) {
    for (let i = 0; i < cartas.length; i++) {
        let img = document.createElement('img')
        img.setAttribute('src', `cartas/${cartas[i].naipe}/${cartas[i].valor}.png`);
        document.querySelector(`div.${player}`).appendChild(img)
        //console.log(img);
    }
}






iniciarBTN.addEventListener('click', function(){
    jogoEmAndamento = true
    baralho = criarBaralho();
    baralho = embaralhar(baralho);

    minhas_cartas = [getProxCarta(), getProxCarta()];
    adversario_cartas = [getProxCarta(), getProxCarta()];


    let minha_pontuacao = getPontuacao(minhas_cartas)
    let adversario_pontuacao = getPontuacao(adversario_cartas)
    getStatus()

    console.log('Sua pontuação: ' + minha_pontuacao, ', Pontuação do Adversário: ' + adversario_pontuacao);
    
    console.log(minhas_cartas);
    console.log(adversario_cartas);
    iniciarBTN.style.display = 'none'
    reiniciarBTN.style.display = 'inline-flex'
    manterBTN.style.display = 'inline-flex'
    comprarBTN.style.display = 'inline-flex'
    stats.style.display = 'inline'
    stats.innerText += '\n\n'

    if (minha_pontuacao === 21) {
        vitorias += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Ganhou'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
    if (minha_pontuacao > 21) {
        derrotas += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br><strong>Perdeu, ultrapassou 21 pts</strong>'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
    if (adversario_pontuacao === 21) {
        derrotas += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Perdeu (Adversário tem 21 pontos)'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
    if (adversario_pontuacao > 21) {
        vitorias += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas}\n\n`
        output.innerHTML += '<br>Ganhou (Adversário ultrapassou 21 pontos) '
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
})


comprarBTN.addEventListener('click', function(){
    minhas_cartas.push(getProxCarta())
    console.log(minhas_cartas)
    console.log(getPontuacao(minhas_cartas));
    getStatus()

    if (minha_pontuacao === 21) {
        vitorias += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Ganhou'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
    if (minha_pontuacao > 21) {
        derrotas += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br><strong>Perdeu, ultrapassou 21 pts</strong>'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
    if (adversario_pontuacao === 21) {
        derrotas += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Perdeu (Adversário tem 21 pontos)'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
    if (adversario_pontuacao > 21) {
        vitorias += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas}\n\n`
        output.innerHTML += '<br>Ganhou (Adversário ultrapassou 21 pontos) '
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
})

manterBTN.addEventListener('click', function(){
    let car = getProxCarta()
    adversario_cartas.push(car)
    getStatus()
    if (adversario_pontuacao === 21) {
        derrotas += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Perdeu (Adversário tem 21 pontos)'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'
    }
    if (adversario_pontuacao > 21) {
        vitorias += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas}\n\n`
        output.innerHTML += '<br>Ganhou (Adversário ultrapassou 21 pontos) '
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
        novaRodadaBTN.style.display = 'inline'

    }
})


novaRodadaBTN.addEventListener('click', function(){
    jogoEmAndamento = true
    baralho = criarBaralho();
    baralho = embaralhar(baralho);

    minhas_cartas = [getProxCarta(), getProxCarta()];
    adversario_cartas = [getProxCarta(), getProxCarta()];


    let minha_pontuacao = getPontuacao(minhas_cartas)
    let adversario_pontuacao = getPontuacao(adversario_cartas)
    getStatus()

    console.log('Sua pontuação: ' + minha_pontuacao, ', Pontuação do Adversário: ' + adversario_pontuacao);
    
    console.log(minhas_cartas);
    console.log(adversario_cartas);
    iniciarBTN.style.display = 'none'
    reiniciarBTN.style.display = 'inline-flex'
    manterBTN.style.display = 'inline-flex'
    comprarBTN.style.display = 'inline-flex'
    stats.style.display = 'inline'
    stats.innerText += '\n\n'

    if (minha_pontuacao === 21) {
        vitorias += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Ganhou'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
    }
    if (minha_pontuacao > 21) {
        derrotas += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br><strong>Perdeu, ultrapassou 21 pts</strong>'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
    }
    if (adversario_pontuacao === 21) {
        derrotas += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Perdeu (Adversário tem 21 pontos)'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
    }
    if (adversario_pontuacao > 21) {
        vitorias += 1
        stats.innerText = `Vitorias/derrotas = ${vitorias}/${derrotas} \n\n`
        output.innerHTML += '<br>Ganhou (Adversário ultrapassou 21 pontos)'
        manterBTN.style.display = 'none'
        comprarBTN.style.display = 'none'
    }

    novaRodadaBTN.style.display = 'none'
})
