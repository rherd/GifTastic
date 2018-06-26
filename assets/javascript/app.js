//create array of topics (default options)

var topics = ["husky", "donkeys", "friends", "kiwi", "sunflowers", "pickup truck", "coffee", "babies", "sneakers", "hello", "blankets", "loud", "books", "mountains", "crying", "water", "league of legends"];

//function below renders our buttons
function makeButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        //create a new button tag for each button in topics
        var newButton = $("<button>");

        //give it an additional class for styling, all-buttons
        newButton.addClass("btn btn-primary btn-md all-buttons");

        // give it an id of all-buttons as well
        newButton.attr("id", "all-buttons");
        
        // give data name attribute for each topic name
        newButton.attr("data-name", topics[i]);

        //give the button name based on the topics above
        newButton.text(topics[i]);

        //append button to buttons div
        $("#buttons").append(newButton);

        // log all the topics for reference
        console.log(topics[i]);
    };
};

//when one of the buttons in "all-buttons" div is clicked (so anything in topics), execute giphy api call

function showGifs() {

    $(".all-buttons").on("click", function () {
        // create new variable , give it give it the data name of the clicked button
        var clickedTopic = $(this).attr("data-name");
        //query url for giphy api
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rIQ9zMD06CegyDXUEp0tW5GPAPTWsEPb&q=" + clickedTopic + "&limit=10";

        console.log(queryURL);
        
        //ajax call for api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            //log the respone data to a variable, console log
            
            // clear the gifs
            $("#gifs").empty();

            var gifData = response.data;
            console.log(response.data);

            //create new divs for returned gifs
            for (var i = 0; i < gifData.length; i++) {
                var newGifDiv = $("<div class='gifItem'>");
                var gifRating = gifData[i].rating;

                // create new paragraphs with the ratings
                var p = $("<p>").text("Rating: " + gifRating);

                var gifImg = $("<img>");

                // grab the still image and animated image, put them in different data attributes
                gifImg.attr("src", gifData[i].images.fixed_height_still.url);

                gifImg.attr("data-still", gifData[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", gifData[i].images.fixed_height.url);
                gifImg.attr("data-state", "still");

                //append paragraph created above to the new gif Div we created

                newGifDiv.append(gifImg);
                newGifDiv.append(p);

                //prepend each new gif retunred on top of the preivious
                $("#gifs").prepend(newGifDiv);
                $(gifImg).on("click", function () {
                    //when an image is clicked, create a new var of the state of the image, either still or animated
                    var state = $(this).attr("data-state");
                    // if the state is still, switch it to animated
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));

                        $(this).attr("data-state", "animate");

                    // if animated, switch it to still
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    };
                });
            };






        });
    });
};

// when the submit button is clicked, prevent refresh, push the new topic to the array of topics, make the buttons all over again, call the //showGifs function
function loadMoreButtons() {
    $("#new-topic").on("click", function(event) {
        event.preventDefault();

        var userGif = $("#userInput").val().trim();

        topics.push(userGif);
        console.log(topics);
        $("#userInput").val("");

        makeButtons();
        showGifs();
    })
}
//call all functions once document is loaded
$(document).ready(function(){
    loadMoreButtons();
    makeButtons();
    showGifs();
});