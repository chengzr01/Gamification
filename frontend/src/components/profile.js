import React from 'react';
import { Link, useParams } from 'react-router-dom';
import users from '../data/users';
import RadarChart from './radarchart';
import './profile.css';

export default function Profile() {
  const { userId } = useParams();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="profile-container">
        <Link className="back-link" to="/leaderboard">
          &larr; Back to Leaderboard
        </Link>
        <h1>User not found</h1>
      </div>
    );
  }

  let totalWins = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let totalTime = 0;
  const scoreSums = {};
  let scoreCount = 0;
  user.stats.forEach((stat) => {
    totalWins += stat.wins;
    totalDraws += stat.draws;
    totalLosses += stat.losses;
    totalTime += stat.avg_time;
    Object.keys(stat.scores).forEach((key) => {
      scoreSums[key] = (scoreSums[key] || 0) + stat.scores[key];
    });
    scoreCount += 1;
  });
  const totalGames = totalWins + totalDraws + totalLosses;
  const winRate = totalGames > 0 ? totalWins / totalGames : 0;
  const avgTime = scoreCount > 0 ? totalTime / scoreCount : 0;
  // Compute average scores for radar chart
  const averagedScores = {};
  Object.keys(scoreSums).forEach((key) => {
    averagedScores[key] = scoreSums[key] / scoreCount;
  });

  return (
    <div className="profile-container">
      <Link className="back-link" to="/leaderboard">
        &larr; Back&nbsp;to&nbsp;Leaderboard
      </Link>
      <section className="profile-card">
        <header className="profile-header">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">
            User&nbsp;Email:&nbsp;
            <span className="accent">{user.email}</span>
          </p>
          <p className="profile-winrate">
            Win&nbsp;Rate:&nbsp;
            <span className="accent">{(winRate * 100).toFixed(1)}%</span>
          </p>
          <p className="profile-games">
            Games&nbsp;Played:&nbsp;<span className="accent">{totalGames}</span>
          </p>
          <p className="profile-avgtime">
            Avg.&nbsp;Time:&nbsp;<span className="accent">{avgTime.toFixed(1)}s</span>
          </p>
        </header>
        <div className="profile-chart">
          <RadarChart scores={averagedScores} size={280} showLabels />
        </div>
      </section>
    </div>
  );
}