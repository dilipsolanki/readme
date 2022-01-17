const express = require('express');
const neo4j = require('neo4j-driver');

require('dotenv').config({ path: './../.env' });

const app = express();
app.use(express.json())
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const driver = neo4j.driver(
    'bolt://' + process.env.NEO4J_HOST,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

app.post("/lumiere", (req, res) => {
    console.log('request received..');

    let queryToExecute = req.body.q;
    queryToExecute = queryToExecute.replace(/(\r\n|\n|\r)/gm, "").replace(/  +/g, ' ');

    let session = driver.session();

    let results = [];
    console.log(queryToExecute, '\n');
    session.run(queryToExecute)
        .subscribe({
            onKeys: keys => {
                // console.log(keys);
            },
            onNext: record => {
                results.push(record);
                // console.log(record);
            },
            onCompleted: () => {
                res.json({ results });
                session.close(); // returns a Promise
            },
            onError: error => {
                res.sendStatus(500);
                session.close(); // returns a Promise
                console.log(error)
            }
        });
    // Close the driver when application exits.
    // This closes all used network connections.
    // driver.close();
});