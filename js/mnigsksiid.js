const board = document.getElementById('chessboard');
const message = document.getElementById('message');

/*
 * ============================================================
 * COLD CASE #102 — READ ME
 * ============================================================
 *
 * This puzzle is meant to be solved through the website.
 *
 * Please do NOT:
 *   - Inspect or modify the DOM to reveal the solution
 *   - Override JavaScript variables in the console
 *   - Trigger the success state manually
 *   - Skip the puzzle by changing the page location
 *
 * The code may be visible, but the investigation is the game.
 *
 * If you bypass the puzzle:
 *
 *              ...you were never meant to find this.
 *
 * ============================================================
 */

const encrypted = "JlgtVyVQN1M=";
const key = "coldcase";

function decrypt(encoded, key) {
    const data = atob(encoded);
    let result = "";

    for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(
            data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }

    return result;
}

const answer = decrypt(encrypted, key);

const themes = [
    answer.substring(0, 2),
    answer.substring(2, 4),
    answer.substring(4, 6),
    answer.substring(6, 8)
];

let selectedPositions = [];

for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        const letter = String.fromCharCode(65 + col);
        const position = letter + row;

        square.classList.add('square');

        square.addEventListener('click', () => {
            if (selectedPositions.length >= 4) {
                return;
            }

            if (selectedPositions.includes(position)) {
                return;
            }

            square.classList.add('selected');
            selectedPositions.push(position);

            if (selectedPositions.length === 4) {
                if (
                    selectedPositions.every(
                        (pos, index) => pos === themes[index]
                    )
                ) {
                    message.textContent =
                        '...this was never ment to be found.';

                    document.body.classList.add('correct');

                    setTimeout(() => {
                        window.location.href = "clatrincikveat.html";
                    }, 4500);
                } else {
                    message.textContent = '...YOU WERE NOT SUPPOSED TO TOUCH THAT.';
                    document.body.classList.add('wrong');

                    setTimeout(() => {
                        selectedPositions = [];

                        document.querySelectorAll('.square.selected')
                            .forEach(sq => {
                                sq.classList.remove('selected');
                            });

                        message.textContent = '';

                        document.body.classList.remove('wrong');
                    }, 1600);
                }
            } else {
                message.textContent = '';
            }
        });

        board.appendChild(square);
    }
}
