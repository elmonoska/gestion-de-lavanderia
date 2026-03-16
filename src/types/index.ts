// react forms
type ValidateRule = (value: string | number | undefined | null) => true | string ;
export type FormRules = {
  placeholder?: string;
  required?: string;
  pattern?: {
    value: RegExp;
    message:string;
  };
  max?: {
    value: number;
    message: string;
  },
  min?: {
    value: number;
    message: string;
  },
  maxLength?: {
    value: number;
    message: string;
  },
  validate?: Record<string, ValidateRule>
}
