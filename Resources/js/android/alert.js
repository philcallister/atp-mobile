var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

var http = Titanium.App.Properties.getString('http');

var alertView = null;
var actInd = null;
var positionId = win.positionId;

win.addEventListener('open', function()
{
	Ti.API.info('Alert: open...');
	loadAlerts();
});

activity.onCreateOptionsMenu = function(e)
{
	Ti.API.info('Alert: creating alert menu...');
};

activity.onPrepareOptionsMenu = function(e)
{
	Ti.API.info('Alert: preparing alert menu...');
};

function addAlertEntry (current, day, month, action, comment)
{
	var entryRow = Ti.UI.createTableViewRow({
		className: 'tableListRow',
		backgroundColor: current ? '#f2bd4b' : '#222', 
		hasChild: false,
		height: 'auto',
		left: 0
	});
	var entryView = Ti.UI.createView();

	// calendar
	var entryViewCalendar = Ti.UI.createView();

	var f1 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'images/calendar.png');
	var entryImage1 = Titanium.UI.createImageView({
		left: 5,
		width:98,
		height:100,
		image:f1
	});
	entryViewCalendar.add(entryImage1);
	var monthLabel = Ti.UI.createLabel({
		left: (month == 'JUL') ? 40 : 35,
		top:0,
		title: month,
		font: {fontSize: 18},
		color: '#fff'
	});
	entryViewCalendar.add(monthLabel);
	var dayLabel = Ti.UI.createLabel({
		left:30,
		top:30,
		title: day,
		font: {fontSize: 40, fontWeight: 'bold'},
		color: '#222'
	});
	entryViewCalendar.add(dayLabel);
	entryView.add(entryViewCalendar);

	var entryViewRight = Ti.UI.createView({
		left: 130,
		top: 5
	});
	entryViewRight.layout = 'vertical';

	// Action
	var entryAction = Ti.UI.createLabel({
		left: 0,
		title: action,
		font: {fontSize: 28},
		color: '#fff'
	});
	entryViewRight.add(entryAction);

	// Comment
	var entryAction = Ti.UI.createLabel({
		left: 0,
		top:10,
		title: comment,
		font: {fontSize: 20},
		color: current ? '#222' :'#aaa'
	});
	entryViewRight.add(entryAction);
	entryView.add(entryViewRight);

	entryRow.add(entryView);

	return entryRow;
}

function loadAlerts()
{
	Ti.API.info('Alert: loading alerts...');
	actInd.show();
	alertView.hide();
	var xhr = Titanium.Network.createHTTPClient({validatesSecureCertificate: false});
	xhr.onload = function()
	{
		Ti.API.info('Alert: alerts received...');
		var response = JSON.parse(this.responseText);
		for (var i = 0; i < response.length; i++)
		{
			var a = response[i].alert;
			alertView.appendRow(addAlertEntry((i == 0), a.day, a.month, a.action, a.comment));
		}
		actInd.hide();
		alertView.show();
	};
	xhr.onerror = function(e)
	{
		Ti.API.info('Loading Alerts...Error');
		Ti.API.error(e.error);
		actInd.hide();
		alert('Unable to load alerts.  Please check network connectivity.');
	};
	xhr.open("GET", http + "/positions/" + positionId + "/alerts.json");
	xhr.send();
}

///////////////////////////////////////////////////////////////////////////////
// Alert View
alertView = Titanium.UI.createTableView({
	className: 'tableListView',
	left: 0
});
alertView.addEventListener('click', function(e)
{
	var row = e.row;
});
actInd = Titanium.UI.createActivityIndicator({message:"Loading Alerts..."});
actInd.hide();
alertView.add(actInd);
win.add(alertView);