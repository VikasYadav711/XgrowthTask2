# Task-2 

Create a POST API endpoint that accepts the email of a user as input in body and responds with the user's details from both the 'user' and 'user_information' tables. Use Express.js for handling the API requests.
Instructions:

While doing this task, the post request is checked by writing fetch section on browser's console. 


## API Endpoints

- Get list of user details: 
[/hello-test](/hello-test)


then, on browser console using below fetch api given the input email:

```
{

    fetch('/user-details', {method:'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({email: 'vsingh@gmail.com'})}).
    then(res=> res.json()).
    then(msg => console.log(msg)).
    catch(err=> console.log(err));
}
```