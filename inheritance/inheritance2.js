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
    root.create = function(Constr, args) {
       
        F.prototype = Constr.prototype;
        var self = new F(); // создаем объект без вызова конструктора
       
        if(!(args instanceof Array))
        {
            args = [args];
        }
          
		// рекурсивно вызываем конструкторы, начиная с самого дальнего прототипа
        var initBasedCls = function(fn)
        {
            if(fn.superclass)
            {
                initBasedCls(fn.superclass.constructor);
            }
            
            fn.apply(self, args);
        } ;
        
        initBasedCls(Constr);
        
        return self;
        
    }
        
        
})(window);


// Тестируем

var A = function(){
    this.a = 'a';
    console.log('construct a')
};

var B = function(val){
    this.b = val;
    console.log('construct b')
};

extend(B, A);

var x = create(B, '123');

console.log(x);

console.log(x instanceof B);
console.log(x instanceof A);


