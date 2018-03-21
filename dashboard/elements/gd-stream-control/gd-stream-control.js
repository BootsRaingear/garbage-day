(function () {
	const onBreak = nodecg.Replicant('onBreak');
	
	class GdStreamControl extends Polymer.Element {
		static get is() {
			return 'gd-stream-control';
		}
		
		static get properties() {
			return {
				onBreak: {
					type: Boolean,
					value: false,					
				},
			}
		};				
		
		ready() {
			super.ready();
			onBreak.on('change', newVal => {
				this.onBreak = newVal;
			});

		}


	}
	customElements.define(GdStreamControl.is, GdStreamControl);			
})();