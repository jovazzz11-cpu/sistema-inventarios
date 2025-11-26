// ===================================
// ESTADO GLOBAL Y CONFIGURACIÓN
// ===================================
let productos = [];
let productoEditando = null;
let vistaActual = 'grid';
let CATEGORIAS = [
    'Coloración y Tintes',
    'Cuidado Capilar',
    'Tratamientos',
    'Manicure y Pedicure',
    'Maquillaje',
    'Accesorios',
    'Herramientas',
    'Otros'
];

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    inicializarEventos();
    cargarProductosDemo();
    actualizarDashboard();
    renderizarProductos();
    actualizarFiltrosCategorias();
});

// ===================================
// GESTIÓN DE DATOS
// ===================================
function cargarDatos() {
    const datosGuardados = localStorage.getItem('inventario_productos');
    if (datosGuardados) {
        productos = JSON.parse(datosGuardados);
    }
    
    const categoriasGuardadas = localStorage.getItem('inventario_categorias');
    if (categoriasGuardadas) {
        CATEGORIAS = JSON.parse(categoriasGuardadas);
    }
    
    const temaGuardado = localStorage.getItem('inventario_tema');
    if (temaGuardado === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const icon = document.querySelector('#themeToggle i');
        if (icon) icon.className = 'fas fa-sun';
    }
}

function guardarDatos() {
    localStorage.setItem('inventario_productos', JSON.stringify(productos));
    localStorage.setItem('inventario_categorias', JSON.stringify(CATEGORIAS));
}

function cargarProductosDemo() {
    if (productos.length === 0) {
        productos = [
            {
                id: generarId(),
                nombre: 'Shampoo Hidratante Profesional',
                sku: 'SHP-HID-001',
                categoria: 'Cuidado Capilar',
                precio: 299.99,
                cantidad: 25,
                minStock: 10,
                descripcion: 'Shampoo profesional con keratina para cabello dañado',
                imagen: 'images/shampoo.png'
            },
            {
                id: generarId(),
                nombre: 'Acondicionador Nutritivo',
                sku: 'ACD-NUT-002',
                categoria: 'Cuidado Capilar',
                precio: 349.99,
                cantidad: 20,
                minStock: 8,
                descripcion: 'Acondicionador con aceites naturales y vitaminas',
                imagen: 'images/conditioner.png'
            },
            {
                id: generarId(),
                nombre: 'Mascarilla Capilar Reparadora',
                sku: 'MASK-REP-003',
                categoria: 'Tratamientos',
                precio: 499.00,
                cantidad: 15,
                minStock: 10,
                descripcion: 'Tratamiento intensivo para cabello maltratado',
                imagen: 'images/treatment.png'
            },
            {
                id: generarId(),
                nombre: 'Kit Esmaltes Premium',
                sku: 'ESM-KIT-004',
                categoria: 'Manicure y Pedicure',
                precio: 189.00,
                cantidad: 30,
                minStock: 15,
                descripcion: 'Colección de 6 esmaltes de larga duración',
                imagen: 'images/nailpolish.png'
            },
            {
                id: generarId(),
                nombre: 'Tinte Profesional',
                sku: 'TINT-PRO-005',
                categoria: 'Coloración y Tintes',
                precio: 450.00,
                cantidad: 8,
                minStock: 12,
                descripcion: 'Coloración permanente sin amoníaco',
                imagen: 'images/hairdye.png'
            },
            {
                id: generarId(),
                nombre: 'Aceite de Argán Puro',
                sku: 'ACE-ARG-006',
                categoria: 'Tratamientos',
                precio: 380.00,
                cantidad: 18,
                minStock: 10,
                descripcion: 'Aceite 100% natural para nutrición capilar',
                imagen: ''
            },
            {
                id: generarId(),
                nombre: 'Sérum Facial Antienvejecimiento',
                sku: 'SER-FAC-007',
                categoria: 'Tratamientos',
                precio: 650.00,
                cantidad: 12,
                minStock: 8,
                descripcion: 'Sérum con ácido hialurónico y vitamina C',
                imagen: 'images/serum.png'
            },
            {
                id: generarId(),
                nombre: 'Labiales Mate Colección',
                sku: 'LAB-MAT-008',
                categoria: 'Maquillaje',
                precio: 220.00,
                cantidad: 35,
                minStock: 15,
                descripcion: 'Set de 5 labiales mate de larga duración',
                imagen: 'images/lipstick.png'
            },
            {
                id: generarId(),
                nombre: 'Cera Depilatoria Premium',
                sku: 'CER-DEP-009',
                categoria: 'Tratamientos',
                precio: 280.00,
                cantidad: 22,
                minStock: 12,
                descripcion: 'Cera profesional para depilación con aloe vera',
                imagen: ''
            },
            {
                id: generarId(),
                nombre: 'Set Brochas Profesionales',
                sku: 'BRO-PRO-010',
                categoria: 'Herramientas',
                precio: 890.00,
                cantidad: 10,
                minStock: 5,
                descripcion: 'Kit de 12 brochas profesionales para maquillaje',
                imagen: ''
            },
            {
                id: generarId(),
                nombre: 'Plancha de Cabello Profesional',
                sku: 'PLA-CAB-011',
                categoria: 'Herramientas',
                precio: 1250.00,
                cantidad: 5,
                minStock: 3,
                descripcion: 'Plancha de cerámica con control de temperatura',
                imagen: ''
            },
            {
                id: generarId(),
                nombre: 'Base UV para Uñas',
                sku: 'BAS-UV-012',
                categoria: 'Manicure y Pedicure',
                precio: 150.00,
                cantidad: 28,
                minStock: 10,
                descripcion: 'Base coat UV de larga duración',
                imagen: ''
            }
        ];
        guardarDatos();
    }
}

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ===================================
// EVENTOS
// ===================================
function inicializarEventos() {
    // Menú móvil
    document.getElementById('menuToggle')?.addEventListener('click', toggleMenu);
    document.getElementById('overlay')?.addEventListener('click', toggleMenu);
    
    // Navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const seccion = item.dataset.section;
            navegarSeccion(seccion);
        });
    });
    
    // Tema
    document.getElementById('themeToggle')?.addEventListener('click', toggleTema);
    
    // Modal de producto
    document.getElementById('addProductBtn')?.addEventListener('click', abrirModalAgregar);
    document.getElementById('closeModal')?.addEventListener('click', cerrarModal);
    document.getElementById('cancelBtn')?.addEventListener('click', cerrarModal);
    document.getElementById('productForm')?.addEventListener('submit', guardarProducto);
    
    // Manejo de imágenes
    document.getElementById('takePictureBtn')?.addEventListener('click', () => {
        document.getElementById('cameraInput')?.click();
    });
    document.getElementById('uploadPictureBtn')?.addEventListener('click', () => {
        document.getElementById('fileInput')?.click();
    });
    document.getElementById('cameraInput')?.addEventListener('change', handleImageUpload);
    document.getElementById('fileInput')?.addEventListener('change', handleImageUpload);
    document.getElementById('clearImageBtn')?.addEventListener('click', clearProductImage);
    
    // Búsqueda y filtros
    document.getElementById('searchInput')?.addEventListener('input', aplicarFiltros);
    document.getElementById('categoryFilter')?.addEventListener('change', aplicarFiltros);
    document.getElementById('stockFilter')?.addEventListener('change', aplicarFiltros);
    document.getElementById('sortBy')?.addEventListener('change', aplicarFiltros);
    
    // Vista
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const vista = btn.dataset.view;
            cambiarVista(vista);
        });
    });
    
    // Ajustes
    document.getElementById('exportBtn')?.addEventListener('click', exportarDatos);
    document.getElementById('importBtn')?.addEventListener('click', () => {
        document.getElementById('importFile')?.click();
    });
    document.getElementById('importFile')?.addEventListener('change', importarDatos);
    document.getElementById('clearDataBtn')?.addEventListener('click', limpiarDatos);
    
    // Reportes - Inventario Completo
    document.getElementById('exportExcelBtn')?.addEventListener('click', () => exportarExcel('completo'));
    document.getElementById('exportCsvBtn')?.addEventListener('click', () => exportarCSV('completo'));
    
    // Reportes - Stock Bajo
    document.getElementById('exportLowStockExcelBtn')?.addEventListener('click', () => exportarExcel('stockBajo'));
    document.getElementById('exportLowStockCsvBtn')?.addEventListener('click', () => exportarCSV('stockBajo'));
    
    // Reportes - Por Categoría
    document.getElementById('exportCategoryExcelBtn')?.addEventListener('click', () => exportarExcel('categoria'));
    document.getElementById('exportCategoryCsvBtn')?.addEventListener('click', () => exportarCSV('categoria'));
    
    // Reportes - Valoración
    document.getElementById('exportValueExcelBtn')?.addEventListener('click', () => exportarExcel('valoracion'));
    document.getElementById('exportValueCsvBtn')?.addEventListener('click', () => exportarCSV('valoracion'));
    
    // Cerrar modal al hacer click fuera
    document.getElementById('productModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            cerrarModal();
        }
    });
    
    // Navegación en categorías
    document.getElementById('backToCategoriesBtn')?.addEventListener('click', volverACategorias);
}

// ===================================
// NAVEGACIÓN
// ===================================
function navegarSeccion(seccion) {
    // Actualizar nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${seccion}"]`)?.classList.add('active');
    
    // Actualizar secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        if (section.id === `${seccion}-section`) {
            section.classList.add('active');
        }
    });

    // Lógica específica por sección
    if (seccion === 'categorias') {
        renderizarCategorias();
    }
}

function toggleTema() {
    const html = document.documentElement;
    const temaActual = html.getAttribute('data-theme');
    const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', nuevoTema);
    localStorage.setItem('inventario_tema', nuevoTema);
    
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = nuevoTema === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    mostrarToast('success', 'Tema actualizado', `Cambiado a modo ${nuevoTema === 'dark' ? 'oscuro' : 'claro'}`);
}

// ===================================
// DASHBOARD
// ===================================
function actualizarDashboard() {
    actualizarEstadisticas();
    actualizarAlertas();
    actualizarGraficoCategorias();
}

function actualizarEstadisticas() {
    const total = productos.length;
    const stockBajo = productos.filter(p => p.cantidad <= p.minStock).length;
    const valorTotal = productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    const categorias = [...new Set(productos.map(p => p.categoria))].length;
    
    document.getElementById('totalProductos').textContent = total;
    document.getElementById('stockBajo').textContent = stockBajo;
    document.getElementById('valorTotal').textContent = `$${valorTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
    document.getElementById('totalCategorias').textContent = categorias;
}

function actualizarAlertas() {
    const alertsList = document.getElementById('alertsList');
    if (!alertsList) return;
    
    const productosStockBajo = productos.filter(p => p.cantidad <= p.minStock);
    
    if (productosStockBajo.length === 0) {
        alertsList.innerHTML = `
            <div class="alert-item" style="border-left-color: var(--color-success);">
                <div class="alert-info">
                    <span><i class="fas fa-check-circle"></i> Todo está bien</span>
                    <small>No hay productos con stock bajo</small>
                </div>
            </div>
        `;
        return;
    }
    
    alertsList.innerHTML = productosStockBajo.map(p => `
        <div class="alert-item">
            <div class="alert-info">
                <span>${p.nombre}</span>
                <small>SKU: ${p.sku} | Stock mínimo: ${p.minStock}</small>
            </div>
            <div class="alert-stock">
                ${p.cantidad} unidades
            </div>
        </div>
    `).join('');
}

function actualizarGraficoCategorias() {
    const chart = document.getElementById('categoriesChart');
    if (!chart) return;
    
    const categoriasCont = {};
    productos.forEach(p => {
        categoriasCont[p.categoria] = (categoriasCont[p.categoria] || 0) + 1;
    });
    
    const maxCant = Math.max(...Object.values(categoriasCont), 1);
    
    chart.innerHTML = Object.entries(categoriasCont).map(([cat, cant]) => {
        const porcentaje = (cant / maxCant) * 100;
        return `
            <div class="category-bar">
                <div class="category-info">
                    <span class="category-name">${cat}</span>
                    <span class="category-count">${cant} producto${cant !== 1 ? 's' : ''}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${porcentaje}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

// ===================================
// PRODUCTOS - CRUD
// ===================================
function renderizarProductos(productosFiltrados = null) {
    const container = document.getElementById('productsContainer');
    const emptyState = document.getElementById('emptyState');
    const productosArray = productosFiltrados || productos;
    
    if (!container) return;
    
    if (productosArray.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    container.className = vistaActual === 'grid' ? 'products-grid' : 'products-list';
    
    container.innerHTML = productosArray.map(p => {
        const stockBajo = p.cantidad <= p.minStock;
        const valorTotal = p.precio * p.cantidad;
        const imagenHTML = p.imagen ? 
            `<img src="${p.imagen}" alt="${p.nombre}" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="product-image-placeholder" style="display:none;"><i class="fas fa-image"></i></div>` :
            `<div class="product-image-placeholder"><i class="fas fa-image"></i></div>`;
        
        return `
            <div class="product-card">
                ${imagenHTML}
                
                <div class="product-header">
                    <div>
                        <h3 class="product-title">${p.nombre}</h3>
                        <span class="product-sku">${p.sku}</span>
                    </div>
                </div>
                
                <div class="product-category">${p.categoria}</div>
                
                <div class="product-info">
                    <div class="info-row">
                        <span class="info-label">Precio unitario:</span>
                        <span class="info-value price">$${p.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Stock:</span>
                        <span class="info-value ${stockBajo ? 'low-stock' : ''}">
                            ${p.cantidad} unidades
                            ${stockBajo ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                        </span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Valor total:</span>
                        <span class="info-value">$${valorTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
                
                ${p.descripcion ? `<p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: 0.5rem;">${p.descripcion}</p>` : ''}
                
                <div class="product-actions">
                    <button class="btn btn-secondary" onclick="editarProducto('${p.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger" onclick="eliminarProducto('${p.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function abrirModalAgregar() {
    productoEditando = null;
    document.getElementById('modalTitle').textContent = 'Agregar Producto';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    
    // Limpiar preview de imagen
    clearProductImage();
    
    actualizarSelectoresCategorias(); // Cargar categorías actualizadas
    document.getElementById('productModal').classList.add('active');
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    productoEditando = producto;
    document.getElementById('modalTitle').textContent = 'Editar Producto';
    document.getElementById('productId').value = producto.id;
    document.getElementById('productName').value = producto.nombre;
    document.getElementById('productSKU').value = producto.sku;
    document.getElementById('productCategory').value = producto.categoria;
    document.getElementById('productPrice').value = producto.precio;
    document.getElementById('productQuantity').value = producto.cantidad;
    document.getElementById('productMinStock').value = producto.minStock;
    document.getElementById('productDescription').value = producto.descripcion || '';
    document.getElementById('productImage').value = producto.imagen || '';
    
    // Manejar preview de imagen
    if (producto.imagen) {
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('previewImg').src = producto.imagen;
        document.getElementById('clearImageBtn').style.display = 'inline-flex';
    } else {
        clearProductImage();
    }
    
    actualizarSelectoresCategorias();
    document.getElementById('productModal').classList.add('active');
}

function guardarProducto(e) {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const categoriaIngresada = document.getElementById('productCategory').value.trim();
    
    // Agregar categoría nueva si no existe
    if (categoriaIngresada && !CATEGORIAS.some(cat => cat.toLowerCase() === categoriaIngresada.toLowerCase())) {
        CATEGORIAS.push(categoriaIngresada);
        CATEGORIAS.sort(); // Ordenar alfabéticamente
        actualizarSelectoresCategorias();
        mostrarToast('info', 'Nueva categoría', `"${categoriaIngresada}" agregada a las categorías`);
    }
    
    const producto = {
        id: id || generarId(),
        nombre: document.getElementById('productName').value.trim(),
        sku: document.getElementById('productSKU').value.trim().toUpperCase(),
        categoria: categoriaIngresada,
        precio: parseFloat(document.getElementById('productPrice').value),
        cantidad: parseInt(document.getElementById('productQuantity').value),
        minStock: parseInt(document.getElementById('productMinStock').value),
        descripcion: document.getElementById('productDescription').value.trim(),
        imagen: document.getElementById('productImage').value.trim()
    };
    
    // Validar SKU único
    const skuExiste = productos.some(p => p.sku === producto.sku && p.id !== producto.id);
    if (skuExiste) {
        mostrarToast('error', 'Error', 'El código SKU ya existe');
        return;
    }
    
    if (id) {
        // Editar
        const index = productos.findIndex(p => p.id === id);
        productos[index] = producto;
        mostrarToast('success', 'Producto actualizado', `${producto.nombre} ha sido actualizado`);
    } else {
        // Agregar
        productos.push(producto);
        mostrarToast('success', 'Producto agregado', `${producto.nombre} ha sido agregado al inventario`);
    }
    
    guardarDatos();
    actualizarDashboard();
    renderizarProductos();
    cerrarModal();
}

function eliminarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    if (confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) {
        productos = productos.filter(p => p.id !== id);
        guardarDatos();
        actualizarDashboard();
        renderizarProductos();
        mostrarToast('success', 'Producto eliminado', `${producto.nombre} ha sido eliminado del inventario`);
    }
}

function cerrarModal() {
    document.getElementById('productModal').classList.remove('active');
    productoEditando = null;
}

// ===================================
// BÚSQUEDA Y FILTROS
// ===================================
function aplicarFiltros() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const stockFilter = document.getElementById('stockFilter')?.value || '';
    const sortBy = document.getElementById('sortBy')?.value || 'nombre';
    
    let productosFiltrados = [...productos];
    
    // Filtro de búsqueda
    if (searchTerm) {
        productosFiltrados = productosFiltrados.filter(p => 
            p.nombre.toLowerCase().includes(searchTerm) ||
            p.sku.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtro de categoría
    if (categoryFilter) {
        productosFiltrados = productosFiltrados.filter(p => p.categoria === categoryFilter);
    }
    
    // Filtro de stock
    if (stockFilter === 'bajo') {
        productosFiltrados = productosFiltrados.filter(p => p.cantidad <= p.minStock);
    } else if (stockFilter === 'normal') {
        productosFiltrados = productosFiltrados.filter(p => p.cantidad > p.minStock);
    }
    
    // Ordenamiento
    productosFiltrados.sort((a, b) => {
        switch (sortBy) {
            case 'precio':
                return b.precio - a.precio;
            case 'cantidad':
                return b.cantidad - a.cantidad;
            case 'nombre':
            default:
                return a.nombre.localeCompare(b.nombre);
        }
    });
    
    renderizarProductos(productosFiltrados);
}

function actualizarFiltrosCategorias() {
    const select = document.getElementById('categoryFilter');
    if (!select) return;
    
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria))].sort();
    
    select.innerHTML = '<option value="">Todas las categorías</option>';
    categoriasUnicas.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

// ===================================
// VISTA
// ===================================
function cambiarVista(vista) {
    vistaActual = vista;
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${vista}"]`)?.classList.add('active');
    
    renderizarProductos();
}

// ===================================
// IMPORTAR/EXPORTAR
// ===================================
function exportarDatos() {
    const dataStr = JSON.stringify(productos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventario_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    mostrarToast('success', 'Datos exportados', 'El archivo se ha descargado correctamente');
}

function importarDatos(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            
            if (!Array.isArray(data)) {
                throw new Error('Formato inválido');
            }
            
            productos = data;
            guardarDatos();
            actualizarDashboard();
            renderizarProductos();
            actualizarFiltrosCategorias();
            
            mostrarToast('success', 'Datos importados', `${data.length} productos importados correctamente`);
        } catch (error) {
            mostrarToast('error', 'Error al importar', 'El archivo no tiene un formato válido');
        }
    };
    reader.readAsText(file);
    
    // Limpiar input
    e.target.value = '';
}

function limpiarDatos() {
    if (confirm('¿Estás seguro de eliminar TODOS los productos? Esta acción no se puede deshacer.')) {
        if (confirm('Última confirmación: ¿Realmente deseas borrar todo el inventario?')) {
            productos = [];
            guardarDatos();
            actualizarDashboard();
            renderizarProductos();
            actualizarFiltrosCategorias();
            
            mostrarToast('success', 'Datos eliminados', 'Todo el inventario ha sido eliminado');
        }
    }
}

// ===================================
// NOTIFICACIONES (TOAST)
// ===================================
function mostrarToast(tipo, titulo, mensaje) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const iconos = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.innerHTML = `
        <i class="fas ${iconos[tipo]}"></i>
        <div class="toast-content">
            <div class="toast-title">${titulo}</div>
            <div class="toast-message">${mensaje}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

// ===================================
// UTILIDADES
// ===================================

// Prevenir comportamientos por defecto en enlaces ancla
document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) {
        e.preventDefault();
    }
});

// ===================================
// FUNCIONES DE EXPORTACIÓN DE REPORTES
// ===================================

function prepararDatosReporte(tipo) {
    let datos = [];
    let nombreReporte = '';
    
    switch(tipo) {
        case 'completo':
            nombreReporte = 'Inventario_Completo';
            datos = productos.map(p => ({
                'SKU': p.sku,
                'Nombre': p.nombre,
                'Categoría': p.categoria,
                'Precio Unitario': p.precio,
                'Cantidad': p.cantidad,
                'Stock Mínimo': p.minStock,
                'Valor Total': p.precio * p.cantidad,
                'Estado': p.cantidad <= p.minStock ? 'STOCK BAJO' : 'NORMAL',
                'Descripción': p.descripcion || ''
            }));
            break;
            
        case 'stockBajo':
            nombreReporte = 'Stock_Bajo';
            const productosStockBajo = productos.filter(p => p.cantidad <= p.minStock);
            datos = productosStockBajo.map(p => ({
                'SKU': p.sku,
                'Nombre': p.nombre,
                'Categoría': p.categoria,
                'Cantidad Actual': p.cantidad,
                'Stock Mínimo': p.minStock,
                'Diferencia': p.minStock - p.cantidad,
                'Precio Unitario': p.precio,
                'Valor Total': p.precio * p.cantidad
            }));
            break;
            
        case 'categoria':
            nombreReporte = 'Por_Categoria';
            const categoriasCont = {};
            productos.forEach(p => {
                if (!categoriasCont[p.categoria]) {
                    categoriasCont[p.categoria] = {
                        cantidad: 0,
                        valorTotal: 0,
                        productos: 0
                    };
                }
                categoriasCont[p.categoria].cantidad += p.cantidad;
                categoriasCont[p.categoria].valorTotal += p.precio * p.cantidad;
                categoriasCont[p.categoria].productos += 1;
            });
            
            datos = Object.entries(categoriasCont).map(([cat, info]) => ({
                'Categoría': cat,
                'Total Productos': info.productos,
                'Unidades Totales': info.cantidad,
                'Valor Total': info.valorTotal,
                'Valor Promedio': info.valorTotal / info.productos
            }));
            break;
            
        case 'valoracion':
            nombreReporte = 'Valoracion_Inventario';
            datos = productos.map(p => {
                const valorTotal = p.precio * p.cantidad;
                return {
                    'SKU': p.sku,
                    'Nombre': p.nombre,
                    'Categoría': p.categoria,
                    'Precio Unitario': p.precio,
                    'Cantidad': p.cantidad,
                    'Valor Total': valorTotal
                };
            }).sort((a, b) => b['Valor Total'] - a['Valor Total']);
            
            // Agregar totales al final
            const totalGeneral = datos.reduce((sum, item) => sum + item['Valor Total'], 0);
            datos.push({
                'SKU': '',
                'Nombre': 'TOTAL GENERAL',
                'Categoría': '',
                'Precio Unitario': '',
                'Cantidad': '',
                'Valor Total': totalGeneral
            });
            break;
    }
    
    return { datos, nombreReporte };
}

function exportarExcel(tipo) {
    const { datos, nombreReporte } = prepararDatosReporte(tipo);
    
    if (datos.length === 0) {
        mostrarToast('warning', 'Sin datos', 'No hay datos para exportar en este reporte');
        return;
    }
    
    // Crear worksheet
    const ws = XLSX.utils.json_to_sheet(datos);
    
    // Crear workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, nombreReporte.substring(0, 31)); // Límite de 31 caracteres
    
    // Agregar metadata
    wb.Props = {
        Title: nombreReporte,
        Subject: 'Reporte de Inventario - Head to toe',
        Author: 'Head to toe',
        CreatedDate: new Date()
    };
    
    // Generar archivo
    const fecha = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `${nombreReporte}_${fecha}.xlsx`);
    
    mostrarToast('success', 'Reporte generado', `Archivo Excel descargado: ${nombreReporte}_${fecha}.xlsx`);
}

function exportarCSV(tipo) {
    const { datos, nombreReporte } = prepararDatosReporte(tipo);
    
    if (datos.length === 0) {
        mostrarToast('warning', 'Sin datos', 'No hay datos para exportar en este reporte');
        return;
    }
    
    // Obtener headers
    const headers = Object.keys(datos[0]);
    
    // Convertir a CSV
    let csv = headers.join(',') + '\n';
    
    datos.forEach(row => {
        const values = headers.map(header => {
            let value = row[header];
            
            // Formatear valores numéricos
            if (typeof value === 'number') {
                value = value.toFixed(2);
            }
            
            // Escapar comillas y comas
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            
            return value;
        });
        
        csv += values.join(',') + '\n';
    });
    
    // Crear blob y descargar
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' }); // BOM para UTF-8
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fecha = new Date().toISOString().split('T')[0];
    link.download = `${nombreReporte}_${fecha}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    mostrarToast('success', 'Reporte generado', `Archivo CSV descargado: ${nombreReporte}_${fecha}.csv`);
}

// ===================================
// MANEJO DE IMÁGENES
// ===================================

function handleImageUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    // Validar que sea imagen
    if (!file.type.startsWith('image/')) {
        mostrarToast('error', 'Archivo inválido', 'Por favor selecciona una imagen');
        return;
    }
    
    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        mostrarToast('error', 'Archivo muy grande', 'La imagen debe ser menor a 5MB');
        return;
    }
    
    // Convertir a base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Image = e.target.result;
        
        // Guardar en el campo
        document.getElementById('productImage').value = base64Image;
        
        // Mostrar preview
        const preview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        previewImg.src = base64Image;
        preview.style.display = 'block';
        
        // Mostrar botón de quitar
        document.getElementById('clearImageBtn').style.display = 'inline-flex';
        
        mostrarToast('success', 'Imagen cargada', 'La foto se ha cargado correctamente');
    };
    
    reader.onerror = function() {
        mostrarToast('error', 'Error al cargar', 'No se pudo cargar la imagen');
    };
    
    reader.readAsDataURL(file);
    
    // Limpiar el input para permitir seleccionar la misma imagen nuevamente
    event.target.value = '';
}

function clearProductImage() {
    // Limpiar campo
    document.getElementById('productImage').value = '';
    
    // Ocultar preview
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('previewImg').src = '';
    
    // Ocultar botón de quitar
    document.getElementById('clearImageBtn').style.display = 'none';
    
    mostrarToast('info', 'Imagen eliminada', 'La foto ha sido eliminada');
}

// ===================================
// GESTIÓN DE CATEGORÍAS
// ===================================

function actualizarSelectoresCategorias() {
    // Actualizar datalist en el modal de producto
    const datalist = document.getElementById('categoriesList');
    if (datalist) {
        datalist.innerHTML = '';
        
        CATEGORIAS.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            datalist.appendChild(option);
        });
    }
    
    // Actualizar filtro de categorías
    actualizarFiltrosCategorias();
}

// ===================================
// VISTA DE CATEGORÍAS
// ===================================

function renderizarCategorias() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    // Calcular estadísticas por categoría
    const stats = {};
    CATEGORIAS.forEach(cat => {
        const prods = productos.filter(p => p.categoria === cat);
        stats[cat] = {
            cantidad: prods.length,
            valor: prods.reduce((sum, p) => sum + (p.precio * p.cantidad), 0),
            stockBajo: prods.filter(p => p.cantidad <= p.minStock).length
        };
    });
    
    grid.innerHTML = CATEGORIAS.map(cat => {
        const stat = stats[cat];
        return `
            <div class="report-card" onclick="mostrarProductosCategoria('${cat}')" style="cursor: pointer; transition: transform 0.2s;">
                <div class="report-icon" style="background: var(--color-primary-light); color: var(--color-primary);">
                    <i class="fas fa-tags"></i>
                </div>
                <div class="report-info">
                    <h3>${cat}</h3>
                    <div class="report-stats">
                        <p><strong>${stat.cantidad}</strong> productos</p>
                        <p>Valor: <strong>$${stat.valor.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</strong></p>
                        ${stat.stockBajo > 0 ? `<p style="color: var(--color-danger);"><i class="fas fa-exclamation-triangle"></i> ${stat.stockBajo} stock bajo</p>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Asegurar visibilidad correcta
    document.getElementById('categoriesGrid').style.display = 'grid';
    document.getElementById('categoryProductsContainer').style.display = 'none';
    document.getElementById('backToCategoriesBtn').style.display = 'none';
    document.getElementById('categoriasTitle').textContent = 'Categorías';
}

function mostrarProductosCategoria(categoria) {
    const container = document.getElementById('categoryProductsContainer');
    const grid = document.getElementById('categoryProductsGrid');
    const emptyState = document.getElementById('categoryEmptyState');
    
    if (!container || !grid) return;
    
    // Filtrar productos
    const productosCategoria = productos.filter(p => p.categoria === categoria);
    
    // Ocultar grid de categorías y mostrar contenedor de productos
    document.getElementById('categoriesGrid').style.display = 'none';
    container.style.display = 'block';
    document.getElementById('backToCategoriesBtn').style.display = 'inline-flex';
    document.getElementById('categoriasTitle').textContent = `Categoría: ${categoria}`;
    
    if (productosCategoria.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Usar el mismo formato de tarjeta que en la vista principal
    grid.innerHTML = productosCategoria.map(p => {
        const stockBajo = p.cantidad <= p.minStock;
        const valorTotal = p.precio * p.cantidad;
        const imagenHTML = p.imagen ? 
            `<img src="${p.imagen}" alt="${p.nombre}" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="product-image-placeholder" style="display:none;"><i class="fas fa-image"></i></div>` :
            `<div class="product-image-placeholder"><i class="fas fa-image"></i></div>`;
        
        return `
            <div class="product-card">
                ${imagenHTML}
                
                <div class="product-header">
                    <div>
                        <h3 class="product-title">${p.nombre}</h3>
                        <span class="product-sku">${p.sku}</span>
                    </div>
                </div>
                
                <div class="product-category">${p.categoria}</div>
                
                <div class="product-info">
                    <div class="info-row">
                        <span class="info-label">Precio unitario:</span>
                        <span class="info-value price">$${p.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Stock:</span>
                        <span class="info-value ${stockBajo ? 'low-stock' : ''}">
                            ${p.cantidad} unidades
                            ${stockBajo ? '<i class="fas fa-exclamation-triangle"></i>' : ''}
                        </span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Valor total:</span>
                        <span class="info-value">$${valorTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-secondary" onclick="editarProducto('${p.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger" onclick="eliminarProducto('${p.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function volverACategorias() {
    console.log('Volviendo a categorías...');
    const grid = document.getElementById('categoriesGrid');
    const container = document.getElementById('categoryProductsContainer');
    const btn = document.getElementById('backToCategoriesBtn');
    const title = document.getElementById('categoriasTitle');

    if (grid) grid.style.display = 'grid';
    if (container) container.style.display = 'none';
    if (btn) btn.style.display = 'none';
    if (title) title.textContent = 'Categorías';
    
    // Regenerar tarjetas de categorías por si hubo cambios
    renderizarCategorias();
}

// Asegurar que el evento esté asignado (por si acaso)
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('backToCategoriesBtn');
    if (btn) {
        btn.onclick = volverACategorias; // Asignación directa para evitar duplicados o fallos
    }
});
