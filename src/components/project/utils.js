function groupByGenre(data) {
    // Iterate over each song, producing a dictionary where the keys are the genres 
    // and the values are the information about the genre.
    let result = data.reduce((result, d) => {
        let currentData = result[d.genre] || {
            "Genre": d.genre,
            "Count": 0
        };
        currentData.Count += 1; // Increment the count (number of songs) for the genre.
        result[d.genre] = currentData; // Save the updated information in the dictionary using the genre as key.
        return result;
    }, {});

    // Convert the dictionary into a list, making it easier to create the visualization.
    result = Object.keys(result).map(key => result[key]);
    result = result.sort((a, b) => b.Count - a.Count); // Sort the data in descending order of count.
    return result;
}
function groupByYear(data) {
    
    let result = data.reduce((result, d) => {
        // initialize a year for storing info
        let currentYear = result[d.year] || {
            "Year": d.year,
            "Songs":[],
            "Count": 0
        };
        currentYear.Songs.push(d.song);
        
        currentYear.Count += 1;

        result[d.year] = currentYear;
        return result;
    }, {});

    
    result = Object.keys(result).map(key => result[key]);
    
    result = result.sort((a, b) => b.Year - a.Year); 
    return result;
}
export {
    groupByGenre,groupByYear
}