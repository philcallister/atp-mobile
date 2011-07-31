var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

win.addEventListener('open', function()
{
	Ti.API.info('List: open...');
	loadList();
});

activity.onCreateOptionsMenu = function(e)
{
	Ti.API.info('Home: creating home menu...');
};

activity.onPrepareOptionsMenu = function(e)
{
	Ti.API.info('Home: preparing home menu...');
};

function addEntry (ticker, price, change, isUp, icon)
{
	var entryRow = Ti.UI.createTableViewRow({
		className: 'tableListRow',
		hasChild: false,
		height: 80,
		left: 0
	});
	var entryView = Ti.UI.createView();

	var entryViewLeft = Ti.UI.createView({
		left: 10
	});
	entryViewLeft.layout = 'horizontal';

	// icon
	var f1 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, icon);
	var entryImage1 = Titanium.UI.createImageView({
		left: 0,
		width:35,
		height:35,
		image:f1
	});
	entryViewLeft.add(entryImage1);

	// ticker
	var entryLabel1 = Ti.UI.createLabel({
		left: 20,
		title: ticker,
		font: {fontSize:32},
		color: '#999'
	});
	entryViewLeft.add(entryLabel1);
	entryView.add(entryViewLeft);

	var entryViewRight = Ti.UI.createView({
		left: 190
	});
	entryViewRight.layout = 'horizontal';

	// current price
	var entryLabel2 = Ti.UI.createLabel({
		left: 0,
		title: price,
		font: {fontSize:26},
		color: isUp ? '#00dd00' : '#dd0000'
	});
	entryViewRight.add(entryLabel2);

	// icon
	var f2 = (isUp) ? 
		Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, "images/up.png") :
		Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, "images/down.png")
	var entryImage2 = Titanium.UI.createImageView({
		left:5,
		height:25,
		width:19,
		image:f2
	});
	entryViewRight.add(entryImage2);

	// current change
	var entryLabel3 = Ti.UI.createLabel({
		left: 5,
		title: change,
		font: {fontSize:26},
		color: isUp ? '#00dd00' : '#dd0000'
	});
	entryViewRight.add(entryLabel3);
	entryView.add(entryViewRight);
	entryRow.add(entryView);

	return entryRow;
}

function loadList()
{
	listView.appendRow(addEntry('SQNS', '8.19', '0.36 (4.21%)', false, 'images/alert.png'));
	listView.appendRow(addEntry('DDD', '21.41', '1.14 (5.06%)', false, 'images/alert.png'));
	listView.appendRow(addEntry('UAN', '23.45', '0.19 (0.82%)', true, 'images/ok.png'));
	listView.appendRow(addEntry('TAOM', '14.71', '1.69 (10.30%)', false, 'images/ok.png'));
	listView.appendRow(addEntry('MNTA', '17.66', '0.08 (0.46%)', true, 'images/closed.png'));
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
});
actInd = Titanium.UI.createActivityIndicator({message:"Loading Positions..."});
actInd.hide();
listView.add(actInd);
win.add(listView);