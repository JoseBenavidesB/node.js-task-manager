const Tarea = require('./tarea');



class Tareas {

    _listado = {}; 

    get listadoArr () {
        const lista = []; //se crea la lista vacia

        Object.keys(this._listado).forEach(key => { //convert _listado to new arrey with keys
            const tarea = this._listado[key];
            lista.push( tarea );
        });
        return lista;
    };

    constructor() {
        this._listado = {};
    }

    deleteTask(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    };

    loadTask ( array = [] ) {
        array.forEach(task => {
            const tarea = new Tarea();
            tarea.id = task.id
            tarea.desc = task.desc
            tarea.completado = task.completado
            this._listado[task.id] = tarea;
        })
    };

    createTask(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    };

    listTask() {
        console.log();
        this.listadoArr.forEach((task, id)=>{
            const idx = `${id + 1}.`.green;
            const {desc, completado} = task;
            const status = (completado) ? 'Completada'.green : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${status}`)
        });
    };

    listPendingComplete (complete = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((task)=>{
            const {desc, completado} = task;
            
            if (complete) {
                if (completado) {
                    contador ++
                    console.log(`${contador}.`.green,`${desc} :: `,`${completado}`.green)
                    //idxComplete ++;
                }
            } else {
                
                if (!completado) {
                    contador++
                    console.log(`${contador}.`.green, `${desc} :: `,'Pendiente'.red)
                    //idxPending ++;
                }
            }
            
        });
    }

    toggle(ids = []) {

        ids.forEach(id=>{
            if(!this._listado[id].completado) {
                this._listado[id].completado = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completado = null;
            }
        })

    }
    
} 

module.exports = Tareas;