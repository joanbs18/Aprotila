var provinciaSeleccionada;
var cantonSeleccionado;
var distritoSeleccionado;
var provinciaSeleccionadaU;
var cantonSeleccionadoU;
var distritoSeleccionadoU;

function habilitarCantones() {
  // Obtener elementos select
  var provinciaSelect = document.getElementById("provincia");
  var cantonSelect = document.getElementById("canton");
  var distritoSelect = document.getElementById("distrito");

  // Habilitar select de cantón
  cantonSelect.disabled = false;

  // Limpiar opciones anteriores
  cantonSelect.innerHTML = "";
  distritoSelect.innerHTML = "";

  // Obtener la provincia seleccionada
  var provincia = provinciaSelect.value;

  // Crear opciones de cantón según la provincia seleccionada
  if (provincia === "San José") {
    var cantonOptions = [
      "Elija un cantón",
      "San José",
      "Escazú",
      "Desamparados",
      "Puriscal",
      "Tarrazú",
      "Aserrí",
      "Mora",
      "Goicoechea",
      "Santa Ana",
      "Alajuelita",
      "Vásquez de Coronado",
      "Acosta",
      "Tibás",
      "Moravia",
      "Montes de Oca",
      "Turrubares",
      "Dota",
      "Curridabat",
      "Pérez Zeledón",
      "León Cortés Castro",
    ];
  } else if (provincia === "Alajuela") {
    var cantonOptions = [
      "Elija un cantón",
      "Alajuela",
      "San Ramón",
      "Grecia",
      "San Mateo",
      "Atenas",
      "Naranjo",
      "Palmares",
      "Poás",
      "Orotina",
      "San Carlos",
      "Zarcero",
      "Sarchí",
      "Upala",
      "Los Chiles",
      "Guatuso",
      "Río Cuarto",
    ];
  } else if (provincia === "Cartago") {
    var cantonOptions = [
      "Elija un cantón",
      "Cartago",
      "Paraíso",
      "La Unión",
      "Jiménez",
      "Turrialba",
      "Alvarado",
      "Oreamuno",
      "El Guarco",
    ];
  } else if (provincia === "Heredia") {
    var cantonOptions = [
      "Elija un cantón",
      "Heredia",
      "Barva",
      "Santo Domingo",
      "Santa Bárbara",
      "San Rafael",
      "San Isidro",
      "Belén",
      "Flores",
      "San Pablo",
      "Sarapiquí",
    ];
  } else if (provincia === "Guanacaste") {
    var cantonOptions = [
      "Elija un cantón",
      "Liberia",
      "Nicoya",
      "Santa Cruz",
      "Bagaces",
      "Carrillo",
      "Cañas",
      "Abangares",
      "Tilarán",
      "Nandayure",
      "La Cruz",
      "Hojancha",
    ];
  } else if (provincia === "Puntarenas") {
    var cantonOptions = [
      "Elija un cantón",
      "Puntarenas",
      "Esparza",
      "Buenos Aires",
      "Montes de Oro",
      "Osa",
      "Quepos",
      "Golfito",
      "Coto Brus",
      "Parrita",
      "Corredores",
      "Garabito",
    ];
  } else if (provincia === "Limón") {
    var cantonOptions = [
      "Elija un cantón",
      "Limón",
      "Pococí",
      "Siquirres",
      "Talamanca",
      "Matina",
      "Guácimo",
    ];
  }

  // Agregar opciones de cantón al select
  for (var i = 0; i < cantonOptions.length; i++) {
    var option = document.createElement("option");
    option.text = cantonOptions[i];
    cantonSelect.add(option);
  }

  // Mostrar opción por defecto en select de distrito
  var defaultOption = document.createElement("option");
  defaultOption.text = "Elija un distrito";
  distritoSelect.add(defaultOption);

  // Deshabilitar select de distrito
  distritoSelect.disabled = true;
}

function habilitarDistritos() {
  // Obtener elementos select
  var cantonSelect = document.getElementById("canton");
  var distritoSelect = document.getElementById("distrito");

  // Habilitar select de distrito
  distritoSelect.disabled = false;

  // Limpiar opciones anteriores
  distritoSelect.innerHTML = "";

  // Obtener el cantón seleccionado
  var canton = cantonSelect.value;

  // Crear opciones de distrito según el cantón seleccionado
  if (canton === "San José") {
    var distritoOptions = [
      "Carmen",
      "Merced",
      "Hospital",
      "Catedral",
      "Zapote",
      "San Francisco de Dos Ríos",
      "Uruca",
      "Mata Redonda",
      "Pavas",
      "Hatillo",
      "San Sebastián",
    ];
  } else if (canton === "Escazú") {
    var distritoOptions = ["Escazú", "San Antonio", "San Rafael"];
  } else if (canton === "Desamparados") {
    var distritoOptions = [
      "Desamparados",
      "San Miguel",
      "San Juan de Dios",
      "San Rafael Arriba",
      "San Antonio",
      "Frailes",
      "Patarra",
      "San Cristobal",
      "Rosario",
      "Damas",
      "San Rafael Abajo",
      "Gravilias",
      "Los Guido",
    ];
  } else if (canton === "Puriscal") {
    var distritoOptions = [
      "Santiago",
      "Mercedes Sur",
      "Barbacoas",
      "Grifo Alto",
      "San Rafael",
      "Candelarita",
      "Desamparaditos",
      "San Antonio",
      "Chires",
    ];
  } else if (canton === "Tarrazú") {
    var distritoOptions = ["San Marcos", "San Lorenzo", "San Carlos"];
  } else if (canton === "Aserrí") {
    var distritoOptions = [
      "Aserrí",
      "Tarbaca",
      "Vuelta de Jorco",
      "San Gabriel",
      "Legua",
      "Monterrey",
      "Salitrillos",
    ];
  } else if (canton === "Mora") {
    var distritoOptions = [
      "Colón",
      "Guayabo",
      "Tabarcia",
      "Piedras Negras",
      "Picagres",
      "Jaris",
      "Quitirrisí",
    ];
  } else if (canton === "Goicoechea") {
    var distritoOptions = [
      "Guadalupe",
      "San Francisco",
      "Calle Blancos",
      "Mata de Plátano",
      "Ipis",
      "Rancho Redondo",
      "Purral",
    ];
  } else if (canton === "Santa Ana") {
    var distritoOptions = [
      "Santa Ana",
      "Salitral",
      "Pozos",
      "Uruca",
      "Piedades",
      "Brasil",
    ];
  } else if (canton === "Alajuelita") {
    var distritoOptions = [
      "Alajuelita",
      "San Josecito",
      "San Antonio",
      "Concepción",
      "San Felipe",
    ];
  } else if (canton === "Vásquez de Coronado") {
    var distritoOptions = [
      "San Isidro",
      "San Rafael",
      "Dulce Nombre de Jesús",
      "Patalillo",
      "Cascajal",
    ];
  } else if (canton === "Acosta") {
    var distritoOptions = [
      "San Ignacio",
      "Guaitil",
      "Palmichal",
      "Cangrejal",
      "Sabanillas",
    ];
  } else if (canton === "Tibás") {
    var distritoOptions = [
      "San Juan",
      "Cinco Esquinas",
      "Anselmo Llorente",
      "León XIII",
      "Colima",
    ];
  } else if (canton === "Moravia") {
    var distritoOptions = ["San Vicente", "San Jerónimo", "La Trinidad"];
  } else if (canton === "Montes de Oca") {
    var distritoOptions = ["San Pedro", "Sabanilla", "Mercedes", "San Rafael"];
  } else if (canton === "Turrubares") {
    var distritoOptions = [
      "San Pablo",
      "San Pedro",
      "San Juan de Mata",
      "San Luis",
      "Carara",
    ];
  } else if (canton === "Dota") {
    var distritoOptions = ["Santa María", "Jardín", "Copey"];
  } else if (canton === "Curridabat") {
    var distritoOptions = ["Curridabat", "Granadilla", "Sánchez", "Tirrases"];
  } else if (canton === "Pérez Zeledón") {
    var distritoOptions = [
      "San Isidro de El General",
      "El General",
      "Daniel Flores",
      "Rivas",
      "San Pedro",
      "Platanares",
      "Pejibaye",
      "Cajón",
      "Barú",
      "Río Nuevo",
      "Paramo",
      "La Amistad",
    ];
  } else if (canton === "León Cortés Castro") {
    var distritoOptions = [
      "San Pablo",
      "San Andrés",
      "Llano Bonito",
      "San Isidro",
      "Santa Cruz",
      "San Antonio",
    ];
  } else if (canton === "Alajuela") {
    var distritoOptions = [
      "Alajuela",
      "San José",
      "Carrizal",
      "San Antonio",
      "Guácima",
      "San Isidro",
      "Sabanilla",
      "San Rafael",
      "Río Segundo",
      "Desamparados",
      "Turrucares",
      "Tambor",
      "Garita",
      "Sarapiquí",
    ];
  } else if (canton === "San Ramón") {
    var distritoOptions = [
      "San Ramón",
      "Santiago",
      "San Juan",
      "Piedades Norte",
      "Piedades Sur",
      "San Rafael",
      "San Isidro",
      "Ángeles",
      "Alfaro",
      "Volio",
      "Concepción",
      "Zapotal",
      "Peñas Blancas",
      "San Lorenzo",
    ];
  } else if (canton === "Grecia") {
    var distritoOptions = [
      "Grecia",
      "San Isidro",
      "San José",
      "San Roque",
      "Tacares",
      "Puente de Piedra",
      "Bolivar",
    ];
  } else if (canton === "San Mateo") {
    var distritoOptions = ["San Mateo", "Desmonte", "Jesús María", "Labrador"];
  } else if (canton === "Atenas") {
    var distritoOptions = [
      "Atenas",
      "Jesús",
      "Mercedes",
      "San Isidro",
      "Concepción",
      "San José",
      "Santa Eulalia",
      "Escobal",
    ];
  } else if (canton === "Naranjo") {
    var distritoOptions = [
      "Naranjo",
      "San Miguel",
      "San José",
      "Cirrí Sur",
      "San Jerónimo",
      "San Juan",
      "El Rosario",
      "Palmitos",
    ];
  } else if (canton === "Palmares") {
    var distritoOptions = [
      "Palmares",
      "Zaragoza",
      "Buenos Aires",
      "Santiago",
      "Candelaria",
      "Esquipulas",
      "La Granja",
    ];
  } else if (canton === "Poás") {
    var distritoOptions = [
      "San Pedro",
      "San Juan",
      "San Rafael",
      "Carrillos",
      "Sabana Redonda",
    ];
  } else if (canton === "Orotina") {
    var distritoOptions = [
      "Orotina",
      "El Mastate",
      "Hacienda Vieja",
      "Coyolar",
      "La Ceiba",
    ];
  } else if (canton === "San Carlos") {
    var distritoOptions = [
      "Quesada",
      "Florencia",
      "Buenavista",
      "Aguas Zarcas",
      "Venecia",
      "Pital",
      "La Fortuna",
      "La Tigra",
      "La Palmera",
      "Venado",
      "Cutris",
      "Monterrey",
      "Pocosol",
    ];
  } else if (canton === "Zarcero") {
    var distritoOptions = [
      "Zarcero",
      "Laguna",
      "Tapesco",
      "Guadalupe",
      "Palmira",
      "Zapote",
      "Brisas",
    ];
  } else if (canton === "Sarchí") {
    var distritoOptions = [
      "Sarchí Norte",
      "Sarchí Sur",
      "Toro Amarillo",
      "San Pedro",
      "Rodríguez",
    ];
  } else if (canton === "Upala") {
    var distritoOptions = [
      "Upala",
      "Aguas Claras",
      "San José (Pizote)",
      "Bijagua",
      "Delicias",
      "Dos Ríos",
      "Yolillal",
      "Canalete",
    ];
  } else if (canton === "Los Chiles") {
    var distritoOptions = [
      "Los Chiles",
      "Caño Negro",
      "El Amparo",
      "San Jorge",
    ];
  } else if (canton === "Guatuso") {
    var distritoOptions = ["San Rafael", "Buenavista", "Cote", "Katira"];
  } else if (canton === "Río Cuarto") {
    var distritoOptions = ["Río Cuarto", "Santa Rita", "Santa Isabel"];
  } else if (canton === "Cartago") {
    var distritoOptions = [
      "Oriental",
      "Occidental",
      "Carmen",
      "San Nicolás",
      "Aguacaliente (San Francisco)",
      "Guadalupe o Arenilla",
      "Corralillo",
      "Tierra Blanca",
      "Dulce Nombre",
      "Llano Grande",
      "Quebradilla",
    ];
  } else if (canton === "Paraíso") {
    var distritoOptions = [
      "Paraíso",
      "Santiago",
      "Orosi",
      "Cachí",
      "Llanos de Santa Lucía",
    ];
  } else if (canton === "La Unión") {
    var distritoOptions = [
      "Tres Ríos",
      "San Diego",
      "San Juan",
      "San Rafael",
      "Concepción",
      "Dulce Nombre",
      "San Ramón",
      "Río Azul",
    ];
  } else if (canton === "Jiménez") {
    var distritoOptions = ["Juan Viñas", "Tucurrique", "Pejibaye"];
  } else if (canton === "Turrialba") {
    var distritoOptions = [
      "Turrialba",
      "La Suiza",
      "Peralta",
      "Santa Cruz",
      "Santa Teresita",
      "Pavones",
      "Tuis",
      "Tayutic",
      "Santa Rosa",
      "Tres Equis",
      "La Isabel",
      "Chirripó",
    ];
  } else if (canton === "Alvarado") {
    var distritoOptions = ["Pacayas", "Cervantes", "Capellades"];
  } else if (canton === "Oreamuno") {
    var distritoOptions = [
      "San Rafael",
      "Cot",
      "Potrero Cerrado",
      "Cipreses",
      "Santa Rosa",
    ];
  } else if (canton === "El Guarco") {
    var distritoOptions = ["El Tejar", "San Isidro", "Tobosi", "Patio de Agua"];
  } else if (canton === "Heredia") {
    var distritoOptions = [
      "Heredia",
      "Mercedes",
      "San Francisco",
      "Ulloa",
      "Varablanca",
    ];
  } else if (canton === "Barva") {
    var distritoOptions = [
      "Barva",
      "San Pedro",
      "San Pablo",
      "San Roque",
      "Santa Lucía",
      "San José de la Montaña",
    ];
  } else if (canton === "Santo Domingo") {
    var distritoOptions = [
      "Santo Domingo",
      "San Vicente",
      "San Miguel",
      "Paracito",
      "Santo Tomás",
      "Santa Rosa",
      "Tures",
      "Pará",
    ];
  } else if (canton === "Santa Bárbara") {
    var distritoOptions = [
      "Santa Bárbara",
      "San Pedro",
      "San Juan",
      "Jesús",
      "Santo Domingo",
      "Purabá",
    ];
  } else if (canton === "San Rafael") {
    var distritoOptions = [
      "San Rafael",
      "San Josecito",
      "Santiago",
      "Ángeles",
      "Concepción",
    ];
  } else if (canton === "San Isidro") {
    var distritoOptions = [
      "San Isidro",
      "San José",
      "Concepción",
      "San Francisco",
    ];
  } else if (canton === "Belén ") {
    var distritoOptions = ["San Antonio", "La Ribera", "La Asunción"];
  } else if (canton === "Flores ") {
    var distritoOptions = ["San Joaquín", "Barrantes", "Llorente"];
  } else if (canton === "San Pablo") {
    var distritoOptions = ["San Pablo", "Rincón de Sabanilla"];
  } else if (canton === "Sarapiquí") {
    var distritoOptions = [
      "Puerto Viejo",
      "La Virgen",
      "Las Horquetas",
      "Llanuras del Gaspar",
      "Cureña",
    ];
  } else if (canton === "Liberia") {
    var distritoOptions = [
      "Liberia",
      "Cañas Dulces",
      "Mayorga",
      "Nacascolo",
      "Curubandé",
    ];
  } else if (canton === "Nicoya") {
    var distritoOptions = [
      "Nicoya",
      "Mansión",
      "San Antonio",
      "Quebrada Honda",
      "Sámara",
      "Nosara",
      "Belén de Nosarita",
    ];
  } else if (canton === "Santa Cruz") {
    var distritoOptions = [
      "Santa Cruz",
      "Bolsón",
      "Veintisiete de Abril",
      "Tempate",
      "Cartagena",
      "Cuajiniquil",
      "Diriá",
      "Cabo Velas",
      "Tamarindo",
    ];
  } else if (canton === "Bagaces") {
    var distritoOptions = ["Bagaces", "La Fortuna", "Mogote", "Río Naranjo"];
  } else if (canton === "Carrillo") {
    var distritoOptions = ["Filadelfia", "Palmira", "Sardinal", "Belén"];
  } else if (canton === "Cañas") {
    var distritoOptions = [
      "Cañas",
      "Palmira",
      "San Miguel",
      "Bebedero",
      "Porozal",
    ];
  } else if (canton === "Abangares") {
    var distritoOptions = ["Las Juntas", "Sierra", "San Juan", "Colorado"];
  } else if (canton === "Tilarán") {
    var distritoOptions = [
      "Tilarán",
      "Quebrada Grande",
      "Tronadora",
      "Santa Rosa",
      "Líbano",
      "Tierras Morenas",
      "Arenal",
      "Cabeceras",
    ];
  } else if (canton === "Nandayure") {
    var distritoOptions = [
      "Carmona",
      "Santa Rita",
      "Zapotal",
      "San Pablo",
      "Porvenir",
      "Bejuco",
    ];
  } else if (canton === "La Cruz") {
    var distritoOptions = [
      "La Cruz",
      "Santa Cecilia",
      "La Garita",
      "Santa Elena",
    ];
  } else if (canton === "Hojancha") {
    var distritoOptions = [
      "Hojancha",
      "Monte Romo",
      "Puerto Carrillo",
      "Huacas",
      "Matambú",
    ];
  } else if (canton === "Puntarenas") {
    var distritoOptions = [
      "Puntarenas",
      "Pitahaya",
      "Chomes",
      "Lepanto",
      "Paquera",
      "Manzanillo",
      "Guacimal",
      "Barranca",
      "Monte Verde",
      "Isla del Coco",
      "Cóbano",
      "Chacarita",
      "Chira",
      "Acapulco",
      "El Roble",
      "Arancibia",
    ];
  } else if (canton === "Esparza") {
    var distritoOptions = [
      "Espíritu Santo",
      "San Juan Grande",
      "Macacona",
      "San Rafael",
      "San Jerónimo",
      "Caldera",
    ];
  } else if (canton === "Buenos Aires") {
    var distritoOptions = [
      "Buenos Aires",
      "Volcán",
      "Potrero Grande",
      "Boruca",
      "Pilas",
      "Colinas",
      "Chánguena",
      "Biolley",
      "Brunka",
    ];
  } else if (canton === "Montes de Oro") {
    var distritoOptions = ["Miramar", "La Unión", "San Isidro"];
  } else if (canton === "Osa") {
    var distritoOptions = [
      "Puerto Cortés",
      "Palmar",
      "Sierpe",
      "Bahía Ballena",
      "Piedras Blancas",
      "Bahía Drake",
    ];
  } else if (canton === "Quepos") {
    var distritoOptions = ["Quepos", "Savegre", "Naranjito"];
  } else if (canton === "Golfito") {
    var distritoOptions = ["Golfito", "Puerto Jiménez", "Guaycará", "Pavón"];
  } else if (canton === "Coto Brus") {
    var distritoOptions = [
      "San Vito",
      "Sabalito",
      "Aguabuena",
      "Limoncito",
      "Pittier",
      "Gutiérrez Braun",
    ];
  } else if (canton === "Parrita") {
    var distritoOptions = ["Parrita"];
  } else if (canton === "Corredores") {
    var distritoOptions = ["Corredor", "La Cuesta", "Canoas", "Laurel"];
  } else if (canton === "Garabito") {
    var distritoOptions = ["Jacó", "Tárcoles"];
  } else if (canton === "Limón") {
    var distritoOptions = [
      "Limón",
      "Valle La Estrella",
      "Río Blanco",
      "Matama",
    ];
  } else if (canton === "Pococí") {
    var distritoOptions = [
      "Guápiles",
      "Jiménez",
      "Rita",
      "Roxana",
      "Cariari",
      "Colorado",
      "La Colonia",
    ];
  } else if (canton === "Siquirres") {
    var distritoOptions = [
      "Siquirres",
      "Pacuarito",
      "Florida",
      "Germania",
      "El Cairo",
      "Alegría",
      "Reventazón",
    ];
  } else if (canton === "Talamanca") {
    var distritoOptions = ["Bratsi", "Sixaola", "Cahuita", "Telire"];
  } else if (canton === "Matina") {
    var distritoOptions = ["Matina", "Batán", "Carrandí"];
  } else if (canton === "Guácimo") {
    var distritoOptions = [
      "Guácimo",
      "Mercedes",
      "Pocora",
      "Río Jiménez",
      "Duacarí",
    ];
  }
  // Agregar opciones de distrito al select
  for (var i = 0; i < distritoOptions.length; i++) {
    var option = document.createElement("option");
    option.text = distritoOptions[i];
    distritoSelect.add(option);
  }
  // Obtener los elementos select
  var provinciaSelect = document.getElementById("provincia");
  var cantonSelect = document.getElementById("canton");
  var distritoSelect = document.getElementById("distrito");

  // Obtener los valores seleccionados
  provinciaSeleccionada = provinciaSelect.value;
  cantonSeleccionado = cantonSelect.value;
  distritoSeleccionado = distritoSelect.value;

  // Hacer algo con los valores seleccionados
  console.log("Provincia seleccionada: " + provinciaSeleccionada);
  console.log("Cantón seleccionado: " + cantonSeleccionado);
  console.log("Distrito seleccionado: " + distritoSeleccionado);
}

