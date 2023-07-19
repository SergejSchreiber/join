const colorCategory = {
    'Design': '#FF7A00',
    'Sales': '#FC71FF',
    'Backoffice': '#1FD7C1',
    'Marketing': '#0038FF',
    'Media': '#FFC701'
};

function createTaskContainer(id, category, title, description, progressBar, participants, urgency) {
    if(progressBar.length < 1) {
        return `
            <div draggable="true" id="task-container-${id}" class="single-task-body">
                <div id="category-${id}" class="category">${category}</div>
                <div class="name-task">${title}</div>
                <div class="task-description">${description}</div>
                <div id="task-progress" class="task-progress"></div>
                <div class="task-participants">
                    <div class="participants">${addHTMLParticipants(participants)}</div>
                    <div><img class="${urgency[0]}" src="${urgency[1]}" alt=""></div>
                </div>
            </div>
        `;
    }
    return `
        <div draggable="true" class="single-task-body">
            <div id="category-${id}" class="category">${category}</div>
            <div class="name-task">${title}</div>
            <div class="task-description">${description}</div>
            <div id="task-progress" class="task-progress">
                <span class="progress-bar"></span>
                <div class="progress-number">${progressBar[0]}/${progressBar[1]} Done</div>
            </div>
            <div class="task-participants">
                <div class="participants">${addHTMLParticipants(participants)}</div>
                <div><img class="${urgency[0]}" src="${urgency[1]}" alt=""></div>
            </div>
        </div>
    `;
}

function giveCategoryBackgroundColor(id) {
    let colorBackground = document.getElementById('category-' + id);
    colorBackground.style = `background-color: ${colorCategory[todos[id]['category']]}`;
}

function addHTMLParticipants(participants) {
    if(participants < 1) {
        return '';
    }
    let completeParticipantsString = '';
    if (participants.length < 4) {
        for (let i = 0; i < participants.length; i++) {
            completeParticipantsString += `
                <div class="participants-${i}">${participants[i]}</div>
            `;
        }
    } else {
        for (let i = 0; i < 2; i++) {
            completeParticipantsString += `
                <div class="participants-${i}">${participants[i]}</div>
            `;
        }
        completeParticipantsString += `
                <div class="participants-2">+${participants.length - 2}</div>
            `;
    }
    return completeParticipantsString;
}