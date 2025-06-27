import { Link } from 'react-router-dom';
import BYULogo from '../BYU_monogram_white.svg';
import './header.css';

export default function Header() {
    return (
        <div className="w-full sticky top-0 z-50">
            {/* Top navy bar */}
            <header className="w-screen bg-byuNavy text-white py-4 px-6 shadow-md">
            <div className="flex items-center">
                <a
                href="https://www.byu.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 border-r-[1px] border-byuRoyal"
                >
                <img src={BYULogo} alt="Logo" className="h-10 w-auto" />
                </a>
                <a href="/"><h1 className="text-2xl">Capstone</h1></a>
            </div>
            </header>

            {/* White nav bar with links to every page */}
            <nav className="w-full bg-white text-byuNavy shadow">
            <div className="flex px-32 text-base font-medium">
                <Link
                to="/teams"
                className="px-8 py-4 hover:bg-[#FAFAFA] rounded-md block nav-link-hover"
                >
                Team Directory
                </Link>
            </div>
            </nav>
        </div>
    );
}