$(document).ready(function() {

	// Initialize the database
    var config = {
        apiKey: "AIzaSyDdz3K-OuLbL_otQdNeJ-SJvaJOU-307kY",
        authDomain: "train-timetable-77a91.firebaseapp.com",
        databaseURL: "https://train-timetable-77a91.firebaseio.com",
        projectId: "train-timetable-77a91",
        storageBucket: "train-timetable-77a91.appspot.com",
        messagingSenderId: "473367999199"
      };

      firebase.initializeApp(config);
    

  var database = firebase.database();

  
   
  // Button for adding trains
  $("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

	 // Grabs user input
	  var trainName = $("#trainName-input").val().trim();
	  var trainDest = $("#trainDest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFreq = $("#freq-input").val().trim();

	  // Hold temporary new train data
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };

      
	  // Uploads train data to the database
  		database.ref().push(newTrain);



	 // Clear table
	  $("#trainName-input").val("");
	  $("#trainDest-input").val("");
	  $("#firstTrain-input").val("");
      $("#freq-input").val("");
      
      
  	});

	database.ref().on("child_added", function(childSnapshot) {


	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
      var trainFreq = childSnapshot.val().frequency;

    

	   // Declare variable
  		var trainFreq;

  	  // Time is to be entered on the entry form
   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	 

	  // Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		// Time apart (remainder)
	    var tRemainder = diffTime % trainFreq;

	    // Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        
	    // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        


    //variables stored but not used
      var firstTrain = childSnapshot.val().start;
      var currentTime = moment();


	  // Add each train's data into the table
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});