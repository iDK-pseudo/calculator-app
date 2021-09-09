const resultDocument = document.querySelector(".result");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operators")
const SPECIAL = ["+","-","x","/","%"];
const MAX_LENGTH = 17
var operatorOccured = false;
var decimalOccured = false;
numButtons.forEach((numButton)=>{
    numButton.addEventListener("click",numButtonClicked);
})
operatorButtons.forEach((operatorButton)=>{
    operatorButton.addEventListener("click",operatorClicked);
})
function numButtonClicked(event){
    if(resultDocument.textContent === "0"){
        setResultContent("");
    }
    if(resultDocument.textContent.length >= MAX_LENGTH){
        alert("Please reduce the input length.")
        return;
    }
    if(event.target.textContent.startsWith("fiber")){
        if(decimalOccured){
            return;
        }
        decimalOccured = true;
        setResultContent(".","append");
        return;
    }
    setResultContent(event.target.textContent.trim(),"append");
}

function operatorClicked(event){
    let operator = event.target.textContent.trim();
    let lastValue = resultDocument.textContent.charAt(resultDocument.textContent.length-1);
    if(operatorOccured){
        if(SPECIAL.includes(lastValue)){
            setResultContent(operator,"changeLastChar");
        }else {
            compute(operator);
        }
    }else{
        setResultContent(operator,"append");
        decimalOccured = false;
        operatorOccured = true;
    }
}

function performSquare(){
    let result = (+resultDocument.textContent)**2;
    if(!result){
        alert("Invalid Input for Square Operation");
    }else if(result.toString().length >= MAX_LENGTH){
        result = Number.parseFloat(result).toExponential(8);
    }
    setResultContent(result);
}

function compute(newOperator){
    let regex = /(.*)([+\-\/x%])(.*)/g;
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
        if(!Number.isFinite(result)){
            return;
        }
        if(result.toString().length >= MAX_LENGTH &&!Number.isInteger(result)){
            result = Number.parseFloat(result).toFixed(10);
        }
        setResultContent(result + (newOperator ? newOperator : ""));
        operatorOccured = Boolean(newOperator);
    }catch(error){
        reset();
        alert("Invalid Input.")
    }
}

function reset(){
    operatorOccured = false;
    decimalOccured = false;
    setResultContent("0");
}

function backspace (){
    setResultContent(null,"removeLastChar");
}

function setResultContent(val,action = null){
    if(action === "append"){
        resultDocument.textContent+=val;
    }else if(action === "changeLastChar"){
        resultDocument.textContent = resultDocument.textContent.slice(0,-1) + val;
    }else if(action === "removeLastChar"){
        if(resultDocument.textContent.length === 1){
            reset();
        }else{
            resultDocument.textContent = resultDocument.textContent.slice(0,-1);
        }
    }else{
        resultDocument.textContent = val;
    }
}