(function () {
	const soundboard = nodecg.Replicant('assets:soundboard');
	
	class GdSoundBoard extends Polymer.Element {
		static get is() {
			return 'gd-soundboard';
		}
		
		static get properties() {
			return {
				soundclips: Array,
			}
		};
				
		ready() {
			super.ready();
			
			soundboard.on('change', newVal => {
				this.soundclips = newVal;
			});
		}
		
		_handlePlaySound(e) {
			console.log(e.model.soundclip.base);
			nodecg.sendMessage('soundboardPlay', e.model.soundclip.base);
		}
		
	}
	customElements.define(GdSoundBoard.is, GdSoundBoard);			
})();