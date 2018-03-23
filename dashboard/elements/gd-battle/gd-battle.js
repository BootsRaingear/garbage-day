(function () {
	const battle = nodecg.Replicant('battle');
	
	class GdBattle extends Polymer.Element {
		static get is() {
			return 'gd-battle';
		}
		
		static get properties() {
			return {
				active: {
					type: Boolean,
					value: false
				},				
				option1title: {
					type: String,
					value: ""
				},
				option1keyword: {
					type: String,
					value: ""
				},
				option1total: {
					type: Number,
					value: 0
				},
				option2title: {
					type: String,
					value: ""
				},
				option2keyword: {
					type: String,
					value: ""
				},
				option2total: {
					type: Number,
					value: 0
				},
				
			}
		};

		
		ready() {
			super.ready();

			battle.on('change', newVal => {
				this.active = newVal.active;
				this.option1title = newVal.option1title;
				this.option1keyword = newVal.option1keyword;
				this.option1total = newVal.option1total;
				this.option2title = newVal.option2title;
				this.option2keyword = newVal.option2keyword;
				this.option2total = newVal.option2total;				
			});			
		}
		
		startBattle() {
			battle.value.active = true;
			battle.value.option1title = this.option1title;
			battle.value.option1keyword = this.option1keyword;
			battle.value.option2title = this.option2title;
			battle.value.option2keyword = this.option2keyword;
		}
		
		endBattle() {
			battle.value.active = false;
		}
		
		clear() {
			battle.value.option1title = "";
			battle.value.option1keyword = "";
			battle.value.option1total = 0;
			battle.value.option2title = "";
			battle.value.option2keyword = "";
			battle.value.option2total = 0;
		}

	}
	customElements.define(GdBattle.is, GdBattle);			
})();