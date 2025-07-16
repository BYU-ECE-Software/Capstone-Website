import { Link } from "react-router-dom";
import BYULogo from "../BYU_monogram_white.svg";
import "./header.css";



const Header = () => {
  // const [isReady, setIsReady] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkDefined = () => {
  //     if (customElements.get('byu-header')) {
  //       setIsReady(true);
  //     } else {
  //       requestAnimationFrame(checkDefined);
  //     }
  //   };
  //   checkDefined();
  // }, []);

  // if (!isReady) return null

  // return React.createElement(
  //   'byu-header',
  //   { constrain: true },
  //   React.createElement('span', { slot: 'site-title' }, <a href="/">Capstone</a>)
  // );

   return (
  //   <div ref={ref}>
  //     <byu-header constrain>
  //       <span slot="site-title"><a href="/">Capstone</a></span>
  //     </byu-header> 
  //   </div>
  //   );
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
          <a href="/">
            <h1 className="text-2xl">Capstone</h1>
          </a>
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
          <Link
            to="/purchaseRequest"
            className="px-8 py-4 hover:bg-[#FAFAFA] rounded-md block nav-link-hover"
          >
            Purchase Request Form
          </Link>
          <Link
            to="/orders"
            className="px-8 py-4 hover:bg-[#FAFAFA] rounded-md block nav-link-hover"
          >
            Order Dashboard
          </Link>
        </div>
      </nav>
    </div>
   );
}

export default Header;