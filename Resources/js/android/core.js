Ti.include('app://js/android/util.js');

var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

var http = Titanium.App.Properties.getString('http');

var listView = null;
var actInd = null;

win.addEventListener('open', function()
{
	Ti.API.info('Core: open...');
	loadCoreList();
});

activity.onCreateOptionsMenu = function(e)
{
	Ti.API.info('Core: creating core menu...');
};

activity.onPrepareOptionsMenu = function(e)
{
	Ti.API.info('Core: preparing core menu...');
};

function loadCoreList()
{
	Ti.API.info('Core: loading positions...');
	actInd.show();
	listView.hide();
	var xhr = Titanium.Network.createHTTPClient({validatesSecureCertificate: false});
	xhr.onload = function()
	{
		Ti.API.info('Core: positions received...');
		var response = JSON.parse(this.responseText);
		for (var i = 0; i < response.length; i++)
		{
			var p = response[i].position;
			listView.appendRow(addPositionEntry(p.id, p.ticker, p.price, p.max_price, p.max_upside, p.is_up_max, p.change + ' (' + p.percent + ')', p.is_up, 'images/alert.png', 48, p.recent_alert.action));
		}
		actInd.hide();
		listView.show();
	};
	xhr.onerror = function(e)
	{
		Ti.API.info('Loading Core Positions...Error');
		Ti.API.error(e.error);
		actInd.hide();
		alert('Unable to load core positions.  Please check network connectivity.');
	};
	xhr.open("GET", http + "/positions/core.json");
	xhr.send();
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
		positionId: row.positionId
	});
	Titanium.UI.currentTab.open(alertWin,{animated:true});
});

actInd = Titanium.UI.createActivityIndicator({message:"Loading Core Positions..."});
actInd.hide();
listView.add(actInd);
win.add(listView);