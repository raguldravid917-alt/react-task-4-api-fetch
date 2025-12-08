function UserCard({ user, onClick, isSelected }) {
  return (
    <button
      className={`user-card ${isSelected ? "user-card-selected" : ""}`}
      onClick={onClick}
    >
      <div className="user-avatar-wrapper">
        <img src={user.avatar} alt={user.first_name} className="user-avatar" />
      </div>
      <div className="user-info">
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <p className="user-email">{user.email}</p>
        <span className="chip">View details</span>
      </div>
    </button>
  );
}

export default UserCard;
