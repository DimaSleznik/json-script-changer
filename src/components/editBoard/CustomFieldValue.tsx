import {Button, Grid, TextField, Typography} from '@mui/material';
import {FC} from 'react';
import {useDispatch} from 'react-redux';
import {
  updateModificationAction, updateModificationCondition
} from '../../model/slices/currantFieldModification.ts';
import {SyntheticEvent, useState} from 'react';


interface Props {
  isActionType: boolean
}

const CustomFieldValue: FC<Props> =  ({isActionType }) => {
  const dispatch = useDispatch()

  const [fieldValue, setFieldValue] = useState('');

  const handleAction = () => {
    if(isActionType) {
      dispatch(updateModificationAction({customValue: fieldValue}))
    } else  {
      dispatch(updateModificationCondition({value: fieldValue}))
    }
  }

  const handleInputChange = (e: SyntheticEvent) => {
    setFieldValue(e.currentTarget.value)
  }


  return (
    <Grid container justifyContent={'center'}>
      <Typography variant={'h5'} sx={{
        marginTop: '24px',
        padding: '4px 12px',
        borderRadius: '8px',
        background: '#333232'
      }}>
        Please write your value
        <Grid container sx={{marginTop: '8px'}}>
          <TextField
            value={fieldValue}
            required
            variant="filled"
            id="outlined-required"
            onChange={handleInputChange}
            defaultValue="Hello World"
          />
          <Button variant={'outlined'} onClick={handleAction} sx={{marginLeft: '8px'}}>
            Save
          </Button>
        </Grid>
      </Typography>
    </Grid>
  )
}

export default CustomFieldValue;