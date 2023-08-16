import React, { forwardRef, useMemo } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useRouter } from 'next/router'

type PageTransitionProps = HTMLMotionProps<'div'> & {
  previousPathname: string
}

function PageTransition({ children, previousPathname, ...rest }: PageTransitionProps) {
  const onTheTop = { y: '100%' }
  const inTheCenter = { y: 0 }
  const onTheBottom = { y: '-100%' }

  const transition = { duration: 0.6, ease: 'easeInOut' }

  const router = useRouter()
  const pathname = router.pathname

  const initAnimation = pathname > previousPathname ? onTheTop : onTheBottom
  const exitAnimation = pathname > previousPathname ? onTheBottom : onTheTop

  console.log(pathname, previousPathname, pathname > previousPathname)

  return (
    <motion.div
      initial={initAnimation}
      animate={inTheCenter}
      exit={exitAnimation}
      transition={transition}
      className="h-full"
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
