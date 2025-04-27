import React from "react";
import styles from "../styles/profile.module.css";

const profileOptions = [
  { label: "Add Medicine", icon: "💊" },
  { label: "Add Stock", icon: "📦" },
  { label: "Settings", icon: "⚙️" },
  { label: "Help & Support", icon: "❓" },
  { label: "About Us", icon: "ℹ️" },
  { label: "Logout", icon: "🚪" },
];

const Profile = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Profile</h2>
      <p className={styles.subheading}>Manage your preferences</p>

      <ul className={styles.optionList}>
        {profileOptions.map((option, index) => (
          <li key={index} className={styles.optionItem}>
            <span className={styles.icon}>{option.icon}</span>
            <span className={styles.label}>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
