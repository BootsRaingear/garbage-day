'use strict';

// Native
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const {OBSUtility} = require('nodecg-utility-obs');

const nodecg = require('./util/nodecg-api-context').get();

const OBS = new OBSUtility(nodecg, {namespace: 'OBS'});
const sceneList = nodecg.Replicant('OBS:sceneList')
const currentLayout = nodecg.Replicant('currentLayout');

const onBreak = nodecg.Replicant('onBreak');

const currentScene = nodecg.Replicant('currentScene');

/*
function stopObsRecording(obs) {
	return new Promise((resolve,reject) => {
		let rejected = false;
		const timeout = setTimeout(() => {
			rejected = true;
			reject(new Error(`Times out waiting for ${obs.namespace} to stop recording.`));
		}, 30000);
		const recordingStoppedListener = () => {
			if (rejected) {
				return;
			}
			
			obs.log.info('Recording stopped.');
			clearTimeout(timeout);
			
			setTimeout(() => {
				resolve();
			}, 2500);
		};
		
		obs.once('RecordingStopped', recordingStoppedListener);
		obs.stopRecording().catch(error => {
			if (error.error === 'recording not active') {
				obs.removeListener('RecordingStopped', recordingStoppedListener);
				resolve();
			} else {
				obs.log.error(error);
				reject(error);
			}
		});
	});
}



module.exports = {
	setCurrentScene(sceneName) {
		console.log(sceneName);
		return OBS.setCurrentScene({
			'scene-name': sceneName
		});
	},
	

	
	async stopRecording() {
		nodecg.log.info('Stopping recording');

		const stoprecordingPromise = [];
		if (OBS._connected) {
			await stopObsRecording(OBS);
			nodecg.log.info('Recording successfully stopped.');
		} else {
			nodecg.log.error('OBS is disconnected! Not cycling its recording.');
		}
	},	

	startRecording() {
		OBS.startRecording();
	}


	
}
*/