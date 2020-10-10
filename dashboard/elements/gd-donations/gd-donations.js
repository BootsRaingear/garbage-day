(function () {
	const recentDonations = nodecg.Replicant('recentDonations');
	const donationTotal = nodecg.Replicant('donationTotal');
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
			
			recentDonations.on('change', newVal => {
				this.donationList = [];
				this.donationList = newVal;
				console.log(this.donationList);
				this.donationList[0].dtime = moment(this.donationList[0].dtime).format('LTS');
			});
			slAuthUrl.on('change', newVal => {
				this.authUrl = newVal;
			});			
			console.log(this.recentDonations);
		}	
				
		grabDonations() {
			nodecg.sendMessage('grabDonations', 'true');
		}
				
	}
	customElements.define(GdDonations.is, GdDonations);			
})();