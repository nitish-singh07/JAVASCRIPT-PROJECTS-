const apiKey = ccf5450f1b3f4d04a58a0e1c417296e2;
const api =  `https://api.spoonacular.com/recipes/search?query=${searchQuery}&apiKey=${apiKey}`;
const fact = document.querySelector("#fact");
const first = document.querySelector("#first");
const second = document.querySelector("#second");


const GetFact = async () => {
    
    let data = await fetch(api);
    
    let reponse = await data.json();
    console.log(data[0]);
    first.innerText = "1. "+reponse[0].text;
    second.innerHTML = "2. "+reponse[1].text;

}

fact.addEventListener("click",GetFact);