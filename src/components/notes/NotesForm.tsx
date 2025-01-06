import { NoteFormData } from "types";
import ErrorMessage from "../ErrorMessage";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type NotesFormProps = {
    register: UseFormRegister<NoteFormData>,
    errors: FieldErrors<NoteFormData>
}

export default function NotesForm({ register, errors }: NotesFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="title" className="text-sm uppercase font-bold">
                    Nombre de la nota
                </label>
                <input
                    id="title"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Escribe el titulo de la nota"
                    {...register("title", {
                        required: "El nombre de la nota es obligatorio",
                    })}
                />
                {errors.title && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="content" className="text-sm uppercase font-bold">
                    Contenido de la nota
                </label>
                <input
                    id="content"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Escribe el contenido de la nota"
                    {...register("content", {
                        required: "El contenido de la nota es obligatorio",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <div className="mb-5 flex items-center">
                <label htmlFor="isArchived" className="text-sm pr-5 uppercase ">
                    Archive
                </label>
                <label htmlFor="isArchived" className="relative inline-flex items-center cursor-pointer">
                    <input
                        id="isArchived"
                        type="checkbox"
                        className="sr-only peer"
                        {...register("isArchived")}
                    />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
                    <div className="w-6 h-6 bg-white rounded-full shadow-md transform peer-checked:translate-x-6 transition absolute top-0 left-0"></div>
                </label>
            </div>
        </>
    )
}