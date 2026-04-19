import React, { useState, useEffect } from 'react';
import { MdRefresh } from 'react-icons/md';
import NotesForm from './NotesForm';
import NotesList from './NotesList';

export interface Note {
  id: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const deleteNote = async (id: string) => {
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

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h1 className='notes-header__title'>Notes</h1>
        <button className='notes-header__btn' onClick={fetchNotes}>
          <MdRefresh />
        </button>

        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
      </div>
      
      <NotesList notes={notes} onDelete={deleteNote} />
      <NotesForm onAdd={addNote} />
    </div>
  );
};

export default Notes;