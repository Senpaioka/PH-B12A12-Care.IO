// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import Image from "next/image";

// export default function Navbar() {
//   const { data: session, status } = useSession();

//   const menuLinks = (
//     <>
//       <li>
//         <Link href="/">Home</Link>
//       </li>
//       <li>
//         <Link href="/find">Find Caregivers</Link>
//       </li>
//       <li>
//         <Link href="/notification">Notifications</Link>
//       </li>
//     </>
//   );

//   return (
//     <nav className="sticky top-0 z-50 bg-base-100">
//       <div className="navbar max-w-7xl mx-auto px-4">
//         {/* LEFT */}
//         <div className="navbar-start">
//           {/* Mobile menu */}
//           <div className="dropdown">
//             <button
//               tabIndex={0}
//               className="btn btn-ghost lg:hidden"
//               aria-label="Open menu"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />
//               </svg>
//             </button>

//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 shadow"
//             >
//               {menuLinks}
//             </ul>
//           </div>

//           <Link href="/" className="btn btn-ghost text-xl font-bold">
//             Care.io
//           </Link>
//         </div>

//         {/* CENTER (Desktop only) */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal gap-1">{menuLinks}</ul>
//         </div>

//         {/* RIGHT */}
//         <div className="navbar-end">
//           {status === "authenticated" ? (
//             <div className="flex items-center gap-3">
//               {/* Be caregiver CTA */}
//               {session.user?.role !== "caregiver" && (
//                 <Link
//                   href="/caregiver"
//                   className="btn btn-primary btn-outline hidden sm:inline-flex"
//                 >
//                   Be a caregiver
//                 </Link>
//               )}

//               {/* Username (hidden on very small screens) */}
//               <span className="hidden md:inline text-sm font-medium text-gray-500">
//                 @{session.user?.name}
//               </span>

//               {/* Avatar dropdown */}
//               <div className="dropdown dropdown-end">
//                 <button
//                   tabIndex={0}
//                   className="btn btn-ghost btn-circle avatar"
//                 >
//                   <div className="w-10 rounded-full">
//                     <Image
//                       src={
//                         session.user?.image ||
//                         "https://i.ibb.co.com/G35j9bHm/dp.jpg"
//                       }
//                       alt="User avatar"
//                       width={40}
//                       height={40}
//                     />
//                   </div>
//                 </button>

//                 <ul
//                   tabIndex={0}
//                   className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow space-y-1"
//                 >
//                   <li>
//                     <Link
//                       href={`/profile?email=${session.user.email}`}
//                       className="justify-between"
//                     >
//                       Profile
//                       <span className="badge badge-sm">New</span>
//                     </Link>
//                   </li>

//                   <li>
//                     <Link href="/dashboard">Dashboard</Link>
//                   </li>

//                   <li className="mt-1">
//                     <button
//                       onClick={() => signOut()}
//                       className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           ) : (
//             <div className="flex gap-2">
//               <Link href="/login" className="btn btn-sm sm:btn-md">
//                 Login
//               </Link>
//               <Link href="/register" className="btn btn-sm sm:btn-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white">
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }




"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href
      ? "text-gray-900 font-semibold border-primary"
      : "text-gray-500 hover:text-white";

  const menuLinks = (
    <>
      <li>
        <Link href="/" className={isActive("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/find" className={isActive("/find")}>
          Find Caregivers
        </Link>
      </li>
      <li>
        <Link href="/notification" className={isActive("/notification")}>
          Notifications
        </Link>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-base-100">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <ul className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 shadow">
              {menuLinks}
            </ul>
          </div>

          <Link href="/" className="btn btn-ghost text-xl font-bold">
            Care.io
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6">{menuLinks}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              {session.user?.role !== "caregiver" && (
                <Link
                  href="/caregiver"
                  className="btn btn-primary btn-outline hidden sm:inline-flex"
                >
                  Be a caregiver
                </Link>
              )}

              <span className="hidden md:inline text-sm font-medium text-gray-500">
                @{session.user?.name}
              </span>

              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={
                        session.user?.image ||
                        "https://i.ibb.co.com/G35j9bHm/dp.jpg"
                      }
                      alt="User avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                </button>

                <ul className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow">
                  <li>
                    <Link href={`/profile?email=${session.user.email}`}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-sm sm:btn-md">
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-sm sm:btn-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
