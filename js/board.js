let todos = [{
    'id': 0,
    'progress': 'todo',
    'category': 'Design',
    'title': 'Website redesign',
    'description': 'Modify the contents of the main website...',
    'progress-number': [
        1,
        2
    ],
    'participants': [
        'SM',
        'MV',
        'EF'
    ],
    'urgency': [
        'low',
        '../assets/img/low_icon.png'
    ]
}, {
    'id': 1,
    'progress': 'inprogress',
    'category': 'Sales',
    'title': 'Call potential clients',
    'description': 'Make the product presentation to prospective buyers',
    'progress-number': [],
    'participants': [
        'AS',
        'DE',
        'AA',
        'KA'
    ],
    'urgency': [
        'high',
        '../assets/img/urgent_icon.png'
    ]
}, {
    'id': 2,
    'progress': 'awaitingfeedback',
    'category': 'Backoffice',
    'title': 'Accounting invoices',
    'description': 'Write open invoices for customer',
    'progress-number': [],
    'participants': [
        'MB',
        'AM',
        'AA',
        'KA',
        'SK'
    ],
    'urgency': [
        'normal',
        '../assets/img/medium_icon.png'
    ]
}, {
    'id': 3,
    'progress': 'awaitingfeedback',
    'category': 'Media',
    'title': 'Video cut',
    'description': 'Edit the new company video',
    'progress-number': [],
    'participants': [
        'HK'
    ],
    'urgency': [
        'normal',
        '../assets/img/medium_icon.png'
    ]
}, {
    'id': 4,
    'progress': 'done',
    'category': 'Marketing',
    'title': 'Social media strategy',
    'description': 'Develop an ad campaign for brand positioning',
    'progress-number': [
        3,
        3
    ],
    'participants': [
        'BZ',
        'RS'
    ],
    'urgency': [
        'low',
        '../assets/img/urgent_icon.png'
    ]
}];

render();

function render() {
    for (let i = 0; i < todos.length; i++) {
        let addTodo = document.getElementById(todos[i]['progress']);
        addTodo.innerHTML += createTaskContainer(todos[i]['category'], todos[i]['title'], todos[i]['description'], todos[i]['progress-number'], todos[i]['participants'], todos[i]['urgency']);
    }
}