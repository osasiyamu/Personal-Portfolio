const { Client } = require('pg')

const client = new Client({
    host: "searchmeup.c7q2q6o0q4j5.ca-central-1.rds.amazonaws.com",
    user: "",
    port: 5432,
    password: "",
    database: "",
    ssl: {
        require: true,
        rejectUnauthorized: false,
      }
})

client.connect();






client.query(`Select * from users`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
})