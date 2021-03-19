// layout the directory for content
var maindir   = '../B-GLEN/resources/';
var LocnScene = '../B-GLEN/resources/data/scenario/';
var LocnImg   = '../B-GLEN/resources/data/images/';
var LocnFonts = '../B-GLEN/resources/data/fonts/';
var LocnSound = '../B-GLEN/resources/data/sound/';
var LocnUI    = '../B-GLEN/resources/data/ui/';
var LocnVideo = '../B-GLEN/resources/data/video/';

// Parse JSON for css formatting
$.getJSON(maindir + "config.json", function( data ) {
	var title = data.title;
});

// set the height of the parent wrapper
$("#design-wrapper").height = screen.height;
$("#design-wrapper").width = screen.width;

function ProcessScene(Scene) {
	// Parse in the scene file - name is static.
	jQuery.get(LocnScene + Scene + ".scene", function (data) {
		var lines = data.split("\n");

		$.each(lines, function (key, val) {
			if (val.charAt(0) == '[') {
				// Clean the string of [, ] and split it up into meaningful values
				CleanStr = val.replace('[', '');
				CleanStr = CleanStr.replace(']', '');
				Words = CleanStr.split(' ');

				for (i = 1; i < Words.length; i++) {
					item = Words[i].split('=');
					
					// This is where all the action and scheduling happens
					switch (Words[0]) {
						case 'title':
							if (item[0] == 'source') {
								// Fade the title screen in and out
								$('#wall').append('<div id="title">' + Words[i] + '</div>');
								$('#title').load(LocnUI + item[1].replaceAll('"', ''));
								$("#title").hide().fadeIn(1000);
								$('#title').delay(5000);
								$('#title').fadeOut(1000);
							} else if (item[0] == 'transition') {
								// Currently just a placeholder for more functionality down the line
								$('#wall').append('<div>Im a banana</div><br />');
							}
							break;
						case 'menu':
							// Lods the menu 5s after the title screen has loaded
							if (item[0] == 'source') {
								$('#wall').append('<div id="menu">' + Words[1] + '</div>');
								$("#menu").hide();
								// Title FadeIn Time + Delay Time + FadeOut Time
								$('#menu').delay(7000);
								$("#menu").fadeIn(500);
								$('#menu').load(LocnUI + item[i].replaceAll('"', ''));
								
								$('#menu').load(LocnUI + item[i].replaceAll('"', ''));
							}
							break;
						// Room for more functionality down the line
						case 'scene':
							if (item[0] == 'source') {
								$("#menu").hide();
								$("#title").hide();
								$('#wall').load(LocnUI + item[1].replaceAll('"', ''));
							}
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
						case 'placeholder1':
							break;
					}
				}
			}
		});
	});
}






function newGame() {
	ProcessScene('arc1');
}


function contGame() {}


function openPrefs() {}


function openCredits() {}


function doRageQuit() {}






// if first char is { then...
	//break words into arrays
	// get things either side of an euqls sign and strip quotes
//else
	//is spoken text,
	// detect [ in string
	// on error where [ does not exists throw exception
	// set up yes no options
	// fork options etc
// end if



ProcessScene('title');




















