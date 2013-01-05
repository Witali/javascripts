
var evman = new EventManager();

var cat = {
    jump: function(){
		console.log('jump');
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

