
const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".menudecategories");

let arrayworks = [];
let categories = [];


async function getworks(){
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
async function initWorkArray(){
    arrayworks = await getworks();
    affichage(arrayworks);

};

/***affichage */
async function affichage(arrayworks){ 
    gallery.innerHTML = "";
    arrayworks.forEach(element => {
        const figure= document.createElement("figure");
        figure.classList.add('category-'+element.category.id);
        figure.classList.add('figure-class');
        figure.id = 'work-'+element.id;
        const img= document.createElement("img");
        img.src=element.imageUrl;
        const figcaption= document.createElement("figcaption");
        figcaption.innerHTML=element.title;
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    });
    
}

initWorkArray();
displayCategoriesButtons();

//******affichage catégories */

//**récupération boutons */

async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

async function displayCategoriesButtons() { 
    categories = await getCategories();
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = "catgeroy-btn-"+category.id;
        filters.appendChild(btn);
    });
    filterCategorie();
}


async function filterCategorie() {
    /* Récupération des œuvres de manière asynchrone */
    //const images = await getworks();

    /* Sélection de tous les boutons dans l'élément avec la classe "menude categories" */
    const buttons = document.querySelectorAll(".menudecategories button");

    /* Ajout d'un écouteur d'événements "click" à chaque bouton */
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            console.log("je suis la")
            /* Récupération de l'ID du bouton cliqué */
            btnId= e.target.id
            //console.log(categories);
            /* Changer le style du bouton catégorie choisi */ 
            console.log("J'ai choisi le bouton:  "+btnId);
            document.getElementById('catgeroy-btn-0').classList.remove("gallery-active");
            
            categories.forEach(cat =>{
                if('catgeroy-btn-'+cat.id === btnId){
                    document.getElementById('catgeroy-btn-'+cat.id).classList.add("gallery-active");
                    //console.log("Je vais selectionner le bouton "+cat.id)

                }else{
                    //console.log("Je vais déselectionner le bouton "+cat.id)
                    document.getElementById('catgeroy-btn-'+cat.id).classList.remove("gallery-active");
                }
                if(btnId ==='catgeroy-btn-0'){
                    document.getElementById('catgeroy-btn-0').classList.add("gallery-active");
                }
            });
            TriCat(btnId.replace("catgeroy-btn-", ''));

        });
    });
}

async function TriCat(btnId) {
    if(btnId == 0){
        // Je dois tous les afficher
        initWorkArray();
    }else{
        //Je dois afficher que les bons works
        filtredWork = arrayworks.filter((item) => {
            return item.categoryId == btnId
        });
        affichage(filtredWork);
    }
        
};
//**bordure et logout */
document.addEventListener("DOMContentLoaded", function () {
    const loginItem = document.getElementById("login-item");
    const logoutItem = document.getElementById("logout-item");
    const editMode = document.getElementById("edit-mode");
    const token = localStorage.getItem("token");

    if (token) {
        loginItem.style.display = "none";
        logoutItem.style.display = "block";
        editMode.style.display = "block";
    } else {
        loginItem.style.display = "block";
        logoutItem.style.display = "none";
        editMode.style.display = "none";
    }

    logoutItem.addEventListener("click", function () {
        console.log("Logout clicked");
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
});
