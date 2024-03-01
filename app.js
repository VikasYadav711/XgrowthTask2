const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs=require('fs');

const app = express();
const port =3000;

// Create MySQL connection
const connection = mysql.createConnection({
  //root- paas: 0532 - 8000
  host: 'localhost',  
  user: 'root', 
  password: '0532', 
  database: 'users',
  port: 8000   
});

// Connect to MySQL
connection.connect(err => {
  if(err)
  {
    console.error('Error connecting to MySQL DB: ' + err.stack);
    return;
  }
  console.log('Connected to DB');
});


app.use(bodyParser.json());

app.get('/hello-test', (req, res) => {
  return res.json({msg: "test works!"});
});     

//POST endpoint
app.post('/user-details', (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  // return res.json({msg: 'Testing post endpoint!'});

  //Query to fetch user details from both tables
  const query = `
    SELECT user.id, user.name, user_information.address, user_information.phone
    FROM user
    JOIN user_information ON user.id = user_information.id
    WHERE user.email = ?
  `;

  connection.query(query, [email], (error, results) => {
    if(error) 
    {
      console.error('Error in executing query: ' + error.stack);
      res.status(500).json({ error: 'Error occured while fetching data' });
      return;
    }

    if(results.length===0) {
      res.status(404).json({error:'User not found'});
      return;
    }
    console.log(results); 

    const userDetails = results[0];
  //  res.json({userDetails});

const jsonFilePath = 'user-details.json';
fs.writeFile(jsonFilePath, JSON.stringify(userDetails, null, 2), err => {
  if(err) 
  {
    console.error('Error in write operation: ' + err);
    res.status(500).json({ error: 'Error occured while writing.' });
    return;
  }
  console.log('Writing successful');
});

res.json(userDetails);
});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
    fetch('/user-details', {method:'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({email: 'vsingh@gmail.com'})}).
        then(res=> res.json()).
        then(msg => console.log(msg)).
        catch(err=> console.log(err));
*/