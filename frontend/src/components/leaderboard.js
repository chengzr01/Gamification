import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import users from '../data/users';
import cases from '../data/cases';
import RadarChart from './radarchart';
import './leaderboard.css';

// Flatten the user statistics into a single array.  Each entry in this
// array represents one user–model–case combination and contains all
// properties needed by the leaderboard UI.  We also attach the
// player\'s name and id so that the profile page can be linked.
const entries = [];
users.forEach((u) => {
  u.stats.forEach((stat) => {
    entries.push({ ...stat, userId: u.id, name: u.name });
  });
});

// Build a mapping from case ID to human‑readable case title using the
// definitions provided in src/data/cases.js.  This allows the filter
// dropdown and table to display friendly names instead of opaque IDs.
const caseNameMap = cases.reduce((acc, c) => {
  acc[c.id] = c.title;
  return acc;
}, {});

// Build the list of available models and case IDs for the filter dropdowns.
const modelOptions = ['All Models', ...Array.from(new Set(entries.map((e) => e.model)))];
const caseOptions = ['All Cases', ...Array.from(new Set(entries.map((e) => e.caseId)))];

/**
 * Leaderboard component
 *
 * Renders a sortable table of user performance statistics.  Users can
 * filter the table by model and court case.  The top entries are
 * determined by win rate.  A radar chart summarising the skill
 * profile for each entry is displayed in the final column.
 */
export default function Leaderboard() {
  const [selectedModel, setSelectedModel] = useState(modelOptions[0]);
  const [selectedCase, setSelectedCase] = useState(caseOptions[0]);

  // Filter according to the selected model and case.  If either filter
  // equals its "All" sentinel value then we include all entries for
  // that dimension.
  const filtered = entries.filter((entry) => {
    const modelOK = selectedModel === 'All Models' || entry.model === selectedModel;
    const caseOK = selectedCase === 'All Cases' || entry.caseId === selectedCase;
    return modelOK && caseOK;
  });

  // Sort descending by win rate and take the top 10.  We slice a copy to
  // avoid mutating the original array.
  const sorted = filtered
    .slice()
    .sort((a, b) => (b.win_rate ?? 0) - (a.win_rate ?? 0))
    .slice(0, 10);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">Leaderboard</h1>
        <div className="leaderboard-filters">
          <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
            {modelOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select value={selectedCase} onChange={(e) => setSelectedCase(e.target.value)}>
            {caseOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All Cases' ? 'All Cases' : caseNameMap[opt] || opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="leaderboard-table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Model</th>
              <th>Case</th>
              <th>Wins/Draws/Losses</th>
              <th>Games</th>
              <th>Win Rate</th>
              <th>Avg. Time</th>
              <th>Skill Profile</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry, idx) => {
              // Compute total games and ensure win rate and average time have sensible
              // default values.  New stats may omit these fields so we
              // derive winRate from wins/draws/losses and fall back to 0 for
              // avgTime.  Multiplying a possibly undefined win_rate by 100
              // yields NaN, so we guard against that as well.
              const games = entry.wins + entry.draws + entry.losses;
              const winRate = typeof entry.win_rate === 'number'
                ? entry.win_rate
                : games > 0
                ? entry.wins / games
                : 0;
              const avgTime = typeof entry.avg_time === 'number' ? entry.avg_time : 0;
              return (
                <tr key={idx} className="leaderboard-row">
                  <td>{idx + 1}</td>
                  <td>
                    <Link to={`/profile/${entry.userId}`}>{entry.name}</Link>
                  </td>
                  <td>{entry.model}</td>
                  <td>{caseNameMap[entry.caseId] || entry.caseId}</td>
                  <td>
                    {entry.wins}/{entry.draws}/{entry.losses}
                  </td>
                  <td>{games}</td>
                  <td>{(winRate * 100).toFixed(1)}%</td>
                  <td>{avgTime.toFixed(1)}s</td>
                  <td>
                    <RadarChart scores={entry.scores} size={80} />
                  </td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td colSpan="9" style={{ padding: '1rem', textAlign: 'center' }}>
                  No players found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}