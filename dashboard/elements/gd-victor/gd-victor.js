(function () {
	const soundboard = nodecg.Replicant('assets:victor');
	
	class GdVictor extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'gd-victor';
		}
		
		static get properties() {
			return {
				soundclips: Array,
			}
		};
				
		ready() {
			super.ready();
			
			soundboard.on('change', newVal => {				
				this.soundclips = []; 	// forces browser to detect change in items.
				this.soundclips = newVal;
				this.formattedName = [];
				for (var i = 0; i < newVal.length; i++) {
					var newname = newVal[i].name.replace(/_/g, ' ');
					newname = newname.replace(/\(Q\)/g, '?');
					this.soundclips[i].formattedName = newname;
				}
			});
		}
		
		_handlePlaySound(e) {
			nodecg.sendMessage('victorPlay', e.model.item.base);
		}
		
		_sort(a, b) {
			if (a.name === b.name) return 0;
			return a.name < b.name ? -1 : 1;		
		}
		
	}
	customElements.define(GdVictor.is, GdVictor);			
})();