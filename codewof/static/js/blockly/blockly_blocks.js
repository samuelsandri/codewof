Blockly.Blocks['python_if'] = {
    init: function() {
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
        this.setColour("#FF0000");
        this.setTooltip('If block with inline input');
        this.setHelpUrl('');
    }
};

Blockly.Python['python_if'] = function (block) {
    let branch = Blockly.Python.statementToCode(block, 'ifstate');
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
    const value_iftext = Blockly.Python.valueToCode(block, 'iftext', Blockly.Python.ORDER_ATOMIC);
    const code = 'if ' + value_iftext + ':\n' + branch;
    return code;
};