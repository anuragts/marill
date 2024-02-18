'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '@/lib/storage/client';

export default function Login() {
  const [email, setEmail] = useState('')
  const router = useRouter();

  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
    return user
  }

  let user = null;

  useEffect(() => {
    const fetchUser = async () => {
      user = await getUser();
    };
    fetchUser();
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh();
    // Display toast notification
    toast.info("Check your email inbox for the magic login link");
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  }

  if (user) {
    router.replace('/')
    return (
      <>
        You are logged in.
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-col bg-slate-950 items-center justify-center h-screen">
          <ToastContainer />
          <h1 className='text-4xl text-white mb-12 mt-2 font-bold'>
            Login
          </h1>
          {/* add text to show what is to enter in input */}
          <div className='text-md mt-5 text-right'>
            Email
          </div>
          <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className='py-2 px-4 mb-4 mt-2 bg-black text-white border-2 border-slate-200 rounded-md md:w-2/12 w-3/4' required />
          <button onClick={handleSignIn} className='bg-blue-300 text-black rounded py-2 px-4 mb-4 mt-5 '>Sign in</button>
          <div className='text-xl mb-2 mt-2'>
            Or
          </div>
          <button onClick={signInWithGoogle} className='bg-white text-black rounded py-2 px-4 mb-4 '>Google</button>
        </div>
      </>
    )
  }
}