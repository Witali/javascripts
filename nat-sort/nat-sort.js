/*  Натуральная сортировка
	
	при обычной сортировке
		abc1
		abc100
		abc5
		
	при натуральной
		abc1
		abc5
		abc100
*/

// разбивает строку на группы букв и цифр, например 'abc100' -> ['abc', 100]
function preapareString(str){

	var patt1=/(\d+)|(\D+)/gi;

	var prepared = [];
	while(1)
	{
		var match = patt1.exec(str);
		if(!match) break;
		if(typeof match[1] !== 'undefined')
		{
			prepared.push(+match[1]); // сохраняем как число
		}
		else
		{
			prepared.push(match[2]);
		}

	}
	return prepared;
}


// сравнивает два массива 
function compareArrays(arr1, arr2){
	var n1 = arr1.length,
		n2 = arr2.length,
		n = Math.min(n1, n2),
		a, b, ta, tb;
		
	for (var i=0; i < n; ++i)
	{
		a = arr1[i];
		ta = typeof a;
		b = arr2[i];
		tb = typeof b;
		if(a === b)
		{
			continue;
		}
		
		if(ta === tb && ta === 'number')
		{
			return a-b;
		}
		else
		{
			a = '' + a;
			b = '' + b;
			
			if(a > b)
			{
				return 1;
			}
			else if(a < b)
			{
				return -1;
			}
		}
	}
	
	// если массивы совпадают сравниваем длину
	return n1 > n2;
}

// функция сравнения
function compareNat(str1, str2){
	return compareArrays(preapareString(str1), preapareString(str2));
}


