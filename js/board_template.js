function createTaskContainer(category, title, description, progressBar, participants, urgency) {
    if(progress > 0) {
        return `
            <div class="single-task-body">
                <div class="category">${category}</div>
                <div class="name-task">${title}</div>
                <div class="task-description">${description}</div>
                <div id="task-progress" class="task-progress">
                    <span class="progress-bar"></span>
                    <div class="progress-number">${progressBar[0]}/${progressBar[1]} Done</div>
                </div>
                <div class="task-participants">
                    <div class="participants">${addHTMLParticipants(participants)}</div>
                    <div><img class="${urgency[0]}" src="../assets/img/low_icon.png" alt=""></div>
                </div>
            </div>
        `;
    }
}

function addHTMLParticipants(participants) {
    if(participants < 1) {
        return '';
    }
    let completeParticipantsString = '';
    if (participants.length < 4) {
        for (let i = 0; i < 3; i++) {
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
                <div class="participants-2">${participants.length - 2}</div>
            `;
    }
    return completeParticipantsString;
}