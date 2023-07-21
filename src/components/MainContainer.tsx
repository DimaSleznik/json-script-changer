import RenderJson from "./RenderJson.tsx";
import {useSelector} from 'react-redux'
import EditBoardContainer from "./editBoard/EditBoardContainer.tsx";
import {Grid} from "@mui/material";
import {
    jsonDataSelector,
    selectedActionSelector,
    selectedConditionSelector,
    selectedFieldsSelector
} from '../model/selectors.ts';
import {modAction} from '../model/slices/currantFieldModification.ts';
import CodeEditorContainer from './jsEditor/CodeEditorContainer.tsx';


const convertData = (data, parentKey = "") => {
    return Object.entries(data).map(([key, value]) => {
        const elementKey = parentKey !== "" ? `${parentKey}.${key}` : key;
        const elementType = typeof value;
        const elementValue = value;

        if (Array.isArray(value)) {
            const children = value.map((item, idx) => {
                const childKey = `${elementKey}[${idx}]`;
                let childType = typeof item;
                let childValue = item;

                if (Array.isArray(item) || typeof item === "object") {
                    childType = "array";
                    childValue = item;
                }

                return {
                    key: childKey,
                    type: childType,
                    fieldName: key,
                    value: childValue,
                    ...(Array.isArray(item) || typeof item === "object"
                        ? { children: convertData(item, childKey) }
                        : {}),
                };
            });

            return {
                key: elementKey,
                type: elementType,
                value: elementValue,
                fieldName: key,
                children,
            };
        } else if (typeof value === "object") {
            const children = convertData(value, elementKey);
            return {
                key: elementKey,
                type: elementType,
                fieldName: key,
                value: elementValue,
                children,
            };
        } else {
            return {
                key: elementKey,
                type: elementType,
                fieldName: key,
                value: elementValue,
            };
        }
    });
};

export default function MainContainer() {
    const data = useSelector(jsonDataSelector);
    const selectedFields = useSelector(selectedFieldsSelector);
    const selectedAction = useSelector(selectedActionSelector);
    const selectedCondition = useSelector(selectedConditionSelector);

    const isSwapAction = selectedAction.actionType === modAction.SWAP_WITH_ANOTHER_FIELD;
    const isAddActionAllowed = selectedFields?.length === 0 || (selectedFields?.length === 1 && isSwapAction)


    const convertedData = {
        key: "root",
        type: "object",
        children: convertData(data),
    };

    const isShowCode = (selectedCondition.conditionType && selectedCondition.value) || selectedCondition.skip;


    return (
        <Grid container sx={{padding: '10px', backgroundColor: '#1C1C1C'}} gap={'10px'}>
            <Grid item  xs sx={{
                borderRadius: '2px',
                padding: '24px',
                backgroundColor: isAddActionAllowed ?  '#242424' : '#333232',
                color: isAddActionAllowed ?  '#FCFCFC !important' : 'grey',
                cursor: isAddActionAllowed ? '' : 'not-allowed',
                border: '1px solid #303030',
                marginTop: '140px'
            }}>
            <RenderJson data={convertedData} elementKey={convertedData.key} isContainer/>
            </Grid>
            <Grid xs={6}>
            <EditBoardContainer/>
                </Grid>
            {isShowCode && <CodeEditorContainer/>}
        </Grid>
    )
}