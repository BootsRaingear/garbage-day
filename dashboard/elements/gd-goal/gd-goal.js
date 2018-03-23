(function () {
	const donationGoal = nodecg.Replicant('donationGoal');
	const donationTotal = nodecg.Replicant('donationTotal');
	
	class GdGoal extends Polymer.Element {
		static get is() {
			return 'gd-goal';
		}
		
		static get properties() {
			return {
				goalText: {
					type: String,
					value: ""
				},
				goalAmount: {
					type: Number,
					value: 0
				},
				goalStartAmount: {
					type: Number,
					value: -1					
				},
				goalActive: {
					type: Boolean,
					value: false
				}
			}
		};

		
		ready() {
			super.ready();

			donationGoal.on('change', newVal => {
				this.goalActive = newVal.active;
				this.goalAmount = newVal.amount;
				this.goalStartAmount = newVal.startAmount;
				this.goalText = newVal.text;				
			});			
		}
		
		
		startGoal() {
			if (parseFloat(this.goalStartAmount) == -1) {					
				donationGoal.value.startAmount = donationTotal.value;
			} else {
				donationGoal.value.startAmount = parseFloat(this.goalStartAmount)
			}				
			donationGoal.value.amount = parseFloat(this.goalAmount);
			donationGoal.value.text = this.goalText;			
			donationGoal.value.active = true;
		}
		
		endGoal () {
			donationGoal.value.active = false;
		}
		
		clear () {
			donationGoal.value.text = "";
			donationGoal.value.amount = 0;
			donationGoal.value.startAmount = -1;
		}
		
	}
	customElements.define(GdGoal.is, GdGoal);			
})();