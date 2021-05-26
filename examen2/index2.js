const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;





const CONNECTION_URL = "mongodb+srv://drandredev:andre12@cluster0.bdv5z.mongodb.net/Examen2?retryWrites=true&w=majority"
const DATABASE_NAME = "Examen2";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collectionentidades, collectioncuentascupo, collectionmovimientos ;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collectionentidades = database.collection("entidades");
        collectioncuentascupo = database.collection("cuentascupo");
        collectionmovimientos = database.collection("movimientos");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

///////////////////  ENTIDADES /////////////////////////

app.post("/entidades", (request, response) => {
    collectionentidades.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/entidades", (request, response) => {
    collectionentidades.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/entidades/:id", (request, response) => {
    collectionentidades.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

///////////////////  CUENTAS CUPO /////////////////////////

app.post("/cuentas", (request, response) => {
    collectioncuentascupo.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/cuentas", (request, response) => {
    collectioncuentascupo.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/cuentas/:id", (request, response) => {
    collectioncuentascupo.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


////////////////// GRAPHQL ///////////////////////////


app.post("/movimientos", (request, response) => {
    collectionmovimientos.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/movimientos", (request, response) => {
    collectionmovimientos.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/movimientos/:id", (request, response) => {
    collectionmovimientos.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});




  
