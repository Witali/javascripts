// тесты
WordTree.prototype.show = function(){
    console.log(this.root);
};

var tr = new WordTree();

tr.addWord('command');
tr.addWord('comma');
tr.addWord('mub');
tr.addWord('tumba');
tr.addWord('bumbaraka');
tr.addWord('bumraka');


tr.show();

console.log(tr.findWordsByLetters('mubarkata'));
