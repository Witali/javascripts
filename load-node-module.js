/*
	Подгрузка модулей node.js на клиентской стороне
*/




function loadModule(url, onLoad){
	// загружаем js-файл
	$.ajax({
		url: url,
		success: function(data) {
			
			// подставляем полученный текст вместо тела функции
			var f = new Function('module', data);

			var module = {exports:{}};

			f.call({}, module); // Запускаем от имени обычного объекта

			onLoad(module);		
		}
	});
}

var modules = {};

if(!('Haml' in modules))
{
	loadModule('/lib/haml/haml.js', function(module){
		modules.Haml = module.exports;
	});
}

