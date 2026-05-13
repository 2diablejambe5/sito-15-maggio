
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
        let esiste=carrello.find(a=>a.nome===nome)
        if(esiste){
             if(esiste.quantita<10){
                esiste.quantita++
             }
        }
        else{
            carrello.push({nome,prezzo,img,quantita:1})
        }
        localStorage.setItem("carrello",JSON.stringify(carrello))
         alert(nome+"è stato aggiunto al carrello")
    })
})
