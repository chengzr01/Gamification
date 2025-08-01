import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createCase.css';

export default function CreateCase() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    facts: '',
    legalQuestion: '',
    advocateResponse: '',
  });

  // Generic change handler for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission.  Construct a custom case object and
   * navigate to the game route, including the case via location
   * state.  Images are left as an empty array since the user
   * cannot provide custom artwork at this time.  Should the
   * application later support image uploads they can be added
   * here.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a simple unique ID based on current timestamp
    const id = `custom-${Date.now()}`;
    const newCase = {
      id,
      ...form,
      images: [],
    };
    // Navigate to the game view with the new case in state
    navigate(`/game/${id}`, { state: { caseData: newCase } });
  };

  return (
    <div className="create-case-page">
      <h1>Create Your Own Case</h1>
      <form onSubmit={handleSubmit} className="create-case-form">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Brief Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
        <label htmlFor="facts">Facts</label>
        <textarea
          id="facts"
          name="facts"
          value={form.facts}
          onChange={handleChange}
          rows={6}
          required
        />
        <label htmlFor="legalQuestion">Legal Question</label>
        <textarea
          id="legalQuestion"
          name="legalQuestion"
          value={form.legalQuestion}
          onChange={handleChange}
          rows={3}
          required
        />
        <label htmlFor="advocateResponse">Advocate Response</label>
        <textarea
          id="advocateResponse"
          name="advocateResponse"
          value={form.advocateResponse}
          onChange={handleChange}
          rows={6}
          required
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}