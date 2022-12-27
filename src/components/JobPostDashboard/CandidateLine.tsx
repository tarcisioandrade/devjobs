import Link from "next/link";
import api from "@libs/axios";
import { useState, useEffect, useCallback } from "react";
import { User } from "../../types/User";

type Props = {
  candidate: string;
};

const CandidateLine = ({ candidate }: Props) => {
  const [user, setUser] = useState<User | null>();

  const getUserData = useCallback(async () => {
    const res = await api.get("/api/user", { params: { id: candidate } });
    setUser(res.data);
  }, [candidate]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const userFullName = `${user?.name.charAt(0).toUpperCase()}${user?.name.slice(
    1
  )} ${user?.surname.charAt(0).toUpperCase()}${user?.surname.slice(1)}`;

  if (!user) return null;
  return (
    <div
      key={user.id}
      className="flex items-center justify-between dark:text-gray-300 text-sm border-b border-gray-700 pb-2"
    >
      <span className="text-blueLock ">{userFullName}</span>
      <Link
        className="text-blueLock hover:underline"
        href={`/${user.id_devjobs}`}
        target="_blank"
      >
        Ver Perfil
      </Link>
    </div>
  );
};

export default CandidateLine;
