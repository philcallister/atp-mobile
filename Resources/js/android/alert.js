var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

var alertView = null;

win.addEventListener('open', function()
{
	Ti.API.info('Alert: open...');
	loadList();
});

activity.onCreateOptionsMenu = function(e)
{
	Ti.API.info('Alert: creating alert menu...');
};

activity.onPrepareOptionsMenu = function(e)
{
	Ti.API.info('Alert: preparing alert menu...');
};

function addEntry (current, day, month, action, comment)
{
	var entryRow = Ti.UI.createTableViewRow({
		className: 'tableListRow',
		backgroundColor: current ? '#edbd47' : '#222', 
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
		color: current ? '#666' : '#aaa'
	});
	entryViewRight.add(entryAction);
	entryView.add(entryViewRight);

	entryRow.add(entryView);

	return entryRow;
}

function loadList()
{
	alertView.appendRow(addEntry(true, '01', 'AUG', 'SELL remaining, place stop at 15.29', 'This one has run its course.  Advice to SELL before hits stop value.'));
	alertView.appendRow(addEntry(false, '28', 'JUL', 'First scale out range from 15.08 - 15.13, SELL 1st 1/2', 'Huge volumes again today. 15% gains from initial buys.  Advice to SELL at given range'));
	alertView.appendRow(addEntry(false, '26', 'JUL', '2nd scale in range from 12.44 - 12.48, BUY 2nd 1/2', 'Pullback on lower volumes today.  Advice to BUY at given range'));
	alertView.appendRow(addEntry(false, '23', 'JUL', 'Gap at 12.23, BUY 1/2 position to 13', 'Runs up 23% today on huge volume to 12.20.  Recent advice to BUY'));
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