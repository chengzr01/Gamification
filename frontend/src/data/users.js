const defaultUsers = [
  {
    id: 'alice',
    name: 'Alice',
    email: 'alice@princeton.edu',
    password: 'alice123',
    stats: [
      {
        model: 'GPT-4o',
        caseId: 'case1',
        wins: 17,
        draws: 2,
        losses: 1,
        avg_time: 4.2,
        win_rate: 0.85,
        scores: {
          precedentMastery: 0.9,
          logicalCoherence: 0.8,
          evidenceIntegration: 0.75,
          counterArgumentHandling: 0.7,
          responsivenessToJudges: 0.8,
          adaptability: 0.6,
          clarityAndRhetoricalForce: 0.85,
          civilityProfessionalism: 0.95,
        },
      },
      {
        model: 'GPT-4o',
        caseId: 'case2',
        wins: 15,
        draws: 3,
        losses: 2,
        avg_time: 4.5,
        win_rate: 15 / (15 + 3 + 2),
        scores: {
          precedentMastery: 0.88,
          logicalCoherence: 0.82,
          evidenceIntegration: 0.72,
          counterArgumentHandling: 0.73,
          responsivenessToJudges: 0.79,
          adaptability: 0.64,
          clarityAndRhetoricalForce: 0.87,
          civilityProfessionalism: 0.93,
        },
      },
      {
        model: 'GPT-4o',
        caseId: 'case3',
        wins: 16,
        draws: 2,
        losses: 2,
        avg_time: 4.3,
        win_rate: 16 / (16 + 2 + 2),
        scores: {
          precedentMastery: 0.89,
          logicalCoherence: 0.81,
          evidenceIntegration: 0.76,
          counterArgumentHandling: 0.71,
          responsivenessToJudges: 0.82,
          adaptability: 0.65,
          clarityAndRhetoricalForce: 0.86,
          civilityProfessionalism: 0.94,
        },
      },
    ],
  },
  {
    id: 'bob',
    name: 'Bob',
    email: 'bob@princeton.edu',
    password: 'bob123',
    stats: [
      {
        model: 'GPT-3.5',
        caseId: 'case1',
        wins: 14,
        draws: 3,
        losses: 1,
        avg_time: 3.8,
        win_rate: 14 / (14 + 3 + 1),
        scores: {
          precedentMastery: 0.7,
          logicalCoherence: 0.75,
          evidenceIntegration: 0.6,
          counterArgumentHandling: 0.8,
          responsivenessToJudges: 0.7,
          adaptability: 0.8,
          clarityAndRhetoricalForce: 0.65,
          civilityProfessionalism: 0.9,
        },
      },
      {
        model: 'GPT-3.5',
        caseId: 'case2',
        wins: 13,
        draws: 4,
        losses: 2,
        avg_time: 3.9,
        win_rate: 13 / (13 + 4 + 2),
        scores: {
          precedentMastery: 0.72,
          logicalCoherence: 0.77,
          evidenceIntegration: 0.62,
          counterArgumentHandling: 0.78,
          responsivenessToJudges: 0.71,
          adaptability: 0.82,
          clarityAndRhetoricalForce: 0.68,
          civilityProfessionalism: 0.88,
        },
      },
      {
        model: 'GPT-3.5',
        caseId: 'case3',
        wins: 12,
        draws: 5,
        losses: 2,
        avg_time: 4.0,
        win_rate: 12 / (12 + 5 + 2),
        scores: {
          precedentMastery: 0.71,
          logicalCoherence: 0.74,
          evidenceIntegration: 0.63,
          counterArgumentHandling: 0.79,
          responsivenessToJudges: 0.69,
          adaptability: 0.81,
          clarityAndRhetoricalForce: 0.66,
          civilityProfessionalism: 0.87,
        },
      },
    ],
  },
  {
    id: 'caleb',
    name: 'Caleb',
    email: 'caleb@princeton.edu',
    password: 'caleb123',
    stats: [
      {
        model: 'Llama-70B-Instruct',
        caseId: 'case1',
        wins: 9,
        draws: 2,
        losses: 4,
        avg_time: 5.1,
        win_rate: 9 / (9 + 2 + 4),
        scores: {
          precedentMastery: 0.55,
          logicalCoherence: 0.65,
          evidenceIntegration: 0.7,
          counterArgumentHandling: 0.5,
          responsivenessToJudges: 0.6,
          adaptability: 0.7,
          clarityAndRhetoricalForce: 0.5,
          civilityProfessionalism: 0.8,
        },
      },
      {
        model: 'Llama-70B-Instruct',
        caseId: 'case2',
        wins: 8,
        draws: 3,
        losses: 5,
        avg_time: 5.3,
        win_rate: 8 / (8 + 3 + 5),
        scores: {
          precedentMastery: 0.56,
          logicalCoherence: 0.66,
          evidenceIntegration: 0.69,
          counterArgumentHandling: 0.52,
          responsivenessToJudges: 0.61,
          adaptability: 0.72,
          clarityAndRhetoricalForce: 0.52,
          civilityProfessionalism: 0.79,
        },
      },
      {
        model: 'Llama-70B-Instruct',
        caseId: 'case3',
        wins: 10,
        draws: 2,
        losses: 4,
        avg_time: 5.0,
        win_rate: 10 / (10 + 2 + 4),
        scores: {
          precedentMastery: 0.57,
          logicalCoherence: 0.64,
          evidenceIntegration: 0.71,
          counterArgumentHandling: 0.53,
          responsivenessToJudges: 0.62,
          adaptability: 0.73,
          clarityAndRhetoricalForce: 0.54,
          civilityProfessionalism: 0.81,
        },
      },
    ],
  },
];

let storedUsers = null;
if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
  const raw = window.localStorage.getItem('users');
  if (raw) {
    try {
      storedUsers = JSON.parse(raw);
    } catch (err) {
      console.warn('Failed to parse users from localStorage:', err);
    }
  }
}

const users = Array.isArray(storedUsers) && storedUsers.length > 0 ? storedUsers : defaultUsers;

export function saveUsers(updatedUsers) {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      window.localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (err) {
      console.warn('Unable to save users to localStorage:', err);
    }
  }
}

export default users;