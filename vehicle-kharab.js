document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTS
    // =========================================

    const backButton = document.getElementById("backButton");
    const helpButton = document.getElementById("helpButton");

    const locationButton = document.getElementById("locationButton");
    const locationText = document.getElementById("locationText");

    const problemCards = document.querySelectorAll(".problem-card");

    const vehicleType = document.getElementById("vehicleType");
    const vehicleNumber = document.getElementById("vehicleNumber");
    const problemDescription = document.getElementById("problemDescription");

    const problemMedia = document.getElementById("problemMedia");
    const mediaPreview = document.getElementById("mediaPreview");

    const summaryProblem = document.getElementById("summaryProblem");
    const summaryVehicle = document.getElementById("summaryVehicle");
    const summaryLocation = document.getElementById("summaryLocation");

    const sendRequestButton =
        document.getElementById("sendRequestButton");

    const sendButtonText =
        document.getElementById("sendButtonText");

    const requestLoader =
        document.getElementById("requestLoader");


    // =========================================
    // MODAL ELEMENTS
    // =========================================

    const vehicleModal =
        document.getElementById("vehicleModal");

    const closeVehicleModal =
        document.getElementById("closeVehicleModal");

    const vehicleModalIcon =
        document.getElementById("vehicleModalIcon");

    const vehicleModalTitle =
        document.getElementById("vehicleModalTitle");

    const vehicleModalMessage =
        document.getElementById("vehicleModalMessage");

    const vehicleModalAction =
        document.getElementById("vehicleModalAction");


    // =========================================
    // VARIABLES
    // =========================================

    let selectedProblem = "";
    let currentLocation = null;
    let selectedMedia = null;


    // =========================================
    // BACK BUTTON
    // =========================================

    if (backButton) {

        backButton.addEventListener("click", function () {

            window.location.href = "Home.html";

        });

    }


    // =========================================
    // MODAL FUNCTION
    // =========================================

    function showModal(icon, title, message, buttonText = "OK") {

        vehicleModalIcon.textContent = icon;

        vehicleModalTitle.textContent = title;

        vehicleModalMessage.textContent = message;

        vehicleModalAction.textContent = buttonText;

        vehicleModal.classList.add("show");

    }


    function closeModal() {

        vehicleModal.classList.remove("show");

    }


    if (closeVehicleModal) {

        closeVehicleModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (vehicleModalAction) {

        vehicleModalAction.addEventListener(
            "click",
            closeModal
        );

    }


    vehicleModal.addEventListener(
        "click",
        function (event) {

            if (event.target === vehicleModal) {

                closeModal();

            }

        }
    );


    // =========================================
    // HELP BUTTON
    // =========================================

    if (helpButton) {

        helpButton.addEventListener("click", function () {

            showModal(
                "🔧",
                "Mechanic Help",
                "Vehicle ki problem select karein, apni location aur vehicle details add karein. Uske baad Send Request button dabayein.",
                "Samajh Gaya"
            );

        });

    }


    // =========================================
    // PROBLEM SELECTION
    // =========================================

    problemCards.forEach(function (card) {

        card.addEventListener("click", function () {

            problemCards.forEach(function (item) {

                item.classList.remove("selected");

            });


            card.classList.add("selected");


            selectedProblem =
                card.getAttribute("data-problem");


            summaryProblem.textContent =
                selectedProblem;


        });

    });


    // =========================================
    // VEHICLE DETAILS UPDATE
    // =========================================

    function updateVehicleSummary() {

        const type =
            vehicleType.value.trim();

        const number =
            vehicleNumber.value.trim();


        if (!type && !number) {

            summaryVehicle.textContent =
                "Not selected";

            return;

        }


        if (type && number) {

            summaryVehicle.textContent =
                type + " - " + number;

            return;

        }


        if (type) {

            summaryVehicle.textContent =
                type;

            return;

        }


        summaryVehicle.textContent =
            number;

    }


    vehicleType.addEventListener(
        "change",
        updateVehicleSummary
    );


    vehicleNumber.addEventListener(
        "input",
        updateVehicleSummary
    );


    // =========================================
    // VEHICLE NUMBER CAPITAL LETTER
    // =========================================

    vehicleNumber.addEventListener(
        "input",
        function () {

            this.value =
                this.value.toUpperCase();

        }
    );


    // =========================================
    // LOCATION DETECTION
    // =========================================

    locationButton.addEventListener(
        "click",
        function () {

            if (!navigator.geolocation) {

                showModal(
                    "📍",
                    "Location Not Supported",
                    "Aapke browser mein GPS location support available nahi hai."
                );

                return;

            }


            locationText.textContent =
                "Location detect ho rahi hai...";

            summaryLocation.textContent =
                "Detecting...";


            locationButton.disabled = true;

            locationButton.textContent =
                "📍 Detecting Location...";


            navigator.geolocation.getCurrentPosition(

                function (position) {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    currentLocation = {

                        latitude: latitude,

                        longitude: longitude

                    };


                    localStorage.setItem(
                        "vehicleLocation",
                        JSON.stringify(currentLocation)
                    );


                    const locationValue =
                        latitude.toFixed(6) +
                        ", " +
                        longitude.toFixed(6);


                    locationText.textContent =
                        "Location detected successfully";

                    summaryLocation.textContent =
                        locationValue;


                    locationButton.disabled = false;

                    locationButton.textContent =
                        "✅ Location Detected";


                },


                function (error) {

                    currentLocation = null;


                    locationText.textContent =
                        "Location detect nahi ho paayi";


                    summaryLocation.textContent =
                        "Not detected";


                    locationButton.disabled = false;

                    locationButton.textContent =
                        "📍 Try Again";


                    let message =
                        "Location access allow karein aur dobara try karein.";


                    if (error.code === 1) {

                        message =
                            "Location permission deny hai. Browser settings mein location permission allow karein.";

                    }


                    showModal(
                        "📍",
                        "Location Problem",
                        message
                    );

                },


                {

                    enableHighAccuracy: true,

                    timeout: 10000,

                    maximumAge: 0

                }

            );

        }
    );


    // =========================================
    // MEDIA UPLOAD
    // =========================================

    problemMedia.addEventListener(
        "change",
        function () {

            mediaPreview.innerHTML = "";

            selectedMedia = null;


            if (!this.files || this.files.length === 0) {

                return;

            }


            const file = this.files[0];

            selectedMedia = file;


            const fileURL =
                URL.createObjectURL(file);


            if (file.type.startsWith("image/")) {

                const image =
                    document.createElement("img");

                image.src = fileURL;

                image.alt =
                    "Vehicle Problem Photo";

                mediaPreview.appendChild(image);

            }


            else if (file.type.startsWith("video/")) {

                const video =
                    document.createElement("video");

                video.src = fileURL;

                video.controls = true;

                video.preload = "metadata";

                mediaPreview.appendChild(video);

            }

        }
    );


    // =========================================
    // LOAD PREVIOUS LOCATION
    // =========================================

    const savedLocation =
        localStorage.getItem("vehicleLocation");


    if (savedLocation) {

        try {

            currentLocation =
                JSON.parse(savedLocation);


            if (
                currentLocation.latitude &&
                currentLocation.longitude
            ) {

                locationText.textContent =
                    "Previous location available";


                summaryLocation.textContent =
                    currentLocation.latitude.toFixed(6) +
                    ", " +
                    currentLocation.longitude.toFixed(6);

            }

        }

        catch (error) {

            localStorage.removeItem(
                "vehicleLocation"
            );

        }

    }


    // =========================================
    // SEND MECHANIC REQUEST
    // =========================================

    sendRequestButton.addEventListener(
        "click",
        function () {

            const type =
                vehicleType.value.trim();

            const number =
                vehicleNumber.value.trim();

            const description =
                problemDescription.value.trim();


            // ---------------------------------
            // VALIDATION
            // ---------------------------------

            if (!selectedProblem) {

                showModal(
                    "⚠️",
                    "Problem Select Karein",
                    "Sabse pehle vehicle ki problem select karein."
                );

                return;

            }


            if (!type) {

                showModal(
                    "🚚",
                    "Vehicle Select Karein",
                    "Apni vehicle type select karein."
                );

                vehicleType.focus();

                return;

            }


            if (!number) {

                showModal(
                    "🔢",
                    "Vehicle Number Required",
                    "Please apni vehicle number enter karein."
                );

                vehicleNumber.focus();

                return;

            }


            if (description.length < 5) {

                showModal(
                    "📝",
                    "Problem Details Required",
                    "Vehicle problem ke baare mein thoda detail mein likhein."
                );

                problemDescription.focus();

                return;

            }


            if (!currentLocation) {

                showModal(
                    "📍",
                    "Location Required",
                    "Mechanic ko nearby request bhejne ke liye pehle apni location detect karein."
                );

                return;

            }


            // ---------------------------------
            // LOADING
            // ---------------------------------

            sendRequestButton.classList.add("loading");

            sendButtonText.style.display =
                "none";

            requestLoader.style.display =
                "inline-block";


            // ---------------------------------
            // REQUEST ID
            // ---------------------------------

            const requestId =
                "REQ-" +
                Date.now().toString().slice(-8);


            // ---------------------------------
            // REQUEST OBJECT
            // ---------------------------------

            const mechanicRequest = {

                requestId: requestId,

                problem: selectedProblem,

                vehicleType: type,

                vehicleNumber: number,

                description: description,

                latitude:
                    currentLocation.latitude,

                longitude:
                    currentLocation.longitude,

                mediaName:
                    selectedMedia
                        ? selectedMedia.name
                        : "",

                status: "pending",

                priority: "normal",

                createdAt:
                    new Date().toISOString()

            };


            // ---------------------------------
            // GET OLD REQUESTS
            // ---------------------------------

            let requests = [];


            try {

                requests =
                    JSON.parse(
                        localStorage.getItem(
                            "mechanicRequests"
                        )
                    ) || [];

            }

            catch (error) {

                requests = [];

            }


            // ---------------------------------
            // SAVE REQUEST
            // ---------------------------------

            requests.push(
                mechanicRequest
            );


            localStorage.setItem(
                "mechanicRequests",
                JSON.stringify(requests)
            );


            // ---------------------------------
            // DEMO PROCESS
            // ---------------------------------

            setTimeout(function () {

                sendRequestButton.classList.remove(
                    "loading"
                );

                sendButtonText.style.display =
                    "inline";

                requestLoader.style.display =
                    "none";


                showModal(
                    "✅",
                    "Request Created",
                    "Aapki mechanic request " +
                    requestId +
                    " create ho gayi hai. Abhi ye frontend demo mein locally save hai. Real nearby mechanics ko request bhejne ke liye backend connect karna hoga.",
                    "Done"
                );


            }, 1200);

        }
    );


    // =========================================
    // ESC KEY
    // =========================================


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


// =========================================
// MODAL OUTSIDE CLICK
// =========================================

if (vehicleModal) {

    vehicleModal.addEventListener(
        "click",
        function (event) {

            if (event.target === vehicleModal) {

                closeModal();

            }

        }
    );

}


// =========================================
// FINAL SAFETY CHECK
// =========================================

console.log(
    "TransportPro Vehicle Kharab page loaded successfully."
);


// =========================================
// END OF VEHICLE KHARAB JS
// =========================================