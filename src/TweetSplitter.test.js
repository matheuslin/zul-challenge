var TweetSplitter = require('./TweetSplitter.js');

function verifyBySize(result, size){
    result.forEach(element => {
        expect(element.length).toBeLessThanOrEqual(size);
    });
}

describe('TweetSplitter', () => {
    describe('Testing limits', () => {
        test('Splitting message with less than limit must return the same message', () => {
            var input = "Message with less than limit size.";
            var limitSize = 45;
            var splitter = new TweetSplitter(limitSize);
            var result = splitter.split(input);
        
            var expected = [input];
        
            expect(result).toEqual(expected);
        });
        
        test('Splitting message with more than limit must return more messages', () => {
            var input = "Message with more than limit size.";
            var limitSize = 15;
            var splitter = new TweetSplitter(limitSize);
            var result = splitter.split(input);
        
            var expected = [
                "Message with",
                "more than limit",
                "size."
            ];
        
            expect(result).toEqual(expected);
        });
    })
    
    test('Message with many spaces must be trimmed', () => {
        var input = "This message has      too  many          spaces    in a      row";
        var limitSize = 20;
        var splitter = new TweetSplitter(limitSize);
        var result = splitter.split(input);
    
        var expected = [
            "This message has too",
            "many spaces in a row"
        ];
    
        expect(result).toEqual(expected);
        verifyBySize(result, limitSize);
    });

    test('Message with long words', () => {
        var input = "A long word is a word too long to fit in a message.";
        var limitSize = 7;
        var splitter = new TweetSplitter(limitSize);
        var result = splitter.split(input);

        verifyBySize(result, limitSize);
    });

    test('Longest word in pt-BR', () => {
        var input = "Aquele que sofre de Pneumoultramicroscopicossilicovulcanoconiose é chamado de Pneumoultramicroscopicossilicovulcanoconiotico e deve ser tratado.";

        var limitSize = 45;
        var splitter = new TweetSplitter(limitSize);
        var result = splitter.split(input);
        var expected = [
            "Aquele que sofre de",
            "Pneumoultramicroscopicossilicovulcanoconiose",
            "é chamado de",
            "Pneumoultramicroscopicossilicovulcanoconiotic",
            "o e deve ser tratado."
        ]
        expect(result).toEqual(expected);
        verifyBySize(result, limitSize);
    });
});