import React from 'react';
import './Friends.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Friends = ({ friends }) => {
  return (
    <div className="friends-container">
      {friends.map((friend) => (
        <div key={friend._id} className="friend-item">
          <h4>{friend.name}</h4>
          <p>{friend.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Friends;
