import { FirebaseDocument } from "./firebaseDocument";

export interface Cancion {
    id: string;
    nombre: string;
    imagen: string;
}

export interface Playlist extends FirebaseDocument {
    nombre: string;
    id_usuario: string;
    canciones: Cancion[];
    estado: boolean;
    publico: boolean;
}