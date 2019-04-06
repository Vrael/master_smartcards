//
//*********LECTOR LTC31************
//
//
//PROGRAMA QUE MUESTRA COMO SE DEFINE EL OBJETO CARD
//COMO SE RESETEA LA CARD POR SOFTWARE Y PRESENTA EL ATR
//LEE UNA ZONA DE MEMORIA DE LA TARJETA SLE-5542
//A PARTIR DE LA POSICIÓN 08 LEE 7 OCTETOS
//MUESTRA EN PANTALLA EL CONTENIDO
//
//LEE EL MAPA DE MEMORIA COMPLETO DE LA CARD
//
card = new Card();
atr = card.reset(Card.RESET_COLD);
print(atr);
print();
//
//
//***Lee 7 octetos a partir de la posición 08
resp = card.plainApdu(new ByteString("00 B0 00 08 07", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();
//***Lee mapa memoria completo poniendo 00 en el parámetro P3
//
resp = card.plainApdu(new ByteString("00 B0 00 00 00", HEX));
print(resp);
print("Código SW: " + card.SW.toString(16));
print();