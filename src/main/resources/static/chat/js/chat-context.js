app.directive('context', [
    function() {
        return {
            restrict: 'A',
            scope: '@&',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        var ul = $('#' + iAttrs.context),
                            last = null;

                        ul.css({
                            'display': 'none'
                        });
                        $(iElement).bind('contextmenu', function(event) {
                            event.preventDefault();
                            ul.css({
                                position: "fixed",
                                display: "block",
                                left: event.clientX + 'px',
                                top: event.clientY + 'px'
                            });
                            last = event.timeStamp;
                        });
                        //$(iElement).click(function(event) {
                        //  ul.css({
                        //    position: "fixed",
                        //    display: "block",
                        //    left: event.clientX + 'px',
                        //    top: event.clientY + 'px'
                        //  });
                        //  last = event.timeStamp;
                        //});

                        $(document).click(function(event) {
                            var target = $(event.target);
                            if (!target.is(".popover") && !target.parents().is(".popover")) {
                                if (last === event.timeStamp)
                                    return;
                                ul.css({
                                    'display': 'none'
                                });
                            }
                        });
                    }
                };
            }
        };
    }
]);