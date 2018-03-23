(function () {
	const freewrite = nodecg.Replicant('freewrite');
	
	class GdFreewrite extends Polymer.Element {
		static get is() {
			return 'gd-freewrite';
		}
		
		static get properties() {
			return {
				active: {
					type: Boolean,
					value: false
				},				
				content: {
					type: String,
					value: ""
				},
				img: {
					type: String,
					value: ""
				},
				location: {
					type: Number,
					value: "center"
				}				
			}
		};

		
		ready() {
			super.ready();

			freewrite.on('change', newVal => {
				this.active = newVal.active;
				this.content = newVal.content;
				this.img = newVal.img;
				this.location = newVal.location;
			});			
		}
		
		enable() {
			freewrite.active = true;
			freewrite.content = this.content;
			freewrite.img = this.img;
			freewrite.location = this.location;
		}
		
		disable() {			
			freewrite.active = false;
		}
		
		clear() {
			freewrite.value.content = "";
			freewrite.value.img = "";
			freewrite.value.location = "center";
		}

	}
	customElements.define(GdFreewrite.is, GdFreewrite);			
})();