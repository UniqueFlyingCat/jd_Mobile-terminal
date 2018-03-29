window.onload = function() {
    h_scroll('.main_left ul', '.main_left');
    h_scroll('.main_right_h ', '.main_right');

}
function fox_tap(element, callBack) {
    var startTime = 0;
    var isMove = false;
    var maxTime = 250;
    element.addEventListener('touchstart', function(e) {
        startTime = Date.now();
        isMove = false;
    })
    element.addEventListener('touchmove', function(e) {
        isMove = true;
    })
    element.addEventListener('touchend', function(e) {
        if (isMove == true) {
            return;
        }
        if ((Date.now() - startTime) > maxTime) {
            return;
        }
        callBack(e);
    })
}

function h_scroll(selector1, selector2) {
    var ul = document.querySelector(selector1);
    var ph = document.querySelector(selector2).offsetHeight;
    var hh = document.querySelector('.header').offsetHeight;
    var ulh = ul.offsetHeight
    var min_move = ph - ulh - hh
    var max_move = 0
    var startY = 0
    var moveY = 0
    var amY = 0
    var dm = 100
    ul.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    ul.addEventListener('touchmove', function(e) {
        moveY = e.touches[0].clientY - startY
        if ((moveY + amY) > max_move + dm) {
            moveY = 0
            amY = max_move + dm
        } else if ((moveY + amY) < min_move - dm) {
            moveY = 0
            amY = min_move - dm
        }
        ul.style.transition = ''
        ul.style.transform = 'translateY(' + (moveY + amY) + 'px)'
    });
    ul.addEventListener('touchend', function(e) {
        amY += moveY
        if (amY > max_move) {
            amY = max_move
        } else if (amY < min_move) {
            amY = min_move
        }
        ul.style.transition = 'all .6s'
        ul.style.transform = 'translateY(' + amY + 'px)'
    });
    var liHeight = document.querySelector('.main_left ul li').offsetHeight;
    var liArr = document.querySelectorAll('.main_left ul li');
    for (var i = 0; i < liArr.length; i++) {
        liArr[i].dataset['index'] = i;
    }
    fox_tap(ul, function(e) {
        for (var i = 0; i < liArr.length; i++) {
            liArr[i].className = '';
        }
        e.target.parentNode.className = 'current';
        var currentIndex = e.target.parentNode.dataset['index'];
        var moveDistance = currentIndex * liHeight * -1;
        if (moveDistance > max_move) {
            moveDistance = max_move;
        } else if (moveDistance < min_move) {
            moveDistance = min_move;
        }
        ul.style.transition = 'all .6s'
        ul.style.transform = 'translateY(' + amY + 'px)'
    })
}
