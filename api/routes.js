module.exports = (app) => {
    const verify = require('../config/tokenverify.js');
    const crud = require('../controller/crud.js');
    const login = require('../controller/user-controller.js');

    app.get('/user',verify.verifyToken, crud.getuser);
    app.get('/users',verify.verifyToken, crud.getusers);
    app.get('/user/:id',verify.verifyToken, crud.getUserById);
    app.get('/users/:id',verify.verifyToken, crud.getUsersById);
    app.post('/user',verify.verifyToken, crud.addUser);
    app.put('/user/:id',verify.verifyToken, crud.updateUser);
    app.delete('/user/:id',verify.verifyToken, crud.deleteUser);

    /* Association apis */
    app.get('/belongsto/:id',verify.verifyToken, crud.belongsToGet);
    app.post('/belongsto',verify.verifyToken, crud.belongsToPost);
    app.put('/belongsto/:id',verify.verifyToken, crud.belongsToPut);
    app.delete('/belongsto/:id',verify.verifyToken, crud.belongsToDelete);
    app.get('/hasone/:id',verify.verifyToken, crud.hasOneGet);
    app.post('/hasone',verify.verifyToken, crud.hasOnePost);
    app.put('/hasone/:id/:userId',verify.verifyToken, crud.hasOnePut);
    app.delete('/hasone/:id',verify.verifyToken, crud.hasOneDelete);
    app.get('/hasmany',verify.verifyToken, crud.hasManyGet);
    app.get('/belongstomany/users',verify.verifyToken, crud.belongsToManyGetUsers);
    app.post('/belongstomany/users',verify.verifyToken, crud.belongsToManyPostUsers);
    app.put('/belongstomany/users/:id',verify.verifyToken, crud.belongsToManyPutUsers);
    app.delete('/belongstomany/users/:id',verify.verifyToken, crud.belongsToManyDeleteUsers);
    app.get('/belongstomany/user',verify.verifyToken, crud.belongsToManyGetUser);

    /* psr apis */
    app.get('/psr/list/:id', verify.verifyToken, crud.getList);
    app.get('/psr/list/:empId/:profileId', verify.verifyToken, crud.getprofile);
    app.put('/psr/list/:empId/:profileId', verify.verifyToken, crud.updateProfiles);
    app.put('/psr/list/:profileId', verify.verifyToken, crud.updateProfile);
  
    /* Register and Auth */
    app.post('/reg', login.regUser);
    app.post('/auth', login.loginCheck);
}
