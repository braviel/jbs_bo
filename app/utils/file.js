const fs = require('fs');   
module.exports = {
    writeFile: function(file, filename) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filename, file, err => {
                if(err) {
                    reject(err);
                }
                resolve({message: "Upload successfully!"})
            })
        })
    },
    writeStreamFile: function(fileData, filename) {
        return new Promise((resolve, reject) => {
            const fileS = fs.createWriteStream(filename);
            fileS.on('error', (err) => {
                console.error(err)
                reject(err);
            });
            fileData.pipe(fileS);    
            fileData.on('end', (err) => { 
                const ret = {
                    message: 'Upload successful!',
                    filename: fileData.hapi.filename,
                    headers: fileData.hapi.headers
                }
                resolve(JSON.stringify(ret));
            })
        })
    },
    readStreamFile: function(filePath, h) {
        return new Promise((resolve, reject) => {
            const fread = fs.createReadStream(filePath);
            fread.on('error', (err) => {
                console.error(err)
                reject(err);
            });
            fread.on('data', (data) => {
                console.log(data);
                h.response(data);
            });
            fread.on('end', () => {
                console.log('[end]')
                resolve(h);
            });
        })
    }
}