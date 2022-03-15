require('colors')

//const {mostrarMenu, pausa} = require('./helpers/mensajes')

const{inquirerMenu, pausa, tareaIngresada, choiceDeleteTask, userAgree, showListCheckList} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

const { saveDB, readFile } = require('./helpers/savefile');




const main = async()=> {
    
    // se instancia a tareas
    tareas = new Tareas();

    

    if (readFile()) {
        
        tareas.loadTask(readFile());
    }
    
    let option = '';

    do {
        //se imprime el menú
        option = await inquirerMenu();
        
        //se establece un case según la opción
        switch (option) {
            case '1':
                //solicitar el nombre de la tarea
                const valor = await tareaIngresada('ESCRIBA LA TAREA');

                // crea la tarea con el valor ingresado por el usuario                
                tareas.createTask(valor);
                break;
            
            case '2':
                //listar tarea
                //console.log(tareas.listadoArr);
                tareas.listTask();
                break;

            case '3':
                //listar tarea completada
                //console.log(tareas.listadoArr);
                tareas.listPendingComplete(true);
                break;

            case '4':
                //listar tarea pendientes
                //console.log(tareas.listadoArr);
                tareas.listPendingComplete(false);

                break;

            case '5':
                //listar tarea pendientes
                //console.log(tareas.listadoArr);
                const ids = await showListCheckList(readFile());
                tareas.toggle(ids);

                break;

            case '6':
                //listar tarea pendientes
                //console.log(tareas.listadoArr);
                const id = await choiceDeleteTask(readFile());
                if (id === '0') {
                    break;
                }
                //console.log( 'el ID QUE VA ELIMINAR ES ******* ', id)
                if (await userAgree('¿Esta de seguro?')) {
                    tareas.deleteTask(id)
                } else {
                    
                }
                break;  

        }

        await pausa()

        //crea el archivo JSON con las tareas
        saveDB(tareas.listadoArr);
        
        
    } while( option !== '0'); //la opción 0 corresponde a SALIR del menu

    //pausa()

}

main();

