import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// XP required for each level (starts at 100 for level 2, increases)
const calculateLevel = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;
const xpForNextLevel = (level) => 100 * (level ** 2);

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(() => {
    try {
      const saved = localStorage.getItem('physics_sim_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load user state from localStorage');
    }
    return {
      xp: 0,
      badges: [],
      completedLabs: [],
      dataLogs: [] // Saved observation tables
    };
  });

  const [notification, setNotification] = useState(null);

  // Persist state to localStorage on every change
  useEffect(() => {
    localStorage.setItem('physics_sim_user', JSON.stringify(userState));
  }, [userState]);

  const level = calculateLevel(userState.xp);
  const nextLevelXp = xpForNextLevel(level);
  const prevLevelXp = level > 1 ? xpForNextLevel(level - 1) : 0;
  const progressPercent = ((userState.xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100;

  const showNotification = (msg, xpGained) => {
    setNotification({ msg, xpGained, id: Date.now() });
    setTimeout(() => setNotification(null), 3000);
  };

  const awardXP = (amount, reason) => {
    setUserState(prev => {
      const newXp = prev.xp + amount;
      const newLevel = calculateLevel(newXp);
      const oldLevel = calculateLevel(prev.xp);
      
      if (newLevel > oldLevel) {
        showNotification(`Level Up! You are now Level ${newLevel} 🚀`, amount);
      } else {
        showNotification(reason, amount);
      }
      return { ...prev, xp: newXp };
    });
  };

  const addBadge = (badgeId) => {
    setUserState(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      showNotification(`New Badge Unlocked! 🏆`, 50);
      return { ...prev, badges: [...prev.badges, badgeId], xp: prev.xp + 50 };
    });
  };

  const saveDataLog = (experimentId, dataRows) => {
    setUserState(prev => ({
      ...prev,
      dataLogs: [...prev.dataLogs.filter(d => d.id !== experimentId), { id: experimentId, data: dataRows }]
    }));
    awardXP(100, "Experiment Data Logged! 📈");
  };

  const value = {
    ...userState,
    level,
    nextLevelXp,
    progressPercent,
    awardXP,
    addBadge,
    saveDataLog,
    notification
  };

  return (
    <UserContext.Provider value={value}>
      {children}
      {/* Global XP Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border-2 border-amber-500 rounded-xl p-4 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-slide-up flex items-center gap-4">
          <div className="bg-amber-500/20 text-amber-400 p-2 rounded-full font-black text-xl">
            +{notification.xpGained}
          </div>
          <div>
            <div className="text-white font-bold">{notification.msg}</div>
            <div className="text-xs text-amber-500 uppercase tracking-widest font-black mt-1">XP Gained</div>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
};
