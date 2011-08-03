Ti.include('app://js/android/util.js');

var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

var listView = null;

win.addEventListener('open', function()
{
	Ti.API.info('Active: open...');
	loadList();
});

activity.onCreateOptionsMenu = function(e)
{
	Ti.API.info('Active: creating active menu...');
};

activity.onPrepareOptionsMenu = function(e)
{
	Ti.API.info('Active: preparing active menu...');
};

function loadList()
{
	listView.hide();
	actInd.show();
	listView.appendRow(addEntry('HGSI', '18.90', '20.01', '8%', true, '0.63 (3.23%', false, 'images/alert.png', 48, 'Scale in 18.05 - 18.10 range to buy 1/2 position'));
	listView.appendRow(addEntry('VMW', '95.07', '99.35', '10%', true, '4.88 (4.88%)', false, 'images/ok.png', 45, 'Max 92 to buy 1/2 position'));
	listView.appendRow(addEntry('AUY', '13.48', '13.60', '5%', true, '0.39 (2.98%', true, 'images/ok.png', 45, 'Scale in 12.92 - 13.01 range to buy 1/3 position'));
	actInd.hide();
	listView.show();
}

///////////////////////////////////////////////////////////////////////////////
// List View
listView = Titanium.UI.createTableView({
	className: 'tableListView',
	left: 0
});
listView.addEventListener('click', function(e)
{
	var row = e.row;
	var alertWin = Titanium.UI.createWindow({
		url: 'app://js/android/alert.js',
		title:'Alerts',
		backgroundColor:"#222",
	});
	Titanium.UI.currentTab.open(alertWin,{animated:true});
});

actInd = Titanium.UI.createActivityIndicator({message:"Loading Core Positions..."});
actInd.hide();
listView.add(actInd);
win.add(listView);