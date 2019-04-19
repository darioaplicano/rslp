import { Usuario } from './usuario';
import { Contenido } from './contenido';

export class Resena {
    _id: string;
    comentario: string;
    valoracion: string;
    usuario: Usuario;
    contenido: Contenido;
}
