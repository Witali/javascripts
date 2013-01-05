// преобразование из camelCase в dashed-case и обратно


function dasherize(str){
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function undasherize(str){
    return str.split('-').map(function(str, i){
		return i > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;
	}).join('');
}