
var EventManager = function(){
	

};

// назначаем обработчик события объекту
EventManager.prototype.on = function(obj, eventName, handler){
	if(!obj.on)
	{
		obj.on = {};
	}

	if(!obj.on[eventName])
	{
		obj.on[eventName] = [];
	}

	obj.on[eventName].push(handler);
};

// удаляем обработчик
EventManager.prototype.un = function(obj, eventName, handler){
	if(!obj.on || !obj.on[eventName])
	{
		return;
	}

	var index = obj.on[eventName].indexOf(handler);
	if(index !== -1)
	{
		obj.on[eventName].splice(index, 1);
	}
};

// Вызываем обработчик
EventManager.prototype.trigger = function(obj, eventName, args){
	if(!obj.on || !obj.on[eventName])
	{
		return;
	}

	if(toString.call(args) !== "[object Array]")
	{
		args = [args];
	}

	var handlers = obj.on[eventName];

	for(var i = 0, n = handlers.length, handler; i<n; ++i){
		handler = handlers[i];
		if(typeof handler === 'function')
		{
			handler.apply(obj, args);
		}
	}
};


// тесты
var evman = new EventManager();

var cat = {
    jump: function(){         console.log('jump');
 }
};

var dog = {
    say: function(sound){
        console.log('dog.say', sound);
        evman.trigger(cat, 'dog.say', sound);
    }
}

evman.on(cat, 'dog.say', function(sound){
    if(sound === 'гав')
    {
        this.jump();
    }
});


dog.say('гав');



