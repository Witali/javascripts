

// Сравнение объектов
// без прототипов
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

// Сравнение объектов
// без прототипов
// возвращает только измененные и добавленные поля
// null - если член объекта удален
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


