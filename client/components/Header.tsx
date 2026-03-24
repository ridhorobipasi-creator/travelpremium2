import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with logo and OBIE */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 lg:px-[120px] py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-primary">Obaja</div>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">OBIE</span>
              <span className="text-xs text-gray-600">(Obaja Interactive Center)</span>
            </div>
            <a
              href="https://api.whatsapp.com/send/?phone=6282123339898&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.252 0-2.493.408-3.506 1.16-.584.414-1.091.981-1.477 1.658-.781 1.424-1.179 3.153-1.179 4.992 0 1.793.361 3.505 1.009 5.088.397 1.001.934 1.888 1.569 2.648l-.002.003c1.047 1.173 2.461 2.064 4.036 2.455 1.576.391 3.255.277 4.741-.331 1.486-.609 2.762-1.643 3.624-2.977.862-1.335 1.239-2.941 1.065-4.517-.124-1.107-.448-2.165-1.025-3.088-.576-.924-1.392-1.695-2.338-2.213-.946-.518-2.039-.787-3.177-.787z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">WhatsApp 082123339898</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-gray-50 border-b border-gray-100 px-4 md:px-8 lg:px-[120px]">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition-colors"
            >
              Home
            </Link>
            <Link
              to="/group-tour"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition-colors"
            >
              Group Tour
            </Link>
            <Link
              to="/corporate"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition-colors"
            >
              Corporate
            </Link>
            <Link
              to="/mice"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition-colors"
            >
              MICE
            </Link>
            <Link
              to="/about"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/career"
              className="px-3 py-4 text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition-colors"
            >
              Career
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm font-medium text-primary hover:bg-gray-100 rounded transition-colors">
              Sign In
            </button>
            <button className="px-3 py-2 text-sm font-medium text-primary hover:bg-gray-100 rounded transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
