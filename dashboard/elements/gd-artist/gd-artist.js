'use strict'
(function () { 
	const currentArtist = nodecg.Replicant('currentArtist');

	class GdArtist extends Polymer.Element {
		static get is() {
			return 'gd-artist';
		}
		
		static get properties() {
			return {
				artistName: String,
				artistStream: String 
			};
		}
		
		ready() {
			super.ready();
		}
		
	}
	customElements.define(GdArtist.is, GdArtist);
});