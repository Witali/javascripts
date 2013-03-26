// Поиск совершенных чисел, равных сумме всех своих делителей

function getDiv(num){
    var dividers = [1];
    for(var i=2, n = ~~(num/2); i<=n; ++i)
    {
        if(!(num%i))
        {
           dividers.push(i); 
        }
    }
    return dividers;
}

function isIdeal(num){
    return num === getDiv(num).reduce(function(a, b){ return a+b; });
}

n = 3;

while(!isIdeal(n))
{
    n += 2;
}

console.log(n);