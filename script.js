
function checkEquation(letters, numbers, operators)
{
    let check = {solvable: true, error: 'None'}
    if (letters !== null) {
        check.solvable = false;
        check.error = 'Contains letters';
    }
    if (numbers.length - 1 !== operators.length) {
        check.solvable = false;
        check.error = 'Operations and numbers are mismatched';
    }
    return check;
}

const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const div = (a,b) => a/b;
const mul = (a,b) => a*b;
const pow = (a, b) => a**b;

function parseOperations(oper)
{
    if (oper === '+')
        return {func: add, priority: 2};
    if (oper === '-')
        return {func: add, priority: 2};
    if (oper === '/')
        return {func: div, priority: 1};
    if (oper === '^')
        return {func: pow, priority: 0};
    return {func: mul, priority: 1};
}

function solveEquation(numbers, operators)
{
    const operations_priority = 2;
    let nums = numbers.map(parseFloat);
    let operations = operators.map(parseOperations);
    for (let i = 0; i <= operations_priority; i++)
    {
        for (let j = 0; j < operations.length; j++)
        {
            if (operations[j].priority === i)
            {
                let num = nums[j+1];
                nums.splice(j+1, 1);
                let operation = operations[j].func;
                operations.splice(j, 1)
                nums[j] = operation(nums[j], num)
                j--;
            }
        }
    }
    return nums[0]
}

function parseEquation(equation)
{
    const letters_reg = /[a-zA-Z]+/g;
    const numbers_reg = /(?<![A-Za-z.,])(\-?\d+(\.?\d*))(?![A-Za-z.,])/g;
    const operators_reg = /(?<=\d+\s*)([+\-*\/^])(?=\s*\d)/g
    const parentheses_reg = /\(\d+.*?\)/g

    let parsed = {};
    parsed.parsed = true;
    let parentheses = [...equation.matchAll(parentheses_reg)].reverse()
    for (let match of parentheses)
    {
        console.log(match)
        let rez = solve(match[0].substring(1, match[0].length-1))
        if (rez.answer === null)
        {
            parsed.parsed = false;
            return parsed;
        }
        equation = equation.substring(0, match.index) + rez.answer + equation.substring(match.index+match[0].length)
    }

    parsed.letters = equation.match(letters_reg)
    parsed.numbers = equation.match(numbers_reg)
    parsed.operators = equation.match(operators_reg)
    if (parsed.operators === null)
        parsed.operators = [];
    if (parsed.numbers === null)
        parsed.numbers = [];

    return parsed;
}


function solve(str)
{
    let result = {};
    let parsedEquation = parseEquation(str)

    if (!parsedEquation.parsed)
    {
        console.log("Didn't parse")
        return;
    }

    let checkResult = checkEquation(parsedEquation.letters, parsedEquation.numbers, parsedEquation.operators)

    result.check = checkResult;
    result.answer = null;
    if (checkResult.solvable) {
        let answer = solveEquation(parsedEquation.numbers, parsedEquation.operators);
        result.answer = answer;
    }
    return result;
}

function equals(){
    let value = $("#display").val();
    let result = solve(value);
    if(result.check.solvable){
        $("#display").val(result.answer)

        let hist = JSON.parse(sessionStorage.history);
        hist.push(value + " = " + result.answer); // it will go like ['first one', 'second one', ...]
        sessionStorage.history = JSON.stringify(hist);
    }
    else{
        alert(result.check.error)
    }

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