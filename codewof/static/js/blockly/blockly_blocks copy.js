Blockly.Blocks['webifinline'] = {
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
        this.setColour("#49B04D");
        this.setTooltip('If block with inline input');
        this.setHelpUrl('');
    },
};

Blockly.Blocks['webelifinline'] = {
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
        this.setColour("#49B04D");
        this.setTooltip('ElIf block with inline input');
        this.setHelpUrl('');
    },
};

Blockly.Blocks['webelse'] = {
    init: function () {
        this.appendDummyInput()
        .appendField('else:');
        this.appendStatementInput('DO')
        .appendField('');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#49B04D");
        this.setTooltip('Else statement');
        this.setHelpUrl('');
    },
};

Blockly.Python['webifinline'] = function (block) {
    let branch = Blockly.Python.statementToCode(block, 'ifstate');
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
    const value_iftext = Blockly.Python.valueToCode(block, 'iftext', Blockly.Python.ORDER_ATOMIC);
    const code = 'if ' + value_iftext + ':\n' + branch;
    return code;
  };

Blockly.Python['webelifinline'] = function (block) {
    let branch = Blockly.Python.statementToCode(block, 'ifstate');
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
    const value_iftext = Blockly.Python.valueToCode(block, 'iftext', Blockly.Python.ORDER_ATOMIC);
    // const statements_ifstate = Blockly.Python.statementToCode(block, 'ifstate');
    // TODO: Assemble Python into code variable.
    const code = 'elif ' + value_iftext + ':\n' + branch;
    return code;
};

Blockly.Python['webelse'] = function (block) {
    let branch = Blockly.Python.statementToCode(block, 'DO'); 
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
    return 'else:\n' + branch;
};

Blockly.Blocks['ast_If'] = {
    init: function () {
        this.orelse_ = 0;
        this.elifs_ = 0;
        this.appendValueInput('TEST')
            .appendField("if");
        this.appendStatementInput("BODY")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#49B04D");
        this.updateShape_();
    },
    // TODO: Not mutable currently
    updateShape_: function () {
        let latestInput = "BODY";
        for (var i = 0; i < this.elifs_; i++) {
            if (!this.getInput('ELIF' + i)) {
                this.appendValueInput('ELIFTEST' + i)
                    .appendField('elif');
                this.appendStatementInput("ELIFBODY" + i)
                    .setCheck(null);
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ELIFTEST' + i)) {
            this.removeInput('ELIFTEST' + i);
            this.removeInput('ELIFBODY' + i);
            i++;
        }

        if (this.orelse_ && !this.getInput('ELSE')) {
            this.appendDummyInput('ORELSETEST')
                .appendField("else:");
            this.appendStatementInput("ORELSEBODY")
                .setCheck(null);
        } else if (!this.orelse_ && this.getInput('ELSE')) {
            block.removeInput('ORELSETEST');
            block.removeInput('ORELSEBODY');
        }

        for (i = 0; i < this.elifs_; i++) {
            if (this.orelse_) {
                this.moveInputBefore('ELIFTEST' + i, 'ORELSETEST');
                this.moveInputBefore('ELIFBODY' + i, 'ORELSETEST');
            } else if (i+1 < this.elifs_) {
                this.moveInputBefore('ELIFTEST' + i, 'ELIFTEST' + (i+1));
                this.moveInputBefore('ELIFBODY' + i, 'ELIFBODY' + (i+1));
            }
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        let container = document.createElement('mutation');
        container.setAttribute('orelse', this.orelse_);
        container.setAttribute('elifs', this.elifs_);
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.orelse_ = "true" === xmlElement.getAttribute('orelse');
        this.elifs_ = parseInt(xmlElement.getAttribute('elifs'), 10) || 0;
        this.updateShape_();
    },
};

Blockly.Python['ast_If'] = function (block) {
    // Test
    let test = "if " + (Blockly.Python.valueToCode(block, 'TEST',
        Blockly.Python.ORDER_NONE) || Blockly.Python.blank) + ":\n";
    // Body:
    let body = Blockly.Python.statementToCode(block, 'BODY') || Blockly.Python.PASS;
    // Elifs
    let elifs = new Array(block.elifs_);
    for (let i = 0; i < block.elifs_; i++) {
        let elif = block.elifs_[i];
        let clause = "elif " + (Blockly.Python.valueToCode(block, 'ELIFTEST' + i,
            Blockly.Python.ORDER_NONE) || Blockly.Python.blank);
        clause += ":\n" + (Blockly.Python.statementToCode(block, 'ELIFBODY' + i) || Blockly.Python.PASS);
        elifs[i] = clause;
    }
    // Orelse:
    let orelse = "";
    if (this.orelse_) {
        orelse = "else:\n" + (Blockly.Python.statementToCode(block, 'ORELSEBODY') || Blockly.Python.PASS);
    }
    return test + body + elifs.join("") + orelse;
};