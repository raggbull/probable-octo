var db = require('../models');

var resources = {
    users: 'User',
    collections: 'Collection',
    items: 'Item',
    opportunities: 'Opportunity'
};

// for testing purposes we can toggle AUTH here.
const AUTH_ACTIVATED = true;

function paramToResourceKey(param) {
    if (Object.keys(resources[param])) {
        return resources[param];
    }
    return undefined;
}

function isLoggedIn(req, res, next) {
    if (!AUTH_ACTIVATED) {
        return next();
    }

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/signin');
}

function isAdmin(req, res, next) {
    if (!AUTH_ACTIVATED) {
        return next();
    }

    if (req.isAuthenticated()) {
        User.findById(req.user.id).then(dbUser => {
            if (dbUser.permissions === 'admin') {
                return next();
            } else {
                res.send('Need Admin permissions');
            }
        });
    }
}

module.exports = function (app /*, passport */) {

    /*******************\
    |  GENERAL ROUTING  |
    \*******************/

    // We can get rid of a lot of the repetition by generalizing how we interact
    // with the different database objects.  This scheme may have to change when
    // we introduce authentication...

    app.get('/api/users/me', isLoggedIn, function (req, res) {
        res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
    });

    app.get('/api/:resource', function (req, res) {
        let key = paramToResourceKey(req.params.resource);
        if (key) {
            db[key].findAll({}).then(data => res.json(data));
        } else {
            res.status(404).send('Not Found');
        }
    });

    app.get('/api/:resource/:id', function (req, res) {
        let key = paramToResourceKey(req.params.resource);
        if (key) {
            db[key].findById(req.params.id).then(data => res.json(data));
        } else {
            res.status(404).send('Not Found');
        }
    });

    app.post('/api/:resource', isLoggedIn, function (req, res) {
        let key = paramToResourceKey(req.params.resource);
        if (key) {
            db[key]
                .create(req.body)
                .then(data => res.json(data))
                .catch(err => res.status(500).send(`Create ${key} Error. \n${err}`));
        } else {
            res.status(404).send('Not Found');
        }
    });

    app.put('/api/:resource/:id', isAdmin, function (req, res) {
        let key = paramToResourceKey(req.params.resource);
        if (key) {
            db[key]
                .update(req.body, { where: { id: req.params.id } })
                .then(data => res.json(data))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(404).send('Not Found');
        }
    });

    app.delete('/api/:resource/:id', function (req, res) {
        let key = paramToResourceKey(req.params.resource);
        if (key) {
            db[key]
                .destroy({ where: { id: req.params.id } })
                .then(data => res.json(data))
                .catch(err => res.status(500).send(err));
        } else {
            res.status(404).send('Not Found');
        }
    });

    /*******************\
  |  SPECIAL ROUTING  |
  \*******************/

    // These are particular patterns that will only be used for these routes.

    app.get('/api/users/:id/collections', function (req, res) {
        db.Collection
            .findAll({ where: { UserId: req.params.id } })
            .then(function (dbCollection) {
                res.json(dbCollection);
            });
    });

    app.get('/api/collections/:id/items', function (req, res) {
        db.Item
            .findAll({ where: { CollectionId: req.params.id } })
            .then(function (dbItem) {
                res.json(dbItem);
            });
    });

    /**************\
  |  OLD ROUTES  |
  \**************/

    // These are all the routes that would be used if we did not generalize the access logic above.

    // // USER API CALLS
    // app.get('/api/users', function (req, res) {
    //   db.User.findAll({}).then(function (data) {
    //     res.json(data);
    //   });
    // });

    // app.get('/api/users/:id', function (req, res) {
    //   db.User.findById(req.params.id).then(function (dbUser) {
    //     res.json(dbUser);
    //   });
    // });

    // app.post('/api/users', function (req, res) {
    //   // expects an object with properties 'name', 'email', 'bio'
    //   db.User.create(req.body).then(function (dbUser) {
    //     res.json(dbUser);
    //   });
    // });

    // app.delete('/api/users/:id', function (req, res) {
    //   db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
    //     res.json(dbUser);
    //   });
    // });

    // app.put('/api/users/:id', function (req, res) {
    //   db.User.update(req.body, { where: { id: req.params.id } }).then(function (dbUser) {
    //     res.json(dbUser);
    //   });
    // });


    // // COLLECTIONS API CALLS
    // app.get('/api/collections', function (req, res) {
    //   db.Collection.findAll({}).then(function (dbCollections) {
    //     res.json(dbCollections);
    //   });
    // });

    // app.get('/api/collections/:id', function (req, res) {
    //   db.Collection.findById(req.params.id).then(function (dbCollection) {
    //     res.json(dbCollection);
    //   });
    // });

    // app.post('/api/collections', function (req, res) {
    //   // expects an object with properties 'name', 'description', 'UserId'
    //   db.Collection.create(req.body).then(function (dbCollection) {
    //     res.json(dbCollection);
    //   });
    // });


    // app.delete('/api/collection/:id', function (req, res) {
    //   db.Collection.destroy({ where: { id: req.params.id } }).then(function (dbCollection) {
    //     res.json(dbCollection);
    //   });
    // });

    // app.put('/api/collections/:id', function (req, res) {
    //   // expects an object with properties 'name', 'description', 'UserId'
    //   db.Collection.update(req.body, { where: { id: req.params.id } }).then(function (dbCollection) {
    //     res.json(dbCollection);
    //   });
    // });

    // // ITEMS API CALLSK
    // app.get('/api/items', function (req, res) {
    //   db.Item.findAll({}).then(function (dbItems) {
    //     res.json(dbItems);
    //   });
    // });

    // app.get('/api/items/:id', function (req, res) {
    //   db.Item.findById(req.params.id).then(function (dbItem) {
    //     res.json(dbItem);
    //   });
    // });

    // app.post('/api/items', function (req, res) {
    //   // expects an object with properties 'name', 'imageUrl', 'description', 'UserId', 'CollectionId'
    //   db.Item.create(req.body).then(function (dbItem) {
    //     res.json(dbItem);
    //   });
    // });

    // app.delete('/api/items/:id', function (req, res) {
    //   db.Item.destroy({ where: { id: req.params.id } }).then(function (dbItem) {
    //     res.json(dbItem);
    //   });
    // });

    // app.put('/api/items/:id', function (req, res) {
    //   db.Item.update(req.body, { where: { id: req.params.id } }).then(function (dbItem) {
    //     res.json(dbItem);
    //   });
    // });

    // // OPPORTUNITIES API CALLS
    // app.get('/api/opportunities', function (req, res) {
    //   db.Opportunity.findAll({}).then(function (dbOp) {
    //     res.json(dbOp);
    //   });
    // });

    // app.get('/api/opportunities/:id', function (req, res) {
    //   db.Opportunity.findById(req.params.id).then(function (dbOp) {
    //     res.json(dbOp);
    //   });
    // });

    // app.post('/api/opportunities', function (req, res) {
    //   // expects an object with properties 'name', 'description', 'category', 'deadline' (date)
    //   db.Opportunity.create(req.body).then(function (dbOp) {
    //     res.json(dbOp);
    //   });
    // });

    // app.delete('/api/opportunities/:id', function (req, res) {
    //   db.Opportunity.destroy({ where: { id: req.params.id } }).then(function (dbOp) {
    //     res.json(dbOp);
    //   });
    // });

    // app.put('/api/opportunities/:id', function (req, res) {
    //   db.Opportunity.update(req.body, { where: { id: req.params.id } }).then(function (dbOpportunity) {
    //     res.json(dbOpportunity);
    //   });
    // });

};
