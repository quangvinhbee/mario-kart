import { useRouter } from 'next/router'
import { MainLayout } from '@/components/layouts/MainLayout'

const Page = () => {
  return (
    <section className="flex h-full items-center p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-600">
            <span className="sr-only">Error</span>500
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="rounded px-8 py-3 font-semibold dark:bg-[#FFB600] dark:text-white"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  )
}

Page.Layout = MainLayout

export default Page
