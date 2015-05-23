sofia.config = $.extend(sofia.config, {
    enablePublishWindow: false
});


var PublishWindow = function(id, parent, data) {

    var
        container =
            $('<div class="publish-window-container">'+
            '<div class="window-header publish-window-header">'+
            '<div class="publish-window-header-inner">'+
            '<input type="text" class="app-input text-nav" />' +
            '<div class="app-list text-list"></div>'+
            '</div>'+
            '</div>'+
            '<div class="eport-window-main">' +
            '</div>' +
            '</div>').appendTo(parent.node),


        header = container.find('.publish-window-header'),
        main = container.find('.publish-window-main'),
        navui = header.find('.text-nav'),
        textlistui = header.find('.text-list'),

    // objects
        textChooser = new TextChooser(container, textlistui, 'bible'),
        textNavigator = new TextNavigator(container, navui),
        scroller = new Scroller(main),

        publishui = container.find('.publish-button'),
        publishController = new PublishController(id, main, null, null);




    function size(width, height) {

        container.outerWidth(width);

        container
            .width(width)
            .height(height); // - header.outerHeight());
    }

    function getData() {

        var data = {
            params: {
                'win': 'publish'
            }
        };

        return data
    }

    function close() {

        ext.clearListeners();

        removeHighlights();
    }


    var ext = {
        size: size,
        getData: getData,
        sendMessage: function() {},
        close: close
    };
    ext = $.extend(true, ext, EventEmitter);


    ext.on('message', function(e) {
        if (e.data.messagetype == 'textload') {
        }
    });

    return ext;
};

sofia.initMethods.push(function() {

    if (sofia.config.enablePublishWindow) {

        sofia.windowTypes.push( {
            className:'PublishWindow',
            param: 'publish',
            paramKeys: {
                'textid': 't',
                'fragmentid':'v'
            },
            init: {
                'textid':sofia.config.newPublishWindowTextId,
                'fragmentid':''
            }
        });
    }
});
