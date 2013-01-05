


function Singletonize(Constr)
{
	
	return function(){
		if(!Constr.instance)
		{
			var F = function(){};
			F.prototype = Constr.prototype;
			Constr.instance = new F();
		}
		
		Constr.apply(Constr.instance, arguments);
		
		return instance;
	};

}
