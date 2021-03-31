const b = null

//test cases
const bd1 = [
    [2, b, b, 9, b, b, 8, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
]

const bd2 = [
    [1, b, b, b, b, b, b, b, 3],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, 8, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, 4, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, 3, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, 9],
]

const bd3 = [
    [1, 2, 3, 4, 5, 6, 7, 8, b],
    [b, b, b, b, b, b, b, b, 2],
    [b, b, b, b, b, b, b, b, 3],
    [b, b, b, b, b, b, b, b, 4],
    [b, b, b, b, b, b, b, b, 5],
    [b, b, b, b, b, b, b, b, 6],
    [b, b, b, b, b, b, b, b, 7],
    [b, b, b, b, b, b, b, b, 8],
    [b, b, b, b, b, b, b, b, 9],
]

const bd4 = [
    [1, 2, 3, 4, 5, 6, 7, 8, b],
    [b, b, b, b, b, b, b, b, 2],
    [b, b, b, b, b, b, b, b, 3],
    [b, b, b, b, b, b, b, b, 4],
    [b, b, b, b, b, b, b, b, 5],
    [b, b, b, b, b, b, b, b, 6],
    [b, b, b, b, b, b, b, b, 7],
    [b, b, b, b, b, b, b, b, 8],
    [b, b, b, b, b, b, b, b, 1],
]

/**
 * functions solves the board
 * @param board is the board that needs to be solved
 * @returns the solved board
 * */
function solve(board){
    if(solved(board)){
        return board
    }
    else{
        const possibilities = nextBoards(board)
        const validBoards = keepOnlyValid(possibilities)
        return searchForSolution(validBoards)
    }
}

/**
 * 
 * @param {*} boards takes in the board that needs to be solved
 * @returns false if board solution is not possible
 */
function searchForSolution(boards){
    if(boards.length < 1){
        return false
    }
    else{
        //backtracking search for solution
        var first = boards.shift()
        const tryPath = solve(first)
        if(tryPath != false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}

//checks if board is populated with numbers
function solved(board){
    for(var i=0; i < 9; i++){
        for(var j = 0; j<9; j++){
            //if there is a square with nothing, the board is not solved
            if(board[i][j] == null){
                return false
            }
        }
    }
    return true
}


function nextBoards(board){
    var res = []
    //finds the first empty square
    const firstEmpty = findEmptySquare(board) //<--(y, x)
    if(firstEmpty != undefined){
        const y = firstEmpty[0] 
        const x = firstEmpty[1]
        for(var i = 1; i<=9; i++){
            var newBoard = [...board] //to tell javaScript we don't want to have a bunch of boards that point to the exact same board
            var row = [...newBoard[y]]
            row[x] = i
            newBoard[y] = row
            res.push(newBoard)
        }
    }
    return res
}

//finds first empty square
function findEmptySquare(board){
    // board -> [Int, Int]
    for(var i= 0; i<9; i++){
        for(var j = 0; j<9; j++){
            if(board[i][j] == null){
                return [i,j]
            }
        }
    }
}

//filtering function
function keepOnlyValid(boards){
    return boards.filter(b => validBoard(b))
}

//
function validBoard(board){
    return rowGood(board) && columnGood(board) && boxesGood(board)
}

// makes sure that the board does not have any null characters in a row
function rowGood(board){
    for(var i = 0; i<9; i++){
        var cur = []
        for(var j = 0; j<9; j++){
            // determines whether a string contains the characters of a specified string
            if(cur.includes(board[i][j])){
                return false
            }
            else if(board[i][j] != null){
                //pushes new item to end of array
                cur.push(board[i][j])
            }
        }
    }
    return true
}

//traversing up and down
//makes sure that the board does not contain any null characters in a column
function columnGood(board){
    for(var i = 0; i<9; i++){
        var cur = []
        for(var j = 0; j<9; j++){
            if(cur.includes(board[j][i])){
                return false
            }
            else if(board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}


function boxesGood(board){
    const boxCoordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ]

    for(var y = 0; y < 9; y+=3){
        for(var x = 0; x < 9; x+=3){
            var cur = []
            for(var i = 0; i<9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if(cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if(board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}

console.log(solve(bd2))
