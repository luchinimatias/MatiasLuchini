const productos=[
    {nombre: "Central", precio: 1250 },
    {nombre: "modulo GSM", precio: 150 },
    {nombre: "Sensor Exteriro", precio: 350 },
    {nombre: "Sensor Interior", precio: 250 },
    {nombre: "Cable", precio: 50},
]

let carrito =[]


let sel= prompt ("¿Desea comprar algun producto SI o NO?");

while(sel != "si" && sel != "no") 
{
    alert("Por favor ingresar SI o NO");
    sel = prompt ("¿Desea comprar algun producto SI o NO?");
}

if(sel == "si")
{
    alert ("Listado de Preductos");
    let todoslosProductos = productos.map((productos)=> productos.nombre + " " +productos.precio + "$" );
    alert(todoslosProductos.join(" - "));
}
else if(sel == "no")
{
    alert("Gracias por su visita, regrese pronto!!");
}

while(sel != "no")
{
    let producto = prompt ("agraga un producto a tu carrito");
    let precio = 0;

    if(producto == "Central" || producto == "modulo GSM" || producto == "Sensor Exteriro" || producto == "Sensor Interior" || producto == "Cable")
    {
       switch (producto) 
       {
        case "Central":
            precio= 1250;
            break;
        case "modulo GSM":
            precio= 150;
            break;
        case "Sensor Exteriro":
            precio= 350;
            break;
        case "Sensor Interior":
            precio= 250;
            break;
        case "Cable":
            precio= 50;
            break; 
         default:
            break;             
       }
    let unidades = parseInt(prompt("¿Cuantas unidades desea?"));
    carrito.push({producto, unidades, precio})
    console.log(carrito);
    }
    else
    {
        alert ("No contamos con ese producto");
    }
    sel = prompt ("¿Desea continuar comprando?");
    while (sel == "no")
    {
        alert("Gracias por su compra");
        carrito.forEach((carritoFinal) => 
        {
             console.log(`producto: ${carritoFinal.producto}, undades: ${carritoFinal.unidades},
              total a pagar por producto: ${carritoFinal.unidades * carritoFinal.precio}`)
        })
    break;
    }
}

const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
console.log (`El total a pagar por la compra es: ${total}`);
