//this script will redirect to home page when user clicks on refresh or just loads this page

console.log("home redirect loaded");

if (window.jQuery) {
    // jQuery is loaded
} else {
    // jQuery is not loaded -- go home
    window.location.replace("../../index.html");
}
