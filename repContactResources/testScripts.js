/**
 * Created by DanielBorland on 4/15/17.
 */

let imgAlert = function (url) {
    return new Promise(function(resolve, reject) {
        let img = new Image();
        img.onload = function() {
            resolve(url);
        }
        img.onerror = function() {
            reject(url);
        }
        img.src = url;
    })
}

imgAlert1("http://contactmyreps.com/repContactResources/images/flagBWBLUR2.jpg")
    .then(() => {
    console.log("i bought a necklace");
})
.then(() => {
    console.log("just to flex, bitch");
})
.catch(() => {
    console.log("no bitch");
});