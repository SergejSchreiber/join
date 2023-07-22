const colorCategory = {
    'Design': '#FF7A00',
    'Sales': '#FC71FF',
    'Backoffice': '#1FD7C1',
    'Marketing': '#0038FF',
    'Media': '#FFC701'
};

const COLOR_PARTICIPANTS = [
    '#9327FF',
    '#FFA800',
    '#0223CF',
    '#CB02CF',
    '#4E963D',
    '#32DAFF',
    '#007CEE'
];

function createTaskContainer(id, category, title, description, progressBar, participants, urgency) {
    if(progressBar.length < 1) {
        return `
            <div draggable="true" ondragstart="startDraggin(${id})" onclick="showTaskedInDetail(${id})" id="task-container-${id}" class="single-task-body">
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
        <div draggable="true" ondragstart="startDraggin(${id})" onclick="showTaskedInDetail(${id})" id="task-container-${id}" class="single-task-body">
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

function addHTMLParticipants(participants) {
    if(participants < 1) {
        return '';
    }
    let completeParticipantsString = '';
    if (participants.length < 4) {
        for (let i = 0; i < participants.length; i++) {
            completeParticipantsString += `
                <div class="participants-${i}">${getInitials(participants[i])}</div>
            `;
        }
    } else {
        for (let i = 0; i < 2; i++) {
            completeParticipantsString += `
                <div class="participants-${i}">${getInitials(participants[i])}</div>
            `;
        }
        completeParticipantsString += `
                <div class="participants-2">+${participants.length - 2}</div>
            `;
    }
    return completeParticipantsString;
}

function getTaskDetails(id) {
    return `
        <div id="slide-contact">
            <div class="task-details">
                <div class="task-detail-x-icon"><img src="../assets/img/x_icon.svg"></div>
                <div class="task-detail-category">${todos[id]['category']}</div>
                <div class="task-detail-title">${todos[id]['title']}</div>
                <div class="task-detail-description">${todos[id]['description']}</div>
                <div class="task-detail-dueDate">
                    <div class="task-detail-dueDate-left">Due date:</div>
                    <div class="task-detail-dueDate-right">${todos[id]['dueDate']}</div>
                </div>
                <div class="task-detail-urgency">
                    <div class="task-detail-urgency-left">Due date:</div>
                    <div class="task-detail-urgency-right">
                        <div class="task-detail-urgency-right-name">${todos[id]['urgency'][0]}</div>
                        <img src="${todos[id]['urgency'][1]}">
                    </div>
                </div>
                <div class="task-detail-participants">
                    <div class="task-detail-participants-header">Assigned To:</div>
                    ${getParticipantsForTaskDetails(id)}
                </div>
            </div>
        </div>
    `;
}

function getParticipantsForTaskDetails(id) {
    let strin = '';
    for (let i = 0; i < todos[id]['participants'].length; i++) {
        strin += `
            <div class="task-detail-participants-body">
                <div id="participant-${id}" class="task-detail-participants-left">${todos[id]['participants'][i]}</div>
                <div class="task-detail-participants-right">${todos[id]['participants'][i]}</div>
            </div>`;    
    }
    return strin;
}