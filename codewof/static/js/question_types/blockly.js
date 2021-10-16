var base = require('./base.js');
const introJS = require('intro.js');
var Blockly = require('blockly');
Blockly.Python = require('blockly/python');
require('../blockly/blockly_blocks').define_blocks(Blockly);

var blocklyTheme = {
    'categoryStyles': {
        'variables_category': {
            'colour': '#3d7fff'
        },
        'statements_category': {
            'colour': '#7dba68'
        },
        'strings_category': {
            'colour': '#d6544d'
        },
        'numbers_category': {
            'colour': '#f89621'
        },
        'logic_category': {
            'colour': '#e065d2'
        },
        'loops_category': {
            'colour': '#7e6bcf'
        },
        'lists_category': {
            'colour': '#75acd1'
        }
    },
    'componentStyles': {
        'toolboxBackgroundColour': '#4a4a4a',
        'toolboxForegroundColour': '#FFFFFF'
    }
}

var test_cases = {};

$(document).ready(function () {

    for (let i = 0; i < test_cases_list.length; i++) {
        data = test_cases_list[i];
        test_cases[data.id] = data
    }

    setTutorialAttributes();
    $("#introjs-tutorial").click(function() {
        introJS().start().onbeforechange(function() {
            currentElement = $(this._introItems[this._currentStep].element);
            node = currentElement.prop('nodeName');
            // When looking at a full row of the table, force it to scroll to the far left
            // so the highlight only overhangs to the right
            if (node == 'TABLE' || node == 'TR') {
                currentElement = currentElement.find('td:first-of-type')
            }
            containerId = 'table-container';
            base.scroll_to_element(containerId, currentElement);
        });
    });

    setup_blockly();
});

function setup_blockly() {
    var blocklyWorkspace = Blockly.inject('blockly-code',
    {
        toolbox: document.getElementById('blockly-toolbox'),
        theme: blocklyTheme
    });

    $('#run_code').click(function () {
        run_blockly_code(blocklyWorkspace, true);
    });
}

function run_blockly_code(blocklyWorkspace, submit) {

    base.clear_submission_feedback();
    for (var id in test_cases) {
        if (test_cases.hasOwnProperty(id)) {
            var test_case = test_cases[id];
            test_case.received_output = '';
            test_case.passed = false;
            test_case.runtime_error = false;
            test_case.test_input_list = test_case.test_input.split('\n')
        }
    }

    var user_code = Blockly.Python.workspaceToCode(blocklyWorkspace);
    
    test_cases = base.run_test_cases(test_cases, user_code, run_python_code);
}

function run_python_code(user_code, test_case) {
    // Configure Skulpt for running Python code
    Sk.configure({
        // Setup Skulpt to read internal library files
        read: function (x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        },
        inputfun: function (str) {
            if (test_case.test_input_list.length > 0) {
                return test_case['test_input_list'].shift();
            } else {
                return '';
            }
        },
        inputfunTakesPrompt: true,
        // Append print() statements for test case
        output: function (received_output) {
            test_case['received_output'] += received_output;
        },
        python3: true,
        execLimit: 1000,
    });
    if (typeof user_code == 'string' && user_code.trim()) {
        try {
            Sk.importMainWithBody("<stdin>", false, user_code, true);
        } catch (error) {
            if (error.hasOwnProperty('traceback')) {
                test_case.received_output = error.toString();
                test_case.runtime_error = true;
            } else {
                throw error;
            }
        }
    } else {
        test_case.received_output = 'No Blockly code provided.';
        test_case.runtime_error = true;
    }
}

function setTutorialAttributes() {
    $(".question-text").attr(
        'data-intro',
        'This is a description of what the code should do. It will tell you what your program should print for certain inputs.'
    );
    $("#python-editor").attr(
        'data-intro',
        "This is where you enter your code to solve the problem."
    );
    $("#run_code").attr(
        'data-intro',
        "Clicking this button will run your code against the test cases."
    );
    $("#test-case-table").attr(
        'data-intro',
        "These are the test cases that will be run against your program."
    );
    // the first row in the test case table
    $('#test-case-table tbody tr:nth-child(1)').attr(
        'data-intro',
        'Here is the first test case.'
    );
    // the input for the first test case
    $('#test-case-table tbody tr:nth-child(1) td:eq(0)').attr(
        'data-intro',
        'If your program asks a user for input, each of these lines will be passed to your program in place of a real user.'
    );
    // the expected output for the first test case
    $('#test-case-table tbody tr:nth-child(1) td:eq(1)').attr(
        'data-intro',
        'This is the output that the test expects your program to print for the given input.'
    );
    // the received output for the first test case
    $('#test-case-table tbody tr:nth-child(1) td:eq(2)').attr(
        'data-intro',
        'This is the output that your program has printed for the given input.'
    );
    // the status of the first test case
    $('#test-case-table tbody tr:nth-child(1) td:eq(3)').attr(
        'data-intro',
        "A test case will pass if the received output matches the expected output. If all test cases pass the question has been solved."
    );
}