//
//*********LECTOR LTC31************
//
// 3.- Control de acceso a la Sala2
// Autores: 
// 	Marc Aguilar de Llorens
//	Francisco Burgos Vald�s
//

card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
print();

//*** Lee mapa memoria completo poniendo 00 en el par�metro P3
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Presenta el PIN de la tarjeta para poder escribir
resp = card.plainApdu(new ByteString("00 20 00 00 03 FF FF FF", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//***Lee la posici�n 90 de memoria 1 byte. Donde est� guardada la informaci�n de acceso
resp = card.plainApdu(new ByteString("00 B0 00 90 01", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

if(resp == "02") {
	print("Bienvenido a la Sala 2");
	
	// Leer contador de accesos
	resp = card.plainApdu(new ByteString("00 B0 00 D1 01", HEX));
	print(resp);
	print("C�digo SW: " + card.SW.toString(16));
	print();
	
	firstPosition = new ByteString("A0", HEX);
	firstPositionInt = parseInt(firstPosition.toString(HEX),16);
	countAccess = parseInt(resp.toString(HEX),16);
	newPositionMemory = firstPositionInt + countAccess;
	formated2Hex = newPositionMemory.toString(16);
	
	// Escribir la hora de acceso: 08 AM
	print("Son las 8:00 AM. Registrando entrada");
	resp = card.plainApdu(new ByteString("00 D6 00 " + formated2Hex + " 01 08", HEX));
	print(resp);
	print("C�digo SW: " + card.SW.toString(16));
	print();
	
	// Escribir incremento en el contador de accesos correctos
	countAccess++;
	print("Count Access: " + countAccess);
	if (countAccess > 16){
		countAccess == 0;
	}
	
	formated2hexDigits = getHexValue(countAccess);
	resp = card.plainApdu(new ByteString("00 D6 00 D1 01 " + formated2HexDigits, HEX));
	print(resp);
	print("C�digo SW: " + card.SW.toString(16));
	print();
		
} else {
	print("Acceso denegado.\n Su nivel de acceso es " + resp + " y necesita un nivel 2 para entrar.")
	
	// Lee contador de fallos de la sala 2
	resp = card.plainApdu(new ByteString("00 B0 00 D0 01", HEX));
	print(resp);
	print("C�digo SW: " + card.SW.toString(16));
	print();
	
	if(resp == "FF") {
		print("N�mero m�ximo de intentos de acceso incorrectos alcanzado.")
	} else {
		failCountAccess = parseInt(resp.toString(HEX),16);
		
		// Incrementa el contador de acceso incrementado en 1
		print("Incrementando contador de errores de acceso");
		failCountAccess++;
		print ("failCountAccess :" + failCountAccess);
		
		formated2hexDigits = getHexValue(failCountAccess);
		
		// Escribe el contador en la tarjeta
		resp = card.plainApdu(new ByteString("00 D6 00 D0 01 " + formated2HexDigits, HEX));
		print(resp);
		print("C�digo SW: " + card.SW.toString(16));
		print();
		
		if(failCountAccess > 5) {
			print("Se env�a un mensaje de alerta al operador.");
			print();
		}
	}
}

//*** Lee mapa memoria completo poniendo 00 en el par�metro P3
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();


// Función adicional para obtener los valores HEX a almacenar en memoria
function getHexValue(value){

	formated2HexDigits = value.toString(16);
	formated2HexDigits = formated2HexDigits.length < 2? "0" + formated2HexDigits : formated2HexDigits;
	
	return formated2HexDigits;
}
