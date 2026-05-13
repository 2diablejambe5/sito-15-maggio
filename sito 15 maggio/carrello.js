const codiciSconto = {
    "PUCCIOTTO97": 97,
    "15MAGGIO": 15
}

const SPEDIZIONE = 5.99;
const SOGLIA_SPEDIZIONE_GRATUITA = 150;

let scontoApplicato = 0;
function stampaCarrello(){
    let carrello=JSON.parse(localStorage.getItem("carrello"))||[]
    let container=document.getElementById("carrello-prodotti")
    container.innerHTML=""
    for(let i=0;i<carrello.length;i++){
        container.innerHTML += `
            <div class="prodotto-cart">
                <img class="img-sopra-cart" src="${carrello[i].img}" alt="${carrello[i].nome}">
                    <div class="product-info-cart">
                        <h3 class="product-title">${carrello[i].nome}</h3>
                        <p class="product-description">€${carrello[i].prezzo.toFixed(2)}</p>
                        <input type="number" min="1" max="10" value="${carrello[i].quantita}" onchange="aggiornaQuantita(${i}, this.value)">
                         <button onclick="rimuoviProdotto(${i})">Rimuovi</button>
                    </div>
            </div>`
    }
    aggiornaRiepilogo()
}
function aggiornaRiepilogo(){
    
    let carrello=JSON.parse(localStorage.getItem("carrello"))||[]
    let subtotale=carrello.reduce((count,prodotto)=>count+prodotto.prezzo*prodotto.quantita,0);
    let sconto=(scontoApplicato/100)*subtotale
    let totale=subtotale-sconto
    let spedizione 
    if(subtotale<SOGLIA_SPEDIZIONE_GRATUITA){
        spedizione=SPEDIZIONE
    }
    else{
        spedizione=0
    }
    totale+=spedizione
    document.getElementById("subtotale").innerText=subtotale.toFixed(2)
    document.getElementById("importo-sconto").innerText=sconto.toFixed(2)
    document.getElementById("riga-sconto").style.display=scontoApplicato>0? "":"none"
    document.getElementById("spedizione").innerText=spedizione.toFixed(2)
    document.getElementById("totale").innerText=totale.toFixed(2)
}
function aggiornaQuantita(i,valore){
    let carrello=JSON.parse(localStorage.getItem("carrello"))||[]
    let tmp=parseInt(valore)
    if(tmp>10){
            tmp=10
    }
    else if(tmp<1){
            tmp=1
    }
    carrello[i].quantita=tmp
    localStorage.setItem("carrello",JSON.stringify(carrello));
    
    aggiornaRiepilogo()
}
function rimuoviProdotto(i){
    let carrello=JSON.parse(localStorage.getItem("carrello"))||[]
    carrello.splice(i,1)
    localStorage.setItem("carrello",JSON.stringify(carrello));
    stampaCarrello()
}
function applicaSconto(){
    let codice=document.getElementById("codice-input").value.trim().toUpperCase()
    if(codiciSconto[codice]){
        scontoApplicato=codiciSconto[codice]
    }
    else{
        scontoApplicato=0
        document.getElementById("importo-sconto").innerText=scontoApplicato.toFixed(2)
    }
    aggiornaRiepilogo()
}
stampaCarrello()
