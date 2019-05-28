module.exports = function(limit) {
    this.limit = limit;
    this.split = function(input){
        var result = [];

        var splitWords = input.split(" ");

        var sequence = "";
        splitWords.forEach(element => {
            if(element.length > this.limit){
                result.push(sequence); // "flush" current content
                var i = 0;
                while(this.limit * i < element.length){
                    sequence = element.slice(i*limit, (i+1)*limit);
                    if(sequence.length === this.limit){ // the last one might not
                        result.push(sequence);
                    }
                    i = i + 1;
                }
            }
            else if(sequence.length + 1 + element.length <= this.limit){ // word still fits
                sequence = (sequence + " " + element).trim(); // removes extra spaces
            }
            else{ // limit reached
                result.push(sequence);
                sequence = "" + element;
            }
        });

        if(sequence.length > 0){
            result.push(sequence);
        }

        return result;
    }
}