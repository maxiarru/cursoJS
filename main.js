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

function agregarAlCarrito(producto, gramos) {
  const inputGramos = document.getElementById(`gramos-${producto.id}`);

  if (isNaN(gramos) || gramos < 100) {
    mostrarToast("⚠️ Cantidad minima 100 gr.", "error");
    return;
  }
  if (gramos % 250 != 0) {
    mostrarToast(
      "⚠️ Se vende de a cuartos, ejemplo: 250 gr. 500 gr. 750 gr. 1000 gr.",
      "error"
    );
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
  mostrarToast(
    `✅ Agregaste ${gramos} gr. de ${producto.nombre} al carrito.`,
    "success"
  );
  imprimirCarritoEnHTML();
  actualizarContadorCarrito();
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
const carritoContent = document.getElementById("carrito-content");
const btnComprar = document.getElementById("btnComprar");

btnVerCarrito.addEventListener("click", () => {
  if (carritoContent.style.display === "none") {
    carritoContent.style.display = "block";
    btnVerCarrito.textContent = "Ocultar carrito";
  } else {
    carritoContent.style.display = "none";
    btnVerCarrito.textContent = "Ver carrito";
  }
});

btnBorrarCarrito.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  imprimirCarritoEnHTML();
  actualizarContadorCarrito();
  mostrarToast("🛒 Carrito vacío.", "warning");
});

function mostrarToast(mensaje, tipo = "info") {
  let background = "linear-gradient(to right, #333, #777)"; // por defecto gris de momento no se usa

  if (tipo === "error")
    background = "linear-gradient(to right, #b22222, #ff6347)";
  if (tipo === "success")
    background = "linear-gradient(to right, #000000ff, #ed1d1dff)";
  if (tipo === "warning")
    background = "linear-gradient(to right, #b22222, #000000ff)";

  Toastify({
    text: mensaje,
    duration: 3000, // 3 segundos
    gravity: "top",
    position: "right",
    close: true, // muestra una X para cerrar
    style: {
      background,
      color: "white",
      fontWeight: "bold",
    },
  }).showToast();
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  contador.textContent = obtenerTotalItems();
}

function obtenerTotalItems() {
  return carrito.reduce((acc, item) => acc + 1, 0);
}

btnComprar.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Carrito vacío",
      text: "Agregá productos antes de comprar.",
      icon: "warning",
      timer: 2000,
      showConfirmButton: false,
    });
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  Swal.fire({
    title: "Confirmar compra",
    text: `El total de tu compra es $${total.toFixed(2)}. ¿Deseás finalizar?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, comprar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Vaciar carrito y storage
      carrito = [];
      guardarCarrito();
      imprimirCarritoEnHTML();
      actualizarContadorCarrito();

      Swal.fire({
        title: "¡Gracias por tu compra! 🥩",
        text: "Tu pedido fue registrado con éxito.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  });
});

// Inicializar

fetch("productos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo cargar la lista de productos");
    }
    return response.json();
  })
  .then((data) => {
    imprimirProductosEnHTML(data);
  })
  .catch((error) => {
    console.error("Error al cargar productos:", error);
  });
if (carrito.length > 0) {
  imprimirCarritoEnHTML();
  actualizarContadorCarrito();
}
