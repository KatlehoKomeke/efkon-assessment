<?php
    // storing all the POST data
    $email = $_POST['email'];
    $password = $_POST['password'];  
    // // checking if variables are set 
    if(isset($email) && !empty($email) && isset($password) && !empty($password))
    {      
      // connecting to the database
      $connection = $connection = mysqli_connect('database server', 'user', 'password', 'name of database');
      // preventing sql injections
      mysqli_real_escape_string($connection , $email);
      mysqli_real_escape_string($connection , $password);
      // getting the matching user's details
      $resultFromUsers = mysqli_query($connection , "SELECT * FROM User WHERE email='".$email."' AND password='".$password."' LIMIT 1;");
      // validating that the query was succesful
      if($resultFromUsers != false)
      {
        // converting the data into an array
        $rowFromUsers = mysqli_fetch_assoc($resultFromUsers);
        // checking that the returned data is set and not empty
        if(isset($rowFromUsers) && !empty($rowFromUsers))
        {
          // returning the array in json format
          echo json_encode($rowFromUsers);
          // cleaning up 
          unset($rowFromUsers);
          mysqli_free_result($resultFromUsers);
          unset($resultFromUsers);
          mysqli_close($connection);
          unset($connection); 
        }
      }
    }
?>