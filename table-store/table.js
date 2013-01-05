/*
	Чтобы уменьшить потребление памяти и снизить трафик, лучше использовать 
	массивы вместо объектов, не так наглядно, но экономим на ключах.
*/




function Table(){
	this.init.apply(this, arguments)
}

Table.prototype = {
	/* 
	names: [], 
	indices: {},
	data: [],
	*/
	length: 0,
	defaultValue: '',
	constructor: Table,
	
	init: function(){
		var args = arguments, data, names;
		switch(args.length)
		{
			case 2:
				names = args[0];
				data = args[1];
				break;
			
			case 1:
				names = args[0][0] || [];
				data = args[0].slice(1);
				break;
		}

		this.updateNames(names);
		
		this.updateData(data);
	},
	
	updateNames: function(names){
		names = names || [];

		var indices = {};
		for(var i = 0, n =+ names.length; i < n; ++i)
		{
			indices['' + (names[i] || i)] = i;
		}
		this.indices = indices;
		this.createMethods();
	},
	
	updateData: function(data){
		data = data || [];
		this.names = names;
		this.data = data;
		this.length = this.data.length;
	
	},	
	

	// Получаем индекс строки из имени
	// если такого имени нет, то считаем имя индексом
	getFieldIndex: function(name){
		return this.indices.hasOwnProperty(name) ? this.indices[name] : name;
	},

	getFieldName: function(idx){
		return this.names[idx];
	},

	// Получаем значение поля по номеру строки и имени
	get: function(row, name){
		var idx = this.getFieldIndex(name);
		return this.data[row][idx];
	},

	set: function(row, name, value){
		var idx = this.getFieldIndex(name);
		this.data[row][idx] = value;
	},
	
	// получаем запись с полем, равным значению val
	findIndicesBy: (function(){ // создаем замыкание для хранения кэша
		
		var cache = {
			// name: { val1: [idx1], val2:[idx2], ...}
			},
			me = this;
		
		return function(name, val){
			val = val.toString();
			
			if(!cache.hasOwnProterty(name))
			{
				var section = {};
				
				for(var i=0, n = me.data.length; i < n; ++i)
				{
					if(section.hasOwnProterty(val))
					{
						section[name][val].push(i);
					}
					else
					{
						section[name] = {};
						section[name][val] = [i];
					}
				}
			}
			
			return cache[name][val];
		}
	})(),
	
	// Получаем строку таблицы в виде массива по индексу
	getRowArray: function(rowIndex){
		return this.data[rowIndex];
	},

	// Получаем строку таблицы в виде объекта по индексу
	getRowObject: function(rowIndex){
		var obj = {};
		for(var names=this.names, name, data = this.data[rowIndex], i = 0, n = names.length; i < n; ++i)
		{
			name = this.getFieldName(i);
			obj[name] = data[i];
		}
		
		return obj;
	},
	
	setRowArray: function(rowIndex, data){
		this.data[rowIndex] = data;
	},

	setRowObject: function(rowIndex, obj){
		for(var names=this.names, name, data=this.data[rowIndex], i=0, n=names.length; i<n; ++i)
		{
			name = this.getFieldName(i);
			data[i] = obj.hasOwnProperty(name) ? obj[name] : this.defaultValue;
		}
	},
	
	setRow: function(rowIndex, data){
		var fn = data instanceof Array ? this.setRowArray : this.setRowObject;
		fn.call(this, rowIndex, data);
	},

	addField: function(name, value){
	
	},
	
	addRow: function(data){
		
	},
	
	delField: function(name){
	
	},
	
	delRow: function(row){
	
	},
	
	// создаем функции для доступа к данным
	createMethods: function(){
		
		for(var names=this.names, name, nameUpper, i=0, n = names.length; i<n; ++i)
		{
			name = names[i];
			nameUpper = name.slice(0, 1).toUpperCase() + name.slice(1);
			(function(name){
				
				this['get' + nameUpper + 'Field'] = function(row){
					return this.get(row, name);
				};

				this['set' + nameUpper + 'Field'] = function(row, value){
					return this.set(row, name, value);
				};
			
			}).call(this, name);
		}
	}
};



