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
			this.artistName = currentSegment.value.artistName;
			this.artistURL = currentSegment.value.artistURL;
			console.log(currentSegment.value.ridiculists.length);
			for (let i = 0; i < currentSegment.value.ridiculists.length; i++) {
				if (currentSegment.value.ridiculists[i]) {
					this.ridiculists[i] = currentSegment.ridiculists[i];
				}
			}
		}
		
		update() {
			const ridiculists = [];
			const ridiculistInputs = this.$.ridiculists.querySelectorAll('paper-input[name^="ridiculist"]');
			console.log(ridiculistInputs.length);
			currentSegment.value.hour = this.hour;
			currentSegment.value.title = this.title;
			currentSegment.value.docProvider = this.docProvider;
			currentSegment.value.docURL = this.docURL;
			currentSegment.value.artistName = this.artistName;
			currentSegment.value.artistURL = this.artistURL;			
			for (let i = 0; i < 6; i++) {
				if (ridiculistInputs[i].value) {					
					currentSegment.value.ridiculists[i] = ridiculistInputs[i].value;
				}
			}	
		}
		
	}
	customElements.define(GdSchedule.is, GdSchedule);
})();