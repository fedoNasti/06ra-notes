import React, { useState, useEffect } from 'react';
import NotesForm from './NotesForm';
import NotesList from './NotesList';

export interface Note {
  id: number;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка заметок с сервера
  const fetchNotes = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const res = await fetch('http://localhost:7070/notes');
    if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
    const data = await res.json();
    setNotes(data);
  } catch (err) {
    setError(String(err));
  } finally {
    setLoading(false);
  }
};

  // Добавление новой заметки
  const addNote = async (content: string) => {
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,         
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      await fetchNotes();

    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  // Удаление заметки по id
  const deleteNote = async (id: number) => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch(`http://localhost:7070/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    await fetchNotes(); 
  } catch (err) {
    setError(String(err));
  } finally {
    setLoading(false);
  }
};

  // Первоначальная загрузка при монтировании
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <div className='notes-header'>
        <h1>Заметки</h1>
        <button onClick={fetchNotes}>Обновить</button> {/* зелёные стрелочки */}
      </div>
      
      {loading && <div>Загрузка...</div>}
      {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
      <NotesList notes={notes} onDelete={deleteNote} />
      <NotesForm onAdd={addNote} />
    </div>
  );
};

export default Notes;