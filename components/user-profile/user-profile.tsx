"use client";
import { useUser } from "@/hooks/useUser";

export default function UserProfile() {
  const { data, isLoading, isError } = useUser();

  if (isLoading) return <p>Chargement…</p>;
  if (isError) return <p>Erreur lors du chargement</p>;

  return <div>Bienvenue {JSON.stringify(data)}</div>;
}
