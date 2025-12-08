function UserDetails({ user }) {
  if (!user) {
    return (
      <div className="empty-details">
        <p>👆 Please click on a user card. Full details will be shown here.</p>
      </div>
    );
  }

  return (
    <div className="details-content">
      <div className="details-header">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="details-avatar"
        />
        <div>
          <h3>
            {user.first_name} {user.last_name}
          </h3>
          <p className="details-email">{user.email}</p>
        </div>
      </div>

      <div className="details-body">
        <div className="detail-row">
          <span className="detail-label">ID</span>
          <span className="detail-value">#{user.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Display Name</span>
          <span className="detail-value">
            {user.first_name.toLowerCase()}_{user.last_name.toLowerCase()}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email Host</span>
          <span className="detail-value">
            {user.email.split("@")[1] || "N/A"}
          </span>
        </div>
      </div>

      <div className="details-footer">
        <button
          className="primary-btn"
          onClick={() => (window.location = `mailto:${user.email}`)}
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
