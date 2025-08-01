import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Persuasion from './games/Persuasion';
import cases from '../data/cases';

export default function Game() {
  const { caseId } = useParams();
  const location = useLocation();
  const [caseData, setCaseData] = useState(null);

  // Determine the case to play either from location state (custom
  // cases) or from the predefined cases list.
  useEffect(() => {
    // Use data passed via state if available
    if (location.state && location.state.caseData) {
      setCaseData(location.state.caseData);
      return;
    }
    // Otherwise look up the case by id in our data file
    const found = cases.find((c) => c.id === caseId);
    setCaseData(found || null);
  }, [caseId, location.state]);

  if (!caseData) {
    return <div style={{ padding: '1rem' }}>No case selected. Please choose a case from the Cases page.</div>;
  }

  return (
    <div className="game-page" style={{ padding: '1rem' }}>
      <h2>{caseData.title}</h2>
      <Persuasion caseData={caseData} />
    </div>
  );
}