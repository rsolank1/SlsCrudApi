
let mysql = require('mysql');

let pool  = mysql.createPool({
    connectionLimit : 5,
    host: 'in-salesbee-rds-in-dev1-rdscluster-8qy7xah05ejc.cluster-cjooxentiz3z.ap-south-1.rds.amazonaws.com',
    user: 'masteruser',
    password: 'TvBlZCr5VrPaLjuO88cPEYksr47Rdgfl5Wu',
    database: 'trainingdb'
});

exports.executeQuery = async (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
                if (err){
                    reject(err);
                }
            else {
            connection.query(sql, params, (err, result) => {
                if (err){
                    reject(err);
                }
                console.log("-----Query execution Done! this is result -> "+JSON.stringify(result));
                connection.release();
                console.log("connection released..");
                resolve(result);
            });
        }
        });
    });
};