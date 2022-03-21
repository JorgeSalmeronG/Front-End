
var info;
var pagina = 0;
var pokeNum = 0;

const chgPoke = () =>{
    
    let pokeName = document.getElementById("pokeName")

    if(pokeName.value != ""){

        const url = `https://pokeapi.co/api/v2/pokemon/${pokeName.value.toLowerCase()}`
        pagina = 1;
        fetchURL(url);
        pokeName.value = "";
    }
    else{
        console.log("Escriba pokemon a buscar")
    }
   
 
}

const fetchURL = (url) => {

        fetch(url).then((res) => {
        // console.log(res)

        if (res.status != "200"){
            // console.log(res.status)
           return res.status;
        }
        else{
            return res.json();
        }

    }).then((data) => {
        // console.log(data)
        console.log(typeof data)

        if ( typeof data != 'number'){
            info = data;
            // console.log(data)
            showInfo(data);
            return data;
        }
        else{
            // console.log(data);
            console.log("ERROR: ", data);
            clear();
            clearTypes("type");
            clearTypes("abil");
            clearMoves();
            clearTxt("name");
            clearTxt("tMoves");
            clearTxt("bexp");
            clearTxt("height");
            clearTxt("weight");
            let img = document.getElementById("pokeImage");
            img.src = ("./noImg2.jpg")

            return data;
            
        }
    }
    )
    
}



const getInfo = (info, numero) => {

  let tagtd = document.getElementsByTagName("td")

    if (numero != 0){

        size = info.moves.length
        // console.log(size);

        min = (numero * 10) - 10;
        max = numero * 10;

        // console.log(min, max)
        let j=0;
        for (let i=min; i< max && i < size; i++)
        {
          //  console.log(info.moves[i].move.name);
            tagtd[j].innerText = info.moves[i].move.name;
            j++;
        }
    }
    else
    console.log("1ro elija pokemon")
        
}

const previo = (info, numero) => {
    

    if(numero !=0){

        let rondas = info.moves.length / 10;
        rondas = Math.ceil(rondas)

        if ( numero > 1 ){
            clearMoves();
            pagina = numero - 1;
            getInfo(info,pagina);
        }

    }
    else{
        console.log("primero elija pokemon")
    }
   
}

const siguiente = (info, numero) => {

    if( numero != 0 ){

        let rondas = info.moves.length / 10;
        rondas = Math.ceil(rondas)

        if (numero < rondas){
            clearMoves();
            pagina = numero + 1;
            getInfo(info, pagina);

        }

    }
    else{
        console.log("primero elija pokemon")
    }
    
}

const getTypes = (data)=>{
    
    let size = data.types.length;
    for (let i=0;i<size;i++){
        let element = document.createElement('span');
        element.textContent = data.types[i].type.name + " ";
        document.getElementById("type").appendChild(element);
    }

}

const getAbili = (data)=>{
    
    let size = data.abilities.length;
    for (let i=0;i<size;i++){
        let element = document.createElement('span');
        element.textContent = data.abilities[i].ability.name + " ";
        document.getElementById("abil").appendChild(element);
    }

}


const clearTypes = (id) => {

    let list = document.getElementById(id)
 
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
}

 const showInfo = (data) => {
        clear();
        clearTypes("type");
        clearTypes("abil");

        let imageURL = data.sprites.front_default;
        let img = document.getElementById("pokeImage");;
        img.src = imageURL;

        let pName = document.getElementById("name");
        pName.innerText= "# " + data.order +" - " + data.name.toUpperCase();

        getTypes(data);
        getAbili(data);


        let tMoves = document.getElementById("tMoves");
        tMoves.innerHTML = " " + data.moves.length;

        let pBexp = document.getElementById("bexp")
        pBexp.innerText = "EXPERIENCE: " + data.base_experience;

        let pPeso = document.getElementById("height")
        pPeso.innerText = "HEIGHT: " + data.height + " KG";

        let pAltura = document.getElementById("weight")
        pAltura.innerText = "WEIGHT: " + data.weight + " M";

        getElem(data);
        getInfo(data,1);

 }


 const getElem = (data) => {
    let tagli = document.getElementsByTagName("li");
     let stats = ["hp", "attack", "defense", "sp_attack", "sp_defense", "speed"];
     

     for(let i=0;i<6;i++){
        let tagX = document.getElementById(stats[i]);
        tagX.innerText = data.stats[i].base_stat;
        let max=Math.round(data.stats[i].base_stat/10);      
        let init= (10 + i) + (10*i);

       for (let j=0;j < max && (init - j > 0);j++){
            tagli[init - j].style.backgroundColor = '#03fa18';
        }
     }
 }



 const clear = () => {
    let tagli = document.getElementsByTagName("li"); 
    let size = tagli.length;

    for (let j=0;j < size;j++){
        tagli[j].style.backgroundColor = '#ffffff';
    }
 }

 const clearTxt = (id) =>{
    let text = document.getElementById(id)
    text.innerText = ""
 }

 const clearMoves = () => {
    let tagtd = document.getElementsByTagName("td"); 
    let size = tagtd.length;
    
    for (let j=0;j < size;j++){
        tagtd[j].innerText = ""
    }    
}
 
 
const back = (numero) => {

        if ( numero > 1 ){
            pokeNum = numero - 1;
            let url = `https://pokeapi.co/api/v2/pokemon/${pokeNum}`
            fetchURL(url);
            pagina=1;
        }


   
}

const next = (numero) => {
    

        if (numero < 300){

            pokeNum = numero + 1;
            console.log(pokeNum)
            let url = `https://pokeapi.co/api/v2/pokemon/${pokeNum}`
            fetchURL(url);
            pagina=1;
        }

}