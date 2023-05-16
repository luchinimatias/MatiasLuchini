const productos=[
    {nombre: "1", descripcion: "SENSOR INTERIOR", precio: 4200 },
    {nombre: "2", descripcion: "MODULO GSM", precio: 25000 },
    {nombre: "3", descripcion: "CAMARA IP",precio: 17800 },
    {nombre: "4", descripcion: "CAMARA EXTERIOR WIFI",precio: 18000 },
    {nombre: "5", descripcion: "SIRENA COMUNITARIA",precio: 12000},
    {nombre: "6", descripcion: "KIT CENTRAL DSC",precio: 183000 },
    {nombre: "7", descripcion: "CABLE ALARMA",precio: 54 },
    {nombre: "8", descripcion: "CENTRAL SURI 500",precio: 32000},
    {nombre: "9", descripcion: "BATERIA 7A",precio: 7800},
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
    let todoslosProductos = productos.map((productos)=> `${productos.nombre} ${productos.descripcion}  \$ ${productos.precio}`);
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
 /*   for (let i = 0; i < carrito.length; i++)
    {
        if (carrito[i].nombre === producto)
        {
            alert(`El producto ${producto} no existe: `); 
            
        }
        else
        {
            alert(`El producto ${producto} existe`+ carrito[i].nombre); 
            break
        }
    }*/
    if(producto == "1" || producto == "2" || producto == "3" || producto == "4" || producto == "5" || producto == "6" || producto == "7" || producto == "8" || producto == "9")
    {
       switch (producto) 
       {
        case "1":
            descripcion = "SENSOR INTERIOR"; 
            precio= 4200;
            break;
        case "2":
            descripcion = "MODULO GSM";
            precio= 25000;
            break;
        case "3":
            descripcion = "CAMARA IP";
            precio= 17800;
            break;
        case "4":
            descripcion =  "CAMARA EXTERIOR WIFI";
            precio= 18000;
            break;
        case "5":
            descripcion= "SIRENA COMUNITARIA";
            precio= 12000;
            break;
        case "6":
            descripcion = "KIT CENTRAL DSC";
            precio= 183000;
            break; 
        case "7":
            descripcion = "CABLE ALARMA";
            precio= 54;
            break;
        case "8":
            descripcion = "CENTRAL SURI 500";
            precio= 32000;
            break;
        case "9":
            descripcion = "BATERIA 7A";
            precio= 7800;
            break;
         default:
            break;             
       }
    let unidades = parseInt(prompt("¿Cuantas unidades desea?"));

    carrito.push({producto, descripcion, unidades, precio})
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
             alert(`producto: ${carritoFinal.producto}, descripcion: ${carritoFinal.descripcion} , undades: ${carritoFinal.unidades},
              total a pagar por producto: ${carritoFinal.unidades * carritoFinal.precio}`)
        })
    break;
    }
}


const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
console.log (`El total a pagar por la compra es: ${total}`);

alert("El total de su compra es:" + total);

