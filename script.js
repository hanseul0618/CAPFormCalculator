// Result screen functions
function generateResultsTable() {
    if (state.selectedSurvey.includes("SCARED")) {
        generateScaredResultsTable();
    } else if (state.selectedSurvey === "Vanderbilt - Parent") {
        generateVanderbiltParentResultsTable();
    } else if (state.selectedSurvey === "Vanderbilt - Teacher") {
        generateVanderbiltTeacherResultsTable();
    }
}

function generateScaredResultsTable() {
    // Calculate scores
    const scores = calculateScaredScores(state.answers);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'results-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Associated Diagnosis', 'Result', 'Patient Score', 'Cutoff'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    const diagnoses = [
        { key: 'total', label: 'Anxiety disorder', cutoff: '>= 25' },
        { key: 'panic', label: 'Panic disorder or Significant somatic symptoms', cutoff: '>= 7' },
        { key: 'gad', label: 'Generalized anxiety disorder', cutoff: '>= 9' },
        { key: 'separation', label: 'Separation anxiety disorder', cutoff: '>= 5' },
        { key: 'social', label: 'Social anxiety disorder', cutoff: '>= 8' },
        { key: 'school', label: 'Significant school avoidance', cutoff: '>= 3' }
    ];
    
    diagnoses.forEach(diag => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = diag.label;
        
        const resultCell = document.createElement('td');
        resultCell.innerHTML = scores.verdict[diag.key];
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = scores.scores[diag.key];
        
        const cutoffCell = document.createElement('td');
        cutoffCell.textContent = diag.cutoff;
        
        row.appendChild(labelCell);
        row.appendChild(resultCell);
        row.appendChild(scoreCell);
        row.appendChild(cutoffCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    elements.resultsTable.innerHTML = '';
    elements.resultsTable.appendChild(table);
    
    // Create text summary
    const summary = document.createElement('div');
    summary.className = 'text-summary';
    
    let summaryHTML = `
        <div class="text-summary-heading">---- Text Summary ----</div>
        <p>SCARED (${state.selectedSurvey}) results were as follows:</p>
        <p>Anxiety disorder ------------------------------------------- ${scores.verdict.total}, Score ${scores.scores.total}  **cutoff >=25</p>
        <p>Panic disorder or Significant somatic symptoms -- ${scores.verdict.panic}, Score ${scores.scores.panic}  **cutoff >=7</p>
        <p>Generalized anxiety disorder -------------------------- ${scores.verdict.gad}, Score ${scores.scores.gad}  **cutoff >=9</p>
        <p>Separation anxiety disorder ---------------------------- ${scores.verdict.separation}, Score ${scores.scores.separation}  **cutoff >=5</p>
        <p>Social anxiety disorder ---------------------------------- ${scores.verdict.social}, Score ${scores.scores.social}  **cutoff >=8</p>
        <p>Significant school avoidance -------------------------- ${scores.verdict.school}, Score ${scores.scores.school}  **cutoff >=3</p>
    `;
    
    summary.innerHTML = summaryHTML;
    elements.textSummary.innerHTML = '';
    elements.textSummary.appendChild(summary);
}

function generateVanderbiltParentResultsTable() {
    // Calculate scores
    const results = calculateVanderbiltScores(state.selectedSurvey, state.answers);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'results-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Category', 'Patient Count/Score', 'Cutoff', 'Calculation'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    const categories = [
        { label: 'ADHD - Inattention', score: results.Inattentive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q1–9' },
        { label: 'ADHD - Hyperactivity/Impulsivity', score: results.Hyperactive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q10–18' },
        { label: 'ADHD Total Symptom Score', score: results.total_symptom_score, cutoff: '', calc: 'Sum of Q1–18' },
        { label: 'Oppositional-Defiant Disorder', score: results.ODD.n, cutoff: '\u2265 4', calc: 'Total number of questions scored 2 or 3 in Q19–26' },
        { label: 'Conduct Disorder', score: results.Conduct.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q27–40' },
        { label: 'Anxiety/Depression', score: results.AnxietyDep.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q41–47' },
        { label: 'Performance', score: results.perf_count, cutoff: '\u2265 1', calc: 'Total number of questions scored 4 or 5 in Q48–55' },
        { label: 'Average Performance Score', score: results.perf_avg, cutoff: '', calc: 'Average of Q48–55' }
    ];
    
    categories.forEach(cat => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = cat.label;
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = cat.score;
        
        const cutoffCell = document.createElement('td');
        cutoffCell.textContent = cat.cutoff;
        
        const calcCell = document.createElement('td');
        calcCell.textContent = cat.calc;
        
        row.appendChild(labelCell);
        row.appendChild(scoreCell);
        row.appendChild(cutoffCell);
        row.appendChild(calcCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    elements.resultsTable.innerHTML = '';
    elements.resultsTable.appendChild(table);
    
    // Create text summary
    const summary = document.createElement('div');
    summary.className = 'text-summary';
    
    let summaryHTML = `
        <div class="text-summary-heading">---- Text Summary ----</div>
        <p>Vanderbilt (Parent) results were as follows:</p>
        <p>ADHD, Inattentive subtype: ${results.Inattentive.pos ? '<b style="color:red">Positive</b>' : 'Negative'} (${results.Inattentive.n}/9, cutoff ≥ 6)</p>
        <p>ADHD, Hyperactive/Impulsive subtype: ${results.Hyperactive.pos ? '<b style="color:red">Positive</b>' : 'Negative'} (${results.Hyperactive.n}/9, cutoff ≥ 6)</p>
        <p>ADHD, combined type: ${results.Inattentive.pos && results.Hyperactive.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'}</p>
        <p>ODD: ${results.ODD.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.ODD.n}/8, cutoff ≥ 4)</p>
        <p>Conduct disorder: ${results.Conduct.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.Conduct.n}/14, cutoff ≥ 3)</p>
        <p>Anxiety/Depression: ${results.AnxietyDep.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.AnxietyDep.n}/7, cutoff ≥ 3)</p>
        <p>-- Performance (${results.perf_count}/8, cutoff ≥ 1)</p>
        <p>-- Total ADHD Symptom Score: ${results.total_symptom_score}. Average Performance Score: ${results.perf_avg}.</p>
    `;
    
    summary.innerHTML = summaryHTML;
    elements.textSummary.innerHTML = '';
    elements.textSummary.appendChild(summary);
}

function generateVanderbiltTeacherResultsTable() {
    // Calculate scores
    const results = calculateVanderbiltScores(state.selectedSurvey, state.answers);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'results-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Category', 'Patient Count/Score', 'Cutoff', 'Calculation'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    const categories = [
        { label: 'ADHD - Inattention', score: results.Inattentive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q1–9' },
        { label: 'ADHD - Hyperactivity/Impulsivity', score: results.Hyperactive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q10–18' },
        { label: 'ADHD Total Symptom Score', score: results.total_symptom_score, cutoff: '', calc: 'Sum of Q1–18' },
        { label: 'ODD/Conduct Disorder', score: results.ODD_Conduct.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q19–28' },
        { label: 'Anxiety/Depression', score: results.AnxietyDep.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q29–35' },
        { label: 'Performance', score: results.perf_count, cutoff: '\u2265 1', calc: 'Total number of questions scored 4 or 5 in Q36–43' },
        { label: 'Average Performance Score', score: results.perf_avg, cutoff: '', calc: 'Average of Q36–43' }
    ];
    
    categories.forEach(cat => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = cat.label;
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = cat.score;
        
        const cutoffCell = document.createElement('td');
        cutoffCell.textContent = cat.cutoff;
        
        const calcCell = document.createElement('td');
        calcCell.textContent = cat.calc;
        
        row.appendChild(labelCell);
        row.appendChild(scoreCell);
        row.appendChild(cutoffCell);
        row.appendChild(calcCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    elements.resultsTable.innerHTML = '';
    elements.resultsTable.appendChild(table);
    
    // Create text summary
    const summary = document.createElement('div');
    summary.className = 'text-summary';
    
    let summaryHTML = `
        <div class="text-summary-heading">---- Text Summary ----</div>
        <p>Vanderbilt (Teacher) results were as follows:</p>
        <p>ADHD, Inattentive subtype: ${results.Inattentive.pos ? '<b style="color:red">Positive</b>' : 'Negative'} (${results.Inattentive.n}/9, cutoff ≥ 6)</p>
        <p>ADHD, Hyperactive/Impulsive subtype: ${results.Hyperactive.pos ? '<b style="color:red">Positive</b>' : 'Negative'} (${results.Hyperactive.n}/9, cutoff ≥ 6)</p>
        <p>ADHD, combined type: ${results.Inattentive.pos && results.Hyperactive.pos ? '<b style="color:red">Positive</b>' : 'Negative'}</p>
        <p>ODD/Conduct Disorder: ${results.ODD_Conduct.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.ODD_Conduct.n}/10, cutoff ≥ 3)</p>
        <p>Anxiety/Depression: ${results.AnxietyDep.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.AnxietyDep.n}/7, cutoff ≥ 3)</p>
        <p>-- Performance (${results.perf_count}/8, cutoff ≥ 1)</p>
        <p>-- Total ADHD Symptom Score: ${results.total_symptom_score}. Average Performance Score: ${results.perf_avg}.</p>
    `;
    
    summary.innerHTML = summaryHTML;
    elements.textSummary.innerHTML = '';
    elements.textSummary.appendChild(summary);
}
function generateResultsTable() {
    if (state.selectedSurvey.includes("SCARED")) {
        generateScaredResultsTable();
    } else if (state.selectedSurvey === "Vanderbilt - Parent") {
        generateVanderbiltParentResultsTable();
    } else if (state.selectedSurvey === "Vanderbilt - Teacher") {
        generateVanderbiltTeacherResultsTable();
    }
}

function generateScaredResultsTable() {
    // Calculate scores
    const scores = calculateScaredScores(state.answers);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'results-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Associated Diagnosis', 'Result', 'Patient Score', 'Cutoff'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    const diagnoses = [
        { key: 'total', label: 'Anxiety disorder', cutoff: '>= 25' },
        { key: 'panic', label: 'Panic disorder or Significant somatic symptoms', cutoff: '>= 7' },
        { key: 'gad', label: 'Generalized anxiety disorder', cutoff: '>= 9' },
        { key: 'separation', label: 'Separation anxiety disorder', cutoff: '>= 5' },
        { key: 'social', label: 'Social anxiety disorder', cutoff: '>= 8' },
        { key: 'school', label: 'Significant school avoidance', cutoff: '>= 3' }
    ];
    
    diagnoses.forEach(diag => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = diag.label;
        
        const resultCell = document.createElement('td');
        resultCell.innerHTML = scores.verdict[diag.key];
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = scores.scores[diag.key];
        
        const cutoffCell = document.createElement('td');
        cutoffCell.textContent = diag.cutoff;
        
        row.appendChild(labelCell);
        row.appendChild(resultCell);
        row.appendChild(scoreCell);
        row.appendChild(cutoffCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    elements.resultsTable.innerHTML = '';
    elements.resultsTable.appendChild(table);
    
    // Create text summary
    const summary = document.createElement('div');
    summary.className = 'text-summary';
    
    let summaryHTML = `
        <div class="text-summary-heading">---- Text Summary ----</div>
        <p>SCARED (${state.selectedSurvey}) results were as follows:</p>
        <p>Anxiety disorder ------------------------------------------- ${scores.verdict.total}, Score ${scores.scores.total}  **cutoff >=25</p>
        <p>Panic disorder or Significant somatic symptoms -- ${scores.verdict.panic}, Score ${scores.scores.panic}  **cutoff >=7</p>
        <p>Generalized anxiety disorder -------------------------- ${scores.verdict.gad}, Score ${scores.scores.gad}  **cutoff >=9</p>
        <p>Separation anxiety disorder ---------------------------- ${scores.verdict.separation}, Score ${scores.scores.separation}  **cutoff >=5</p>
        <p>Social anxiety disorder ---------------------------------- ${scores.verdict.social}, Score ${scores.scores.social}  **cutoff >=8</p>
        <p>Significant school avoidance -------------------------- ${scores.verdict.school}, Score ${scores.scores.school}  **cutoff >=3</p>
    `;
    
    summary.innerHTML = summaryHTML;
    elements.textSummary.innerHTML = '';
    elements.textSummary.appendChild(summary);
}

function generateVanderbiltParentResultsTable() {
    // Calculate scores
    const results = calculateVanderbiltScores(state.selectedSurvey, state.answers);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'results-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Category', 'Patient Count/Score', 'Cutoff', 'Calculation'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    const categories = [
        { label: 'ADHD - Inattention', score: results.Inattentive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q1–9' },
        { label: 'ADHD - Hyperactivity/Impulsivity', score: results.Hyperactive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q10–18' },
        { label: 'ADHD Total Symptom Score', score: results.total_symptom_score, cutoff: '', calc: 'Sum of Q1–18' },
        { label: 'Oppositional-Defiant Disorder', score: results.ODD.n, cutoff: '\u2265 4', calc: 'Total number of questions scored 2 or 3 in Q19–26' },
        { label: 'Conduct Disorder', score: results.Conduct.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q27–40' },
        { label: 'Anxiety/Depression', score: results.AnxietyDep.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q41–47' },
        { label: 'Performance', score: results.perf_count, cutoff: '\u2265 1', calc: 'Total number of questions scored 4 or 5 in Q48–55' },
        { label: 'Average Performance Score', score: results.perf_avg, cutoff: '', calc: 'Average of Q48–55' }
    ];
    
    categories.forEach(cat => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = cat.label;
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = cat.score;
        
        const cutoffCell = document.createElement('td');
        cutoffCell.textContent = cat.cutoff;
        
        const calcCell = document.createElement('td');
        calcCell.textContent = cat.calc;
        
        row.appendChild(labelCell);
        row.appendChild(scoreCell);
        row.appendChild(cutoffCell);
        row.appendChild(calcCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    elements.resultsTable.innerHTML = '';
    elements.resultsTable.appendChild(table);
    
    // Create text summary
    const summary = document.createElement('div');
    summary.className = 'text-summary';
    
    let summaryHTML = `
        <div class="text-summary-heading">---- Text Summary ----</div>
        <p>Vanderbilt (Parent) results were as follows:</p>
        <p>ADHD, Inattentive subtype: ${results.Inattentive.pos ? '<b style="color:red">Positive</b>' : 'Negative'} (${results.Inattentive.n}/9, cutoff ≥ 6)</p>
        <p>ADHD, Hyperactive/Impulsive subtype: ${results.Hyperactive.pos ? '<b style="color:red">Positive</b>' : 'Negative'} (${results.Hyperactive.n}/9, cutoff ≥ 6)</p>
        <p>ADHD, combined type: ${results.Inattentive.pos && results.Hyperactive.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'}</p>
        <p>ODD: ${results.ODD.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.ODD.n}/8, cutoff ≥ 4)</p>
        <p>Conduct disorder: ${results.Conduct.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.Conduct.n}/14, cutoff ≥ 3)</p>
        <p>Anxiety/Depression: ${results.AnxietyDep.pos ? '<b style="color:red">Positive</b> screening' : 'Negative screening'} (${results.AnxietyDep.n}/7, cutoff ≥ 3)</p>
        <p>-- Performance (${results.perf_count}/8, cutoff ≥ 1)</p>
        <p>-- Total ADHD Symptom Score: ${results.total_symptom_score}. Average Performance Score: ${results.perf_avg}.</p>
    `;
    
    summary.innerHTML = summaryHTML;
    elements.textSummary.innerHTML = '';
    elements.textSummary.appendChild(summary);
}

function generateVanderbiltTeacherResultsTable() {
    // Calculate scores
    const results = calculateVanderbiltScores(state.selectedSurvey, state.answers);
    
    // Create table
    const table = document.createElement('table');
    table.className = 'results-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Category', 'Patient Count/Score', 'Cutoff', 'Calculation'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    const categories = [
        { label: 'ADHD - Inattention', score: results.Inattentive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q1–9' },
        { label: 'ADHD - Hyperactivity/Impulsivity', score: results.Hyperactive.n, cutoff: '\u2265 6', calc: 'Total number of questions scored 2 or 3 in Q10–18' },
        { label: 'ADHD Total Symptom Score', score: results.total_symptom_score, cutoff: '', calc: 'Sum of Q1–18' },
        { label: 'ODD/Conduct Disorder', score: results.ODD_Conduct.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q19–28' },
        { label: 'Anxiety/Depression', score: results.AnxietyDep.n, cutoff: '\u2265 3', calc: 'Total number of questions scored 2 or 3 in Q29–35' },
        { label: 'Performance', score: results.perf_count, cutoff: '\u2265 1', calc: 'Total number of questions scored 4 or 5 in Q36–43' },
        { label: 'Average Performance Score', score: results.perf_avg, cutoff: '', calc: 'Average of Q36–43' }
    ];
    
    categories.forEach(cat => {
        const row = document.createElement('tr');
        
        const labelCell = document.createElement('td');
        labelCell.textContent = cat.label;
        
        const scoreCell = document.createElement('td');
        scoreCell.textContent = cat.score;
        
        const cutoffCell = document.createElement('td');
        cutoffCell.textContent = cat.cutoff;
        
        const calcCell = document.createElement('td');
        calcCell.textContent = cat.calc;
        
        row.appendChild(labelCell);
        row.appendChild(scoreCell);
        row.appendChild(cutoffCell);
        row.appendChild(calcCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    elements.resultsTable.innerHTML = '';
    elements.resultsTable.appendChild(table);
    
    // Create text summary
    const summary = document.createElement('/**
 * Web Calculator for Child and Adolescent Psychiatry Forms
 * A client-side implementation of the R Shiny app for psychiatric form scoring
 */

// Global state
const state = {
    selectedSurvey: null,
    answers: {},
    currentFocusedRow: 0
};

// Survey question data
const q_scared_child = [
    "1. When I feel frightened, it is hard for me to breathe.",
    "2. I get headaches when I am at school.",
    "3. I don't like to be with people I don't know well.",
    "4. I get scared if I sleep away from home.",
    "5. I worry about other people liking me.",
    "6. When I get frightened, I feel like passing out.",
    "7. I am nervous.",
    "8. I follow my mother or father wherever they go.",
    "9. People tell me that I look nervous.",
    "10. I feel nervous with people I don't know well.",
    "11. I get stomachaches at school.",
    "12. When I get frightened, I feel like I am going crazy.",
    "13. I worry about sleeping alone.",
    "14. I worry about being as good as other kids.",
    "15. When I get frightened, I feel like things are not real.",
    "16. I have nightmares about something bad happening to my parents.",
    "17. I worry about going to school.",
    "18. When I get frightened, my heart beats fast.",
    "19. I get shaky.",
    "20. I have nightmares about something bad happening to me.",
    "21. I worry about things working out for me.",
    "22. When I get frightened, I sweat a lot.",
    "23. I am a worrier.",
    "24. I get really frightened for no reason at all.",
    "25. I am afraid to be alone in the house.",
    "26. It is hard for me to talk with people I don't know well.",
    "27. When I get frightened, I feel like I am choking.",
    "28. People tell me that I worry too much.",
    "29. I don't like to be away from my family.",
    "30. I am afraid of having anxiety (or panic) attacks.",
    "31. I worry that something bad might happen to my parents.",
    "32. I feel shy with people I don't know well.",
    "33. I worry about what is going to happen in the future.",
    "34. When I get frightened, I feel like throwing up.",
    "35. I worry about how well I do things.",
    "36. I am scared to go to school.",
    "37. I worry about things that have already happened.",
    "38. When I get frightened, I feel dizzy.",
    "39. I feel nervous when I am with other children or adults and I have to do something while they watch me (for example: read aloud, speak, play a game, play a sport.)",
    "40. I feel nervous when I am going to parties, dances, or any place where there will be people that I don't know well.",
    "41. I am shy."
];

const q_scared_parent = [
    "1. When my child feels frightened, it is hard for him/her to breathe.",
    "2. My child gets headaches when he/she is at school.",
    "3. My child doesn't like to be with people he/she doesn't know well.",
    "4. My child gets scared if he/she sleeps away from home.",
    "5. My child worries about other people liking him/her.",
    "6. When my child gets frightened, he/she feels like passing out.",
    "7. My child is nervous.",
    "8. My child follows me wherever I go.",
    "9. People tell me that my child looks nervous.",
    "10. My child feels nervous with people he/she doesn't know well.",
    "11. My child gets stomachaches at school.",
    "12. When my child gets frightened, he/she feels like he/she is going crazy.",
    "13. My child worries about sleeping alone.",
    "14. My child worries about being as good as other kids.",
    "15. When he/she gets frightened, he/she feels like things are not real.",
    "16. My child has nightmares about something bad happening to his/her parents.",
    "17. My child worries about going to school.",
    "18. When my child gets frightened, his/her heart beats fast.",
    "19. He/she gets shaky.",
    "20. My child has nightmares about something bad happening to him/her.",
    "21. My child worries about things working out for him/her.",
    "22. When my child gets frightened, he/she sweats a lot.",
    "23. My child is a worrier.",
    "24. My child gets really frightened for no reason at all.",
    "25. My child is afraid to be alone in the house.",
    "26. It is hard for my child to talk with people he/she doesn't know well.",
    "27. When my child gets frightened, he/she feels like he/she is choking.",
    "28. People tell me that my child worries too much.",
    "29. My child doesn't like to be away from his/her family.",
    "30. My child is afraid of having anxiety (or panic) attacks.",
    "31. My child worries that something bad might happen to his/her parents.",
    "32. My child feels shy with people he/she doesn't know well.",
    "33. My child worries about what is going to happen in the future.",
    "34. When my child gets frightened, he/she feels like throwing up.",
    "35. My child worries about how well he/she does things.",
    "36. My child is scared to go to school.",
    "37. My child worries about things that have already happened.",
    "38. When my child gets frightened, he/she feels dizzy.",
    "39. My child feels nervous when he/she is with other children or adults and he/she has to do something while they watch him/her (for example: read aloud, speak, play a game, play a sport).",
    "40. My child feels nervous when he/she is going to parties, dances, or any place where there will be people that he/she doesn't know well.",
    "41. My child is shy."
];

const q_vand_parent = [
    "1. Does not pay attention to details or makes careless mistakes with, for example, homework.",
    "2. Has difficulty keeping attention to what needs to be done.",
    "3. Does not seem to listen when spoken to directly.",
    "4. Does not follow through when given directions and fails to finish activities (not due to refusal or failure to understand).",
    "5. Has difficulty organizing tasks and activities.",
    "6. Avoids, dislikes, or does not want to start tasks that require ongoing mental effort.",
    "7. Loses things necessary for tasks or activities (toys, assignments, pencils, or books).",
    "8. Is easily distracted by noises or other stimuli.",
    "9. Is forgetful in daily activities.",
    "10. Fidgets with hands or feet or squirms in seat.",
    "11. Leaves seat when remaining seated is expected.",
    "12. Runs about or climbs too much when remaining seated is expected.",
    "13. Has difficulty playing or beginning quiet play activities.",
    "14. Is 'on the go' or often acts as if 'driven by a motor'.",
    "15. Talks too much.",
    "16. Blurts out answers before questions have been completed.",
    "17. Has difficulty waiting his or her turn.",
    "18. Interrupts or intrudes in on others' conversations and/or activities.",
    "19. Argues with adults.",
    "20. Loses temper.",
    "21. Actively defies or refuses to go along with adults' requests or rules.",
    "22. Deliberately annoys people.",
    "23. Blames others for his or her mistakes or misbehaviors.",
    "24. Is touchy or easily annoyed by others.",
    "25. Is angry or resentful.",
    "26. Is spiteful and wants to get even.",
    "27. Bullies, threatens, or intimidates others.",
    "28. Starts physical fights.",
    "29. Lies to get out of trouble or to avoid obligations (i.e., 'cons' others).",
    "30. Is truant from school (skips school) without permission.",
    "31. Is physically cruel to people.",
    "32. Has stolen things that have value.",
    "33. Deliberately destroys others' property.",
    "34. Has used a weapon that can cause serious harm (bat, knife, brick, gun).",
    "35. Is physically cruel to animals.",
    "36. Has deliberately set fires to cause damage.",
    "37. Has broken into someone else's home, business, or car.",
    "38. Has stayed out at night without permission.",
    "39. Has run away from home overnight.",
    "40. Has forced someone into sexual activity.",
    "41. Is fearful, anxious, or worried.",
    "42. Is afraid to try new things for fear of making mistakes.",
    "43. Feels worthless or inferior.",
    "44. Blames self for problems, feels guilty.",
    "45. Feels lonely, unwanted, or unloved; complains that 'no one loves him or her'.",
    "46. Is sad, unhappy, or depressed.",
    "47. Is self-conscious or easily embarrassed.",
    "48. Overall school performance.",
    "49. Reading.",
    "50. Writing.",
    "51. Mathematics.",
    "52. Relationship with parents.",
    "53. Relationship with siblings.",
    "54. Relationship with peers.",
    "55. Participation in organized activities (e.g., teams)."
];

const q_vand_teacher = [
    "1. Fails to give attention to details or makes careless mistakes in schoolwork.",
    "2. Has difficulty sustaining attention to tasks or activities.",
    "3. Does not seem to listen when spoken to directly.",
    "4. Does not follow through on instructions and fails to finish schoolwork (not due to oppositional behavior or failure to understand).",
    "5. Has difficulty organizing tasks and activities.",
    "6. Avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort.",
    "7. Loses things necessary for tasks or activities (school assignments, pencils, or books).",
    "8. Is easily distracted by extraneous stimuli.",
    "9. Is forgetful in daily activities.",
    "10. Fidgets with hands or feet or squirms in seat.",
    "11. Leaves seat in classroom or in other situations in which remaining seated is expected.",
    "12. Runs about or climbs excessively in situations in which remaining seated is expected.",
    "13. Has difficulty playing or engaging in leisure activities quietly.",
    "14. Is 'on the go' or often acts as if 'driven by a motor'.",
    "15. Talks excessively.",
    "16. Blurts out answers before questions have been completed.",
    "17. Has difficulty waiting in line.",
    "18. Interrupts or intrudes on others (eg, butts into conversations/games).",
    "19. Loses temper.",
    "20. Actively defies or refuses to comply with adult's requests or rules.",
    "21. Is angry or resentful.",
    "22. Is spiteful and vindictive.",
    "23. Bullies, threatens, or intimidates others.",
    "24. Initiates physical fights.",
    "25. Lies to obtain goods or favors or to avoid obligations (eg, 'cons' others).",
    "26. Is physically cruel to people.",
    "27. Has stolen items of nontrivial value.",
    "28. Deliberately destroys others' property.",
    "29. Is fearful, anxious, or worried.",
    "30. Is self-conscious or easily embarrassed.",
    "31. Is afraid to try new things for fear of making mistakes.",
    "32. Feels worthless or inferior.",
    "33. Blames self for problems; feels guilty.",
    "34. Feels lonely, unwanted, or unloved; complains that 'no one loves him or her'.",
    "35. Is sad, unhappy, or depressed.",
    "36. Reading.",
    "37. Mathematics.",
    "38. Written expression.",
    "39. Relationship with peers.",
    "40. Following directions.",
    "41. Disrupting class.",
    "42. Assignment completion.",
    "43. Organizational skills."
];

// Survey metadata
const surveyMeta = {
    "SCARED - Child": {
        questions: q_scared_child,
        scoreChoices: [0, 1, 2],
        scoreLabels: ["0: Not True or Hardly Ever True", "1: Somewhat True or Sometimes True", "2: Very True or Often True"]
    },
    "SCARED - Parent": {
        questions: q_scared_parent,
        scoreChoices: [0, 1, 2],
        scoreLabels: ["0: Not True or Hardly Ever True", "1: Somewhat True or Sometimes True", "2: Very True or Often True"]
    },
    "Vanderbilt - Parent": {
        questions: q_vand_parent,
        scoreChoices: [0, 1, 2, 3],
        scoreLabels: ["0: Never", "1: Occasionally", "2: Often", "3: Very Often"]
    },
    "Vanderbilt - Teacher": {
        questions: q_vand_teacher,
        scoreChoices: [0, 1, 2, 3],
        scoreLabels: ["0: Never", "1: Occasionally", "2: Often", "3: Very Often"]
    }
};

// Survey instructions
const surveyInstructions = {
    "SCARED - Child": `
        <h2>SCARED - Child Version</h2>
        <p>
            <a href="https://drive.google.com/file/d/11oIUxUN2Ifrdg8MH6ULsUeq-wMMNctm4/view?usp=drivesdk" target="_blank">
                Screen for Child Anxiety Related Disorders (SCARED)
            </a>
            is a screening tool developed to identify anxiety disorders in children.
        </p>
        <p>
            <strong>Directions:</strong> 
            Below is a list of sentences that describe how people feel.
            Read each phrase and decide if it is "0: Not True or Hardly Ever True", "1: Somewhat True or Sometimes True", or "2: Very True or Often True" for you.
            Then for each sentence, fill in one circle that corresponds to the response that seems to describe you for the last 3 months.
        </p>
    `,
    "SCARED - Parent": `
        <h2>SCARED - Parent Version</h2>
        <p>
            <a href="https://drive.google.com/file/d/11oIUxUN2Ifrdg8MH6ULsUeq-wMMNctm4/view?usp=drivesdk" target="_blank">
                Screen for Child Anxiety Related Disorders (SCARED)
            </a>
            is a screening tool developed to identify anxiety disorders in children.
        </p>
        <p>
            <strong>Directions:</strong> 
            Below is a list of sentences that describe how people feel.
            Read each phrase and decide if it is "0: Not True or Hardly Ever True", "1: Somewhat True or Sometimes True", or "2: Very True or Often True" for you.
            Then for each sentence, fill in one circle that corresponds to the response that seems to describe your child for the last 3 months.
        </p>
    `,
    "Vanderbilt - Parent": `
        <h2>Vanderbilt - Parent Informant</h2>
        <p>
            <a href="https://drive.google.com/file/d/1eemYEA12PS9MIJul4W03jnhMMN7joqx6/view?usp=drivesdk" target="_blank">NICHQ Vanderbilt Assessment Scales</a> 
            include parent and teacher forms that assess ADHD symptoms and associated functional impairments, along with screens for oppositional-defiant, conduct, and anxiety/depression symptoms.
        </p>
        <p>
            The parent form includes 47 symptom items and 8 performance items.<br>
            - Symptom items 1–47: 0 = Never, 1 = Occasionally, 2 = Often, 3 = Very Often<br>
            - Performance items 48–55: 1 = Excellent, 2 = Above Average, 3 = Average, 4 = Somewhat of a Problem, 5 = Problematic
        </p>
        <p>
            <strong>Directions:</strong> 
            Each rating should be considered in the context of what is appropriate for the age of your child.
            When completing this form, please think about your child's behaviors in the past 6 months.
        </p>
        <p>
            Is this evaluation based on a time when the child 
            <span class="checkbox-placeholder"></span> was on medication 
            <span class="checkbox-placeholder"></span> was not on medication 
            <span class="checkbox-placeholder"></span> not sure?
        </p>
    `,
    "Vanderbilt - Teacher": `
        <h2>Vanderbilt - Teacher Informant</h2>
        <p>
            <a href="https://drive.google.com/file/d/1eemYEA12PS9MIJul4W03jnhMMN7joqx6/view?usp=drivesdk" target="_blank">NICHQ Vanderbilt Assessment Scales</a> 
            include parent and teacher forms that assess ADHD symptoms and associated functional impairments, along with screens for oppositional-defiant, conduct, and anxiety/depression symptoms.
        </p>
        <p>
            The teacher form includes 35 symptom items and 8 performance items.<br>
            - Symptom items 1–35: 0 = Never, 1 = Occasionally, 2 = Often, 3 = Very Often<br>
            - Performance items 36-43: 1 = Excellent, 2 = Above Average, 3 = Average, 4 = Somewhat of a Problem, 5 = Problematic
        </p>
        <p>
            <strong>Directions:</strong> 
            Each rating should be considered in the context of what is appropriate for the age of the child you are rating and should reflect that child's behavior since the beginning of the school year.
        </p>
        <p>
            Please indicate the number of weeks or months you have been able to evaluate the behaviors: ___________
        </p>
        <p>
            Is this evaluation based on a time when the child 
            <span class="checkbox-placeholder"></span> was on medication 
            <span class="checkbox-placeholder"></span> was not on medication 
            <span class="checkbox-placeholder"></span> not sure?
        </p>
    `
};

// DOM references
const elements = {
    introScreen: document.getElementById('intro_screen'),
    questionScreen: document.getElementById('question_screen'),
    reviewScreen: document.getElementById('review_screen'),
    resultsScreen: document.getElementById('results_screen'),
    surveyTitle: document.getElementById('survey_title'),
    reviewTitle: document.getElementById('review_title'),
    questionsUI: document.getElementById('questions_ui'),
    surveyInstructions: document.getElementById('survey_instructions'),
    reviewTableUI: document.getElementById('review_table_ui'),
    resultsTable: document.getElementById('results_table'),
    textSummary: document.getElementById('text_summary'),
    // Buttons
    btnScaredChild: document.getElementById('btn_scared_child'),
    btnScaredParent: document.getElementById('btn_scared_parent'),
    btnVandParent: document.getElementById('btn_vand_parent'),
    btnVandTeacher: document.getElementById('btn_vand_teacher'),
    toReviewBtn: document.getElementById('to_review'),
    backBtn: document.getElementById('back'),
    seeResultsBtn: document.getElementById('see_results')
};

// Helper functions
function hideAllScreens() {
    elements.introScreen.classList.add('hidden');
    elements.questionScreen.classList.add('hidden');
    elements.reviewScreen.classList.add('hidden');
    elements.resultsScreen.classList.add('hidden');
}

function showScreen(screen) {
    hideAllScreens();
    screen.classList.remove('hidden');
}

function clearAnswers() {
    state.answers = {};
}

function selectSurvey(surveyName) {
    state.selectedSurvey = surveyName;
    state.currentFocusedRow = 0;
    clearAnswers();
    
    // Update the UI
    elements.surveyTitle.textContent = surveyName;
    elements.reviewTitle.textContent = surveyName;
    elements.surveyInstructions.innerHTML = surveyInstructions[surveyName];
    
    // Generate question UI
    generateQuestionUI();
    
    // Show question screen
    showScreen(elements.questionScreen);
}

function generateQuestionUI() {
    const meta = surveyMeta[state.selectedSurvey];
    const questionsContainer = elements.questionsUI;
    questionsContainer.innerHTML = '';
    
    meta.questions.forEach((question, index) => {
        const questionRow = document.createElement('div');
        questionRow.className = 'question-row';
        questionRow.dataset.idx = index;
        questionRow.tabIndex = "0";
        
        // Add score buttons
        const scoreButtonsContainer = document.createElement('div');
        scoreButtonsContainer.className = 'score-buttons';
        
        // Use different score options for performance items in Vanderbilt
        let scoreChoices = meta.scoreChoices;
        if ((state.selectedSurvey === "Vanderbilt - Parent" && index >= 47) || 
            (state.selectedSurvey === "Vanderbilt - Teacher" && index >= 35)) {
            scoreChoices = [1, 2, 3, 4, 5];
        }
        
        scoreChoices.forEach(score => {
            const button = document.createElement('span');
            button.className = 'score-btn';
            button.dataset.score = score;
            button.textContent = score;
            
            // Add click handler
            button.addEventListener('click', function() {
                selectScore(index, score);
            });
            
            scoreButtonsContainer.appendChild(button);
        });
        
        // Add question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = question;
        questionText.addEventListener('click', function() {
            setFocus(index);
        });
        
        // Append all elements
        questionRow.appendChild(scoreButtonsContainer);
        questionRow.appendChild(questionText);
        questionsContainer.appendChild(questionRow);
    });
    
    // Set focus on first row
    setTimeout(() => {
        const firstRow = questionsContainer.querySelector('.question-row');
        if (firstRow) {
            firstRow.classList.add('focused');
            setFocus(0);
        }
    }, 0);
    
    // Add keyboard navigation
    setupKeyboardNavigation();
}

function selectScore(rowIdx, score) {
    // Update state
    state.answers[rowIdx] = score;
    
    // Update UI
    const rows = document.querySelectorAll('.question-row');
    const row = rows[rowIdx];
    if (!row) return;
    
    const buttons = row.querySelectorAll('.score-btn');
    buttons.forEach(btn => {
        if (parseInt(btn.dataset.score) === score) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function setFocus(newIdx, prevIdx = null) {
    const rows = document.querySelectorAll('.question-row');
    rows.forEach(row => row.classList.remove('focused'));
    
    const newRow = rows[newIdx];
    if (!newRow) return;
    
    newRow.classList.add('focused');
    newRow.focus();
    state.currentFocusedRow = newIdx;
    
    // If moving from a previous row that has a selection, use that value as default
    if (prevIdx !== null && 
        state.answers[prevIdx] !== undefined && 
        state.answers[newIdx] === undefined) {
        
        const scoreButtons = newRow.querySelectorAll('.score-btn');
        const availableScores = Array.from(scoreButtons).map(btn => parseInt(btn.dataset.score));
        let scoreToSet = state.answers[prevIdx];
        
        if (!availableScores.includes(scoreToSet)) {
            // If score not available, use the first one
            scoreToSet = availableScores.includes(1) ? 1 : availableScores[0];
        }
        
        selectScore(newIdx, scoreToSet);
    }
}

function setupKeyboardNavigation() {
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
    const rows = document.querySelectorAll('.question-row');
    if (!rows.length) return;
    
    let idx = state.currentFocusedRow;
    const row = rows[idx];
    if (!row) return;
    
    const scoreButtons = row.querySelectorAll('.score-btn');
    const scoreValues = Array.from(scoreButtons).map(btn => parseInt(btn.dataset.score));
    const selectedIdx = state.answers[idx] !== undefined ? 
        scoreValues.indexOf(parseInt(state.answers[idx])) : -1;
    
    let handled = false;
    
    switch (e.key) {
        case 'ArrowRight':
            if (scoreValues.length > 0 && selectedIdx !== -1) {
                selectScore(idx, scoreValues[(selectedIdx + 1) % scoreValues.length]);
            } else if (scoreValues.length > 0) {
                selectScore(idx, scoreValues[0]);
            }
            handled = true;
            break;
            
        case 'ArrowLeft':
            if (scoreValues.length > 0 && selectedIdx !== -1) {
                selectScore(idx, scoreValues[(selectedIdx + scoreValues.length - 1) % scoreValues.length]);
            } else if (scoreValues.length > 0) {
                selectScore(idx, scoreValues[scoreValues.length - 1]);
            }
            handled = true;
            break;
            
        case 'ArrowDown':
        case 'Enter':
            if (idx < rows.length - 1) {
                setFocus(idx + 1, idx);
            }
            handled = true;
            break;
            
        case 'ArrowUp':
            if (idx > 0) {
                setFocus(idx - 1, idx);
            }
            handled = true;
            break;
    }
    
    if (handled) {
        e.preventDefault();
    }
}

// Scoring functions
function calculateScaredScores(answers) {
    const groups = {
        total: Array.from({length: 41}, (_, i) => i),
        panic: [0, 5, 8, 11, 14, 17, 18, 21, 23, 26, 29, 33, 37],
        gad: [4, 6, 13, 20, 22, 27, 32, 34, 36],
        separation: [3, 7, 12, 15, 19, 24, 28, 30],
        social: [2, 9, 25, 31, 38, 39, 40],
        school: [1, 10, 16, 35]
    };
    
    const cutoffs = {
        total: 25,
        panic: 7,
        gad: 9,
        separation: 5,
        social: 8,
        school: 3
    };
    
    // Calculate scores for each group
    const scores = {};
    for (const [key, indices] of Object.entries(groups)) {
        scores[key] = indices.reduce((sum, idx) => {
            return sum + (parseInt(answers[idx]) || 0);
        }, 0);
    }
    
    // Determine verdict for each group
    const verdict = {};
    for (const [key, score] of Object.entries(scores)) {
        verdict[key] = score >= cutoffs[key] ? 
            "<span style='color:red;font-weight:bold;'>Positive</span>" : "Negative";
    }
    
    return { scores, verdict, cutoffs };
}

function calculateVanderbiltScores(survey, answers) {
    // Convert answers to numbers
    const numericAnswers = Object.entries(answers).reduce((acc, [key, value]) => {
        acc[key] = parseInt(value);
        return acc;
    }, {});
    
    if (survey === "Vanderbilt - Parent") {
        // Define criteria
        const perfIdx = Array.from({length: 8}, (_, i) => i + 47); // 48-55
        const perfFlag = perfIdx.some(idx => numericAnswers[idx] === 4 || numericAnswers[idx] === 5);
        
        // Inattention: Questions 1-9
        const inattIdx = Array.from({length: 9}, (_, i) => i); // 0-8
        const inatt = inattIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const inattPos = inatt >= 6 && perfFlag;
        
        // Hyperactivity: Questions 10-18
        const hyperIdx = Array.from({length: 9}, (_, i) => i + 9); // 9-17
        const hyper = hyperIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const hyperPos = hyper >= 6 && perfFlag;
        
        // Combined
        const combinedPos = inattPos && hyperPos;
        
        // ODD: Questions 19-26
        const oddIdx = Array.from({length: 8}, (_, i) => i + 18); // 18-25
        const odd = oddIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const oddPos = odd >= 4 && perfFlag;
        
        // Conduct: Questions 27-40
        const conductIdx = Array.from({length: 14}, (_, i) => i + 26); // 26-39
        const conduct = conductIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const conductPos = conduct >= 3 && perfFlag;
        
        // Anxiety/Depression: Questions 41-47
        const anxdepIdx = Array.from({length: 7}, (_, i) => i + 40); // 40-46
        const anxdep = anxdepIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const anxdepPos = anxdep >= 3 && perfFlag;
        
        // Total scores
        const totalSymptomScore = [...inattIdx, ...hyperIdx].reduce((sum, idx) => {
            return sum + (numericAnswers[idx] || 0);
        }, 0);
        
        const perfCount = perfIdx.filter(idx => numericAnswers[idx] === 4 || numericAnswers[idx] === 5).length;
        
        const perfValues = perfIdx.map(idx => numericAnswers[idx] || 0);
        const perfAvg = perfValues.length > 0 ? 
            (perfValues.reduce((sum, val) => sum + val, 0) / perfValues.length).toFixed(2) : 0;
        
        return {
            Inattentive: { pos: inattPos, n: inatt },
            Hyperactive: { pos: hyperPos, n: hyper },
            Combined: { pos: combinedPos },
            ODD: { pos: oddPos, n: odd },
            Conduct: { pos: conductPos, n: conduct },
            AnxietyDep: { pos: anxdepPos, n: anxdep },
            PerfFlag: perfFlag,
            total_symptom_score: totalSymptomScore,
            perf_count: perfCount,
            perf_avg: perfAvg
        };
    } 
    else if (survey === "Vanderbilt - Teacher") {
        // Define criteria
        const perfIdx = Array.from({length: 8}, (_, i) => i + 35); // 36-43
        const perfFlag = perfIdx.some(idx => numericAnswers[idx] === 4 || numericAnswers[idx] === 5);
        
        // Inattention: Questions 1-9
        const inattIdx = Array.from({length: 9}, (_, i) => i); // 0-8
        const inatt = inattIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const inattPos = inatt >= 6 && perfFlag;
        
        // Hyperactivity: Questions 10-18
        const hyperIdx = Array.from({length: 9}, (_, i) => i + 9); // 9-17
        const hyper = hyperIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const hyperPos = hyper >= 6 && perfFlag;
        
        // Combined
        const combinedPos = inattPos && hyperPos;
        
        // ODD/Conduct: Questions 19-28
        const oddConductIdx = Array.from({length: 10}, (_, i) => i + 18); // 18-27
        const oddConduct = oddConductIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const oddConductPos = oddConduct >= 3 && perfFlag;
        
        // Anxiety/Depression: Questions 29-35
        const anxdepIdx = Array.from({length: 7}, (_, i) => i + 28); // 28-34
        const anxdep = anxdepIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const anxdepPos = anxdep >= 3 && perfFlag;
        
        // Total scores
        const totalSymptomScore = [...inattIdx, ...hyperIdx].reduce((sum, idx) => {
            return sum + (numericAnswers[idx] || 0);
        }, 0);
        
        const perfCount = perfIdx.filter(idx => numericAnswers[idx] === 4 || numericAnswers[idx] === 5).length;
        
        const perfValues = perfIdx.map(idx => numericAnswers[idx] || 0);
        const perfAvg = perfValues.length > 0 ? 
            (perfValues.reduce((sum, val) => sum + val, 0) / perfValues.length).toFixed(2) : 0;
        
        return {
            Inattentive: { pos: inattPos, n: inatt },
            Hyperactive: { pos: hyperPos, n: hyper },
            Combined: { pos: combinedPos },
            ODD_Conduct: { pos: oddConductPos, n: oddConduct },
            AnxietyDep: { pos: anxdepPos, n: anxdep },
            PerfFlag: perfFlag,
            total_symptom_score: totalSymptomScore,
            perf_count: perfCount,
            perf_avg: perfAvg
        };
    }
    
    return null;
}
        const hyper = hyperIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const hyperPos = hyper >= 6 && perfFlag;
        
        // Combined
        const combinedPos = inattPos && hyperPos;
        
        // ODD: Questions 19-26
        const oddIdx = Array.from({length: 8}, (_, i) => i + 18); // 18-25
        const odd = oddIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const oddPos = odd >= 4 && perfFlag;
        
        // Conduct: Questions 27-40
        const conductIdx = Array.from({length: 14}, (_, i) => i + 26); // 26-39
        const conduct = conductIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const conductPos = conduct >= 3 && perfFlag;
        
        // Anxiety/Depression: Questions 41-47
        const anxdepIdx = Array.from({length: 7}, (_, i) => i + 40); // 40-46
        const anxdep = anxdepIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const anxdepPos = anxdep >= 3 && perfFlag;
        
        // Total scores
        const totalSymptomScore = [...inattIdx, ...hyperIdx].reduce((sum, idx) => {
            return sum + (numericAnswers[idx] || 0);
        }, 0);
        
        const perfCount = perfIdx.filter(idx => numericAnswers[idx] === 4 || numericAnswers[idx] === 5).length;
        
        const perfValues = perfIdx.map(idx => numericAnswers[idx] || 0);
        const perfAvg = perfValues.length > 0 ? 
            (perfValues.reduce((sum, val) => sum + val, 0) / perfValues.length).toFixed(2) : 0;
        
        return {
            Inattentive: { pos: inattPos, n: inatt },
            Hyperactive: { pos: hyperPos, n: hyper },
            Combined: { pos: combinedPos },
            ODD: { pos: oddPos, n: odd },
            Conduct: { pos: conductPos, n: conduct },
            AnxietyDep: { pos: anxdepPos, n: anxdep },
            PerfFlag: perfFlag,
            total_symptom_score: totalSymptomScore,
            perf_count: perfCount,
            perf_avg: perfAvg
        };
    } 
    else if (survey === "Vanderbilt - Teacher") {
        // Define criteria
        const perfIdx = Array.from({length: 8}, (_, i) => i + 35); // 36-43
        const perfFlag = perfIdx.some(idx => numericAnswers[idx] === 4 || numericAnswers[idx] === 5);
        
        // Inattention: Questions 1-9
        const inattIdx = Array.from({length: 9}, (_, i) => i); // 0-8
        const inatt = inattIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const inattPos = inatt >= 6 && perfFlag;
        
        // Hyperactivity: Questions 10-18
        const hyperIdx = Array.from({length: 9}, (_, i) => i + 9); // 9-17
        const hyper = hyperIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const hyperPos = hyper >= 6 && perfFlag;
        
        // Combined
        const combinedPos = inattPos && hyperPos;
        
        // ODD/Conduct: Questions 19-28
        const oddConductIdx = Array.from({length: 10}, (_, i) => i + 18); // 18-27
        const oddConduct = oddConductIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const oddConductPos = oddConduct >= 3 && perfFlag;
        
        // Anxiety/Depression: Questions 29-35
        const anxdepIdx = Array.from({length: 7}, (_, i) => i + 28); // 28-34
        const anxdep = anxdepIdx.filter(idx => numericAnswers[idx] === 2 || numericAnswers[idx] === 3).length;
        const anxdepPos = anxdep >= 3 && perfFlag;
        
        // Total scores
        const totalSymptomScore = [...inattIdx, ...hyperIdx].reduce((sum, idx) => {
            return sum + (numericAnswers[idx] || 0);
        }, 0);
        
        const perfCount = perfIdx.filter(idx => numericAnswers[idx] === 4 || numericAnswers[idx] === 5).length;
        
        const perfValues = perfIdx.map(idx => numericAnswers[idx] || 0);
        const perfAvg = perfValues.length > 0 ? 
            (perfValues.reduce((sum, val) => sum + val, 0) / perfValues.length).toFixed(2) : 0;
        
        return {
            Inattentive: { pos: inattPos, n: inatt },
            Hyperactive: { pos: hyperPos, n: hyper },
            Combined: { pos: combinedPos },
            ODD_Conduct: { pos: oddConductPos, n: oddConduct },
            AnxietyDep: { pos: anxdepPos, n: anxdep },
            PerfFlag: perfFlag,
            total_symptom_score: totalSymptomScore,
            perf_count: perfCount,
            perf_avg: perfAvg
        };
    }
    
    return null;
}