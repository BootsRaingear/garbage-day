(function () {
	const prize = nodecg.Replicant('prize');

	class GdPrize extends Polymer.Element {
		static get is() {
			return 'gd-prize';
		}
		
		static get properties() {
			return {
				active: {
					type: Boolean,
					value: false
				},				
				description: {
					type: String,
					value: ""
				},
				amount: {
					type: Number,
					value: 0
				},
				awardProvider: {
					type: Number,
					value: ""
				},
				claimed: {
					type: Boolean,
					value: false
				},
				claimedBy: {
					type: String,
					value: ""
				},
				claimAmount: {
					type: Number,
					value: 0
				}
			}
		};

		
		ready() {
			super.ready();

			prize.on('change', newVal => {
				console.log(newVal);
				this.active = newVal.active;
				this.description = newVal.description;
				this.amount = newVal.amount;
				this.awardProvider = newVal.awardProvider;
				this.claimed = newVal.claimed;
				this.claimedBy = newVal.claimedBy;
				this.claimAmount = newVal.claimAmount;
			});			
		}
		
		enablePrize() {
			prize.value.active = true;
			prize.value.description = this.description;
			prize.value.amount = this.amount;
			prize.value.awardProvider = this.awardProvider;			
		}
		
		disablePrice() {
			prize.value.active = false;
		}
		
		clearPrize() {
			prize.value.active = false;
			prize.value.description = "";
			prize.value.amount = 0;
			prize.value.awardProvider = "";
			prize.value.claimed = false;
			prize.value.claimedBy = "";
			prize.value.claimAmount = 0;			
		}		

	}
	customElements.define(GdPrize.is, GdPrize);			
})();