import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "todoapp",
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Successfully connected to the database. Connection ID: ' + db.threadId);
});
