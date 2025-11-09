import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import landmap from "../assets/land-map.jpg";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section with full background */}
        <section
          className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${landmap})` }}
        >
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>

          {/* Text content */}
          <div className="relative z-10 max-w-3xl text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Empowering Transparency in Land Records
            </h2>
            <p className="text-lg md:text-xl mb-8 drop-shadow-md">
              Access, verify, and manage government land data securely and efficiently.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-lg transition"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16 px-8 grid md:grid-cols-3 gap-10 bg-gray-100 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-3 text-teal-700 dark:text-teal-400">
              Land Transparency
            </h3>
            <p>
              Get detailed, updated, and verified records for government-owned
              lands across regions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-3 text-teal-700 dark:text-teal-400">
              Encroachment Tracking
            </h3>
            <p>
              Identify and report encroachments using advanced geospatial
              monitoring tools.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-3 text-teal-700 dark:text-teal-400">
              Digital Reports
            </h3>
            <p>
              Generate and download detailed land status and ownership reports
              in one click.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
