function equals(){
    let value = $("#display").val();
    let result;
    try {
        result = math.evaluate(value);
    } catch (e)
    {
        alert('Incorrect input');
        return;
    }
    $("#display").val(result)
    let hist = JSON.parse(sessionStorage.history);
        hist.push(value + " = " + result); // it will go like ['first one', 'second one', ...]
        sessionStorage.history = JSON.stringify(hist);
}

function backSpace(){
    let len = $("#display").val().length-1
    $("#display").val($("#display").val().substring(0,len))
}

function clean(){
    $("#display").val('')
}

function displayHistory() {

    document.getElementById('history').style.display = "block";

    let value = "";
    let arr = JSON.parse(sessionStorage.history);
    for(const str of arr) {
        value = '<p>' + str + "</p>" + value;
    }

    document.getElementById('history-text').innerHTML = value;
}

function hideHistory()
{
    document.getElementById('history').style.display = "none";
}