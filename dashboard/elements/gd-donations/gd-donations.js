(function () {
	const recentDonations = nodecg.Replicant('recentDonations');
	const donationTotal = nodecg.Replicant('donationTotal');
	const slAuthUrl = nodecg.Replicant('slAuthUrl');
	
	class GdDonations extends Polymer.Element {
		static get is() {
			return 'gd-donations';
		}
		
		static get properties() {
			return {
				recentDonations: Array,
				donationTotal: Number,
				authUrl: String
			}
			
		};
				
		ready() {
			super.ready();
			
			recentDonations.on('change', newVal => {
				this.recentDonations = newVal;
			});
			slAuthUrl.on('change', newVal => {
				this.authUrl = newVal;
			});			
		}	
				
		grabDonations() {
			nodecg.sendMessage('grabDonations', 'true');
		}
				
	}
	customElements.define(GdDonations.is, GdDonations);			
})();