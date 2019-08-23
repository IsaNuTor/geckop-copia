import { Gasto } from '../gasto/gasto';


export class Orden {
  id: number;
  acron_id: string;
  numeracion: number;
  acronimo: string;
  estado: string;
  nif_usuario: string;
  fechaOrden: Date;
  num_contabilidad: string;
  memoria: string;
  relacion: string;
  nif_acreedor: string
  gastos: Array<Gasto> = [];
}
