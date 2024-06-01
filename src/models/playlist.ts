import { FirebaseDocument } from "./firebaseDocument";

export interface Playlist extends FirebaseDocument{
    nombre: string;
    id_usuario: string;
    canciones: string[];
    estado: boolean;
    publico: boolean;
}
