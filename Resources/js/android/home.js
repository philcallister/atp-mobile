var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

var listView = null;
var imageView = null;

win.addEventListener('open', function()
{
	Ti.API.info('Home: open...');
});

activity.onCreateOptionsMenu = function(e)
{
	Ti.API.info('Home: creating home menu...');
};

activity.onPrepareOptionsMenu = function(e)
{
	Ti.API.info('Home: preparing home menu...');
};

///////////////////////////////////////////////////////////////////////////////
// List View
var f1 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/logo-header.png');
var homeView = Ti.UI.createView();
homeView.layout = 'vertical';
var userLabel = Ti.UI.createLabel({
	left: 30,
	top:60,
	title: 'Username',
	font: {fontSize:32},
	color: '#aaa'
});
homeView.add(userLabel);
var userTextField = Ti.UI.createTextField({
	left: 30,
	right: 30,
	top: 5,
	font: {fontSize: 32},
	color: '#0d4a9d'
});
homeView.add(userTextField);
var passwordLabel = Ti.UI.createLabel({
	left: 30,
	top:20,
	title: 'Password',
	font: {fontSize:32},
	color: '#aaa'
});
homeView.add(passwordLabel);
var passwordTextField = Ti.UI.createTextField({
	left: 30,
	right: 30,
	top: 5,
	font: {fontSize: 32},
	color: '#0d4a9d',
	passwordMask:true
});
homeView.add(passwordTextField);
var loginButton = Titanium.UI.createButton({
	right: 30,
	top: 65,
	height: 75,
	width: 225,
	title:'Login',
	font: {fontSize:40, fontWeight: 'bold'},
	color: '#0d4a9d'
});
homeView.add(loginButton);

win.add(homeView);