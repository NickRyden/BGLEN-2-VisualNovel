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
var CurrArc = '';

// set markers to enable a feature
var marker = 0;
var charselect = 0;
var Arc = '';
var ArcComplete = '';

var GetNow = new Date().getHours();
GetNow = GetNow.toString();

function bgTime(sceneImg) {
	if (GetNow >= '6' && GetNow <= '9') {
		$('#base').css('background-image', 'url(' + LocnImgBg + sceneImg + '-riseset.jpg)');
		$('#base').css('background-size', 'cover');
		//PostFX = '#f0b200 0%, #a31d7c 100%';
	} else if (GetNow >= '9' && GetNow <= '16') {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-day.jpg)');
		$('#base').css('background-size', 'cover');
		//PostFX = '#555555 0%, #555555 100%';
	} else if (GetNow >= '16' && GetNow <= '19') {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-riseset.jpg)');
		$('#base').css('background-size', 'cover');
		//PostFX = '#f0b200 0%, #a31d7c 100%';
	} else if (GetNow > '19' && GetNow < '6') {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-night.jpg)');
		$('#base').css('background-size', 'cover');
		//PostFX = '#001c4b 0%, #092657 100%';
	} else {
		$('#base').css('background-image', 'url(' + LocnImgBg + item[1].replaceAll('"', '') + '-day.jpg)');
		$('#base').css('background-size', 'cover');
	}

	//$('#PostFX').css('background', 'linear-gradient(320deg, ' + PostFX + ')');
	//$('#PostFX').css('opacity', '0.3');
}

// Parse JSON for css formatting
$.getJSON(maindir + "config.json", function( data ) {
	var title = data.title;
});

Arc= 'arcselect';

// set the height of the parent wrapper
$("#design-wrapper").height = screen.height;
$("#design-wrapper").width = screen.width;

function ProcessScene(Scene) {
	Arc = '';

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
							// Loads the menu 5s after the title screen has loaded
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

							CurrentLine = 1;

							if (Scene == '') {
								$(document).ready(NextPane(Arc, CurrentLine));

								$(document).on('click', function() {
									NextPane(Arc, CurrentLine);
								});

								$('#msgbox-wrapper').text('Press any button to continue');
								$('#msgbox-wrapper').html('Press any button to continue');
								$('#msgbox-wrapper').append('Press any button to continue');
							} else {
								$('#msgbox-wrapper').text('Press any button to continue');
								$('#msgbox-wrapper').html('Press any button to continue');
								$('#msgbox-wrapper').append('Press any button to continue');
								console.log('Press any button to continue');

								$(document).on('click', function() {
									NextPane(Arc, CurrentLine);
								});
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

function LoadArc(Scene) {
	CurrArc = Scene;
	$('#wall').load(LocnScene + Scene + '.scene');
	ProcessScene(Scene);
}

function NextPane(Scene, CurrentLine) {
	// When a user clicks it will initiate the Interpret scene function
	ManageLines(Scene, CurrentLine);
}

function ManageLines(Scene, LineNum) {
	Arc = Scene;
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
			Scene = '';
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
	ProcessScene('arcselect');
}

// Continue game function - TO BE IMPLEMENTED
function contGame() {}

// Preferences UI - TO BE IMPLEMENTED
function openPrefs() {
	$("#menu").hide();
	$('#wall').append('<div id="menu-navigate"></div>');
	$('#menu-navigate').load(LocnUI + 'prefs.html');
}

function openCredits() {
	$("#menu").hide();
	$('#wall').append('<div id="menu-navigate"></div>');
	$('#menu-navigate').load(LocnUI + 'credits.html');
}

function back2Menu() {
	$('#menu-navigate').remove();
	$("#menu").show();
}

// QUIT, JUST... BETTER
function doRageQuit() {
	setTimeout(function(){
		$('#wall').append('<div class="crack"></div>');
	}, 500);

	setTimeout(function(){
		$('#wall').append('<div class="blood"></div>');
	}, 1000);

	setTimeout(function(){
		window.close();
	}, 5000);
}

// Process the title and menu screens
ProcessScene('title');



function ManageScene(Res) {
	marker = 0;

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
			console.log(Words[0]);

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
					} else if (item[0] == 'scale') {
						$('#char' + currLayer).css('transform', 'scale(' + val + ')');
					}
					break;
				case 'charsel':
					if (item[0] == 'charlayer') {
						console.log('charselect = ' + charselect);
						console.log('marker  = ' + marker);

						if (charselect = 1) {
							if (marker = 1) {
								$('#charpic' + val).append('<div class="char-wrapper" onclick="LoadArc(\'arc' + val + '\'); Arc = \'' + val + '\';">');
							}
						} else {
							$('#layer' + val).append('<div class="char-pic" id="char' + val + '"></div>');
						}
						
						currLayer = val;
						//ArcScene = 4;
					} else if (item[0] == 'source') {
						$('#charpic' + currLayer).css('background-image', 'url(' + LocnImgChar + item[1].replaceAll('"', '') + ')');
						$('#charpic' + currLayer).css('background-size', 'cover');
					} else if (item[0] == 'left') {
						$('#charpic' + currLayer).css('left', val + 'vw');
					}
					break;
				case 'option':
					if (item[0] == 'result') {
						if (val == 'home|quit') {
							$('.msgbox-wrapper').text('');
							$('.msgbox-wrapper').append('<div class="btn-opt-res" id="optA" onclick="back2Menu();">Return to main menu</div>');
							$('.msgbox-wrapper').append('<div class="btn-opt-res" id="optB" onclick="window.close();">Quit Game</div>');
						} else {
							$('.msgbox-wrapper').text('Choose an option:');

							arcOptRes = val.split('|');
	
							$('.msgbox-wrapper').append('<div class="btn-opt-res" id="optA" onclick="LoadArc(\'' + arcOptRes[0] + '\');"></div>');
							$('.msgbox-wrapper').append('<div class="btn-opt-res" id="optB" onclick="LoadArc(\'' + arcOptRes[1] + '\');"></div>');
						}
					} else if (item[0] == 'pick') {
						arcOpt = val.split('|');

						$('#optA').text(arcOpt[0].replaceAll('/', ' '));
						$('#optB').text(arcOpt[1].replaceAll('/', ' '));
					}
					break;
				case 'sound':
					if (item[0] == 'param') {
						optAudio = val.split('|');

						optAudio[1] == 'loop' ? loop = 'loop' : loop = '';

						$('#wall').append('<audio autoplay ' + loop + '><source src="' + LocnSound + optAudio[0] + '" type="audio/mpeg"></audio>');
						$('audio').prop("volume", 0.1);
						$('audio').volume = 0.1;
					} else if (item[0] == 'options') {
						arcOpt = val.split('|');
						$('#optA').text(arcOpt[0].replaceAll('/', ' '));
						$('#optB').text(arcOpt[1].replaceAll('/', ' '));
					} else if (item[0] == 'stop') {
						$('audio').stop;
					}
					break;
				case 'ENDSCENE':
					charselect = 0;
					$("#wall").empty();
					break;
				case 'hidden':
					if (item[0] == 'source') {
						var randString = Math.random().toString(36).substring(7);

						$('#hidden-item').append('<img id="' + randString + '" class="hidden-item" onhover="console.log(\'ok\');" src="' + LocnImg + val + '" />');
						$('.hidden-item').css('opacity', '1');

						var imgSize= $('.hidden-item');
						$('#hidden-item').css('height', imgSize.height);
						$('#hidden-item').css('width', imgSize.width);

					} else if (item[0] == 'left') {
						$('.hidden-item').css('position', 'absolute');
						$('.hidden-item').css('left', 'absolute');
					} else if (item[0] == 'top') {
						$('.hidden-item').css('position', 'absolute');
						$('.hidden-item').css('top', 'absolute');
					}
					break;
				case 'checkpoint':
					var file_name = 'bglen_' + Arc + '_' + GetNow  + '.txt';

					if (item[0] == 'ArcComplete') {
						ArcComplete = ArcComplete + '|' + val;
					}

					var save_content = Arc + '\n' + CurrentLine + '\n' + ArcComplete;

					break;
				case 'reward':
					var NoteTitle = '';
					var NoteBody = '';

					if (item[0] == 'name') {
						NoteTitle = val;
					} else if (item[0] == 'text') {
						NoteBody = val;
					}

					//giveReward(NoteTitle, NoteBody);

					break;
				case 'SETMARKER':
					marker = 1;
					break;
				case 'DELMARKER':
					marker = 0;
					break;
			}	
		}
	}
}

$('#hidden-item').hover(function () {
	console.log('hovering');
});

$('.hidden-item').hover(function () {
	console.log('hovering');
});



//$('#hidden-item')
//    .bind('mouseover', function(event){
//        $(this).animate({'opacity':'0.7'}, 100);
//    })
//    .bind('mouseleave', function(e) {
//		$(this).animate({'opacity':'0'}, 100);
//});