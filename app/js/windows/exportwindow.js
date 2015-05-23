sofia.config = $.extend(sofia.config, {
    enableExportWindow: false
});


var ExportWindow = function(id, parent, data) {

    var
        container =
            $('<div class="export-window-container">'+
            '<div class="window-header export-window-header">'+
            '<div class="export-window-header-inner">'+
            '<input type="text" class="app-input text-nav" />' +
            '<div class="app-list text-list"></div>'+
            '</div>'+
            '</div>'+
            '<div class="eport-window-main">' +
            '</div>' +
            '</div>').appendTo(parent.node),


        header = container.find('.export-window-header'),
        main = container.find('.export-window-main'),
        navui = header.find('.text-nav'),
        textlistui = header.find('.text-list'),

    // objects
        textChooser = new TextChooser(container, textlistui, 'bible'),
        textNavigator = new TextNavigator(container, navui),
        scroller = new Scroller(main),

        exportui = container.find('.publish-button'),
        exportController = new ExportController(id, main, null, null);




    function size(width, height) {

        container.outerWidth(width);

        container
            .width(width)
            .height(height); // - header.outerHeight());
    }

    function getData() {

        var data = {
            params: {
                'win': 'export'
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

    if (sofia.config.enableExportWindow) {

        sofia.windowTypes.push( {
            className:'ExportWindow',
            param: 'export',
            paramKeys: {
                'textid': 't',
                'fragmentid':'v'
            },
            init: {
                'textid':sofia.config.newExportWindowTextId,
                'fragmentid':''
            }
        });
    }
});
