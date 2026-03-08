
import { db, storage } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

const gallery = document.getElementById("gallery");
const slide = document.getElementById("slideimg");

let photos=[];
let slideIndex=0;

async function loadPhotos(){

const snapshot = await getDocs(collection(db,"photos"));

gallery.innerHTML="";
photos=[];

snapshot.forEach(doc=>{

const data=doc.data();
photos.push(data.url);

let div=document.createElement("div");

div.innerHTML=`
<h4>${data.name}</h4>
<img src="${data.url}">
`;

gallery.appendChild(div);

});

startSlideshow();

}

function startSlideshow(){

if(photos.length===0) return;

slide.src=photos[0];

setInterval(()=>{

slideIndex++;
if(slideIndex>=photos.length) slideIndex=0;

slide.src=photos[slideIndex];

},4000);

}

window.uploadPhoto = async function(){

let name=document.getElementById("name").value;
if(name==="") name="Anoniem";

let file=document.getElementById("photo").files[0];

if(!file){
alert("Kies eers 'n foto.");
return;
}

let storageRef=ref(storage,"photos/"+Date.now()+file.name);

await uploadBytes(storageRef,file);

let url=await getDownloadURL(storageRef);

await addDoc(collection(db,"photos"),{
name:name,
url:url,
date:new Date()
});

document.getElementById("uploadSuccess").innerText="Foto suksesvol opgelaai!";

loadPhotos();

}

loadPhotos();
