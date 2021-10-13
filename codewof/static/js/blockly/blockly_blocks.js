function define_blocks(Blockly) {

    // Colors

    const statementsColor = "#7dba68";
    const stringsColor = "#d6544d";
    const numbersColor = "#f89621";
    const loopsColor = "#7e6bcf";
    const variablesColor = "#3d7fff";
    const logicColor = "#e065d2";
    const listsColor = "#75acd1";

    // Statements

    Blockly.Blocks['print'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('print(')
          this.appendValueInput('var')
            .setCheck(null);
          this.appendDummyInput()
            .appendField(')');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(statementsColor);
          this.setTooltip('Use this to print a variable.');
          this.setHelpUrl('');
        },
    };

    Blockly.Python['print'] = function (block) {
        const text_const = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
        const code = 'print(' + text_const + ')\n';
        return code;
    };

    Blockly.Blocks['input'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("input(\"");
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(""), "text");
            this.appendDummyInput()
                .appendField("\")");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(statementsColor);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    
    Blockly.Python['input'] = function (block) {
        var text_text = block.getFieldValue('text');
        var code = `input("${text_text}")`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['count'] = {
        init: function () {
            this.appendValueInput("list")
                .setCheck(null);
            this.appendDummyInput()
                .appendField('.count(');
            this.appendValueInput("var")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(')');
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(statementsColor);
            this.setTooltip('Counts the occurences of a value');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['count'] = function (block) {
        var list_value = Blockly.Python.valueToCode(block, 'list', Blockly.Python.ORDER_ATOMIC);
        var var_value = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
        const code = `${list_value}.count(${var_value})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['length'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('len(');
            this.appendValueInput("var")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(')');
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(statementsColor);
            this.setTooltip('Calculates the length of the value');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['length'] = function (block) {
        var var_value = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
        const code = `len(${var_value})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    // Strings

    Blockly.Blocks['new_text'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('"');
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(""), "text");
            this.appendDummyInput()
                .appendField('"');
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(stringsColor);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setTooltip("Text input for inline input");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['new_text'] = function(block) {
        var text_text = block.getFieldValue('text');
        var code = `"${text_text}"`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['cast_str'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('str(');
            this.appendValueInput("bool")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(")")
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(stringsColor);
            this.setTooltip('Changes to an str');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['cast_str'] = function (block) {
        var value_bool = Blockly.Python.valueToCode(block, 'bool', Blockly.Python.ORDER_ATOMIC);
        const code = 'str(' +  value_bool+ ')';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['add_operator'] = {
        init: function() {
          this.appendValueInput("in1")
              .setCheck(null);
          this.appendDummyInput()
              .appendField("+");
          this.appendValueInput("in2")
              .setCheck(null);
          this.setInputsInline(true);
          this.setOutput(true, null);
          this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
          this.setColour(stringsColor);
        }
    };

    Blockly.Python['add_operator'] = function(block) {
        var value_in1 = Blockly.Python.valueToCode(block, 'in1', Blockly.Python.ORDER_ATOMIC);
        var value_in2 = Blockly.Python.valueToCode(block, 'in2', Blockly.Python.ORDER_ATOMIC);
        var code = value_in1 + "+" + value_in2;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['starts_with'] = {
        init: function () {
            this.appendValueInput("string")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(".startswith(");
            this.appendValueInput("test_str")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(")");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(stringsColor);
            this.setTooltip('Checks if a string starts with the given value');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['starts_with'] = function (block) {
        var value_string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
        var value_test_str = Blockly.Python.valueToCode(block, 'test_str', Blockly.Python.ORDER_ATOMIC);
        const code = `${value_string}.startswith(${value_test_str})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['string_lower'] = {
        init: function () {
            this.appendValueInput("string")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(".lower()");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(stringsColor);
            this.setTooltip('Makes a string lowercase');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['string_lower'] = function (block) {
        var value_string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
        const code = `${value_string}.lower()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['string_upper'] = {
        init: function () {
            this.appendValueInput("string")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(".upper()");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(stringsColor);
            this.setTooltip('Makes a string uppercase');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['string_upper'] = function (block) {
        var value_string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
        const code = `${value_string}.upper()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['string_title'] = {
        init: function () {
            this.appendValueInput("string")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(".title()");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(stringsColor);
            this.setTooltip('Makes a string title case');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['string_title'] = function (block) {
        var value_string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
        const code = `${value_string}.title()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    // Numbers

    Blockly.Blocks['new_int'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(""), "number");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(numbersColor);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setTooltip("Number input for inline input");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['new_int'] = function(block) {
        var code = block.getFieldValue('number');
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['new_float'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(""), "number");
            this.appendDummyInput()
                .appendField(".")
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(""), "decimal");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(numbersColor);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setTooltip("Create a new floating point number");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['new_float'] = function(block) {
        var number = block.getFieldValue('number');
        var decimal = block.getFieldValue('decimal');
        var code = `${number}.${decimal}`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['cast_int'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('int(');
            this.appendValueInput("bool")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(")")
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(numbersColor);
            this.setTooltip('Changes to an int');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['cast_int'] = function (block) {
        var value_bool = Blockly.Python.valueToCode(block, 'bool', Blockly.Python.ORDER_ATOMIC);
        const code = 'int(' +  value_bool+ ')';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['cast_float'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('float(');
            this.appendValueInput("var")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(")")
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(numbersColor);
            this.setTooltip('Casts the value to a float');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['cast_float'] = function (block) {
        var value_var = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
        const code = `float(${value_var})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['math_operators'] = {
        init: function() {
            this.appendValueInput("first")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["+","+"], ["-","-"], ["/","/"], ["%","%"], ["*","*"]]), "operators");
            this.appendValueInput("last")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(numbersColor);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['math_operators'] = function(block) {
        var value_first = Blockly.Python.valueToCode(block, 'first', Blockly.Python.ORDER_ATOMIC);
        var text_choose = block.getFieldValue('operators');
        var value_last = Blockly.Python.valueToCode(block, 'last', Blockly.Python.ORDER_ATOMIC);
        var code = value_first+ ' ' +text_choose+ ' ' +value_last;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    // Loops

    Blockly.Blocks['while_loop'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('while');
            this.appendValueInput("cond")
                .setCheck("Boolean");
            this.appendDummyInput()
                .appendField(':');
            this.appendStatementInput('DO')
                .appendField('');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(loopsColor);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    };

    Blockly.Python['while_loop'] = function (block) {
        var text_1 = Blockly.Python.valueToCode(block, 'cond', Blockly.Python.ORDER_ATOMIC);
        let branch = Blockly.Python.statementToCode(block, 'DO');
        branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
        const code = 'while ' + text_1 + ':\n' + branch;
        return code;
    };

    Blockly.Blocks['for_loop'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('for');
            this.appendValueInput('x')
                .setCheck(null);
            this.appendDummyInput()
                .appendField('in');
            this.appendValueInput('y')
                .setCheck(null);
            this.appendDummyInput()
                .appendField(":");
            this.appendStatementInput('DO')
                .setCheck(null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(loopsColor);
            this.setTooltip('');
            this.setHelpUrl('');
        }
    }

    Blockly.Python['for_loop'] = function (block) {
        let branch = Blockly.Python.statementToCode(block, 'DO');
        branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
        const text_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC)
        const text_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC)
        const code = 'for ' + text_x + ' in ' + text_y + ':\n' + branch;
        return code;
    };

    // Variables

    Blockly.Blocks['variables_get'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("var"), "VAR");
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(variablesColor);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['variables_get'] = function(block) {
        var variable_var = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
        var code = variable_var;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    
    Blockly.Blocks['variables_set'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable(""), "VAR")
                .appendField(new Blockly.FieldDropdown([['=', '='], ['+=', '+='], ["-=", "-="]]), 'NAME')
            this.appendValueInput("varset")
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(variablesColor);
            this.setTooltip("assign a value, increment, or decrement a variable");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['variables_set'] = function(block) {
        var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
        var text_text = block.getFieldValue('NAME');
        var value_name = Blockly.Python.valueToCode(block, 'varset', Blockly.Python.ORDER_ATOMIC);
        var code = variable_name + ' ' +text_text+ ' ' +value_name+ '\n';
        return code;
    };

    // Logic

    Blockly.Blocks['new_bool'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["True","True"], ["False","False"]]), "boolean");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(logicColor);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setTooltip("Boolean input for inline input");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['new_bool'] = function(block) {
        var code = block.getFieldValue('boolean');
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['logic_if'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('if');
            this.appendValueInput("iftext")
                .setCheck("Boolean");
            this.appendDummyInput()
                .appendField(':');
            this.appendStatementInput('ifstate')
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(logicColor);
            this.setTooltip('If block with inline input');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['logic_if'] = function (block) {
        let branch = Blockly.Python.statementToCode(block, 'ifstate');
        branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
        const value_iftext = Blockly.Python.valueToCode(block, 'iftext', Blockly.Python.ORDER_ATOMIC);
        const code = 'if ' + value_iftext + ':\n' + branch;
        return code;
    };

    Blockly.Blocks['logic_elif'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('elif');
            this.appendValueInput('iftext')
                .setCheck(null)
            this.appendDummyInput()
                .appendField(':');
            this.appendStatementInput('ifstate')
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(logicColor);
            this.setTooltip('ElIf block with inline input');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['logic_elif'] = function (block) {
        let branch = Blockly.Python.statementToCode(block, 'ifstate');
        branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
        const value_iftext = Blockly.Python.valueToCode(block, 'iftext', Blockly.Python.ORDER_ATOMIC);
        const code = 'elif ' + value_iftext + ':\n' + branch;
        return code;
    };

    Blockly.Blocks['logic_else'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('else:');
            this.appendStatementInput('DO')
                .appendField('');
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(logicColor);
            this.setTooltip('Else statement');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['logic_else'] = function (block) {
        let branch = Blockly.Python.statementToCode(block, 'DO'); 
        branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
        return 'else:\n' + branch;
    };

    Blockly.Blocks['comparison_operator'] = {
        init: function() {
            var ltrOperators = [
            ['==', '=='],
            ['!=', '!='],
            ['<', '<'],
            ['<=', '<='],
            ['>', '>'],
            ['>=', '>=']
            ];
            var OPERATORS = ltrOperators;
            this.appendValueInput("first")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown(OPERATORS), "choose")
            this.appendValueInput("last")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(logicColor);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['comparison_operator'] = function(block) {
        var value_first = Blockly.Python.valueToCode(block, 'first', Blockly.Python.ORDER_ATOMIC);
        var text_choose = block.getFieldValue('choose');
        var value_last = Blockly.Python.valueToCode(block, 'last', Blockly.Python.ORDER_ATOMIC);
        var code = value_first+ ' ' +text_choose+ ' ' +value_last;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['logic_operator'] = {
        init: function() {
            this.appendValueInput("first")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([["and", "and"], ["or", "or"]]), "choose")
            this.appendValueInput("last")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(logicColor);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['logic_operator'] = Blockly.Python['comparison_operator'];

    Blockly.Blocks['not_operator'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('not'); 
            this.appendValueInput("bool")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(logicColor);
            this.setTooltip('negates a Boolean value');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['not_operator'] = function (block) {
        var value_bool = Blockly.Python.valueToCode(block, 'bool', Blockly.Python.ORDER_ATOMIC);
        const code = 'not ' +  value_bool;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    // Lists

    Blockly.Blocks['new_list'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('[');
            this.appendDummyInput()
                .appendField(new Blockly.FieldTextInput(""), "items");
            this.appendDummyInput()
                .appendField(']');
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(listsColor);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setTooltip("Create a new list from comma separated values");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['new_list'] = function(block) {
        var items = block.getFieldValue('items');
        var code = `[${items}]`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['idx_list'] = {
        init: function () {
            this.appendValueInput("list")
                .setCheck(null);
            this.appendDummyInput()
                .appendField('[');
            this.appendValueInput("index")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(']');
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(listsColor);
            this.setTooltip('Retrieve list element using index');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['idx_list'] = function (block) {
        var list_value = Blockly.Python.valueToCode(block, 'list', Blockly.Python.ORDER_ATOMIC);
        var index_value = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC);
        const code = `${list_value}[${index_value}]`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Blocks['in_list'] = {
        init: function () {
            this.appendValueInput("var")
                .setCheck(null);
            this.appendDummyInput()
                .appendField('in');
            this.appendValueInput("list")
                .setCheck(null);
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour(listsColor);
            this.setTooltip('Checks if a variable is in a list');
            this.setHelpUrl('');
        },
    };

    Blockly.Python['in_list'] = function (block) {
        var var_value = Blockly.Python.valueToCode(block, 'var', Blockly.Python.ORDER_ATOMIC);
        var list_value = Blockly.Python.valueToCode(block, 'list', Blockly.Python.ORDER_ATOMIC);
        const code = `${var_value} in ${list_value}`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
}

exports.define_blocks = define_blocks;