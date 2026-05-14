
function filtraRicerca(){
    let ricerca=document.getElementById("ricerca").value.toLowerCase()
    let prodotti=document.querySelectorAll(".prodotto")
    let ricerca2=document.querySelector(".FiltroMarchio").value.toLowerCase()
    for(let i=0;i<prodotti.length;i++){
        let nome=prodotti[i].querySelector("h3").innerText.toLowerCase()
        let desc=prodotti[i].querySelector("p").innerText.toLowerCase()
        let brand=prodotti[i].getAttribute("data-brand").toLowerCase()
        if((ricerca2==="all"||ricerca2===brand)&&(nome.includes(ricerca)||desc.includes(ricerca))){
            prodotti[i].style.display=""
        }
        else{
            prodotti[i].style.display="none"
        }
    }
}
const container=document.querySelector(".Shop-prodotti")
const ordineOg=Array.from(document.querySelectorAll(".prodotto"))
function filtraPrezzo(){
   let scelta=document.querySelector(".FiltroPrezzo").value.toLowerCase()
   let prodotti=Array.from(document.querySelectorAll(".prodotto"))
   if(scelta==="tutti"){
    for(let i=0;i<prodotti.length;i++){
        container.appendChild(ordineOg[i])
    }
    
   }
   else if(scelta==="cre"){
         prodotti.sort((a,b)=>{
            let prezzoA = parseFloat(a.getAttribute("data-price"));
            let prezzoB = parseFloat(b.getAttribute("data-price"));
            return prezzoA-prezzoB
         })
         prodotti.forEach(prodotto => container.appendChild(prodotto));
    }
    else if(scelta==="dec"){
         prodotti.sort((a,b)=>{
            let prezzoA = parseFloat(a.getAttribute("data-price"));
            let prezzoB = parseFloat(b.getAttribute("data-price"));
            return prezzoB-prezzoA
         })
         prodotti.forEach(prodotto => container.appendChild(prodotto));
    }
}



document.querySelectorAll(".aggiungi").forEach(button=>{button.addEventListener("click",function(){
        let prodotto=this.closest(".prodotto")
        let nome=prodotto.querySelector("h3").innerText
        let prezzo=parseFloat(prodotto.getAttribute("data-price"))
        let img=prodotto.querySelector(".img-sopra").getAttribute("src")
        let carrello=JSON.parse(localStorage.getItem("carrello"))||[]
        let desc=prodotto.querySelector("p").innerText
        let esiste=carrello.find(a=>a.nome===nome&&(a=>a.desc===desc))
        
        if(esiste){
             if(esiste.quantita<10){
                esiste.quantita++
             }
        }
        else{
            carrello.push({nome,prezzo,img,desc,quantita:1})
            
        }
        localStorage.setItem("carrello",JSON.stringify(carrello))
        contaElementiCarrello()
         alert(nome+" è stato aggiunto al carrello")
        
    })
})
contaElementiCarrello()

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
                    <div class="prodotto-info-cart">
                        <h3 class="product-title">${carrello[i].nome}</h3>
                        <p>€${carrello[i].prezzo.toFixed(2)}</p>
                        <input class="selettore-quantita"type="number" min="1" max="10" value="${carrello[i].quantita}" onchange="aggiornaQuantita(${i}, this.value)">
                         <button  id="acquista" onclick="rimuoviProdotto(${i})">Rimuovi</button>
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
    if(spedizione!=0){
        document.getElementById("spedizione").innerText+=" (Soglia spedizione su ordini≥€150)"
    }
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
    contaElementiCarrello()
}
function rimuoviProdotto(i){
    let carrello=JSON.parse(localStorage.getItem("carrello"))||[]
    carrello.splice(i,1)
    localStorage.setItem("carrello",JSON.stringify(carrello));
    
    stampaCarrello()
    contaElementiCarrello()
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
function contaElementiCarrello(){
    let carrello=JSON.parse(localStorage.getItem("carrello")) || [];
    let numero=carrello.length;

    let contatore=document.getElementById("contatore-carrello");

    if(contatore){
        contatore.innerText="("+numero+")";
    }
}
contaElementiCarrello()
stampaCarrello()
