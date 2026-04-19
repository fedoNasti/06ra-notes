import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { IoMdSend } from 'react-icons/io';

interface NotesFormProps {
  onAdd: (content: string) => void;
}

const NotesForm = ({ onAdd }: NotesFormProps) => {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(e.target.value);

    if (error) setError(null);
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = formData.trim();
    if (!trimmed) {
      setError("Заметка не может быть пустой");
      return;
    }

    onAdd(trimmed);
    setFormData('');
    setError(null);
  }

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <p className="notes-form__title">New Note</p>
      <div className="notes-form__container">
        <textarea
        className="notes-form__input" 
        name="text" 
        value={formData}
        onChange={handleChange}
        placeholder="Введите заметку..."
        />
        <button className="notes-form__btn" type="submit">
          <IoMdSend/>
        </button>
      </div>
      

      {error && <div className="notes-form__error">{error}</div>}
    </form>
  )
};

export default NotesForm;