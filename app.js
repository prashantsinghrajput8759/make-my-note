console.log('welcome to the project');
shownotes();// whwn the page get refreshed it will show the saved notes
//if user add notes then add it to local storage

let addbtn = document.getElementById('addBtn');

addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById('addText');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";//needs to clear the text area
    shownotes();

});

// function to show the added notes 
function shownotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, id) {
        html += `
        <div class="notecard  mx-2 my-2 card" style="width: 21rem;">

                <div class="card-body markclass" >
                    <h5 class="card-title">Note ${id + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${id}" onclick="deletenotes(this.id)" class="btn btn-primary">Delete Note</button>
                   <button id="ugt" onclick="markugt(${id})" class="btn btn-success  my-3">important</button>
                </div>
            </div>
        `

    });
    let noteselem = document.getElementById("notes");
    if (notesobj.length != 0) {
        noteselem.innerHTML = html;

    }
    else {

        noteselem.innerHTML = `No notes ! click on Add notes to add`;
    }


};
// function to delete the notes
function deletenotes(id) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(id, 1);//delete element from index id to length 1
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();

};
function markugt(id) {

    //console.log(id);
    // let val=document.getElementById("ugt");
    //let el=document.getElementById("flip");

    // let obj=val.getElementById("ugt")[id];
    // console.log(val);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element, idd) {
        let cardTxt = element.getElementsByTagName("button")[1];
        if (idd == id) {

            if (cardTxt.innerText == "important") {
                cardTxt.innerText =
                    "not important";
                    element.style.background="#ff3300";
                    element.style.color="white";

                //val.innerText="not important";
            }
            else {

                cardTxt.innerText = "important";
                element.style.background="white";
                element.style.color="black";

            }
        }
    });
    //let cardTxt = element.getElementsByTagName("button")[1].innerText;
    // console.log(cardTxt);});

    /*if(val.innerText=="important")
    {
        el.innerHTML=` 
        <div id="flip"><button id="ugt" onclick="markugt(${id})" class="btn btn-secondary my-3">not important</button>
    </div>`
        //val.innerText="not important";
    }
    else{

        el.innerHTML=`  <div id="flip"><button id="ugt" onclick="markugt(${id})" class="btn btn-danger my-3">important</button>
        </div>`
        //val.innerText="important";*/
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
            // element.style.background="red";
            // element.style.background="white";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/