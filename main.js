const productos = [
  { nombre: "Paleta", precio: 9990 },
  { nombre: "Picada Especial", precio: 7990 },
  { nombre: "Bife Ancho", precio: 10790 },
  { nombre: "Tapa Asado", precio: 10390 },
  { nombre: "Pechito de Cerdo", precio: 7290 },
  { nombre: "Bife de Chorizo", precio: 14990 },
];

function buscarProducto(nombre) {
  return (
    productos.find(
      (prod) => prod.nombre.toLowerCase() === nombre.toLowerCase()
    ) || null
  );
}

function calcularTotal(listaPrecios) {
  let total = 0;
  for (let precio of listaPrecios) {
    total += precio;
  }
  return total;
}

function simuladorCompras() {
  const carrito = [];
  let continuar = true;

  alert(
    "Bienvenido a Reyba 'Tienda de carnes' 🥩🛒\nEscribí 'menu' para ver la lista de cortes o 'salir' para terminar."
  );

  while (continuar) {
    let entrada = prompt(
      "Elegí qué corte de carne querés, o escribí 'menu' o 'salir':"
    );

    if (!entrada) {
      alert("Debés escribir algo válido.");
      continue;
    }

    if (entrada.toLowerCase() === "salir") {
      continuar = false;
      break;
    }
    if (entrada.toLowerCase() === "menu") {
      let lista = "Menú de cortes disponibles:\n\n";
      for (let prod of productos) {
        lista += `- ${prod.nombre}: $${prod.precio} (x Kg)\n`;
      }
      alert(lista);
      continue;
    }

    const productoEncontrado = buscarProducto(entrada);

    if (productoEncontrado) {
      let gramos = parseInt(
        prompt(
          `Ingresaste ${productoEncontrado.nombre}.\n¿Cuántos gramos querés? (ej: 500, 1000, 2000)`
        )
      );

      if (isNaN(gramos) || gramos <= 249) {
        alert(
          "Cantidad inválida, venta minima por corte 250 gr(1/4 Kg), vuelve a intentarlo."
        );
        continue;
      }

      const precioFinal = (productoEncontrado.precio * gramos) / 1000;

      carrito.push(precioFinal);
      alert(
        `Agregaste ${gramos} gr. de ${productoEncontrado.nombre} ($${precioFinal}) al carrito.`
      );
    } else {
      alert("Ese producto no está disponible.");
    }
  }

  if (carrito.length > 0) {
    const total = calcularTotal(carrito);
    alert(`El total de tu compra es: $${total}`);
    console.log("Detalle de compra:", carrito, "Total:", total);
  } else {
    alert("No compraste nada.");
  }
}

simuladorCompras();
