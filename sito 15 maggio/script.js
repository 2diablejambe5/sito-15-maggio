function filtraMarchio(){
    let ricerca=document.querySelector(".FiltroMarchio").value.toLowerCase()
    let prodotti=document.querySelectorAll(".prodotto")
    if(ricerca!=="all"){
    for(let i=0;i<prodotti.length;i++){
        let brand=prodotti[i].getAttribute("data-brand").toLowerCase()
        if(brand.includes(ricerca)){
            prodotti[i].style.display=""
        }
        else{
             prodotti[i].style.display="none"
        }
    }
    }
    else{
       for(let i=0;i<prodotti.length;i++){
       
      
            prodotti[i].style.display=""
        
        
    } 
    }
}

function cercaProdotti(){
    
    let ricerca =
    document.getElementById("ricerca").value.toLowerCase();
    let prodotti=document.querySelectorAll(".prodotto")
    for(let i=0;i<prodotti.length;i++){
        let nome=prodotti[i].querySelector("h3").innerText.toLowerCase()
        let desc=prodotti[i].querySelector("p").innerText.toLowerCase()
        if(nome.includes(ricerca)||desc.includes(ricerca)){
            prodotti[i].style.display=""
        }
        else{
            prodotti[i].style.display="none"
        }
    }
}

