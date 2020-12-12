function getFile() {
    const fs = require('fs');
    let fileContent = '';
    try {
        fileContent = fs.readFileSync(process.argv[2], 'utf8')
    } catch (err) {
        console.error(err)
    };
    return fileContent;
};
// создаем массив из полученного файла
function makeArray(str){
    let arrRows = str.split('\r\n');
    let fieldStr = arrRows.map((item) => item.split(','));
    let field = [];
    for (let item of fieldStr) {
        let itemToNumber = item.map((cell) => +cell)
        field.push(itemToNumber);
    }
    return field;
}
//console.log(makeArray(getFile());
function getRandomCells() {
    return Math.floor(Math.random() * 2);
}
function createField(row, col) {
    let field = [];
    for(let i = 0; i < row; i++) {
        field[i] = [];
        for(let j = 0; j < col; j++) {
            field[i][j] = getRandomCells();
        }
    }
    return field;
}
// определяем способ создания игрового поля
function fieldFromFileOrRandom() {
    if(process.argv.length === 3) {
        return makeArray(getFile());
    } if(process.argv.length === 4) {
        var m = process.argv[2];
        var n = process.argv[3];
        return createField(m, n);
    } else {
        return createField(20, 20);
    }
}
//console.log(fieldFromFileOrRandom());
function createPropForState(arr) {
    let arrOfState = [];
    for(let item of arr) {
        let state = item.map(function(cell) {
            return (
                {
                    stateNow: Boolean(cell), 
                    stateNext: null
                });
            });
        arrOfState.push(state);
    }
    return arrOfState;
}
var stateField = createPropForState(fieldFromFileOrRandom());
//console.log(stateField);
function countNeighbours(field) {
    for (var i = 0, l = field.length; i < l; i++) {
        
        for (var j = 0, len = field[i].length; j < len; j++) {
            let aliveNeighbours = 0;
            if(field[i-1] && field[i-1][j-1] && field[i-1][j-1].stateNow) {aliveNeighbours++}
            if(field[i-1] && field[i-1][j] && field[i-1][j].stateNow) {aliveNeighbours++}
            if(field[i-1] && field[i-1][j+1] && field[i-1][j+1].stateNow) {aliveNeighbours++}
            if(field[i] && field[i][j-1] && field[i][j-1].stateNow) {aliveNeighbours++}
            if(field[i] && field[i][j+1] && field[i][j+1].stateNow) {aliveNeighbours++}
            if(field[i+1] && field[i+1][j-1] && field[i+1][j-1].stateNow) {aliveNeighbours++}
            if(field[i+1] && field[i+1][j] && field[i+1][j].stateNow) {aliveNeighbours++}
            if(field[i+1] && field[i+1][j+1] && field[i+1][j+1].stateNow) {aliveNeighbours++}

            if(field[i][j].stateNow) {
                if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                    field[i][j].stateNext = false;
                } else {
                    field[i][j].stateNext = true;
                }
            } else {
                if(aliveNeighbours === 3) {
                    field[i][j].stateNext = true;
                }
            }
        } 
    }
}
//console.log(countNeighbours(stateField));
function updateStateField(field) {
    for (let i = 0, l = field.length; i < l; i++) {
        for (let j = 0, len = field[i].length; j < len; j++) {
            if(field[i][j].stateNext !== null) {
                field[i][j].stateNow = field[i][j].stateNext;
                field[i][j].stateNext = null;
            } 
        }
    }
}
//для наглядности создаем функцию для отображения результата, с возможностью менять симовлы отображения
function stateToStr(field) {
    var aliveChar = 'X';
    var deadChar = '.';
    let stateStr ='';
    for (var i = 0, l = field.length; i < l; i++) {
        let line = field[i].map((item) => {
            if(item.stateNow) {
                return aliveChar;
            } else {
                return deadChar;
            }
        })
        .join(' ');
        stateStr += (line + '\n');
    }
    return stateStr;
}

let countTick = 0;
let timerId = setInterval(() => {
    countTick++;
    if(countTick === 60) {
        clearInterval(timerId)
    }
    countNeighbours(stateField);
    updateStateField(stateField);
    console.clear();
    console.log('осталось ' + (60 - countTick) + ' итераций');
    console.log(stateToStr(stateField));
}, 1000);

