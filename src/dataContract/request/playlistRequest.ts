export interface Cancion {
    id: string;
    nombre: string;
    imagen: string;
    url: string;
    album: string;
    artista: string;
}

export interface PlaylistRequest {
    id?: string;
    nombre?: string;
    id_usuario?: string;
    publico?: true;
    canciones?: Cancion[];

}
