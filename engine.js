// layout the directory for content
var maindir   = '../B-GLEN/resources/';
var LocnScene = '../B-GLEN/resources/data/scenario/';
var LocnImg   = '../B-GLEN/resources/data/images/';
var LocnImgBg   = '../B-GLEN/resources/data/images/bg/';
var LocnImgChar   = '../B-GLEN/resources/data/images/character/';

var LocnFonts = '../B-GLEN/resources/data/fonts/';
var LocnSound = '../B-GLEN/resources/data/sound/';
var LocnUI    = '../B-GLEN/resources/data/ui/';
var LocnVideo = '../B-GLEN/resources/data/video/';

var CurrentLine = 0;

var GetNow = new Date().getHours();

function bgTime(sceneImg) {
	if (GetNow >= 6 && GetNow < 9) {
		$('#base').css('background-image', 'url(' + LocnImgBg + sceneImg + '-riseset.jpg)');
		$('#base').css('background-size', 'cover');
	} else if (GetNow >= 9 && GetNow < 16) {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-day.jpg)');
		$('#base').css('background-size', 'cover');
	} else if (GetNow >= 16 && GetNow < 19) {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-riseset.jpg)');
		$('#base').css('background-size', 'cover');
	} else if (GetNow >= 19 && GetNow < 6) {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-night.jpg)');
		$('#base').css('background-size', 'cover');
	} else {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-day)');
		$('#base').css('background-size', 'cover');
	}
}

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
					}
				}
			}
		});
	});
}

var speed = 50;
var n = 0;

function NextPane(Scene, CurrentLine) {
	// When a user clicks it will initiate the Interpret scene function
	ManageLines(Scene, CurrentLine);
}

function ManageLines(Scene, LineNum) {
	// Get the scene from file
	arcScene = Scene + '.scene';

	// Action the scene line by line
	jQuery.get(LocnScene + Scene + ".scene", function (data) {
		// Remove lines
		data = data.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm,"");

		// Split up data into lines
		var lines = data.split("\n");

		if (typeof lines[LineNum] == 'undefined') {
			// HERE WE HAVE TO ENABLE ARC SWITCHING AND END OF GAME - E.G. ROLL CREDITS
		} else {
			if (lines[LineNum].charAt(0) == '[' ) {
				console.log('Auto Mode: ' + lines[LineNum]);

				CurrentLine = LineNum + 1;

				NextPane(Scene, CurrentLine);

				// NEXT WE HAVE TO SEND THIS OFF TO BE INTERPRETED
				ManageScene(lines[LineNum]);
			} else {
				console.log('Manual Mode: ' + lines[LineNum]);

				$('#msgbox-wrapper').text(lines[LineNum]);
				
				CurrentLine = LineNum + 1;

				// WE DON'T ADD NextPane() FUNCTION HERE BECAUSE WE WANT TO WAIT FOR A USER'S INPUT
			}
		}
	});
}

// Start a new game
function newGame() {
	ProcessScene('arc1');
}

// Continue game function - TO BE IMPLEMENTED
function contGame() {}

// Preferences UI - TO BE IMPLEMENTED
function openPrefs() {}

// Run credits - TO BE IMPLEMENTED
function openCredits() {}

// QUIT, JUST... BETTER
function doRageQuit() {}

// Process the title and menu screens
ProcessScene('title'); 

function ManageScene(Res) {
	if (Res.charAt(0) == '[') {
		// Clean the string of [, ] and split it up into meaningful values
		CleanStr = Res.replace('[', '');
		CleanStr = CleanStr.replace(']', '');
		Words = CleanStr.split(' ');

		// Split the word to get the topic and the value
		for (i = 1; i < Words.length; i++) {
			item = Words[i].split('=');
			val = item[1].replaceAll('"', '');
			// Switch the first word in brackets - BG, SCENE, CHAR, EFFECT ETC
			switch (Words[0]) {
				case 'bg':
					if (item[0] == 'img') {
						bgTime(item[1].replaceAll('"', ''));
					}
					break;
				case 'obj':
					console.log(item[0]);
					console.log(item[1]);
					$('#base').append('<div id="span-time"></div>');

					$('#span-time').load('clock.html');
					
					break;
				case 'msg':
					if (item[0] == 'char') {
						$('.msg-nameplate').text(item[1].replaceAll('"', ''));
					}
					break;
				case 'char':
					if (item[0] == 'layer') {
						$('#layer' + val).append('<div class="char-item" id="char' + val + '">');
						currLayer = val;
					} else if (item[0] == 'source') {
						$('#char' + currLayer).css('background-image', 'url(' + LocnImgChar + item[1].replaceAll('"', '') + ')');
						$('#char' + currLayer).css('background-size', 'cover');
					} else if (item[0] == 'left') {
						$('#char' + currLayer).css('left', val + 'vw');
					} else if (item[0] == 'bottom') {
						$('#char' + currLayer).css('bottom', val + 'vh');
					}
					break;
			}	
		}
	}
}
