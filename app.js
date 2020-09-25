/*
TO-DO

-provjera unosa
-http POST zahtjev gdje se sve salje
-output teksta i slike (kako sliku generiranu u backendu prikazati na frontendu?)

-file ne moze biti u JSONU, ali u form data se moze nalaziti JSON
*/


//Uzimanje filea iz forme i slanje na backend
const uploadForm = document.querySelector('.upload'); // . oznacava klasu # oznacava id
console.log(uploadForm)
console.log(uploadForm.elements)


uploadForm.addEventListener('submit', function(e) {
   e.preventDefault();

   parameters=[];
   for(i=0;i<=textFields.length;i++){
	   if(textFields[i].disabled="false" && textFields[i].value==""){
		   alert("Nisu ispunjena sva polja");
		   resetButtons();
			return;
	   } 
   }
   
   const xhr = new XMLHttpRequest();
   //TEMPORARY
   outputImg.style.display = 'block';
   outputText.value="PROBNI IZLAZ"
  
   
   // Define what happens on successful data submission
			xhr.onload = () => {
				// Process our return data
				if (xhr.readyState == 4 && xhr.status == 200) {
					// Runs when the request is successful
				
					var result = JSON.parse(xhr.responseText);
					outputText.value=result.outputText;
					outputImg.setAttribute('src',"data:image/png;base64,"+response.outputImg);//outputImg bi trebao biti string slike u png formatu
				}
			};
			// Define what happens in case of error
			xhr.onerror = () => {
				alert('Oops! Something went wrong.');
			};
			//STAVITI PRAVI LINK
			xhr.open("POST", "https://skriboo-be.herokuapp.com/extract");
   
   
   var data = JSON.stringify({ "tool_name": state, "parameters":parameters }); 
   
   let file = e.target.uploadFile.files[0];
   let formData = new FormData();
   formData.append('file', file);
   formData.append('json', data);
   
 //  xhr.send(data);
});

var outputText=document.getElementById("output_text");
var outputImg=document.getElementById("output_img");


//Eventovi i funkcije sa gumbima

var state='none'
var disabledButtons=[];
var textFields=[document.getElementById("input1"),document.getElementById("input2"),document.getElementById("input3")]
//Odustani od alata
var resetButton = document.getElementById("reset_button");
resetButton.addEventListener("click",resetButtons);
//Alati
var bktButton = document.getElementById("bkt_button");
var aprxButton= document.getElementById("aprx_button");
var exrecButton= document.getElementById("exrec_button");
var clusterButton= document.getElementById("cluster_button");

var toolButtons=document.getElementsByName("tool_button");
//PRIVREMENO
var startButton=document.getElementById("start_button");
startButton.addEventListener("click",()=>{
});

//Listeneri-specificna ponasanja za gumbe

bktButton.addEventListener("click",()=>{
	state='bkt';
	textFields.forEach(el=>el.disabled=false)
	textFields[0].labels[0].innerHTML="Cutoff treshold";
	textFields[1].labels[0].innerHTML="BKT treshold";
	textFields[2].labels[0].innerHTML="Gauss treshold";
});


aprxButton.addEventListener("click",()=>{
	state='aprx';
	textFields[0].disabled=false
	textFields[1].disabled=false
	console.log(textFields[0].disabled)
	textFields[0].labels[0].innerHTML="Min number of concepts";
	textFields[1].labels[0].innerHTML="Max number of concepts";
});
//Sakt treshold,questions,answers
exrecButton.addEventListener("click",()=>{
	state='exrec';
	textFields.forEach(el=>el.disabled=false)
	textFields[0].labels[0].innerHTML="Max number of new candidates per question";
	textFields[1].labels[0].innerHTML="Questions";
	textFields[2].labels[0].innerHTML="Answers";
});

clusterButton.addEventListener("click",()=>{
	state='cluster';
});

toolButtons.forEach(btn =>btn.addEventListener("click",()=>{
	disableOtherButtons(btn)
}));

function disableButton(el){
	disabledButtons.push(el);
	el.disabled= true;
}

function disableOtherButtons(stayEnabled){
	toolButtons.forEach(el => {
	if(el!=stayEnabled){
		disableButton(el)
	}
	});
	//blokiranje upload filea
	/*
	for(element of uploadForm.elements){
		element.disabled=true;
	}
	*/
}

function resetButtons(){
	disabledButtons.forEach(el => el.disabled = false);
	textFields.forEach(el =>{
		el.disabled=true;
		el.value="";
		el.labels[0].textContent="";
	});
	disabledButtons=[];
	state='none'
	outputImg.style.display = 'none';
	outputText.value="";
}
