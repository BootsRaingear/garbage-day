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
				curDocURL: String,				
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
				nextDocURL: String,
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
				this.battleActive = newVal.active;
				this.option1Title = newVal.option1Title;
				this.option1Keyword = newVal.option1Keyword;
				this.option1Total = newVal.option1Total;
				this.option2Title = newVal.option2Title;
				this.option2Keyword = newVal.option2Keyword;
				this.option2Total = newVal.option2Total;
			});
			
			currentHour.on('change', newVal => {
				this.curHour = newVal;
				this.nextHour = newVal + 1;
				
				// if segments was parsed first, populate fields
				if (typeof this.curTitle == 'undefined')
					this.populateCast(segments.value);
			});
			
			donationTotal.on('change', newVal => {
				this.total = newVal.toFixed(2);
			});
						
			segments.on('change', newVal => {
				// populate fields if currentHour is parsed first
				if (typeof this.curHour !== 'undefined')
					this.populateCast(newVal);
			});	
		}
		
		populateCast(segs) {
			if (typeof segs !== 'undefined') {
				this.curTitle = segs[this.curHour].title;
				this.curDocProvider = segs[this.curHour].docProvider;
				this.curDocURL = segs[this.curHour].docURL;
				this.curRidiculist1 = segs[this.curHour].ridiculist1;
				this.curRidiculist2 = segs[this.curHour].ridiculist2;
				this.curRidiculist3 = segs[this.curHour].ridiculist3;
				this.curRidiculist4 = segs[this.curHour].ridiculist4;
				this.curRidiculist5 = segs[this.curHour].ridiculist5;
				this.curRidiculist6 = segs[this.curHour].ridiculist6;
				this.curArtist = segs[this.curHour].artistName;
				this.curStreamTwo = segs[this.curHour].streamTwoName;	
			} else {
				this.curTitle = "";
				this.curDocProvider = "";
				this.curDocURL = "";
				this.curRidiculist1 = "";
				this.curRidiculist2 = "";
				this.curRidiculist3 = "";
				this.curRidiculist4 = "";
				this.curRidiculist5 = "";
				this.curRidiculist6 = "";
				this.curArtist = "";
				this.curStreamTwo = "";					
			}
			
			if ((typeof segs[this.nextHour] !== 'undefined') && (this.nextHour <= 24)) {
				this.nextTitle = segs[this.nextHour].title;
				this.nextDocProvider = segs[this.nextHour].docProvider;
				this.nextDocURL = segs[this.curHour].docURL;
				this.nextRidiculist1 = segs[this.nextHour].ridiculist1;
				this.nextRidiculist2 = segs[this.nextHour].ridiculist2;
				this.nextRidiculist3 = segs[this.nextHour].ridiculist3;
				this.nextRidiculist4 = segs[this.nextHour].ridiculist4;
				this.nextRidiculist5 = segs[this.nextHour].ridiculist5;
				this.nextRidiculist6 = segs[this.nextHour].ridiculist6;
				this.nextArtist = segs[this.nextHour].artistName;
				this.nextStreamTwo = segs[this.nextHour].streamTwoName;					
			} else {
				this.nextTitle = "";
				this.nextDocProvider = "";
				this.nextDocURL = "";
				this.nextRidiculist1 = "";
				this.nextRidiculist2 = "";
				this.nextRidiculist3 = "";
				this.nextRidiculist4 = "";
				this.nextRidiculist5 = "";
				this.nextRidiculist6 = "";
				this.nextArtist = "";
				this.nextStreamTwo = "";
			}		

		}
		
	}
	customElements.define(GdGeneral.is, GdGeneral);			
})();