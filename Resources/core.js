var isAndroid = false;
if (Titanium.Platform.name == 'android')
{
	isAndroid = true;
}
if (isAndroid)
{
	Ti.include("js/android/home.js");
}
else
{
	Ti.include("js/iphone/home.js");
}