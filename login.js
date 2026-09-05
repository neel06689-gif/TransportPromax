/* =========================================
   TRANSPORTPRO LOGIN JAVASCRIPT
   SUPABASE AUTH VERSION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.getElementById("loginButton");
    const loginButtonText = document.getElementById("loginButtonText");
    const loginLoader = document.getElementById("loginLoader");
    const rememberMe = document.getElementById("rememberMe");

    const forgotPassword = document.getElementById("forgotPassword");
    const otpLogin = document.getElementById("otpLogin");
    const registerButton = document.getElementById("registerButton");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const messageModal = document.getElementById("messageModal");
    const closeModal = document.getElementById("closeModal");
    const modalIcon = document.getElementById("modalIcon");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modalAction = document.getElementById("modalAction");


    /* =====================================
       MODAL
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
        messageModal.setAttribute("aria-hidden", "false");

        modalAction.onclick = function () {
            if (typeof action === "function") {
                action();
            } else {
                closeModalFunction();
            }
        };
    }


    function closeModalFunction() {
        if (!messageModal) return;

        messageModal.classList.remove("show");
        messageModal.setAttribute("aria-hidden", "true");
    }


    if (closeModal) {
        closeModal.addEventListener(
            "click",
            closeModalFunction
        );
    }


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

                if (passwordInput.type === "password") {

                    passwordInput.type = "text";
                    togglePassword.textContent = "🙈";

                } else {

                    passwordInput.type = "password";
                    togglePassword.textContent = "👁️";

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
            const box = emailInput.closest(".input-box");

            if (box) {
                box.classList.remove(
                    "input-error",
                    "input-success"
                );
            }
        }

        if (passwordInput) {
            const box = passwordInput.closest(".input-box");

            if (box) {
                box.classList.remove(
                    "input-error",
                    "input-success"
                );
            }
        }
    }


    /* =====================================
       VALIDATE EMAIL
    ===================================== */

    function validateEmail(value) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(value.trim());
    }


    /* =====================================
       VALIDATE PASSWORD
    ===================================== */

    function validatePassword(value) {

        if (value === "") {
            return {
                valid: false,
                message: "Please enter your password."
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
       LIVE ERROR CLEAR
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
                    box.classList.remove("input-error");
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
                    box.classList.remove("input-error");
                }

            }
        );
    }


    /* =====================================
       REAL SUPABASE LOGIN
    ===================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                clearErrors();

                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                /* EMAIL VALIDATION */

                if (!validateEmail(email)) {

                    if (emailError) {
                        emailError.textContent =
                            "Please enter a valid email address.";
                    }

                    const box =
                        emailInput.closest(".input-box");

                    if (box) {
                        box.classList.add("input-error");
                    }

                    emailInput.focus();

                    return;
                }


                /* PASSWORD VALIDATION */

                const passwordResult =
                    validatePassword(password);

                if (!passwordResult.valid) {

                    if (passwordError) {
                        passwordError.textContent =
                            passwordResult.message;
                    }

                    const box =
                        passwordInput.closest(".input-box");

                    if (box) {
                        box.classList.add("input-error");
                    }

                    passwordInput.focus();

                    return;
                }


                /* LOADING */

                if (loginButton) {
                    loginButton.disabled = true;
                    loginButton.classList.add("loading");
                }

                if (loginButtonText) {
                    loginButtonText.textContent =
                        "Signing in...";
                }

                if (loginLoader) {
                    loginLoader.style.display =
                        "inline-block";
                }


                try {

                    /* SUPABASE LOGIN */

                    const {
                        data,
                        error
                    } =
                        await supabaseClient.auth
                            .signInWithPassword({
                                email: email,
                                password: password
                            });


                    /* ERROR */

                    if (error) {
                        throw error;
                    }


                    /* SAVE LOCAL INFO */

                    localStorage.setItem(
                        "userLoggedIn",
                        "true"
                    );

                    localStorage.setItem(
                        "userIdentity",
                        email
                    );


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


                    /* SUCCESS */

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


                } catch (error) {

                    console.error(
                        "Supabase Login Error:",
                        error
                    );


                    let message =
                        "Login failed. Please check your email and password.";


                    if (error.message) {

                        if (
                            error.message
                                .toLowerCase()
                                .includes("email not confirmed")
                        ) {

                            message =
                                "Please verify your email before logging in.";

                        } else if (
                            error.message
                                .toLowerCase()
                                .includes("invalid login credentials")
                        ) {

                            message =
                                "Incorrect email or password.";

                        } else {

                            message =
                                error.message;
                        }
                    }


                    showModal(
                        "❌",
                        "Login Failed",
                        message,
                        "OK"
                    );


                } finally {

                    if (loginButton) {
                        loginButton.disabled = false;
                        loginButton.classList.remove("loading");
                    }

                    if (loginButtonText) {
                        loginButtonText.textContent =
                            "Login";
                    }

                    if (loginLoader) {
                        loginLoader.style.display =
                            "none";
                    }

                }

            }
        );
    }


    /* =====================================
       FORGOT PASSWORD
    ===================================== */

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            async function () {

                const email =
                    emailInput.value.trim();

                if (!validateEmail(email)) {

                    showModal(
                        "📧",
                        "Enter Email",
                        "Enter your registered email address first.",
                        "OK"
                    );

                    emailInput.focus();

                    return;
                }


                try {

                    const {
                        error
                    } =
                        await supabaseClient.auth
                            .resetPasswordForEmail(
                                email,
                                {
                                    redirectTo:
                                        window.location.origin +
                                        "/reset-password.html"
                                }
                            );


                    if (error) {
                        throw error;
                    }


                    showModal(
                        "📩",
                        "Reset Email Sent",
                        "Please check your email for the password reset link.",
                        "OK"
                    );


                } catch (error) {

                    showModal(
                        "❌",
                        "Reset Failed",
                        error.message ||
                        "Unable to send reset email.",
                        "OK"
                    );

                }

            }
        );
    }


    /* =====================================
       OTP
    ===================================== */

    if (otpLogin) {

        otpLogin.addEventListener(
            "click",
            function () {

                showModal(
                    "📲",
                    "OTP Login",
                    "Mobile OTP login will be connected after Email Login is working.",
                    "OK"
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

                window.location.href =
                    "register.html";

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
   INITIAL STATE
===================================== */

if (loginLoader) {
    loginLoader.style.display = "none";
}

if (loginButton) {
    loginButton.disabled = false;
}

if (togglePassword) {
    togglePassword.textContent = "👁️";
}


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


/* =====================================
   SUPABASE STATUS
===================================== */

if (typeof supabaseClient !== "undefined") {

    console.log(
        "TransportPro: Supabase client detected ✅"
    );

} else {

    console.error(
        "TransportPro: Supabase client not found ❌"
    );

}


/* =====================================
   LOGIN SYSTEM STATUS
===================================== */

console.log(
    "TransportPro Login System Ready ✅"
);


/* =====================================
   END OF LOGIN JAVASCRIPT
===================================== */
