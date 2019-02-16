'use strict';
// const register = function(server, serverOptions)
// {
//     server.route(
module.exports = [
    {
        method: 'GET',
        path: '/profile',
        handler:  (req, res) => {
            const Profile = req.getModel('Profile');
            const profile =  Profile.findAll();
            return profile;
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'List all Profile',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {
        method: 'GET',
        path: '/profile/{id}',
        handler:  (req, res) => {
            const Profile = req.getModel('Profile');
            const profile =  Profile.findByPk(req.params.id);
            return profile;
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'Get Profile by id',
            notes: 'More implemetation note come here',
        }
    },// LIST
    {
        method: 'GET',
        path: '/profile',
        handler:  (req, res) => {
            const Profile = req.getModel('Profile');
            const profile =  Profile.findAll();
            return profile;
        },
        config: {
            auth: false, //'token',
            tags: ['api','profile'],
            description: 'List all Profile',
            notes: 'More implemetation note come here',
        }
    },// LIST
]
//     );
// }

// module.exports = {
//     name: 'api-profile',
//     version: '0.0.1',
//     register
// }