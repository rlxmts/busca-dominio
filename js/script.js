const campoDeBusca = document.querySelector('.campo-dominio');
const botaoPesquisar = document.querySelector('.botao-pesquisar');
const containerRegistrado = document.querySelector('.resultado-registrado');
const containerDisponivel = document.querySelector('.resultado-disponivel');
botaoPesquisar.addEventListener('click', ()=>{
    
    if(campoDeBusca.value == '' || campoDeBusca.value.length < 2){
        alert('Campo de busca não pode ser vazio ou ter menos de 2 caracteres!')
        return
    }
    buscaDominio()
})

function validaContainer(){
    containerRegistrado.innerHTML = '';
    containerDisponivel.innerHTML = '';
    containerDisponivel.classList.remove('resultado-visivel');
    containerRegistrado.classList.remove('resultado-visivel');
}

async function buscaDominio(){
    const dominio = campoDeBusca.value;
    try{
        validaContainer();
        const api = await fetch(`https://brasilapi.com.br/api/registrobr/v1/${dominio}`);
        const apiConvertida = await api.json();
        criaResultado(apiConvertida);     
    }catch(erro){
        alert(erro);
    }
}

function criaResultado(dominio){
    
    const dominioPesquisado = campoDeBusca.value;
    const dominioTratado = dominioPesquisado.replace(/^www\.|(?:\.com.br)$/g, '');
    const paragrafo = document.createElement('p');
    const listaSugestoes = document.createElement('ul');
    listaSugestoes.classList.add('sugestoes-dominios');
    const botaoComprar = document.createElement('a');
    botaoComprar.setAttribute('target', '_blank');
    botaoComprar.setAttribute('href', 'https://registro.br');
    botaoComprar.textContent = 'Adquirir no site oficial.';
           

    if(dominio.status == 'REGISTERED'){
        
        paragrafo.innerHTML = `<span>www.${dominioTratado}.com.br</span> está em uso.`
        dominio.suggestions.forEach(sugestao => {
           const item = document.createElement('li');
           item.classList.add('itens-sugestoes');
           item.innerHTML = `www.<span>${dominioTratado}.</span>${sugestao}`
           
           listaSugestoes.appendChild(item)
        });

        containerRegistrado.appendChild(paragrafo);
        containerRegistrado.appendChild(listaSugestoes);
        containerRegistrado.classList.add('resultado-visivel');

    }else{
        paragrafo.innerHTML = `<p><span>www.${dominioTratado}.com.br</span> está disponivel!</p>`
        containerDisponivel.appendChild(paragrafo);
        containerDisponivel.appendChild(botaoComprar);
        containerDisponivel.classList.add('resultado-visivel');
    }
}

                    