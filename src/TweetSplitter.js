class TweetSplitter{
    constructor(limit){
        this.limit = limit;
    }

    /**
     * 
     * @param {String} currentSlice it is always added as is to the resultArray
     * @param {String} newWord the new, long word that must be sliced
     * @param {String[]} resultArray the resultArray, currently being built
     * 
     * Example: with a maximum size of 20 and you're given the tweet:
     * "This is the alphabet: abcdefghijklmnopqrstuvwxyz. It contains 26 letters."
     * The alphabet word is longer, and the last slice would have "uvwxyz.", which is smaller
     * than the 20 limit. So, the next tweet could be "uvwxyz. It contains".
     * The "uvwxyz." is returned so it can be used for the next tweet.
     */
    sliceLongWord(currentSlice, newWord, resultArray){
        resultArray.push(currentSlice);
        currentSlice = "";
        for(let i = 0; this.limit * i < newWord.length; i++){
            currentSlice = newWord.slice(i * this.limit, (i+1) * this.limit);

            // if the current slice has a length that is equal to this.limit,
            // the current word has not ended yet. So, we push the current
            // slice to the array, and the new current slice is made empty.
            if(currentSlice.length === this.limit){
                resultArray.push(currentSlice);
                currentSlice = "";
            }
        }

        // if the current slice is shorter than this.limit,
        // return it so it may be used for the next tweet
        return currentSlice;
    }

    /**
     * 
     * @param {String} input The input that must be split in smaller strings
     * 
     * @returns a String[] containing the input divided in pieces smaller than
     * this.limit.
     */
    split(input){
        var result = [];

        var splitWords = input.split(" ");

        var sequence = "";
        splitWords.forEach(element => {
            if(element.length > this.limit){
                sequence = this.sliceLongWord(sequence, element, result);
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

module.exports = TweetSplitter;