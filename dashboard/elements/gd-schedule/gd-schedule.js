(function () { 
	
	const segment = nodecg.Replicant('segment');
	const segments = nodecg.Replicant('segments');
	const cast = nodecg.Replicant('cast');	

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
				ridiculist7: String,
				ridiculist8: String,
				artistName: String,
				artistURL: String,
				streamtwoName: String,
				streamtwoURL: String,
				castNames: Array
			};
		}

		ready() {
			super.ready();

			// create array of cast names
			NodeCG.waitForReplicants(cast).then(() => {
				this.castNames = new Array();
				for (var i = 0; i < cast.value.length; i++)
				{
					this.castNames.push(cast.value[i].displayName);
				}
			});
		}

		fetch() {
			if (0 <= this.hour && this.hour <= 24) {
				if (typeof segments.value[this.hour] !== 'undefined') {
					this.title = segments.value[this.hour].title;
					this.docProvider = segments.value[this.hour].docProvider;
					this.docURL = segments.value[this.hour].docURL;
					this.ridiculist1 = segments.value[this.hour].ridiculist1;
					this.ridiculist2 = segments.value[this.hour].ridiculist2;
					this.ridiculist3 = segments.value[this.hour].ridiculist3;
					this.ridiculist4 = segments.value[this.hour].ridiculist4;
					this.ridiculist5 = segments.value[this.hour].ridiculist5;
					this.ridiculist6 = segments.value[this.hour].ridiculist6;
					this.ridiculist7 = segments.value[this.hour].ridiculist7;
					this.ridiculist8 = segments.value[this.hour].ridiculist8;
					this.artistName = segments.value[this.hour].artistName;
					this.artistURL = segments.value[this.hour].artistURL;
					this.streamtwoName = segments.value[this.hour].streamtwoName;
					this.streamtwoURL = segments.value[this.hour].streamtwoURL;
				} else {
					this.title = "";
					this.docProvider = "";
					this.docURL = "";
					this.ridiculist1 = "";
					this.ridiculist2 = "";
					this.ridiculist3 = "";
					this.ridiculist4 = "";
					this.ridiculist5 = "";
					this.ridiculist6 = "";
					this.ridiculist7 = "";
					this.ridiculist8 = "";
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
			if (0 <= this.hour && this.hour <= 24)
			{
				console.log("ridiculist 3 = " + this.ridiculist3);
				segment.value.hour = this.hour;
				segment.value.title = this.title || '';
				segment.value.docProvider = this.docProvider || '';
				segment.value.docURL = this.docURL || '';
				segment.value.ridiculist1 = this.ridiculist1 || '';
				segment.value.ridiculist2 = this.ridiculist2 || '';
				segment.value.ridiculist3 = this.ridiculist3 || '';
				segment.value.ridiculist4 = this.ridiculist4 || '';
				segment.value.ridiculist5 = this.ridiculist5 || '';
				segment.value.ridiculist6 = this.ridiculist6 || '';
				segment.value.ridiculist7 = this.ridiculist7 || '';
				segment.value.ridiculist8 = this.ridiculist8 || '';
				segment.value.artistName = this.artistName || '';
				segment.value.artistURL = this.artistURL || '';
				segment.value.streamtwoName = this.streamtwoName || '';
				segment.value.streamtwoURL = this.streamtwoURL || '';
				segment.value.updateMe = true;
			} else {
				console.log("[garbage-day] schedule.js, update() - hour out of range, idiot");
			}
				
		}
		
	}
	customElements.define(GdSchedule.is, GdSchedule);
})();