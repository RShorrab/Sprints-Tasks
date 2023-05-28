let firstInput = document.getElementById("firstInput")
let secondInput = document.getElementById("secondInput")
let result = document.getElementById("result")


function getResult(id)
{
    let process = document.getElementById(id).innerText;
    if(firstInput.value == '' || secondInput.value == '')
    {
        window.alert("Fill the inputs first!")
    }
    else
    {
        switch (process) 
        {
            case '+':
                result.innerHTML = ((parseInt(firstInput.value)) + (parseInt(secondInput.value)))
                break;
        
            case '-':
                result.innerHTML = ((parseInt(firstInput.value)) - (parseInt(secondInput.value)))
                break;

            case 'x':
                result.innerHTML = ((parseInt(firstInput.value)) * (parseInt(secondInput.value)))
                break;

            case '/':
                result.innerHTML = ((parseInt(firstInput.value)) / (parseInt(secondInput.value)))
                break;
        }
    }
}

