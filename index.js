const resultDocument = document.querySelector(".result");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operators")
const SPECIAL = ["+","-","x","/","%"];
var operatorOccured = false;
numButtons.forEach((numButton)=>{
    numButton.addEventListener("click",numButtonClicked);
})
operatorButtons.forEach((operatorButton)=>{
    operatorButton.addEventListener("click",operatorClicked);
})
function numButtonClicked(event){
    if(resultDocument.textContent === "0"){
        resultDocument.textContent = "";
    }
    if(resultDocument.textContent.length === 17){
        window.alert("Please reduce the input length.")
        return;
    }
    if(event.target.textContent.startsWith("fiber")){
        resultDocument.textContent+=".";
        return;
    }
    resultDocument.textContent+= event.target.textContent.trim();
}

function operatorClicked(event){
    let operator = event.target.textContent.trim();
    let lastValue = resultDocument.textContent.charAt(resultDocument.textContent.length-2);
    if(operatorOccured){
        if(SPECIAL.includes(lastValue)){
            resultDocument.textContent = `${resultDocument.textContent.substring(0,resultDocument.textContent.length-3)}  ${operator} `;
        }else {
            compute(operator);
        }
    }else{
        resultDocument.textContent+=` ${operator} `;
        operatorOccured = true;
    }
}

function performSquare(){
    if((+resultDocument.textContent)**2){
        resultDocument.textContent = (+resultDocument.textContent)**2
    }else{
        alert("Invalid Input for Square Operation");
    }
}

function compute(newOperator){
    let regex = /\s*([-\d.]+)\s+(\S+)\s+([-\d.]+)/g;
    try {
        [a,op,b] = regex.exec(resultDocument.textContent).slice(1,4);
        let result = 0;
        switch(op){
            case "+" : result = +a + +b; break;
            case "-" : result = +a - +b; break;
            case "x" : result = +a * +b; break;
            case "/" : result = +a / +b; break;
            case "%" : result = +a % +b; break;
        }
        resultDocument.textContent = result + (newOperator ? newOperator : "");
        operatorOccured = Boolean(newOperator);
    }catch(error){
        alert("Invalid Input.")
    }
}

function clearClicked(){
    operatorOccured = false;
    resultDocument.textContent = "0";
}

function backspace (){
    resultDocument.textContent = resultDocument.textContent.substring(0,resultDocument.textContent.length-1);
    if(resultDocument.textContent.length === 0){
        resultDocument.textContent = "0";
    }
}