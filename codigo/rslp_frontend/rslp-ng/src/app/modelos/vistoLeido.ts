import { Usuario } from './usuario';
import { Contenido } from './contenido';

export class VistoLeido {
    _id: string;
    usuario: Usuario;
    contenido: Contenido;
    recomienda: Boolean;
    createdAt: Date;
}
