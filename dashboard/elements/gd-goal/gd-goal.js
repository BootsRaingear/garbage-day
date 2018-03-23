(function () {
	const battle = nodecg.Replicant('battle');
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
					value: 0					
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
		
		updateGoal() {
			donationGoal.value.amount = parseFloat(this.goalAmount);
			donationGoal.value.startAmount = parseFloat(this.goalStartAmount);
			donationGoal.value.text = this.goalText;			
		}
		
		clearGoal() {
			donationGoal.value.amount = 0;
			donationGoal.value.startAmount = 0;
			donationGoal.value.text = "";
			donationGoal.value.active = false;
		}

		_handleGoalActiveCheckboxChanged() {
			
			if (typeof donationGoal.value != 'undefined') {


				if (parseFloat(this.goalStartAmount) == 0) {					
					if (typeof donationTotal.value != 'undefined') {
						donationGoal.value.startAmount = donationTotal.value;
					} else {
						// this shouldn't have to happen?
						donationGoal.value.startAmount = 0;
					}						
				} else {
					donationGoal.value.startAmount = parseFloat(this.goalStartAmount)
				}
				
				donationGoal.value.amount = parseFloat(this.goalAmount);
				donationGoal.value.text = this.goalText;			
				donationGoal.value.active = !this.goalActive;
				console.log(donationGoal.value);
			}
		}
		
	}
	customElements.define(GdGoal.is, GdGoal);			
})();