'use strict';
module.exports = {
    method: 'GET',
    path: '/api/profiles',
    config: {
        pre: [
            { method: (req, res) => {
                console.log('Pre handler');
                return req;
                } 
            }            
        ],
        handler: (req, res) => {
            console.log('resp profile ');
            return 'Profiles';
        }
    }
};