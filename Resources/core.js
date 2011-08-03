var isAndroid = false;
if (Titanium.Platform.name == 'android')
{
	isAndroid = true;
}
if (isAndroid)
{
	Ti.include("js/android/core.js");
}
else
{
	Ti.include("js/iphone/core.js");
}