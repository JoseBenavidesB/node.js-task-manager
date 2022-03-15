const { v4: uuidv4 } = require('uuid')

class Tarea {

    id = '';
    desc = '';
    completado = null;

    constructor( descripcion) {
        this.id = uuidv4();
        this.desc = descripcion;
        this.completado = null;
    }

}


module.exports = Tarea;