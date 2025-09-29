// Array de productos
const productos = [
  { id: 1, nombre: "Paleta", precio: 9990 },
  { id: 2, nombre: "Picada Especial", precio: 7990 },
  { id: 3, nombre: "Bife Ancho", precio: 10790 },
  { id: 4, nombre: "Tapa Asado", precio: 10390 },
  { id: 5, nombre: "Pechito de Cerdo", precio: 7290 },
  { id: 6, nombre: "Bife de Chorizo", precio: 14990 },
];

// Recuperar carrito del storage o inicializar vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function imprimirProductosEnHTML(productos) {
  const contenedor = document.getElementById("productos-container");

  for (const producto of productos) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
  <h3>${producto.nombre}</h3>
  <p>Precio por Kg: $${producto.precio}</p>
  <input type="number" 
         min="100" 
         step="100" 
         id="gramos-${producto.id}" 
         placeholder="Ingrese los gramos">
  <p id="error-${producto.id}" class="error"></p>
  <button id="btn-${producto.id}">Agregar al carrito</button>
`;

    contenedor.appendChild(card);

    // Agregar evento al botón
    const boton = document.getElementById(`btn-${producto.id}`);
    boton.addEventListener("click", () => {
      const gramos = parseInt(
        document.getElementById(`gramos-${producto.id}`).value
      );
      agregarAlCarrito(producto, gramos);
    });
  }
}

// Agregar producto al carrito
function agregarAlCarrito(producto, gramos) {
  const errorElemento = document.getElementById(`error-${producto.id}`);
  const inputGramos = document.getElementById(`gramos-${producto.id}`);
  errorElemento.textContent = ""; // limpiar error previo

  if (isNaN(gramos) || gramos < 100) {
    errorElemento.textContent = "⚠️ Cantidad minima 100 gr.";
    return;
  }

  const precioFinal = (producto.precio * gramos) / 1000;

  const existente = carrito.find((item) => item.nombre === producto.nombre);

  if (existente) {
    existente.gramos += gramos;
    existente.subtotal += precioFinal;
  } else {
    carrito.push({
      nombre: producto.nombre,
      gramos,
      subtotal: precioFinal,
    });
  }

  guardarCarrito();
  imprimirCarritoEnHTML();
  inputGramos.value = ""; // para limpiar el valor
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function imprimirCarritoEnHTML() {
  const contenedor = document.getElementById("carrito-container");
  const totalElemento = document.getElementById("total");

  contenedor.innerHTML = "";
  let total = 0;

  for (const item of carrito) {
    const li = document.createElement("li");
    li.textContent = `${item.gramos} gr. de ${item.nombre} → $${item.subtotal}`;
    contenedor.appendChild(li);

    total += item.subtotal;
  }

  totalElemento.textContent = `Total: $${total}`;
}

const btnVerCarrito = document.getElementById("btnVerCarrito");
const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");
const carritoSection = document.getElementById("carrito-section");

btnVerCarrito.addEventListener("click", () => {
  if (carritoSection.style.display === "none") {
    carritoSection.style.display = "block";
    btnVerCarrito.textContent = "Ocultar carrito";
  } else {
    carritoSection.style.display = "none";
    btnVerCarrito.textContent = "Ver carrito";
  }
});

btnBorrarCarrito.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  imprimirCarritoEnHTML();
});

// Inicializar
imprimirProductosEnHTML(productos);
if (carrito.length > 0) {
  imprimirCarritoEnHTML();
}
