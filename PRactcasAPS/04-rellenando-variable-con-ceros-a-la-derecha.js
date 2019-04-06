//PROGRAMA PARA RELLENAR UNA VARIABLE CON CEROS A LA 
//DERECHA HASTA UN VALOR DETERMINADO
//
// 
habitacion = new ByteString("5320", ASCII);
print(habitacion);
fechaentrada = new ByteString("25022015", ASCII);
print(fechaentrada);
fechasalida = new ByteString("28022015", ASCII);
print(fechasalida);
nombre = new ByteString("Alumno", ASCII);
apellido1 = new ByteString("Aplicado", ASCII);
apellido2 = new ByteString("Tarjetas", ASCII);
espacio = new ByteString("20", HEX);
print(nombre);
print(apellido1);
print(apellido2);
//
grabartarjeta = habitacion.concat(fechaentrada).concat(fechasalida).concat(nombre).concat(espacio).concat(apellido1).concat(espacio).concat(apellido2);
print(grabartarjeta);
print("Longitud del mensaje inicial a grabar en la tarjeta: " +   + grabartarjeta.length + " octetos");
print();
//
//HAY QUE RELLENAR HASTA 80 QUE SON LOS QUE HAY QUE CIFRAR PARA GRABARLOS EN LA TARJETA
// VAMOS A RELENAR CON CEROS A LA DERECHA PARA OBTENER LOS 80.
//
ochenta = 80;
var resta = ochenta - grabartarjeta.length;
//resta son los octetos que faltan por rellenar
print("Faltan por rellenar a ceros: " +  + resta);
print();
faltan = ByteString.valueOf(0, resta);
//valueOf genera un ByteString del primer parámetro y del número de octetos del segundo parámetro
//ver documentación.
print(faltan);
//
finalgrabartarjeta = grabartarjeta.concat(faltan);
print(finalgrabartarjeta);
print("Longitud total a grabar en la tarjeta:  " +  + finalgrabartarjeta.length);



