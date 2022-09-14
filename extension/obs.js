'use strict';

// Native
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const {OBSUtility} = require('nodecg-utility-obs');

const nodecg = require('./util/nodecg-api-context').get();

const OBS = new OBSUtility(nodecg, {namespace: 'OBS'});
const sceneList = nodecg.Replicant('OBS:sceneList')

const onBreak = nodecg.Replicant('onBreak');
const currentScene = nodecg.Replicant('currentScene');


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
    nodecg.log.info('changing scene to: ' + scenename);
    nodecg.sendMessage('OBS:transition', 'Luma Wipe', 1, scenename);
    currentScene.value = scenename;
}