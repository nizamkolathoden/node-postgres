const {Pool} = require('pg');
//pg libary connecting
const pool = new Pool();
module.exports = {
    query:(text,params)=>pool.query(text,params),
}