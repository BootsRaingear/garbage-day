(function () {
	const onBreak = nodecg.Replicant('onBreak');
	const currentHour = nodecg.Replicant('currentHour');
	const donationTotal = nodecg.Replicant('donationTotal');
	const battle = nodecg.Replicant('battle');
	const segments = nodecg.Replicant('segments');
	
	var segFetched = false;
	var hourFetched = false;
	
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
				curRidiculist7: String,
				curRidiculist8: String,
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
				nextRidiculist7: String,
				nextRidiculist8: String,
				
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
				hourFetched = true;
				
				this.curHour = newVal;
				this.nextHour = newVal + 1;
				
				// if segments was parsed first, populate fields
				if (segFetched)
					this.populateCast(segments.value, newVal);
			});
			
			donationTotal.on('change', newVal => {
				this.total = newVal.toFixed(2);
			});
						
			segments.on('change', newVal => {
				segFetched = true;
				
				// populate fields if currentHour is parsed first
				if (hourFetched)
					this.populateCast(newVal, this.curHour);
			});	
		}
		
		populateCast(segs, hour) {
			if (typeof segs[hour] !== 'undefined') {
				this.curTitle = segs[hour].title;
				this.curDocProvider = segs[hour].docProvider;
				this.curDocURL = segs[hour].docURL;
				this.curRidiculist1 = segs[hour].ridiculist1;
				this.curRidiculist2 = segs[hour].ridiculist2;
				this.curRidiculist3 = segs[hour].ridiculist3;
				this.curRidiculist4 = segs[hour].ridiculist4;
				this.curRidiculist5 = segs[hour].ridiculist5;
				this.curRidiculist6 = segs[hour].ridiculist6;
				this.curRidiculist7 = segs[hour].ridiculist7;
				this.curRidiculist8 = segs[hour].ridiculist8;
				this.curArtist = segs[hour].artistName;
				this.curStreamTwo = segs[hour].streamTwoName;	
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
				this.curRidiculist7 = "";
				this.curRidiculist8 = "";
				this.curArtist = "";
				this.curStreamTwo = "";					
			}
			
			if ((typeof segs[hour + 1] !== 'undefined') && (hour + 1 <= 24)) {
				this.nextTitle = segs[hour + 1].title;
				this.nextDocProvider = segs[hour + 1].docProvider;
				this.nextDocURL = segs[this.curHour].docURL;
				this.nextRidiculist1 = segs[hour + 1].ridiculist1;
				this.nextRidiculist2 = segs[hour + 1].ridiculist2;
				this.nextRidiculist3 = segs[hour + 1].ridiculist3;
				this.nextRidiculist4 = segs[hour + 1].ridiculist4;
				this.nextRidiculist5 = segs[hour + 1].ridiculist5;
				this.nextRidiculist6 = segs[hour + 1].ridiculist6;
				this.nextRidiculist7 = segs[hour + 1].ridiculist7;
				this.nextRidiculist8 = segs[hour + 1].ridiculist8;
				this.nextArtist = segs[hour + 1].artistName;
				this.nextStreamTwo = segs[hour + 1].streamTwoName;					
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
				this.nextRidiculist7 = "";
				this.nextRidiculist8 = "";
				this.nextArtist = "";
				this.nextStreamTwo = "";
			}		

		}
		
	}
	customElements.define(GdGeneral.is, GdGeneral);			
})();