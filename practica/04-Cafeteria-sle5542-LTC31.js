//
//*********LECTOR LTC31************
//
// 4.- Consumición en cafetería
// Autores: 
// 	Marc Aguilar de Llorens
//	Francisco Burgos Valdés
//

card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
print();


//***Lee mapa memoria completo poniendo 00 en el parámetro P3
//
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();

// Importe consumicion
consumicion = 10;
i = 0;
//*** Se simulan varias compras consecutivas de 10 euros
do {
	//*** Lee la posición C0 de memoria 1 byte. Donde está guardada la información del saldo
	resp = card.plainApdu(new ByteString("00 B0 00 C0 01", HEX));
	saldo = parseInt(resp.toString(16), 16);
	print(resp);
	print ("Saldo " + saldo + " euros");

	print("Se va a proceder una compra (" + i + ")  de: "+ consumicion);
	balance = saldo - consumicion;

	if (balance < 0) {
		print ("no tienes suficiente saldo");
	}
	else{
		balanceHex =  balance.toString(16);
		print("balanceHex "+ balanceHex);
		
		formated2HexDigits = balance.toString(16);
		print("Formated2HexDigits " + formated2HexDigits);
		print(formated2HexDigits);
		formated2HexDigits = formated2HexDigits.length < 2? "0" + formated2HexDigits : formated2HexDigits;
		print(formated2HexDigits);	
		
		//*** Presenta el PIN de la tarjeta para poder escribir
		resp = card.plainApdu(new ByteString("00 20 00 00 03 FF FF FF", HEX));
		print(resp);
		print("Código SW: " + card.SW.toString(16));
		print();
		
		//*** Actualiza el saldo de la tarjeta
		resp = card.plainApdu(new ByteString("00 D6 00 C0 01 " + formated2HexDigits, HEX));
		print(resp);
		print("Código SW: " + card.SW.toString(16));
		print();
	}
	i++;
} while(saldo > 0)

//***Lee mapa memoria completo poniendo 00 en el parámetro P3
//
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();





