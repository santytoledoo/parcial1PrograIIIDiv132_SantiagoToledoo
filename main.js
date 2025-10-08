//array de productos
const frutas = [
  { id: 1, nombre: "manzana", precio: 1500, ruta_img: "img/manzana.jpg" },
  { id: 2, nombre: "arandano", precio: 5000, ruta_img: "img/arandano.jpg" },
  { id: 3, nombre: "banana", precio: 1000, ruta_img: "img/banana.jpg" },
  { id: 4, nombre: "anana", precio: 3000, ruta_img: "img/anana.jpg" },
  { id: 5, nombre: "frutilla", precio: 3000, ruta_img: "img/frutilla.jpg" },
  { id: 6, nombre: "frambuesa", precio: 4000, ruta_img: "img/frambuesa.png" },
  { id: 7, nombre: "kiwi", precio: 2000, ruta_img: "img/kiwi.jpg" },
  { id: 8, nombre: "mandarina", precio: 800, ruta_img: "img/mandarina.jpg" },
  { id: 9, nombre: "naranja", precio: 9000, ruta_img: "img/naranja.jpg" },
  { id: 10, nombre: "pera", precio: 2500, ruta_img: "img/pera.jpg" },
  { id: 11, nombre: "pomelo-amarillo", precio: 2000, ruta_img: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "pomelo-rojo", precio: 2000, ruta_img: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "sandia", precio: 1500, ruta_img: "img/sandia.jpg" }
];

// variables globales
// se guardan los elementos del html y el carrito del localstorage
let contenedorFrutas = document.querySelector("#contenedorFrutas");
let contenedorCarrito = document.querySelector("#contenedorCarrito");
let barraBusqueda = document.querySelector("#barraBusqueda");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// mostrar los productos en pantalla
// esta funcion recorre el array de frutas y genera las tarjetas en el html
function mostrarProductos(array) {
  let cartaProducto = "";
  array.forEach((fruta) => {
    cartaProducto += `
      <div class="card-producto">
        <img src="${fruta.ruta_img}" alt="${fruta.nombre}" />
        <h3>${fruta.nombre}</h3>
        <p>$${fruta.precio}</p>
        <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
      </div>`;
  });
  contenedorFrutas.innerHTML = cartaProducto;
}

// filtra las frutas mientras se escribe en la barra
// este evento detecta cada tecla presionada y filtra las frutas por nombre
barraBusqueda.addEventListener("keyup", () => {
  let valor = barraBusqueda.value.toLowerCase();
  let filtradas = frutas.filter(f => f.nombre.toLowerCase().includes(valor));
  mostrarProductos(filtradas);
});

// agrega una fruta al carrito y la guarda en localstorage
// busca la fruta por id, la mete al array carrito y actualiza la vista
function agregarACarrito(id) {
  let frutaSeleccionada = frutas.find(f => f.id === id);
  carrito.push(frutaSeleccionada);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// muestra el contenido del carrito y el total
// arma la lista de productos agregados y calcula el precio total
function mostrarCarrito() {
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p><b>Carrito vacío</b></p>";
    actualizarContador();
    return;
  }

  let carta = "<ul>";
  carrito.forEach((el, i) => {
    carta += `
      <li class="bloque-item">
        <p>${el.nombre} - $${el.precio}</p>
        <button class="boton-eliminar" onclick="eliminarElemento(${i})">Eliminar</button>
      </li>`;
  });
  carta += "</ul>";

  let total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

  carta += `
    <div class="carrito-footer">
      <button class="vaciar-btn" onclick="vaciarCarrito()">Vaciar Carrito</button>
      <p class="total-carrito">Total: $${total}</p>
    </div>
  `;

  contenedorCarrito.innerHTML = carta;
  actualizarContador();
}

// elimina una fruta del carrito segun su posicion
// usa el indice del array para borrar el producto y actualiza el carrito
function eliminarElemento(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// vacia completamente el carrito
// limpia el array y el localstorage
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

// actualiza el contador de productos en el header
// muestra la cantidad de productos actuales del carrito
function actualizarContador() {
  document.querySelector("#contadorHeader").textContent = `Carrito: ${carrito.length} Productos`;
}

// ordena las frutas por nombre
// usa localeCompare para ordenar alfabeticamente
function ordenarPorNombre() {
  frutas.sort((a, b) => a.nombre.localeCompare(b.nombre));
  mostrarProductos(frutas);
}

// ordena las frutas por precio
// organiza el array de menor a mayor segun el precio
function ordenarPorPrecio() {
  frutas.sort((a, b) => a.precio - b.precio);
  mostrarProductos(frutas);
}

// muestra en consola y en pantalla los datos del alumno
// imprime el nombre y dni del alumno en consola y en el html
function imprimirDatosAlumno() {
  const alumno = { dni: "47349057", nombre: "Santiago", apellido: "Toledo" };
  console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);
  document.querySelector("#nombreAlumno").textContent = `${alumno.nombre} ${alumno.apellido}`;
}

// inicia la app mostrando todo
// se ejecuta al cargar la pagina y arranca las funciones principales
function init() {
  imprimirDatosAlumno();
  mostrarProductos(frutas);
  mostrarCarrito();
}
init();
