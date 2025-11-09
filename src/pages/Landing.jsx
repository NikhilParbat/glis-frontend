import Header from "../components/Header";
import Footer from "../components/Footer";
import landmap from "../assets/land-map.jpg";


export default function Landing() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="text-center py-20 bg-linear-to-r from-teal-600 to-green-600 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Empowering Transparency in Land Records
          </h2>
          <p className="text-lg mb-6">
            Access, verify, and manage government land data securely and
            efficiently.
          </p>
          <img
            src={landmap}
            alt="Land Map"
            className="mx-auto w-1/3 rounded-xl shadow-lg"/>
        </section>

        <section className="py-16 px-8 grid md:grid-cols-3 gap-10">
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
