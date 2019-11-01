/**
 * PR1 Make the data correct, pull request with comments, approved!
 * PR2 Customize screen (CSS, Submit Button)
 * PR3 Hook up Submit Button with grade - do not indicate what is right or wrong
 * PR4 Add web hosting and move the data to a database access via AJAX or Fetch API -- need PHP, Pyton, Java, Node, whatever works :)
 * PR5 Add screens to add more data, more interactive, more usefull - rest of assignment...
 * PR6 Add custom features
 */

const theadOpen = '<thead>';
const theadClose = '</thead>';
const thOpen = '<th>';
const thClose = '</th>';
const trOpen = '<tr>';
const trClose = '</tr>';
const tdOpen = '<td>';
const tdClose = '</td>';

// globals bad but...
let correctAnswersArray = [];
let studentAnswersArray = [];
let orderedCategoriesArray;
let orderedToolsArray;

function buildTable(params) {
    // TODO: Get data via AJAX or fetch API
    let $table = $('<table />');
    let categories = params.categories; // width
    let tools = params.tools;           // height
    if(Array.isArray(categories) && Array.isArray(tools)) {
        console.log('Arrays?');
        // order categories
        orderedCategoriesArray = [...Array(categories.length)];
        categories.forEach(category => {
            orderedCategoriesArray[category.position - 1] = category;
        });
        console.log('Ordered Categories ', orderedCategoriesArray);
        orderedToolsArray = [...Array(tools.length)];
        tools.forEach(tool => {
            orderedToolsArray[tool.position - 1] = tool;
            // correct answers
            correctAnswersArray.push(tool.name + '-' + tool.category);
        });
        console.log('Ordered Tools ', orderedToolsArray);
        console.log('Correct Answers ', correctAnswersArray);

        // build the header row and append it to the table
        let headerRow = '';
        let headerCells = headerRow.concat('<th class="tools-cell">', 'Tools', thClose);
        orderedCategoriesArray.forEach(category => {
            // header row
            // TODO: pre build map of names, use index to get mapped value name
            headerCells = headerCells.concat('<th class="rotate">', category.name, thClose);
        });
        headerRow = headerRow.concat(theadOpen, trOpen, headerCells, trClose, theadClose);
        $table.append(headerRow);

        // build each row then add them to the table as one long string
        let thisRow = '';
        orderedToolsArray.forEach((tool, index) => {
          thisRow = thisRow.concat(trOpen, tdOpen, tool.name, tdClose);

          for(let i = 0; i < categories.length; i++) {
            thisRow = thisRow.concat('<td id="cell' + i + '' + index + '" onclick="evaluateCell(\'' + i + '\',\'' + index + '\',\'' + tool.name + '\');">', tdClose);
            console.log(thisRow);
          }
          thisRow = thisRow.concat(trClose);
        });
        $table.append(thisRow);

        // add the table to the DOM
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
    console.log('Evaluating', studentAnswersArray);
    console.log('Evaluate width ', width, ' height ', height, name);
    const indexToRemove = studentAnswersArray.indexOf(orderedToolsArray[height].name + '-' + orderedCategoriesArray[width].id);

    // toggle the check mark
    ($('#cell' + width + height).text() === '')
      ? $('#cell' + width + height).text('\u2713')
      : $('#cell' + width + height).text('');

    if (indexToRemove !== -1) {
        // remove it
        console.log('Removing ', indexToRemove);
        studentAnswersArray.splice(indexToRemove, 1);
    } else {
        // add it
        console.log('Pushing ', height, ' ', width);
        studentAnswersArray.push(orderedToolsArray[height].name + '-' + orderedCategoriesArray[width].id);
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
        msg = 'Unknown error';
    }
    $('#score').text('Score ' + score);
}
