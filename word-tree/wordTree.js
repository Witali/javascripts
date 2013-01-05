// ���������� ������

function WordTree()
{
	this.root = {};


}


// ��������� ����� � ������
WordTree.prototype.addWord = function(str){
	
	for(var at = this.root, i=0, n=str.length, ch; i<n; ++i)
	{
		ch = str.charAt(i);
		if(!at.hasOwnProperty(ch))
		{
			at[ch] = {};
		}
		
		at = at[ch];
	
	}
	
	at.end = true;
	

};

// ���� �� ����� ����� � ������
WordTree.prototype.hasWord = function(str){
	
	for(var at = this.root, i=0, n=str.length, ch; i<n; ++i)
	{
		ch = str.charAt(i);
		if(!at.hasOwnProperty(ch))
		{
			return false;
		}
		
		at = at[ch];
	
	}
	
	if(at.end)
	{
		return true;
	}
	
	return false;
	

};

// ����� ���� ��������� ����� letters
WordTree.prototype.findWordsByLetters = function(letters){

	var used = {}; 
	var result = [];
	var words = [];
	
	// ����������� ���������� ��������� �������
	for ( var i = 0, ch; i < letters.length; ++i )
	{
		ch = letters.charAt(i);
		if(used.hasOwnProperty(ch))
		{
			++used[ch];
		}
		else
		{
			used[ch] = 1;
		}
	}

	function findWords(node, depth, letter)
	{
		if (depth > 0 && letter)
		{
			result[depth - 1] = letter;
			if (node.end)
			{
				var word = result.slice(0, depth).join("");
				words = words.concat([word]);
			}
		}

		for (var ch in used)
		{
			if(!used.hasOwnProperty(ch))
			{
				continue;
			}
			
			var child;
			if (used[ch] && (child = node[ch]) != undefined )
			{
				--used[ch];

				findWords(child, depth + 1, ch);

				++used[ch];
			}
		}
	}
	
	findWords(this.root, 0);

	return words;
};



