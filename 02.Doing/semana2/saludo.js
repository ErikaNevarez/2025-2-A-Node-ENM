// esto fue lo primero que escribimos en clase:  export default function saludar(nombre, edad){
//    let msj=""; 
//    if (edad=>18){
//        msj=`Hola ${nombre} tienes ${edad} años de edad y eres mayor de edad`; 
//    } else{
//        msj=`Hola ${nombre} tienes ${edad} años de edad y eres menor de edad`;
//    }
//
// return msj; 
//    }


// esto es lo ultimo que escribio el profe en la clase: 

export default function saludar(nombre, edad) {
  if (edad < 18) {
    return "Eres menor de edad";
  } if (edad < 30) {
    return "Estas en tus mejores años"
  } if (edad < 60) {
    return "Con experiencia y juventud"
  } else {
    return "Sabiduría acumulada"
  }
}
