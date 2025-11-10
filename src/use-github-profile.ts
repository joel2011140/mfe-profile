import { useEffect, useState } from "react";

export interface GitHubUser {
  login?: string;
  name?: string;
  avatar_url?: string;
  bio?: string | null;
  html_url?: string;
  public_repos?: number;
}

interface UseGitHubProfileResult {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export const useGitHubProfile = (username: string): UseGitHubProfileResult => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("Failed to fetch GitHub data");
        const data: GitHubUser = await res.json();
        setUser(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { user, loading, error };
};
