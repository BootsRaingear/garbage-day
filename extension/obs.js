'use strict';

// Native
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const OBSUtility = require('nodecg-utility-obs');

const nodecg = require('./util/nodecg-api-context').get();

const obs = new OBSUtility(nodecg, {namespace: 'obs'});
const currentLayout = nodecg.Replicant('currentLayout');

function cycleRecording() {
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
		return streamingOBS.setCurrentScene({
			'scene-name': sceneName
		});
	},
	
	
	async cycleRecordings() {
		nodecg.log.info('Cycling recordings...');

		const cycleRecordingPromises = [];
		if (obs._connected) {
			cycleRecordingPromises.push(cycleRecording(obs));
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
