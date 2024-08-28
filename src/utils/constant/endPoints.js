// local
export const BASE_URL_LOCAL = "https://api.sentryspot.co.uk/";
// production
export const BASE_URL_PRODUCTION = "https://api.sentryspot.co.uk/";
// set base url
export const BASE_URL = BASE_URL_PRODUCTION;

// version
export const VERS = "v1";

// Object containing endpoint slugs
export const EndpointSlug = {
  // AUTHENTICATION
  SIGNIN: "/api/employeer/auth/login",
  SIGNUP: "/api/employeer/auth/signup",
  // EMPLOYEER
  CREATE_POST: "/api/employeer/create-job",
  GET_POST: "/api/employeer/job-lists",
  UPDATE_POST: "/api/employeer/job-post",
  GET_POST_BYID: "/api/employeer/job-lists",
  // commons
  GET_JOB_TYPES: "/api/employeer/job-types",
  GET_JOB_CATEGORIES: "/api/employeer/job-categories",
  GET_EXPERIENCE: "/api/jobseeker/experience-level",
  GET_SALARY: "/api/jobseeker/salary-range",
  GET_FUNCTION_AREA: "/api/jobseeker/functional-area",
  GET_YEARS: "/api/jobseeker/years",

  //   Dummy
  DUMMY_JSON: "https://jsonplaceholder.typicode.com/posts",
};

// {
//     "job_title": "job_title",
//     "job_description": "job_description",
//     "email_address": "email_address",
//     "specialisms_id": 1,
//     "job_type_id": 1,
//     "offered_salary_id": 1,
//     "career_level_id": 1,
//     "experience_id": 1,
//     "industry_id": 1,
//     "qualification_id": 1,
//     "application_deadline": "2024-12-31",
//     "country_id": 2,
//     "state_id": 2,
//     "city_id": 2,
//     "complete_address": "complete_address",
//     "latitude": "23.45",
//     "longitude": "12.34",
//     "status": 1
// }
