<script>
    // Variables to store the count of votes for each party
    var bjpVotes = 0;
    var tdpVotes = 0;
    var jspVotes = 0;
    var ysrcpVotes = 0;

    // Function to toggle visibility of registration and step 2
    function registerOrLogin() {
        var registrationDiv = document.getElementById("registration");
        var step2Div = document.getElementById("step2");
        registrationDiv.style.display = "none";
        step2Div.style.display = "block";
    }

    // Reference Image (Replace 'path_to_your_reference_image.jpg' with your actual reference image)
    var referenceImage = new Image();
    referenceImage.src = 'faces dataset/face _1.jpeg';

    // Function to capture image
    function captureImage() {
        const videoConstraints = {
            video: true
        };

        navigator.mediaDevices.getUserMedia(videoConstraints)
            .then(function (stream) {
                const video = document.createElement('video');
                document.body.appendChild(video);
                video.srcObject = stream;
                video.play();

                setTimeout(() => {
                    captureFrame(video);
                    stream.getTracks().forEach(track => track.stop());
                    video.remove();
                }, 5000); // Capture for 5 seconds
            })
            .catch(function (error) {
                console.error("Error accessing the camera: " + error);
            });
    }

    function captureFrame(video) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const capturedImage = new Image();
        capturedImage.src = canvas.toDataURL('image/jpeg');

        capturedImage.onload = function () {
            // You can add your image comparison logic here
            // For simplicity, I'm returning true (valid) in this example
            const isMatch = true;

            if (isMatch) {
                alert("Your captured image is valid.");
                // Proceed to Step 3
                var step2Div = document.getElementById("step2");
                var step3Div = document.getElementById("step3");
                step2Div.style.display = "none";
                step3Div.style.display = "block";
            } else {
                alert("Your captured image is not valid, but you can proceed to the next step.");
                // Proceed to Step 3
                var step2Div = document.getElementById("step2");
                var step3Div = document.getElementById("step3");
                step2Div.style.display = "none";
                step3Div.style.display = "block";
            }
        };
    }

    // Function to submit vote
    function submitVote() {
        var partyForm = document.getElementById("partyForm");
        var selectedParty = partyForm.querySelector('input[name="party"]:checked');
        if (selectedParty) {
            // Increment the vote count for the selected party
            var party = selectedParty.value;
            if (party === "BJP") {
                bjpVotes++;
            } else if (party === "TDP") {
                tdpVotes++;
            } else if (party === "JSP") {
                jspVotes++;
            } else if (party === "YSRCP") {
                ysrcpVotes++;
            }

            var confirmation = confirm("Please ensure the chosen party is the desired one. Continue?");
            if (confirmation) {
                // Hide Step 3
                var step3Div = document.getElementById("step3");
                step3Div.style.display = "none";

                // Show the results
                var resultsDiv = document.getElementById("results");
                resultsDiv.style.display = "block";

                // Update the vote counts in the results
                document.getElementById("bjpVotes").textContent = bjpVotes;
                document.getElementById("tdpVotes").textContent = tdpVotes;
                document.getElementById("jspVotes").textContent = jspVotes;
                document.getElementById("ysrcpVotes").textContent = ysrcpVotes;
            }
        } else {
            alert("Please select a party before submitting your vote.");
        }
    }
</script>
