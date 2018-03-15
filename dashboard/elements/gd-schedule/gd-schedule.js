(function () { 
	
	const currentSegment = nodecg.Replicant('currentSegment');

	class GdSchedule extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'gd-schedule';
		}
		
		static get properties() {
			return {
				hour: Number,
				title: String,
				docProvider: String,
				docURL: String,
				ridiculist1: String,
				ridiculist2: String,
				ridiculist3: String,
				ridiculist4: String,
				ridiculist5: String,
				ridiculist6: String,
				artistName: String,
				artistURL: String,
				streamTwoName: String,
				streamTwoURL: String			
			};
		}
		
		fetch() {
			this.hour = currentSegment.value.hour;
			this.title = currentSegment.value.title;
			this.docProvider = currentSegment.value.docProvider;
			this.docURL = currentSegment.value.docURL;
			this.ridiculist1 = currentSegment.ridiculist1;
			this.ridiculist2 = currentSegment.ridiculist2;
			this.ridiculist3 = currentSegment.ridiculist3;
			this.ridiculist4 = currentSegment.ridiculist4;
			this.ridiculist5 = currentSegment.ridiculist5;
			this.ridiculist6 = currentSegment.ridiculist6;
			this.artistName = currentSegment.value.artistName;
			this.artistURL = currentSegment.value.artistURL;

		}
		
		update() {
			currentSegment.value.hour = this.hour;
			currentSegment.value.title = this.title;
			currentSegment.value.docProvider = this.docProvider;
			currentSegment.value.docURL = this.docURL;
			currentSegment.value.ridiculist1 = this.ridiculist1;
			currentSegment.value.ridiculist2 = this.ridiculist2;
			currentSegment.value.ridiculist3 = this.ridiculist3;
			currentSegment.value.ridiculist4 = this.ridiculist4;
			currentSegment.value.ridiculist5 = this.ridiculist5;
			currentSegment.value.ridiculist6 = this.ridiculist6;
			currentSegment.value.artistName = this.artistName;
			currentSegment.value.artistURL = this.artistURL;			
			
		}
		
	}
	customElements.define(GdSchedule.is, GdSchedule);
})();