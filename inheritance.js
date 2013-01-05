// ������������ ��� �������� ������ ����������


(function(root){
    // ������ ����������, ��������� ���� ���
    var protos = [],
        i=0;    
    
    root.extend = function(Child, Parent) {
        var proto;
        
        if(Parent.hasOwnProperty('protoId') && Parent.protoId < protos.length)
        {
			// �������� �������� �� ������ ���� �� ��� ����
            proto = protos[Parent.protoId];
        }
        else
        {
			// ��� ������� �����
            Parent.protoId = ++i;
            protos[i] = proto = new Parent(); // ��������� � ������
        }
 
        Child.prototype = proto;
        return Child;
    };
    
    root.create = function(Child, Parent) {
		if(Parent)
		{
			return new (root.extend(Child, Parent))();
		}
		else
		{
			return new Child();
		}
    }

})(window);

var A = function(){
    this.a = 'a';
};

var B = function(){
    this.b = 'b';
};

var C = create(B, A);

var D = create(function(){}, A);


console.log(A);
console.log(C.b);

console.log(C instanceof B);
console.log(C instanceof A);
console.log(D instanceof A);

