"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";


function Navbar() {

    const { data: session, status } = useSession();

    const menuLinks = (
        <>
            <li><Link href={`/`}>Home</Link></li>
        </>
    );

    return (

        <div className="navbar bg-base-100">

            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    
                    { menuLinks }

                </ul>
                </div>
                <Link href={`/`} className="btn btn-ghost text-xl">Care.io</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    { menuLinks }

                </ul>
            </div>

            <div className="navbar-end">
                {
                    status === "authenticated" ? (
                        <>
                        <div className="space-x-3">
                            <Link href={`/caregiver`} className="btn btn-primary btn-outline">Be a caregiver</Link>
                            <button onClick={() => signOut()} className="btn btn-accent">Logout</button>
                        </div>
                        </>
                    ) : (
                        <>
                        <div className="space-x-3">
                            <Link href={`/login`} className="btn">Login</Link>
                            <Link href={`/register`} className="btn">Register</Link>
                        </div>
                        </>
                    )
                }
               
            </div>

        </div>
    );
}

export default Navbar;