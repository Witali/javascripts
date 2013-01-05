var DEBUG = 0;



var Money = function(str, options){
	this.value = str ? ('' + str).replace(this.options.divisor, '.') : '0';
	if(options){
		this.options = $.extend({}, this.options, options);
	}
};

Money.prototype = {
	options: {
		currency: {
			major: {
				'short': '���.',
				'1': '�����',
				'2': '�����',
				'5': '������'
			},
			minor: {
				'short': '���.',
				'1': '�������',
				'2': '�������',
				'5': '������'
			}
		},
		divisor: ',',
		showZeroMinor: false, // ���������� ������� ���� 0 
		showZeroMajor: true, // ���������� ����� ���� 0 
		minorLength: 2 // ���������� ������ ��� ������
	},
	toString: function(type){

		var x = parseFloat(this.value);
		if(isNaN(x)) return '';

		var opt = this.options;
		var cur = opt.currency;

		var notZero = function(str)
		{
			return str && Number(str, 10) != 0;
		};

		var getUnut = function(obj, type, value)
		{
			if(type == 'short')
			{
				return obj['short'];
			}
			else
			{
				return value.getNoun(obj['1'], obj['2'], obj['5']);
			}
		};

		var parts = x.toFixed(opt.minorLength);
		if(type)
		{
			parts = parts.split('.');
			parts[0] = notZero(parts[0]) ? parts[0] + '\u00a0' + getUnut(cur.major, type, parts[0]) :
				opt.showZeroMajor ? '0\u00a0' + getUnut(cur.major, type, parts[0])  : '' ;
			parts[1] = notZero(parts[1]) ? Number(parts[1], 10) + '\u00a0' + getUnut(cur.minor, type, parts[1]) :
				opt.showZeroMinor ? '0\u00a0' + getUnut(cur.minor, type, parts[1])  : '' ;
			return parts.join('\u00a0');
		}
		else
		{
			return parts.replace('.', opt.divisor);
		}
	}
};


// ���� ipPort.Money
(function(){
	var money = new ipPort.Money('12,0', {
		currency: {
			major: {
				'short': '���.',
				'1': '������',
				'2': '�������',
				'5': '��������'
			},
			minor: {
				'short': '���.',
				'1': '����',
				'2': '�����',
				'5': '������'
			}
		}
	});
	console.log(money.toString());
	console.log(money.toString('short'));
	console.log(money.toString('full'));

	money = new ipPort.Money('0,12');
	console.log(money.toString());
	console.log(money.toString('short'));
	console.log(money.toString('full'));

	money = new ipPort.Money('0,1');
	console.log(money.toString());
	console.log(money.toString('short'));
	console.log(money.toString('full'));

	money = new ipPort.Money('5,5');
	console.log(money.toString());
	console.log(money.toString('short'));
	console.log(money.toString('full'));


	money = new ipPort.Money('0,0');
	console.log(money.toString());
	console.log(money.toString('short'));
	console.log(money.toString('full'));

	money = new ipPort.Money('.0');
	console.log(money.toString());
	console.log(money.toString('short'));
	console.log(money.toString('full'));


})();



