//
//*********LECTOR LTC31************
// PROGRAMA DE ACCESO A LA SALA 2
//
//


card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
print();

//*** Lee mapa memoria completo poniendo 00 en el parámetro P3
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();

//*** Presenta el PIN de la tarjeta para poder escribir
resp = card.plainApdu(new ByteString("00 20 00 00 03 FF FF FF", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();

//***Leer la posición 90 de memoria 1 byte. Donde está guardada la información de acceso
resp = card.plainApdu(new ByteString("00 B0 00 90 01", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();

if(resp == "02") {
	print("Bienvenido a la Sala 2");
	
	// Leer contador de accesos
	resp = card.plainApdu(new ByteString("00 B0 00 D1 01", HEX));
	print(resp);
	print("Código SW: " + card.SW.toString(16));
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
	print("Código SW: " + card.SW.toString(16));
	print();
	
	// Escribir incremento en el contador de accesos correctos
	countAccess++;
	print("Count Access: " + countAccess);
	if (countAccess > 16){
		countAccess == 0;
	}
	formated2HexDigits = countAccess.toString(16);
	print("Formated2HexDigits " + formated2HexDigits)
	print(formated2HexDigits)
	formated2HexDigits = formated2HexDigits.length < 2? "0" + formated2HexDigits : formated2HexDigits;
	print("00 D6 00 D1 01 " + formated2HexDigits)
	resp = card.plainApdu(new ByteString("00 D6 00 D1 01 " + formated2HexDigits, HEX));
	print(resp);
	print("Código SW: " + card.SW.toString(16));
	print();
		
} else {
	print("Acceso denegado.\n Su nivel de acceso es " + resp + " y necesita un nivel 2 para entrar.")
	
	// Leer contador de fallos de sala 2
	resp = card.plainApdu(new ByteString("00 B0 00 D0 01", HEX));
	print(resp);
	print("Código SW: " + card.SW.toString(16));
	print();
	
	if(resp == "FF") {
		print("Número máximo de intentos de acceso incorrectos alcanzado.")
	} else {
		failCountAccess = parseInt(resp.toString(HEX),16);
		failCountAccess++;
		print ("failCountAccess :" + failCountAccess);
		
		// Incrementa el contador de acceso incrementado en 1
		print("Incrementando contador de errores de acceso");
		formated2HexDigits = failCountAccess.toString(16);
		print("Formated2HexDigits " + formated2HexDigits);
		print(formated2HexDigits);
		formated2HexDigits = formated2HexDigits.length < 2? "0" + formated2HexDigits : formated2HexDigits;
		print(formated2HexDigits);	
		
		// Escribe el contador en la tarjeta
		resp = card.plainApdu(new ByteString("00 D6 00 D0 01 " + formated2HexDigits, HEX));
		print(resp);
		print("Código SW: " + card.SW.toString(16));
		print();
		
		if(failCountAccess > 5) {
			print("Se envía un mensaje de alerta al operador.");
			print();
		}
	}
}

//*** Lee mapa memoria completo poniendo 00 en el parámetro P3
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();
