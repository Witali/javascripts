
var data = [
	['id', 'name', 'age'], // ������ ������ - ����� �����
	['1', '����', '20'], // ����� - ������
	['2', '����', '25'],
	['3', '����', '30']
	
];

var humans = new Table(data);

console.log(humans.get(1, 0));
humans.setNameField(1, '���������');
console.log(humans.getNameField(1));

humans.setRowObject(1, {id:'1', name:'�����'});
console.log(humans.getRowArray(1));
