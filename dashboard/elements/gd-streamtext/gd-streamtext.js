(function () {
	const streamtext = nodecg.Replicant('streamtext');

	// VALID LOCATIONS: center, top, right, bottom, left, top-left, top-right, bottom-left, bottom-right	
	
	class GdStreamText extends Polymer.Element {
		static get is() {
			return 'gd-streamtext';
		}
		
		static get properties() {
			return {	
				introText: {
					type: String,
					value: ""
				},
				logoURL: {
					type: String,
					value: ""
				},
				breakText: {
					type: String,
					value: ""
				},
				underTotalText: {
					type: String,
					value: ""
				}			}
		};

		
		ready() {
			super.ready();

			streamtext.on('change', newVal => {
				this.introText = newVal.introText;
				this.logoURL = newVal.logoURL;
				this.breakText = newVal.breakText;
				this.underTotalText = newVal.underTotalText;
			});			
		}
		
		updateStreamText() {
			streamtext.value.introText = this.introText;
			streamtext.value.logoURL = this.logoURL;
			streamtext.value.breakText = this.breakText;
			streamtext.value.underTotalText = this.underTotalText;			
		}
		

	}
	customElements.define(GdStreamText.is, GdStreamText);			
})();