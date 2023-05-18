(function () {
    console.log('Début du carrousel')
    let carrousel__ouvrir = document.querySelector('.wp-block-gallery')
    let carrousel = document.querySelector('.carrousel')
    let carrousel__x = document.querySelector('.carrousel__x')
    let carrousel__precedant = document.querySelector('.carrousel__precedant')
    let carrousel__suivant = document.querySelector('.carrousel__suivant')
    let carrousel__figure = document.querySelector('.carrousel__figure')
    let carrousel__form = document.querySelector('.carrousel__form')
    console.log(carrousel__form.tagName) // conteneur de radio-boutons

    let galerie = document.querySelector('.galerie')
    let galerie__img = galerie.querySelectorAll('img')

    carrousel__x.addEventListener('mousedown', function () {
        carrousel.classList.remove('carrousel--activer')
    })



    carrousel__precedant.addEventListener('mousedown', function () {
        index--
        if (index == -1) {
            index = galerie__img.length - 1
        }

        affiche_image_carrousel()

    })

    carrousel__suivant.addEventListener('mousedown', function () {
        index++
        // on 5 images
        //  0 1 2 3 4 ->debordement 5 
        if (index == galerie__img.length) {
            index = 0
        }
        affiche_image_carrousel()

    })



    /**
     * Pour chaque image de la galerie l'ajouter dans le carrousel
     */
    let position = 0
    let index = [0, 7]
    let ancienIndex = -1




    /** Boucle qui permet de construire le carrousel */
    for (const elem of galerie__img) {
        elem.dataset.index = position
        elem.addEventListener('mousedown', function () {


            carrousel.classList.add('carrousel--activer')



            index = this.dataset.index
            affiche_image_carrousel()
        })
        ajouter_une_image_dans_courrousel(elem)
        ajouter_un_radio_bouton_dans_carrousel()
    }


    /**
     * Création dynamique d'une image pour le carrousel
     * @param {*} elem une image de la galerie
     */
    function ajouter_une_image_dans_courrousel(elem) {
        let img = document.createElement('img')
        img.classList.add('carrousel__img')
        // « -150x150.jpg »  .jpeg
        img.src = elem.src
        // console.log(img.src)
        carrousel__figure.appendChild(img);
    }

    function ajouter_un_radio_bouton_dans_carrousel() {
        let rad = document.createElement('input')
        rad.setAttribute('type', 'radio')
        rad.setAttribute('name', 'carrousel__rad')
        rad.classList.add('carrousel__rad')
        rad.dataset.index = position
        rad.addEventListener('mousedown', function (e) {
            index = e.target.dataset.index
            affiche_image_carrousel()


        })

        position = position + 1 // incrémentation de la position
        carrousel__form.append(rad)

    }

    /**
     * Affiche la nouvelle image du carrousel
     */

    function affiche_image_carrousel() {
        if (ancienIndex != -1) {
            carrousel__figure.children[ancienIndex].style.opacity = "0"
            // carrousel__figure.children[ancienIndex].classList.remove('carrousel__img--activer')

            console.log(carrousel__form.children[ancienIndex])
            carrousel__form.children[index].checked = true

        }
        //console.log(this.dataset.index)
        redimensionner_carrousel()
        carrousel__figure.children[index].style.opacity = "1"
        // carrousel__figure.children[ancienIndex].classList.add('carrousel__img--activer')
        carrousel__form.children[index].checked = true
        ancienIndex = index

    }

    function redimensionner_carrousel() {
        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth
        const imageWidth = carrousel__figure.children[index].naturalWidth
        const imageHeight = carrousel__figure.children[index].naturalHeight
        let carrouselWidth = carrousel.offsetWidth
        let carrouselHeight = carrousel.offsetHeight
        // pour une fenêtre inférieur à 1000px de large
        carrouselWidth = windowWidth
        if (windowWidth < 1000) {
            carrouselWidth = windowWidth - windowWidth / 4
        } else {
            carrouselWidth = windowWidth - windowWidth / 2
        }


        carrouselHeight = carrouselWidth * imageHeight / imageWidth

        carrousel.style.width = `${carrouselWidth}px`
        carrousel.style.height = `${carrouselHeight}px`

        carrousel.style.left = `${(windowWidth - carrouselWidth) / 2}px`
        carrousel.style.top = `${(windowHeight - carrouselHeight) / 2}px`

        console.log(
            `windowWidth= ${windowWidth}
    windowHeight= ${windowHeight}
    imageWidth= ${imageWidth}
    imageHeight= ${imageHeight}
    carrouselWidth= ${carrouselWidth}
    carrouselHeight= ${carrouselHeight}`
        )

    }

})()

