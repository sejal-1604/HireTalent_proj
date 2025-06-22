
import { 
  db, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  timestamp
} from './firebase';
import { toast } from 'sonner';

// Get user data
export const getUserData = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
    toast.error(errorMessage);
    throw error;
  }
};

// Update user data
export const updateUserData = async (userId: string, data: Record<string, any>) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: timestamp
    });
    toast.success("Profile updated successfully");
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
    toast.error(errorMessage);
    throw error;
  }
};

// Create a job posting
export const createJob = async (userId: string, jobData: Record<string, any>) => {
  try {
    const jobsCollectionRef = collection(db, "jobs");
    const newJobRef = await addDoc(jobsCollectionRef, {
      ...jobData,
      createdBy: userId,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    toast.success("Job created successfully");
    return { id: newJobRef.id, ...jobData };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create job";
    toast.error(errorMessage);
    throw error;
  }
};

// Get all jobs for a user
export const getUserJobs = async (userId: string) => {
  try {
    const jobsRef = collection(db, "jobs");
    const q = query(jobsRef, where("createdBy", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const jobs: Record<string, any>[] = [];
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    
    return jobs;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch jobs";
    toast.error(errorMessage);
    throw error;
  }
};

// Get all jobs
export const getAllJobs = async () => {
  try {
    const jobsRef = collection(db, "jobs");
    const querySnapshot = await getDocs(jobsRef);
    
    const jobs: Record<string, any>[] = [];
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    
    return jobs;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch jobs";
    toast.error(errorMessage);
    throw error;
  }
};

// Create a job application
export const createApplication = async (userId: string, jobId: string, applicationData: Record<string, any>) => {
  try {
    const applicationsRef = collection(db, "applications");
    const newApplicationRef = await addDoc(applicationsRef, {
      ...applicationData,
      userId,
      jobId,
      status: "new",
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    toast.success("Application submitted successfully");
    return { id: newApplicationRef.id, ...applicationData };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to submit application";
    toast.error(errorMessage);
    throw error;
  }
};

// Get all applications for a job
export const getJobApplications = async (jobId: string) => {
  try {
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("jobId", "==", jobId));
    const querySnapshot = await getDocs(q);
    
    const applications: Record<string, any>[] = [];
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    
    return applications;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch applications";
    toast.error(errorMessage);
    throw error;
  }
};

// Get all applications for a user
export const getUserApplications = async (userId: string) => {
  try {
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const applications: Record<string, any>[] = [];
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    
    return applications;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch applications";
    toast.error(errorMessage);
    throw error;
  }
};
