import React from 'react';
import { useNavigate } from 'react-router-dom';
import cases from '../data/cases';
import './caseSelection.css';

import case1Img from '../assets/case1.png';
import case2Img from '../assets/case2.png';
import case3Img from '../assets/case3.png';

const allImages = [case1Img, case2Img, case3Img];

export default function CaseSelection() {
  const navigate = useNavigate();

  const handleSelectCase = (c) => {
    // Use the case id in the URL and include the full case in state
    navigate(`/game/${c.id}`, { state: { caseData: c } });
  };

  return (
    <div className="case-selection-page" style={{ padding: '1rem' }}>
      <h1>Choose a Legal Case</h1>
      <div className="case-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {cases.map((c) => {
          const img = allImages[Math.floor(Math.random() * allImages.length)];
          return (
            <div
              key={c.id}
              className="case-card"
              onClick={() => handleSelectCase(c)}
              style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                width: 'calc(33% - 1rem)',
              }}
            >
              <img
                src={img}
                alt={c.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <button
          className="create-case-btn"
          onClick={() => navigate('/create-case')}
        >
          Create Your Own Case
        </button>
      </div>
    </div>
  );
}