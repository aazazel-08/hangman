/* Video Games */
let games = [
	'The Legend of Zelda',
	'Super Mario Bros',
	'Minecraft',
	'Fortnite',
	'Grand Theft Auto V',
	'Red Dead Redemption',
	'Call of Duty',
	'The Witcher 3',
	'Cyberpunk 2077',
	'Dark Souls',
	'Halo',
	'Overwatch',
	'League of Legends',
	'Valorant',
	'Assassin\'s Creed',
	'Resident Evil',
	'God of War',
	'The Last of Us',
	'Final Fantasy VII',
	'Persona 5',
	'Street Fighter',
	'Tomb Raider',
	'Metal Gear Solid',
	'Pokemon Red',
	'Animal Crossing',
	'Half-Life 2',
	'DOOM',
	'Portal',
	'Mass Effect',
	'Bioshock',
	'Skyrim',
	'World of Warcraft',
	'Destiny',
	'Fallout 4',
	'Far Cry',
	'Battlefield',
	'Star Wars Battlefront',
	'Borderlands',
	'Control',
	'Monster Hunter',
	'Splatoon',
	'Elden Ring',
	'Dishonored',
	'Bloodborne',
	'Hades',
	'Among Us',
	'The Sims',
	'Spore',
	'Diablo III',
	'Sekiro',
	'Yakuza 0',
	'Crash Bandicoot',
	'Spyro the Dragon',
	'Kingdom Hearts',
	'Chrono Trigger',
	'Mortal Kombat',
	'Cuphead',
	'Terraria',
	'Hollow Knight',
	'Celeste',
	'Journey',
	'Pac-Man',
	'Galaga',
	'Tetris',
	'Sonic the Hedgehog',
	'Donkey Kong',
	'Mario Kart',
	'FIFA',
	'NBA 2K',
	'Street Fighter II',
	'Metal Slug',
	'StarCraft',
	'Warcraft III',
	'Counter-Strike',
	'Rocket League',
	'Guitar Hero',
	'Nier: Automata',
	'Undertale',
	'The Stanley Parable',
	'Detroit: Become Human',
	'No Man\'s Sky',
	'Cuphead',
	'Left 4 Dead',
	'PUBG',
	'Tekken',
	'Fortnite',
	'Persona 5',
	'Journey',
	'Inside',
	'Hotline Miami',
	'Stardew Valley',
	'Among Us',
	'Dead Cells',
	'Hades',
	'Valorant',
	'Forza Horizon',
	'Gran Turismo',
	'Dragon Quest',
	'Fire Emblem',
	'Monster Hunter World',
	'The Binding of Isaac',
	'Divinity Original Sin II',
	'Planescape: Torment',
	'League of Legends',
	'Counter-Strike: Global Offensive'
];

/* Game */

const youWon = "You Won!";
const youLost = "You Lost!";

function Game()
{
	let word = games[Math.floor(Math.random()*games.length)];
	word = word.toUpperCase();
	let guessedLetters = [];
	let maskedWord = "";
	let incorrectGuesses = 0;
	let possibleGuesses = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let won = false;
	let lost = false;
	const maxGuesses = 7;

	for ( let i = 0; i < word.length; i++ ) 
	{
		let space = " ";
		let nextCharacter = word.charAt(i) === space ? space : "_";
		maskedWord += nextCharacter;
	}

	let guessWord = function( guessedWord )
	{
		guessedWord = guessedWord.toUpperCase();
		if( guessedWord === word )
		{
			guessAllLetters();
		}
		else
		{
			handleIncorrectGuess();
		}
	}

	let guessAllLetters = function()
	{
		for ( let i = 0; i < word.length; i++ ) 
		{
			guess( word.charAt( i ) );
		}
	}

	let guess = function( letter ) 
	{
		letter = letter.toUpperCase();
		if( !guessedLetters.includes( letter ))
		{	
			guessedLetters.push(letter);
			possibleGuesses = possibleGuesses.replace(letter,"");
			if( word.includes( letter ) )
			{
				let matchingIndexes = [];
				for ( let i = 0; i < word.length; i++ ) 
				{
					if( word.charAt(i) === letter )
					{
						matchingIndexes.push( i );
					}
				}

				matchingIndexes.forEach( function(index) {
					maskedWord = replace( maskedWord, index, letter );
				});	

				if( !lost )
				{
					won = maskedWord === word;	
				}		
			}
			else
			{
				handleIncorrectGuess();
			}
		}
	}

	let handleIncorrectGuess = function()
	{
		incorrectGuesses++;
		lost = incorrectGuesses >= maxGuesses;
		if( lost )
		{
			guessAllLetters();
		}
	}

	return {
		"getWord": function(){ return word; },
		"getMaskedWord": function(){ return maskedWord; },
		"guess": guess,
		"getPossibleGuesses": function(){ return [... possibleGuesses]; },
		"getIncorrectGuesses": function(){ return incorrectGuesses; },
		"guessWord": guessWord,
		"isWon": function(){ return won; },
		"isLost": function(){ return lost; },
	};
}

function replace( value, index, replacement ) 
{
    return value.substr(0, index) + replacement + value.substr(index + replacement.length);
}

function listenForInput( game ) 
{
	let guessLetter = function( letter )
	{
		if( letter )
		{
			let gameStillGoing = !game.isWon() && 
								 !game.isLost();
			if( gameStillGoing )
			{
				game.guess( letter );
				render( game );
			}
		}
	};

	let handleClick = function( event )
	{
	    if (event.target.classList.contains('guess') )
	    {
	    	guessLetter( event.target.innerHTML );
	    }
	}

	let handleKeyPress = function( event )
	{
		let letter = null;
		const A = 65;
		const Z = 90;
		const ENTER = 13;
		let isLetter = event.keyCode >= A && event.keyCode <= Z;
		let guessWordButton = document.getElementById("guessWordButton");
		let newGameButton = document.getElementById("newGameButton");
		let guessBox = document.getElementById("guessBox");
		let gameOver = guessBox.value === youWon || guessBox.value === youLost;

		if( event.target.id !== "guessBox" && isLetter )
		{
			letter = String.fromCharCode( event.keyCode );
		}
		else if( event.keyCode === ENTER && gameOver )
		{
			newGameButton.click();
		}
		else if( event.keyCode === ENTER && guessBox.value !== "" )
		{
			guessWordButton.click();
		}
		guessLetter( letter );
	}

	document.addEventListener('keydown', handleKeyPress );
	document.body.addEventListener('click', handleClick );
}

function guessWord( game )
{
	let gameStillGoing = !game.isWon() && 
						 !game.isLost();
	let guessedWord = document.getElementById('guessBox').value;
	if( gameStillGoing )
	{
		game.guessWord( guessedWord );
		render( game );
	}
}

function render( game )
{
    document.getElementById("word").innerHTML = game.getMaskedWord(); 
	document.getElementById("guesses").innerHTML = "";
	game.getPossibleGuesses().forEach( function(guess) {
		let innerHtml = "<span class='guess'>" + guess + "</span>";
		document.getElementById("guesses").innerHTML += innerHtml;
	});
	document.getElementById("hangmanImage").src = "img/hangman" + game.getIncorrectGuesses() + ".png";

	let guessBox = document.getElementById('guessBox');
	if( game.isWon() )
	{
		guessBox.value = youWon;
		guessBox.classList = "win";
	}
	else if( game.isLost() )
	{
		guessBox.value = youLost;
		guessBox.classList = "loss";
	}
	else
	{
		guessBox.value = "";
		guessBox.classList = "";
	}
}

function newGame()
{
	history.go(0)
}

let game = new Game();
render( game );
listenForInput( game );
