"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image'

function Navbar() {

    const { data: session, status } = useSession();

    const menuLinks = (
        <>
            <li><Link href={`/`}>Home</Link></li>
            <li><Link href={`/find`}>Find Caregivers</Link></li>
            <li><Link href={`/notification`}>Notifications</Link></li>
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
                        <div className="space-x-3 flex items-center justify-center">

                            <h3 className="text-base font-bold text-gray-500">@{session.user?.name}</h3>
                            {
                                !session.user?.role === 'caregiver' && (
                                    <Link href="/caregiver" className="btn btn-primary btn-outline">Be a caregiver</Link>
                                )
                            }

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 rounded-full">
                                        {
                                            session.user?.image ? 
                                            <Image src={session.user.image} alt={`user_photo`} width={80} height={80}></Image>
                                            :
                                            <Image src={"https://i.ibb.co.com/G35j9bHm/dp.jpg"} alt={`user_photo_default`} width={80} height={80}></Image>
                                        }
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-3">
                                    <li>
                                    <Link
                                    href={`/profile?email=${session.user.email}`}
                                    className="justify-between"
                                    >
                                    Profile
                                    <span className="badge">New</span>
                                    </Link>
                                    </li>

                                    <li><Link href={`/dashboard`}>Dashboard</Link></li>
                                    <li><button onClick={() => signOut()} className="btn bg-red-500 text-white">Logout</button></li>
                                </ul>
                            </div>

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