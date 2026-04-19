import type { Note } from "./Notes";
import NotesCard from "./NotesCard";

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NotesList = ({ notes, onDelete }: NotesListProps) => {

  return (
    <ul className="notes-list">
      {notes.map(note =>(
        <li className="notes-list__item" key={note.id}>
          <NotesCard
          id={note.id}
          content={note.content}
          onDelete={onDelete}
          ></NotesCard>
        </li>
        
      ))}
    </ul>
  ); 
}

export default NotesList;