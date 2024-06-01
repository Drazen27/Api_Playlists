import {Playlist} from "../../models/playlist";
import { ApiResponse } from "../apiResponse";

export interface PlaylistResponse extends ApiResponse {
    data?: Playlist[];
}


