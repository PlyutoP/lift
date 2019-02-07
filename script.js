var Block = 30;
CANVAS_WIDTH = 300;
CANVAS_HEIGTH = 480;
var floor =1;
var people = 0;
var myLift;
var arr = [];
var UP = 1;
var DOWN = 2
var move = UP;
var elements;
var button;


function start() {
	canvasArea.createCanvas();
	drawHouse();
	drowFloorNumber();
	drawFloor();
	drawPeople();
	createButton();
	myLift = new drawLift(240, 10, "red", 31, 470);
	myLift.update();
}

function createButton() {
	button = document.createElement('button');
	var div = document.createElement('div');
	button.setAttribute('onclick', 'startUp()');
	button.innerHTML = "Старт";
	div.appendChild(button);
	document.body.appendChild(div);
}

var canvasArea = {
	canvas : document.createElement("canvas"),
	createCanvas : function () {
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGTH;
		this.context = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
	},
	clear: function(){
		this.context.clearRect(Block, 0, this.canvas.width, this.canvas.height);
	}
}

//отрисовка лифта
function drawLift (width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = canvasArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

//отрисовка здания
function drawHouse() {
	ctx = canvasArea.context;
	ctx.fillStyle = "Blue";
	for (var i=1; i<=10; i++ )
	{
		ctx.fillRect(0, CANVAS_HEIGTH- i*(Block+1), Block, Block);
	
	}
}

//добавление чекбоксов на страничку, отвечающих за вызов на этажах
function drowFloorNumber(){
	for (i = 10; i >1; i--) {
		text = i + " этаж";
		cur = i + "chtest"
		var l = document.createElement('label');
		var div = document.createElement('div');
		var ch = document.createElement('input');
		ch.setAttribute('type', 'checkbox');
		ch.setAttribute('name', cur);
		l.setAttribute('for', 'cur');
		l.innerHTML = text;
		div.appendChild(ch);
		div.appendChild(l);
		div.className = "check";
		document.getElementById('wrapper').appendChild(div);
	}
	var l = document.createElement('label');
	l.className = "first";
	l.innerHTML = "1 этаж";
	var div = document.createElement('div');
	div.appendChild(l);
	div.className = "check";
	document.getElementById('wrapper').appendChild(div);


}

//текущий этаж
function drawFloor() {
	ctx2 = canvasArea.context;
	ctx2.font = "20px Courier";
	ctx2.fillStyle = "Black";
	ctx2.textAlign = "left";
	ctx2.textBaseline = "top"; 
	ctx2.fillText("Этаж :" + floor, Block, Block)
	
}

//количество людей в лифте
function drawPeople() {
	
	ctx2 = canvasArea.context;
	ctx2.font = "20px Courier";
	ctx2.fillStyle = "Black";
	ctx2.textAlign = "left";
	ctx2.textBaseline = "top"; 
	ctx2.fillText("Пассажиров в лифте: " + people, 30, 60);
	
}

//проверка выбранных чекбоксов
function checkCall() {

	elements = document.querySelectorAll("input");

	for (var j = 0; j < elements.length; j++) {
		arr[9-j] = elements[j].checked;
	}
}

//начало движения лифта
function startUp() {

	checkCall();
	intervalUp = setInterval(goUp, 20, i);
	button.disabled = true;	
}

//отрисовка лифта во время движения
function goUp() {
		if (myLift.y > 190)
		{ 
			move = UP;
			canvasArea.clear();
			myLift.y-=1;
			myLift.update();
			checkFloor(myLift.y);
			drawFloor();
			drawPeople()
		} else {
			clearInterval(intervalUp);
			move = DOWN;
			goDownStart();
			return;
	}
}

//проверка, вызван ли на текущем этаже лифт
function checkPeople(current) {

	if (arr[current]) {
		sleep(1000);
		elements[9 - current].checked = false;
		arr[current] = false;
		people+=1;
	}

}

//счетчик этажей
function checkFloor (current) {
	for (var i=0; i<10; i++ )
		{
			if ((current == (470 - i*31))&&(move==UP)) 
				{
					checkPeople(i);
					floor+=1; 
				}
			else if (current == (470 - i*31)) {floor-=1;}
		} 
}


function goDownStart() {
	intervalDown = setInterval(goDown, 20);
}

//отрисовка движения лифта вниз
function goDown(){
	if (myLift.y < 469 )
		{ 
		canvasArea.clear();
		myLift.y+=1;
		checkFloor(myLift.y);
		drawFloor();
		drawPeople()
		myLift.update();
		} else {
			clearInterval(intervalDown);
			button.disabled = false;
			people = 0;
			return;
	}
}

//задержка кода
function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}
