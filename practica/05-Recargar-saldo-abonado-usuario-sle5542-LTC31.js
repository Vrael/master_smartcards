//
//*********LECTOR LTC31************
//
// 5.- Recarga saldo de cafeter�a
// Autores: 
// 	Marc Aguilar de Llorens
//	Francisco Burgos Vald�s
//

card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
print();


//***Lee mapa memoria completo poniendo 00 en el par�metro P3
//
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Leer la posici�n C0 de memoria 1 byte. Donde est� guardada la informaci�n del saldo
resp = card.plainApdu(new ByteString("00 B0 00 C0 01", HEX));
saldo = parseInt(resp.toString(16), 16);
print(resp);
print ("Saldo " + saldo + " euros");

//*** Recarga 10�
print("Se va a proceder a recargar 10 euros");
saldo = saldo + 10;
var formated2hexDigits = getHexValue(saldo);

//*** Presenta el PIN de la tarjeta para poder escribir
resp = card.plainApdu(new ByteString("00 20 00 00 03 FF FF FF", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Actualiza el saldo de la tarjeta con el nuevo saldo 
resp = card.plainApdu(new ByteString("00 D6 00 C0 01 " + formated2HexDigits, HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//***Lee mapa memoria completo poniendo 00 en el par�metro P3
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Leer el saldo actualizado
resp = card.plainApdu(new ByteString("00 B0 00 C0 01", HEX));
saldo = parseInt(resp.toString(16), 16);
print(resp);
print ("Saldo actualizado.Nuevo valor: " + saldo + " euros");


// Función adicional para obtener los valores HEX a almacenar en memoria
function getHexValue(value){

	formated2HexDigits = value.toString(16);
	formated2HexDigits = formated2HexDigits.length < 2? "0" + formated2HexDigits : formated2HexDigits;
	
	return formated2HexDigits;
}




