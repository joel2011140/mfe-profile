import React from "react";
import { useGitHubProfile } from "./use-github-profile";

const Profile: React.FC = () => {
  const { user, loading, error } = useGitHubProfile("joel2011140");

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-sm">
        <p className="text-gray-500 text-center">Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-sm">
        <p className="text-red-500 text-center">
          Error: {error || "User not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-sm text-gray-800">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user?.avatar_url}
          alt={user?.login || "GitHub user"}
          className="h-16 w-16 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{user?.name || "No name"}</h2>
          <p className="text-sm text-gray-500">@{user?.login}</p>
        </div>
      </div>

      {user?.bio && (
        <p className="text-gray-600 mb-4 italic">“{user.bio}”</p>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={() => user?.html_url && window.open(user.html_url, "_blank")}
          className="rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          View GitHub
        </button>

        <a
          href={`${user?.html_url}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          {user?.public_repos ?? 0} Repos →
        </a>
      </div>
    </div>
  );
};

export default Profile;
