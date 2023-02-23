const main = document.getElementById("app");
let state = {
    arr: ["","","","","","","","",""],

    user: "1",
    
}

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





function buildBoard(){
    for(i in state.arr){
        selector("paragraph").innerHTML = `It is player ${state.user}'s turn `
        const num = i;
        const newBox = document.createElement("div");
        newBox.setAttribute('id', `${i}`)
        newBox.setAttribute("class", "col-4 border")
        newBox.innerHTML = state.arr[num];

        ///win test 
        //if true execute 
        ////if flase execute bottom

        

        if(state.arr[i] == ""){//need to add or if game = won  
                newBox.addEventListener('click',()=> {
                    console.log(num)

                    //change state and pushes current user to corressponding index 
                    state.arr[num] = state.user;
                    if(state.user == "1"){
                        state.arr[num] = "1"
                        state.user = "2"
                    }
                    else if (state.user == "2"){
                        state.arr[num] = "2"
                        state.user = "1"
                    }
               
                    selector("boardContRow").innerHTML= "";
                    buildBoard()
                    
                })//need to add event listener with different function for current index
        }

        if(state.arr[num] != "" ){ //if box has content then it has been pushed and does not add event listener but instead adds x/o as feedback to players to indicate that the area has been pressed 
            if(state.arr[num] == "1"){
               newBox.innerHTML = "X"
                }
            else if (state.arr[num] == "2"){
                newBox.innerHTML = "O"
            }
        }
        selector("boardContRow").appendChild(newBox)
    }
}

function reset(){
    state.arr = ["","","","","","","","",""]
    state.user = "1";
    selector("boardContRow").innerHTML= ""

    buildBoard()
}


function init() {
    make(/*Id:*/"headingContainer",/*Parent Id:*/"app",/*Type:*/"div",/*class:*/"container-fluid text-center",/*Inner Txt:*/"");
        make(/*Id:*/"heading",/*Parent Id:*/"headingContainer",/*Type:*/"h1",/*class:*/"p-3",/*Inner Txt:*/"Tic-Tac-Toe");
        make(/*Id:*/"paragraph",/*Parent Id:*/"headingContainer",/*Type:*/"p",/*class:*/"p-3",/*Inner Txt:*/"");
        
    make(/*Id:*/"boardCont",/*Parent Id:*/"app",/*Type:*/"div",/*class:*/"container h-50",/*Inner Txt:*/"");
        make(/*Id:*/"boardContRow",/*Parent Id:*/"boardCont",/*Type:*/"div",/*class:*/"row text-center h-100",/*Inner Txt:*/"");
       
    buildBoard()

    make(/*Id:*/"buttonCont",/*Parent Id:*/"app",/*Type:*/"div",/*class:*/"container d-flex justify-content-center m-5",/*Inner Txt:*/"");
        make(/*Id:*/"resetButton",/*Parent Id:*/"buttonCont",/*Type:*/"button",/*class:*/"btn btn-primary",/*Inner Txt:*/"Reset");    
    selector("resetButton").addEventListener('click', reset )
}

init()