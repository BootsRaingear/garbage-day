(function () {
	const streamtwoControl = nodecg.Replicant('streamtwoControl');
	const onBreak = nodecg.Replicant('onBreak');	
	
	class GdStreamTwoControl extends Polymer.Element {
		static get is() {
			return 'gd-streamtwocontrol';
		}
		
		static get properties() {
			return {
				disabled: {
					type: Boolean,
					value: false
				},
				swap: {
					type: Boolean,
					value: true
				},
				onBreak: {
					type: Boolean,
					value: false
				},
				buttonsDisabled: {
					type: Boolean,
					value: false
				}
			}
		};
				
		ready() {
			super.ready();
			
			onBreak.on('change', newVal => {
				if (newVal) {
					this.buttonsDisabled = true;
				} else {
					this.buttonsDisabled = false;
				}
			});
			
			streamtwoControl.on('change', newVal => {
				this.disabled = newVal.disabled;
				this.swap = newVal.swap;
			});
		}
		
		hideStreams() {
			streamtwoControl.value.disabled = true;
		}
		
		showStreams() {
			streamtwoControl.value.disabled = false;			
		}
		
		swapStreams() {
			streamtwoControl.value.swap = !this.swap;
		}
	}
	customElements.define(GdStreamTwoControl.is, GdStreamTwoControl);			
})();