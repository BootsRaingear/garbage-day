(function () {
	
	class GdKumquatSoundboard extends Polymer.Element {
		static get is() {
			return 'gd-kumquatsoundboard';
		}
		
		static get properties() {
			return {
			}
		};
				
		ready() {
			super.ready();							
		}	

		_handlePlayKumquat() {
			nodecg.sendMessage('playKumquat', "true");
		}				
	}
	customElements.define(GdKumquatSoundboard.is, GdKumquatSoundboard);			
})();