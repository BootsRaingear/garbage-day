(function () {
	const onBreak = nodecg.Replicant('onBreak');
	const currentLayout = nodecg.Replicant('currentLayout');
	
	class GdObsControl extends Polymer.Element {
		static get is() {
			return 'gd-obs-control';
		}
		
		static get properties() {
			return {
				onBreak: {
					type: Boolean,
					value: false,					
				}
			};
		}
		
		ready() {
			super.ready();
			onBreak.on('change', newVal => {
				this.onBreak = newVal;
			});
		}
		
		startBreak() {
			onBreak.value = true;
		}
		
		endBreak() {
			onBreak.value = false;
		}
				
	}
	customElements.define(GdObsControl.is, GdObsControl);			
})();