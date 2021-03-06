/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import React, { Component } from 'react';

import Tree from '../../ckeditor5-inspector/src/components/tree/tree';
import {
	getEditorModelRanges,
	getEditorModelMarkers,
	getEditorModelTreeDefinition
} from '../../ckeditor5-inspector/src/model/data/utils';
import {
	getEditorViewRanges,
	getEditorViewTreeDefinition
} from '../../ckeditor5-inspector/src/view/data/utils';

import '../../ckeditor5-inspector/src/ui.css';
import './ui.css';

export default class MiniInspectorUI extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			...getTreeDefinitions( this.props.editor )
		};
	}
	render() {
		return <div className="ck-inspector ck-mini-inspector">
			<Tree
				definition={this.state.modelTreeDefinition}
				textDirection="ltr"
				onClick={() => {}}
				showCompactText={false}
				activeNode={null}
			/>
			<Tree
				definition={this.state.viewTreeDefinition}
				textDirection="ltr"
				onClick={() => {}}
				showCompactText="true"
				showElementTypes={false}
				activeNode={null}
			/>
		</div>;
	}

	componentDidMount() {
		this.props.editor.model.document.on( 'change', () => {
			this.setState( {
				...getTreeDefinitions( this.props.editor )
			} );
		}, { priority: 'lowest' } );
	}
}

function getTreeDefinitions( editor ) {
	const currentRootName = 'main';
	const modelRanges = getEditorModelRanges( editor, currentRootName );
	const modelMarkers = getEditorModelMarkers( editor, currentRootName );
	const modelTreeDefinition = getEditorModelTreeDefinition( {
		currentEditor: editor,
		currentRootName,
		ranges: modelRanges,
		markers: modelMarkers
	} );

	const viewRanges = getEditorViewRanges( editor, currentRootName );
	const viewTreeDefinition = getEditorViewTreeDefinition( {
		currentEditor: editor,
		currentRootName,
		ranges: viewRanges
	} );

	return {
		modelTreeDefinition,
		viewTreeDefinition
	};
}
