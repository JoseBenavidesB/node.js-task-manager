const { green } = require('colors');
const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [{
            value: '1',
            name: `${'1'.green}. Crear tarea`
        },
        {
            value: '2',
            name: `${'2'.green}. Listar tareas`
        },
        {
            value: '3',
            name: `${'3'.green}. Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4'.green}. Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5'.green}. Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6'.green}. Borrar tarea`
        },
        {
            value: '0',
            name: `${'0'.green}. Salir`
        },
    ]
    }
];

const inquirerMenu = async ()=>{  //muestra el menu inicial
    console.clear();
    console.log("==========================".green);
    console.log("  Seleccione una opción".green);
    console.log("==========================".green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion; //la opción recoge el valor seleccionado por el usuario  
}

const pausa = async ()  => { 

    question = [
        {
            type: 'input', //con esto se espera un input, en este caso el enter para continuar
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]
    await inquirer.prompt(question);
    
};

const tareaIngresada = async (mensaje)=> { //input a new task
    question = [
        {
            type: 'input',
            name: 'tareaIngresada',
            message: mensaje, //aca se establece el mensaje que se desea preguntar al usuario
            validate ( value ) { //con esto se valida que al menos escriban algo
                if (value.length === 0 ) {
                    return 'Por ingrese un valor';
                }
                return true; //al retornar un true la validación pasa
            }
        }
    ];
    const {tareaIngresada} = await inquirer.prompt(question); //tareaIngresada recoge el valor

    return tareaIngresada;
};

const choiceDeleteTask = async(opciones = []) => {

    const choices = opciones.map((task, id)=> {
        const idx = `${id + 1}.`.green
        return {
            value: task.id,
            name: `${idx} ${task.desc}` 
        }
    })
    //console.log('las eleciones son::::', choices)
    choices.unshift({
        value: '0',
        name: `${'0.'.green} CANCELAR`
    })
    const question = [
        {
            type: 'list',
            name: 'borrar',
            message: 'Elige la tarea que desea eliminar',
            choices: choices
        }
    ]

    //console.log('preguntas:::::', question)
    const {borrar} = await inquirer.prompt(question);
    //console.log('El valor a borrar es', borrar)
    return borrar;

}

const userAgree = async (message)=> { //User, are you agree?
    const question = [
        {
        type: 'confirm',
        name: 'opcion',
        message: message,
        }
    ];

    const {opcion} = await inquirer.prompt(question);
    //console.log(opcion);
    return opcion;
    
}

const showListCheckList = async(opciones = []) => { //show a list in check format

    const choices = opciones.map((task, id)=> {
        const idx = `${id + 1}.`.green
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completado) ? true : false 
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices: choices
        }
    ]

    const {ids} = await inquirer.prompt(question); 
    return ids;

}

module.exports = { 
    inquirerMenu,
    pausa,
    tareaIngresada,
    choiceDeleteTask,
    userAgree,
    showListCheckList
}