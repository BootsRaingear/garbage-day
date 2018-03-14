'use strict';

// Native
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const OBSUtility = require('nodecg-utility-obs');

const nodecg = require('./util/nodecg-api-context').get();

const OBS = new OBSUtility(nodecg, {namespace: 'obs'});
const sceneList = nodecg.Replicant('obs:sceneList')
const currentLayout = nodecg.Replicant('currentLayout');

const onBreak = nodecg.Replicant('onBreak');

const currentScene = nodecg.Replicant('currentScene');


function cycleRecording(obs) {
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
	}).then(() => {
	return obs.startRecording();
	});
}


module.exports = {
	setCurrentScene(sceneName) {
		return OBS.setCurrentScene({
			'scene-name': sceneName
		});
	},
	
	getCurrentScene() {
		//return OBS.getCurrentScene().values;
		//console.log(OBS.getCurrentScene().value);		
	},	
	
	async cycleRecordings() {
		nodecg.log.info('Cycling recordings...');

		const cycleRecordingPromises = [];
		if (OBS._connected) {
			cycleRecordingPromises.push(cycleRecording(OBS));
		} else {
			nodecg.log.error('Recording OBS is disconnected! Not cycling its recording.');
		}

		if (cycleRecordingPromises.length <= 0) {
			nodecg.log.warn('OBS is not connected, aborting cycleRecordings.');
			return;
		}

		await Promise.all(cycleRecordingPromises);

		nodecg.log.info('Recordings successfully cycled.');
	},
	

	
}
