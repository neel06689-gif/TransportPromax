/* =========================================
   TRANSPORTPRO LOGIN JAVASCRIPT
   PART 3 / 5
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ELEMENTS
    ===================================== */

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginButton =
        document.getElementById("loginButton");

    const loginButtonText =
        document.getElementById("loginButtonText");

    const loginLoader =
        document.getElementById("loginLoader");

    const rememberMe =
        document.getElementById("rememberMe");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const otpLogin =
        document.getElementById("otpLogin");

    const registerButton =
        document.getElementById("registerButton");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");


    /* =====================================
       MODAL ELEMENTS
    ===================================== */

    const messageModal =
        document.getElementById("messageModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalIcon =
        document.getElementById("modalIcon");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalMessage =
        document.getElementById("modalMessage");

    const modalAction =
        document.getElementById("modalAction");


    /* =====================================
       MODAL FUNCTION
    ===================================== */

    function showModal(
        icon,
        title,
        message,
        buttonText = "Continue",
        action = null
    ) {

        if (!messageModal) {
            alert(message);
            return;
        }

        modalIcon.textContent = icon;
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalAction.textContent = buttonText;

        messageModal.classList.add("show");

        messageModal.setAttribute(
            "aria-hidden",
            "false"
        );

        modalAction.onclick = function () {

            if (typeof action === "function") {
                action();
            } else {
                closeModalFunction();
            }

        };
    }


    /* =====================================
       CLOSE MODAL
    ===================================== */

    function closeModalFunction() {

        if (!messageModal) return;

        messageModal.classList.remove("show");

        messageModal.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeModalFunction
        );

    }


    /* =====================================
       CLOSE MODAL OUTSIDE
    ===================================== */

    if (messageModal) {

        messageModal.addEventListener(
            "click",
            function (event) {

                if (event.target === messageModal) {
                    closeModalFunction();
                }

            }
        );

    }


    /* =====================================
       PASSWORD SHOW / HIDE
    ===================================== */

    if (togglePassword && passwordInput) {

        togglePassword.addEventListener(
            "click",
            function () {

                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type = "text";

                    togglePassword.textContent =
                        "🙈";

                    togglePassword.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    passwordInput.type =
                        "password";

                    togglePassword.textContent =
                        "👁️";

                    togglePassword.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    }


    /* =====================================
       CLEAR ERRORS
    ===================================== */

    function clearErrors() {

        if (emailError) {
            emailError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (emailInput) {

            const box =
                emailInput.closest(".input-box");

            if (box) {

                box.classList.remove(
                    "input-error",
                    "input-success"
                );

            }

        }

        if (passwordInput) {

            const box =
                passwordInput.closest(".input-box");

            if (box) {

                box.classList.remove(
                    "input-error",
                    "input-success"
                );

            }

        }

    }


    /* =====================================
       VALIDATE MOBILE / EMAIL
    ===================================== */

    function validateIdentity(value) {

        const cleanValue =
            value.trim();

        if (cleanValue === "") {

            return {
                valid: false,
                message:
                    "Please enter your mobile number or email."
            };

        }


        const mobilePattern =
            /^[6-9][0-9]{9}$/;

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            mobilePattern.test(cleanValue) ||
            emailPattern.test(cleanValue)
        ) {

            return {
                valid: true,
                message: ""
            };

        }


        return {
            valid: false,
            message:
                "Enter a valid 10-digit mobile number or email."
        };

    }


    /* =====================================
       VALIDATE PASSWORD
    ===================================== */

    function validatePassword(value) {

        if (value === "") {

            return {
                valid: false,
                message:
                    "Please enter your password."
            };

        }


        if (value.length < 6) {

            return {
                valid: false,
                message:
                    "Password must contain at least 6 characters."
            };

        }


        return {
            valid: true,
            message: ""
        };

    }


    /* =====================================
       LIVE INPUT CLEAR
    ===================================== */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            function () {

                if (emailError) {
                    emailError.textContent = "";
                }

                const box =
                    emailInput.closest(".input-box");

                if (box) {

                    box.classList.remove(
                        "input-error"
                    );

                }

            }
        );

    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            function () {

                if (passwordError) {
                    passwordError.textContent = "";
                }

                const box =
                    passwordInput.closest(".input-box");

                if (box) {

                    box.classList.remove(
                        "input-error"
                    );

                }

            }
        );

    }


    /* =====================================
       LOGIN
    ===================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                clearErrors();


                const identity =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                /* Validate identity */

                const identityResult =
                    validateIdentity(identity);


                if (!identityResult.valid) {

                    if (emailError) {

                        emailError.textContent =
                            identityResult.message;

                    }

                    const box =
                        emailInput.closest(
                            ".input-box"
                        );

                    if (box) {

                        box.classList.add(
                            "input-error"
                        );

                    }

                    emailInput.focus();

                    return;

                }


                /* Validate password */

                const passwordResult =
                    validatePassword(password);


                if (!passwordResult.valid) {

                    if (passwordError) {

                        passwordError.textContent =
                            passwordResult.message;

                    }

                    const box =
                        passwordInput.closest(
                            ".input-box"
                        );

                    if (box) {

                        box.classList.add(
                            "input-error"
                        );

                    }

                    passwordInput.focus();

                    return;

                }


                /* =================================
                   LOADING
                ================================= */

                if (loginButton) {

                    loginButton.disabled = true;

                    loginButton.classList.add(
                        "loading"
                    );

                }


                if (loginButtonText) {

                    loginButtonText.textContent =
                        "Signing in...";

                }


                if (loginLoader) {

                    loginLoader.style.display =
                        "inline-block";

                }


                /* =================================
                   DEMO LOGIN
                ================================= */

                setTimeout(
                    function () {

                        /* Save session */

                        localStorage.setItem(
                            "userLoggedIn",
                            "true"
                        );

                        localStorage.setItem(
                            "userIdentity",
                            identity
                        );


                        /* Remember me */

                        if (
                            rememberMe &&
                            rememberMe.checked
                        ) {

                            localStorage.setItem(
                                "rememberMe",
                                "true"
                            );

                        } else {

                            localStorage.removeItem(
                                "rememberMe"
                            );

                        }


                        /* Reset button */

                        if (loginButton) {

                            loginButton.disabled =
                                false;

                            loginButton.classList.remove(
                                "loading"
                            );

                        }


                        if (loginButtonText) {

                            loginButtonText.textContent =
                                "Login";

                        }


                        if (loginLoader) {

                            loginLoader.style.display =
                                "none";

                        }


                        /* Success */

                        showModal(
                            "✅",
                            "Login Successful",
                            "Welcome back to TransportPro!",
                            "Continue",
                            function () {

                                window.location.href =
                                    "Home.html";

                            }
                        );

                    },
                    1200
                );

            }
        );

    }


    /* =====================================
       FORGOT PASSWORD
    ===================================== */

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function () {

                showModal(
                    "🔑",
                    "Forgot Password?",
                    "Password reset will be connected with OTP in the next part.",
                    "Continue"
                );

            }
        );

    }


    /* =====================================
       OTP LOGIN
    ===================================== */

    if (otpLogin) {

        otpLogin.addEventListener(
            "click",
            function () {

                showModal(
                    "📲",
                    "Login with OTP",
                    "OTP login will be connected with the backend later.",
                    "Continue"
                );

            }
        );

    }


    /* =====================================
       REGISTER
    ===================================== */

    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function () {

                showModal(
                    "👤",
                    "Create Account",
                    "Registration page will be connected in Part 4.",
                    "Continue"
                );

            }
        );

    }


    /* =====================================
       REMEMBER ME
    ===================================== */

    const savedIdentity =
        localStorage.getItem(
            "userIdentity"
        );

    const savedRemember =
        localStorage.getItem(
            "rememberMe"
        );


    if (
        savedIdentity &&
        savedRemember === "true"
    ) {

        if (emailInput) {
            emailInput.value =
                savedIdentity;
        }

        if (rememberMe) {
            rememberMe.checked = true;
        }

    }


    /* =====================================
       ENTER KEY
    ===================================== */

    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    if (loginForm) {

                        loginForm.requestSubmit();

                    }

                }

            }
        );

    }


    /* =====================================
       ESC KEY
    ===================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                messageModal &&
                messageModal.classList.contains(
                    "show"
                )
            ) {

                closeModalFunction();

            }

        }
    );


    /* =====================================
       INITIAL STATE
    ===================================== */

    if (loginLoader) {
        loginLoader.style.display = "none";
    }

    if (loginButton) {
        loginButton.disabled = false;
    }

    if (togglePassword) {

        togglePassword.textContent =
            "👁️";

    }


    /* =====================================
       FINAL CHECK
    ===================================== */
/* =====================================
   FINAL CHECK
===================================== */

if (!loginForm) {
    console.warn(
        "TransportPro: loginForm not found."
    );
}

if (!emailInput) {
    console.warn(
        "TransportPro: email input not found."
    );
}

if (!passwordInput) {
    console.warn(
        "TransportPro: password input not found."
    );
}

if (!loginButton) {
    console.warn(
        "TransportPro: loginButton not found."
    );
}

if (!messageModal) {
    console.warn(
        "TransportPro: messageModal not found."
    );
}


/* =====================================
   LOGIN SYSTEM STATUS
===================================== */

console.log(
    "TransportPro Login Frontend Ready ✅"
);


/* =====================================
   END OF LOGIN JAVASCRIPT
===================================== */