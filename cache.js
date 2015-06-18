
var cacheMaxSize = 10;
var cacheSize = 0;
var cache = [];
var cacheIdx = {};

function getTime() {
    return (new Date()).getTime();
}

function getValue(name) {
    if(!(name in cacheIdx))
    {
        return null;
    }
    
    var data = cache[cacheIdx[name]];
    data.reads++;
    return data.value;
}

function setValue(name, value) {
    var data;
    if(name in cacheIdx) {
        data = cache[cacheIdx[name]];
        
        if(data.value !== value) {
            data.value = value;
            data.lastAccessTime = getTime();
        }
        return;
    }

    if(cacheSize < cacheMaxSize) {
        cache.push({
            name: name,
            value: value,
            lastAccessTime: getTime(),
            reads: 0
        });
        
        cacheIdx[name] = cacheSize;
        cacheSize++;
    } else {
        var index = findOlder();
        var oldName = cache[index].name;
        delete cacheIdx[oldName];
        cache[index] = {
            name: name,
            value: value,
            lastAccessTime: getTime(),
            reads: 0
        };
        
        cacheIdx[name] = index;
    }

    

}

function findOlder() {
    var maxCriteria = 0,
        index = 0,
        currentTime = getTime();
    for(var i=0; i<cacheSize; i++ )
    {
        var c = (currentTime - cache[i].lastAccessTime) >> cache[i].reads;
        if(c > maxCriteria) {
            maxCriteria = c;
            index = i;
        }
    }
    return index;
}


setValue('karramba', 123);


var i = 0;
var n = 20
function addNewValue(callback) {
    setValue('karramba' + i, i);   
    i++;
    if(i<n) {
        setTimeout(function() {
            addNewValue(callback);
           
        }, 10);
    } else {

        if(callback) callback();
    }
} 


addNewValue(function() {
    for(i=0; i<10; i++)
    {
        getValue('karramba13');
    }       
    
    console.log(cache);
    
    i=30;
    n=50;
    addNewValue(function() {
        console.log(cache);
    });
    
});






