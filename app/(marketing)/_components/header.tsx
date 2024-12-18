"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { SignInButton, useUser } from '@clerk/clerk-react'
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';



function header() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documnets, & Plans, Unified. Welcome to <span className='underline'>Jotion</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        Jotion is  the  connected workspace where <br/> better, faster work happens.
      </h3>
      {
        !isLoaded &&(
          <>
          <div className='w-full flex justify-around'>
          <Spinner size="lg"/>
          </div>
            
          </>
        )
      }
      {isLoaded && isSignedIn &&(
        <>
        <Button asChild>
          <Link href='/documents'>
          Entre Jotion
        <ArrowRight className='h-4 w-4  ml-2' />
        </Link>
        
      </Button>
        </>
      )}
      {isLoaded && !isSignedIn &&(
        <>
        <SignInButton mode='modal'>
        <Button>
        Join Jotion free
        <ArrowRight className='h-4 w-4  ml-2' />
      </Button>
        </SignInButton>
       
        </>
      )}
      
    </div>
  )
}

export default header
