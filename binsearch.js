// бинарный поиск

function randArray(len)
{
    var arr = new Array(len);
    for(var i=0; i<len; ++i)
    {
        arr[i] = Math.floor(Math.random() * len);
    }
    return arr;
}   
    
function binsearch(arr, val)
{
    for(var i=0, j=arr.length-1, m, v; i<=j; )
    {
        m = (j+i)>>1; // целочисленное деление на 2
        v = arr[m];
        if(val > v)
        {
            i = m+1;
        }
        else if(val < v)
        {
            j = m-1;
        }
        else
        {
            return true;
        }
    }
    return false;
}


console.profile();
var arr = randArray(100000);
console.profileEnd();

console.profile();
arr = arr.sort(function(a, b){return a-b;});
console.profileEnd();

console.profile();
var result = binsearch(arr, 23413);
console.profileEnd();

alert(result);