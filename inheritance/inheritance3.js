// наследование без создания лишних прототипов


(function(root){
    
    var F = function(){}; // вспомогательная функция    
    
    // Классическая функция наследования
    root.extend = function(Child, Parent) {
        F.prototype = Parent.prototype; // Создаем новый конструктор на основе прототипа
        Child.prototype = new F(); //
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
        return Child;
    };
    
	// Создание объекта, и инициализация цепочки базовых классов
    root.create = function(Constr /* ,[argChild], [argParent1], ... */) {
       
        F.prototype = Constr.prototype;
        var self = new F(); // создаем объект без вызова конструктора
        
        var i = 1, args = arguments;
          
		// рекурсивно вызываем конструкторы, начиная с самого дальнего прототипа
        var initBasedCls = function(fn)
        {
			var a = args[i++] || [];
			if(!(a instanceof Array))
			{
				a = [a];
			}

            if(fn.superclass)
            {
                initBasedCls(fn.superclass.constructor);
            }
            
            fn.apply(self, a);
        };
        
        initBasedCls(Constr);
        
        return self;
        
    }
        
        
})(window);


// Тестируем

var A = function(val){
    this.a = val;
    console.log('construct a', this);
};

var B = function(val){
    this.b = val;
    console.log('construct b', this);
};

extend(B, A);

var x = create(B, 'b', 'a');

console.log(x);

console.log(x instanceof B);
console.log(x instanceof A);


