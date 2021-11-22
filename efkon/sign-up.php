<?php
    // checking if variables are set 
    if(isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['password']) && !empty($_POST['password']))
    {      
      // connecting to the database
      $connection = mysqli_connect('server name', 'user', 'password', 'database name');
      // preventing sql injections
      $name = mysqli_real_escape_string($connection , $_POST['name']);
      $surname = mysqli_real_escape_string($connection , $_POST['surname']);
      $gender = mysqli_real_escape_string($connection , $_POST['gender']);
      $email = mysqli_real_escape_string($connection , $_POST['email']);
      $contact = mysqli_real_escape_string($connection , $_POST['contact']);
      $password = mysqli_real_escape_string($connection , $_POST['password']);
      // writing data to the table
      mysqli_query($connection , "INSERT INTO User (Name,Surname,Gender,Email,Contact_Number,Password) VALUES('".$name."','".$surname."','".$gender."','".$email."','".$contact."','".$password."');");
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