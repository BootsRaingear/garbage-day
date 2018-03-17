(function () {
	const onBreak = nodecg.Replicant('onBreak');
	const sceneList = nodecg.Replicant('obs:sceneList');
	
	class GdObsControl extends Polymer.Element {
		static get is() {
			return 'gd-obs-control';
		}
		
		static get properties() {
			return {
				onBreak: {
					type: Boolean,
					value: false,					
				},
				obsScenes: Array,
			}
		};				
		
		ready() {
			super.ready();
			onBreak.on('change', newVal => {
				this.onBreak = newVal;
			});
			sceneList.on('change', newVal => {
				this.scenes = newVal;
			});
		}
		
		startBreak() {
			onBreak.value = true;
		}
		
		endBreak() {
			onBreak.value = false;
		}
		
		_handleSelectScene(e) {
			//nodecg.sendMessage('obsChangeScene', e.model.obsScene.base);
		}
				
	}
	customElements.define(GdObsControl.is, GdObsControl);			
})();