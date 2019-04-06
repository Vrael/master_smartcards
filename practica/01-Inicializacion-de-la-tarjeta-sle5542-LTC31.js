//
//*********LECTOR LTC31************
//
//
// SE INICIALIZA LA TARJETA CON LOS DATOS DEL USUARIO AL QUE SE LE VA A ENTREGAR
// SALDO DE 30�

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

//*** Presenta el PIN de la tarjeta para poder escribir
resp = card.plainApdu(new ByteString("00 20 00 00 03 FF FF FF", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Inicializa el nombre del usuario (Juan) a partir de la posici�n 80 de memoria
resp = card.plainApdu(new ByteString("00 D6 00 80 04 4A 75 61 6E", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Inicializa el saldo de la tarjeta a 30� (1E)
resp = card.plainApdu(new ByteString("00 D6 00 C0 01 1E", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Inicializa el nivel de acceso a 0 en la posici�n 90 de memoria
resp = card.plainApdu(new ByteString("00 D6 00 90 01 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Inicializa el contador de fallos de acceso a la sala 2
resp = card.plainApdu(new ByteString("00 D6 00 D0 01 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();


//*** Inicializa el contador de acceso a la sala2 a 0. 
resp = card.plainApdu(new ByteString("00 D6 00 D1 01 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//*** Inicializa el hist�rico de accesos a 0.
resp = card.plainApdu(new ByteString("00 D6 00 A0 10 FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF FF", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();

//***Lee mapa memoria completo poniendo 00 en el par�metro P3
//
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("C�digo SW: " + card.SW.toString(16));
print();
