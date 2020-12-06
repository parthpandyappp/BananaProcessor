var btn = document.querySelector("#btn-clk")
var txtInput = document.querySelector("#txt-input")
var txtOutput = document.querySelector("#output")
var txt = "We love when someone talk in our language, use the processor below to communicate with us at a greater ease."

//Text to speech//
let utter = new SpeechSynthesisUtterance();
utter.lang = 'en-US';
// utter.text = 'Hello World';
utter.volume = 0.5;

// event after text has been spoken
// utter.onend = function() {
// 	alert('Speech has finished');
// }



//End of Text to speech

var i = 0,
    speed = 50;
var serverURL = "https://api.funtranslations.com/translate/minion.json";

function getTranslated(text) {
    var res = serverURL + "?" + "text=" + text;
    return res;
}

function ErrorHandler(error) {
    console.log('Error with the server');
    alert('Check the server connection!');
}

function clkHandler() {
    // typeWriter();
    var inputText = txtInput.value;
    fetch(getTranslated(inputText)).
    then(response => response.json()).
    then(json => {
        var translatedText = json.contents.translated;
        txtOutput.innerText = translatedText;
        utter.text = translatedText
        // speak
        window.speechSynthesis.speak(utter);

    }).
    catch(ErrorHandler);

}

btn.addEventListener("click", clkHandler())

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("type").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}