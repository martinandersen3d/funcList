'use strict';

import { workspace, languages, window, commands, ExtensionContext, Disposable } from 'vscode';
import ContentProvider, { encodeLocation } from './provider';

export function activate(context: ExtensionContext) 
{
	const provider = new ContentProvider();

	const providerRegistrations = Disposable.from(
		workspace.registerTextDocumentContentProvider(ContentProvider.scheme, provider)
	);
    
	const commandRegistration = commands.registerTextEditorCommand('editor.printFunctions', editor => {
        return provider.newDocument(editor);
	});

    let contextMenuSwitchSort = commands.registerCommand('contextmenu.switchSort', () => {
        provider.updateDocument(true);
    });
    
    let contextMenuRefresh = commands.registerCommand('contextmenu.refresh', () => {
        provider.updateDocument(false);
    });
        
	context.subscriptions.push(
		provider,
        commandRegistration,
        contextMenuSwitchSort,
        contextMenuRefresh,
        providerRegistrations
    );
}

export function deactivate() 
{    
}
