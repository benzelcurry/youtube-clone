import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.logo}>
      <Link href="/" className={styles.logoContainer}>
        <h1>Home</h1>
      </Link>
    </nav>
  );
}
