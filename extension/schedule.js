'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const clone = require('clone');

const segment = nodecg.Replicant('segment');
const segments = nodecg.Replicant('segments');

const soundboard = nodecg.Replicant('assets:soundboard');

segment.on('change', newVal => {
	if (segment.value.updateMe) {
		segments.value[segment.value.hour] = clone(segment.value);
		segment.value.updateMe = false;
	}
});