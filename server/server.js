require('dotenv').config();

const express = require('express');
// const morgan = require('morgan')
// Require database
const db = require('./db')

const app = express();

//Middleware to parse body
app.use(express.json())

// Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants")
    console.log(results)

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows
      },
    })
  } catch (err) {
    console.error(err);
  }
})

// Get individual restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    // Parameterized query to protect from sql attacks
    const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);

    console.log(results.rows)
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows,
      },
    })
  } catch (err) {
    console.error(err);
  }
})

// Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [
        req.body.name,
        req.body.location,
        req.body.price_range
      ]);
      console.log(results)
      res.status(201).json({
        status: 'success',
        data: {
          restaurant: results.rows,
        },
      })
  } catch (err) {
    console.error(err)
  }
})

// Update a restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
    [
      req.body.name,
      req.body.location,
      req.body.price_range,
      req.params.id
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows,
      },
    })
  } catch (err) {
    console.error(err)
  }
})

// Delete a Restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {

  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);

    res.status(204).json({
      status: 'success'
    })
  } catch (error) {
    
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)
})