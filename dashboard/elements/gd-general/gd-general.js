(function () {
	const onBreak = nodecg.Replicant('onBreak');
	const currentHour = nodecg.Replicant('currentHour');
	const donationTotal = nodecg.Replicant('donationTotal');
	const battle = nodecg.Replicant('battle');
	const segments = nodecg.Replicant('segments');
	
	class GdGeneral extends Polymer.Element {
		static get is() {
			return 'gd-general';
		}
		
		static get properties() {
			return {
				total: Number,
				
				curHour: Number,
				curTitle: String,
				curDocProvider: String,
				curRidiculist1: String,
				curRidiculist2: String,
				curRidiculist3: String,
				curRidiculist4: String,
				curRidiculist5: String,
				curRidiculist6: String,
				curArtist: String,
				curStreamTwo: String,
				
				nextHour: Number,
				nextTitle: String,
				nextDocProvider: String,
				nextRidiculist1: String,
				nextRidiculist2: String,
				nextRidiculist3: String,
				nextRidiculist4: String,
				nextRidiculist5: String,
				nextRidiculist6: String,
				nextArtist: String,
				nextStreamTwo: String,
				
				battleActive: Boolean,
				option1Title: String,
				option1Keyword: String,
				option1Total: Number,
				option2Title: String,
				option2Keyword: String,
				option2Total: Number
			}
		};

		
		ready() {
			super.ready();
			
			battle.on('change', newVal => {
				this.battleActive = newval.active;
				this.option1Title = newval.option1Title;
				this.option1Keyword = newval.option1Keyword;
				this.option1Total = newval.option1Total;
				this.option2Title = newval.option2Title;
				this.option2Keyword = newval.option2Keyword;
				this.option2Total = newval.option2Total;
			});
			
			currentHour.on('change', newVal => {
				//changeme: move values back 1 hour
				this.curHour = newVal + 1;
				this.nextHour = newVal + 2;
			});
			
			donationTotal.on('change', newVal => {
				this.total = newVal;
			});
			
			segments.on('change', newVal => {
				this.curTitle = newVal[this.curHour].title;
				this.curDocProvider = newVal[this.curHour].docProvider;
				this.curRidiculist1 = newVal[this.curHour].ridiculist1;
				this.curRidiculist2 = newVal[this.curHour].ridiculist2;
				this.curRidiculist3 = newVal[this.curHour].ridiculist3;
				this.curRidiculist4 = newVal[this.curHour].ridiculist4;
				this.curRidiculist5 = newVal[this.curHour].ridiculist5;
				this.curRidiculist6 = newVal[this.curHour].ridiculist6;
				this.curArtist = newVal[this.curHour].artistName;
				this.curStreamTwo = newVal[this.curHour].streamTwoName;	
				
				if (this.nextHour <= 24) {
					this.nextTitle = newVal[this.nextHour].title;
					this.nextDocProvider = newVal[this.nextHour].docProvider;
					this.nextRidiculist1 = newVal[this.nextHour].ridiculist1;
					this.nextRidiculist2 = newVal[this.nextHour].ridiculist2;
					this.nextRidiculist3 = newVal[this.nextHour].ridiculist3;
					this.nextRidiculist4 = newVal[this.nextHour].ridiculist4;
					this.nextRidiculist5 = newVal[this.nextHour].ridiculist5;
					this.nextRidiculist6 = newVal[this.nextHour].ridiculist6;
					this.nextArtist = newVal[this.nextHour].artistName;
					this.nextStreamTwo = newVal[this.nextHour].streamTwoName;					
				} else {
					this.nextTitle = newVal[this.nextHour].title;
					this.nextDocProvider = "";
					this.nextRidiculist1 = "";
					this.nextRidiculist2 = "";
					this.nextRidiculist3 = "";
					this.nextRidiculist4 = "";
					this.nextRidiculist5 = "";
					this.nextRidiculist6 = "";
					this.nextArtist = "";
					this.nextStreamTwo = "";
				}
			});	

		}
					

	
		
	}
	customElements.define(GdGeneral.is, GdGeneral);			
})();