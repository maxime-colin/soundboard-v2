import { AudioService } from './audio-service';
import { AudioPlayer } from './audio-player';
import { Injectable } from '@angular/core';
import { Cell } from '../common/cell';

@Injectable()
export class AudioPlayerFactory {

	public constructor(
		private audioService: AudioService
	) {}

	public getPlayer(cell: Cell) {
		return new AudioPlayer(
			cell,
			this.audioService
		);
	}
}

