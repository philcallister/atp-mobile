var isAndroid = false;
if (Titanium.Platform.name == 'android')
{
	isAndroid = true;
}
if (isAndroid)
{
	Ti.include("js/android/active.js");
}
else
{
	Ti.include("js/iphone/active.js");
}