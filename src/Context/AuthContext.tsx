
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  auth, 
  updateProfile, 
  sendPasswordResetEmail as firebaseSendPasswordResetEmail
} from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut as firebaseSignOut } from 'firebase/auth';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  currentUser: null, 
  loading: true,
  signOut: async () => {},
  updateUserProfile: async () => {},
  resetPassword: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign out functionality
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Signed out successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign out";
      toast.error(errorMessage);
    }
  };

  // Update user profile
  const updateUserProfile = async (displayName: string) => {
    try {
      if (!currentUser) throw new Error("No user signed in");
      
      await updateProfile(currentUser, { displayName });
      // Force refresh the user object
      setCurrentUser({ ...currentUser });
      toast.success("Profile updated successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Password reset
  const resetPassword = async (email: string) => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send password reset email";
      toast.error(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signOut,
    updateUserProfile,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
