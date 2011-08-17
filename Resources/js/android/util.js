function addPositionEntry (positionId, ticker, price, max, up, isUp, change, changeUp, icon, iconWidth, scaleComment)
{
	var entryRow = Ti.UI.createTableViewRow({
		className: 'tableListRow',
		hasChild: false,
		//height: 80,
		height: 'auto',
		left: 0,
		positionId: positionId
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
		top: 50,
		title: 'Max',
		font: {fontSize:26},
		color: '#888'
	});
	entryViewLeft.add(entryMax);
	var entryMaxValue = Ti.UI.createLabel({
		left: 60,
		top: 50,
		title: max,
		font: {fontSize:26},
		color: '#5b7fd9'
	});
	entryViewLeft.add(entryMaxValue);

	// Max Upside
	var entryMaxUpside = Ti.UI.createLabel({
		left:3,
		top: 80,
		bottom: 2,
		title: 'Up',
		font: {fontSize:26},
		color: '#888'
	});
	entryViewLeft.add(entryMaxUpside);
	var entryMaxUpsideValue = Ti.UI.createLabel({
		left: 60,
		top: 80,
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
		top:58,
		title: scaleComment,
		font: {fontSize: 20},
		color: '#fff'
	});
	entryView.add(entryScale);

	entryRow.add(entryView);

	return entryRow;
}