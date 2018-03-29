window.onload = function() {
    main()
}

function scroll() {
    return {
        "top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
        "left": window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
    }
}

function headerTop() {
    var nav = document.querySelector('.jd_nav');
    var navTop = nav.offsetTop + nav.offsetHeight;
    var header = document.querySelector('.jd_header');
    window.onscroll = function() {
        var scr = scroll().top
        var per = scr / navTop;
        if (per > 1) {
            per = 1;
        }
        header.style.backgroundColor = 'rgba(201,21,21,' + per + ')';
    }
}

function countDown() {
    var sec = 8 * 60 * 60 + 1
    var lists = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
    var timer = setInterval(function() {
        if (sec < 0) {
            clearInterval(timer)
        }
        sec--
        var h = Math.floor(sec / 3600)
        var m = Math.floor(sec % 3600 / 60)
        var s = sec % 60
        lists[0].innerHTML = Math.floor(h / 10)
        lists[1].innerHTML = h % 10
        lists[3].innerHTML = Math.floor(m / 10)
        lists[4].innerHTML = m % 10
        lists[6].innerHTML = Math.floor(s / 10)
        lists[7].innerHTML = s % 10
    }, 1000)
}

function carousel() {
    var width = document.body.offsetWidth
    var ul = document.querySelector('.jd_carousel_images');
    var lists = document.querySelectorAll('.jd_carousel_croe li');
    var index = 1
    var timer = setInterval(function() {
        index++
        ul.style.transition = 'all .8s'
        ul.style.transform = 'translateX(' + index * width * -1 + 'px)'
    }, 1600)
    ul.addEventListener('webkitTransitionEnd', function(e) {
        if (index > 8) {
            index = 1
            ul.style.transition = ''
            ul.style.transform = 'translateX(' + index * width * -1 + 'px)'
        } else if (index < 1) {
            index = 8
            ul.style.transition = ''
            ul.style.transform = 'translateX(' + index * width * -1 + 'px)'
        }
        for (var i = 0; i < lists.length; i++) {
            lists[i].className = ""
        }
        lists[index - 1].className = "current"
    });
    var startX = 0
    var moveX = 0
    var recordX = 0
    ul.addEventListener('touchstart', function(e) {
        clearInterval(timer)
        ul.style.transition = ''
        startX = e.touches[0].clientX
    });
    ul.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX - startX
        ul.style.transform = 'translateX(' + (moveX + index * width * -1) + 'px)'
    });
    ul.addEventListener('touchend', function(e) {
        var maxRecord = width / 3
        if (Math.abs(moveX) > maxRecord) {
            if (moveX > 0) {
                index--
            } else {
                index++
            }
            ul.style.transition = 'all .8s'
            ul.style.transform = 'translateX(' + index * width * -1 + 'px)'
        } else {
            ul.style.transition = 'all .8s'
            ul.style.transform = 'translateX(' + index * width * -1 + 'px)'
        }
        timer = setInterval(function() {
            index++
            ul.style.transition = 'all .8s'
            ul.style.transform = 'translateX(' + index * width * -1 + 'px)'
        }, 1600)
    });
}

function main() {
    headerTop()
    countDown()
    carousel()
}
