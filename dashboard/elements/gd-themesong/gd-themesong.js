(function () {
	const onBreak = nodecg.Replicant('onBreak');
	const currentHour = nodecg.Replicant('currentHour');
	
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
				},
				curHour: Number
			}
		};
				
		ready() {
			super.ready();
			
			onBreak.on('change', newVal => {
				this.onBreak = onBreak.value;
				buttonDisabled = this.onBreak;
			});

			currentHour.on('change', newVal => {
				this.curHour = currentHour.value;
			});
		}
		
		_handlePlaySound() {
			nodecg.sendMessage('playthemesong', curHour);
		}		
		
	}
	customElements.define(GdThemesong.is, GdThemesong);			
})();