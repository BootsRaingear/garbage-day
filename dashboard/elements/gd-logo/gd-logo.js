(function () {

	// VALID LOCATIONS: center, top, right, bottom, left, top-left, top-right, bottom-left, bottom-right	
	
	class GdLogo extends Polymer.Element {
		static get is() {
			return 'gd-logo';
		}
		
		static get properties() {
			return {
				location: {
					type: Number,
					value: "center"
				},
				locations: {
					type: Array,
					value: ["center", "top", "right", "bottom", "left", "top-left", "top-right", "bottom-left", "bottom-right"]

				}
			}
		};

		
		ready() {
			super.ready();
							
		}
	}
	customElements.define(GdLogo.is, GdLogo);			
})();