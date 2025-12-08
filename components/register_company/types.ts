import { CompanyFormData, PersonFormData } from "@/lib/entities/company";

export type FormData = Partial<CompanyFormData & PersonFormData>;

export type DocumentType = "pasaporte" | "ine" | "licencia" | "cartilla_militar";

export type AddressType = "direccion_fiscal" | "direccion_operativa";

export interface RegistrationFormProps {
    user: { id?: number } | null;
    setShowRegistration: (show: boolean) => void;
    onSuccess?: () => void;
}

export interface StepNavigationProps {
    onBack: () => void;
    onNext: () => void;
    isFirst?: boolean;
    isLast?: boolean;
    isLoading?: boolean;
}

export interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    required?: boolean;
}

export interface TextFieldProps extends FormFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "email" | "tel" | "number" | "date" | "password";
    placeholder?: string;
}

export interface FileFieldProps extends FormFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName?: string;
}

export interface SelectFieldProps extends FormFieldProps {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    options: { value: string; label: string }[];
}
