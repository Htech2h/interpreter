//const lexing = require("./lexer");

function parse(tokens) {
    let index = 0;

    const parseExpression = () => {
        const left = parseTerm();

        while (index < tokens.length && (tokens[index].value === "+" || tokens[index].value === "-")) {
            const operator = tokens[index].value;
            index++;
            let right = parseTerm(); 
            return { type: "binaryExpression","operator": operator,"left": left,"right": right };
        }
        return left;
    };

    const parseTerm = () => {
        const left = parseFactor();

        while (index < tokens.length && (tokens[index].value === "*" || tokens[index].value === "/")) {
            const operator = tokens[index].value;
            index++;
            let right = parseTerm(); 
            return { type: "binaryExpression","operator": operator, "left":left,"right": right };
        }
        return left;
    };

    const parseFactor = () => {
        if (tokens[index].type === "number") {
            const value = tokens[index].value; 
            index++;
            return { type: "numberLiteral", value };
        }

        if (tokens[index].type === "identifier") {
            const value = tokens[index].value; 
            index++;
            return { type: "identifier", value };
        }

        if (tokens[index].value === "(") {
            index++;
            const expression = parseExpression();
            if (tokens[index].value === ")") {
                index++;
                return expression;
            } else {
                throw new Error("expected )");
            }
        }

        throw new Error("token unexpected: " + tokens[index].value); 
    };

    const callExpression = () => {
        const name = tokens[index].value;
        index++;
        if (tokens[index].value !== "(") throw new Error("expected (");
        index++;
        
        const args = [parseExpression()];
    
        
        if (tokens[index].value !== ")") throw new Error("expected )");
        index++;
        
        return { type: "callExpression", "name":name, 'arguments': args };
    };

    return callExpression();
}

module.exports = { parse };