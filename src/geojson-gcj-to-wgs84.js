const fs = require('fs');
const _ = require('lodash');
const { gcj02towgs84 } = require('coordtransform');


function isCoordinates(data) {
    return _.isArray(data) && data.length === 2 && _.isNumber(data[0]) && _.isNumber(data[1]);
}

function transformeCoordinate(coordinate) {
    if (isCoordinates(coordinate)) {
        return gcj02towgs84(...coordinate);
    } else {
        return coordinate.map(coord => transformeCoordinate(coord));
    }
}

function geojsonGciToWGS84(inputFile, outputFile) {
    const sourceContent = fs.readFileSync(inputFile, { encoding: 'utf-8' });
    const source = (new Function(`return ${sourceContent}`))();
    const features = source.features || [];
    const transformed = features.map((feature) => {
        const coordinates = feature.geometry.coordinates;
        return { 
            ...feature, 
            geometry: {
                ...feature.geometry,
                coordinates: transformeCoordinate(coordinates)
            }  
        };
    });
    const crs = {
        type: "name",
        properties: {
            name: "urn:ogc:def:crs:EPSG::4326"
        }
    };
    const result = { ...source, features: transformed, crs };
    fs.writeFileSync(outputFile, JSON.stringify(result), { encoding: 'utf-8' });
}

module.exports = geojsonGciToWGS84;