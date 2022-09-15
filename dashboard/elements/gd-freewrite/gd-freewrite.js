(function () {
	const freewrite = nodecg.Replicant('freewrite');
	const albertClass = nodecg.Replicant('albertClass');
	
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
				},
				albertClass: {
					type: Number,
					value: ""
				},
				albertClasses: {
					type: Array,
					value: [

						// Animations
						"jogging", 
						"running",
						"throb",
						"spin",
						"storm",
						"cataracts",
						"vibrate",
						"rave",
						"drunk",
						"flipping",
						"ghost",

						// Other Visual Effecs
						"no-outlines",
						"no-trash",
						"only-trash",
						"dropshadow",
						"queen",
						"censored",
						"huge",
						"backwards",
						"portaxx",
						"aibert-1",
						"aibert-2",
						"aibert-3",
						"aibert-4",
						"aibert-5",
						"aibert-6",
						"aibert-7",
						"aibert-8",


						// Colors
						"oversaturate",
						"invert",
						"sepia",
						"contrast",
						"grayscale",
						"black",
						"blue",
						"brown",
						"green",
						"teal",
						"white",
						"tan",
						"yellow",
						"orange",
						"red",
						"pink",
						"purple"
					]
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

			albertClass.on('change', newVal => {
				this.albertClass = newVal;
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
		
		setAlbert() {
			albertClass.value = this.albertClass;
		}

		resetAlbert() {
			albertClass.value = "";
		}		

	}
	customElements.define(GdFreewrite.is, GdFreewrite);			
})();