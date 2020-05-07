#!/usr/bin/env node

const { program } = require('commander');
const geojsonGciToWGS84 = require('../src/geojson-gcj-to-wgs84.js');

program
    .command('geojson <inputFile> <outputFile>')
    .description('将高德坐标系的GeoJSON转换成WGS84坐标系的GeoJSON.')
    .action((inputFile, outputFile) => {
        geojsonGciToWGS84(inputFile, outputFile);
    });


program.parse(process.argv);
 
if (program.float !== undefined) console.log(`float: ${program.float}`);
if (program.integer !== undefined) console.log(`integer: ${program.integer}`);
if (program.verbose > 0) console.log(`verbosity: ${program.verbose}`);
// if (program.collect.length > 0) console.log(program.collect);
if (program.list !== undefined) console.log(program.list);