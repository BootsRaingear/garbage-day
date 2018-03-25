(function () {
	const freewrite = nodecg.Replicant('freewrite');

	// VALID LOCATIONS: center, top, right, bottom, left, top-left, top-right, bottom-left, bottom-right	
	
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
				},
				locations: {
					type: Array,
					value: ["center", "top", "right", "bottom", "left", "top-left", "top-right", "bottom-left", "bottom-right"]

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
		
		enableFreewrite() {
			console.log(freewrite);
			freewrite.value.active = true;
			freewrite.value.content = this.content;
			freewrite.value.img = this.img;
			freewrite.value.location = this.location;
		}
		
		disableFreewrite() {			
			freewrite.value.active = false;
		}
		
		updateFreewrite() {
			freewrite.value.content = this.content;
			freewrite.value.img = this.img;
			freewrite.value.location = this.location;
		}
		
		clear() {
			console.log("clear freewrite");
			freewrite.value.content = "";
			freewrite.value.img = "";
			freewrite.value.location = "center";
		}

	}
	customElements.define(GdFreewrite.is, GdFreewrite);			
})();