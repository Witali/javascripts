// ��������� ��������
// ��� ����������
function diffObjects(obj1, obj2)
{
	if(typeof obj2 != 'object' || typeof obj1 != 'object' )
	{
		return obj1!==obj2 && {
			value:obj2
		};
	}
	
	var ret = {}, add, del, mod;
	var d, name;


	for(name in obj1)
	{
		if(!obj1.hasOwnProperty(name)) continue;
		if(name in obj2)
		{
			if(!obj2.hasOwnProperty(name)) continue;
			d = arguments.callee(obj1[name], obj2[name]);
			if(d)
			{
				mod = mod || {};
				mod[name] = d;
			}
		}
		else
		{
			d = true;
			del = del || {};
			del[name] = true;

		}
	}

	for(name in obj2)
	{
		if(!obj2.hasOwnProperty(name)) continue;

		if(!(name in obj1))
		{
			d = true;
			add = add || {};
			add[name] = obj2[name];
		}
	}

	if(add) ret.add = add;
	if(del) ret.del = del;
	if(mod) ret.mod = mod;

	return d ? ret : false;
	
}

// ��������� ��������
// ��� ����������
// ���������� ������ ���������� � ����������� ����
// null - ���� ���� ������� ������
function diffObjects2(obj1, obj2)
{
	if(typeof obj2 != 'object' || typeof obj1 != 'object' )
	{
		return obj1!==obj2 && obj2;
	}

	var ret = {};
	var d, name;

	for(name in obj1)
	{
		if(!obj1.hasOwnProperty(name)) continue;
		if(name in obj2)
		{
			if(!obj2.hasOwnProperty(name)) continue;
			d = arguments.callee(obj1[name], obj2[name]);
			if(d)
			{
				ret[name] = d;
			}
		}
		else
		{
			ret[name] = null;
		}
	}

	for(name in obj2)
	{
		if(!obj2.hasOwnProperty(name)) continue;

		if(!(name in obj1))
		{
			ret[name] = obj2[name];
		}
	}


	return ret;

}

/* ��������� ����� ��������� �������
 *
 * �������������
 * var callback = function(){...};
 *
 * $.ajax({
 *	success: callback.addHandler(handler)
 *
 * });
 * $.ajax({
 *	success: callback.addHandler()
 *
 * });
 *
 **/
Function.prototype.addHandler = function(handler)
{
	this.signals = this.signals || [];
	
	var callback = this;

	var sender;
	(function(index){
		sender = function(){
			if(handler)
			{
				handler.apply(this, arguments); // �������� ���������� �������� �������
			}

			callback.signals[index] = true;

			for(var i = 0, n = callback.signals.length; i<n; ++i )
			{
				if(!callback.signals[i]) return this;
			}

			callback.signals = null;
			return callback.apply(this, arguments);
		};
	})(this.signals.length);
	
	this.signals.push(false);
	return sender;
};

// ������� ������� �������� &shy;
String.prototype.splitLongWords = function()
{
	var text = this;
	var RusA = "[��������������������������������a-z]";
	var RusV = "[���������eyuioaj]";
	var RusN = "[��������������������qwrtpsdfghklzxcvbnm]";
	var RusX = "[���]";
	var Hyphen = "\xAD";

	var re1 = new RegExp("("+RusX+")("+RusA+RusA+")","ig");
	var re2 = new RegExp("("+RusV+")("+RusV+RusA+")","ig");
	var re3 = new RegExp("("+RusV+RusN+")("+RusN+RusV+")","ig");
	var re4 = new RegExp("("+RusN+RusV+")("+RusN+RusV+")","ig");
	var re5 = new RegExp("("+RusV+RusN+")("+RusN+RusN+RusV+")","ig");
	var re6 = new RegExp("("+RusV+RusN+RusN+")("+RusN+RusN+RusV+")","ig");

	text = text.replace(re1, "$1"+Hyphen+"$2");
	text = text.replace(re2, "$1"+Hyphen+"$2");
	text = text.replace(re3, "$1"+Hyphen+"$2");
	text = text.replace(re4, "$1"+Hyphen+"$2");
	text = text.replace(re5, "$1"+Hyphen+"$2");
	text = text.replace(re6, "$1"+Hyphen+"$2");
	
	return text;
};



// ����������� ������������ 1 �����, 2 �����, 5 ������
Number.prototype.getNoun = function(one, two, five) {
	var number = Math.abs(this);
	number %= 100;
	if (number >= 5 && number <= 20) {
		return five;
	}
	number %= 10;
	if (number == 1) {
		return one;
	}
	if (number >= 2 && number <= 4) {
		return two;
	}
	return five;
};

String.prototype.getNoun = function(radix)
{
	Number(this, radix || 10).getNoun(arguments);
};

// ��������� ���������� �� ������ �������
function getArgs( ) {
	var args = new Object();
	var query = location.search.substring(1); // �������� ������ �������
	var pairs = query.split("&"); // ������� �� �����������
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('='); // �������� ���� "name=value"
		if (pos == -1) continue; // �� ������� - ����������
		var argname = pairs[i].substring(0,pos); // ������� ���
		var value = pairs[i].substring(pos+1); // ������� ��������
		value = decodeURIComponent(value); // �������������, ���� �����
		args[argname] = value; // ��������� � ���� ��������
	}
	return args; // ������� ������
}


