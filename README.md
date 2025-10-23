🥩 Reyba - Tienda de Carnes

Aplicación web simple desarrollada en HTML, CSS y JavaScript puro, que
simula una tienda online de cortes de carne con carrito de compras
persistente en localStorage.
El usuario puede agregar productos indicando gramos, visualizar el
total, quitar productos individualmente o vaciar el carrito completo.

---

🚀 Tecnologías utilizadas

---

Tipo Tecnología / Librería Descripción

---

💻 Lenguaje base HTML5 Estructura semántica
del sitio.

🎨 Estilos CSS3 Diseño responsive y
estilo de cards.

⚙️ Lógica JavaScript (ES6+) Manejo del DOM,
eventos y lógica del
carrito.

🔔 Toastify JS Muestra mensajes
Notificaciones flotantes (éxito,
error, alerta).

💬 Alertas SweetAlert2 Ventanas modales
atractivas para
confirmaciones y
avisos.

🧠 localStorage Guarda el carrito de
Almacenamiento compras de forma
persistente.

---

---

🧩 Estructura del proyecto

    📦 ReybaTiendaDeCarnes
    ├── index.html              # Página principal
    ├── style.css               # Estilos generales
    ├── main.js                 # Lógica del carrito y renderizado
    ├── productos.json          # Lista de productos disponibles
    ├── img/
    │   └── logo.jpg            # Logo de la tienda
    └── README.md               # Este archivo

---

🛠️ Funcionalidades principales

- 🥩 Mostrar productos cargados desde productos.json.
- ⚖️ Validar cantidad mínima y múltiplos de 250 g.
- 🛒 Agregar, quitar o vaciar el carrito.
- 💾 Guardar automáticamente el carrito en localStorage.
- 💰 Calcular y mostrar el total en tiempo real.
- 🔔 Notificaciones visuales con Toastify.
- ✅ Confirmaciones de compra con SweetAlert2.
- 🧹 Limpieza automática del input después de agregar un producto.

---

📦 Instalación y uso

1.  Clonar o descargar el proyecto:

        git clone https://github.com/tuusuario/ReybaTiendaDeCarnes.git

2.  Abrir el archivo index.html en tu navegador (no requiere servidor).

3.  Asegurarte de que el archivo productos.json esté en la misma
    carpeta.

💡 También podés usar Live Server en Visual Studio Code para recargar
automáticamente los cambios.

---

🧠 Ejemplo de productos.json

    [
      { "id": 1, "nombre": "Asado", "precio": 5000 },
      { "id": 2, "nombre": "Vacio", "precio": 6000 },
      { "id": 3, "nombre": "Bife de Chorizo", "precio": 6500 }
    ]

---

🧰 Dependencias externas (CDN)

Incluidas en index.html:

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
