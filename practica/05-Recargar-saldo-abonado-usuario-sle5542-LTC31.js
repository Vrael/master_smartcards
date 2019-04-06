//
//*********LECTOR LTC31************
//
// 5.- Recarga saldo de cafetería
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

//*** Leer la posición C0 de memoria 1 byte. Donde está guardada la información del saldo
resp = card.plainApdu(new ByteString("00 B0 00 C0 01", HEX));
saldo = parseInt(resp.toString(16), 16);
print(resp);
print ("Saldo " + saldo + " euros");

//*** Recarga 10€
print("Se va a proceder a recargar 10 euros");
saldo = saldo + 10;

formated2HexDigits = saldo.toString(16);
print("Formated2HexDigits " + formated2HexDigits);
print(formated2HexDigits);
formated2HexDigits = formated2HexDigits.length < 2? "0" + formated2HexDigits : formated2HexDigits;
print(formated2HexDigits);	

//*** Presenta el PIN de la tarjeta para poder escribir
resp = card.plainApdu(new ByteString("00 20 00 00 03 FF FF FF", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();

//*** Actualiza el saldo de la tarjeta con el nuevo saldo 
resp = card.plainApdu(new ByteString("00 D6 00 C0 01 " + formated2HexDigits, HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();

//***Lee mapa memoria completo poniendo 00 en el parámetro P3
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();





