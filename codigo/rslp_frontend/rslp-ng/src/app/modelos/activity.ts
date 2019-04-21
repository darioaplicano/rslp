import { VerLeer } from './verLeer';
import { VistoLeido } from './vistoLeido';
import { Seguir } from './seguir';

export class Activity {
    tipo: string;
    contenido: VerLeer|VistoLeido|Seguir;
}