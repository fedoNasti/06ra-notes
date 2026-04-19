import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

interface NotesFormProps {
  onAdd: (content: string) => void;
}

const NotesForm = ({ onAdd }: NotesFormProps) => {
  const [formData, setFormData] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFormData(value);
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd(formData);
    setFormData('');
  }

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <p className="notes-form__title">New Note</p>
      <input
      className="notes-form__input" 
      type="text"
      name="text" 
      value={formData}
      onChange={handleChange}
      required
      pattern=".*\S.*"
      title="Заметка не может быть пустой"
      />
      <button className="notes-form__btn" type="submit">Add</button>
    </form>
  )
};

export default NotesForm;