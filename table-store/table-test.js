
var data = [
	['id', 'name', 'age'], // Первая строка - имена полей
	['1', 'вася', '20'], // Далее - данные
	['2', 'петя', '25'],
	['3', 'дима', '30']
	
];

var humans = new Table(data);

console.log(humans.get(1, 0));
humans.setNameField(1, 'Дормидонт');
console.log(humans.getNameField(1));

humans.setRowObject(1, {id:'1', name:'Денис'});
console.log(humans.getRowArray(1));
