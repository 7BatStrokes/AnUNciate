function Help(str: String) {
    let list_of_Funcs= ["str2hsh"]

    if (str== "all") {
        return(console.log(list_of_Funcs))
    } else if (str== "str2hsh") {
        return(console.log("Turns String into Hash"))
    } else if ("updateUser"){
        console.log("Updates User info, if piece of info is not being updated you can write is a undefined, ex: func(x,y,undefined,z)")

    } else if ("createPublication"){
        console.log("Creates Publication")

    } else if ("updatePublication"){
        console.log("Updates Pub info, if piece of info is not being updated you can write is a undefined, ex: func(x,y,undefined,z")
    } else if ("closePublication"){
        console.log("Will change Pub state to 0 or INACTIVE")
    }
}

/*type Category = [string, string];
      
const database: Category[] = [
    ["Accesorios para Vehículos", "Todo tipo de accesorios para vehículos, desde partes de automóviles hasta herramientas de mantenimiento."],
    ["Agro", "Productos relacionados con la agricultura y el sector agropecuario."],
    ["Alimentos y Bebidas", "Productos comestibles y bebidas de todo tipo."],
    ["Animales y Mascotas", "Artículos para el cuidado y bienestar de animales domésticos."],
    ["Antiguedades y Colecciones", "Objetos antiguos y coleccionables de interés histórico."],
    ["Arte, Papelería y Mercería", "Productos relacionados con el arte, la papelería y mercería."],
    ["Belleza y Cuidado Personal", "Productos y servicios para el cuidado personal y belleza."],
    ["Bebés", "Productos para bebés, desde ropa hasta artículos de cuidado."],
    ["Boletas para Espectáculos", "Venta de boletas para eventos y espectáculos."],
    ["Cámaras y Accesorios", "Cámaras fotográficas y accesorios relacionados."],
    ["Carros, Motos y Otros", "Venta de vehículos y accesorios relacionados."],
    ["Celulares y Teléfonos", "Teléfonos móviles y accesorios."],
    ["Computación", "Equipos de cómputo, laptops, accesorios y software."],
    ["Trabajos", "Ofertas y solicitudes de empleo y servicios profesionales."],
    ["Consolas y Videojuegos", "Consolas de videojuegos y videojuegos."],
    ["Construcción", "Materiales de construcción y herramientas para proyectos de construcción."],
    ["Deportes y Fitness", "Equipamiento deportivo, ropa y accesorios para actividades físicas."],
    ["Electrodomésticos", "Electrodomésticos para el hogar, como lavadoras, refrigeradoras, etc."],
    ["Electrónica, Audio y Video", "Productos electrónicos, audio y video para el entretenimiento."],
    ["Herramientas", "Herramientas manuales y eléctricas para diversas tareas."],
    ["Hogar y Muebles", "Mobiliario y artículos para el hogar y la decoración."],
    ["Inmuebles", "Compra, venta y alquiler de propiedades inmobiliarias."],
    ["Juegos y Juguetes", "Juegos y juguetes para todas las edades."],
    ["Instrumentos Musicales", "Instrumentos musicales y accesorios para músicos."],
    ["Libros, Revistas y Cómics", "Libros, revistas y cómics de diversas categorías."],
    ["Música, Películas y Series", "CDs, DVDs, y Blu-rays de música, películas y series."],
    ["Artesanías", "Productos artesanales y hechos a mano."],
    ["Recuerdos, Piñatería y Fiestas", "Recuerdos, piñatas y artículos para fiestas y celebraciones."],
    ["Relojes y Joyas", "Relojes, joyería y accesorios relacionados."],
    ["Ropa y Accesorios", "Moda y accesorios para todas las edades y estilos."],
    ["Salud y Equipamiento Médico", "Productos relacionados con la salud, cuidado personal y equipamiento médico."],
    ["Servicios", "Categoría que incluye servicios diversos como consultoría, diseño, programación, etc."],
  ];
  
for (let i = 0; i < database.length; i++) {
    let x= database[i];
    Funcs.createCategory(x[0], x[1])
} */

export default Help;