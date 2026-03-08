
function uploadPhotos(){

let files=document.getElementById("fileInput").files
let name=document.getElementById("name").value || "Anonymous"

for(let file of files){

let ref=storage.ref("photos/"+Date.now()+file.name)

ref.put(file).then(snapshot=>{

snapshot.ref.getDownloadURL().then(url=>{

db.collection("photos").add({

name:name,
url:url,
likes:0

})

})

})

}

}



function loadGallery(){

db.collection("photos").onSnapshot(snapshot=>{

let gallery=document.getElementById("gallery")

gallery.innerHTML=""

snapshot.forEach(doc=>{

let data=doc.data()

gallery.innerHTML+=`

<div class="photo">

<img src="${data.url}">

<b>${data.name}</b>

<div class="like" onclick="likePhoto('${doc.id}')">
❤️ ${data.likes}
</div>

</div>

`

})

})

}


function likePhoto(id){

db.collection("photos").doc(id).update({

likes:firebase.firestore.FieldValue.increment(1)

})

}


function sendMessage(){

let name=document.getElementById("msgName").value || "Anonymous"

let message=document.getElementById("message").value

let isPublic=document.getElementById("public").checked

db.collection("messages").add({

name:name,
message:message,
public:isPublic,
date:new Date()

})

alert("Message sent!")

}



function loadMessages(){

db.collection("messages")
.where("public","==",true)
.onSnapshot(snapshot=>{

let box=document.getElementById("messages")

box.innerHTML=""

snapshot.forEach(doc=>{

let d=doc.data()

box.innerHTML+=`

<div class="panel">

<b>${d.name}</b>

<p>${d.message}</p>

</div>

`

})

})

}



window.onload=function(){

if(document.getElementById("gallery")) loadGallery()

if(document.getElementById("messages")) loadMessages()

}
