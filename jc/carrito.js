
//Variable que mantiene el estado visible del carrito
var carritoVisible = false;
const productos=[
    {nombre: "1", descripcion: "1- SENSOR INTERIOR", precio: 4200,img:"../assets/img/Sensor Interior.png"},
    {nombre: "2", descripcion: "2- MODULO GSM", precio: 25000, img:"../assets/img/Modulo GSM.png"},
    {nombre: "3", descripcion: "3- CAMARA IP",precio: 17800, img:"../assets/img/Camara IP.png"},
    {nombre: "4", descripcion: "4- CAMARA EXTERIOR WIFI",precio: 18000, img:"../assets/img/Camara Exterior Wifi.png"},
    {nombre: "5", descripcion: "5- SIRENA COMUNITARIA",precio: 12000, img:"../assets/img/Sirena Comunitaria.png"},
    {nombre: "6", descripcion: "6- KIT CENTRAL DSC",precio: 183000, img:"../assets/img/Kit Central DSC.png"},
    {nombre: "7", descripcion: "7- CABLE ALARMA",precio: 54, img:"../assets/img/Cable Alarma.png"},
    {nombre: "8", descripcion: "8- CENTRAL SURI 500",precio: 32000,img:"../assets/img/Central Suri 500.png"},
    {nombre: "9", descripcion: "9- BATERIA 7A",precio: 7800, img:"../assets/img/Bateria 7A.png"},
]

// Verificar si el carrito ya existe en el localStorage
let carrito = localStorage.getItem("carrito");

// Si no existe, inicializarlo como un arreglo vacío
if (!carrito) {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
} else {
  carrito = JSON.parse(carrito);
 InicializarTodoElCarrito()
}

//hora
const hoy = new Date();
const horaActual = hoy.toLocaleDateString();
document.getElementById('hora-actual').textContent = horaActual;



//Espermos que todos los elementos de la pagina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al boton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
     
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alertaPagar()
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funcion que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    
    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funcion que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alertaExiste();
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="" class="carrito-item-img">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    alertaAgregar();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
   
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
        alertaEliminar()
    }
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    // Eliminar el elemento del DOM
    buttonClicked.parentElement.parentElement.remove();
    // Actualizar el total del carrito
    actualizarTotalCarrito(); 
    // Controlar si hay elementos en el carrito
    // Si no hay, ocultar el carrito
    ocultarCarrito();
  }

//Funcion que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //reset del carrito
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    var iva = 0;
    var totalFinal = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var descripcion = item.getElementsByClassName('carrito-item-titulo')[0];
        //quitamos el simbolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(precio, cantidad);
        total = total + (precio * cantidad);
        iva = iva + (precio * cantidad * 0.21);
        totalFinal = total + iva;
        var ima = item.getElementsByClassName('carrito-item-img')[0].src;

        //agrego los productos en el localStorage
        var verificacion = 0;
        for (var j = 0; j < carrito.length; j++) {
            if (descripcion.innerText === carrito[j].titulo) {
                verificacion = 1;
                carrito[j].cantidadProductos = cantidad; // Modificar la cantidad del producto existente
                break;
            }
        }

        if (verificacion === 0) {
            let productoNuevo = {
                titulo: descripcion.innerText,
                precio: precio,
                cantidadProductos: cantidad,
                imagen: ima,
            };
            carrito.push(productoNuevo);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // redondea un número al entero más cercano
    total = Math.round(total * 100) / 100;
    iva = Math.round(iva * 100) / 100;
    totalFinal = Math.round(totalFinal * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
    document.getElementsByClassName('carrito-iva-total')[0].innerText = '$' + iva.toLocaleString("es") + ",00";
    document.getElementsByClassName('carrito-precio-final')[0].innerText = '$' + totalFinal.toLocaleString("es") + ",00";
}

function alertaExiste(){
    Toastify({
        text: "El item ya se encuentra en el carrito",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #e74c3c, white)",
            color: "black", 
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function alertaEliminar(){
    Toastify({
        text: "Producto borrado",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #e74c3c, white)",
            color: "black", 
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function alertaAgregar(){
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black", 
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function alertaPagar(){
    Toastify({
        text: "Garcias por su compra",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black", 
        },
        onClick: function(){} // Callback after click
      }).showToast();
      //demoro 2 seg el tiempo
      setTimeout(regresaNuevamente,1000);
    
}

function regresaNuevamente(){
    Toastify({
        text: "Regresa nuevamente...",
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black", 
        },
        onClick: function(){} // Callback after click
      }).showToast(); 
}


function InicializarTodoElCarrito() {
    if (carrito.length !== 0) {
        // Seleccionamos el contenedor carrito
        var total = 0;
        var iva = 0;
        var totalFinal = 0;
        hacerVisibleCarrito()
        // Recorremos cada elemento del carrito para actualizar el total
        for (var i = 0; i < carrito.length; i++) {
        var titulo = carrito[i].titulo;
        var precio = carrito[i].precio;
        var cantidad = carrito[i].cantidadProductos;
        var imagenSrc= carrito[i].imagen;
        agregarItemAlCarrito2(titulo, precio, cantidad, imagenSrc);
        total = total + (precio * cantidad);
        iva = iva + (precio * cantidad * 0.21);
        totalFinal = total + iva;
    }
    // Redondea un número al entero más cercano
    total = Math.round(total * 100) / 100;
    iva = Math.round(iva * 100) / 100;
    totalFinal = Math.round(totalFinal * 100) / 100;
  
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
    document.getElementsByClassName('carrito-iva-total')[0].innerText = '$' + iva.toLocaleString("es") + ",00";
    document.getElementsByClassName('carrito-precio-final')[0].innerText = '$' + totalFinal.toLocaleString("es") + ",00";
    }

  }


  function agregarItemAlCarrito2(titulo, precio, cantidad, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alertaExiste();
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="" class="carrito-item-img">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="${cantidad}" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
}