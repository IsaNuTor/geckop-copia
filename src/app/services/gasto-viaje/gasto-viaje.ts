export class GastoViaje {
  id: number;
  id_orden: number;

  fechaIda: Date;
  fechaVuelta: Date;

  // Avion
  avion: string;
  importeAvion: number;
  fotoAvion: string;

  // Coche
  nkilometros: number;
  precioKilometro: number;
  importeCoche: number;
  fotoCoche: string;

  // Tren
  tren: string;
  importeTren: number;
  fotoTren: string;

  // Autobus
  autobus: string;
  importeAutobus: number;
  fotoAutobus: string;

  // Taxi
  taxi: string;
  importeTaxi: number;
  fotoTaxi: string;

  // Otros
  otros: string;
  importeOtros: number;
  fotoOtros: string;

  // Hotel
  importeHotel: number;
  fotoHotel: string;

  // Manutencion
  nDietas: number;
  precioDieta: number;
  importeDietas: number;

  // Otros gastos
  importeOtrosGastos: number;
  fotoOtrosGastos: string;

  // Importe total
  importeTotal: number;
}
