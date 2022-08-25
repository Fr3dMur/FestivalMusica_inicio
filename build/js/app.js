document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
};

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture')
        imagen.innerHTML =`
        <source srcset="../../build/img/thumb/${i}.avif" alt="Imagen de la galeria" type="image/avif">
        <source srcset="../../build/img/thumb/${i}.webp" alt="Imagen de la galeria" type="image/webp">
        
        <img loading="lazy" width="200" height="300" src="../../build/img/thumb/${i}.png" alt="Imagen de la galeria">
        `

        galeria.appendChild(imagen);
    };
}