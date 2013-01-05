/*
	��������� ������� node.js �� ���������� �������
*/




function loadModule(url, onLoad){
	// ��������� js-����
	$.ajax({
		url: url,
		success: function(data) {
			
			// ����������� ���������� ����� ������ ���� �������
			var f = new Function('module', data);

			var module = {exports:{}};

			f.call({}, module); // ��������� �� ����� �������� �������

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

