const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('commandInput');

let challengeMode = false; 
let currentCommand = ''; 
let completedChallenges = 0; 
const totalChallenges = 15;
let answeredCommands = []; // Lista para almacenar los comandos ya respondidos

const commandDescriptions = {
    pwd: '📌 This command prints the current working directory.',
    ls: '📂 List the contents of the current directory.',
    cd: '📁 Change the current directory to another one.',
    mkdir: '🛠️ Create a new directory.',
    touch: '📄 Create an empty file.',
    rm: '🗑️ Remove a file or directory.',
    mv: '🚚 Move or rename a file or directory.',
    head: '🔍 Display the first few lines of a file.',
    tail: '🔍 Display the last few lines of a file.',
    less: '📖 View a file one page at a time.',
    clear: '🧹 Clear the terminal screen.',
    tree: '🌳 Display the directory structure in a tree format.',
    file: '📋 Determine the type of a file.',
    cp: '📤 Copy files or directories.',
    nautilus: '🌐 Open the file explorer GUI.'
};

function getCurrentDirObj() {
    return currentDir.split('/').reduce((acc, curr) => acc[curr], fileSystem);
}

function appendToTerminal(text, className = '') {
    const output = document.createElement('div');
    output.textContent = text;
    if (className) output.className = className;
    terminal.appendChild(output);
    terminal.scrollTop = terminal.scrollHeight;
}

function setCommand(cmd) {
    commandInput.value = cmd;
    commandInput.focus();
}

function startChallenge() {
    // Filtrar comandos para que no se repitan
    const availableCommands = Object.keys(commandDescriptions).filter(command => !answeredCommands.includes(command));
    
    // Si ya no hay comandos disponibles, termina el juego
    if (availableCommands.length === 0) {
        appendToTerminal('🎉 Congratulations! You have completed all challenges! 🎉', 'success');
        challengeMode = false;
        return;
    }

    // Elegir un comando al azar de los disponibles
    currentCommand = availableCommands[Math.floor(Math.random() * availableCommands.length)];
    appendToTerminal(`🤔 Hint: ${commandDescriptions[currentCommand]}`);
}

const commands = {
    rules: () => {
        appendToTerminal('\n🎉 Welcome to the ShellShockEd Game! 🎉');
        appendToTerminal('✨ This game will inspire you to learn shell commands in a fun way!');
        appendToTerminal('🖋️ Type "start" to begin the challenge.');
        appendToTerminal('🧩 Solve the enigma by entering the correct shell command.');
        appendToTerminal('✅ Complete all challenges to win!');
        appendToTerminal('❌ Make a mistake? Don\'t worry, you can try again.\n');
    },
    start: () => {
        appendToTerminal('🚀 Starting the challenge mode...');
        challengeMode = true;
        completedChallenges = 0;
        answeredCommands = []; // Resetear los comandos respondidos
        startChallenge();
    },
    Clear: () => {
        terminal.innerHTML = 'Welcome to Bash Terminal Game!\n Type "rules" to see available commands.\n Type "Clear" to clean terminal';
    }
};

commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const commandLine = commandInput.value.trim();
        const [command, ...args] = commandLine.split(' ');

        appendToTerminal(`$ ${commandLine}`);

        if (challengeMode) {
            if (command === currentCommand) {
                appendToTerminal('✅ Correct! Moving to the next challenge.', 'success');
                answeredCommands.push(currentCommand); // Marcar como respondido
                completedChallenges++;

                // Iniciar el siguiente desafío
                if (completedChallenges < totalChallenges) {
                    startChallenge();
                } else {
                    appendToTerminal('🎉 Congratulations! You have completed all challenges! 🎉', 'success');
                    challengeMode = false;
                }
            } else {
                appendToTerminal('❌ Incorrect! Try again.', 'error');
            }
        } else if (commands[command]) {
            commands[command](args);
        } else if (command) {
            appendToTerminal(`Command not found: ${command}`, 'error');
        }

        commandInput.value = '';
        terminal.scrollTop = terminal.scrollHeight;
    }
});

commands.rules(); // Mostrar las reglas al cargar la página
