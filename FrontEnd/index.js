/*variables*/
const gallery = document.querySelector(".gallery")
const filters = document.querySelector(".menudecategories");




async function getworks(){
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

/***affichage */
async function affichage(){ 
    const arrayworks= await getworks()
    arrayworks.forEach(element => {
        const figure= document.createElement("figure");
        const img= document.createElement("img");
        img.src=element.imageUrl;
        const figcaption= document.createElement("figcaption");
        figcaption.innerHTML=element.title;
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    });
}
affichage();

//******affichage catégories */

//**récupération boutons */

async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

async function displayCategoriesButtons() { 
    const categories = await getCategories();
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);
    });
}
displayCategoriesButtons();

async function filterCategorie() {
    /* Récupération des œuvres de manière asynchrone */
    const images = await getworks();

    /* Sélection de tous les boutons dans l'élément avec la classe "container-filtres" */
    const buttons = document.querySelectorAll(".menudecategories button");

    /* Ajout d'un écouteur d'événements "click" à chaque bouton */
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {

            /* Récupération de l'ID du bouton cliqué */
            btnId= e.target.id
            /* Vidage de la galerie d'images */
            gallery.innerHTML = "";
            if (btnId!=="0") {
                const triCategories = images.((element)=> { 
                    return element.categotyId == btnId
                })
                triCategories.forEach(_element => {
                    affichage();
                });
            }
        });
    });
}
/* Appel de la fonction pour filtrer les catégories au chargement de la page */
filterCategorie();