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

