import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/api/NotesAPI";
import EditeNoteForm from "@/components/notes/EditNoteForm";

export default function EditNotes() {
    const params = useParams();
    const noteId = parseInt(params.noteid!);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editNote', noteId],
        queryFn: () => getNoteById(noteId)
    })

    console.log(isLoading);

    if (isLoading) return <p>Cargando...</p>
    if (isError) return <p>Ha ocurrido un error</p>
    if (data) return <EditeNoteForm data={data} noteId={noteId} />
}