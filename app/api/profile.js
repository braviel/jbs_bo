'use strict';
// const register = function(server, serverOptions)
// {
//     server.route(
module.exports = [
    {
        method: 'GET',
        path: '/api/profiles',
        config: {
            auth: 'token',
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
    }
]
//     );
// }

// module.exports = {
//     name: 'api-profile',
//     version: '0.0.1',
//     register
// }