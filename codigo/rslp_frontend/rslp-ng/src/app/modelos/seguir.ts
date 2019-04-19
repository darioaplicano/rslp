import { Usuario } from './usuario';

export class Seguir {
    _id: string;
    seguido: Usuario;
    seguidor: Usuario;
    createdAt: Date;
}