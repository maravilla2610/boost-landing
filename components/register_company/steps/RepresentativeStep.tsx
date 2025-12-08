"use client";

import React from "react";
import { TextField, DateField, FileField, SelectField } from "../components/FormFields";
import { StepNavigation } from "../components/StepNavigation";
import { FormData, DocumentType } from "../types";
import { DOCUMENT_TYPES } from "../constants";

interface RepresentativeStepProps {
    formData: FormData;
    errors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDocumentTypeChange: (value: DocumentType) => void;
    onBack: () => void;
    onNext: () => void;
}

export function RepresentativeStep({
    formData,
    errors,
    onChange,
    onFileChange,
    onDocumentTypeChange,
    onBack,
    onNext,
}: RepresentativeStepProps) {
    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                    id="nombre_representante_legal"
                    label="Nombre(s)"
                    value={formData.nombre_representante_legal || ""}
                    onChange={onChange}
                    error={errors.nombre_representante_legal}
                    required
                />
                <TextField
                    id="apellido_representante_legal"
                    label="Apellidos"
                    value={formData.apellido_representante_legal || ""}
                    onChange={onChange}
                    error={errors.apellido_representante_legal}
                    required
                />
                <DateField
                    id="fecha_de_nacimiento"
                    label="Fecha de Nacimiento"
                    value={formData.fecha_de_nacimiento}
                    onChange={onChange}
                    error={errors.fecha_de_nacimiento}
                    required
                />
                <SelectField
                    id="tipo_documento"
                    label="Tipo de Documento"
                    value={formData.tipo_documento || ""}
                    onValueChange={(value) => onDocumentTypeChange(value as DocumentType)}
                    error={errors.tipo_documento}
                    options={[...DOCUMENT_TYPES]}
                    required
                />
                <FileField
                    id="documento"
                    label="Legal Document"
                    onChange={onFileChange}
                    error={errors.documento}
                    fileName={(formData.documento as File)?.name}
                    required
                />
                <TextField
                    id="numero_documento"
                    label="Número de Documento"
                    type="number"
                    value={formData.numero_documento?.toString() || ""}
                    onChange={onChange}
                    error={errors.numero_documento}
                    required
                />
                <TextField
                    id="curp"
                    label="CURP"
                    value={formData.curp || ""}
                    onChange={onChange}
                    error={errors.curp}
                />
                <TextField
                    id="rfc"
                    label="RFC"
                    value={formData.rfc || ""}
                    onChange={onChange}
                    error={errors.rfc}
                />
                <TextField
                    id="nacionalidad"
                    label="Nacionalidad"
                    value={formData.nacionalidad || ""}
                    onChange={onChange}
                    error={errors.nacionalidad}
                />
            </div>
            <FileField
                id="poder"
                label="Poder Notarial"
                onChange={onFileChange}
                error={errors.poder}
                fileName={(formData.poder as File)?.name}
            />
            <StepNavigation onBack={onBack} onNext={onNext} />
        </div>
    );
}
