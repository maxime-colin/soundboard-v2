import {Cell} from "./cell";


export interface Board {
	tiles:Cell[];
	title: string,
	url: string,
	cells: Cell[]
}