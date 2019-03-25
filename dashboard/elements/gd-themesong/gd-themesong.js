(function () {
	const onBreak = nodecg.Replicant('onBreak');
	
	class GdThemesong extends Polymer.Element {
		static get is() {
			return 'gd-themesong';
		}
		
		static get properties() {
			return {
				buttonDisabled: {
					type: Boolean,
					value: false,					
				},
				onBreak: {
					type: Boolean,
					value: false
				}
			}
		};
				
		ready() {
			super.ready();
			
			onBreak.on('change', newVal => {
				this.onBreak = onBreak.value;
				buttonDisabled = this.onBreak;
			});
		}
		
		_handlePlaySound() {
			nodecg.sendMessage('playthemesong', "true");
		}		
		
	}
	customElements.define(GdThemesong.is, GdThemesong);			
})();