(function () {
	const mmmbop = nodecg.Replicant('mmmbop');
	const onBreak = nodecg.Replicant('onBreak');
	
	class GdMmmbop extends Polymer.Element {
		static get is() {
			return 'gd-mmmbop';
		}
		
		static get properties() {
			return {
				mmmbopsAvailable: {
					type: Number,
					value: 0
				},
				buttonDisabled: {
					type: Boolean,
					value: true,					
				},
				onBreak: {
					type: Boolean,
					value: false
				}
			}
		};
				
		ready() {
			super.ready();
			
			mmmbop.on('change', newVal => {
				this.mmmbopsAvailable = mmmbop.value.mmmbopsAvailable;
				if (this.mmmbopsAvailable > 0 && !this.onBreak)
				{
					this.buttonDisabled = false;
				} else {
					this.buttonDisabled = true;
				}
				
			});
			
			onBreak.on('change', newVal => {
				this.onBreak = onBreak.value;
			});
		}
		
		_handlePlaySound() {
			mmmbop.value.mmmbopsAvailable--;
			nodecg.sendMessage('playMmmbop', "true");
		}		
		
	}
	customElements.define(GdMmmbop.is, GdMmmbop);			
})();