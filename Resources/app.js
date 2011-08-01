// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#222');

// HTTP address
Titanium.App.Properties.setString('http', 'http://blah.blah.com');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

///////////////////////////////////////////////////////////////////////////////
// ATP Home tab and root window
var homeWin = Titanium.UI.createWindow({
    backgroundColor:'#222',
    url:'home.js'
});
var homeTab = Titanium.UI.createTab({  
    icon:'app://images/tab/nav-home.png',
    title:'Home',
    window:homeWin
});

///////////////////////////////////////////////////////////////////////////////
// Active tab
var activeWin = Titanium.UI.createWindow({  
    title:'Active',
    backgroundColor:'#222',
    url:'active.js'
});
var activeTab = Titanium.UI.createTab({  
    icon:'app://images/tab/nav-active.png',
    title:'Active',
    window:activeWin
});

///////////////////////////////////////////////////////////////////////////////
// Core tab
var coreWin = Titanium.UI.createWindow({  
    title:'Core',
    backgroundColor:'#222',
    url:'core.js'
});
var coreTab = Titanium.UI.createTab({  
    icon:'app://images/tab/nav-core.png',
    title:'Core',
    window:coreWin
});

///////////////////////////////////////////////////////////////////////////////
// Add tabs
tabGroup.addTab(homeTab);  
tabGroup.addTab(activeTab);  
tabGroup.addTab(coreTab);  
tabGroup.setActiveTab(0);
tabGroup.open();