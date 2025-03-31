function lexing(input){
    let tokens = [],c,i=0;

    let isOperator=(c)=>{
        return ['+','-','*','/','%','^','&','|','=','!','<','>'].includes(c);
    }, 

    isDigit=(c)=>{return /[0,9]/.test(c)},

    isWhiteSpace=(c)=>{return /\s/.test(c)},

    isIdentifier=(c)=>{return typeof c==="string" && !isDigit(c) && !isWhiteSpace(c) && !isOperator(c)};

    let advance = ()=>{return c = input[++i];}, 

    addToken =(type,value)=>{
        tokens.push({
            type:type,
            value:value,
        });
    };

    while(i < input.length){
        c = input[i];
        if(isWhiteSpace(c)) advance();
        else if(isOperator(c)){
            addToken(c);
            advance();
        }

        else if(isDigit(c)){
            num = c;

            while(isDigit(advance())){
                num+=c;
            }

            if(c === "."){
                do{
                    num+=c;
                }while(isDigit(advance()));
            }

            num = parseFloat(num);
            if(!isFinite(num)){throw console.error("There was a fucking proble, num too big");
            }

            addToken("number",num);
        }

        else if(isIdentifier(c)){
            idn = c;
            while(isIdentifier(advance())){
                idn+=c;
            }
            addToken("identifier",idn);
        }

        else throw "Unrecognized token";
    }

    addToken("(end)");
    return tokens;
}

export default {lexing};
