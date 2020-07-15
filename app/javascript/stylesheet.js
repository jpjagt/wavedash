var stylesheet = document.createElement('style');
var addKeyFrames = null;
document.head.appendChild( stylesheet );

if (CSS && CSS.supports && CSS.supports('animation: name')) {
    // we can safely assume that the browser supports unprefixed version.
    addKeyFrames = function(name, frames){
        const pos = stylesheet.sheet.length;
        stylesheet.sheet.insertRule(
            "@keyframes " + name + "{" + frames + "}", pos);
    }
} else {
    addKeyFrames = function(name, frames){
        // Ugly and terrible, but users with this terrible of a browser
        // *cough* IE *cough* don't deserve a fast site
        var str = name + "{" + frames + "}",
            pos = stylesheet.sheet.length;
        stylesheet.sheet.insertRule("@-webkit-keyframes " + str, pos);
        stylesheet.sheet.insertRule("@keyframes " + str, pos+1);
    }
}

export {
  addKeyFrames
}
