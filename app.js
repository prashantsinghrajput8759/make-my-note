console.log('welcome to the project');
shownotes();// whwn the page get refreshed it will show the saved notes
//if user add notes then add it to local storage

let addbtn= document.getElementById('addBtn');

addbtn.addEventListener("click",function(e){

    let addtxt=document.getElementById('addText');
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
            notesobj=[];
    }
    else 
    {
            notesobj=JSON.parse(notes);
    }
    notesobj.push(addtxt.value);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    addtxt.value="";//needs to clear the text area
    shownotes();

});

// function to show the added notes 
function shownotes(){

    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
            notesobj=[];
    }
    else 
    {
            notesobj=JSON.parse(notes);
    }
    let html="";
    notesobj.forEach(function(element,id){
        html+=`
        <div class="notecard  mx-2 my-2 card" style="width: 18rem;">

                <div class="card-body">
                    <h5 class="card-title">Note ${id+1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${id}" onclick="deletenotes(this.id)" class="btn btn-primary">Delete Note</a>
                </div>
            </div>
        `

    });
    let noteselem=document.getElementById("notes");
    if(notesobj.length!=0)
    {
        noteselem.innerHTML=html;

    }
    else{

        noteselem.innerHTML=`No notes ! click on Add notes to add`;
    }


};
// function to delete the notes
function deletenotes(id){

    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
            notesobj=[];
    }
    else 
    {
            notesobj=JSON.parse(notes);
    }
    notesobj.splice(id,1);//delete element from index id to length 1
    localStorage.setItem("notes",JSON.stringify(notesobj));
    shownotes();

};
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
     console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
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