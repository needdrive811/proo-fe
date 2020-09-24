//Uzimanje filea iz forme i slanje na backend
const uploadForm = document.querySelector('#upload');
//console.log(uploadForm)
uploadForm.elements[0].addEventListener('submit', function(e) {
   e.preventDefault()
   
   /*
   let file = e.target.uploadFile.files[0]
   let formData = new FormData()
   formData.append('file', file)
   fetch('http://localhost:3000/upload_files', {
      method: 'POST',
      body: formData
   })
   .then(resp => resp.json())
   .then(data => {
      if (data.errors) {
         alert(data.errors)
      }
      else {
         console.log(data)
      }
   })
   */
});



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

//var toolButtons=[bktButton,clusterButton,exrecButton,aprxButton]

var toolButtons=document.getElementsByName("tool_button");
//PRIVREMENO
var startButton=document.getElementById("start_button");
startButton.addEventListener("click",()=>{
	
   parameters=[]
   textFields.forEach(el=>{
	if(el.disabled == false){
		parameters.push(el.value)
	}
   })
   console.log(parameters)
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
}

function sendJSON(dataset,parameters){
	
			let tool = document.querySelector('.result'); 
            let name = document.querySelector('#name'); 
            let email = document.querySelector('#email'); 
               
            // Creating a XHR object 
            let xhr = new XMLHttpRequest(); 
            let url = "submit.php"; //TREBA STAVITI URL
        
            // open a connection 
            xhr.open("POST", url, true); 
  
            // Set the request header i.e. which type of content you are sending 
            xhr.setRequestHeader("Content-Type", "application/json"); 
  
            // Create a state change callback 
            xhr.onreadystatechange = function () { 
                if (xhr.readyState === 4 && xhr.status === 200) { 
  
                    // Print received data from server 
                    result.innerHTML = this.responseText; 
  
                } 
            }; 
			
            // Converting JSON data to string 
            var data = JSON.stringify({ "tool_name": state, "dataset": dataset, "parameters":parameters }); 
  
            // Sending data with the request 
            xhr.send(data); 
	
}