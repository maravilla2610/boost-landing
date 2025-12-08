"use client";

import React from "react";
import { TextField, DateField, FileField, SelectField } from "../components/FormFields";
import { StepNavigation } from "../components/StepNavigation";
import { FormData, DocumentType } from "../types";
import { DOCUMENT_TYPES } from "../constants";

interface GeneralStepProps {
    formData: FormData;
    errors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDocumentTypeChange: (value: DocumentType) => void;
    onBack: () => void;
    onNext: () => void;
}

export function GeneralStep({
    formData,
    errors,
    onChange,
    onFileChange,
    onDocumentTypeChange,
    onBack,
    onNext,
}: GeneralStepProps) {
    const isMoral = formData.moral;

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isMoral ? (
                    <CompanyGeneralFields
                        formData={formData}
                        errors={errors}
                        onChange={onChange}
                        onFileChange={onFileChange}
                    />
                ) : (
                    <PersonGeneralFields
                        formData={formData}
                        errors={errors}
                        onChange={onChange}
                        onFileChange={onFileChange}
                        onDocumentTypeChange={onDocumentTypeChange}
                    />
                )}
            </div>
            <StepNavigation onBack={onBack} onNext={onNext} />
        </div>
    );
}

interface CompanyGeneralFieldsProps {
    formData: FormData;
    errors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CompanyGeneralFields({
    formData,
    errors,
    onChange,
    onFileChange,
}: CompanyGeneralFieldsProps) {
    return (
        <>
            <TextField
                id="nombre_compañia"
                label="Nombre de la Compañía"
                value={formData.nombre_compañia || ""}
                onChange={onChange}
                error={errors.nombre_compañia}
                required
            />
            <TextField
                id="nombre_legal_compañia"
                label="Nombre Legal"
                value={formData.nombre_legal_compañia || ""}
                onChange={onChange}
                error={errors.nombre_legal_compañia}
                required
            />
            <DateField
                id="fecha_de_constitucion"
                label="Fecha de Constitución"
                value={formData.fecha_de_constitucion}
                onChange={onChange}
                error={errors.fecha_de_constitucion}
                required
            />
            {formData.pais === "MX" && (
                <TextField
                    id="rfc_entidad_legal"
                    label="RFC"
                    value={formData.rfc_entidad_legal || ""}
                    onChange={onChange}
                    error={errors.rfc_entidad_legal}
                    required
                />
            )}
            <TextField
                id="correo"
                label="Correo Electrónico"
                type="email"
                value={formData.correo || ""}
                onChange={onChange}
                error={errors.correo}
                required
            />
            <TextField
                id="giro_mercantil"
                label="Giro Mercantil"
                value={formData.giro_mercantil || ""}
                onChange={onChange}
                error={errors.giro_mercantil}
                required
            />
            <TextField
                id="e_firma"
                label="E-Firma (Opcional)"
                value={formData.e_firma || ""}
                onChange={onChange}
                error={errors.e_firma}
            />
            <TextField
                id="no_sello"
                label="Numero de Sello SAT (Opcional)"
                value={formData.no_sello || ""}
                onChange={onChange}
                error={errors.no_sello}
            />
            <FileField
                id="csf"
                label="Constancia de Situación Fiscal"
                onChange={onFileChange}
                error={errors.csf}
                fileName={(formData.csf as File)?.name}
                required
            />
            <FileField
                id="acta_constitutiva"
                label="Acta Constitutiva"
                onChange={onFileChange}
                error={errors.acta_constitutiva}
                fileName={(formData.acta_constitutiva as File)?.name}
                required
            />
        </>
    );
}

interface PersonGeneralFieldsProps {
    formData: FormData;
    errors: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDocumentTypeChange: (value: DocumentType) => void;
}

function PersonGeneralFields({
    formData,
    errors,
    onChange,
    onFileChange,
    onDocumentTypeChange,
}: PersonGeneralFieldsProps) {
    return (
        <>
            <TextField
                id="nombre_representante_legal"
                label="Nombre"
                value={formData.nombre_representante_legal || ""}
                onChange={onChange}
                error={errors.nombre_representante_legal}
                required
            />
            <TextField
                id="apellido_representante_legal"
                label="Apellido"
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
                required
            />
            <TextField
                id="rfc"
                label="RFC"
                value={formData.rfc || ""}
                onChange={onChange}
                error={errors.rfc}
                required
            />
            <TextField
                id="correo"
                label="Correo Electrónico"
                type="email"
                value={formData.correo || ""}
                onChange={onChange}
                error={errors.correo}
                required
            />
            <TextField
                id="telefono"
                label="Teléfono"
                type="tel"
                value={formData.telefono || ""}
                onChange={onChange}
                error={errors.telefono}
            />
            <TextField
                id="nacionalidad"
                label="Nacionalidad"
                value={formData.nacionalidad || ""}
                onChange={onChange}
                error={errors.nacionalidad}
                required
            />
            <TextField
                id="e_firma"
                label="E-Firma (Opcional)"
                value={formData.e_firma || ""}
                onChange={onChange}
                error={errors.e_firma}
            />
            <TextField
                id="no_sello"
                label="Numero de Sello SAT (Opcional)"
                value={formData.no_sello || ""}
                onChange={onChange}
                error={errors.no_sello}
            />
            <FileField
                id="csf"
                label="Constancia de Situación Fiscal"
                onChange={onFileChange}
                error={errors.csf}
                fileName={(formData.csf as File)?.name}
                required
            />
        </>
    );
}
