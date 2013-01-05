// ������������ ��� �������� ������ ����������


(function(root){
    
    var F = function(){}; // ��������������� �������    
    
    // ������������ ������� ������������
    root.extend = function(Child, Parent) {
        F.prototype = Parent.prototype; // ������� ����� ����������� �� ������ ���������
        Child.prototype = new F(); //
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
        return Child;
    };
    
	// �������� �������, � ������������� ������� ������� �������
    root.create = function(Constr /* ,[argChild], [argParent1], ... */) {
       
        F.prototype = Constr.prototype;
        var self = new F(); // ������� ������ ��� ������ ������������
        
        var i = 1, args = arguments;
          
		// ���������� �������� ������������, ������� � ������ �������� ���������
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


// ���������

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


