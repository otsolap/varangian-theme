import TextField from '@/partials/form/TextField';
import EmailField from 'partials/form/EmailField';
import TextAreaField from '@/partials/form/TextAreaField';
import SelectField from '@/partials/form/SelectField';
import DateField from '@/partials/form/DateField';
import CheckboxField from '@/partials/form/CheckboxField';

const getInputField = ({ __component, ...rest  }, index, formRef, showLabels ) => {
  let Input;

  switch (__component) {
    case 'form-inputs.checkbox-field':
      Input = CheckboxField;
    break;
    case 'form-inputs.date-field':
      Input = DateField;
    break;
    case 'form-inputs.email-field':
      Input = EmailField;
    break;
    case 'form-inputs.select-field':
      Input = SelectField;
    break;
    case 'form-inputs.text-field':
      Input = TextField;
    break;
    case 'form-inputs.textarea-field':
      Input = TextAreaField;
    break;
    default:
      console.error(`No component found for: ${__component}`)
      break;
  }

  return Input ? (
    <Input 
        key={`index-${index}`} 
        formRef={formRef}
        showLabels={showLabels}
        {...rest} 
    />
   ) : null;
};

const Inputs = ({ inputs, formRef, showLabels }) => {
    return inputs.map((input, index) =>
      getInputField(input, index, formRef, showLabels)
    )
  }

export default Inputs;