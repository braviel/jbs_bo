'use strict';
module.exports = async function(decoded, request, h) {
    console.log(" - - - - - - - decoded token:");
    console.log(decoded);
    console.log(" - - - - - - - request info:");
    console.log(request.info);
    console.log(" - - - - - - - user agent:");
    console.log(request.headers['user-agent']);
    console.log(" - - - - - - - Authorization:");
    console.log(request.headers['Authorization']);
    return { isValid: true };
};