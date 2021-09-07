const result = document.querySelector(".result");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operators")
const SPECIAL = ["+","-","*","/","%"];
let operatorOccured = false;
numButtons.forEach((numButton)=>{
    numButton.addEventListener("click",numButtonClicked);
})
operatorButtons.forEach((operatorButton)=>{
    operatorButton.addEventListener("click",operatorClicked);
})

function numButtonClicked(event){
    if(result.textContent === "0"){
        result.textContent = "";
    }
    result.textContent+= event.target.textContent.trim();
}

function operatorClicked(event){
    let value = result.textContent.trim(); 
    if(SPECIAL.includes(value.charAt(value.length-1))){
        result.textContent = result.textContent.substring(0,result.textContent.length-1) + event.target.textContent;
        operatorOccured = true;
    }else if(operatorOccured){
        equalClicked(event.target.textContent);
    }else{
        result.textContent+=event.target.textContent;
        operatorOccured = true;
    }
}

function equalClicked(val){
   let expression =  result.textContent;
   [a,op,b] = expression.split(/([^0-9])/);
    switch(op){
        case "+" : result.textContent = +a + +b; break;
        case "-" : result.textContent = +a - +b; break;
        case "*" : result.textContent = +a * +b; break;
        case "/" : result.textContent = +a / +b; break;
        case "%" : result.textContent = +a % +b; break;
    }
    result.textContent+= val ? val : "";
    operatorOccured = false;
}

function clearClicked(){
    console.log("clicked");
    result.textContent = "0";
}