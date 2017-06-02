let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg')
const PORT = 3000;
let app = express();
let pool = new pg.Pool({
    port: 5432,
    password: '',
    database: 'stores',
    max: 10,
    host: 'localhost',
    user: 'admin'
});

pool.connect((err, db, done) => {
    if(err){
       return console.log(err);
    } else{
            let company_name = 'Walmart';
            let customer_address = 'Crazy Road';
            let ordered_item = 'TV'
            let order_id = Math.random().toFixed(4)

        db.query('INSERT INTO ops (company_name, customer_address, ordered_item,  order_id)  VALUES($1, $2, $3, $4)',
         [company_name, customer_address, ordered_item,  order_id],(err, table)=>{
            if(err){
                return console.log(err);

            }else{
                console.log('Insereted Data :)');
db.end();
            }
        });
    }

}) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(request, response, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => console.log('on' + PORT));