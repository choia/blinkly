import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
} from 'next'
import BasicTemplate from '@/components/templates/basicTemplate'
import { checkIsLoggedIn } from '@/lib/protectRoute'
import { useState } from 'react'
import writeHandler from './api/write'

type Step = 'link' | 'intro'
const WriteTest = () => {
  const [step, setStep] = useState<Step>('link')

  // const stepRenderers = {
  //   link: () => <WriteLink onProceed={() => setStep('link')} />,
  //   intro: () => <WriteIntro />,
  // }

  // return stepRenderers[step]
}

// export async function getStaticProps(context) {
//   const { req, res } = context
//   const a = await writeHandler(req, res)

//   console.log(a)
// console.log('@@@@@', req)
// // TODO: fix checkIsLoggedIn
// const isLoggedIn = await checkIsLoggedIn(req)
// console.log('isLoogedin', isLoggedIn)
// if (!isLoggedIn) {
//   return {
//     redirect: {
//       destination: '/login',
//       permanent: false,
//     },
//   }
// }

//   return {
//     props: {},
//   }
// }

export default WriteTest
