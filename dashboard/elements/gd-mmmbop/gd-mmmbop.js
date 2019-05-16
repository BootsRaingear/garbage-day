(function () {
	const mmmbop = nodecg.Replicant('mmmbop');
	const onBreak = nodecg.Replicant('onBreak');
	const buttonCooldowns = nodecg.Replicant('buttonCooldowns');
	
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
				mmmbopDisabled: {
					type: Boolean,
					value: false,					
				},
				themeSongDisabled: {
					type: Boolean,
					value: false,					
				},
				readerIntrosDisabled: {
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
				NodeCG.waitForReplicants(buttonCooldowns, mmmbop).then(() => {
					this.mmmbopsAvailable = mmmbop.value.mmmbopsAvailable;
					if (this.mmmbopsAvailable > 0 && !this.onBreak && !buttonCooldowns.mmmbop)
					{
						this.mmmbopDisabled = false;
					} else {
						this.mmmbopDisabled = true;
					}
				});	
			});

			
			onBreak.on('change', newVal => {
				this.onBreak = onBreak.value;

				if (newVal | this.mmmbopsAvailable == 0)
					this.buttonDisabled = true;
				else 
					this.buttonDisabled = false;

			});

			buttonCooldowns.on('change', newVal => {
				NodeCG.waitForReplicants(buttonCooldowns, mmmbop).then(() => {
					this.mmmbopsAvailable = mmmbop.value.mmmbopsAvailable;
					if (this.mmmbopsAvailable > 0 && !this.onBreak && !buttonCooldowns.value.mmmbop)
					{
						this.mmmbopDisabled = false;
					} else {
						this.mmmbopDisabled = true;
					}

					if (!this.onBreak && !buttonCooldowns.value.themeSong)
						this.themeSongDisabled = false;
					else
						this.themeSongDisabled = true;

					if (!this.onBreak && !buttonCooldowns.value.readerIntros)
						this.readerIntrosDisabled = false;
					else
						this.readerIntrosDisabled = true;
				});	
			})					
		}	

		computeStyle(cl) {
			var s = "background-color:"+cl;
				return s;
		}


		_handlePlayMmmbop() {
			buttonCooldowns.value.mmmbop = true;
			setTimeout(function() { buttonCooldowns.value.mmmbop = false; }, 5500);

			mmmbop.value.mmmbopsAvailable--;
			nodecg.sendMessage('playMmmbop', "true");
		}		

		_handlePlayThemeSong() {
			buttonCooldowns.value.themeSong = true;
			setTimeout(function() { buttonCooldowns.value.themeSong = false; }, 15000);

			nodecg.sendMessage('playThemeSong', "true");
		}

		_handlePlayReaderIntros() {
			buttonCooldowns.value.readerIntros = true;
			setTimeout(function() { buttonCooldowns.value.readerIntros = false; }, 15000);

			nodecg.sendMessage('playReaderIntros', "true");
		}
		
	}
	customElements.define(GdMmmbop.is, GdMmmbop);			
})();