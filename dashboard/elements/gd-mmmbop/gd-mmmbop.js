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
				mmmbopDisabled: {
					type: Boolean,
					value: false,					
				},
				themeSongDisabled: {
					type: Boolean,
					value: false,					
				},
			}
		};
				
		ready() {
			super.ready();
		
			mmmbop.on('change', newVal => {
				this._checkMmmbopButton();			
			});

			
			onBreak.on('change', newVal => {
				this._checkMmmbopButton();
				this._checkThemeSongButton();
			});

			buttonCooldowns.on('change', newVal => {
				this._checkMmmbopButton();
				this._checkThemeSongButton();
			});
		}	

		_checkMmmbopButton() {
			NodeCG.waitForReplicants(buttonCooldowns, onBreak).then(() => {
				if (mmmbop.value.mmmbopsAvailable > 0 && !onBreak.value && !buttonCooldowns.value.mmmbopDisabled)
				{
					this.mmmbopDisabled = false;
				} else {
					this.mmmbopDisabled = true;
				}
			});
		}

		_checkThemeSongButton() {
			NodeCG.waitForReplicants(buttonCooldowns, onBreak).then(() => {
				if (!onBreak.value && !buttonCooldowns.value.themeSongDisabled)
				{
					this.themeSongDisabled = false;
				} else {
					this.themeSongDisabled = true;
				}
			});
		}

		_handleShowComparativeItem() {
			nodecg.sendMessage('showComparativeItem', "true");
		}
		
		
		_handlePlayMmmbop() {
			buttonCooldowns.value.mmmbopCooldown = Date.now() + 3500;
			buttonCooldowns.value.mmmbopDisabled = true;

			mmmbop.value.mmmbopsAvailable--;
			mmmbop.value.showVideo = true;
			nodecg.sendMessage('playMmmbop', "true");
			
		}		

		_handlePlayThemeSong() {
			buttonCooldowns.value.themeSongCooldown = Date.now() + 60000;
			buttonCooldowns.value.themeSongDisabled = true;

			nodecg.sendMessage('playThemeSong', "true");
		}
		
	}
	customElements.define(GdMmmbop.is, GdMmmbop);			
})();