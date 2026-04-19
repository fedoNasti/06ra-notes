interface NotesCardProps {
  id: number;
  content: string;
  onDelete: (id: number) => void;
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