var currentSlideId = 0;

var keyhandle = function(e){
    e = e||window.event;
    var k = e.keyCode || e.which;
    //alert(k);
    if(k ==33){
        prevSlide();
        return false;
    }
    if(k==34){
        nextSlide();
        return false;
    }
}
document.onkeydown = keyhandle;
function keyPressHandler(e){
    alert(e.keyCode);
}

function nextSlide() {
    currentSlideId = currentSlideId + 1;
    var doc = document.getElementById('slide-'+(currentSlideId));
    if(doc != null){
        doc.scrollIntoView();
    } else {
    currentSlideId = currentSlideId - 1;
    }
}

function prevSlide() {
    if(currentSlideId>0){
        currentSlideId = currentSlideId -1;
    }
    document.getElementById('slide-'+(currentSlideId)).scrollIntoView();
}


