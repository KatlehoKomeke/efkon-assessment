// initialising radioButtonGender
let radioButtonGender = "n/a";
// hover effect for switching between sign and sign up
document.getElementById("sign-up").addEventListener("mouseover",function(event) 
{
    // undeline the text
    document.getElementById("sign-in").style.borderBottom = "0 none #fff";
    this.style.borderBottom = "0.5vh solid red";
    // display the sign-up-box and hide the sign-in-box
    document.getElementById("sign-in-box").style.display = "none";
    document.getElementById("sign-up-box").style.display = "grid";
});
// hover effect for switching between sign and sign up
document.getElementById("sign-in").addEventListener("mouseover",function(event) 
{
    // undeline the text
    document.getElementById("sign-up").style.borderBottom = "0 none #fff";
    this.style.borderBottom = "0.5vh solid red";
    // display the sign-in-box and hide the sign-up-box
    document.getElementById("sign-up-box").style.display = "none";
    document.getElementById("sign-in-box").style.display = "grid";
});
// sending a sign in request 
document.getElementById("submitSignIn").addEventListener("click",function(event) 
{
    // creating the ajax request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', './sign-in.php', true);
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4 && xhr.status === 200) 
        {
            // hide the sign in box and display the signed in content
            document.getElementById("box").style.display = "none";
            document.getElementById("head").style.display = "none";
            document.getElementById("right").style.display = "grid";
            document.getElementById("rightBottom").style.display = "grid";
            document.getElementById("table").style.display = "grid";
            // on response initialise the signed in person's information
            const return_data = JSON.parse(xhr.response);
            document.getElementById("table-row-name").textContent = return_data.Name;
            document.getElementById("table-row-surname").textContent = return_data.Surname;
            document.getElementById("table-row-gender").textContent = return_data.Gender;
            document.getElementById("table-row-email").textContent = return_data.Email; 
            document.getElementById("table-row-contact").textContent = return_data.Contact_Number;
            document.getElementById("table-row-password").textContent = return_data.Password; 
            
            document.getElementById("img").style.display = "grid";
        }
    }
    // setting up the data that is to be sent
    const formData = new FormData(); 
    const email = String(document.getElementById("emailSignIn").value);
    const password = document.getElementById("passwordSignIn").value;
    // validation before sending
    if(email != "" && email != null && email.includes("@") && email.includes(".") && password != "" && password != null)
    {
        formData.append("email",email);
        formData.append("password",password);
        // sending the request
        xhr.send(formData);
    }else
    {
        console.error("invalid input");
    }
});
// post sign up information
document.getElementById("submitSignUp").addEventListener("click",function(event) 
{
    // creating the ajax request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', './sign-up.php', true);
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4 && xhr.status === 200) 
        {
            // hide the sign ip box and display the signed up content
            document.getElementById("box").style.display = "none";
            document.getElementById("head").style.display = "none";
            document.getElementById("right").style.display = "grid";
            document.getElementById("rightBottom").style.display = "grid";
            document.getElementById("table").style.display = "grid";
            // on response initialise the signed in person's information
            const return_data = JSON.parse(xhr.response);
            document.getElementById("table-row-name").textContent = return_data.Name;
            document.getElementById("table-row-surname").textContent = return_data.Surname;
            document.getElementById("table-row-gender").textContent = return_data.Gender;
            document.getElementById("table-row-email").textContent = return_data.Email; 
            document.getElementById("table-row-contact").textContent = return_data.Contact_Number;
            document.getElementById("table-row-password").textContent = return_data.Password; 
        }
    }
    // setting up the data that is to be sent
    const formData = new FormData(); 
    const name = document.getElementById("nameSignUp").value;
    const surname = document.getElementById("surnameSignUp").value;
    const gender = radioButtonGender;
    const email = String(document.getElementById("emailSignUp").value);
    const contact = document.getElementById("contactNumberSignUp").value;
    const password = document.getElementById("passwordSignUp").value;
    // validation before sending
    if(email != "" && email != null && email.includes("@") && email.includes(".") && password != "" && password != null)
    {
        formData.append("name",name);
        formData.append("surname",surname);
        formData.append("gender",gender);
        formData.append("email",email);
        formData.append("contact",contact);
        formData.append("password",password);
        // sending the request
        xhr.send(formData);
    }else
    {
        console.error("invalid input");
    }
});
// update details function
function updateDetails(type,value)
{
    // creating the ajax request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', './update-details.php', true);
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4 && xhr.status === 200) 
        {
            // on response initialise the signed in person's information
            const return_data = JSON.parse(xhr.response);
            document.getElementById("table-row-name").textContent = return_data.Name;
            document.getElementById("table-row-surname").textContent = return_data.Surname;
            document.getElementById("table-row-gender").textContent = return_data.Gender;
            document.getElementById("table-row-email").textContent = return_data.Email; 
            document.getElementById("table-row-contact").textContent = return_data.Contact_Number;
            document.getElementById("table-row-password").textContent = return_data.Password; 
        }
    }
    /// setting up the data that is to be sent
    const formData = new FormData(); 
    const email = String(document.getElementById("table-row-email").textContent);
    const password = document.getElementById("table-row-password").textContent;
    if(email != "" && email != null && email.includes("@") && email.includes(".") && password != "" && password != null)
    {
        formData.append("value",value);
        formData.append("type",type);
        formData.append("email",email);
        formData.append("password",password);
        // sending the request
        xhr.send(formData);
    }else
    {
        console.error("invalid input");
    }
}
// setup the table that will contain the person's details
function setUpTableRow()
{
    for (let each of document.querySelectorAll(".table-row")) 
    {
        // on input udpate the person's details
        each.children[2].addEventListener('input', function(event)
        {
            updateDetails(this.placeholder,event.target.value);
        });
        // on hover change the look to allow for input
        each.addEventListener("mouseover",function(event)
        {
            each.children[1].style.display ="none";
            each.children[2].style.display ="grid";
            each.children[1].style.flex ="0";
            each.children[2].style.flex ="1";
        });
        // on leave change the look to not allow input
        each.addEventListener("mouseleave",function(event)
        {
            each.children[2].style.display ="none";
            each.children[1].style.display ="grid";
            each.children[1].style.flex ="1";
        });
    }
}

// calling the function 
setUpTableRow();

// implementing the sort function
document.getElementById("sort").addEventListener("click",function(event) 
{
    document.getElementById("table").innerHTML = '<div id="table-row-contact-hover" class="table-row"><div class="table-data-one">Contact number:</div><div id="table-row-contact" class="table-data-two">'+document.getElementById("table-row-contact").textContent+'</div><input type="text" id="updateContact" placeholder="Contact_Number" class="inputUpdate"></div><hr><div id="table-row-email-hover" class="table-row"><div class="table-data-one">Email:</div><div id="table-row-email" class="table-data-two">'+document.getElementById("table-row-email").textContent+'</div><input type="text" id="updateEmail" placeholder="Email" class="inputUpdate"></div><hr><div id="table-row-gender-hover" class="table-row"><div class="table-data-one">Gender:</div><div id="table-row-gender" class="table-data-two">'+document.getElementById("table-row-gender").textContent+'</div><input type="radio" placeholder="Gender" class="inputUpdate"></div><hr><div id="table-row-name-hover" class="table-row"><div class="table-data-one">Name:</div><div id="table-row-name" class="table-data-two">'+document.getElementById("table-row-name").textContent+'</div><input type="text" id="updateName" placeholder="Name" class="inputUpdate"></div><hr><div id="table-row-password-hover" class="table-row"><div class="table-data-one">Password:</div><div id="table-row-password" class="table-data-two">'+document.getElementById("table-row-password").textContent+'</div><input type="text" id="updatePassword" placeholder="Password" class="inputUpdate"></div><hr><div id="table-row-surname-hover" class="table-row"><div class="table-data-one">Surname:</div><div id="table-row-surname" class="table-data-two">'+document.getElementById("table-row-surname").textContent+'</div><input type="text" id="updateSurName" placeholder="Surname" class="inputUpdate"></div>';
    setUpTableRow();
});

// logging the person out  
document.getElementById("logout").addEventListener("click",function(event) 
{
    // resetting the whole process
    document.getElementById("box").style.display = "flex";
    document.getElementById("head").style.display = "grid";
    document.getElementById("right").style.display = "none";
    document.getElementById("rightBottom").style.display = "none";
    document.getElementById("table").style.display = "none";
    document.getElementById("img").style.display = "none";
    document.getElementById("img").src = './images/schedule.png';
    document.getElementById("datePicker").style.display = "none";
    document.getElementById("table-row-name").textContent = "";
    document.getElementById("table-row-surname").textContent = "";
    document.getElementById("table-row-gender").textContent = "";
    document.getElementById("table-row-email").textContent = ""; 
    document.getElementById("table-row-contact").textContent = "";
    document.getElementById("table-row-password").textContent = ""; 
});
// the schedule image which evertime it is clicked
// when clicked change image and UI
document.getElementById("img").addEventListener("click",function(event) 
{
    if(this.src == 'https://crime-fight.com/efkon/images/exit.png')
    {
        document.getElementById("datePicker").style.display = "none";
        this.src = './images/schedule.png';
        document.getElementById("table").style.display = "grid";
    }else
    {
        document.getElementById("table").style.display = "none";
        this.src = './images/exit.png';
        document.getElementById("datePicker").style.display = "grid";
    }
});
// calculating the autumnal equinox for the southern hemisphere
function MarchEquinox(year)
{
    // range is between -1000 and +3000 , else return nothing
    if(year*1000 < -1000 || year*1000 > 3000)
    {
        return "";
    }
    // initial seed value
    let initialJulianFormatDay = 0;
    // for years between -1000 and +999 set the seed to...
    if(year*1000 >=-1000 && year*1000 < 1000)
    {
        initialJulianFormatDay = 1721139.29189 + 365242.13740*(year) + 0.06134*(year**2) + 0.00111*(year**3) - 0.00071*(year**4);
    }
    // for years between +1000 and +3000 set the seed to...
    if(year*1000 >=1000 && year*1000<= 3000)
    {
        initialJulianFormatDay = 2451623.80984 + 365242.13740*((year*1000-2000)/1000) + 0.05169*(((year*1000-2000)/1000)**2) - 0.00411*(((year*1000-2000)/1000)**3) - 0.00057*(((year*1000-2000)/1000)**4);
    }
    // set the years and month
    const JulianFormatDay = (initialJulianFormatDay - 2451545)/36525;
    // delta is used to calculate the day offset
    const delta = 1 + 0.0334*Math.cos((35999.373*(((JulianFormatDay -2451545)/36525) -2.47))* Math.PI / 180) + 0.0007*Math.cos((2*(35999.373*((JulianFormatDay -2451545)/36525) -2.47))* Math.PI / 180);
    // sum also used to calculate the day offset
    const sum = 485*Math.cos((324.96+1934.136*JulianFormatDay)* Math.PI / 180) + 203*Math.cos((337.23+32964.467*JulianFormatDay)* Math.PI / 180) + 199*Math.cos((324.08+20.186*JulianFormatDay)* Math.PI / 180) + 182*Math.cos((27.85+445267.112*JulianFormatDay)* Math.PI / 180)+ 156*Math.cos((73.14+45036.886*JulianFormatDay)* Math.PI / 180)+ 136*Math.cos((171.52+22518.443*JulianFormatDay)* Math.PI / 180)+ 77*Math.cos((222.54+65928.934*JulianFormatDay)* Math.PI / 180)+ 74*Math.cos((296.72+3034.906*JulianFormatDay)* Math.PI / 180)+ 70*Math.cos((243.58+9037.513*JulianFormatDay)* Math.PI / 180)+ 58*Math.cos((119.81+33718.147*JulianFormatDay)* Math.PI / 180)+ 52*Math.cos((297.17+150.678*JulianFormatDay)* Math.PI / 180)+ 50*Math.cos((21.02+2281.226*JulianFormatDay)* Math.PI / 180)+ 45*Math.cos((247.54+29929.562*JulianFormatDay)* Math.PI / 180)+ 44*Math.cos((325.15+31555.956*JulianFormatDay)* Math.PI / 180)+ 29*Math.cos((60.93+4443.417*JulianFormatDay)* Math.PI / 180)+ 18*Math.cos((155.12+67555.328*JulianFormatDay)* Math.PI / 180)+ 17*Math.cos((288.79+4562.452*JulianFormatDay)* Math.PI / 180)+ 16*Math.cos((198.04+62894.029*JulianFormatDay)* Math.PI / 180)+ 14*Math.cos((199.76+31436.921*JulianFormatDay)* Math.PI / 180)+ 12*Math.cos((95.39+14577.848*JulianFormatDay)* Math.PI / 180)+ 12*Math.cos((287.11+31931.756*JulianFormatDay)* Math.PI / 180)+ 12*Math.cos((320.81+34777.259*JulianFormatDay)* Math.PI / 180)+ 9*Math.cos((227.73+1222.114*JulianFormatDay)* Math.PI / 180)+ 8*Math.cos((15.45+16859.074*JulianFormatDay)* Math.PI / 180);
    // answer = years and month + days
    const finalJulianFormatDay = initialJulianFormatDay + 0.00001*sum/delta;
    // the answer is now in Julian day format we need to convert it to the gregorian date format

    // if answer + 0.5 > 2299161
    if(Math.trunc(finalJulianFormatDay+0.5) >= 2299161)
    {
        const alpha = Math.trunc(((Math.trunc(finalJulianFormatDay+0.5) - 1867216.25))/36524.25);
        const offsetFinalJulianFormatDay = Math.trunc(finalJulianFormatDay+0.5) + 1 + alpha - Math.trunc(alpha/4) + 1524;
        // the year in the gregorian date format
        const theYear = Math.trunc((offsetFinalJulianFormatDay - 122.1)/365.25);
        // the month in the gregorian date format
        const theMonth = Math.trunc((offsetFinalJulianFormatDay - Math.trunc(365.25*theYear))/30.6001);
        // the day in the gregorian date format
        const theDay =  offsetFinalJulianFormatDay - Math.trunc(365.25*theYear) - Math.trunc(30.6001*theMonth) + finalJulianFormatDay+0.5 - Math.trunc(finalJulianFormatDay+0.5);
        let theFinalMonth = 0;
        let theFinalYear = 0;
        // formating it correctly 
        if(theMonth < 14)
        {
            theFinalMonth = theMonth - 1;
        }
        if(theMonth == 14 || theMonth == 15)
        {
            theFinalMonth = theMonth - 13;
        }
        if(theYear > 2)
        {
            theFinalYear = theYear -4716;
        }
        if(theYear == 1 || theYear == 2)
        {
            theFinalYear = theYear -4715
        }
        // final answers formated properly 
        const theHour = Math.trunc((theDay - Math.trunc(theDay))*24);
        const theMinute = Math.trunc(((theDay - Math.trunc(theDay))*24 - theHour)*60);
        const theSecond = Math.trunc((((theDay - Math.trunc(theDay))*24 - theHour)*60 - theMinute)*60);
        if(theMinute > 9 && theSecond > 9)
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":"+theMinute+":"+theSecond+" "+"GMT";
        }
        if(theMinute> 9 && !(theSecond > 9))
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":"+theMinute+":0"+theSecond+" "+"GMT";
        }
        if(!(theMinute > 9) && theSecond > 9)
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":0"+theMinute+":"+theSecond+" "+"GMT";
        }
        if(!(theMinute > 9) && !(theSecond > 9))
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":0"+theMinute+":0"+theSecond+" "+"GMT";
        }
    }else
    {
        const offsetFinalJulianFormatDay = Math.trunc(finalJulianFormatDay+0.5) + 1524;
        // the year in the gregorian date format
        const theYear = Math.trunc((offsetFinalJulianFormatDay - 122.1)/365.25);
        // the month in the gregorian date format
        const theMonth = Math.trunc((offsetFinalJulianFormatDay - Math.trunc(365.25*theYear))/30.6001);
        // the day in the gregorian date format
        const theDay =  offsetFinalJulianFormatDay - Math.trunc(365.25*theYear) - Math.trunc(30.6001*theMonth) + finalJulianFormatDay+0.5 - Math.trunc(finalJulianFormatDay+0.5);
        let theFinalMonth = 0;
        let theFinalYear = 0;
        // formating it correctly 
        if(theMonth < 14)
        {
            theFinalMonth = theMonth - 1;
        }
        if(theMonth == 14 || theMonth == 15)
        {
            theFinalMonth = theMonth - 13;
        }
        if(theYear > 2)
        {
            theFinalYear = theYear -4716;
        }
        if(theYear == 1 || theYear == 2)
        {
            theFinalYear = theYear -4715;
        }
        // final answers formated properly 
        const theHour = Math.trunc((theDay - Math.trunc(theDay))*24);
        const theMinute = Math.trunc(((theDay - Math.trunc(theDay))*24 - theHour)*60);
        const theSecond = Math.trunc((((theDay - Math.trunc(theDay))*24 - theHour)*60 - theMinute)*60);
        if(theMinute > 9 && theSecond > 9)
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":"+theMinute+":"+theSecond+" "+"GMT";
        }
        if(theMinute> 9 && !(theSecond > 9))
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":"+theMinute+":0"+theSecond+" "+"GMT";
        }
        if(!(theMinute > 9) && theSecond > 9)
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":0"+theMinute+":"+theSecond+" "+"GMT";
        }
        if(!(theMinute > 9) && !(theSecond > 9))
        {
            return theFinalYear+"/"+theFinalMonth+"/"+Math.trunc(theDay)+" "+theHour+":0"+theMinute+":0"+theSecond+" "+"GMT";
        }
    }
}
// excutes the equinox calculation based on the year provided
// from -1000 to +3000
// and return 10 equinoxes 
document.getElementById("yearPicker").addEventListener('input', function(event)
{
    // valid input only 
    if((parseInt(event.target.value) || parseInt(event.target.value) === 0) && (parseInt(event.target.value) > -1001 && parseInt(event.target.value) < 3001))
    {
        const value = parseInt(event.target.value);
        document.getElementById("year1").textContent = MarchEquinox(value/1000);
        document.getElementById("year2").textContent = MarchEquinox((value+1)/1000);
        document.getElementById("year3").textContent = MarchEquinox((value+2)/1000);
        document.getElementById("year4").textContent = MarchEquinox((value+3)/1000);
        document.getElementById("year5").textContent = MarchEquinox((value+4)/1000);
        document.getElementById("year6").textContent = MarchEquinox((value+5)/1000);
        document.getElementById("year7").textContent = MarchEquinox((value+6)/1000);
        document.getElementById("year8").textContent = MarchEquinox((value+7)/1000);
        document.getElementById("year9").textContent = MarchEquinox((value+8)/1000);
        document.getElementById("year10").textContent = MarchEquinox((value+9)/1000);
    }else
    {
        document.getElementById("year1").textContent = "";
        document.getElementById("year2").textContent = "";
        document.getElementById("year3").textContent = "";
        document.getElementById("year4").textContent = "";
        document.getElementById("year5").textContent = "";
        document.getElementById("year6").textContent = "";
        document.getElementById("year7").textContent = "";
        document.getElementById("year8").textContent = "";
        document.getElementById("year9").textContent = "";
        document.getElementById("year10").textContent = "";
    }
});
// selecting a male gender for sign-up box
document.getElementById("gender1").addEventListener('click', function(event)
{
    if(this.checked == true)
    {
        document.getElementById("gender2").checked = false; 
        document.getElementById("gender3").checked = false; 
        radioButtonGender = "male";
    }
});
// selecting a female gender for sign-up box
document.getElementById("gender2").addEventListener('click', function(event)
{
    if(this.checked == true)
    {
        document.getElementById("gender1").checked = false; 
        document.getElementById("gender3").checked = false; 
        radioButtonGender = "female";
    }
});
// selecting a n/a gender for sign-up box
document.getElementById("gender3").addEventListener('click', function(event)
{
    if(this.checked == true)
    {
        document.getElementById("gender1").checked = false; 
        document.getElementById("gender2").checked = false; 
        radioButtonGender = "n/a";
    }
});
// updating to male once sign-in
document.getElementById("updateToMale").addEventListener('click', function(event)
{
    if(this.checked == true)
    {
        document.getElementById("updateToFemale").checked = false; 
        document.getElementById("updateToNA").checked = false; 
        const gender = "male";
        updateDetails("Gender",gender);
    }
});
// updating to female once sign-in
document.getElementById("updateToFemale").addEventListener('click', function(event)
{
    if(this.checked == true)
    {
        document.getElementById("updateToMale").checked = false; 
        document.getElementById("updateToNA").checked = false; 
        const gender = "female";
        updateDetails("Gender",gender);
    }
});
// updating to n/a once sign-in
document.getElementById("updateToNA").addEventListener('click', function(event)
{
    if(this.checked == true)
    {
        document.getElementById("updateToFemale").checked = false; 
        document.getElementById("updateToMale").checked = false; 
        const gender = "n/a";
        updateDetails("Gender",gender);
    }
});