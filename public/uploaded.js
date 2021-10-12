

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
   
// console.log("uploaded");
// alert("up");
document.getElementById("filling").animate([
    { transform: 'translateX(0)' },             // keyframes
    { transform: 'translateX(222px)',     
}
  ], {
    fill:"forwards",
    duration: 10000,         // timing options
    delay:0,
});
}