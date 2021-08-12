Blockly = require('blockly')
Blockly.Python = require('blockly/python')
require('../blockly/blockly_blocks.js')

$(document).ready(function () {
    var editor = Blockly.inject('blockly-code',
    {
        toolbox: document.getElementById('blockly-toolbox'),
        grid:
        {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        trashcan: true
    });
});