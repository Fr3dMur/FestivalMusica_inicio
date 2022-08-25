document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
};

// Agrega galeria al HTML
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture')
        imagen.innerHTML =`
        <source srcset="../../build/img/thumb/${i}.avif" alt="Imagen de la galeria" type="image/avif">
        <source srcset="../../build/img/thumb/${i}.webp" alt="Imagen de la galeria" type="image/webp">
        
        <img loading="lazy" width="200" height="300" src="../../build/img/thumb/${i}.png" alt="Imagen de la galeria">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    };
}

// Crea el Overlay con la imagen
function mostrarImagen(id){
    const imagen = document.createElement('picture')
    imagen.innerHTML =`
        <source srcset="../../build/img/grande/${id}.avif" alt="Imagen de la galeria" type="image/avif">
        <source srcset="../../build/img/grande/${id}.webp" alt="Imagen de la galeria" type="image/webp">
        
        <img loading="lazy" width="200" height="300" src="../../build/img/grande/${id}.png" alt="Imagen de la galeria">
    `;

   const overlay = document.createElement('DIV');
   overlay.appendChild(imagen);
   overlay.classList.add('overlay');
   overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
   }

   
   // Cierra la ventana modal
   const cerrarModal = document.createElement('P');
   cerrarModal.textContent = 'X';
   cerrarModal.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
   };
   cerrarModal.classList.add('btn-cerrar');
   
   // Agregando elementos al HTML
   const body = document.querySelector('body');
   body.appendChild(overlay);
   overlay.appendChild(cerrarModal);
   body.classList.add('fijar-body');
}
