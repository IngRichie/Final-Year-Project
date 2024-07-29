import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileImageContextProps {
  profileImage: string | null;
  setProfileImage: (url: string | null) => void;
}

const ProfileImageContext = createContext<ProfileImageContextProps | undefined>(undefined);

export const useProfileImage = (): ProfileImageContextProps => {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error('useProfileImage must be used within a ProfileImageProvider');
  }
  return context;
};

interface ProfileImageProviderProps {
  children: ReactNode;
}

export const ProfileImageProvider = ({ children }: ProfileImageProviderProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};
