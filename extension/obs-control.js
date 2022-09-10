'use strict';


const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const OBSUtility = require('nodecg-utility-obs');
const nodecg = require('./util/nodecg-api-context').get();

const obs = require('./obs');

const onBreak = nodecg.Replicant('onBreak');
const currentScene = nodecg.Replicant('currentScene');

const sceneList = nodecg.Replicant('OBS:sceneList');


onBreak.on('change', newVal => {
	if (onBreak.value === true) {
		nodecg.log.info('starting break');		
		ChangeScene(nodecg.bundleConfig.obs.breakScene);
		//obs.stopRecording();
	} else {
		nodecg.log.info('ending break');
		//obs.startRecording();
		ChangeScene(nodecg.bundleConfig.obs.liveScene);
	}
});

function ChangeScene (scenename)
{
	nodecg.sendMessage('obs:transition', 'Fade', 1, scenename);
}

