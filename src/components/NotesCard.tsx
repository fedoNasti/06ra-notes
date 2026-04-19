interface NotesCardProps {
  id: string;
  content: string;
  onDelete: (id: string) => void;
}

const NotesCard = ({ id, content, onDelete }: NotesCardProps) => {

  return (
    <>
      <button className="notes-list__btn" onClick={() => onDelete(id)}>X</button>
      <div className="notes-list__content">{content}</div>
    </>
  )
}

export default NotesCard;