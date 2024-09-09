import { Link } from "react-router-dom";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
const HeaderNavContent = () => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="nav main-menu " >
        <ul className="navigation" id="navbar" >
          {/* current dropdown */}
          {/* <li
            className={`${
              isActiveParent(homeItems, pathname) ? "" : ""
            } dropdown`}
          >
             <Link to={"/"}>Home</Link> 
            {/* <div className="mega-menu">
              <div className="mega-menu-bar row pt-0">
                {homeItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, pathname)
                              ? ""
                              : ""
                          }
                          key={i}
                        >
                          <Link to={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div> 
          </li> */}
          {/* <li
            className={`${
              isActiveParent(homeItems, pathname) ? "text-blue-950" : ""
            } dropdown`}
          >
            <span>AI Resume</span>
            <ul>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Resume Buider</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Resume Score</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Resume Enhancer</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/">Match & Apply</Link>
              </li>
            </ul>
          </li> */}
          {/* End homepage menu items */}
          <li
                className="text-white"
              >
                <Link to="/employers-dashboard/dashboard "   className="text-white">Dashboard </Link>
              </li>
        
          <li
            className={`${
              isActiveParent(employerItems, pathname) ||
              pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span className="text-white"> Jobs</span>
            <ul>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current " : ""
                }
              >
                <Link to="/employers-list-v2 ">My Job </Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current " : ""
                }
              >
                <Link to="/employers-dashboard/post-jobs ">Post Job </Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current " : ""
                }
              >
                <Link to="/employers-list-v3Abroadium ">Tagged Candidates</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current " : ""
                }
              >
                <Link to="/employers-list-v1">Shortlisted/Saved Candidates</Link>
              </li>
              
              {/* <Link to="/job-single-v1/1">Recent Jobs</Link> */}
            </ul>
          </li>
          <li
                className="text-white"
              >
                <Link to=""   className="text-white">Search Resume </Link>
              </li>
          
          {/* End Employers menu items */}
          {/* <li
            className={`${
              isActiveParent(employerItems, pathname) ||
              pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Abroadium ID</span>
            <ul>
              {employerItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li
                className={pathname?.includes("/sentry-spot") ? "current" : ""}
              >
                <Link to="/sentry-spot">Abroadium id </Link>
                <Link to="/candidates-dashboard/my-profile">
                  Candidate profile{" "}
                </Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-d  ashboard") ? "current" : ""
                }
              >
                <Link to="/employers-list-v2">Employers List</Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/employers-single-v1/1">
                  Employers Listing detail page
                </Link>
              </li>
              <li
                className={
                  pathname?.includes("/employers-dashboard") ? "current" : ""
                }
              >
                <Link to="/employers-dashboard/dashboard">
                  Employers Dashboard
                </Link>
              </li>
            </ul>
          </li> */}

          <li
            className={`${
              isActiveParent(candidateItems, pathname) ||
              pathname?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
                ? "current"
                : ""
            } dropdown`}
          >
            <Link className="text-white" to="/showcase/org">View</Link>
            {/* <ul>
              {candidateItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, pathname)
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li
                className={
                  pathname?.includes("/candidates-dashboard/") ? "current" : ""
                }
              >
                <Link to="/candidates-list-v2">Trending courses</Link>
              </li>
              <li
                className={
                  pathname?.includes("/candidates-dashboard/") ? "current" : ""
                }
              >
                <Link to="/candidates-dashboard/">Security courses</Link>
              </li>
              <li
                className={
                  pathname?.includes("/candidates-dashboard/") ? "current" : ""
                }
              >
                <Link to="/candidates-dashboard/dashboard">
                  Candidates Dashboard
                </Link>
              </li>
            </ul> */}
          </li>
          {/* End Candidates menu items */}

          {/* <li
            className={`${
              isActiveParentChaild(blogItems, pathname) ? "current" : ""
            } dropdown`}
          > */}
          {/* <Link to={"https://blog.Abroadium.co.uk/"}> Resources</Link> */}
          {/* <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, pathname) ? "current" : ""
                  }
                  key={i}
                >
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul> */}
          {/* </li> */}
          {/* End Blog menu items */}

          {/* reposting btn */}
          <li className="border h-[80%] p-0 m-0 "></li>
          <li className=" hover:bg-slate-200 p-2 rounded-md ml-2">
            <Link to="/" className="text-white">
              {" "}
              <span className="font-light text-white"> Recruiting</span>? Post a job{" "}
            </Link>
          </li>

          {/*<li
            className={`${
              isActiveParentChaild(pageItems, pathname) ||
              isActiveParentChaild(shopItems[0].items, pathname)
                ? "current "
                : ""
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {shopItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={`${
                      isActiveParentChaild(shopItems[0].items, pathname)
                        ? "current "
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, pathname)
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link to={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, pathname) ? "current" : ""
                  }
                  key={i}
                >
                  <Link to={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
{
  /* <Link to="/candidates-single-v1/1">Security courses</Link> */
}
{
  (" ");
}
