
//Initialization of constants and variables
const worksList = ""
let buttonTous = ""
let buttonObjets = ""
let buttonAppartements = ""
let buttonHotels = ""
let gallery = ""
let header_modeedition = ""
let modifier = ""
let buttonLogIn = ""
let buttonLogOut = ""
let openModal = ""
let closeModal = ""
let modal = ""
let stopPropagation = ""
let galleryModal =""
let buttonAjouterImage = ""
let token = ""
let profilePic = ""
let ajouterButton = ""


//Fetch of the buttons and event listeners once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

  //https://www.sitepoint.com/get-url-parameters-with-javascript/
    const queryString = window.location.search; //fetch the parameters of the url
    const urlParams = new URLSearchParams(queryString);
    console.log(queryString);

    //Get token from the local storage
    token = localStorage.getItem('token');

    header_modeedition = document.querySelector('.header_modeedition');
    modifier = document.querySelector('.modifier');
    buttonTous = document.getElementById('button-tous');
    buttonObjets = document.getElementById('button-objets');
    buttonAppartements = document.getElementById('button-appartements');
    buttonHotels = document.getElementById('button-hotels');
    gallery = document.querySelector(".gallery"); 

    buttonLogIn = document.getElementById('loginButton');
    buttonLogOut = document.getElementById('logoutButton');

    buttonAjouterImage = document.querySelector('.ajouter-photo')

    

    //add eventlistener to the buttons//
    buttonTous.addEventListener("click", displayAll);
    buttonObjets.addEventListener("click", displayObjets);
    buttonAppartements.addEventListener("click", displayAppartements);
    buttonHotels.addEventListener("click", displayHotels);
    buttonLogOut.addEventListener("click",  function () {
      localStorage.removeItem('token');
      hideModeEdition();
      hideModifier();
      displayLogInButton();
  
    })
    buttonAjouterImage.addEventListener("click", function (){
      // closeModal();
      openModalVictoria("#modal2");

    })
    
    

    document.querySelectorAll('.js-modal').forEach(a => {
      a.addEventListener('click', openModal)
    })
    //setTousByDefault
    displayAll()
    //displayAllModal()

  if(token !=null){
    displayLogOutButton();
    displayModeEdition();
    displayModifier();
  }
  else {
    displayLogInButton();
  }

  

});
// function emptyWorks (remove the infinite photo loadings)
function emptyWorks() {
  if (gallery) {
    while (gallery.firstChild) {
      gallery.removeChild(gallery.firstChild);
    }
  }
}

//Display Functions
function displayWork(imageUrl, title) {
  //Create the new elements
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  const figcaption = document.createElement('figcaption');

  //Modify the created elements
  figcaption.innerText = title;
  image.src = imageUrl;
  image.alt =imageUrl;

  //attach the new elements to the corresponding parents
  figure.appendChild(image);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

//displayTous function
function displayAll() {
  emptyWorks();
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      // Loop
      data.forEach(item => {
        displayWork(item.imageUrl, item.title);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    buttonHighlight(buttonTous);
}


//Filters
//displayObjets function
function displayObjets() {
  displayFilter("Objets", buttonObjets);
}

//displayAppartments function
function displayAppartements() {
  displayFilter("Appartements", buttonAppartements);
}

//displayHotels function
function displayHotels() {
  displayFilter("Hotels & restaurants", buttonHotels);
}

function displayFilter(filter, buttonFilter) {
  emptyWorks();
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      // Loop
      data.forEach(item => {
        if(item.category.name == filter) {
          displayWork(item.imageUrl, item.title);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    buttonHighlight(buttonFilter);
}

//Button style management
//Function to highlight the selected button
function buttonHighlight (button) {
  resetButtons();
  button.style.backgroundColor = "#1D6154";
  button.style.color = "#FFFFFF";
}

//Button default (to reset the default value of each buttons)
function resetButtons() {
  buttonTous.style.backgroundColor = "#FFFFFF";
  buttonTous.style.color =  "#1D6154";

  buttonObjets.style.backgroundColor = "#FFFFFF";
  buttonObjets.style.color =  "#1D6154";

  buttonAppartements.style.backgroundColor = "#FFFFFF";
  buttonAppartements.style.color =  "#1D6154";

  buttonHotels.style.backgroundColor = "#FFFFFF";
  buttonHotels.style.color =  "#1D6154";
}

//logout display
function displayLogInButton() {
  buttonLogIn.style.display = 'flex';
  buttonLogOut.style.display = 'none';
}

function displayLogOutButton() {
  buttonLogIn.style.display = 'none';
  buttonLogOut.style.display = 'flex';
}

//Mode edition 
function displayModeEdition () {
  header_modeedition.style.display = 'flex';
}

function displayModifier () {
  modifier.style.display = 'flex';
}

function hideModeEdition(){
  header_modeedition.style.display = 'none';
 
}

function hideModifier(){
  modifier.style.display = 'none';

}

//modal fenetre 
modal = null


openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
  //modal = null

  galleryModal = document.querySelector('.gallery-modal');

  displayAllModal()



}

closeModal = function (e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  //modal = null
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
}

stopPropagation = function (e) {
  e.stopPropagation()
}

//display modal
function displayAllModal() {
  emptyWorksModal();
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      // Loop
      data.forEach(item => {
        displayWorkModal(item.imageUrl, item.title, item.id);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    
}


function displayWorkModal(imageUrl, title, workId) {
  const figure = document.createElement('figure');
  const image = document.createElement('img');
  const trashButton = document.createElement('button');
  const trashIcon = document.createElement('i');
  

  image.src = imageUrl;
  image.alt = title;
  image.classList.add('figure_modal');

  trashButton.classList.add('trash-button');
  trashIcon.classList.add('trash-icon', 'fa-solid', 'fa-trash-can');
  trashButton.appendChild(trashIcon);

  figure.appendChild(image);
  figure.appendChild(trashButton);

  figure.style.position = 'relative';


  galleryModal.appendChild(figure);


  trashButton.addEventListener("click",  function () {
      console.log("Image deleted");
      deleteWork (workId);
      galleryModal.removeChild(figure)
    })

}

function deleteWork (workId) {

  token = localStorage.getItem('token');

  fetch('http://localhost:5678/api/works/' + workId, {
    method: 'DELETE',
    headers: { 
      'Authorization': 'Bearer ' + token,
      'My-Custom-Header': 'foobar'
  }
  })
  .then(res => res.text()) // or res.json()
  .then(res => console.log(res))
}

function uploadImage() {
  var token = localStorage.getItem('token');
  var imageInput = document.getElementById('imageInput');
  var formData = new FormData();
  
  // Append the file to the FormData object
  formData.append('image', imageInput.files[0]);

  fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + token,
          // 'My-Custom-Header': 'foobar',  // You can add custom headers if needed
      },
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      console.log('Image uploaded successfully:', data);
  })
  .catch(error => {
      console.error('Error uploading image:', error);
  });
}


profilePic = documen.getElementById('profile-pic');
ajouterButton = documen.getElementById('ajouter-button');

ajouterButton.onchange = function (){
  profilePic.src = URL.createObjectURL(ajouterButton.files[0])
}


function emptyWorksModal() {
  if (galleryModal) {
    while (galleryModal.firstChild) {
      galleryModal.removeChild(galleryModal.firstChild);
    }
  }
}



function openModalVictoria(modalId)  {
  const target = document.querySelector(modalId)
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}


function importData() {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = _ => {
    // you can use this method to get file and perform respective operations
            let files =   Array.from(input.files);
            console.log(files);
        };
  input.click();
  
}


