import React from 'react';
import { useBooks } from '../hooks/useBooks';

const Stats = () => {
  const { stats } = useBooks();

  return (
    <div>
      <h1>📊 Statistik Buku</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Buku</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Dimiliki</h3>
          <p>{stats.owned}</p>
        </div>
        <div className="stat-card">
          <h3>Sedang Dibaca</h3>
          <p>{stats.reading}</p>
        </div>
        <div className="stat-card">
          <h3>Ingin Dibeli</h3>
          <p>{stats.wishlist}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;