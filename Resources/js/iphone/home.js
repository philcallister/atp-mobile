var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

activity.onCreateOptionsMenu = function(e)
{
	Ti.API.info('Home: creating home menu...');
}

activity.onPrepareOptionsMenu = function(e)
{
	Ti.API.info('Home: preparing home menu...');
}

///////////////////////////////////////////////////////////////////////////////
// Home Window