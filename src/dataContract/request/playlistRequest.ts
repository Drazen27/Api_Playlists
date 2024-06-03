export interface Cancion {
    id: string;
    nombre: string;
    imagen: string;
}

export interface PlaylistRequest {
    id?: string;
    nombre?: string;
    id_usuario?: string;
    publico?: true;
    canciones?: Cancion[];

}
