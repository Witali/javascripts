// менеджер событий
// позволяет добавлять события и их обработчики объектам

var EventManager = function(){
	

};

// назначаем обработчик события объекту
EventManager.prototype.on = function(obj, eventName, handler){
	if(!obj.on) {
		obj.on = {};
	}

	if(!obj.on[eventName]) {
		obj.on[eventName] = [];
	}

	obj.on[eventName].push(handler);
};

// удаляем обработчик
EventManager.prototype.un = function(obj, eventName, handler){
	if(!obj.on || !obj.on[eventName]) {
		return;
	}

	var index = obj.on[eventName].indexOf(handler);
	if(index !== -1) {
		obj.on[eventName].splice(index, 1);
	}
};

// Вызываем обработчик
EventManager.prototype.trigger = function(obj, eventName, args) {
	if(!obj.on || !obj.on[eventName]) {
		return;
	}

	if(toString.call(args) !== "[object Array]") {
		args = [args];
	}

	var handlers = obj.on[eventName];

	for(var i = 0, n = handlers.length, handler; i<n; ++i){
		handler = handlers[i];
		if(typeof handler === 'function') {
			handler.apply(obj, args);
		}
	}
};




