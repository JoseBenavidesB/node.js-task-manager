
const fs = require('fs') //manejo de archivos

const path = './db/base.json'

const saveDB = (data)=> {

    

    fs.writeFileSync(path, JSON.stringify(data)) 
};


const readFile = ()=> {

    if ( !fs.existsSync(path)) {
        return null
    }
    const info = fs.readFileSync(path, {encoding: 'utf-8'});
    const data = JSON.parse( info );

    return data

};

module.exports = {
    saveDB,
    readFile
};