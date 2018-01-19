  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCgx_U_nhPIj-fCKPG512p7yczI7psgSgw",
    authDomain: "train-ec5ba.firebaseapp.com",
    databaseURL: "https://train-ec5ba.firebaseio.com",
    projectId: "train-ec5ba",
    storageBucket: "",
    messagingSenderId: "852588301699"
  };
 
  firebase.initializeApp(config);

  //Create a variable to reference the database.
  var database = firebase.database();

  //Variables to store data from the form
  var trainName = "";
  var destination = "";
  var trainTimeInput = "";
  var frequency = "";

  //create a jquery on-click statment; click addUser button collect and send to firebase
  
  $("#addTrainBtn").on("click", function(event){
  	 event.preventDefault();

  //Grab values from text boxes

  	 trainName = $("#trainName-input").val().trim();
  	 destination = $("#destination-input").val().trim();
     frequency = $("#frequency-input").val().trim();
  	 trainTimeInput = $("#trainTime-input").val().trim();
  	 
  //Push data to the database
  	 database.ref().push({

  	 	trainName: trainName,
  		destination: destination,
  		trainTimeInput: trainTimeInput,
  		frequency: frequency,      
  	 });

     //Clear text-boxes
     $("#trainName-input").val("");
     $("#destination-input").val("");
     $("#trainTime-input").val("");
     $("#frequency-input").val("");
    
     return false;

    }); 

    //child function on click listener
    database.ref().on("child_added", function(childSnapshot) {
   
      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var frequency = childSnapshot.val().frequency;
      var trainTimeInput = childSnapshot.val().trainTimeInput;
      //User inputs the time of the first train & input is converted from military time
      var firstTrain = moment(trainTimeInput, "hh:mm").subtract(1, "years");
      //Current time
      var currentTime = moment();
      //Calculates the difference between the user input and current time in minutes
      var diffTime = moment().diff(moment(firstTrain), "minutes");
      //The Remainder of the diffTime / frequency
      var remainder = diffTime % frequency;
      var minutesAway = frequency - remainder;
      //Time of next arrival
      var nextTrain = moment().add(minutesAway, "minutes");
      var nextTrainFormatted = moment(nextTrain).format("hh:mm");    
      //append the table in the html file
      $("#train-table > tbody").append(
       "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + 
        "</td><td>" + nextTrainFormatted + "</td><td>" + minutesAway  + "</td></tr>");
            
    });
  	
  	

   


 
  

  

  	
  	
  