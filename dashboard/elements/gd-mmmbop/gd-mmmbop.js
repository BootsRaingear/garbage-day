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

				if (newVal | this.mmmbopsAvailable == 0)
					this.buttonDisabled = true;
				else 
					this.buttonDisabled = false;

			});

					
		}	

		computeStyle(cl) {
			var s = "background-color:"+cl;
				return s;
		}

		_handlePlayMmmbop() {
			mmmbop.value.mmmbopsAvailable--;
			nodecg.sendMessage('playMmmbop', "true");
		}		

		_handlePlayThemeSong() {
			nodecg.sendMessage('playThemeSong', "true");
		}

		_handlePlayReaderIntros() {
			nodecg.sendMessage('playReaderIntros', "true");
		}
		
	}
	customElements.define(GdMmmbop.is, GdMmmbop);			
})();