import { useNavigate } from 'react-router'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 text-white text-center p-5">
      <div className="animate-fade-in">
        <h1 className="text-[clamp(6rem,15vw,10rem)] m-0 font-bold drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] tracking-[0.1em]">
          404
        </h1>

        <div className="h-1 w-20 bg-white mx-auto my-8 rounded-sm"></div>

        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold my-5 drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
          Oops! Page Not Found
        </h2>

        <p className="text-[clamp(1rem,2vw,1.2rem)] max-w-[500px] mx-auto my-5 opacity-95 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>

        <button
          onClick={() => navigate('/admin/products')}
          className="mt-10 px-10 py-3.5 text-lg cursor-pointer bg-white text-indigo-500 border-none rounded-full font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
