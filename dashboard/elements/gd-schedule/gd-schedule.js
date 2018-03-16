(function () { 
	
	const currentSegment = nodecg.Replicant('currentSegment');
	const segments = nodecg.Replicant('segments');

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
				streamtwoName: String,
				streamtwoURL: String			
			};
		}
		
		fetch() {
			if (1 <= this.hour && this.hour <= 24) {
				if (typeof segments.value[this.hour] !== 'undefined') {
					console.log("found it!");
					currentSegment.value = segments.value[this.hour];
					this.title = currentSegment.value.title;
					this.docProvider = currentSegment.value.docProvider;
					this.docURL = currentSegment.value.docURL;
					this.ridiculist1 = currentSegment.value.ridiculist1;
					this.ridiculist2 = currentSegment.value.ridiculist2;
					this.ridiculist3 = currentSegment.value.ridiculist3;
					this.ridiculist4 = currentSegment.value.ridiculist4;
					this.ridiculist5 = currentSegment.value.ridiculist5;
					this.ridiculist6 = currentSegment.value.ridiculist6;
					this.artistName = currentSegment.value.artistName;
					this.artistURL = currentSegment.value.artistURL;
					this.streamtwoName = currentSegment.value.streamtwoName;
					this.streamtwoURL = currentSegment.value.streamtwoURL;
				} else {
					console.log("not found!");
					this.title = "";
					this.docProvider = "";
					this.docURL = "";
					this.ridiculist1 = "";
					this.ridiculist2 = "";
					this.ridiculist3 = "";
					this.ridiculist4 = "";
					this.ridiculist5 = "";
					this.ridiculist6 = "";
					this.artistName = "";
					this.artistURL = "";
					this.streamtwoName = "";
					this.streamtwoURL = "";
				}
			} else {
				console.log("[garbage-day] schedule.js, fetch() - hour out of range, idiot");
			}
			
		}
		
		update() {
			if (1 <= this.hour && this.hour <= 24)
			{
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
				currentSegment.value.streamtwoName = this.streamtwoName;
				currentSegment.value.streamtwoURL = this.streamtwoURL;
				segments.value[this.hour]  = currentSegment.value;
			} else {
				console.log("[garbage-day] schedule.js, update() - hour out of range, idiot");
			}
				
		}
		
	}
	customElements.define(GdSchedule.is, GdSchedule);
})();