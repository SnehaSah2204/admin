$(document).ready(function(){
    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
    removeItemButton: true,
    // searchResultLimit:5,
    // renderChoiceLimit:4
    });
    });
   
var count=0;
function add(){
    count++;
    if(count==1){      
        document.getElementById("1").style.display = "block";
    }
  }
  function sub(id){
    count--;
    document.getElementById("1").style.display = "none";
  }
    
// script for tags 

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const searchBox = document.querySelector(".search-box input");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");

  searchBox.value = "";
  filterList("");

  if (optionsContainer.classList.contains("active")) {
    searchBox.focus();
  }
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    document.getElementById('myTag').value = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

searchBox.addEventListener("keyup", function(e) {
  filterList(e.target.value);
});

const filterList = searchTerm => {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  });
};

//script to upload photo



firebase.initializeApp({
  apiKey: "AIzaSyBYRLFpxEu5Fs6-mOmTFOSbJhG75N9yiKU",
  authDomain: "fimple-768e8.firebaseapp.com",
  projectId: "fimple-768e8",
  storageBucket: "fimple-768e8.appspot.com",
  messagingSenderId: "717582333818",
  appId: "1:717582333818:web:2d7808961400907de788c3",
  measurementId: "G-PTV5PQ1GQ5"
  });
// alert("hey sneha");
function upload(){

let ref = firebase.storage().ref('images/community');
let File = document.getElementById("getFile").files[0];
const name = new Date()+'-'+File.name ;
const metadata = {
  contentType:File.type
}
var output = document.getElementById('txt');
let uploadTask = ref.child(name).put(File,metadata)

uploadTask.then(async(snap) =>{
  var url= await snap.ref.getDownloadURL()
  output.value = url;
  console.log(url);
  alert(url);
  document.getElementById("mySubmit").style.display="block";
})
 
console.log("uploaded");
// alert("up");
document.getElementById("filling").animate([
  { transform: 'translateX(0)' },             // keyframes
  { transform: 'translateX(272px)',     
}
], {
  fill:"forwards",
  duration: 10000,         // timing options
  delay:0,
});
}