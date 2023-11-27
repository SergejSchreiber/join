let todos = [{
    'id': 0,
    'progress': 'todo',
    'category': 'Design',
    'title': 'Website redesign',
    'description': 'Modify the contents of the main website...',
    'progressnumber': [],
    'subtasks': [],
    'participants': [
        'Santa Maria',
        'Marcel Viess',
        'Emmanuel Fahrenheit'
    ],
    'urgency': [
        'low',
        '../assets/img/low_icon.png'
    ],
    'dueDate': '2024-10-08'
}, {
    'id': 1,
    'progress': 'inprogress',
    'category': 'Sales',
    'title': 'Call potential clients',
    'description': 'Make the product presentation to prospective buyers',
    'progressnumber': [],
    'subtasks': [],
    'participants': [
        'Anja Schulz',
        'David Eisenberg',
        'Anton Artanlar',
        'Kevin Arndt'
    ],
    'urgency': [
        'high',
        '../assets/img/urgent_icon.png'
    ],
    'dueDate': '2023-12-15'
}, {
    'id': 2,
    'progress': 'awaitingfeedback',
    'category': 'Backoffice',
    'title': 'Accounting invoices',
    'description': 'Write open invoices for customer',
    'progressnumber': [],
    'subtasks': [],
    'participants': [
        'Marcel Bauer',
        'Anton Mayer',
        'Anton Artanlar',
        'Kevin Arndt',
        'Sven Karnter'
    ],
    'urgency': [
        'normal',
        '../assets/img/medium_icon.png'
    ],
    'dueDate': '2023-04-10'
}, {
    'id': 3,
    'progress': 'awaitingfeedback',
    'category': 'Media',
    'title': 'Video cut',
    'description': 'Edit the new company video',
    'progressnumber': [],
    'subtasks': [],
    'participants': [
        'Hans Kohl'
    ],
    'urgency': [
        'normal',
        '../assets/img/medium_icon.png'
    ],
    'dueDate': '2023-12-13'
}, {
    'id': 4,
    'progress': 'done',
    'category': 'Marketing',
    'title': 'Social media strategy',
    'description': 'Develop and campaign for brand positioning',
    'progressnumber': [],
    'subtasks': [],
    'participants': [
        'Bendikt Ziegler',
        'Ralph Sauron'
    ],
    'urgency': [
        'low',
        '../assets/img/low_icon.png'
    ],
    'dueDate': '2023-11-01'
}];

let contacts = [
    {
        'contactId': 0,
        'name': 'Anton Mayer',
        'mail': 'antom@gmail.com',
        'telefonnummer': '+491111111111'
    }, {
        'contactId': 1,
        'name': 'Anja Schulz',
        'mail': 'schulz@hotmail.com',
        'telefonnummer': '+491111111112'
    }, {
        'contactId': 2,
        'name': 'Benedikt Ziegler',
        'mail': 'benedikt@gmail.com',
        'telefonnummer': '+491111111113'
    }, {
        'contactId': 3,
        'name': 'Marcel Bauer',
        'mail': 'bauer@gmail.com',
        'telefonnummer': '+491111111114'
    }, {
        'contactId': 4,
        'name': 'Emmanuel Mauer',
        'mail': 'emmanuelMa@gmail.com',
        'telefonnummer': '+491111111115'
    }, {
        'contactId': 5,
        'name': 'Eva Fischer',
        'mail': 'eva@gmail.com',
        'telefonnummer': '+491111111116'
    }, {
        'contactId': 6,
        'name': 'David Eisenberg',
        'mail': 'davidberg@gmail.com',
        'telefonnummer': '+491111111117'
    }, {
        'contactId': 7,
        'name': 'Tatjana Wolf',
        'mail': 'wolf@gmail.com',
        'telefonnummer': '+492222222222'
    }
];

let category = ['Sales', 'Backoffice', 'Design', 'Marketing', 'Media'];

let allSubtasks = [];