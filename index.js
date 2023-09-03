const inputEl= document.getElementById("input");
const infoTextEl= document.getElementById("info-text");
const meaningContainerEl= document.getElementById("meaning-container");
const titleEl= document.getElementById("title");
const meaningEl= document.getElementById("meaning");
const audioEl= document.getElementById("audio");

async function fetchAPI(word){

    try {
        infoTextEl.style.display= "block";
        meaningContainerEl.style.display="none";
        infoTextEl.innerText= `Searching the meaning of: "${word}"`;
        const apiURL= `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result= await fetch(apiURL).then((res)=> res.json());
        console.log(result);
        
        if(result.title){
            meaningContainerEl.style.display="block";
            titleEl.innerText= word;
            meaningEl.innerText= "N/A";
            audioEl.style.display= "none";
            infoTextEl.style.display= "none";
        } else{

            titleEl.innerText= result[0].word;
            meaningEl.innerText= result[0].meanings[0].definitions[0].definition;
            audioEl.style.display="inline-flex";
            audioEl.src = result[0].phonetics[0].audio;
            infoTextEl.style.display= "none";
            meaningContainerEl.style.display="block";
        }
       
    } catch (error) {
        console.log(error);
        infoTextEl.innerText= `An error occured, check your internet connection`;
    }

}

inputEl.addEventListener("keyup", (e)=>{
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
})