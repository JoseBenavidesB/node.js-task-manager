//oldest way to show a menu, this was changed to INQUIRER.js

const { stdout } = require('process');

require('colors');

const mostrarMenu = ()=> {
    return new Promise((resolve)=>{
        console.clear();
        console.log("==========================".green);
        console.log("  Seleccione una opción".green);
        console.log("==========================".green);

        console.log(`${"1.".green} tarea`);
        console.log(`${"2.".green} tarea`);
        console.log(`${"3.".green} tarea`);
        console.log(`${"4.".green} tarea`);
        console.log(`${"5.".green} tarea`);
        console.log(`${"6.".green} tarea`);
        console.log(`${"0.".green} tarea`);

        //crear interfaz para introducir dato
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`Seleccione una opción: `, (opt)=> { 
            readline.close();
            resolve(opt);
        }) //question recibe pregunta y callback, importante cerrar la interfaz
    })
    


}

const pausa = ()=>{
    return new Promise((resolve)=>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: stdout,
        })
    
        readline.question(`Presione ${'ENTER'.green} para continuar`, ()=> {
            readline.close()
            resolve();
        })

    }) 

}



module.exports = { //para exportar el app, esto envia un objeeto
    mostrarMenu,
    pausa,

    
}