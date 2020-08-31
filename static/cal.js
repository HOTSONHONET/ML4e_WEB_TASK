let screen = document.getElementById('screen');
let screenValue = '';

rad_to_deg = Math.PI/180;
function factorial(n){
    if (n==0){
        return 1;
    }
    else{
        return n*factorial(n-1);
    }
}

buttons = document.querySelectorAll('button');
for (item of buttons){
    console.log("item is : ", item);
    item.addEventListener('click', (e)=>{
        buttonText = e.target.innerText;
        console.log("Button text is: ", buttonText);

        if (buttonText == "AC"){
            screenValue =  '';
            screen.value = screenValue;
        }
        
        else if (buttonText == "DEL"){
            temp_screenValue = screenValue;
            screenValue =  temp_screenValue.substr(0, temp_screenValue.length-1);
            screen.value = screenValue;
        }

        else if (buttonText == "X"){
            buttonText = '*';
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == "%"){
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == "-"){
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == "+"){
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == "/"){
            screenValue += buttonText;
            screen.value = screenValue;
        }     
                
        else if (buttonText == "sin"){
            try{
                screenValue = Math.sin(rad_to_deg*eval(screenValue));
                screen.value = screenValue;
            }
            catch(err){
                alert("Not a Suitable Value");
            }
        }
        else if (buttonText == "cos"){
            try{
                screenValue = Math.cos(rad_to_deg*eval(screenValue));
                screen.value = screenValue;
            }
            catch(err){
                alert("Not a Suitable Value");
            }
        }
        else if (buttonText == "tan"){
            try{
                screenValue = Math.tan(rad_to_deg*eval(screenValue));
                screen.value = screenValue;
            }
            catch(err){
                alert("Not a Suitable Value");
            }
        }

        else if (buttonText == "N!"){
            try{
                var float_value = eval(screenValue);
                var int_value = parseInt(float_value);
                if ((float_value == int_value) && (Math.abs(eval(screenValue)) == eval(screenValue))){
                    screenValue = factorial(int_value);
                    screen.value = screenValue;
                }
                else{
                    alert("Give me good value bruh !");
                }
                console.log("factorial: ", screenValue)
                
            }
            catch(err){
                alert("ERROR, PLEASE CHECK THE INPUT VALUES OR IT MAY HAVE EXCEDDED MY LIMIT");
            }
        }
        else if (buttonText == "Log"){
            try{
                screenValue = Math.log10(eval(screenValue));
                screen.value = screenValue;
            }
            catch(err){
                alert("ERROR, PLEASE CHECK THE INPUT VALUES");
            }
            
        }
        else if (buttonText == "Ln"){
            try{
            screenValue =  Math.log(eval(screenValue));
            screen.value = screenValue;
            }
            catch(err){
                alert("ERROR, PLEASE CHECK THE INPUT VALUES");
            }
        }
        else if (buttonText == "pow"){
            try{
                base = eval(screenValue);
                power = prompt("Give the value of the exponent");
                screenValue = Math.pow(base, power);
                screen.value = screenValue;
            }
            catch(err){
                alert("ERROR, PLEASE CHECK THE INPUT VALUES");
            }
        }
        else if (buttonText == "="){
            try{
            screenValue = eval(screenValue);
            screen.value = screenValue;
            }
            catch(err){
                alert("ERROR, PLEASE CHECK THE INPUT VALUES");
            }
        }
       
        else{
            if (screenValue.length<=20){
                screenValue += buttonText;
                screen.value = screenValue;
            }
            
        }
    })
}
