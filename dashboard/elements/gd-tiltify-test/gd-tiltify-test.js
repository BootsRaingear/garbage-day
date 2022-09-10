(function () {
	const onBreak = nodecg.Replicant('onBreak');
	const tiltTestDonations = nodecg.Replicant('tiltTestDonations');
	const donationtotal = nodecg.Replicant('tiltTestTotal');
	const donationpolls = nodecg.Replicant('donationpolls','nodecg-tiltify');
	const rewards = nodecg.Replicant('rewards','nodecg-tiltify');
	
	//const tiltTestAllDonations = nodecg.Replicant('tiltTestAllDonations')
	
	class GdTiltifyTest extends Polymer.Element {
		static get is() {
			return 'gd-tiltify-test';
		}
		
		static get properties() {
			return {
				onBreak: {
					type: Boolean,
					value: false,					
				},
			}
		};				
		
		ready() {
			super.ready();
		}

		submitDonation() {
			console.log("submitting donation");
			var jsonDonation = {};
			jsonDonation.id = tiltTestDonations.value.length;
			jsonDonation.amount = this.damount;
			jsonDonation.comment = this.dmsg;
			jsonDonation.name = this.dname;
			jsonDonation.read = false;
			jsonDonation.shown = false;
			jsonDonation.completedAt = new Date().getTime();
			tiltTestDonations.value[jsonDonation.id] = jsonDonation;
			
			donationtotal.value = Number(donationtotal.value) + Number(jsonDonation.amount);
		}
	}
	customElements.define(GdTiltifyTest.is, GdTiltifyTest);			
})();