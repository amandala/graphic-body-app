/**
 * Uses nconf pacakge to save and retrieve configuration information from local storage and
 */


'use strict';

var fs = require('fs');
var nconf = require('nconf').file({file: getUserHome() + '/graphic-body-config.json'});


/*********** File save functions ***************/

/** decide the users platform to determine the location of the home folder to store config settings **/
function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}


/**
 * Creates a file name with file extension and writes the given data to it
 * @param fileName
 * @param data
 */

function saveToFile(fileName, data){
    fs.writeFile(getUserHome() + '/' + fileName, data, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


/**
 * Checks to see what storage is available for use
 */

(function checkStorage(){
    if (storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
    }
    else {
        // Too bad, no localStorage for us
    }
})();


/**  helper function for local storage availability inquiry **/
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}


/**************** Gather data functions ******************************/




/*************** Local storage functions ****************/

/**
 * nconf stuff TODO document
 * @param settingKey
 * @param settingValue
 */

// Saves settings to nconf local storage
function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

// Read settings from ncofn local storage
function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};

/*
//testing save config file
saveSettings('key', 'value');
saveSettings('key2', 'value 2');

console.log(nconf.get('key'));

console.log(getUserHome());


nconf.save(function (err, data) {
    fs.readFile(getUserHome() + 'graphic-body-config.json', function (err, data) {
        console.dir(JSON.parse(data.toString()))
    });
}); //random error on to string in callback

*/





