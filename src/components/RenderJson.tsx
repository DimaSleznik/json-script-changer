import {useDispatch, useSelector} from 'react-redux';
import {
    EditStages,
    updateCurrentModification,
    updateModificationAction
} from '../model/slices/currantFieldModification.ts';
import {currentStageSelector, selectedFieldsSelector} from '../model/selectors.ts';
import {SyntheticEvent} from 'react';

const RenderJson = ({ data, elementKey }: any) => {
    const dispatch = useDispatch();

    const selectedFields = useSelector(selectedFieldsSelector);
    const currentStage = useSelector(currentStageSelector);

    const onNodeClick = (data, e: SyntheticEvent) => {
        if(elementKey !== 'root') {
            e.stopPropagation()
            e.preventDefault();
                if([EditStages.START, EditStages.CHOOSE_ACTION_FIELD].includes(currentStage)) {
                    dispatch(updateCurrentModification({selectedFields: [...selectedFields, data.key]}));
                    if (selectedFields?.length === 1) {
                        dispatch(updateModificationAction({fieldValue: data}))
                    }
                }
        }
    }

    if(data.children?.length) {
        if (data.value?.length) {
            return (
                <span className="indent">
                [{data.children.map((child) => (
                    <span key={child.key}>
                        <RenderJson data={child}  elementKey={child.key}/>
                    </span>
                ))}]
            </span>
            );
        } else if (data.type === 'object') {
            return (
                <div className="indent"  onClick={(e) => onNodeClick(data,e) }>
                    {data.children.map(child => (
                        <div key={child.key}>
                            <strong>{child.fieldName}:</strong><RenderJson data={child}  elementKey={child.key}/>
                        </div>
                    ))}
                </div>
            );
        }
    }
    else {
        return     (
            <span onClick={(e) => onNodeClick(data, e) }>
                {`  ${String(data.value)}`}
           </span> )
    }
};

export default RenderJson;