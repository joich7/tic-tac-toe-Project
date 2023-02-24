const main = document.getElementById("app");
let state = {
    arr: ["","","","","","","","",""],

    user: 1,
    gameState: 0, //0 = no one has won, 1 = someone has won and upon building page do not include event listeners 

    score: [0,0],
    match: null,
}

const winConditions = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8], [2, 4, 6]
];



function selector(ElementId){
    return document.getElementById(ElementId)
}

function make(IdName, Location, elementType, className, content)  {     //function to creat element w/ classes,id, element, and inner HTML
    const location = document.getElementById(Location);
    const newElement = document.createElement(elementType);
    newElement.setAttribute('id',IdName)
    newElement.setAttribute('class',className)

    if (content != null || content != ""){
       newElement.innerHTML = content;
    }

    location.appendChild(newElement)
}


function win() {
    
    let userIndexes = state.arr.map((e, i) => e === state.user ? i : '').filter(String)

    for(condition of winConditions){  //selecting an array from windConditions  
        let counter = 0;
        let match = [];
        for(n of condition){   //iterating over each value in selected array 
           
            if(userIndexes.includes(n)){
                counter +=1;
                match = condition
            }
        }

        if(Boolean(counter == 3)){
            console.log("true")
            state.gameState = 1;
            state.score[state.user - 1] +=1;// adds to score of current player in state 
            state.match = match //stores matching win Condition in state to use in highlighting function 

        //if arr does not conain an empty space "" then display that its a tie 
        }
    }
}

function buildBoard(){  //whats being updated on page 
    for(i in state.arr){
    
        selector("paragraph").innerHTML = `It is player ${state.user}'s turn `; //displays which users turn it is
        selector("p1Score").innerHTML = `Player One Score:${state.score[0]}`;
        selector("p2Score").innerHTML = `Player Two Score:${state.score[1]}`;

        const num = i;
        const newBox = document.createElement("div");
        newBox.setAttribute('id', `${i}`)
        newBox.setAttribute("class", "col-4 border display-4 tiles")
        newBox.innerHTML = state.arr[num];
        
        function changeUser(){
                    //change state and pushes current user to corressponding index 
                    if(state.user == 1){  //changes user 
                        state.arr[num] = 1
                        state.user = 2
                    }
                    else if (state.user == 2){
                        state.arr[num] = 2
                        state.user = 1
                    }
                 
        }

        if(state.arr[num] == "" && state.gameState == 0){//add event listener to box only if index is empty(not clicked) or if somebody has won (&& win == false)
                newBox.addEventListener('click',()=> {
                    
                    state.arr[num] = state.user; //pushes current user to corressponding index, updating state
                    win()
                    selector("boardContRow").innerHTML= "";
                    buildBoard()
                    if(state.gameState == 1) {
                        setTimeout("alert(`player${state.user} won`);",500);

                        for(i of state.match){
                            console.log(i)
                            selector(i).classList.add("bg-success")
                        }
                    }
                    changeUser()
                    

                })//need to add event listener with different function for current index
        }

        if(state.arr[num] != "") { //if box has content do not add event listener but instead adds x/o as feedback to players to indicate that the area has been pressed 
            if(state.arr[num] == 1){
               newBox.innerHTML = "X"
                }
            else if (state.arr[num] == 2){
                newBox.innerHTML = "O"
                }
        }

        selector("boardContRow").appendChild(newBox)
    }
}

function reset(){
    state.arr = ["","","","","","","","",""]
    state.user = 1;
    state.gameState = 0;
    state.match = null;
    selector("boardContRow").innerHTML= "";

    buildBoard()
}

function init() {
    make(/*Id:*/"headingContainer",/*Parent Id:*/"app",/*Type:*/"div",/*class:*/"container-fluid text-center",/*Inner Txt:*/"");
        make(/*Id:*/"heading",/*Parent Id:*/"headingContainer",/*Type:*/"h1",/*class:*/"p-3",/*Inner Txt:*/"Tic-Tac-Toe");
        make(/*Id:*/"paragraph",/*Parent Id:*/"headingContainer",/*Type:*/"p",/*class:*/"p-1",/*Inner Txt:*/"");

    make(/*Id:*/"scoreCont",/*Parent Id:*/"app",/*Type:*/"div",/*class:*/"row d-flex justify-content-center p-3",/*Inner Txt:*/"");
        make(/*Id:*/"p1Score",/*Parent Id:*/"scoreCont",/*Type:*/"div",/*class:*/"col-4 text-center",/*Inner Txt:*/"");
        make(/*Id:*/"p2Score",/*Parent Id:*/"scoreCont",/*Type:*/"div",/*class:*/"col-4 text-center",/*Inner Txt:*/"");


    make(/*Id:*/"boardCont",/*Parent Id:*/"app",/*Type:*/"div",/*class:*/"container h-50 ",/*Inner Txt:*/"");
        make(/*Id:*/"boardContRow",/*Parent Id:*/"boardCont",/*Type:*/"div",/*class:*/"row text-center h-100",/*Inner Txt:*/"");

    buildBoard()

    make(/*Id:*/"buttonCont",/*Parent Id:*/"app",/*Type:*/"div",/*class:*/"row justify-content-center m-5",/*Inner Txt:*/"");
        make(/*Id:*/"resetButton",/*Parent Id:*/"buttonCont",/*Type:*/"button",/*class:*/" col-3 btn btn-primary",/*Inner Txt:*/"Reset");    
    selector("resetButton").addEventListener('click', reset )
}

init()