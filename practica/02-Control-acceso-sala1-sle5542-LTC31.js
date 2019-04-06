//
//*********LECTOR LTC31************
//
// PROGRAMA DE ACCESO A LA SALA1
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

//***Leer la posici�n 90 de memoria 1 byte. Donde est� guardada la informaci�n de acceso
//
resp = card.plainApdu(new ByteString("00 B0 00 90 01", HEX));
print(resp);
if(resp == "01" || resp == "02") {
	print("Bienvenido a la Sala 1");
} else {
	print("Acceso denegado.\n Su nivel de acceso es 0 y necesita un nivel 1 o superior para entrar.")
}
