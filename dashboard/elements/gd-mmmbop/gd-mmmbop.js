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
				mmmbopButtonDisabled: {
					type: Boolean,
					value: true,					
				},
				themeSongButtonDisabled: {
					type: Boolean,
					value: false,
				},
				readerIntrosButtonDisabled: {
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
			
			mmmbop.on('change', newVal => {
				this.mmmbopsAvailable = mmmbop.value.mmmbopsAvailable;
				if (this.mmmbopsAvailable > 0 && !this.onBreak)
				{
					this.mmmbopButtonDisabled = false;
				} else {
					this.mmmbopButtonDisabled = true;
				}
				
			});
			
			onBreak.on('change', newVal => {
				this.onBreak = onBreak.value;

				//readerIntrosButtonDisabled = onBreak.value;
				//themeSongButtonDisabled = onBreak.value;
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