"use client";

import Link from "next/link";

import SignIn from "./signin";
import { onAuthStateChangedHelper } from "../firebase/firebase";

import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Navbar() {
  // Initialize user state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  });

  return (
    <nav className={styles.logo}>
      <Link href="/" className={styles.logoContainer}>
        <h1>Home</h1>
      </Link>
      <SignIn user={user} />
    </nav>
  );
}
