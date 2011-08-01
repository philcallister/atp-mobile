var win = Titanium.UI.currentWindow;
var activity = Ti.Android.currentActivity;

var listView = null;

win.addEventListener('open', function()
{
	Ti.API.info('Home: open...');
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

function addEntry (ticker, price, max, up, isUp, change, changeUp, icon, iconWidth, scaleComment)
{
	var entryRow = Ti.UI.createTableViewRow({
		className: 'tableListRow',
		hasChild: false,
		//height: 80,
		height: 'auto',
		left: 0
	});
	var entryView = Ti.UI.createView();

	var entryViewLeft = Ti.UI.createView({
		left: 10,
		top:5
	});

	// icon alert
	var f1 = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, icon);
	var entryImage1 = Titanium.UI.createImageView({
		left: 0,
		top:0,
		width:iconWidth,
		height:45,
		image:f1
	});
	entryViewLeft.add(entryImage1);

	// ticker
	var entryLabel1 = Ti.UI.createLabel({
		left: 60,
		top:0,
		title: ticker,
		font: {fontSize:32},
		color: '#fff'
	});
	entryViewLeft.add(entryLabel1);

	// Max
	var entryMax = Ti.UI.createLabel({
		left:3,
		top: 43,
		title: 'Max',
		font: {fontSize:26},
		color: '#888'
	});
	entryViewLeft.add(entryMax);
	var entryMaxValue = Ti.UI.createLabel({
		left: 60,
		top: 43,
		title: max,
		font: {fontSize:26},
		color: '#5b7fd9'
	});
	entryViewLeft.add(entryMaxValue);

	// Max Upside
	var entryMaxUpside = Ti.UI.createLabel({
		left:3,
		top: 70,
		bottom: 2,
		title: 'Up',
		font: {fontSize:26},
		color: '#888'
	});
	entryViewLeft.add(entryMaxUpside);
	var entryMaxUpsideValue = Ti.UI.createLabel({
		left: 60,
		top: 70,
		bottom: 2,
		title: up,
		font: {fontSize:26},
		color: isUp ? '#00dd00' : '#dd0000'
	})
	entryViewLeft.add(entryMaxUpsideValue);
	entryView.add(entryViewLeft);

	var entryViewRight = Ti.UI.createView({
		left: 200,
		top: 10
	});
	entryViewRight.layout = 'horizontal';

	// current price
	var entryLabel2 = Ti.UI.createLabel({
		left: 0,
		title: price,
		font: {fontSize:26},
		color: changeUp ? '#00dd00' : '#dd0000'
	});
	entryViewRight.add(entryLabel2);

	// icon up/down
	var f2 = (changeUp) ? 
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
		color: changeUp ? '#00dd00' : '#dd0000'
	});
	entryViewRight.add(entryLabel3);
	entryView.add(entryViewRight);

	// scale-in
	var entryScale = Ti.UI.createLabel({
		left:200,
		top:53,
		title: scaleComment,
		font: {fontSize: 20},
		color: '#fff'
	});
	entryView.add(entryScale);

	entryRow.add(entryView);

	return entryRow;
}

function loadList()
{
	listView.appendRow(addEntry('SQNS', '8.19', '9.23', '28%', true, '0.36 (4.21%)', false, 'images/alert.png', 48, 'Scale in 7.45 - 7.51 range to buy 1/2 position'));
	listView.appendRow(addEntry('DDD', '21.41', '25.18', '39%', true, '1.14 (5.06%)', false, 'images/alert.png', 48, 'Max 19.45 to buy 1/2 position'));
	listView.appendRow(addEntry('UAN', '23.45', '27.69', '24%', true, '0.19 (0.82%)', true, 'images/ok.png', 45, 'Scale in 21.48 - 21.50 range to buy 1/3 position'));
	listView.appendRow(addEntry('TAOM', '14.71', '24.31', '60%', true, '1.69 (10.30%)', false, 'images/ok.png', 45, 'Max 9.60 to buy 1/2 position'));
	listView.appendRow(addEntry('MNTA', '17.66', '17.78', '-4%', false, '0.08 (0.46%)', true, 'images/closed.png', 45, 'Scale out 17.81 - 17.86 to sell final 1/3 position'));
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

actInd = Titanium.UI.createActivityIndicator({message:"Loading Positions..."});
actInd.hide();
listView.add(actInd);
win.add(listView);