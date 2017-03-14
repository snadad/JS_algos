function Node(val) {
	this.value = val;
	this.next = null;
}


function SLL(val){
	this.head = null;
	this.length = 0;
	if (val){
		this.push(val);
	}
}

function makeCallback(val){
	if (typeof(val) != 'function'){
		callback = function(x){ return x == val; };
	} else callback = val;
	return callback;
}
//======================================
//               PUSH
//======================================
SLL.prototype.push = function(val) {
	this.length += 1;
	if (this.head === null) {
		this.head = new Node(val);
	} else {
		var current = this.head;
		while(current.next) {
			current = current.next;
		}
		current.next = new Node(val);
	}
	return this;
};

SLL.prototype.pushArr = function(val){
	if (val instanceof Array){
		for (var i in val) {
			this.push(val[i]);
		}
	}
	return this;
};

SLL.prototype.pushFront = function(val){
	this.length += 1;
	var head = this.head;
	this.head = new Node(val);
	this.head.next = head;
	return this;
};

//======================================
//               POP
//======================================
SLL.prototype.pop  = function () {
	var val = null;
	if (this.head) {
		this.length -= 1;
		if (!this.head.next){
			val = this.head.value;
			this.head = null;
		} else {
			var current = this.head;
			while(current.next.next) {
				current = current.next;
			}
			val = current.next.value;
			current.next = null;
		}
	}
	return val;
};

SLL.prototype.popFront = function(){
	var val = null;
	if (this.head !== null){
		this.length -= 1;
		val = this.head.value;
		this.head = this.head.next;
	}
	return val;
};

//======================================
//               REMOVE
//======================================
SLL.prototype.remove = function(val) {
	callback = makeCallback(val);
	var node = null;
	if(callback(this.head.value)) {
		node = this.head;
		this.head = this.head.next;
	} else {
		var current = this.head;
		while(!callback(current.next.value) && current.next) {
			current = current.next;
		}
		if (current.next !== null){
			node = current.next
			current.next = current.next.next;
		}
	}
	if (node) this.length -= 1;
	return node;
};

//======================================
//               ATTR
//======================================
SLL.prototype.length = function(){
	var count = 0;
	var current = this.head;
	if (current){
		count ++;
		while (current.next){
			current = current.next;
			count ++;
		}
	}
	return count;
};

SLL.prototype.find = function (val) {
	callback = makeCallback(val);
	var current = this.head;
	while(current !== null) {
		if(callback(current.value)) {
			return current;
		}
		current = current.next;
	}
	return false;
};

SLL.prototype.contains = function (val) {
	callback = makeCallback(val);
	var current = this.head;
	while(current !== null) {
		if(callback(current.value)) return true;
		current = current.next;
	}
	return null;
};

SLL.prototype.isEmpty = function () {
	return this.head ? false : true;
};

SLL.prototype.isCircular = function(){
	if (this.head) {
		var slow = this.head;
		var fast = this.head;
		while (fast.next) {
			fast = fast.next;
			if (fast == slow) return true;
			fast = fast.next;
			slow = slow.next;
		}
	}
	return false;
};

//======================================
//               VIEW
//======================================
SLL.prototype.print = function (callback, end) {
	end = end !== undefined ? end : "<null>";
	callback = typeof(callback) == 'function' ? callback : function(x){
		return x+"  ->  ";		
	};	
	var current = this.head;
	var str = "";
	while(current) {
		str += callback(current.value);
		current = current.next;
	}
	str += end;
	console.log(str);
	return this;
};


module.exports = {
	SLL: SLL
};


//=============================================================
// Test
//=============================================================

// var list = new SLL();
// list.push("Bob").push("Tim").push([1,2]).pushArr(["cat","dog"])
// console.log(list.length);
// list.print();
// console.log( list.remove(x => x[0] == 1) );
// list.print();
// console.log(list.length);

