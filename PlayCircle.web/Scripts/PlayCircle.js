
(function () {
    try {
        var sync = true;

        //-- Styles start --//
        addTag('link', { rel: 'stylesheet', href: '/Content/Styles/bootstrap.min.css', type: 'text/css' });
        addTag('link', { rel: 'stylesheet', href: '/Content/Styles/font-awesome.min.css', type: 'text/css' });
        addTag('link', { rel: 'stylesheet', href: '/Content/Styles/AdminLTE.min.css', type: 'text/css' });
        addTag('link', { rel: 'stylesheet', href: '/Content/Styles/_all-skins.min.css', type: 'text/css' });
        //-- Styles start --//


        addTag('script', { src: '/Scripts/PlayCircle/angular.js' }, sync);
        addTag('script', { src: '/Scripts/playcircle/angular/angular-local-storage.min.js' }, sync);
        addTag('script', { src: '/Scripts/PlayCircle/App/MainApp.js' }, sync);      
        addTag('script', { src: '/Scripts/angular-ui-router.js' }, sync);
        addTag('script', { src: '/Scripts/ocLazyLoad.min.js' }, sync);
        addTag('script', { src: '/Scripts/jquery.min.js' }, sync);
        addTag('script', { src: '/Scripts/jquery-ui.min.js' }, sync);
        addTag('script', { src: '/Scripts/adminlte.min.js' }, sync);
        addTag('script', { src: '/Scripts/bootstrap.min.js' }, sync);

        addTag('script', { src: '/Scripts/PlayCircle/Services/AccountService.js' }, sync);

        //addTag('script', { src: 'angtest.js' }, sync);
    } catch (e) {
        alert(e.message);
    }
})();


function addTag(name, attributes, sync) {
    var el = document.createElement(name), attrName;
    for (attrName in attributes) {
        el.setAttribute(attrName, attributes[attrName]);
    }
    sync ? document.write(outerHTML(el)) : document.getElementsByTagName('head')[0].appendChild(el);
}

function outerHTML(node) {
    // if IE, Chrome take the internal method otherwise build one
    return node.outerHTML || (
        function (n) {
            var div = document.createElement('div'), h;
            div.appendChild(n);
            h = div.innerHTML;
            div = null;
            return h;
        })(node);
}