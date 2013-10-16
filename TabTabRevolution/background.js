var tabCount = -1;
var tabSayings = [
"Sir, I see that you have created another TAB, maybe you should reconsider!", 
"Sire, I know the internet holds great truths but maybe you should slow down! The TAB can wait till tomorrow!",
"THE CAKE IT A LIE! So is the TAB you just created!",
"SIR! THE KLINGONS ARE ATTACKING! CLOSING THE TAB MAYBE OUR ONLY HOPE!",
"This is a public service annoucement! ALERT!!!! There has been a large number of TABS spotted in your local area!!!",
"I will break it to pieces if you don't Sir! These Tabs must be stopped!",
"Help me Obi-Wan, You are my only hope! The Tabs must be stopped!",
"Mamma mia! Where'sa all these TABS comin afrom!",
"The last TAB is in captivity. The galaxy is at peace…",
"Welcome, Link... I am the Essence Of The Tabforce."];

var maxTab = 10;
var omgTab = 20;
var gender = "Sir";


function getMessage() {
   return tabSayings[Math.floor(Math.random() * tabSayings.length)];
}

function refreshTabCount() {
  chrome.browserAction.setBadgeText({"text": tabCount.toString()});
}

chrome.tabs.onCreated.addListener(function(tab) {
  tabCount += 1;
  refreshTabCount();

  if (tabCount >= omgTab)
  {
    var opt = {
      type: "basic",
      title: "NOOO!",
      message: "We are putting an end to this... this TAB WILL BE DESTROYED!",
      iconUrl: "icon.png"
    }

    chrome.notifications.create('', opt, function() {
        chrome.tabs.remove(tab.id, function() {});
    });
  }
  else if (tabCount >= maxTab)
  {
    var opt = {
      type: "basic",
      title: "NOOO!",
      message: getMessage(),
      iconUrl: "icon.png"
    }

    chrome.notifications.create('', opt, function(notId) {
      setTimeout(function() {
        chrome.notifications.clear(notId, function(){})
      }, 3000);
    });  
  }
  
})

chrome.tabs.onRemoved.addListener(function(tab) {
  tabCount -= 1;
  refreshTabCount();
})

chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.notifications.clear(notificationId, function(){});
});

chrome.tabs.query({}, function(tabs) {
  tabCount = tabs.length;
  refreshTabCount();

  var favorite = localStorage["gender_selection"];
  if (favorite) {
    gender = favorite;
  }

  var mt = localStorage["maxTab"];
  if (mt) {
    maxTab = mt;
  }

  var ot = localStorage["omgTab"];
  if (ot) {
    omgTab = ot;
  }

});