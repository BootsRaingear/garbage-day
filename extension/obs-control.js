'use strict';

// Native
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const OBSUtility = require('nodecg-utility-obs');

const nodecg = require('./util/nodecg-api-context').get();

const obs = require('./obs');

const sceneList = nodecg.Replicant('obs:sceneList')
const currentLayout = nodecg.Replicant('currentLayout');

const onBreak = nodecg.Replicant('onBreak');

const currentScene = nodecg.Replicant('currentScene');


onBreak.on('change', newVal => {
	if (onBreak.value === true) {
		nodecg.log.info('starting break');		
		obs.setCurrentScene('3_interstitial');
		obs.cycleRecordings();		
	} else {
		nodecg.log.info('ending break');
		obs.cycleRecordings();
		obs.setCurrentScene(currentScene.value);
	}
});

