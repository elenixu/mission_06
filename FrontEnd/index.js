
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
let workPic = ""
let workInput = ""

let imageCategorySelect = ""
let selectedCategory = ""

let titleInput = ""
let categorieInput = ""
let uploadWorkButton = ""

let imageInput = ""




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
      token="";
      //hideModeEdition();
      //hideModifier();
      //displayLogInButton();
      checkToken();
  
    })
    buttonAjouterImage.addEventListener("click", function (){
       closeModal();
      openModal2("#modal2");

    })

    document.querySelectorAll('.js-modal').forEach(a => {
      a.addEventListener('click', openModal)
    })
    //setTousByDefault
    displayAll()
    //displayAllModal()

   

checkToken()

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
  //e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  //modal = null
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
}

function closeModal2() {
  let modal2 = document.getElementById('modal2')
  modal2.style.display = "none"
  modal2.setAttribute('aria-hidden', 'true')
  modal2.removeAttribute('aria-modal')
  modal2.removeEventListener('click', closeModal)
  //modal = null
  modal2.querySelector('.js-modal-close').removeEventListener('click', closeModal)
  modal2.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
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

function uploadImage(event) {

  if(!isUploadWorkFormOk()){
    
  }else{
    event.preventDefault()
    var token = localStorage.getItem('token');
    var formData = new FormData;
    console.log(formData)
    imageInput = document.querySelector("#workInput");
    titleInput = document.querySelector("#titreInput");
    categorieInput = document.querySelector("#categoryInput");
    console.log(Array.from(formData));
    
    // Append the file to the FormData object
    formData.append('image', imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorieInput.value);
    console.log(formData);


    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
          closeModal2() 
          displayAll()
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
  }  
}


function emptyWorksModal() {
  if (galleryModal) {
    while (galleryModal.firstChild) {
      galleryModal.removeChild(galleryModal.firstChild);
    }
  }
}



function openModal2(modalId)  {
  const target = document.querySelector(modalId)
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

  let workPic = document.getElementById("workPic")
   imageInput = document.querySelector("#workInput");
   titleInput = document.querySelector("#titreInput");
   categorieInput = document.querySelector("#categoryInput");
   uploadWorkButton = document.querySelector('#uploadWorkButton')

  titleInput.onchange = function(){
    setUploadWorkButtonColor()
  }

  categorieInput.onchange = function(){
    setUploadWorkButtonColor()
  }

  imageInput.onchange = function(){
    setUploadWorkButtonColor()

    //We display the new pic
    workPic.src = URL.createObjectURL(imageInput.files[0])
    workPic.classList.remove('preview-img-size')
    workPic.classList.add('img-size')
    let ajouterButtonModal2 = document.querySelector('.ajouter-button')
    ajouterButtonModal2.style.display = 'none'
    let removePngText = document.querySelector('.text_sizephoto')
    removePngText.style.display = 'none'
  }
  
}


//Pour la listbox
function showCategoriesOptions() {
  document.querySelector('.select-categorie-dropdown').style.opacity = 1;
  document.querySelector('.select-categorie-dropdown').style.pointerEvents = 'auto';
}

function updateCategorieInput() {
  var selectedOption = document.querySelector('.select-categorie-dropdown').value;
  document.querySelector('.select-categorie-input').value = selectedOption;

  // Hide the dropdown after selecting an option
  document.querySelector('.select-categorie-dropdown').style.opacity = 0;
  document.querySelector('.select-categorie-dropdown').style.pointerEvents = 'none';
}


//Checks to validate button

function isUploadWorkFormOk() {

  let isTitleOk = false
  let isPicOk = false
  let isCategoryOk = false

  if (titleInput.value != null && titleInput.value != "") {
    isTitleOk = true
  }else{
    isTitleOk = false
  }

  if (imageInput.files[0] != null && imageInput.value != "") {
    isPicOk = true
  }else{
    isPicOk = false
  }

  if (categorieInput.value != null && categorieInput.value != "") {
    isCategoryOk = true
  }else{
    isCategoryOk = false
  }

  return isTitleOk && isPicOk && isCategoryOk

} 

function setUploadWorkButtonColor(){
  if(isUploadWorkFormOk()){
    uploadWorkButton.classList.remove('valider-button-ko')
    uploadWorkButton.classList.add('valider-button-ok')
  }else{
    uploadWorkButton.classList.remove('valider-button-ok')
    uploadWorkButton.classList.add('valider-button-ko')
  }

}

function displayFilters(){
  let filters = document.querySelector('.buttons-container')
  filters.style.display = 'flex';
  
}

function hideFilters(){
  let filters = document.querySelector('.buttons-container')
  filters.style.display = 'none';
}

function checkToken () {
  token = localStorage.getItem('token');
  if(token !=null){
    displayLogOutButton();
    displayModeEdition();
    displayModifier();
    hideFilters();
  }
  else {
    displayLogInButton();
    hideModifier();
    hideModeEdition();
    displayFilters();
  }
}