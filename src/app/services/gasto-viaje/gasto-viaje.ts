export class GastoViaje {
  id: number;
  id_orden: number;

  fechaIda: Date;
  fechaVuelta: Date;

  // Avion
  importeAvion: number;
  fotoAvion: string;

  // Coche
  nkilometros: number;
  precioKilometro: number;
  importeCoche: number;
  fotoCoche: string;

  // Tren
  importeTren: number;
  fotoTren: string;

  // Autobus
  importeAutobus: number;
  fotoAutobus: string;

  // Taxi
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

  // Itinerario
  itinerario: string;

	// Check transportes
  checkAgenciaAvion: boolean;
  checkAgenciaTren: boolean;
  checkAgenciaAlojamiento: boolean;
	otrosAgencia: string;
}
