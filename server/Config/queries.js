const Pool = require('pg').Pool
require ('dotenv').config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
    } = process.env

const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432,
});



const getSpaces = (request, response) => {
    pool.query('SELECT * FROM spaces ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getSpace = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM spaces WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createSpace = (request, response) => {
    const { name, address , seats , coordinates , affiliation , availiability , scheduale , type } = request.body
  
    pool.query('INSERT INTO spaces (name, address , seats , coordinates , affiliation , availiability , scheduale , type ) VALUES ($1, $2 , $3 , $4 , $5 , $6 , $7 , $8)', [name, address , seats , coordinates , affiliation , availiability , scheduale , type], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Added : ${results.insertId}`)
    })
  }
  
  const updateSpace = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, address , seats , coordinates , affiliation , availiability , scheduale , type } = request.body
  
    pool.query(
      'UPDATE spaces SET name = $1, address = $2 , seats = $3 , coordinates = $4 , affiliation = $5 , availiability = $6 , scheduale = $7 , type = $8 WHERE id = $9',
      [name, address, seats , coordinates , affiliation , availiability , scheduale , type, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Place modified with ID: ${id}`)
      }
    )
  }
  
  const deleteSpace = (request, response) => {
    const id = parseInt(request.params.id);
    console.log(id);
  
    pool.query('DELETE FROM spaces WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Space deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getSpaces,
    getSpace,
    createSpace,
    updateSpace,
    deleteSpace,
  }

