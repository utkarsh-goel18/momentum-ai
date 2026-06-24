import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <div className="flex-1 relative">

        <div
          className="
            absolute
            top-20
            right-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-purple-500/10
            blur-[140px]
            pointer-events-none
          "
        />

        <Navbar />

        <div className="p-10 relative z-10">
          {children}
        </div>

      </div>

    </div>
  );
}