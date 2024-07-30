export interface FormField {
  id: string;
  label: string;
  name: string;
  helpText: string;
  type: string;
  options?: Option[];
}

interface Option {
  id: string;
  name: string;
  icon?: string;
}
