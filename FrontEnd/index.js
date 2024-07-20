
const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".menudecategories");

let arrayworks = [];
let categories = [];


async function getworks(){
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

/***affichage */
async function affichage(_element){ 
    arrayworks= await getworks()
    arrayworks.forEach(element => {
        const figure= document.createElement("figure");
        figure.classList.add('category-'+element.category.id);
        figure.classList.add('figure-class');
        figure.id = 'category-'+element.id;
        const img= document.createElement("img");
        img.src=element.imageUrl;
        const figcaption= document.createElement("figcaption");
        figcaption.innerHTML=element.title;
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    });
    displayCategoriesButtons();
    
}
affichage();

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
    console.log(buttons);

    /* Ajout d'un écouteur d'événements "click" à chaque bouton */
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            console.log("je suis la")
            /* Récupération de l'ID du bouton cliqué */
            btnId= e.target.id
            console.log(categories);
            /* Changer le style du bouton catégorie choisi */ 
            categories.forEach(cat =>{
                if('catgeroy-btn-'+cat.id === btnId){
                    document.getElementById('catgeroy-btn-'+cat.id).classList.add("gallery-active");
                    console.log("Je vais selectionner le bouton "+cat.id)

                }else{
                    console.log("Je vais déselectionner le bouton "+cat.id)
                    document.getElementById('catgeroy-btn-'+cat.id).classList.remove("gallery-active");
                }
                if(btnId ==='catgeroy-btn-0'){
                    document.getElementById('catgeroy-btn-0').classList.add("gallery-active");
                }
            })
        });
    });
}

async function TriCat() {
    const tri= await getworks();
    console.log(tri)
    const buttonId = document.querySelectorAll(".menudecategories button");
    buttonId.forEach(cat => {
        if ('btn.id'==="1") {
            document.getElementById('catgeroy-btn-1'+cat.id1)
            return element.id1
        } else {
            
        }
        } )
        
};
TriCat();
/* Appel de la fonction pour filtrer les catégories au chargement de la page */
