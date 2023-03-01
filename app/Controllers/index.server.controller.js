exports.render = function (req, res) {
    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('index', {title: 'task manager'} );
    
};
