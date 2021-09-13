function define_blocks(Blockly) {
    Blockly.Blocks['input'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("input(");
            this.appendValueInput("NAME")
                .setCheck(null);
            this.appendDummyInput()
                .appendField(")");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setColour('#F89621');
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    
    Blockly.Python['input'] = function (block) {
        var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
        var code = 'input(' +value_name+ ')';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
}

exports.define_blocks = define_blocks;