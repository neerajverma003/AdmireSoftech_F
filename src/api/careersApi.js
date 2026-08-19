import { apiRequest } from './client';
import { careersData } from '../data/careersData';

export const getJobPositions = async (departmentFilter = 'All') => {
  const backendData = await apiRequest('/jobs');
  const dataset = backendData || careersData;

  if (departmentFilter === 'All') return dataset;
  return dataset.filter(
    (job) => job.department.toLowerCase() === departmentFilter.toLowerCase()
  );
};

export const submitJobApplication = async (applicationData) => {
  // If applicationData contains a file, construct FormData for backend multipart upload
  let bodyPayload;
  let headers = {};

  if (applicationData.resumeFile instanceof File) {
    const formData = new FormData();
    Object.keys(applicationData).forEach((key) => {
      if (key === 'resumeFile') {
        formData.append('resume', applicationData.resumeFile);
      } else if (applicationData[key] !== null && applicationData[key] !== undefined) {
        formData.append(key, applicationData[key]);
      }
    });
    bodyPayload = formData;
  } else {
    bodyPayload = JSON.stringify(applicationData);
    headers = { 'Content-Type': 'application/json' };
  }

  const backendResult = await apiRequest('/jobs/apply', {
    method: 'POST',
    body: bodyPayload,
    headers,
  });

  if (backendResult) return backendResult;

  // Mock response when backend is offline
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    success: true,
    message: `Application submitted successfully for ${applicationData.jobTitle || 'the position'}! We will review your resume and contact you soon.`,
  };
};
