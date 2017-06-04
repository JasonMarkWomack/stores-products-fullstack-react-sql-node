let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let cors = require('cors');
const PORT = 3111;
let pool = new pg.Pool({
    port: 5432,
    password: '',
    database: 'stores',
    max: 10,
    host: 'localhost',
    user: 'admin'
});

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.delete('/api/remove/:order_id', function(request, response){
    var order_id = request.params.order_id;
    pool.connect(function(err,db,done){
        if(err){
            return response.status(400).send(err)
        }
        else{
            db.query('DELETE FROM  ops WHERE order_id = $1', [Number(order_id)],
            
            function(err, result){

                done();
                                if(err){
                    return response.status(400).send(err)
                } else {
                    return response.status(200).send({message: 'success in deleting'})
                }
            })
        }
    })
})


app.get('/api/companies', function(request,response){
    pool.connect(function (err, db, done){
        if(err){
            return response.status(400).send(err)
     
                }
else{
    db.query('SELECT * FROM ops', function(err, table){
        done();
        if(err){
            return response.status(400).send(err)
        }
        else{
                        return response.status(200).send(table.rows)

        }
    })
}
                })
            })
  

app.post('/api/new-company', function(request, response){
   let company_name = request.body.company_name;
   let customer_address = request.body.customer_address;
   let ordered_item = request.body.ordered_item;
   let order_id = request.body.order_id;
   pool.connect((err, db, done) => {
    if(err){
return response.status(400).send(err);
    } else{
        db.query('INSERT INTO ops (company_name, customer_address, ordered_item, order_id) VALUES ($1, $2, $3, $4)',[company_name, customer_address, ordered_item, order_id],(err, table)=>{
            if(err){
return response.status(400).send(err);

            }else{
                console.log('INSERTED!');
               

            }
        });
    }

}) 

});

app.listen(PORT, () => console.log('on' + PORT));