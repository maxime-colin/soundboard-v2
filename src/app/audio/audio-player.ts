import { AudioService } from './audio-service';
import { Cell } from '../common/cell';
import { tryCatch } from 'rxjs/util/tryCatch';
export class AudioPlayer {

	private audioPlayer;
	private buffer;
	private playDirection = 1;

	public constructor(
		public cell: Cell,
		public audioService: AudioService
	){}

	public play() {
		if( ! this.cell.audioLoaded) {
			return;
		}

		this.audioPlayer = this.audioService.playFromDataURL(this.cell.audioData);

		this.audioPlayer.playObservable.subscribe(buffer => {
			this.buffer = buffer;
			console.log('INITIAL BUFFER', buffer);
		});
		console.log(this.audioPlayer);
	}

	public reverse() {
		this.playDirection *= -1;
		try {
			Array.prototype.reverse.call( this.buffer.getChannelData(0) );
			Array.prototype.reverse.call( this.buffer.getChannelData(1) );
			console.log('REVERSE BUFFER', this.buffer);
			console.log(this.audioPlayer.source);
		} catch (e) {
		}
	}

	public setDetune(detune: number) {
		if( ! this.audioPlayer) {
			return false;
		}
		this.audioPlayer.source.detune.value = detune;
	}

	public setPlaybackRate(playbackRate: number) {
		if( ! this.audioPlayer) {
			return false;
		}

		if(
			(this.playDirection == 1 && playbackRate < 0) ||
			(this.playDirection == -1 && playbackRate > 0)
		) {
			this.reverse();
		}

		playbackRate = Math.abs(playbackRate);
		this.audioPlayer.source.playbackRate.value = playbackRate;
	}
	
}