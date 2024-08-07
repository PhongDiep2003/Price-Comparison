import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <p className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 transition ease-in-out duration-300 hover:bg-blue-600">Go Back to Home</p>
      </Link>
      <img src="/404.jpg" alt="404 Image"  />
    </div>
  );
};

export default Custom404;