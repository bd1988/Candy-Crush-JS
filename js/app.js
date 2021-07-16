document.addEventListener('DOMContentLoaded', ()=> {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('.scoreDisplay');
    const width = 8;
    const squares = [];
    let score = 0;
    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ]

    //create Board

    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random()*candyColors.length);
            square.style.backgroundColor = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard();
    
    //drag candies

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id);
        console.log(this.id, 'dragstart');        
        console.log(colorBeingDragged);        
    }

    function dragEnd() {
        console.log(this.id, 'dragend');
        //what is a valid move
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);

        if(squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;                      
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;            
        } else {
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }
    }

    //drop candies once some have been cleared
    function moveDown() {
        for (i=0; i < 56; i++) {
            if (squares[i + width].style.backgroundColor === 'white') {
                squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
                squares[i].style.backgroundColor = 'white';
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundColor === 'white') {
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[i].style.backgroundColor = candyColors[randomColor];
                }
            }
        }
    }

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover')
    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragenter')
    }

    function dragLeave() {
        console.log(this.id, 'dragleave')
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
        this.style.backgroundColor = colorBeingDragged;
    }

    //Checking for matches
    //Check for row of four
    function checkRowForFive() {
        for (i = 0; i < 60; i++) {
            let rowOfFive = [i, i+1, i+2, i+3, i+4];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';
            const isNotValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55];
            if (isNotValid.includes(i)) continue;

            if (rowOfFive.every(element => squares[element].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5;
                scoreDisplay.innerHTML = score;                
                rowOfFive.forEach(element => {
                    squares[element].style.backgroundColor = 'white';                    
                })
            }
        }
    }    
   
    //Check for column of five
    function checkColumnForFive() {
        for (i = 0; i < 32; i++) {
            let columnOfFive = [i, i+width, i+2*width, i+3*width, i+4*width];
            let decidedColor = squares[i].style.backgroundColor;            
            let isBlank = squares[i].style.backgroundColor === 'white';

            if (columnOfFive.every(element => squares[element].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5;
                scoreDisplay.innerHTML = score;                
                columnOfFive.forEach(element => {
                    squares[element].style.backgroundColor = 'white';
                })
            }
        }
    }
    //Check for row of four
    function checkRowForFour() {
        for (i = 0; i < 61; i++) {
            let rowOfFour = [i, i+1, i+2, i+3];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';
            const isNotValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
            if (isNotValid.includes(i)) continue;

            if (rowOfFour.every(element => squares[element].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerHTML = score;                
                rowOfFour.forEach(element => {
                    squares[element].style.backgroundColor = 'white';                    
                })
            }
        }
    }    

    //Check for column of four
    function checkColumnForFour() {
        for (i = 0; i < 40; i++) {
            let columnOfFour = [i, i+width, i+2*width, i+3*width];
            let decidedColor = squares[i].style.backgroundColor;            
            let isBlank = squares[i].style.backgroundColor === 'white';

            if (columnOfFour.every(element => squares[element].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerHTML = score;                
                columnOfFour.forEach(element => {
                    squares[element].style.backgroundColor = 'white';
                })
            }
        }
    }
    //Check for row of three
    function checkRowForThree() {
        for (i = 0; i < 62; i++) {
            let rowOfThree = [i, i+1, i+2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === 'white';
            const isNotValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            if (isNotValid.includes(i)) continue;

            if (rowOfThree.every(element => squares[element].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;                
                rowOfThree.forEach(element => {
                    squares[element].style.backgroundColor = 'white';                    
                })
            }
        }
    }    
   
    //Check for column of three
    function checkColumnForThree() {
        for (i = 0; i < 48; i++) {
            let columnOfThree = [i, i+width, i+2*width];
            let decidedColor = squares[i].style.backgroundColor;            
            let isBlank = squares[i].style.backgroundColor === 'white';

            if (columnOfThree.every(element => squares[element].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;                
                columnOfThree.forEach(element => {
                    squares[element].style.backgroundColor = 'white';
                })
            }
        }
    }

  
    window.setInterval(function(){
        moveDown();
        checkRowForFive();
        checkColumnForFive();
        checkRowForFour();
        checkColumnForFour();    
        checkRowForThree();
        checkColumnForThree(); //Maybe is better to put this into dragend()
    }, 100);
    // when row of three same colors and column of three same colors sharing common corner only row is counted as "bar"
   

})