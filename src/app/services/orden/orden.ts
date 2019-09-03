import { Gasto } from '../gasto/gasto';


export class Orden {
  id: number;
  acron_id: string;
  tipo: string;
  nif_IP: string;
  iban: string;

  acronimo: string;
  numeracion: number;
  estado: string;
  nif_user: string;

  fechaOrden: Date;
  num_contabilidad: string;
  concepto: string;
  memoria: string;
  relacion: string;
  nif_acreedor: string;
  observaciones: string;
}
