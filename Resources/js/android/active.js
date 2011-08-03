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
	listView.appendRow(addEntry('SQNS', '8.19', '9.23', '28%', true, '0.36 (4.21%)', false, 'images/alert.png', 48, 'Scale in 7.45 - 7.51 range to buy 1/2 position'));
	listView.appendRow(addEntry('DDD', '21.41', '25.18', '39%', true, '1.14 (5.06%)', false, 'images/alert.png', 48, 'Max 19.45 to buy 1/2 position'));
	listView.appendRow(addEntry('UAN', '23.45', '27.69', '24%', true, '0.19 (0.82%)', true, 'images/ok.png', 45, 'Scale in 21.48 - 21.50 range to buy 1/3 position'));
	listView.appendRow(addEntry('TAOM', '14.71', '24.31', '60%', true, '1.69 (10.30%)', false, 'images/ok.png', 45, 'Max 9.60 to buy 1/2 position'));
	listView.appendRow(addEntry('MNTA', '17.66', '17.78', '-4%', false, '0.08 (0.46%)', true, 'images/closed.png', 45, 'Scale out 17.81 - 17.86 to sell final 1/3 position'));
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

actInd = Titanium.UI.createActivityIndicator({message:"Loading Active Positions..."});
actInd.hide();
listView.add(actInd);
win.add(listView);