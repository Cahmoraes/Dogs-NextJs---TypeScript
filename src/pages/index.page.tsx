import {
  HOCWithBackgroundBlue,
  HOCWithBackgroundGreen,
  HOCWithBackgroundRed,
} from '@/components/HOC'
import { ObjectComposition } from '@/components/ObjectComposition'
import { withAuth } from '@/utils/withAuth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
// import { Toggle } from '@/components/Toggle'

interface HomeProps {
  session: boolean
}

export default function Home({ session }: HomeProps) {
  console.log({ session })

  return (
    <div>
      <h1>Home</h1>
      {/* <Toggle
        render={(isOpen, onToggle) => (
          <>
            <button onClick={onToggle}>Toggle</button>
            {isOpen && <p>Hello</p>}
          </>
        )}
      /> */}

      <ObjectComposition.Root>
        <ObjectComposition.Header>Custom Header</ObjectComposition.Header>
        <ObjectComposition.Body>
          <p>Hello</p>
          <HOCWithBackgroundRed />
          <HOCWithBackgroundBlue />
          <HOCWithBackgroundGreen />
        </ObjectComposition.Body>
        <ObjectComposition.Footer>Custom Footer</ObjectComposition.Footer>
      </ObjectComposition.Root>
    </div>
  )
}

// interface ISession extends GetServerSidePropsContext {
//   session: string | null
// }

// export const getServerSideProps: GetServerSideProps = withAuth(
//   async (ctx: ISession) => {
//     return {
//       props: {
//         session: ctx.session,
//       },
//     }
//   },
// )
