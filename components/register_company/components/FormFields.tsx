"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TextFieldProps, FileFieldProps, SelectFieldProps } from "../types";

export function TextField({
    id,
    label,
    value,
    onChange,
    error,
    type = "text",
    placeholder,
    required,
}: TextFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

export function DateField({
    id,
    label,
    value,
    onChange,
    error,
    required,
}: Omit<TextFieldProps, "type" | "value"> & { value: Date | string | undefined }) {
    const formattedValue = value instanceof Date 
        ? value.toISOString().split("T")[0] 
        : typeof value === "string" ? value : "";

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
                id={id}
                name={id}
                type="date"
                value={formattedValue}
                onChange={onChange}
                className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

export function FileField({
    id,
    label,
    onChange,
    error,
    fileName,
    required,
}: FileFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
                id={id}
                name={id}
                type="file"
                onChange={onChange}
                className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            {fileName && (
                <p className="text-sm text-muted-foreground">
                    Archivo seleccionado: {fileName}
                </p>
            )}
        </div>
    );
}

export function SelectField({
    id,
    label,
    value,
    onValueChange,
    error,
    placeholder,
    options,
    required,
}: SelectFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
                    <SelectValue placeholder={placeholder || "Seleccionar..."} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

interface CountrySelectFieldProps extends Omit<SelectFieldProps, "options"> {
    countries: { code: string; name: string }[];
}

export function CountrySelectField({
    id,
    label,
    value,
    onValueChange,
    error,
    countries,
    required,
}: CountrySelectFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Seleccionar país" />
                </SelectTrigger>
                <SelectContent>
                    {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                            {country.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && (
                <p className="text-xs text-red-500">Se necesita seleccionar un país</p>
            )}
        </div>
    );
}
