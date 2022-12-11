import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobileScreen = useMediaQuery({ query: '(max-width: 640px)' })
  const router = useRouter()

  useEffect(() => {
    function handleRouteChange() {
      setIsMenuOpen(false)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const handleMediaQueryChange = function (matches: boolean) {
    if (matches) {
      setIsMenuOpen(false)
    }
  }

  useMediaQuery({ maxWidth: 640 }, undefined, handleMediaQueryChange)

  useEffect(() => {
    if (!isMobileScreen) {
      setIsMenuOpen(true)
    }
  }, [isMenuOpen, isMobileScreen])

  return (
    <nav className='absolute flex flex-col items-start justify-between gap-y-3 gap-x-8 rounded-lg bg-zinc-900 pt-8 pb-4 max-sm:w-full sm:top-0 sm:left-0 sm:right-0 sm:w-full sm:flex-row sm:items-center sm:px-4 sm:pb-8'>
      <MobileMenuButtons
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {isMenuOpen ? (
        <>
          <NavGroup>
            <NavItem href='/' text='Home' router={router} isPage />
            <NavItem href='/projects' text='Projects' router={router} isPage />
            <NavItem
              href='/resume.pdf'
              text='Resume'
              router={router}
              handleClick={() => setIsMenuOpen(false)}
            />
          </NavGroup>
          <NavGroup>
            <NavItem
              href='https://github.com/evan-walter'
              text='GitHub'
              router={router}
              handleClick={() => setIsMenuOpen(false)}
            />
            <NavItem
              href='https://linkedin.com/in/-evanwalter'
              text='LinkedIn'
              router={router}
              handleClick={() => setIsMenuOpen(false)}
            />
          </NavGroup>
        </>
      ) : null}
    </nav>
  )
}

interface NavGroupProps {
  children: React.ReactNode
}

function NavGroup({ children }: NavGroupProps) {
  return (
    <div className='flex flex-col justify-center gap-x-8 gap-y-3 sm:flex-row sm:items-center'>
      {children}
    </div>
  )
}

interface NavItemProps {
  href: string
  text: string
  router: any
  isPage?: Boolean
  handleClick?: () => void
}

function NavItem({ href, text, router, isPage, handleClick }: NavItemProps) {
  const isActive = router.asPath === href
  const classNames = `${
    isActive ? 'text-white' : 'text-zinc-400'
  } w-20 hover:text-white max-sm:my-2 sm:w-fit`

  return (
    <>
      {isPage ? (
        <Link className={classNames} href={href}>
          {text}
        </Link>
      ) : (
        <a
          href={href}
          className={classNames}
          target='_blank'
          rel='noreferrer noopener'
          onClick={handleClick}
        >
          {text}
        </a>
      )}
    </>
  )
}

interface MobileMenuButtonsProps {
  isMenuOpen: Boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileMenuButtons({
  isMenuOpen,
  setIsMenuOpen,
}: MobileMenuButtonsProps) {
  function handleClick() {
    setIsMenuOpen((s) => !s)
  }

  return (
    <>
      {isMenuOpen ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          onClick={handleClick}
          className='block h-6 w-6 sm:hidden'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='block h-6 w-6 sm:hidden'
          onClick={handleClick}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      )}
    </>
  )
}
