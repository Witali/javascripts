// Основная логика для мастера (назад, вперед, готово)

function Wizard(steps)
{
	this.init(steps);
}

Wizard.prototype = {
	init: function(options){
		this.steps = options.steps;

		var stepsById = {};
		var allStepsSelector = []; // строка со всеми id блоков-страниц визарда
		for (var id, i=0, n=steps.length, step; i<n; i++ )
		{
			step = steps[i];
			step.index = i;
			id = step.id || i;
			stepsById[id] = step;
			allStepsSelector.push('#'+id);
			this.initStepControls(i, id);
		}
		
		this.stepsById = stepsById;
		this.allStepsSelector = allStepsSelector.join(',');
		this.currentStepIndex = options.currentStepIndex || 0;

		// Дополнительные данные для хранения между шагами
		this.data = options.data || {};
		
	},

	// Инициализация кнопок
	initStepControls: function(index, id){
		var wiz = this;
		var nextIndex=index+1, prevIndex=index-1, nextId, prevId;

		var block = $('#'+id);
		if(nextIndex < wiz.steps.length)
		{
			nextId = wiz.stepIdFromIndex(nextIndex);
			block.find('a.next-step').click(function(){
				var step = wiz.getStepById(id);
				if($.isFunction(step.beforeNext) && step.beforeNext.call(wiz, wiz.data)===false)
				{
					return;
				}
				wiz.show(nextId);
			});
		}

		if(prevIndex >= 0)
		{
			prevId = wiz.stepIdFromIndex(prevIndex);
			block.find('a.prev-step').click(function(){
				var step = wiz.getStepById(id);
				if($.isFunction(step.beforePrev) && step.beforePrev.call(wiz, wiz.data)===false)
				{
					return;
				}
				wiz.show(prevId);
			});
		}

		block.find('a.to-step').click(function(){
			wiz.toStep($(this).attr('data-step-id'));
		});

	},
	
	nextStep: function(){
		var wiz = this;

		var step = wiz.getStepByIndex(wiz.currentStepIndex);

		if($.isFunction(step.beforeNext) && step.beforeNext.call(wiz, wiz.data)===false)
		{
			return;
		}
		
		// показываем следующую страницу визарда
		wiz.show(wiz.getIdFromIndex(wiz.currentStepIndex+1));
	}, 
	
	prevStep: function(){
		var wiz = this;

		var step = wiz.getStepByIndex(wiz.currentStepIndex);
		if($.isFunction(step.beforePrev) && step.beforePrev.call(wiz, wiz.data)===false)
		{
			return;
		}

		wiz.show(wiz.getIdFromIndex(wiz.currentStepIndex-1));
	},

	toStep: function(id){
		var wiz = this;

		wiz.currentStepIndex = wiz.getIndexFromId(id);
		wiz.show(id);
	},

	getStepById: function(id){
		return this.stepsById[id];
	},

	getStepByIndex: function(index){
		return this.steps[index];
	},

	getIndexFromId: function(id){
		return this.stepsById[id].index;
	},

	getIdFromIndex: function(index){
		return this.steps[index].id;
	},

	show: function(id){
		var wiz = this;
		
		var step = wiz.getStepById(id);

		wiz.oldStepIndex = wiz.currentStepIndex;
		wiz.currentStepIndex = step.index;
		
		if($.isFunction(step.beforeShow) && step.beforeShow.call(wiz, wiz.data)===false)
		{
			wiz.currentStepIndex = wiz.oldStepIndex;
			return;
		}


		var showed = $('#'+id);
		$(wiz.allStepsSelector).not(showed).hide();
		showed.show();
	}

};

// использование
new Wizard({
	currentStepIndex: 0,
	
	steps:[{
			id: 'step-1',
			beforeShow: function(){ // если возвращает false, то след действие прерывается

			},
			beforeNext: function(data){

			}
		},{
			id: 'step-2',
			beforeShow: function(){

			},
			beforeNext: function(){

			},
			beforePrev: function(){

			}
		},{
			id: 'step-3',
			beforeShow: function(){

			},
			beforeNext: function(){

			},
			beforePrev: function(){

			}
	}]
});


