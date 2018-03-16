'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const clone = require('clone');

const segment = nodecg.Replicant('segment');
const segments = nodecg.Replicant('segments');

segment.on('change', newVal => {
	console.log("segment changed");
	segments.value[segment.value.hour] = clone(segment.value);
});