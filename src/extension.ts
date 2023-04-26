// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { create } from 'domain';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { error } from 'console';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Create a new text document the represents a jotting
	let jottingHome: unknown = vscode.workspace.getConfiguration('jottings').get('jottingDir');

	let homeDir = os.homedir();
	let jottingDir = path.join(homeDir, jottingHome as string);
	// Check if jottings dir exists and if not create it
	fs.existsSync(jottingDir) || fs.mkdirSync(jottingDir);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jottings" is now active! Turbo');
		let createJotting = vscode.commands.registerCommand('jottings.createJotting', () => {
		//TODO: figure out a more creative way to name the file
		// Take in an arg and create a file with that as a prefix, then use that
		// prefix to organize the files later
		let newFileName = createNewFileName();
		let fullFileName = path.join(jottingDir, newFileName);
		let newUri = vscode.Uri.parse(fullFileName).with({scheme: 'untitled'});

		vscode.workspace.openTextDocument(newUri).then(doc => {
				vscode.window.showTextDocument(doc, vscode.ViewColumn.One, true);
			},
			(err) => {console.log(err);});
	});

	context.subscriptions.push(createJotting) ;
}

function createNewFileName(){
	// Create a new file name based on the current date and time
	let now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	let millisecond = now.getMilliseconds();
	let timestamp = `${year}-${month}-${day}-${hour}-${minute}-${second}-${millisecond}`;

	return "jotting-" + timestamp + ".md";
}


// This method is called when your extension is deactivated
export function deactivate() {}
