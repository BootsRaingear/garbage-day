(function () {

	var testmode = true;
	const donations = testmode ? nodecg.Replicant('tiltTestDonations') : nodecg.Replicant('donations', 'nodecg-tiltify');
	const alldonations = testmode ? nodecg.Replicant('tiltTestAllDonations') : nodecg.Replicant('alldonations', 'nodecg-tiltify');
	const donationtotal = testmode ? nodecg.Replicant('tiltTestTotal') : nodecg.Replicant('total', 'nodecg-tiltify');
	
	const recentDonations = nodecg.Replicant('recentDonations');
	const slAuthUrl = nodecg.Replicant('slAuthUrl');
	
	class GdDonations extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'gd-donations';
		}
		
		static get properties() {
			return {
				donationList: Array,
				donationTotal: Number,
				authUrl: String
			}
			
		};
				
		ready() {
			super.ready();
			donations.on('change', (newVal, oldVal) => {
				console.log("Donations changed!");
				this.donationList = [];
				
				let newDonationList = []; 
				newDonationList = JSON.parse(JSON.stringify(newVal))
				
				const amtFormatter = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				});

				const timeFormatter = new Intl.DateTimeFormat('en-US', {
					dateStyle: 'short',
					timeStyle: 'short',
					timeZone: 'EST'
				})
				
				for (let i = 0; i < newDonationList.length; i++) {
					newDonationList[i].formatAmount = amtFormatter.format(newDonationList[i].amount);
					newDonationList[i].datetime = timeFormatter.format(new Date(newDonationList[i].completedAt));
				}
				
				this.donationList = newDonationList;

			});

		}	
				
		grabDonations() {
			nodecg.sendMessage('grabDonations', 'true');
		}
				
	}
	customElements.define(GdDonations.is, GdDonations);			
})();