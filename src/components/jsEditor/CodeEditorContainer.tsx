import {useEffect, useRef} from 'react';

import Editor from '@monaco-editor/react';
import {Grid} from '@mui/material';
import {useSelector} from 'react-redux';
import {
  jsonDataSelector,
  selectedActionSelector,
  selectedConditionSelector,
  selectedFieldsSelector
} from '../../model/selectors.ts';
import {modAction, ModConditions} from '../../model/slices/currantFieldModification.ts';
import selectedFields from '../../model/slices/selectedFields.ts';

export default function CodeEditorContainer() {
  const editorRef = useRef(null);

  const selectedAction = useSelector(selectedActionSelector);
  const selectedFields = useSelector(selectedFieldsSelector);
  const selectedCondition = useSelector(selectedConditionSelector);
  const data  = useSelector(jsonDataSelector);

  const generateCode = () => {
    let code = '';
    if(selectedCondition.conditionType) {
       switch (selectedCondition.conditionType) {
         case ModConditions.IF_THIS_VALUE_EQUAL: {
           code += `if(${selectedFields[0]} === "${selectedCondition.value}") {\n`
         }
       }
      code += `\t`;
    }
    if(selectedAction.actionType) {
      switch (selectedAction.actionType) {
        case modAction.SWAP_FOR_CUSTOM: {
          code += `${selectedFields[0]} = "${selectedAction.customValue}";`
          break;
        }
        case modAction.SWAP_WITH_ANOTHER_FIELD: {
          code += `${selectedFields[0]} = ${selectedAction.fieldValue.key};`
          break;
        }
      }
    }
    if(selectedCondition.conditionType) {
      code = code + `\n}`
    }

    return code;
  }

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  useEffect(() => {
    console.log(generateCode());
  },[])

  return (
    <Grid item xs={12}>
    <Editor
      height="90vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      defaultValue={generateCode()}
      onMount={handleEditorDidMount}
    />
    </Grid>
  );
}
