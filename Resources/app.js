// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#222222');

// HTTP address
Titanium.App.Properties.setString('http', 'http://blah.blah.com');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

///////////////////////////////////////////////////////////////////////////////
// ATP Home tab and root window
var homeWin = Titanium.UI.createWindow({
    backgroundColor:'#222222',
    url:'home.js'
});
var homeTab = Titanium.UI.createTab({  
    icon:'app://images/tab/nav-home.png',
    title:'Home',
    window:homeWin
});

///////////////////////////////////////////////////////////////////////////////
// Position tab
var positionWin = Titanium.UI.createWindow({  
    title:'Positions',
    backgroundColor:'#222222',
    url:'positions.js'
});
var positionTab = Titanium.UI.createTab({  
    icon:'app://images/tab/nav-positions.png',
    title:'Positions',
    window:positionWin
});

///////////////////////////////////////////////////////////////////////////////
// Add tabs
tabGroup.addTab(homeTab);  
tabGroup.addTab(positionTab);  
tabGroup.setActiveTab(0);
tabGroup.open();