document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('numSubjects').addEventListener('input', generateTable);
});

function generateTable() {
    const numSubjects = parseInt(document.getElementById('numSubjects').value);
    const courseInputs = document.getElementById('courseInputs');
    courseInputs.innerHTML = ''; // Clear any existing rows

    for (let i = 1; i <= numSubjects; i++) {
        const row = document.createElement('div');
        row.className = 'course-row';
        
        // Serial number
        const serialNumber = document.createElement('label');
        serialNumber.textContent = i;
        row.appendChild(serialNumber);

        // Subject name input
        const subjectNameInput = document.createElement('input');
        subjectNameInput.type = 'text';
        subjectNameInput.placeholder = 'Subject Name';
        subjectNameInput.className = 'subject-name-input';
        row.appendChild(subjectNameInput);

        // Credit dropdown
        const creditSelect = document.createElement('select');
        creditSelect.className = 'credit-input';
        for (let j = 0; j <= 5; j++) {
            const option = document.createElement('option');
            option.value = j;
            option.textContent = j;
            creditSelect.appendChild(option);
        }
        row.appendChild(creditSelect);

        // Grade dropdown
        const gradeSelect = document.createElement('select');
        gradeSelect.className = 'grade-input';
        const grades = [
            {value: 10, label: 'A+'},
            {value: 9, label: 'A'},
            {value: 8, label: 'B+'},
            {value: 7, label: 'B'},
            {value: 6, label: 'C'},
            {value: 5, label: 'D'},
            {value: 4, label: 'F'}
        ];
        grades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade.value;
            option.textContent = grade.label;
            gradeSelect.appendChild(option);
        });
        row.appendChild(gradeSelect);

        courseInputs.appendChild(row);
    }
}

function calculateSGPA() {
    let totalCredits = 0;
    let totalPoints = 0;

    const creditInputs = document.querySelectorAll('.credit-input');
    const gradeInputs = document.querySelectorAll('.grade-input');

    creditInputs.forEach((creditInput, index) => {
        const credit = parseInt(creditInput.value);
        const gradePoint = parseInt(gradeInputs[index].value);

        if (!isNaN(credit) && !isNaN(gradePoint)) {
            totalCredits += credit;
            totalPoints += credit * gradePoint;
        }
    });

    if (totalCredits === 0) {
        document.getElementById('result').innerText = `SGPA: 0.00`;
    } else {
        const sgpa = totalPoints / totalCredits;
        document.getElementById('result').innerText = `SGPA: ${sgpa.toFixed(2)}`;
    }
}
