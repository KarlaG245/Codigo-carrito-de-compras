document.addEventListener('DOMContentLoaded', () => {
  const carrito = document.querySelector('#carrito');
  const listaCarrito = document.querySelector('#lista-carrito tbody');
  const listaProductos = document.querySelector('#lista-1');
  const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
  const totalElement = document.querySelector('#total');
  let carritoItems = [];

  listaProductos.addEventListener('click', agregarProducto);
  carrito.addEventListener('click', eliminarProducto);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
      const producto = e.target.parentElement.parentElement;
      leerDatosProducto(producto);
    }
  }

  function leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector('img').src,
      nombre: producto.querySelector('h3').textContent,
      precio: producto.querySelector('.precio').textContent,
      id: producto.querySelector('a').getAttribute('data-id'),
      cantidad: 1 // Inicializamos la cantidad en 1
    };

    const existe = carritoItems.find(item => item.id === infoProducto.id);
    if (existe) {
      existe.cantidad++; // Incrementamos la cantidad si ya existe en el carrito
    } else {
      carritoItems.push(infoProducto); // Agregamos el producto al carrito
    }

    carritoHTML();
  }

  function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-producto')) {
      const productoId = e.target.getAttribute('data-id');
      carritoItems = carritoItems.filter(producto => producto.id !== productoId);
      carritoHTML();
    }
  }

  function vaciarCarrito() {
    carritoItems = [];
    carritoHTML();
  }

  function carritoHTML() {
    limpiarHTML();
    carritoItems.forEach(producto => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${producto.imagen}" alt="${producto.nombre}" width="100"></td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
      `;
      listaCarrito.appendChild(row);
    });
    actualizarTotal();
  }

  function limpiarHTML() {
    while (listaCarrito.firstChild) {
      listaCarrito.removeChild(listaCarrito.firstChild);
    }
  }

  function actualizarTotal() {
    let total = carritoItems.reduce((sum, producto) => sum + parseFloat(producto.precio.replace('$', '')) * producto.cantidad, 0);
    totalElement.textContent = `Total: $${total.toFixed(2)}`; // Mostrar el total con formato
  }
});
