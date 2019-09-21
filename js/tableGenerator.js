/**
 * PR1 Make the data correct, pull request with comments, approved!
 * PR2 Customize screen (CSS, Submit Button)
 * PR3 Hook up Submit Button with grade - do not indicate what is right or wrong
 * PR4 Add web hosting and move the data to a database access via AJAX or Fetch API -- need PHP, Pyton, Java, Node, whatever works :)
 * PR5 Add screens to add more data, more interactive, more usefull - rest of assignment...
 * PR6 Add custom features
 */
// globals bad but...
let correctAnswersArray = [];
let studentAnswersArray = [];
let orderedCategoriesArray;
let orderedToolsArray;

function buildTable(params) {
    // TODO: Get data via AJAX or fetch API
    let $table = $('<table/>');
    let categories = params.categories; // width
    let tools = params.tools;           // height
    if(Array.isArray(categories) && Array.isArray(tools)) {
        console.log('Arrays?');
        // order categories
        orderedCategoriesArray = [...Array(categories.length)];
        categories.forEach(cat => {
            orderedCategoriesArray[cat.position - 1] = cat;
        });
        console.log('Ordered Cats ', orderedCategoriesArray);
        orderedToolsArray = [...Array(tools.length)];
        tools.forEach(tool => {
            orderedToolsArray[tool.position - 1] = tool;
            // correct answers
            correctAnswersArray.push(tool.name + '-' + tool.category);
        });
        console.log('Ordered Tools ', orderedToolsArray);
        console.log('Correct Answers ', correctAnswersArray);

        $table.append('<tr>');
        $table.append('<th></th>');
        orderedCategoriesArray.forEach(cat => {
            // headers accross
            // TODO: pre build map of names, use index to get mapped value name
            let header = '<th>' + cat.name + '</th>';
            $table.append(header);
        });
        $table.append('</tr>');
        // now need to do each row
        orderedToolsArray.forEach((tool, index) => {
            $table.append('<tr>');
            // need side header
            // TODO: pre build map of names, use index to get mapped value name
            $table.append('<th>' + tool.name + '</th>');
            // add cells that can be clicked on
            for(let i = 0; i < categories.length; i++) {
                $table.append('<td id="cell' + i + '' + index + '" onclick="evaluateCell(\'' + i + '\',\'' + index + '\',\'' + tool.name + '\');"></td>');
            }
            $table.append('</tr>');
        });
        $('#table').append($table);
    }
    console.log('info ', categories, tools);
}

$(function() {
    console.log('Data', data);
    // TODO: Get data via AJAX or fetch API
    buildTable(data);
});

function evaluateCell(width, height, name) {
    console.log('Evalueateing', studentAnswersArray);
    console.log('Evaluate width ', width, ' height ', height, name);
    const indexToRemove = studentAnswersArray.indexOf(orderedToolsArray[height].name + '-' + orderedCategoriesArray[width].name)
    $('#cell' + width + height).toggleClass('black');
    if (indexToRemove !== -1) {
        // remove it
        console.log('Removing ', indexToRemove)
        studentAnswersArray.splice(indexToRemove, 1);
    } else {
        // add it
        console.log('Pushing ', height, ' ', width);
        studentAnswersArray.push(orderedToolsArray[height].name + '-' + orderedCategoriesArray[width].name);
    }
    console.log('Answers ', studentAnswersArray);
    calculateScore();
}

function calculateScore() {
    // TODO: Only show when min guesses equals number of correct answers
    let score = 0;
    let msg = '';
    studentAnswersArray.forEach(answer => {
        if(correctAnswersArray.indexOf(answer) !== -1) {
            score++;
        }
    });
    console.log('Score ', score);
    if(studentAnswersArray.length > correctAnswersArray.length + 5) {
        msg = 'Too many cells selected.';
    } else if (studentAnswersArray.length >= correctAnswersArray.length) {
        msg = 'Score ' + score;
    } else if(studentAnswersArray.length < correctAnswersArray.length) {
        msg = 'Please Select more cells.';
    } else {
        msg = 'Unkown error';
    }
    $('#score').text('Score ' + score);
}