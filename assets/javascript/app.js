var topics = ["husky", "donkeys", "friends", "kiwi", "sunflowers", "pickup truck", "coffee", "babies", "sneakers", "hello", "blankets", "loud", "books", "mountains", "crying", "water", "league of legends"];

//function below redners our buttons
function makeButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");

        //give it an additional class for styling, all-buttons
        newButton.addClass("btn btn-primary btn-md all-buttons");

        // give it an id of all-buttons as well
        newButton.attr("id", "all-buttons");

        newButton.attr("data-name", topics[i]);

        newButton.text(topics[i]);

        $("#buttons").append(newButton);

        console.log(topics[i]);
    };
};

//when one of the buttons in "all-buttons" div is clicked (so anything in topics), do the giphy api call

function showGifs() {

    $(".all-buttons").on("click", function () {
        var clickedTopic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=rIQ9zMD06CegyDXUEp0tW5GPAPTWsEPb&q=" + clickedTopic + "&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            //log the respone data to a variable, console log
            

            $("#gifs").empty();

            var gifData = response.data;
            console.log(response.data);

            for (var i = 0; i < gifData.length; i++) {
                var newGifDiv = $("<div class='gifItem'>");
                var gifRating = gifData[i].rating;

                var p = $("<p>").text("Rating: " + gifRating);

                var gifImg = $("<img>");

                gifImg.attr("src", gifData[i].images.fixed_height_still.url);

                gifImg.attr("data-still", gifData[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", gifData[i].images.fixed_height.url);
                gifImg.attr("data-state", "still");

                //append paragraph created above to the new gif Div we created

                newGifDiv.append(gifImg);
                newGifDiv.append(p);

                $("#gifs").prepend(newGifDiv);
                $(gifImg).on("click", function () {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));

                        $(this).attr("data-state", "animate");


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

$(document).ready(function(){
    loadMoreButtons();
    makeButtons();
    showGifs();
});