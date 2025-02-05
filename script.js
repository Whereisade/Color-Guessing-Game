const COLORS = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#008000',
    '#000080',
    '#008080',
    '#800000',
    '#808000'
];

class ColorGuessingGame {
    constructor() {
        this.colorBox = document.querySelector('[data-testid="colorBox"]');
        this.colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
        this.gameInstructions = document.querySelector('[data-testid="gameInstructions"]');
        this.gameStatus = document.querySelector('[data-testid="gameStatus"]');
        this.scoreElement = document.querySelector('[data-testid="score"]');
        this.newGameButton = document.querySelector('[data-testid="newGameButton"]');

        this.score = 0;
        this.targetColor = '';

        this.init();
    }

    init() {
        this.newGameButton.addEventListener('click', () => this.startNewGame(true));
        this.colorOptions.forEach(option => {
            option.addEventListener('click', (e) => this.checkGuess(e.target));
        });

        this.startNewGame();
    }

    startNewGame(resetScore = false) {
        if (resetScore) {
            this.score = 0;
            this.scoreElement.textContent = this.score;
        }

        this.gameStatus.textContent = '';
        this.gameInstructions.textContent = 'Guess the correct color!';
        
        this.colorOptions.forEach(option => {
            option.classList.remove('correct-guess', 'wrong-guess');
        });

        this.generateTargetColor();
        this.generateColorOptions();
    }

    generateTargetColor() {
        this.targetColor = this.getRandomColor();
        this.colorBox.style.backgroundColor = this.targetColor;
    }

    generateColorOptions() {
        let availableColors = COLORS.filter(color => color !== this.targetColor);

        availableColors.sort(() => 0.5 - Math.random());

        const colorOptions = availableColors.slice(0, 5);

        colorOptions.push(this.targetColor);

        colorOptions.sort(() => 0.5 - Math.random());

        this.colorOptions.forEach((option, index) => {
            option.style.backgroundColor = colorOptions[index];
        });
    }

    getRandomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    checkGuess(selectedOption) {
        const selectedColor = selectedOption.style.backgroundColor;
        const targetColorRGB = this.colorBox.style.backgroundColor;

        if (this.colorsMatch(selectedColor, targetColorRGB)) {
            this.handleCorrectGuess(selectedOption);
        } else {
            this.handleWrongGuess(selectedOption);
        }
    }

    colorsMatch(color1, color2) {
        const rgbColor1 = this.convertToRGB(color1);
        const rgbColor2 = this.convertToRGB(color2);
        return rgbColor1 === rgbColor2;
    }

    convertToRGB(color) {
        const tempElement = document.createElement('div');
        tempElement.style.color = color;
        document.body.appendChild(tempElement);
        const rgbColor = window.getComputedStyle(tempElement).color;
        document.body.removeChild(tempElement);
        return rgbColor;
    }

    handleCorrectGuess(selectedOption) {
        this.score++;
        this.scoreElement.textContent = this.score;
        
        this.gameStatus.textContent = 'Correct! Nice job!';
        this.gameInstructions.textContent = 'You got it right!';
        
        selectedOption.classList.add('correct-guess');
        
        setTimeout(() => this.startNewGame(), 1500);
    }

    handleWrongGuess(selectedOption) {
        this.gameStatus.textContent = 'Wrong guess. Try again!';
        
        selectedOption.classList.add('wrong-guess');
        
        setTimeout(() => {
            selectedOption.classList.remove('wrong-guess');
        }, 500);
    }
}

new ColorGuessingGame();