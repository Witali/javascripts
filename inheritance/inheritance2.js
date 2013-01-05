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
    root.create = function(Constr, args) {
       
        F.prototype = Constr.prototype;
        var self = new F(); // ������� ������ ��� ������ ������������
       
        if(!(args instanceof Array))
        {
            args = [args];
        }
          
		// ���������� �������� ������������, ������� � ������ �������� ���������
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


// ���������

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


