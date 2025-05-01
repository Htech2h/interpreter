const { lexing } = require("./lexer");
const {parse} = require("./parser");

function run(input){
    let tokens= lexing(input);
    let parser = parse(tokens);
    console.log(tokens);
    console.log(JSON.stringify(parser,null,2));
}

run("print(2+3*4)");