import { apiRequest } from './client';

/**
 * Fetch active job openings from backend
 */
export const getJobPositions = async (departmentFilter = 'All') => {
  try {
    const query = departmentFilter && departmentFilter !== 'All' ? `?department=${encodeURIComponent(departmentFilter)}` : '';
    const res = await apiRequest(`/jobs${query}`);
    const list = res?.jobs || [];
    return list.map((j) => ({
      ...j,
      id: j._id || j.id,
    }));
  } catch (err) {
    console.warn('[CareersApi] Error fetching jobs:', err.message);
    throw err;
  }
};

/**
 * Fetch single job opening by ID
 */
export const getJobPositionById = async (id) => {
  try {
    const res = await apiRequest(`/jobs/${id}`);
    const job = res?.job;
    if (!job) return null;
    return {
      ...job,
      id: job._id || job.id,
    };
  } catch (err) {
    console.warn(`[CareersApi] Error fetching job ${id}:`, err.message);
    throw err;
  }
};

/**
 * Submit job application with authenticated user & direct S3 resume
 */
export const submitJobApplication = async (jobId, applicationData) => {
  try {
    const endpoint = jobId ? `/jobs/${jobId}/apply` : '/jobs/apply';
    const res = await apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
    return res;
  } catch (err) {
    console.error('[CareersApi] Error submitting job application:', err.message);
    throw err;
  }
};
