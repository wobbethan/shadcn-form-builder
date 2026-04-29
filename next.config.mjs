/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/template/",
        destination: "/template/business/job_application",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
