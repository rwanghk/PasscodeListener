/**
 * To generate a listener with closure for passcode
 */ 
function generateListener(passcode, callback, delayMs = 1000) { 
    const arr = [...passcode];
    let i = 0;
    let lastKeydownTime = Number.MAX_SAFE_INTEGER - delayMs; //If time between keydown is beyond delay(ms) will reset the counter
    return function(evt) {
        let key = evt.key;
        if ((arr[i] === key) && (new Date().getTime() < (lastKeydownTime + delayMs))) { // Correct next code
            lastKeydownTime = new Date().getTime();
            if (++i === arr.length) {
                evt.passcode = passcode;
                evt.delay = delayMs;
                i = 0; 
                lastKeydownTime = Number.MAX_SAFE_INTEGER - delayMs;
                callback(evt);
            }
        } else if ((arr[0] === key)) { // Correct first code, start anew
            i = 1;
            lastKeydownTime = new Date().getTime();
        } else { // Incorrect code, reset
            i = 0; 
            lastKeydownTime = Number.MAX_SAFE_INTEGER - delayMs;
        }
    }
}

// Example usage
const listener = generateListener("lf2.net", () => alert("Passcode entered"));
document.addEventListener("keydown", listener, true);
// You should be able to see an alert when you type lf2.net when you type in the webpage
